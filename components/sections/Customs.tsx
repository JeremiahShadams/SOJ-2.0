"use client";

import ImageSlot from "@/components/ImageSlot";

const CHIPS: { text: string; style: React.CSSProperties }[] = [
  { text: "PYTHON", style: { top: 70, left: "6%", animationDuration: "3.2s" } },
  { text: "TYPESCRIPT", style: { top: 120, right: "5%", animationDuration: "2.7s", animationDelay: ".4s" } },
  { text: "PYTORCH", style: { top: 190, left: "4%", animationDuration: "3.6s", animationDelay: ".8s" } },
  { text: "LANGCHAIN", style: { top: 210, right: "12%", animationDuration: "3.3s", animationDelay: ".5s" } },
  { text: "FASTAPI", style: { top: 250, right: "7%", animationDuration: "3s", animationDelay: ".2s" } },
  { text: "REACT", style: { top: 300, left: "10%", animationDuration: "3.4s", animationDelay: ".6s" } },
  { text: "CREWAI", style: { top: 140, left: "20%", animationDuration: "2.8s", animationDelay: ".7s" } },
  { text: "NEXT.JS", style: { top: 64, right: "26%", animationDuration: "2.9s", animationDelay: "1s" } },
  { text: "PGVECTOR", style: { top: 330, left: "30%", animationDuration: "3.2s", animationDelay: ".9s" } },
  { text: "POSTGRES", style: { top: 310, right: "30%", animationDuration: "3.1s", animationDelay: ".3s" } },
];

