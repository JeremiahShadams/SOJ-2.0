"use client";

import { useState } from "react";
import { SITE, CASE_STUDIES, SKILL_CATEGORIES } from "@/lib/site";

export default function ResumeSection({ onSound }: { onSound?: () => void }) {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (val: string, label: string) => {
    navigator.clipboard.writeText(val);
    setCopied(label);
    onSound?.();
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section
      id="resume"
      aria-label="Side A Track 05 - The Scannable Web Resume"
      style={{
        position: "relative",
        padding: "clamp(70px, 12vh, 120px) 0",
        borderTop: "1px solid var(--border-subtle)",
      }}
    >
      <div className="site-container">
        {/* Section Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "clamp(36px, 6vh, 60px)",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <div>
            <div className="badge-yellow">TRACK 05 // CURRICULUM VITAE — RECRUITER EDITION</div>
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
              Resume &amp; Qualifications
            </h2>
            <p
              className="font-body"
              style={{
                fontSize: "clamp(0.95rem, 1.4vw, 1.125rem)",
                color: "var(--text-secondary)",
                maxWidth: "600px",
                margin: 0,
              }}
            >
              Formatted for 60-second recruiter scans and deep technical verification. Zero iframe embeds.
            </p>
          </div>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <a
              href={SITE.resume}
              download
              onClick={() => onSound?.()}
              className="btn-yellow"
            >
              DOWNLOAD RESUME (PDF) ↓
            </a>
            <button
              onClick={() => copy(SITE.email, "email")}
              className="btn-outline"
            >
              {copied === "email" ? "COPIED EMAIL ✓" : "COPY EMAIL"}
            </button>
          </div>
        </div>

        {/* The Resume Dossier Sheet */}
        <div
          className="card-editorial"
          style={{
            padding: "clamp(1.75rem, 4vw, 3.5rem)",
            background: "var(--bg-surface)",
          }}
        >
          {/* Dossier Meta Strip */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "20px",
              paddingBottom: "28px",
              borderBottom: "1px solid var(--border-subtle)",
              marginBottom: "36px",
            }}
          >
            <div>
              <div className="font-mono" style={{ fontSize: "0.6875rem", color: "var(--text-tertiary)" }}>
                CANDIDATE
              </div>
              <div className="font-display" style={{ fontSize: "1.125rem", fontWeight: 700, color: "#fff" }}>
                {SITE.name}
              </div>
            </div>

            <div>
              <div className="font-mono" style={{ fontSize: "0.6875rem", color: "var(--text-tertiary)" }}>
                ROLE &amp; FOCUS
              </div>
              <div className="font-mono" style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--yellow)" }}>
                {SITE.role}
              </div>
            </div>

            <div>
              <div className="font-mono" style={{ fontSize: "0.6875rem", color: "var(--text-tertiary)" }}>
                AVAILABILITY
              </div>
              <div className="font-body" style={{ fontSize: "0.875rem", color: "var(--text-primary)" }}>
                US / EU Remote Cleared
              </div>
            </div>

            <div>
              <div className="font-mono" style={{ fontSize: "0.6875rem", color: "var(--text-tertiary)" }}>
                BASE LOCATION
              </div>
              <div className="font-body" style={{ fontSize: "0.875rem", color: "var(--text-primary)" }}>
                Lagos, Nigeria (WAT / UTC+1)
              </div>
            </div>
          </div>

          {/* Timeline Section */}
          <div style={{ marginBottom: "48px" }}>
            <div
              className="font-mono"
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                color: "var(--yellow)",
                marginBottom: "24px",
              }}
            >
              // 01 PROFESSIONAL EXPERIENCE
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "36px" }}>
              {CASE_STUDIES.map((job) => (
                <div
                  key={job.company}
                  style={{
                    position: "relative",
                    paddingLeft: "24px",
                    borderLeft: "2px solid var(--border-medium)",
                  }}
                >
                  {/* Timeline bullet dot */}
                  <div
                    style={{
                      position: "absolute",
                      left: "-6px",
                      top: "4px",
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      background: "var(--yellow)",
                      boxShadow: "0 0 10px var(--yellow-glow)",
                    }}
                  />

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      flexWrap: "wrap",
                      gap: "8px",
                      marginBottom: "6px",
                    }}
                  >
                    <div>
                      <span
                        className="font-display"
                        style={{ fontSize: "1.2rem", fontWeight: 700, color: "#fff" }}
                      >
                        {job.company}
                      </span>
                      <span
                        className="font-mono"
                        style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginLeft: "10px" }}
                      >
                        — {job.role}
                      </span>
                    </div>

                    <div className="font-mono" style={{ fontSize: "0.75rem", color: "var(--text-tertiary)" }}>
                      {job.period} · {job.location}
                    </div>
                  </div>

                  <ul
                    style={{
                      margin: "12px 0 14px",
                      paddingLeft: "18px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    {job.built.map((pt, i) => (
                      <li
                        key={i}
                        className="font-body"
                        style={{
                          fontSize: "0.875rem",
                          color: "var(--text-secondary)",
                          lineHeight: 1.5,
                        }}
                      >
                        {pt}
                      </li>
                    ))}
                  </ul>

                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {job.stack.map((st) => (
                      <span key={st} className="badge-tech" style={{ fontSize: "0.625rem" }}>
                        {st}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education Section */}
          <div style={{ marginBottom: "48px" }}>
            <div
              className="font-mono"
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                color: "var(--yellow)",
                marginBottom: "20px",
              }}
            >
              // 02 EDUCATION &amp; ACADEMICS
            </div>

            <div
              style={{
                paddingLeft: "24px",
                borderLeft: "2px solid var(--border-medium)",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: "-6px",
                  top: "4px",
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: "var(--border-strong)",
                }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  flexWrap: "wrap",
                  gap: "8px",
                }}
              >
                <div>
                  <span
                    className="font-display"
                    style={{ fontSize: "1.15rem", fontWeight: 700, color: "#fff" }}
                  >
                    {SITE.education.institution}
                  </span>
                  <span
                    className="font-mono"
                    style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginLeft: "10px" }}
                  >
                    — {SITE.education.degree}
                  </span>
                </div>
                <div className="font-mono" style={{ fontSize: "0.75rem", color: "var(--text-tertiary)" }}>
                  {SITE.education.period} · {SITE.education.status} · {SITE.education.location}
                </div>
              </div>
            </div>
          </div>

          {/* Skills Matrix */}
          <div>
            <div
              className="font-mono"
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                color: "var(--yellow)",
                marginBottom: "20px",
              }}
            >
              // 03 TECHNICAL SKILLS MATRIX
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "20px",
              }}
            >
              {SKILL_CATEGORIES.map((cat) => (
                <div
                  key={cat.name}
                  style={{
                    background: "var(--bg-surface-elevated)",
                    borderRadius: "var(--radius-sm)",
                    padding: "18px 20px",
                  }}
                >
                  <div
                    className="font-mono"
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: "#fff",
                      marginBottom: "12px",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {cat.name}
                  </div>
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {cat.skills.map((sk) => (
                      <span key={sk} className="badge-tech" style={{ fontSize: "0.6875rem" }}>
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
