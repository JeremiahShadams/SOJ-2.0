"use client";

import { SITE } from "@/lib/site";

export default function Hero({
  activeSide = "A",
  onFlipSide = () => {},
  onOpenProof = () => {},
  onSound,
  heroStamp,
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
        paddingTop: "clamp(120px, 20vh, 180px)",
        paddingBottom: "clamp(60px, 10vh, 100px)",
        overflow: "hidden",
      }}
    >
      {/* Background Vinyl Record Glow Graphic */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "10%",
          right: "-120px",
          width: "clamp(340px, 45vw, 600px)",
          height: "clamp(340px, 45vw, 600px)",
          borderRadius: "50%",
          background: "radial-gradient(circle at center, rgba(255, 229, 0, 0.04) 0%, transparent 68%)",
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
            marginBottom: "24px",
            flexWrap: "wrap",
          }}
        >
          <div className="badge-yellow">RELEASE // 2026.01</div>
          <span className="font-mono" style={{ fontSize: "0.8125rem", color: "var(--text-tertiary)" }}>
            SIDE {activeSide} · TRACK 01 // MASTER OUTPUT
          </span>
          <span className="badge-live" style={{ marginLeft: "auto" }}>
            AVAILABLE REMOTE (US / EU)
          </span>
        </div>

        {/* Hero Title & Identity */}
        <div style={{ maxWidth: "900px" }}>
          <h1
            className="font-display"
            style={{
              fontSize: "clamp(2.5rem, 6.5vw, 5.2rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              margin: "0 0 20px 0",
              color: "#fff",
            }}
          >
            Jeremiah Shadamoro
          </h1>

          <div
            className="font-mono"
            style={{
              fontSize: "clamp(1rem, 2.2vw, 1.4rem)",
              fontWeight: 600,
              color: "var(--yellow)",
              letterSpacing: "-0.01em",
              marginBottom: "20px",
            }}
          >
            Software Engineer | Full-Stack (AI)
          </div>

          <p
            className="font-body"
            style={{
              fontSize: "clamp(1.05rem, 1.8vw, 1.3rem)",
              lineHeight: 1.6,
              color: "var(--text-secondary)",
              maxWidth: "700px",
              margin: "0 0 32px 0",
            }}
          >
            I architect high-throughput full-stack products, fault-tolerant payment systems, and low-latency AI pipelines. Shipped across a 30+ person Swedish remote team, Lagos state infrastructure, and on-device machine learning.
          </p>

          {/* 3 Proof Chips */}
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
              FASTAPI &amp; NEXT.JS
            </span>
          </div>

          {/* CTAs */}
          <div
            style={{
              display: "flex",
              gap: "14px",
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
              style={{ fontSize: "0.8125rem", textDecoration: "underline" }}
            >
              Recruiter 60-Sec Brief →
            </button>
            <button
              onClick={() => {
                onSound?.();
                onFlipSide();
              }}
              className="btn-ghost"
              style={{
                fontSize: "0.8125rem",
                color: "var(--yellow)",
                border: "1px dashed var(--yellow-border)",
                padding: "8px 14px",
                marginLeft: "auto",
              }}
            >
              Flip to Side B (The Studio) ↷
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