export default function Customs({ cleared }: { cleared: boolean }) {
  return (
    <section
      id="customs"
      aria-label="Customs - about"
      style={{ position: "relative", zIndex: 5, padding: "13vh 5vw", scrollMarginTop: 70 }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="eyebrow" style={{ marginBottom: 10 }}>
          GATE 05 / DECLARATIONS
        </div>
        <h2
          className="stencil"
          style={{ fontSize: "clamp(2.4rem,5vw,4.2rem)", margin: "0 0 40px" }}
        >
          CUSTOMS
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))",
            gap: 48,
            alignItems: "start",
          }}
        >
          {/* x-ray view */}
          <div
            style={{
              background: "#101F4E",
              border: "2px solid var(--ink)",
              boxShadow: "8px 8px 0 rgba(26,26,26,.9)",
              position: "relative",
              overflow: "hidden",
              minHeight: 420,
              padding: 24,
            }}
          >
            <div
              className="mono"
              style={{
                fontSize: 10.5,
                letterSpacing: ".16em",
                color: "#6F8FFF",
                fontWeight: 700,
              }}
            >
              X-RAY VIEW - GATE 05
            </div>
            <div
              aria-hidden="true"
              style={{
                position: "relative",
                width: 240,
                height: 180,
                margin: "52px auto 0",
                border: "2px dashed #6F8FFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* engineer-at-laptop silhouette */}
              <svg width="150" height="120" viewBox="0 0 150 120">
                <circle cx="62" cy="30" r="14" fill="none" stroke="#8FA8FF" strokeWidth="2.5" />
                <path d="M40 92 Q42 58 62 52 Q82 58 84 92" fill="none" stroke="#8FA8FF" strokeWidth="2.5" />
                <line x1="20" y1="92" x2="130" y2="92" stroke="#6F8FFF" strokeWidth="2.5" />
                <path d="M88 92 L92 70 L122 70 L126 92" fill="none" stroke="#8FA8FF" strokeWidth="2.5" />
                <line x1="92" y1="76" x2="122" y2="76" stroke="#8FA8FF" strokeWidth="2" />
              </svg>
            </div>
            <ul
              aria-label="Tools packed in the box"
              style={{ listStyle: "none", margin: 0, padding: 0 }}
            >
              {CHIPS.map((c) => (
                <li
                  key={c.text}
                  style={{
                    position: "absolute",
                    animationName: "floatChip",
                    animationTimingFunction: "ease-in-out",
                    animationIterationCount: "infinite",
                    ...c.style,
                  }}
                >
                  <span
                    className="mono"
                    style={{
                      fontSize: 9.5,
                      fontWeight: 700,
                      letterSpacing: ".08em",
                      color: "#9FB4FF",
                      border: "1.5px solid #6F8FFF",
                      padding: "3px 8px",
                    }}
                  >
                    {c.text}
                  </span>
                </li>
              ))}
            </ul>
            {cleared && (
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  width: "7%",
                  background:
                    "linear-gradient(90deg,transparent,rgba(143,168,255,.5),transparent)",
                  animation: "scanSweep 1.5s ease-in-out .1s 2 both",
                }}
              />
            )}
            <div
              className="mono"
              style={{
                position: "absolute",
                left: 24,
                right: 24,
                bottom: 18,
                fontSize: 10,
                letterSpacing: ".1em",
                color: "#9FB4FF",
                borderTop: "1px solid #31469B",
                paddingTop: 10,
              }}
            >
              CONTENTS VERIFIED: 1× FULLSTACK AI ENGINEER · ANCHOR UNIVERSITY CS ’26 · BUILDS FIRST, ASKS LATER
            </div>
          </div>

          {/* declaration form */}
          <div
            style={{
              background: "var(--paper)",
              border: "2px solid var(--ink)",
              boxShadow: "8px 8px 0 rgba(26,26,26,.9)",
              padding: "34px 36px",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: -18,
                right: 26,
                transform: "rotate(-3deg)",
              }}
            >
              <div
                style={{
                  width: "clamp(82px, 20vw, 110px)",
                  aspectRatio: "55 / 67",
                  position: "relative",
                  background: "#fff",
                  border: "2px solid var(--ink)",
                  padding: 6,
                  boxShadow: "4px 4px 0 rgba(26,26,26,.8)",
                }}
              >
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    top: -7,
                    left: "40%",
                    width: 22,
                    height: 6,
                    background: "var(--ink)",
                    transform: "rotate(-12deg)",
                  }}
                />
                <ImageSlot
                  id="passport-soj"
                  alt="Passport photo of Jeremiah Shadamoro"
                  label="PASSPORT"
                />
              </div>
            </div>
            <div className="eyebrow" style={{ marginBottom: 20 }}>
              CUSTOMS DECLARATION - FORM NL-05
            </div>
            <div
              className="mono"
              style={{
                fontSize: 12,
                letterSpacing: ".06em",
                lineHeight: 2,
                borderBottom: "1px dashed var(--tape)",
                paddingBottom: 16,
                marginBottom: 20,
                maxWidth: "88%",
              }}
            >
              OCCUPATION: <strong>FULLSTACK AI ENGINEER</strong>
              <br />
              DECLARED EXPERIENCE: <strong>TECVISON</strong> - SOFTWARE &amp; AI ENG ·{" "}
              <strong>EMPEROR FINANCIAL</strong> - AI ENG (CONTRACT)
              <br />
              ORIGIN: <strong>LAGOS, NG (WAT)</strong> · EDUCATION: <strong>ANCHOR UNIVERSITY CS ’26</strong>
            </div>
            <p style={{ fontSize: 17, lineHeight: 1.7, margin: "0 0 14px", maxWidth: "56ch" }}>
              Final-year CS at Anchor University. I've shipped AI products across legal tech, computer vision, fintech, and agentic systems. I don't wait for the green light. I build until the deploy button turns green.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.7, margin: "0 0 14px", maxWidth: "56ch" }}>
              I work the whole line: design the interface, build the backend, wire the AI, and carry the thing to production myself. That's not a job description, that's a Tuesday.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.7, margin: 0, maxWidth: "56ch" }}>
              Lagos-based, WAT timezone, overlaps U.S. mornings comfortably. Available for remote roles. When I'm not shipping, I write about what I build on Medium.
            </p>
            {cleared && (
              <div
                style={{
                  position: "absolute",
                  bottom: 22,
                  right: 26,
                  transform: "rotate(-10deg)",
                }}
              >
                <div
                  className="stamp-rect"
                  style={{
                    border: "3px solid var(--pass)",
                    color: "var(--pass)",
                    fontSize: 15,
                    letterSpacing: ".2em",
                    padding: "8px 18px",
                    boxShadow:
                      "inset 0 0 0 2px var(--paper), inset 0 0 0 4px var(--pass)",
                  }}
                >
                  CLEARED
                </div>
              </div>
            )}
          </div>
        </div>
        <div style={{ width: 2, height: 150, margin: "30px auto 0", position: "relative" }}>
          <div
            data-dock="customs"
            style={{ position: "absolute", left: 0, top: "60%", width: 2, height: 2 }}
          />
        </div>
      </div>
    </section>
  );
}
