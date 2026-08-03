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
              Most legal AI is a search bar wearing a suit. Contract Guard actually reads contracts: clause-aware chunking, hybrid retrieval, reranking, and a citation stapled to every answer. I designed the interface, built the API, tuned the retrieval. The jump from 68% to 91% wasn't a model swap. It was engineering.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              <MetricTag color="var(--pass)">
                RETRIEVAL 68% → 91% · 50 CONTRACT TYPES
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

      {/* ══════════ STATION 03 - PAYTRACE ══════════ */}
      <section
        aria-label="Station 03 - PayTrace"
        style={{ position: "relative", zIndex: 5, padding: "13vh 5vw" }}
      >
        <div className="station-grid">
          <div style={cardStyle}>
            <div className="eyebrow">STATION 03 / SETTLEMENTS</div>
            <h2
              className="stencil"
              style={{ fontSize: "clamp(2.2rem,4vw,3.6rem)", lineHeight: 1, margin: "0 0 16px" }}
            >
              PAYTRACE
            </h2>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
              <span className="chip">FINTECH</span>
              <span className="chip">RECONCILIATION</span>
              <span className="chip">FULLSTACK</span>
            </div>
            <p style={{ fontSize: 17, lineHeight: 1.65, margin: "0 0 18px", maxWidth: "52ch" }}>
              Payment infrastructure where every transaction leaves a paper trail. Reconciliation and tracing built for systems that treat 'money went missing' as an unacceptable sentence. Fullstack engineering with zero tolerance for silent failures.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              <MetricTag color="var(--ink)">EVERY KOBO ACCOUNTED FOR</MetricTag>
              <StationStamp show={!!fired.s3} color="#1A1A1A" rot={-6}>
                SETTLED ✓
              </StationStamp>
            </div>
            <div style={{ marginTop: 24 }}>
              <span
                className="mono"
                style={{ fontSize: 12, letterSpacing: ".1em", color: "var(--muted)" }}
              >
                REPORT: SEALED - ON REQUEST
              </span>
            </div>
          </div>
          <BoltedFrame
            slotId="shot-paytrace"
            slotAlt="PayTrace product screenshot"
            slotLabel="PAYTRACE"
            caption="FIG. 03 - PAYTRACE / MOUNTED INSPECTION SCREEN"
            dock="s3"
          />
        </div>
      </section>

      {/* ══════════ STATION 04 - KORTEX ══════════ */}
      <section
        aria-label="Station 04 - Kortex"
        style={{ position: "relative", zIndex: 5, padding: "13vh 5vw" }}
      >
        <div className="station-grid">
          <div style={{ order: 0 }}>
            <BoltedFrame
              slotId="shot-kortex"
              slotAlt="Kortex work-in-progress screenshot"
              slotLabel="KORTEX"
              caption="FIG. 04 - KORTEX / GANTRY PARTIALLY TAPED"
              dock="s4"
              beacon
              constructionTape
            />
          </div>
          <div style={{ ...cardStyle, order: 1 }}>
            <div className="eyebrow">STATION 04 / IN PRODUCTION</div>
            <h2
              className="stencil"
              style={{ fontSize: "clamp(2.2rem,4vw,3.6rem)", lineHeight: 1, margin: "0 0 16px" }}
            >
              KORTEX
            </h2>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
              <span className="chip">AGENTIC AI</span>
              <span className="chip">MULTI-AGENT</span>
              <span className="chip">BUILT IN PUBLIC</span>
            </div>
            <p style={{ fontSize: 17, lineHeight: 1.65, margin: "0 0 18px", maxWidth: "52ch" }}>
              An agentic AI content system: multiple agents coordinating, planning, executing. Being built in public because the best way to prove you can build AI agents is to let people watch. The line is live. The crate is not yet sealed. Watch this station.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              <MetricTag color="var(--safety)">STATUS: IN PRODUCTION ●</MetricTag>
              <StationStamp show={!!fired.s4} color="#FF4D00" rot={8}>
                IN PROD
              </StationStamp>
            </div>
            <div style={{ marginTop: 24 }}>
              <span
                className="mono"
                style={{ fontSize: 12, letterSpacing: ".1em", color: "var(--muted)" }}
              >
                CRATE NOT YET SEALED
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
