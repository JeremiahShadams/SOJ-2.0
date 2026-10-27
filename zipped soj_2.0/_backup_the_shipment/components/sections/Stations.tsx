"use client";

import type { CSSProperties, ReactNode } from "react";
import ImageSlot from "@/components/ImageSlot";
import { SITE } from "@/lib/site";

type Fired = Record<string, boolean>;

const cardStyle: CSSProperties = {
  background: "var(--paper)",
  border: "2px solid var(--ink)",
  boxShadow: "8px 8px 0 rgba(26,26,26,.9)",
  padding: "34px 36px",
  position: "relative",
};

function StationStamp({
  show,
  color,
  rot,
  children,
}: {
  show: boolean;
  color: string;
  rot: number;
  children: ReactNode;
}) {
  if (!show) return null;
  return (
    <span style={{ display: "inline-block", transform: `rotate(${rot}deg)` }}>
      <span
        className="stamp-round"
        style={{
          border: `2.5px solid ${color}`,
          color,
          boxShadow: `inset 0 0 0 2px var(--paper), inset 0 0 0 3.5px ${color}`,
        }}
      >
        {children}
      </span>
    </span>
  );
}

function MetricTag({ color, children }: { color: string; children: ReactNode }) {
  return (
    <span
      className="mono"
      style={{
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: ".06em",
        color,
        border: `2px solid ${color}`,
        padding: "7px 12px",
        background: "#fff",
      }}
    >
      {children}
    </span>
  );
}

function BoltedFrame({
  slotId,
  slotAlt,
  slotLabel,
  caption,
  dock,
  beacon,
  constructionTape,
}: {
  slotId: string;
  slotAlt: string;
  slotLabel: string;
  caption: string;
  dock: string;
  beacon?: boolean;
  constructionTape?: boolean;
}) {
  return (
    <div style={{ position: "relative", paddingTop: 26 }}>
      <div className="gantry-top" aria-hidden="true" />
      <div
        style={{
          position: "relative",
          background: "var(--paper)",
          border: "2px solid var(--ink)",
          boxShadow: "8px 8px 0 rgba(26,26,26,.9)",
          padding: 14,
        }}
      >
        {!beacon && (
          <>
            <div className="bolt" style={{ top: 5, left: 5 }} aria-hidden="true" />
            <div className="bolt" style={{ top: 5, right: 5 }} aria-hidden="true" />
            <div className="bolt" style={{ bottom: 5, left: 5 }} aria-hidden="true" />
            <div className="bolt" style={{ bottom: 5, right: 5 }} aria-hidden="true" />
          </>
        )}
        {beacon && (
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 8,
              right: 10,
              width: 11,
              height: 11,
              borderRadius: "50%",
              background: "var(--safety)",
              animation: "blinkB 1.1s infinite",
              zIndex: 2,
            }}
          />
        )}
        <div
          style={{
            height: "clamp(220px, 34vw, 360px)",
            minHeight: 0,
            position: "relative",
          }}
        >
          <ImageSlot id={slotId} alt={slotAlt} label={slotLabel} />
        </div>
        {constructionTape && (
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "44%",
              left: "-4%",
              right: "-4%",
              height: 26,
              background:
                "repeating-linear-gradient(45deg,#1A1A1A 0 14px,#FF4D00 14px 28px)",
              border: "2px solid var(--ink)",
              transform: "rotate(-4deg)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              className="mono"
              style={{
                background: "var(--paper)",
                fontSize: 9.5,
                fontWeight: 700,
                letterSpacing: ".16em",
                padding: "2px 10px",
                border: "1px solid var(--ink)",
              }}
            >
              UNDER CONSTRUCTION - DO NOT CROSS
            </span>
          </div>
        )}
        <div
          className="mono"
          style={{
            fontSize: 9.5,
            letterSpacing: ".12em",
            color: "var(--muted)",
            marginTop: 10,
            textAlign: "center",
          }}
        >
          {caption}
        </div>
      </div>
      <div style={{ height: 190, position: "relative" }}>
        <div
          data-dock={dock}
          style={{ position: "absolute", left: "50%", bottom: 36, width: 2, height: 2 }}
        />
      </div>
    </div>
  );
}

