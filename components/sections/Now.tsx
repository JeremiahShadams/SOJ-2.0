"use client";

import { SITE } from "@/lib/site";

export default function Now({ onSound }: { onSound?: () => void }) {
  return (
    <section
      id="now"
      aria-label="Side B Track 01 - The Now Monologue"
      style={{
        position: "relative",
        padding: "clamp(80px, 14vh, 140px) 0",
        borderTop: "1px solid var(--border-subtle)",
        background: "radial-gradient(ellipse at 50% 0%, rgba(255, 229, 0, 0.03) 0%, transparent 70%)",
      }}
    >
      <div className="site-container" style={{ maxWidth: "860px" }}>
        {/* Release Metadata */}
        <div style={{ marginBottom: "28px" }}>
          <div className="badge-yellow">SIDE B // TRACK B01 — NOW</div>
          <div
            className="font-mono"
            style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", marginTop: "8px" }}
          >
            UPDATED: LATE 2026 · BROADCAST FROM LAGOS, NIGERIA
          </div>
        </div>

        {/* Editorial Heading */}
        <h2
          className="font-display"
          style={{
            fontSize: "clamp(2.2rem, 5vw, 4rem)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            color: "#fff",
            marginBottom: "32px",
          }}
        >
          Systems, Sound, and the Discipline of Speed.
        </h2>

        {/* Editorial Body Text */}
        <div
          className="font-body"
          style={{
            fontSize: "clamp(1.05rem, 1.8vw, 1.25rem)",
            lineHeight: 1.75,
            color: "var(--text-secondary)",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <p style={{ margin: 0 }}>
            Most software today feels either over-engineered to the point of bloat, or slapped together with generic AI wrappers that dissolve under the first real production payload. I don’t believe in either extreme. I build software the way a disciplined craftsman builds an acoustic instrument: every joint tight, zero decorative excess, and an interface that responds before you even realize you clicked.
          </p>

          <p style={{ margin: 0 }}>
            Right now, my engineering focus is divided between two hard problems:{" "}
            <strong style={{ color: "var(--text-primary)" }}>
              low-latency edge AI inference
            </strong>{" "}
            (quantizing models so they run in-browser without sending user data to someone else’s GPU) and{" "}
            <strong style={{ color: "var(--text-primary)" }}>
              resilient asynchronous payment pipelines
            </strong>{" "}
            where network drops and webhook race conditions are treated as guaranteed realities, not freak anomalies.
          </p>

          <p style={{ margin: 0 }}>
            When the terminal closes, the music starts. I mix and curate{" "}
            <a
              href="#booth"
              onClick={() => onSound?.()}
              style={{ color: "var(--yellow)", textDecoration: "underline" }}
            >
              drum &amp; bass, halftime, and dark electronic dance music
            </a>
            . There is a direct mathematical connection between DJing a seamless 174 BPM set and architecting a clean event-driven backend: rhythm, syncopation, and knowing exactly when to drop the bass and when to give the track breathing room.
          </p>

          <p style={{ margin: 0 }}>
            I am currently wrapping up my final year of Computer Science at Anchor University in Lagos. I work remote on Western European and North American morning hours. If you’re building something fast, careful, and ambitious —{" "}
            <a
              href={`mailto:${SITE.email}`}
              style={{ color: "#fff", textDecoration: "underline" }}
            >
              let’s talk
            </a>
            .
          </p>
        </div>

        {/* The 3 Current Obsessions */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "16px",
            marginTop: "44px",
            paddingTop: "28px",
            borderTop: "1px dashed var(--border-medium)",
          }}
        >
          <div>
            <div className="font-mono" style={{ fontSize: "0.6875rem", color: "var(--yellow)", fontWeight: 700 }}>
              01 // READING
            </div>
            <div className="font-display" style={{ fontSize: "1rem", color: "#fff", fontWeight: 600, marginTop: "4px" }}>
              Designing Data-Intensive Applications
            </div>
            <div className="font-body" style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", marginTop: "2px" }}>
              Martin Kleppmann · Re-reading distributed consensus.
            </div>
          </div>

          <div>
            <div className="font-mono" style={{ fontSize: "0.6875rem", color: "var(--yellow)", fontWeight: 700 }}>
              02 // AUDIO ROTATION
            </div>
            <div className="font-display" style={{ fontSize: "1rem", color: "#fff", fontWeight: 600, marginTop: "4px" }}>
              174 BPM Drum &amp; Bass Sets
            </div>
            <div className="font-body" style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", marginTop: "2px" }}>
              Deep sub-bass pressure for 4-hour uninterrupted coding flow.
            </div>
          </div>

          <div>
            <div className="font-mono" style={{ fontSize: "0.6875rem", color: "var(--yellow)", fontWeight: 700 }}>
              03 // AMBITION
            </div>
            <div className="font-display" style={{ fontSize: "1rem", color: "#fff", fontWeight: 600, marginTop: "4px" }}>
              Founding / Full-Stack Engineer
            </div>
            <div className="font-body" style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", marginTop: "2px" }}>
              Joining a high-trajectory US or European remote product team.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
