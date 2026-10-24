"use client";

import { LAB_PROJECTS } from "@/lib/site";

export default function Lab({ onSound }: { onSound?: () => void }) {
  return (
    <section
      id="lab"
      aria-label="Side A Track 04 - The Lab"
      style={{
        position: "relative",
        padding: "clamp(60px, 10vh, 100px) 0",
        borderTop: "1px solid var(--border-subtle)",
        background: "rgba(17, 17, 20, 0.25)",
      }}
    >
      <div className="site-container">
        {/* Section Header */}
        <div style={{ marginBottom: "clamp(32px, 5vh, 50px)" }}>
          <div className="badge-yellow">TRACK 04 // THE LAB — SYSTEMS &amp; EXPERIMENTS</div>
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
            Shipped AI &amp; Applied Systems
          </h2>
          <p
            className="font-body"
            style={{
              fontSize: "clamp(0.95rem, 1.4vw, 1.125rem)",
              color: "var(--text-secondary)",
              maxWidth: "680px",
              margin: 0,
            }}
          >
            These are not toy wrappers or API playground experiments. They are working production architectures with measured inference latencies, verified groundings, and edge deployments.
          </p>
        </div>

        {/* Lab Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "24px",
          }}
        >
          {LAB_PROJECTS.map((proj) => (
            <div
              key={proj.id}
              id={proj.id}
              className="card-editorial"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "28px",
                scrollMarginTop: "90px",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "14px",
                    flexWrap: "wrap",
                    gap: "8px",
                  }}
                >
                  <span className="badge-yellow">{proj.badge}</span>
                  {proj.liveUrl && <span className="badge-live">LIVE DEPLOYMENT</span>}
                </div>

                <h3
                  className="font-display"
                  style={{
                    fontSize: "1.75rem",
                    fontWeight: 700,
                    margin: "0 0 4px 0",
                    color: "#fff",
                  }}
                >
                  {proj.name}
                </h3>
                <div
                  className="font-mono"
                  style={{ fontSize: "0.8125rem", color: "var(--yellow)", marginBottom: "16px" }}
                >
                  {proj.role}
                </div>

                <p
                  className="font-body"
                  style={{
                    fontSize: "0.9375rem",
                    fontWeight: 500,
                    color: "var(--text-primary)",
                    lineHeight: 1.5,
                    marginBottom: "16px",
                  }}
                >
                  {proj.tagline}
                </p>

                <p
                  className="font-body"
                  style={{
                    fontSize: "0.8125rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.6,
                    marginBottom: "20px",
                  }}
                >
                  {proj.description}
                </p>

                {/* Architecture Pipeline Callout */}
                <div
                  style={{
                    background: "var(--bg-surface-elevated)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "var(--radius-sm)",
                    padding: "12px 14px",
                    marginBottom: "20px",
                  }}
                >
                  <div
                    className="font-mono"
                    style={{
                      fontSize: "0.625rem",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      color: "var(--text-tertiary)",
                      marginBottom: "4px",
                    }}
                  >
                    DATA &amp; INFERENCE FLOW
                  </div>
                  <div
                    className="font-mono"
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--text-secondary)",
                      lineHeight: 1.45,
                    }}
                  >
                    {proj.architecture}
                  </div>
                </div>

                {/* Verified Metric Badge */}
                <div
                  style={{
                    background: "rgba(255, 229, 0, 0.06)",
                    border: "1px dashed var(--yellow-border)",
                    borderRadius: "var(--radius-sm)",
                    padding: "10px 14px",
                    marginBottom: "20px",
                  }}
                >
                  <div
                    className="font-mono"
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: "var(--yellow)",
                    }}
                  >
                    {proj.metric}
                  </div>
                </div>
              </div>

              {/* Stack & Action Links */}
              <div>
                <div
                  style={{
                    display: "flex",
                    gap: "6px",
                    flexWrap: "wrap",
                    marginBottom: "20px",
                  }}
                >
                  {proj.stack.map((st) => (
                    <span key={st} className="badge-tech" style={{ fontSize: "0.625rem" }}>
                      {st}
                    </span>
                  ))}
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                    borderTop: "1px solid var(--border-subtle)",
                    paddingTop: "16px",
                    flexWrap: "wrap",
                  }}
                >
                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => onSound?.()}
                      className="btn-yellow"
                      style={{ fontSize: "0.75rem", padding: "8px 14px" }}
                    >
                      LAUNCH DEMO ↗
                    </a>
                  )}
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => onSound?.()}
                      className="btn-outline"
                      style={{ fontSize: "0.75rem", padding: "8px 14px" }}
                    >
                      SOURCE CODE ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
