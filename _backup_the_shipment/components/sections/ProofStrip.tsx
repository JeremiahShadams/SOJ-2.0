"use client";

import { HEADLINE_METRICS } from "@/lib/site";

export default function ProofStrip({ onSound }: { onSound?: () => void }) {
  return (
    <section
      id="proof"
      aria-label="Side A Track 02 - Verified Proof Strip"
      style={{
        position: "relative",
        padding: "clamp(36px, 6vh, 60px) 0",
        borderBottom: "1px solid var(--border-subtle)",
        background: "#0c0c0f",
      }}
    >
      <div className="site-container">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "24px",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div
            className="font-mono"
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.14em",
              color: "var(--text-tertiary)",
              fontWeight: 700,
            }}
          >
            TRACK 02 // PROOF STRIP — VERIFIED PRODUCTION OUTCOMES
          </div>
          <span className="badge-tech" style={{ fontSize: "0.6875rem" }}>
            100% PRODUCTION ACCREDITED
          </span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "18px",
          }}
        >
          {HEADLINE_METRICS.map((m) => (
            <a
              key={m.label}
              href={m.anchor}
              onClick={() => onSound?.()}
              className="card-editorial card-yellow-border"
              style={{
                textDecoration: "none",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "24px 26px",
                gap: "10px",
                background: "var(--bg-surface)",
              }}
            >
              <div>
                <div
                  className="font-display"
                  style={{
                    fontSize: "clamp(2.4rem, 4.2vw, 3.2rem)",
                    fontWeight: 700,
                    lineHeight: 1,
                    color: "var(--yellow)",
                    letterSpacing: "-0.03em",
                  }}
                >
                  {m.value}
                </div>
                <div
                  className="font-mono"
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 700,
                    color: "#ffffff",
                    margin: "12px 0 4px",
                  }}
                >
                  {m.label}
                </div>
              </div>

              <div
                className="font-body"
                style={{
                  fontSize: "0.8125rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.5,
                }}
              >
                {m.sub}
              </div>

              <div
                className="font-mono"
                style={{
                  fontSize: "0.75rem",
                  color: "var(--yellow)",
                  fontWeight: 700,
                  marginTop: "8px",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                Inspect Case Study →
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
