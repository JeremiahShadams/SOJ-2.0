"use client";

import { CASE_STUDIES } from "@/lib/site";

export default function SelectedWork({ onSound }: { onSound?: () => void }) {
  return (
    <section
      id="work"
      aria-label="Side A Track 03 - Selected Work"
      style={{
        position: "relative",
        padding: "clamp(70px, 12vh, 120px) 0",
      }}
    >
      <div className="site-container">
        {/* Section Header */}
        <div style={{ marginBottom: "clamp(36px, 6vh, 60px)" }}>
          <div className="badge-yellow">TRACK 03 // MASTER CASE STUDIES</div>
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
            Selected Production Work
          </h2>
          <p
            className="font-body"
            style={{
              fontSize: "clamp(0.95rem, 1.4vw, 1.125rem)",
              color: "var(--text-secondary)",
              maxWidth: "640px",
              margin: 0,
            }}
          >
            Production engineering across international distributed teams, government enterprise systems, and real-time fintech pipelines.
          </p>
        </div>

        {/* Case Studies List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(32px, 6vh, 56px)" }}>
          {CASE_STUDIES.map((cs, idx) => (
            <article
              key={cs.id}
              id={cs.id}
              className="card-editorial"
              style={{
                padding: "clamp(1.75rem, 4vw, 3rem)",
                scrollMarginTop: "90px",
              }}
            >
              {/* Header: Company, Role, Period, Location */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  borderBottom: "1px solid var(--border-subtle)",
                  paddingBottom: "18px",
                  marginBottom: "24px",
                  flexWrap: "wrap",
                  gap: "12px",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                    <span className="font-mono" style={{ fontSize: "0.75rem", color: "var(--yellow)", fontWeight: 700 }}>
                      0{idx + 1} //
                    </span>
                    <h3
                      className="font-display"
                      style={{ fontSize: "clamp(1.4rem, 2.8vw, 2rem)", fontWeight: 700, margin: 0, color: "#fff" }}
                    >
                      {cs.company}
                    </h3>
                    <span className="badge-tech">{cs.team}</span>
                  </div>
                  <div
                    className="font-mono"
                    style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", marginTop: "4px" }}
                  >
                    {cs.role} · {cs.location}
                  </div>
                </div>

                <div className="font-mono" style={{ fontSize: "0.8125rem", color: "var(--text-tertiary)" }}>
                  {cs.period}
                </div>
              </div>

              {/* Tagline */}
              <div
                className="font-display"
                style={{
                  fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  marginBottom: "24px",
                  lineHeight: 1.4,
                }}
              >
                {cs.tagline}
              </div>

              {/* "The Find" — Recruiter Gold Highlight Box */}
              <div
                style={{
                  background: "rgba(255, 229, 0, 0.05)",
                  border: "1px solid var(--yellow-border)",
                  borderRadius: "var(--radius-sm)",
                  padding: "16px 20px",
                  marginBottom: "28px",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "14px",
                }}
              >
                <span
                  className="font-mono"
                  style={{
                    color: "var(--yellow)",
                    fontWeight: 800,
                    fontSize: "0.75rem",
                    letterSpacing: "0.1em",
                    whiteSpace: "nowrap",
                    paddingTop: "2px",
                  }}
                >
                  THE FIND //
                </span>
                <p
                  className="font-body"
                  style={{
                    fontSize: "0.9375rem",
                    color: "var(--text-primary)",
                    margin: 0,
                    lineHeight: 1.5,
                    fontStyle: "italic",
                  }}
                >
                  “{cs.theFind}”
                </p>
              </div>

              {/* Context & Constraint Grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "24px",
                  marginBottom: "28px",
                }}
              >
                <div>
                  <div
                    className="font-mono"
                    style={{
                      fontSize: "0.6875rem",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      color: "var(--text-tertiary)",
                      marginBottom: "6px",
                    }}
                  >
                    CONTEXT
                  </div>
                  <p
                    className="font-body"
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--text-secondary)",
                      margin: 0,
                      lineHeight: 1.6,
                    }}
                  >
                    {cs.context}
                  </p>
                </div>

                <div>
                  <div
                    className="font-mono"
                    style={{
                      fontSize: "0.6875rem",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      color: "var(--text-tertiary)",
                      marginBottom: "6px",
                    }}
                  >
                    ENGINEERING CONSTRAINT
                  </div>
                  <p
                    className="font-body"
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--text-secondary)",
                      margin: 0,
                      lineHeight: 1.6,
                    }}
                  >
                    {cs.constraint}
                  </p>
                </div>
              </div>

              {/* What I Built */}
              <div style={{ marginBottom: "24px" }}>
                <div
                  className="font-mono"
                  style={{
                    fontSize: "0.6875rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    color: "var(--text-tertiary)",
                    marginBottom: "10px",
                  }}
                >
                  WHAT I BUILT &amp; SHIPPED
                </div>
                <ul
                  style={{
                    margin: 0,
                    paddingLeft: "18px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  {cs.built.map((b, i) => (
                    <li
                      key={i}
                      className="font-body"
                      style={{
                        fontSize: "0.875rem",
                        color: "var(--text-secondary)",
                        lineHeight: 1.55,
                      }}
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tradeoffs & Architecture */}
              <div
                style={{
                  background: "var(--bg-surface-elevated)",
                  borderRadius: "var(--radius-sm)",
                  padding: "16px 20px",
                  marginBottom: "24px",
                }}
              >
                <div
                  className="font-mono"
                  style={{
                    fontSize: "0.6875rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    color: "var(--yellow)",
                    marginBottom: "6px",
                  }}
                >
                  ARCHITECTURAL DECISION &amp; TRADEOFFS
                </div>
                <p
                  className="font-body"
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--text-secondary)",
                    margin: 0,
                    lineHeight: 1.55,
                  }}
                >
                  {cs.tradeoffs}
                </p>
              </div>

              {/* Result Metric Card & Stack */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "16px",
                  paddingTop: "16px",
                  borderTop: "1px solid var(--border-subtle)",
                }}
              >
                <div>
                  <span
                    className="font-display"
                    style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--yellow)" }}
                  >
                    {cs.metric.value}
                  </span>
                  <span
                    className="font-mono"
                    style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginLeft: "8px" }}
                  >
                    {cs.metric.label}
                  </span>
                </div>

                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {cs.stack.map((st) => (
                    <span key={st} className="badge-tech">
                      {st}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
