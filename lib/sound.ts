// Opt-in WebAudio sound effects - thunks, beeps, bells. OFF by default;
// the enabled flag is owned by the caller (nav toggle) per spec §6.
export type SoundKind = "thunk" | "beep" | "pop" | "ding" | "bell" | "print";

let ctx: AudioContext | null = null;

function ac(): AudioContext {
  if (!ctx) {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    ctx = new AC();
  }
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

function tone(
  f: number,
  d: number,
  type: OscillatorType = "sine",
  g = 0.2,
  when = 0,
  slide?: number,
) {
  const a = ac();
  const t0 = a.currentTime + when;
  const o = a.createOscillator();
  const v = a.createGain();
  o.type = type;
  o.frequency.setValueAtTime(f, t0);
  if (slide) o.frequency.exponentialRampToValueAtTime(slide, t0 + d);
  v.gain.setValueAtTime(g, t0);
  v.gain.exponentialRampToValueAtTime(0.0001, t0 + d);
  o.connect(v);
  v.connect(a.destination);
  o.start(t0);
  o.stop(t0 + d + 0.05);
}

export function playSound(kind: SoundKind) {
  try {
    if (kind === "thunk") {
      tone(85, 0.16, "triangle", 0.5, 0, 40);
      tone(50, 0.2, "sine", 0.4);
    } else if (kind === "beep") {
      tone(1250, 0.07, "square", 0.12);
    } else if (kind === "pop") {
      tone(420, 0.05, "square", 0.15, 0, 180);
    } else if (kind === "ding") {
      tone(659, 0.4, "sine", 0.25);
      tone(523, 0.5, "sine", 0.25, 0.28);
    } else if (kind === "bell") {
      tone(1568, 0.7, "sine", 0.2);
      tone(2093, 0.5, "sine", 0.12, 0.05);
    } else if (kind === "print") {
      for (let i = 0; i < 5; i++) {
        tone(900 + Math.random() * 400, 0.03, "square", 0.06, i * 0.05);
      }
    }
  } catch {
    // audio unavailable - stay silent
  }
}
