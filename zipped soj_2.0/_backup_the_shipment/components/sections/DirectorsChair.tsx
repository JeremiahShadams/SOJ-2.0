"use client";

import { DIRECTOR_BOARDS } from "@/lib/site";

export default function DirectorsChair({ onSound }: { onSound?: () => void }) {
  return (
    <section
      id="directors-chair"
      aria-label="Side B Track 03 - Director's Chair"
      style={{
        position: "relative",
        padding: "clamp(70px, 12vh, 120px) 0",
        borderTop: "1px solid var(--border-subtle)",
      }}
    >
      <div className="site-container">
        {/* Section Header */}
        <div style={{ marginBottom: "clamp(32px, 5vh, 50px)" }}>
          <div className="badge-yellow">SIDE B // TRACK B03 — DIRECTOR&apos;S CHAIR</div>
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
            Cinematic Storyboarding for Software
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
            I study directing and cinematography as a hobby. It directly informs how I engineer software: framing the problem, cutting out friction, and pacing the user&apos;s journey.
          </p>
        </div>

        {/* 3 Storyboard Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
          }}
        >
          {DIRECTOR_BOARDS.map((board) => (
            <div
              key={board.scene}
              className="card-editorial"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "28px",
                borderTop: "3px solid var(--yellow)",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "12px",
                  }}
                >
                  <span className="font-mono" style={{ fontSize: "0.75rem", color: "var(--yellow)", fontWeight: 700 }}>
                    {board.scene}
                  </span>
                  <span className="badge-tech">{board.tag}</span>
                </div>

                <h3
                  className="font-display"
                  style={{
                    fontSize: "1.3rem",
                    fontWeight: 700,
                    color: "#fff",
                    margin: "0 0 10px 0",
                  }}
                >
                  {board.title}
                </h3>

                <div
                  className="font-body"
                  style={{
                    fontSize: "0.9375rem",
                    fontWeight: 600,
                    color: "var(--yellow)",
                    marginBottom: "16px",
                    fontStyle: "italic",
                  }}
                >
                  &ldquo;{board.takeaway}&rdquo;
                </div>

                <p
                  className="font-body"
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {board.text}
                </p>
              </div>

              {/* Storyboard 16:9 Viewfinder Mockup */}
              <div
                style={{
                  marginTop: "24px",
                  paddingTop: "16px",
                  borderTop: "1px dashed var(--border-subtle)",
                }}
              >
                <div
                  style={{
                    aspectRatio: "16 / 9",
                    background: "#0c0c0e",
                    border: "1px solid var(--border-medium)",
                    borderRadius: "var(--radius-sm)",
                    position: "relative",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* Viewfinder crosshairs */}
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      width: "16px",
                      height: "16px",
                      border: "1px solid rgba(255, 229, 0, 0.4)",
                      pointerEvents: "none",
                    }}
                  />
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      top: "8px",
                      left: "10px",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.625rem",
                      color: "var(--text-tertiary)",
                    }}
                  >
                    24 FPS · 1/50 · 4K UHD
                  </div>
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      bottom: "8px",
                      right: "10px",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.625rem",
                      color: "var(--yellow)",
                    }}
                  >
                    REC [●]
                  </div>
                  <span
                    className="font-mono"
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--text-secondary)",
                      letterSpacing: "0.06em",
                    }}
                  >
                    FRAMING: {board.tag}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
