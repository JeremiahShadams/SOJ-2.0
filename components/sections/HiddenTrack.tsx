"use client";

import { useState } from "react";
import { SITE, HEADLINE_METRICS } from "@/lib/site";
import { startStemPlayer } from "@/lib/sound";

export default function HiddenTrack({ onSound }: { onSound?: () => void }) {
  const [playingStem, setPlayingStem] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [stopStemFn, setStopStemFn] = useState<(() => void) | null>(null);

  const toggleStem = () => {
    onSound?.();
    if (playingStem) {
      stopStemFn?.();
      setStopStemFn(null);
      setPlayingStem(false);
    } else {
      const stop = startStemPlayer((step) => {
        setActiveStep(step);
      });
      setStopStemFn(() => stop);
      setPlayingStem(true);
    }
  };

  return (
    <section
      id="hidden-track"
      aria-label="Track 00 - The Hidden Track & Runout Groove"
      style={{
        position: "relative",
        padding: "clamp(80px, 15vh, 140px) 0 clamp(40px, 8vh, 80px)",
        borderTop: "1px dashed var(--yellow-border)",
        background: "radial-gradient(circle at 50% 100%, rgba(255, 229, 0, 0.05) 0%, transparent 65%)",
      }}
    >
      <div className="site-container" style={{ maxWidth: "900px" }}>
        {/* The Runout Groove Badge */}
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <div
            className="badge-yellow"
            style={{ padding: "4px 14px", fontSize: "0.75rem", display: "inline-flex" }}
          >
            TRACK 00 // THE HIDDEN TRACK · RUNOUT GROOVE
          </div>
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(2.4rem, 5.5vw, 4.4rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: "#fff",
              margin: "16px 0 12px 0",
            }}
          >
            You reached the B-Side.
          </h2>
          <p
            className="font-body"
            style={{
              fontSize: "clamp(1rem, 1.6vw, 1.2rem)",
              color: "var(--text-secondary)",
              maxWidth: "580px",
              margin: "0 auto",
            }}
          >
            Most visitors glance at a headline and leave. If you scrolled all the way to the needle drop runout, here is the executive summary.
          </p>
        </div>

        {/* 6-Stat Highlight Reel Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "14px",
            marginBottom: "48px",
          }}
        >
          {HEADLINE_METRICS.map((m) => (
            <div
              key={m.label}
              className="card-editorial"
              style={{
                padding: "18px 20px",
                borderLeft: "3px solid var(--yellow)",
              }}
            >
              <div
                className="font-display"
                style={{ fontSize: "1.8rem", fontWeight: 700, color: "var(--yellow)", lineHeight: 1 }}
              >
                {m.value}
              </div>
              <div
                className="font-mono"
                style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#fff", margin: "6px 0 2px" }}
              >
                {m.label}
              </div>
              <div
                className="font-body"
                style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", lineHeight: 1.35 }}
              >
                {m.sub}
              </div>
            </div>
          ))}

          <div
            className="card-editorial"
            style={{
              padding: "18px 20px",
              borderLeft: "3px solid var(--signal-green)",
            }}
          >
            <div
              className="font-display"
              style={{ fontSize: "1.8rem", fontWeight: 700, color: "var(--signal-green)", lineHeight: 1 }}
            >
              WAT / UTC+1
            </div>
            <div
              className="font-mono"
              style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#fff", margin: "6px 0 2px" }}
            >
              Timezone Alignment
            </div>
            <div
              className="font-body"
              style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", lineHeight: 1.35 }}
            >
              Comfortably overlaps US East Coast mornings and full European days.
            </div>
          </div>

          <div
            className="card-editorial"
            style={{
              padding: "18px 20px",
              borderLeft: "3px solid var(--signal-green)",
            }}
          >
            <div
              className="font-display"
              style={{ fontSize: "1.8rem", fontWeight: 700, color: "var(--signal-green)", lineHeight: 1 }}
            >
              2026
            </div>
            <div
              className="font-mono"
              style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#fff", margin: "6px 0 2px" }}
            >
              Anchor University (AUL)
            </div>
            <div
              className="font-body"
              style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", lineHeight: 1.35 }}
            >
              B.Sc. Computer Science · Ready for full-time remote placement.
            </div>
          </div>
        </div>

        {/* "If You're Hiring" Direct Letter */}
        <div
          className="card-editorial"
          style={{
            padding: "clamp(1.75rem, 4vw, 3rem)",
            background: "var(--bg-surface-elevated)",
            marginBottom: "44px",
            border: "1px solid var(--border-medium)",
          }}
        >
          <div className="badge-yellow" style={{ marginBottom: "14px" }}>
            MEMORANDUM // IF YOU&apos;RE HIRING
          </div>
          <h3
            className="font-display"
            style={{ fontSize: "1.5rem", fontWeight: 700, color: "#fff", margin: "0 0 16px 0" }}
          >
            What I&apos;m looking for next
          </h3>
          <div
            className="font-body"
            style={{
              fontSize: "0.9375rem",
              lineHeight: 1.7,
              color: "var(--text-secondary)",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >
            <p style={{ margin: 0 }}>
              I am looking to join a high-velocity product team as a{" "}
              <strong style={{ color: "#fff" }}>Software Engineer (Full-Stack / AI)</strong> or{" "}
              <strong style={{ color: "#fff" }}>Founding Engineer</strong>. I thrive in environments where engineers are given full ownership of features from interface ergonomics down to database locks and model inference.
            </p>
            <p style={{ margin: 0 }}>
              I don&apos;t need micromanagement. I take ambiguous specs, storyboard the user journey, design the schema, wire the APIs, and ship clean code that handles its own failure modes.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "24px",
              flexWrap: "wrap",
            }}
          >
            <a href={`mailto:${SITE.email}`} className="btn-yellow">
              START A CONVERSATION →
            </a>
            <a href={SITE.resume} download className="btn-outline">
              DOWNLOAD RESUME PDF ↓
            </a>
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
              style={{ border: "1px solid var(--border-subtle)", padding: "10px 14px" }}
            >
              CONNECT ON LINKEDIN ↗
            </a>
          </div>
        </div>

        {/* Easter Egg: Procedural 174 BPM Drum & Bass Player */}
        <div
          style={{
            background: "#09090c",
            border: "1px dashed var(--yellow-border)",
            borderRadius: "var(--radius-md)",
            padding: "20px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div>
            <div className="badge-tech" style={{ color: "var(--yellow)" }}>
              EASTER EGG // DUBPLATE STEM PLAYER
            </div>
            <div
              className="font-mono"
              style={{ fontSize: "0.875rem", fontWeight: 700, color: "#fff", marginTop: "4px" }}
            >
              Procedural 174 BPM Drum &amp; Bass Generator
            </div>
            <div
              className="font-mono"
              style={{ fontSize: "0.75rem", color: "var(--text-tertiary)" }}
            >
              Synthesized live in your browser using pure WebAudio oscillators. 0 bytes downloaded.
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {/* 16-step visualizer LEDs */}
            <div style={{ display: "flex", gap: "3px" }}>
              {Array.from({ length: 16 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: "4px",
                    height: "18px",
                    borderRadius: "1px",
                    background:
                      playingStem && activeStep === i
                        ? "var(--yellow)"
                        : i % 4 === 0
                        ? "rgba(255,255,255,0.3)"
                        : "rgba(255,255,255,0.1)",
                    boxShadow:
                      playingStem && activeStep === i ? "0 0 8px var(--yellow)" : "none",
                  }}
                />
              ))}
            </div>

            <button
              onClick={toggleStem}
              className={playingStem ? "btn-yellow" : "btn-outline"}
              style={{ fontSize: "0.75rem", padding: "8px 14px" }}
            >
              {playingStem ? "STOP STEM ⏹" : "PLAY HIDDEN STEM ▶"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
