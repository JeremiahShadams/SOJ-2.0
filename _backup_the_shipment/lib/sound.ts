// Pure WebAudio procedural synthesizer
// 0 audio assets to download, zero latency, runs entirely client-side.
// Opt-in: sound is muted by default; toggled via nav or keyboard.

export type SoundKind =
  | "needleDrop"
  | "click"
  | "scratch"
  | "thump"
  | "thunk"
  | "bell"
  | "pop"
  | "chime"
  | "beep"
  | "ding"
  | "print";

let ctx: AudioContext | null = null;
let stemOsc: OscillatorNode | null = null;
let stemGain: GainNode | null = null;
let stemInterval: number | null = null;

function getContext(): AudioContext {
  if (!ctx) {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    ctx = new AudioCtx();
  }
  if (ctx.state === "suspended") {
    ctx.resume();
  }
  return ctx;
}

export function playSound(kind: SoundKind) {
  try {
    const a = getContext();
    const t = a.currentTime;

    if (kind === "click") {
      // Crisp mechanical Leica-style shutter click
      const osc = a.createOscillator();
      const gain = a.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(2400, t);
      osc.frequency.exponentialRampToValueAtTime(800, t + 0.025);
      gain.gain.setValueAtTime(0.08, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.025);
      osc.connect(gain);
      gain.connect(a.destination);
      osc.start(t);
      osc.stop(t + 0.03);
    } else if (kind === "needleDrop") {
      // Low turntable needle thump + surface crackle
      const osc = a.createOscillator();
      const gain = a.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(95, t);
      osc.frequency.exponentialRampToValueAtTime(32, t + 0.12);
      gain.gain.setValueAtTime(0.25, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);
      osc.connect(gain);
      gain.connect(a.destination);
      osc.start(t);
      osc.stop(t + 0.13);

      // Procedural surface noise burst
      const bufferSize = a.sampleRate * 0.08;
      const buffer = a.createBuffer(1, bufferSize, a.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
      }
      const noise = a.createBufferSource();
      noise.buffer = buffer;
      const noiseFilter = a.createBiquadFilter();
      noiseFilter.type = "bandpass";
      noiseFilter.frequency.value = 1800;
      const noiseGain = a.createGain();
      noiseGain.gain.setValueAtTime(0.04, t + 0.02);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.09);
      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(a.destination);
      noise.start(t + 0.02);
    } else if (kind === "scratch") {
      // Quick DJ backspin frequency sweep
      const osc = a.createOscillator();
      const gain = a.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(280, t);
      osc.frequency.exponentialRampToValueAtTime(850, t + 0.06);
      osc.frequency.exponentialRampToValueAtTime(140, t + 0.14);
      gain.gain.setValueAtTime(0.09, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.15);
      osc.connect(gain);
      gain.connect(a.destination);
      osc.start(t);
      osc.stop(t + 0.16);
    } else if (kind === "thump") {
      // Deep 808 sub kick
      const osc = a.createOscillator();
      const gain = a.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(120, t);
      osc.frequency.exponentialRampToValueAtTime(42, t + 0.22);
      gain.gain.setValueAtTime(0.35, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.24);
      osc.connect(gain);
      gain.connect(a.destination);
      osc.start(t);
      osc.stop(t + 0.25);
    } else if (kind === "thunk") {
      const osc = a.createOscillator();
      const gain = a.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(85, t);
      osc.frequency.exponentialRampToValueAtTime(40, t + 0.16);
      gain.gain.setValueAtTime(0.3, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);
      osc.connect(gain);
      gain.connect(a.destination);
      osc.start(t);
      osc.stop(t + 0.18);
    } else if (kind === "bell" || kind === "chime") {
      // High-register brass confirmation chime
      const osc1 = a.createOscillator();
      const osc2 = a.createOscillator();
      const gain = a.createGain();
      osc1.type = "sine";
      osc2.type = "sine";
      osc1.frequency.setValueAtTime(1318.5, t); // E6
      osc2.frequency.setValueAtTime(1760.0, t); // A6
      gain.gain.setValueAtTime(0.12, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.45);
      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(a.destination);
      osc1.start(t);
      osc2.start(t + 0.03);
      osc1.stop(t + 0.5);
      osc2.stop(t + 0.5);
    } else if (kind === "pop") {
      const osc = a.createOscillator();
      const gain = a.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(480, t);
      osc.frequency.exponentialRampToValueAtTime(220, t + 0.04);
      gain.gain.setValueAtTime(0.1, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.04);
      osc.connect(gain);
      gain.connect(a.destination);
      osc.start(t);
      osc.stop(t + 0.05);
    } else if (kind === "beep") {
      const osc = a.createOscillator();
      const gain = a.createGain();
      osc.type = "square";
      osc.frequency.setValueAtTime(1250, t);
      gain.gain.setValueAtTime(0.08, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.07);
      osc.connect(gain);
      gain.connect(a.destination);
      osc.start(t);
      osc.stop(t + 0.08);
    } else if (kind === "ding") {
      const osc = a.createOscillator();
      const gain = a.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(659, t);
      gain.gain.setValueAtTime(0.12, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.4);
      osc.connect(gain);
      gain.connect(a.destination);
      osc.start(t);
      osc.stop(t + 0.42);
    } else if (kind === "print") {
      for (let i = 0; i < 4; i++) {
        const osc = a.createOscillator();
        const gain = a.createGain();
        osc.type = "square";
        osc.frequency.setValueAtTime(900 + Math.random() * 400, t + i * 0.04);
        gain.gain.setValueAtTime(0.04, t + i * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + i * 0.04 + 0.03);
        osc.connect(gain);
        gain.connect(a.destination);
        osc.start(t + i * 0.04);
        osc.stop(t + i * 0.04 + 0.035);
      }
    }
  } catch {
    // AudioContext blocked or not supported — fail silently
  }
}