export default function Stations({
  fired,
  onOpenCrate,
}: {
  fired: Fired;
  onOpenCrate: () => void;
}) {
  return (
    <>
      {/* ══════════ STATION 01 - CONTRACT GUARD ══════════ */}
      <section
        id="manifest"
        aria-label="Station 01 - Contract Guard"
        style={{ position: "relative", zIndex: 5, padding: "13vh 5vw", scrollMarginTop: 70 }}
      >
        <div className="station-grid">
          <div style={cardStyle}>
            <div className="eyebrow">STATION 01 / QUALITY CONTROL</div>
            <h2
              className="stencil"
              style={{ fontSize: "clamp(2.2rem,4vw,3.6rem)", lineHeight: 1, margin: "0 0 16px" }}
            >
              CONTRACT GUARD
            </h2>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
              <span className="chip">RAG PIPELINE</span>
              <span className="chip">LEGAL AI</span>
              <span className="chip">FULLSTACK</span>
            </div>
            <div className="mono" style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18, fontSize: 10, fontWeight: 700, color: "var(--ink)" }}>
              <span>[ PYTHON ]</span>
              <span>[ FASTAPI ]</span>
              <span>[ PGVECTOR ]</span>
              <span>[ NEXT.JS ]</span>
            </div>
            <p style={{ fontSize: 17, lineHeight: 1.65, margin: "0 0 18px", maxWidth: "52ch" }}>
              Most legal AI is a search bar wearing a suit. Contract Guard actually reads contracts: clause-aware chunking, hybrid retrieval, reranking, and a citation stapled to every answer. I designed the interface, built the API, and wired the Groq inference engine. It doesn't just search; it explains risk.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              <MetricTag color="var(--pass)">
                CLAUSE-LEVEL RISK SCORING · GROQ INFERENCE
              </MetricTag>
              <StationStamp show={!!fired.s1} color="#1E7A46" rot={-8}>
                QUALITY INSPECTED
              </StationStamp>
            </div>
            <div style={{ marginTop: 24 }}>
              <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
                <a
                  href={SITE.projects.contractGuard}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mono"
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: ".1em",
                    color: "var(--cargo-blue)",
                    borderBottom: "2px solid var(--cargo-blue)",
                    padding: "2px 0",
                    textDecoration: "none",
                  }}
                >
                  LAUNCH CONTRACT GUARD ↗
                </a>
                <a
                  href={SITE.projects.contractGuardGithub}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mono"
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: ".1em",
                    color: "var(--cargo-blue)",
                    borderBottom: "2px solid var(--cargo-blue)",
                    padding: "2px 0",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--safety)";
                    e.currentTarget.style.borderColor = "var(--safety)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--cargo-blue)";
                    e.currentTarget.style.borderColor = "var(--cargo-blue)";
                  }}
                >
                  SOURCE CODE [GITHUB] ↗
                </a>
              <button
                onClick={onOpenCrate}
                className="mono"
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: ".1em",
                  color: "var(--cargo-blue)",
                  background: "none",
                  border: "none",
                  borderBottom: "2px solid var(--cargo-blue)",
                  padding: "2px 0",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--safety)";
                  e.currentTarget.style.borderColor = "var(--safety)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--cargo-blue)";
                  e.currentTarget.style.borderColor = "var(--cargo-blue)";
                }}
              >
                OPEN CRATE ↗ - INSPECTION REPORT
              </button>
              </div>
            </div>
          </div>
          <BoltedFrame
            slotId="shot-contract-guard"
            slotAlt="Contract Guard product screenshot"
            slotLabel="CONTRACT GUARD"
            caption="FIG. 01 - CONTRACT GUARD / MOUNTED INSPECTION SCREEN"
            dock="s1"
          />
        </div>
      </section>

      {/* ══════════ STATION 02 - FRESCO ══════════ */}
      <section
        aria-label="Station 02 - Fresco"
        style={{ position: "relative", zIndex: 5, padding: "13vh 5vw" }}
      >
        <div className="station-grid">
          <div style={{ position: "relative", paddingTop: 26, order: 0 }}>
            <div className="gantry-top" aria-hidden="true" />
            <div
              style={{
                position: "relative",
                background: "var(--paper)",
                border: "2px solid var(--cargo-blue)",
                boxShadow: "8px 8px 0 rgba(31,79,216,.55)",
                padding: 14,
              }}
            >
              <div
                className="mono"
                style={{
                  position: "absolute",
                  top: -14,
                  left: 18,
                  background: "var(--cargo-blue)",
                  color: "#fff",
                  fontSize: 9.5,
                  fontWeight: 700,
                  letterSpacing: ".14em",
                  padding: "4px 10px",
                }}
              >
                COLD CHAIN UNIT - 4°C
              </div>
              <div
                style={{
                  height: "clamp(300px, 72vw, 420px)",
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    width: "clamp(180px, 54vw, 250px)",
                    height: "100%",
                    position: "relative",
                    border: "2px solid var(--ink)",
                    background: "#fff",
                    padding: 8,
                  }}
                >
                  <ImageSlot
                    id="shot-fresco"
                    alt="Fresco mobile app capture"
                    label="FRESCO"
                  />
                </div>
              </div>
              <div
                className="mono"
                style={{
                  fontSize: 9.5,
                  letterSpacing: ".12em",
                  color: "var(--muted)",
                  marginTop: 10,
                  textAlign: "center",
                }}
              >
                FIG. 02 - FRESCO / REFRIGERATED DISPLAY
              </div>
            </div>
            <div style={{ height: 190, position: "relative" }}>
              <div
                data-dock="s2"
                style={{ position: "absolute", left: "50%", bottom: 36, width: 2, height: 2 }}
              />
            </div>
          </div>
          <div style={{ ...cardStyle, order: 1 }}>
            <div
              className="mono"
              style={{
                position: "absolute",
                top: -16,
                right: 22,
                transform: "rotate(6deg)",
                background: "var(--cargo-blue)",
                color: "#fff",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: ".12em",
                padding: "6px 12px",
                boxShadow: "3px 3px 0 var(--ink)",
              }}
            >
              PERISHABLE ❆
            </div>
            <div className="eyebrow">STATION 02 / COLD CHAIN</div>
            <h2
              className="stencil"
              style={{ fontSize: "clamp(2.2rem,4vw,3.6rem)", lineHeight: 1, margin: "0 0 16px" }}
            >
              FRESCO
            </h2>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
              <span className="chip">COMPUTER VISION</span>
              <span className="chip">ON-DEVICE ML</span>
              <span className="chip">MOBILE</span>
            </div>
            <div className="mono" style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18, fontSize: 10, fontWeight: 700, color: "var(--ink)" }}>
              <span>[ PYTORCH MOBILE ]</span>
              <span>[ TENSORFLOW LITE ]</span>
              <span>[ REACT NATIVE ]</span>
            </div>
            <p style={{ fontSize: 17, lineHeight: 1.65, margin: "0 0 18px", maxWidth: "52ch" }}>
              Point your phone at a tomato. Fresco tells you how many days it has left. Computer vision running on-device: no cloud round-trip, no latency excuse. I designed the UX, trained the model, shipped the fullstack. Because nobody else was going to.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              <MetricTag color="var(--cargo-blue)">
                CV SHELF-LIFE ESTIMATOR · ON-DEVICE
              </MetricTag>
              <StationStamp show={!!fired.s2} color="#1F4FD8" rot={7}>
                KEEP CHILLED
              </StationStamp>
            </div>
            <div style={{ marginTop: 24 }}>
              <a
                href={SITE.projects.fresco}
                target="_blank"
                rel="noopener noreferrer"
                className="mono"
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: ".1em",
                  color: "var(--cargo-blue)",
                  borderBottom: "2px solid var(--cargo-blue)",
                  padding: "2px 0",
                  textDecoration: "none",
                }}
              >
                LAUNCH FRESCO ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ STATION 03 - Q&A AGENT ══════════ */}
      <section
        aria-label="Station 03 - Codebase Q&A Agent"
        style={{ position: "relative", zIndex: 5, padding: "13vh 5vw" }}
      >
        <div className="station-grid">
          <div style={cardStyle}>
            <div className="eyebrow">STATION 03 / HYBRID RETRIEVAL</div>
            <h2
              className="stencil"
              style={{ fontSize: "clamp(2.2rem,4vw,3.6rem)", lineHeight: 1, margin: "0 0 16px" }}
            >
              CODEBASE Q&A AGENT
            </h2>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
              <span className="chip">LANGGRAPH</span>
              <span className="chip">OPENAI EMBEDDINGS</span>
              <span className="chip">PGVECTOR</span>
            </div>
            <p style={{ fontSize: 17, lineHeight: 1.65, margin: "0 0 18px", maxWidth: "52ch" }}>
              A complex LangGraph agent that ingests entire codebases, performs hybrid semantic chunk search, and generates grounded citations with human-in-the-loop fallbacks. Real-time SSE streaming via FastAPI.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              <MetricTag color="var(--ink)">TRACING VIA LANGSMITH</MetricTag>
              <StationStamp show={!!fired.s3} color="#1A1A1A" rot={-6}>
                LANGGRAPH LIVE
              </StationStamp>
            </div>
            <div style={{ marginTop: 24, display: "flex", gap: 16 }}>
              <span
                className="mono"
                style={{ fontSize: 12, letterSpacing: ".1em", color: "var(--muted)", alignSelf: "center" }}
              >
                STATUS: IN PRODUCTION
              </span>
            </div>
          </div>
          <BoltedFrame
            slotId="shot-qa-agent"
            slotAlt="Codebase Q&A Agent UI"
            slotLabel="Q&A AGENT"
            caption="FIG. 03 - Q&A AGENT / SEMANTIC CACHE"
            dock="s3"
          />
        </div>
      </section>

      {/* ══════════ STATION 04 - MCP SERVER ══════════ */}
      <section
        aria-label="Station 04 - MCP Server"
        style={{ position: "relative", zIndex: 5, padding: "13vh 5vw" }}
      >
        <div className="station-grid">
          <div style={{ order: 0 }}>
            <BoltedFrame
              slotId="shot-mcp"
              slotAlt="MCP Server terminal output"
              slotLabel="MCP SERVER"
              caption="FIG. 04 - MCP SERVER / CLAUDE DESKTOP INTEGRATION"
              dock="s4"
            />
          </div>
          <div style={{ ...cardStyle, order: 1 }}>
            <div className="eyebrow">STATION 04 / PROTOCOL</div>
            <h2
              className="stencil"
              style={{ fontSize: "clamp(2.2rem,4vw,3.6rem)", lineHeight: 1, margin: "0 0 16px" }}
            >
              MCP SERVER
            </h2>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
              <span className="chip">MODEL CONTEXT PROTOCOL</span>
              <span className="chip">CLAUDE DESKTOP</span>
            </div>
            <p style={{ fontSize: 17, lineHeight: 1.65, margin: "0 0 18px", maxWidth: "52ch" }}>
              A Model Context Protocol (MCP) server that exposes codebase retrieval endpoints directly to Claude Desktop. Allows local LLMs to natively search and analyze your specific repository vectors without context window limits.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              <MetricTag color="var(--safety)">NATIVE AI TOOLING</MetricTag>
              <StationStamp show={!!fired.s4} color="#FF4D00" rot={8}>
                CONNECTED
              </StationStamp>
            </div>
            <div style={{ marginTop: 24 }}>
              <span
                className="mono"
                style={{ fontSize: 12, letterSpacing: ".1em", color: "var(--muted)" }}
              >
                REPORT: PROTOCOL ACTIVE
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ STATION 05 - NL TO SQL AGENT ══════════ */}
      <section
        aria-label="Station 05 - NL to SQL Agent"
        style={{ position: "relative", zIndex: 5, padding: "13vh 5vw" }}
      >
        <div className="station-grid">
          <div style={cardStyle}>
            <div className="eyebrow">STATION 05 / INTROSPECTION</div>
            <h2
              className="stencil"
              style={{ fontSize: "clamp(2.2rem,4vw,3.6rem)", lineHeight: 1, margin: "0 0 16px" }}
            >
              NL → SQL AGENT
            </h2>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
              <span className="chip">LLM TO SQL</span>
              <span className="chip">POSTGRESQL</span>
              <span className="chip">STRUCTURED DATA</span>
            </div>
            <p style={{ fontSize: 17, lineHeight: 1.65, margin: "0 0 18px", maxWidth: "52ch" }}>
              An agent that takes plain English queries, dynamically introspects PostgreSQL database schemas, generates safe read-only SQL, and interprets the results back to the user. Closing the gap between natural language and structured data.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              <MetricTag color="var(--ink)">DYNAMIC SCHEMA INTROSPECTION</MetricTag>
              <StationStamp show={!!fired.s5} color="#1E7A46" rot={-4}>
                EXECUTED
              </StationStamp>
            </div>
            <div style={{ marginTop: 24 }}>
              <span
                className="mono"
                style={{ fontSize: 12, letterSpacing: ".1em", color: "var(--muted)" }}
              >
                REPORT: QUERIES ROUTED
              </span>
            </div>
          </div>
          <BoltedFrame
            slotId="shot-sql-agent"
            slotAlt="NL to SQL Agent"
            slotLabel="SQL AGENT"
            caption="FIG. 05 - SQL AGENT / QUERY GENERATION"
            dock="s5"
          />
        </div>
      </section>
    </>
  );
}
