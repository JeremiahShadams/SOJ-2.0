"use client";

import { useEffect } from "react";

const RESULTS = [
  { big: "91%", small: "RETRIEVAL ACCURACY", delay: "1.9s" },
  { big: "+23", small: "POINTS OVER 68% BASELINE", delay: "2.05s" },
  { big: "50", small: "CONTRACT TYPES IN THE EVAL HARNESS", delay: "2.2s" },
];

const META = [
  { k: "ROLE", v: "FULLSTACK AI ENGINEER" },
  { k: "STACK", v: "PYTHON · FASTAPI · PGVECTOR · NEXT.JS" },
  { k: "TIMELINE", v: "2025" },
  { k: "STATUS", v: "SHIPPED ✓", color: "var(--pass)" },
];

function SectionLabel({ children, mb = 10 }: { children: string; mb?: number }) {
  return (
    <div
      className="mono"
      style={{
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: ".16em",
        color: "var(--safety)",
        marginBottom: mb,
      }}
    >
      {children}
    </div>
  );
}

export default function CrateModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Case study - Contract Guard inspection report"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 400,
        background: "var(--concrete)",
        overflowY: "auto",
      }}
    >
      {/* crate flaps swing open */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "50%",
          background: "var(--kraft)",
          borderBottom: "3px solid var(--ink)",
          animation: "flapUp .55s cubic-bezier(.6,0,.4,1) .05s both",
          zIndex: 2,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: "50%",
          background: "var(--kraft-dark)",
          borderTop: "3px solid var(--ink)",
          animation: "flapDn .55s cubic-bezier(.6,0,.4,1) .05s both",
          zIndex: 2,
        }}
      />
      <button
        onClick={onClose}
        className="mono btn-push"
        style={{
          position: "fixed",
          top: 18,
          right: 20,
          zIndex: 5,
          fontSize: 11,
          background: "var(--safety)",
          color: "#fff",
          padding: "10px 16px",
          boxShadow: "4px 4px 0 rgba(26,26,26,.9)",
        }}
      >
        RESEAL ✕
      </button>

      <div
        style={{
          maxWidth: 960,
          margin: "0 auto",
          padding: "70px 5vw 90px",
          animation: "fadeUp .5s ease .5s both",
          position: "relative",
          zIndex: 3,
        }}
      >
        <div
          style={{
            background: "var(--paper)",
            border: "2px solid var(--ink)",
            boxShadow: "10px 10px 0 rgba(26,26,26,.9)",
            padding: "clamp(28px,5vw,56px)",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <div className="eyebrow" style={{ marginBottom: 0 }}>
              INSPECTION REPORT - CRATE 01
            </div>
            <div style={{ transform: "rotate(6deg)" }}>
              <span
                className="stamp-rect"
                style={{
                  display: "inline-block",
                  border: "2.5px solid var(--cargo-blue)",
                  color: "var(--cargo-blue)",
                  fontSize: 11,
                  letterSpacing: ".12em",
                  padding: "7px 13px",
                  borderRadius: 5,
                  boxShadow:
                    "inset 0 0 0 2px var(--paper), inset 0 0 0 3.5px var(--cargo-blue)",
                  animationDelay: ".8s",
                  animationDuration: ".4s",
                }}
              >
                QUALITY INSPECTED
              </span>
            </div>
          </div>
          <h2
            className="stencil"
            style={{
              fontSize: "clamp(2.4rem,6vw,4.6rem)",
              margin: "14px 0 26px",
              lineHeight: 1,
            }}
          >
            CONTRACT GUARD
          </h2>

          {/* metadata grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
              gap: 0,
              border: "2px solid var(--ink)",
              marginBottom: 40,
            }}
          >
            {META.map((m, i) => (
              <div
                key={m.k}
                style={{
                  padding: "12px 16px",
                  borderRight: i < META.length - 1 ? "1px solid var(--ink)" : "none",
                }}
              >
                <div
                  className="mono"
                  style={{
                    fontSize: 9,
                    letterSpacing: ".14em",
                    color: "var(--muted)",
                    marginBottom: 4,
                  }}
                >
                  {m.k}
                </div>
                <div
                  className="mono"
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: ".04em",
                    color: m.color ?? "var(--ink)",
                  }}
                >
                  {m.v}
                </div>
              </div>
            ))}
          </div>

          <SectionLabel>01 - PROBLEM</SectionLabel>
          <p style={{ fontSize: 17.5, lineHeight: 1.7, maxWidth: "66ch", margin: "0 0 34px" }}>
            Legal teams reviewed contracts with keyword search that missed clause
            context entirely. Baseline retrieval sat at 68% - one in three questions
            surfaced the wrong clause, and every wrong clause meant a lawyer
            re-reading a 40-page document. That's not a retrieval problem. That's a business on fire.
          </p>

          <SectionLabel>02 - APPROACH</SectionLabel>
          <p style={{ fontSize: 17.5, lineHeight: 1.7, maxWidth: "66ch", margin: "0 0 26px" }}>
            Clause-aware chunking instead of naive splitting, hybrid dense + keyword
            retrieval, a reranking pass, and grounded generation that must cite the
            exact clause it answers from. An evaluation harness across 50 contract
            types kept every change honest.
          </p>

          {/* the RAG pipeline as a literal conveyor pipeline */}
          <svg
            viewBox="0 0 900 150"
            style={{ width: "100%", display: "block", margin: "0 0 40px" }}
            role="img"
            aria-label="Diagram: contracts flow through a clause-aware chunker, hybrid retriever and reranker to a grounded answer"
          >
            <rect x="8" y="50" width="130" height="50" fill="#FFFDF8" stroke="#1A1A1A" strokeWidth="2.5" />
            <text x="73" y="80" textAnchor="middle" fontFamily="Space Mono,monospace" fontSize="11" fontWeight="700" fill="#1A1A1A">
              CONTRACTS
            </text>
            <rect x="196" y="50" width="150" height="50" fill="#FFFDF8" stroke="#1A1A1A" strokeWidth="2.5" />
            <text x="271" y="74" textAnchor="middle" fontFamily="Space Mono,monospace" fontSize="11" fontWeight="700" fill="#1A1A1A">
              CLAUSE-AWARE
            </text>
            <text x="271" y="90" textAnchor="middle" fontFamily="Space Mono,monospace" fontSize="11" fontWeight="700" fill="#1A1A1A">
              CHUNKER
            </text>
            <rect x="404" y="50" width="150" height="50" fill="#FFFDF8" stroke="#1A1A1A" strokeWidth="2.5" />
            <text x="479" y="74" textAnchor="middle" fontFamily="Space Mono,monospace" fontSize="11" fontWeight="700" fill="#1A1A1A">
              HYBRID
            </text>
            <text x="479" y="90" textAnchor="middle" fontFamily="Space Mono,monospace" fontSize="11" fontWeight="700" fill="#1A1A1A">
              RETRIEVER
            </text>
            <rect x="612" y="50" width="120" height="50" fill="#FFFDF8" stroke="#1A1A1A" strokeWidth="2.5" />
            <text x="672" y="80" textAnchor="middle" fontFamily="Space Mono,monospace" fontSize="11" fontWeight="700" fill="#1A1A1A">
              RERANKER
            </text>
            <rect x="790" y="44" width="104" height="62" fill="#1E7A46" stroke="#1A1A1A" strokeWidth="2.5" />
            <text x="842" y="70" textAnchor="middle" fontFamily="Space Mono,monospace" fontSize="10.5" fontWeight="700" fill="#fff">
              GROUNDED
            </text>
            <text x="842" y="86" textAnchor="middle" fontFamily="Space Mono,monospace" fontSize="10.5" fontWeight="700" fill="#fff">
              ANSWER
            </text>
            {[
              { x1: 138, x2: 196, delay: ".9s" },
              { x1: 346, x2: 404, delay: "1.15s" },
              { x1: 554, x2: 612, delay: "1.4s" },
              { x1: 732, x2: 790, delay: "1.65s" },
            ].map((l) => (
              <line
                key={l.x1}
                x1={l.x1}
                y1="75"
                x2={l.x2}
                y2="75"
                stroke="#1F4FD8"
                strokeWidth="2.5"
                strokeDasharray="6 5"
                pathLength={1}
                style={{
                  strokeDashoffset: 1,
                  animation: `dashDraw .7s ease ${l.delay} forwards`,
                }}
              />
            ))}
            <text x="8" y="132" fontFamily="Space Mono,monospace" fontSize="9.5" fill="#6E6A5E" letterSpacing="1">
              FIG. A - THE RAG PIPELINE AS A LITERAL PIPELINE. DATA RIDES THE BELT.
            </text>
          </svg>

          <SectionLabel mb={18}>03 - RESULT</SectionLabel>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
              gap: 20,
              marginBottom: 36,
            }}
          >
            {RESULTS.map((r) => (
              <div
                key={r.big}
                style={{
                  border: "2px solid var(--pass)",
                  padding: 22,
                  animation: `slamIn .4s cubic-bezier(.2,1.4,.4,1) ${r.delay} both`,
                }}
              >
                <div
                  className="stencil"
                  style={{ fontSize: "3.2rem", color: "var(--pass)", lineHeight: 1 }}
                >
                  {r.big}
                </div>
                <div
                  className="mono"
                  style={{ fontSize: 10, letterSpacing: ".12em", marginTop: 8 }}
                >
                  {r.small}
                </div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 17.5, lineHeight: 1.7, maxWidth: "66ch", margin: 0 }}>
            Every answer now cites the exact clause it came from. The lawyers stopped
            re-reading 40-page documents. The eval harness makes regressions impossible to ship quietly. This is what happens when the person who designs the interface also engineers the retrieval pipeline.
          </p>
        </div>
        <div style={{ textAlign: "center", marginTop: 36 }}>
          <button
            onClick={onClose}
            className="mono btn-push"
            style={{
              fontSize: 12,
              letterSpacing: ".12em",
              background: "var(--paper)",
              padding: "13px 24px",
              boxShadow: "5px 5px 0 rgba(26,26,26,.9)",
            }}
          >
            RESEAL &amp; CONTINUE →
          </button>
        </div>
      </div>
    </div>
  );
}