// Procedural 174 BPM Drum & Bass / Halftime Beat Generator for the Hidden Track Easter Egg
export function startStemPlayer(onBeat?: (step: number) => void): () => void {
  try {
    const a = getContext();
    let step = 0;
    const intervalMs = 172; // ~174 BPM 16th notes

    const tick = () => {
      const t = a.currentTime;
      // Kick on 0 and 10 (Halftime / D&B syncopation)
      if (step === 0 || step === 10) {
        const osc = a.createOscillator();
        const g = a.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(140, t);
        osc.frequency.exponentialRampToValueAtTime(45, t + 0.16);
        g.gain.setValueAtTime(0.3, t);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.18);
        osc.connect(g);
        g.connect(a.destination);
        osc.start(t);
        osc.stop(t + 0.2);
      }
      // Snare on 8
      if (step === 8) {
        const osc = a.createOscillator();
        const g = a.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(220, t);
        g.gain.setValueAtTime(0.15, t);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.1);
        osc.connect(g);
        g.connect(a.destination);
        osc.start(t);
        osc.stop(t + 0.12);
      }
      // Closed Hi-Hat on even steps
      if (step % 2 === 0) {
        const buf = a.createBuffer(1, a.sampleRate * 0.02, a.sampleRate);
        const d = buf.getChannelData(0);
        for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
        const src = a.createBufferSource();
        src.buffer = buf;
        const flt = a.createBiquadFilter();
        flt.type = "highpass";
        flt.frequency.value = 7500;
        const g = a.createGain();
        g.gain.setValueAtTime(0.04, t);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.02);
        src.connect(flt);
        flt.connect(g);
        g.connect(a.destination);
        src.start(t);
      }
      // Sub Bass tone on steps 0-7 and 8-15
      if (step === 0 || step === 8) {
        const sub = a.createOscillator();
        const g = a.createGain();
        sub.type = "sine";
        const f = step === 0 ? 55 : 48.99; // A1 or G1
        sub.frequency.setValueAtTime(f, t);
        g.gain.setValueAtTime(0.2, t);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.35);
        sub.connect(g);
        g.connect(a.destination);
        sub.start(t);
        sub.stop(t + 0.38);
      }

      onBeat?.(step);
      step = (step + 1) % 16;
    };

    const intervalId = window.setInterval(tick, intervalMs);
    stemInterval = intervalId;

    return () => {
      clearInterval(intervalId);
      stemInterval = null;
    };
  } catch {
    return () => {};
  }
}
