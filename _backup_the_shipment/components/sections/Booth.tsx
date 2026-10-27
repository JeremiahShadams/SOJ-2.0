"use client";

import { useEffect, useRef, useState } from "react";
import { BOOTH_TRACKS } from "@/lib/site";

export default function Booth({
  afterHoursEnabled,
  onToggleAfterHours,
  onSound,
}: {
  afterHoursEnabled: boolean;
  onToggleAfterHours: () => void;
  onSound?: () => void;
}) {
  const [activeTrackIndex, setActiveTrackIndex] = useState(0);
  const [isPlayingWaveform, setIsPlayingWaveform] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number | null>(null);

  // Animated Waveform Canvas (Safe for prefers-reduced-motion)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let phase = 0;
    const bars = 48;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width / bars;

      for (let i = 0; i < bars; i++) {
        const heightMultiplier = isPlayingWaveform
          ? Math.sin(phase + i * 0.35) * 0.5 + 0.5
          : Math.sin(i * 0.25) * 0.3 + 0.4;
        const h = Math.max(4, heightMultiplier * (canvas.height * 0.85));
        const x = i * w;
        const y = (canvas.height - h) / 2;

        ctx.fillStyle = isPlayingWaveform
          ? i % 4 === 0
            ? "var(--yellow)"
            : "rgba(255, 229, 0, 0.45)"
          : "rgba(255, 255, 255, 0.16)";
        ctx.fillRect(x + 1, y, w - 2, h);
      }

      phase += isPlayingWaveform ? 0.08 : 0.015;
      animRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isPlayingWaveform]);

  const activeTrack = BOOTH_TRACKS[activeTrackIndex];

  return (
    <section
      id="booth"
      aria-label="Side B Track 02 - The Booth & DJ Room"
      style={{
        position: "relative",
        padding: "clamp(70px, 12vh, 120px) 0",
        borderTop: "1px solid var(--border-subtle)",
        background: afterHoursEnabled
          ? "radial-gradient(circle at 50% 30%, rgba(255, 153, 0, 0.08) 0%, #09090b 80%)"
          : "rgba(17, 17, 20, 0.5)",
        transition: "background 0.5s ease",
      }}
    >
      <div className="site-container">
        {/* Section Header with After Hours Switch */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "clamp(32px, 5vh, 50px)",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div>
            <div className="badge-yellow">SIDE B // TRACK B02 — THE BOOTH</div>
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(2rem, 4.5vw, 3.6rem)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                margin: "12px 0 8px 0",
                color: "#fff",
              }}
            >
              The Sound Booth
            </h2>
            <p
              className="font-body"
              style={{
                fontSize: "clamp(0.95rem, 1.4vw, 1.125rem)",
                color: "var(--text-secondary)",
                maxWidth: "600px",
                margin: 0,
              }}
            >
              When I'm not writing code, I mix drum &amp; bass and deep dance music. Pacing, frequency separation, and rhythm translate directly to system architecture.
            </p>
          </div>

          <button
            onClick={() => {
              onSound?.();
              onToggleAfterHours();
            }}
            className="btn-outline"
            style={{
              borderColor: afterHoursEnabled ? "var(--yellow)" : "var(--border-medium)",
              color: afterHoursEnabled ? "var(--yellow)" : "var(--text-primary)",
              background: afterHoursEnabled ? "rgba(255, 153, 0, 0.1)" : "transparent",
            }}
          >
            <span>{afterHoursEnabled ? "AFTER HOURS: ACTIVE ⚡" : "TOGGLE AFTER HOURS MODE"}</span>
          </button>
        </div>

        {/* The Audio Deck Interface */}
        <div
          className="card-editorial"
          style={{
            padding: "clamp(1.5rem, 3.5vw, 2.75rem)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "36px",
            alignItems: "center",
          }}
        >
          {/* Left: Turntable Platter & Waveform Monitor */}
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <div className="font-mono" style={{ fontSize: "0.75rem", color: "var(--yellow)", fontWeight: 700 }}>
                // AUDIO OSCILLOSCOPE &amp; MONITOR
              </div>
              <span className="badge-tech">{activeTrack.bpm} BPM · {activeTrack.key}</span>
            </div>

            {/* Interactive Canvas Waveform */}
            <div
              style={{
                background: "#0a0a0d",
                border: "1px solid var(--border-medium)",
                borderRadius: "var(--radius-sm)",
                padding: "16px",
                marginBottom: "20px",
              }}
            >
              <canvas
                ref={canvasRef}
                width={500}
                height={100}
                style={{ width: "100%", height: "80px", display: "block" }}
              />
            </div>

            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <button
                onClick={() => {
                  onSound?.();
                  setIsPlayingWaveform((p) => !p);
                }}
                className={isPlayingWaveform ? "btn-yellow" : "btn-outline"}
                style={{ flex: 1 }}
              >
                {isPlayingWaveform ? "PAUSE VISUALIZER ⏸" : "START VISUALIZER ▶"}
              </button>
              <span className="font-mono" style={{ fontSize: "0.75rem", color: "var(--text-tertiary)" }}>
                {isPlayingWaveform ? "AUDIO ENGINE ENGAGED" : "NO AUTOPLAY (MUTED)"}
              </span>
            </div>
          </div>

          {/* Right: Track Selection Deck */}
          <div>
            <div
              className="font-mono"
              style={{
                fontSize: "0.75rem",
                color: "var(--text-tertiary)",
                letterSpacing: "0.1em",
                marginBottom: "14px",
              }}
            >
              // CURATED ROTATION (3 SELECTIONS)
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {BOOTH_TRACKS.map((t, idx) => {
                const isSelected = idx === activeTrackIndex;
                return (
                  <div
                    key={t.title}
                    onClick={() => {
                      setActiveTrackIndex(idx);
                      onSound?.();
                    }}
                    style={{
                      background: isSelected ? "var(--bg-surface-elevated)" : "transparent",
                      border: isSelected ? "1px solid var(--yellow-border)" : "1px solid var(--border-subtle)",
                      borderRadius: "var(--radius-sm)",
                      padding: "16px 18px",
                      cursor: "pointer",
                      transition: "all var(--transition-fast)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                        marginBottom: "4px",
                      }}
                    >
                      <div
                        className="font-display"
                        style={{
                          fontSize: "1.05rem",
                          fontWeight: 700,
                          color: isSelected ? "var(--yellow)" : "#fff",
                        }}
                      >
                        {idx + 1}. {t.title}
                      </div>
                      <span className="font-mono" style={{ fontSize: "0.75rem", color: "var(--text-tertiary)" }}>
                        {t.duration}
                      </span>
                    </div>

                    <div
                      className="font-mono"
                      style={{ fontSize: "0.6875rem", color: "var(--text-secondary)", marginBottom: "6px" }}
                    >
                      {t.genre} · {t.bpm} BPM · {t.key}
                    </div>

                    <p
                      className="font-body"
                      style={{ fontSize: "0.8125rem", color: "var(--text-tertiary)", margin: 0, lineHeight: 1.4 }}
                    >
                      {t.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
