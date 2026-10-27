"use client";

import { SITE } from "@/lib/site";

export default function Hero({
  activeSide = "A",
  onFlipSide = () => {},
  onOpenProof = () => {},
  onSound,
}: {
  activeSide?: "A" | "B";
  onFlipSide?: () => void;
  onOpenProof?: () => void;
  onSound?: () => void;
  heroStamp?: boolean;
}) {
  return (
    <section
      id="hero"
      aria-label="Side A Track 01 - The Needle Drop"
      style={{
        position: "relative",
        paddingTop: "clamp(120px, 18vh, 170px)",
        paddingBottom: "clamp(60px, 10vh, 100px)",
        overflow: "hidden",
        borderBottom: "1px solid var(--border-subtle)",
      }}
    >
      {/* Background Ambient Lighting */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "5%",
          right: "-80px",
          width: "clamp(340px, 50vw, 680px)",
          height: "clamp(340px, 50vw, 680px)",
          borderRadius: "50%",
          background: "radial-gradient(circle at center, rgba(255, 229, 0, 0.07) 0%, rgba(255, 229, 0, 0.01) 45%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      <div className="site-container" style={{ position: "relative", zIndex: 2 }}>
        {/* Release Metadata Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "28px",
            flexWrap: "wrap",
          }}
        >
          <div className="badge-yellow">LP RELEASE // 2026.01</div>
          <span className="font-mono" style={{ fontSize: "0.8125rem", color: "var(--text-tertiary)" }}>
            SIDE {activeSide} · TRACK 01 // MASTER OUTPUT
          </span>
          <span className="badge-live" style={{ marginLeft: "auto" }}>
            AVAILABLE FOR HIRE (US / EU REMOTE)
          </span>
        </div>

        {/* Hero Content Grid with Vinyl Deck Visual */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "clamp(36px, 6vw, 64px)",
            alignItems: "center",
          }}
        >
          {/* Left: Headline & Manifesto */}
          <div style={{ maxWidth: "680px" }}>
            <h1
              className="font-display"
              style={{
                fontSize: "clamp(2.75rem, 6.5vw, 5.25rem)",
                fontWeight: 700,
                letterSpacing: "-0.035em",
                lineHeight: 1.05,
                margin: "0 0 16px 0",
                color: "#ffffff",
              }}
            >
              Jeremiah Shadamoro
            </h1>

            <div
              className="font-mono"
              style={{
                fontSize: "clamp(1.1rem, 2.2vw, 1.45rem)",
                fontWeight: 700,
                color: "var(--yellow)",
                letterSpacing: "-0.01em",
                marginBottom: "22px",
              }}
            >
              Software Engineer | Full-Stack (AI)
            </div>

            <p
              className="font-body"
              style={{
                fontSize: "clamp(1.05rem, 1.8vw, 1.25rem)",
                lineHeight: 1.65,
                color: "var(--text-secondary)",
                margin: "0 0 32px 0",
              }}
            >
              I architect high-throughput full-stack products, resilient payment infrastructures, and low-latency AI pipelines. Shipped across a 30+ person Swedish distributed team, Lagos State government systems, and on-device ML.
            </p>

            {/* 4 Proof Chips */}
            <div
              style={{
                display: "flex",
                gap: "8px",
                flexWrap: "wrap",
                marginBottom: "36px",
              }}
            >
              <span className="badge-tech" style={{ padding: "6px 12px", fontSize: "0.75rem" }}>
                STRIPE &amp; PAYSTACK WEBHOOKS
              </span>
              <span className="badge-tech" style={{ padding: "6px 12px", fontSize: "0.75rem" }}>
                AGENTIC RAG &amp; PGVECTOR
              </span>
              <span className="badge-tech" style={{ padding: "6px 12px", fontSize: "0.75rem" }}>
                ON-DEVICE CV / TENSORFLOW.JS
              </span>
              <span className="badge-tech" style={{ padding: "6px 12px", fontSize: "0.75rem" }}>
                FASTAPI &amp; NEXT.JS 15
              </span>
            </div>

            {/* CTAs */}
            <div
              style={{
                display: "flex",
                gap: "12px",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <a
                href="#work"
                onClick={() => onSound?.()}
                className="btn-yellow"
              >
                SEE THE WORK [SIDE A] ↓
              </a>
              <a
                href={SITE.resume}
                download
                onClick={() => onSound?.()}
                className="btn-outline"
              >
                DOWNLOAD RESUME ↓
              </a>
              <button
                onClick={() => {
                  onSound?.();
                  onOpenProof();
                }}
                className="btn-ghost"
                style={{
                  fontSize: "0.8125rem",
                  color: "var(--yellow)",
                  borderBottom: "1px dashed var(--yellow-border)",
                }}
              >
                Recruiter 60-Sec Brief →
              </button>
            </div>
          </div>

          {/* Right: The Vinyl Turntable Platter Deck (Physical Presence) */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <div
              style={{
                width: "min(380px, 85vw)",
                aspectRatio: "1",
                background: "linear-gradient(145deg, #16161a 0%, #0d0d10 100%)",
                border: "1px solid var(--border-medium)",
                borderRadius: "var(--radius-lg)",
                boxShadow: "0 25px 60px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.08)",
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
              }}
            >
              {/* Platter Header */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: "0.6875rem",
                  fontFamily: "var(--font-mono)",
                  color: "var(--text-tertiary)",
                }}
              >
                <span>NATIVE LABS // DIRECT-DRIVE</span>
                <span style={{ color: "var(--yellow)", fontWeight: 700 }}>33 ⅓ RPM</span>
              </div>

              {/* The Spinning Vinyl Disc */}
              <div
                className="vinyl-grooves record-spin"
                style={{
                  width: "74%",
                  aspectRatio: "1",
                  margin: "0 auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "4px solid #1c1c22",
                }}
              >
                {/* Vinyl Label Sticker */}
                <div
                  style={{
                    width: "38%",
                    aspectRatio: "1",
                    borderRadius: "50%",
                    background: "var(--yellow)",
                    boxShadow: "0 0 12px rgba(0,0,0,0.8)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#09090b",
                    fontFamily: "var(--font-mono)",
                    textAlign: "center",
                    padding: "4px",
                  }}
                >
                  <div style={{ fontSize: "0.5625rem", fontWeight: 800, letterSpacing: "0.08em" }}>
                    SIDE {activeSide}
                  </div>
                  <div style={{ fontSize: "0.5rem", fontWeight: 700, opacity: 0.85 }}>
                    SHADAMORO
                  </div>
                  {/* Spindle hole */}
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: "#09090b",
                      marginTop: "2px",
                    }}
                  />
                </div>
              </div>

              {/* Platter Footer with Flip Switch */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingTop: "12px",
                  borderTop: "1px solid var(--border-subtle)",
                }}
              >
                <div className="font-mono" style={{ fontSize: "0.6875rem", color: "var(--text-tertiary)" }}>
                  STATUS: {activeSide === "A" ? "MASTER PROOF CUT" : "STUDIO DUBPLATE"}
                </div>
                <button
                  onClick={() => {
                    onSound?.();
                    onFlipSide();
                  }}
                  className="btn-ghost"
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--yellow)",
                    fontWeight: 700,
                    padding: "4px 8px",
                  }}
                >
                  FLIP RECORD ↷
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
