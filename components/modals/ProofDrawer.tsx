"use client";

import { useEffect, useState } from "react";
import { SITE, HEADLINE_METRICS } from "@/lib/site";

export default function ProofDrawer({
  isOpen,
  onClose,
  onSound,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSound?: () => void;
}) {
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const copy = (val: string, label: string) => {
    navigator.clipboard.writeText(val);
    setCopied(label);
    onSound?.();
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Recruiter Proof Brief"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 250,
        display: "flex",
        justifyContent: "flex-end",
        background: "rgba(9, 9, 11, 0.75)",
        backdropFilter: "blur(6px)",
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: "min(480px, 92vw)",
          height: "100%",
          background: "var(--bg-surface)",
          borderLeft: "1px solid var(--border-medium)",
          padding: "clamp(1.5rem, 4vw, 2.5rem)",
          overflowY: "auto",
          boxShadow: "-10px 0 35px rgba(0, 0, 0, 0.75)",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div className="badge-yellow">RECRUITER 60-SEC BRIEF</div>
            <h2
              className="font-display"
              style={{ fontSize: "1.45rem", fontWeight: 700, margin: "8px 0 4px" }}
            >
              {SITE.name}
            </h2>
            <div className="font-mono" style={{ fontSize: "0.8125rem", color: "var(--text-secondary)" }}>
              {SITE.role} · {SITE.location}
            </div>
          </div>
          <button
            onClick={() => {
              onSound?.();
              onClose();
            }}
            className="btn-ghost"
            aria-label="Close proof drawer"
            style={{ fontSize: "1.2rem", padding: "6px" }}
          >
            ✕
          </button>
        </div>

        {/* Status Callout */}
        <div
          style={{
            background: "var(--bg-surface-elevated)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "var(--radius-md)",
            padding: "14px 16px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div className="badge-live">READY NOW</div>
          <div className="font-mono" style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
            WAT (UTC+1) · Overlaps US mornings & EU hours comfortably.
          </div>
        </div>

        {/* 4 Headline Proof Metrics */}
        <div>
          <div
            className="font-mono"
            style={{ fontSize: "0.6875rem", letterSpacing: "0.1em", color: "var(--text-tertiary)", marginBottom: "12px" }}
          >
            // VERIFIED PRODUCTION OUTCOMES
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            {HEADLINE_METRICS.map((m) => (
              <a
                key={m.label}
                href={m.anchor}
                onClick={onClose}
                className="card-editorial"
                style={{
                  padding: "14px",
                  textDecoration: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                }}
              >
                <div
                  className="font-display"
                  style={{ fontSize: "1.6rem", fontWeight: 700, color: "var(--yellow)", lineHeight: 1 }}
                >
                  {m.value}
                </div>
                <div
                  className="font-mono"
                  style={{ fontSize: "0.6875rem", fontWeight: 600, color: "var(--text-primary)" }}
                >
                  {m.label}
                </div>
                <div
                  className="font-body"
                  style={{ fontSize: "0.6875rem", color: "var(--text-tertiary)", lineHeight: 1.3 }}
                >
                  {m.sub}
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Primary Stack */}
        <div>
          <div
            className="font-mono"
            style={{ fontSize: "0.6875rem", letterSpacing: "0.1em", color: "var(--text-tertiary)", marginBottom: "10px" }}
          >
            // PRIMARY STACK
          </div>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {[
              "Python",
              "TypeScript",
              "Next.js",
              "FastAPI",
              "PostgreSQL",
              "pgvector",
              "LangGraph",
              "Stripe & Paystack",
              "Docker",
              "Redis",
            ].map((st) => (
              <span key={st} className="badge-tech">
                {st}
              </span>
            ))}
          </div>
        </div>

        {/* Direct Action Hub */}
        <div
          style={{
            marginTop: "auto",
            paddingTop: "20px",
            borderTop: "1px solid var(--border-subtle)",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <div style={{ display: "flex", gap: "8px" }}>
            <a href={SITE.resume} download className="btn-yellow" style={{ flex: 1 }}>
              DOWNLOAD RESUME ↓
            </a>
            <button
              onClick={() => copy(SITE.email, "email")}
              className="btn-outline"
              style={{ flex: 1 }}
            >
              {copied === "email" ? "COPIED ✓" : "COPY EMAIL"}
            </button>
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={() => copy(SITE.phone, "phone")}
              className="btn-ghost"
              style={{ flex: 1, border: "1px solid var(--border-subtle)" }}
            >
              {copied === "phone" ? "COPIED ✓" : SITE.phone}
            </button>
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
              style={{ border: "1px solid var(--border-subtle)", padding: "8px 12px" }}
            >
              LINKEDIN ↗
            </a>
            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
              style={{ border: "1px solid var(--border-subtle)", padding: "8px 12px" }}
            >
              GITHUB ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
