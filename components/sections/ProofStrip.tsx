"use client";

import { HEADLINE_METRICS } from "@/lib/site";

export default function ProofStrip({ onSound }: { onSound?: () => void }) {
  return (
    <section
      id="proof"
      aria-label="Side A Track 02 - Verified Proof Strip"
      style={{
        position: "relative",
        padding: "clamp(30px, 5vh, 50px) 0",
        borderTop: "1px solid var(--border-subtle)",
        borderBottom: "1px solid var(--border-subtle)",
        background: "rgba(17, 17, 20, 0.4)",
      }}
    >
      <div className="site-container">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <div className="font-mono" style={{ fontSize: "0.6875rem", letterSpacing: "0.14em", color: "var(--text-tertiary)" }}>
            TRACK 02 // PROOF STRIP — NO ESTIMATES, VERIFIED METRICS
          </div>
          <span className="badge-tech" style={{ fontSize: "0.625rem" }}>
            100% PRODUCTION ACCREDITED
          </span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "16px",
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
                padding: "20px 22px",
                gap: "8px",
              }}
            >
              <div>
                <div
                  className="font-display"
                  style={{
                    fontSize: "clamp(2rem, 3.8vw, 2.75rem)",
                    fontWeight: 700,
                    lineHeight: 1,
                    color: "var(--yellow)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {m.value}
                </div>
                <div
                  className="font-mono"
                  style={{
                    fontSize: "0.8125rem",
                    fontWeight: 700,
                    color: "#fff",
                    margin: "8px 0 4px",
                  }}
                >
                  {m.label}
                </div>
              </div>
              <div
                className="font-body"
                style={{
                  fontSize: "0.75rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.45,
                }}
              >
                {m.sub}
              </div>
              <div
                className="font-mono"
                style={{
                  fontSize: "0.6875rem",
                  color: "var(--yellow)",
                  fontWeight: 600,
                  marginTop: "6px",
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
