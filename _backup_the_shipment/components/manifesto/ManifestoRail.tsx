"use client";

import { useState } from "react";
import { MANIFESTO_TENETS } from "@/lib/site";

export default function ManifestoRail({ onSoundClick }: { onSoundClick?: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Discreet floating Yellow Manifesto sticker / tab on the edge */}
      <aside
        aria-label="Design and Engineering Manifesto"
        style={{
          position: "fixed",
          right: 0,
          top: "42%",
          transform: "translateY(-50%)",
          zIndex: 90,
          pointerEvents: "auto",
        }}
      >
        <button
          onClick={() => {
            onSoundClick?.();
            setOpen((prev) => !prev);
          }}
          aria-expanded={open}
          aria-label="Toggle Design Manifesto Guardrail"
          style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            background: "var(--yellow)",
            color: "#09090b",
            fontFamily: "var(--font-mono)",
            fontSize: "0.6875rem",
            fontWeight: 800,
            letterSpacing: "0.14em",
            padding: "14px 8px",
            border: "none",
            borderRadius: "0 6px 6px 0",
            cursor: "pointer",
            boxShadow: "-3px 0 16px rgba(0, 0, 0, 0.4), 0 0 14px var(--yellow-glow)",
            transition: "all var(--transition-fast)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "rotate(180deg) translateX(3px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "rotate(180deg)";
          }}
        >
          <span>THE MANIFESTO</span>
          <span style={{ fontSize: "0.5625rem", opacity: 0.85 }}>
            {open ? "✕" : "07 TENETS"}
          </span>
        </button>
      </aside>

      {/* Slide-out Manifesto Drawer / Guardrail Card */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Design & Engineering Guardrail"
          style={{
            position: "fixed",
            right: 18,
            top: "32%",
            width: "min(340px, 86vw)",
            background: "var(--bg-surface)",
            border: "1px solid var(--yellow-border)",
            borderRadius: "var(--radius-md)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.7), 0 0 20px var(--yellow-glow)",
            zIndex: 100,
            padding: "24px",
            animation: "manifestoSlide 0.2s cubic-bezier(0.16, 1, 0.3, 1) both",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              borderBottom: "1px solid var(--border-subtle)",
              paddingBottom: "12px",
              marginBottom: "16px",
            }}
          >
            <div>
              <div className="badge-yellow">DESIGN GUARDRAIL</div>
              <div
                className="font-display"
                style={{ fontSize: "1.1rem", fontWeight: 700, marginTop: "6px" }}
              >
                The 7 Tenets
              </div>
            </div>
            <button
              onClick={() => {
                onSoundClick?.();
                setOpen(false);
              }}
              aria-label="Close Manifesto"
              className="btn-ghost"
              style={{ fontSize: "1rem", padding: "4px" }}
            >
              ✕
            </button>
          </div>

          <p
            className="font-body"
            style={{
              fontSize: "0.8125rem",
              color: "var(--text-secondary)",
              lineHeight: 1.5,
              marginBottom: "16px",
            }}
          >
            Every line of code and interface decision in this portfolio is held to this single standard:
          </p>

          <ol
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {MANIFESTO_TENETS.map((tenet, idx) => (
              <li
                key={tenet}
                className="font-mono"
                style={{
                  fontSize: "0.8125rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  color: idx === MANIFESTO_TENETS.length - 1 ? "var(--yellow)" : "var(--text-primary)",
                  fontWeight: idx === MANIFESTO_TENETS.length - 1 ? 800 : 500,
                }}
              >
                <span
                  style={{
                    fontSize: "0.6875rem",
                    color: "var(--text-tertiary)",
                    width: "18px",
                  }}
                >
                  0{idx + 1}
                </span>
                <span>{tenet}</span>
              </li>
            ))}
          </ol>

          <div
            style={{
              marginTop: "20px",
              paddingTop: "14px",
              borderTop: "1px dashed var(--border-subtle)",
              fontSize: "0.75rem",
              color: "var(--text-tertiary)",
              fontFamily: "var(--font-mono)",
            }}
          >
            SOJ / NATIVE LABS · LAGOS, NG
          </div>
        </div>
      )}
    </>
  );
}
