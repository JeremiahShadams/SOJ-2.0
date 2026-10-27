"use client";

import { useEffect, useRef, useState } from "react";
import Barcode from "@/components/Barcode";
import { SITE } from "@/lib/site";
import type { SoundKind } from "@/lib/sound";

type Snd = (k: SoundKind) => void;

export default function Delivery({
  signed,
  onSigned,
  snd,
  onReturnToTop,
}: {
  signed: boolean;
  onSigned: () => void;
  snd: Snd;
  onReturnToTop: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const [doorLit, setDoorLit] = useState(false);
  const sigRef = useRef<HTMLCanvasElement>(null);
  const signedRef = useRef(signed);
  signedRef.current = signed;

  // signature pad - pointer events on a canvas
  useEffect(() => {
    const c = sigRef.current;
    if (!c) return;
    const fit = () => {
      c.width = c.clientWidth;
      c.height = c.clientHeight;
    };
    const t = setTimeout(fit, 300);
    const ctx = c.getContext("2d");
    if (!ctx) return;
    let draw = false;
    let drew = false;

    const down = (e: PointerEvent) => {
      draw = true;
      drew = false;
      c.setPointerCapture(e.pointerId);
      const r = c.getBoundingClientRect();
      ctx.beginPath();
      ctx.moveTo(e.clientX - r.left, e.clientY - r.top);
      e.preventDefault();
    };
    const move = (e: PointerEvent) => {
      if (!draw) return;
      drew = true;
      const r = c.getBoundingClientRect();
      ctx.lineTo(e.clientX - r.left, e.clientY - r.top);
      ctx.strokeStyle = "#FF4D00";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();
    };
    const up = () => {
      draw = false;
      if (drew && !signedRef.current) onSigned();
    };

    c.addEventListener("pointerdown", down);
    c.addEventListener("pointermove", move);
    c.addEventListener("pointerup", up);
    return () => {
      clearTimeout(t);
      c.removeEventListener("pointerdown", down);
      c.removeEventListener("pointermove", move);
      c.removeEventListener("pointerup", up);
    };
    // onSigned is stable from the parent; signature wiring runs once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clearSig = () => {
    const c = sigRef.current;
    if (c) c.getContext("2d")?.clearRect(0, 0, c.width, c.height);
  };

  const copyEmail = () => {
    try {
      navigator.clipboard.writeText(SITE.email);
    } catch {
      /* clipboard unavailable */
    }
    setCopied(true);
    snd("beep");
    setTimeout(() => setCopied(false), 1600);
  };

  const doorbell = () => {
    setDoorLit(true);
    snd("ding");
    setTimeout(() => setDoorLit(false), 2600);
  };

  return (
    <section
      id="delivery"
      aria-label="Delivery - contact"
      style={{ position: "relative", zIndex: 5, padding: "14vh 5vw 0", scrollMarginTop: 70 }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="eyebrow" style={{ marginBottom: 10 }}>
          FINAL STOP / PROOF OF DELIVERY
        </div>
        <h2
          className="stencil"
          style={{ fontSize: "clamp(2.6rem,7vw,5.6rem)", margin: "0 0 50px", lineHeight: 1 }}
        >
          SIGN FOR DELIVERY.
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
            gap: 56,
            alignItems: "start",
          }}
        >
          {/* the front door */}
          <div style={{ position: "relative", padding: "10px 0 0" }}>
            <div style={{ position: "relative", width: 250, margin: "0 auto" }}>
              <div
                aria-hidden="true"
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  border: "2px solid var(--ink)",
                  margin: "0 auto 10px",
                  background: doorLit ? "#FFD98A" : "var(--paper)",
                  boxShadow: doorLit ? "0 0 34px 6px rgba(255,217,138,.85)" : "none",
                }}
              />
              <div
                aria-hidden="true"
                style={{
                  width: 220,
                  height: 330,
                  margin: "0 auto",
                  border: "3px solid var(--ink)",
                  background: "#B98F5C",
                  position: "relative",
                  boxShadow: "8px 8px 0 rgba(26,26,26,.9)",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 22,
                    left: 24,
                    right: 24,
                    height: 110,
                    border: "2px solid var(--ink)",
                    opacity: 0.45,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: 158,
                    left: 24,
                    right: 24,
                    height: 130,
                    border: "2px solid var(--ink)",
                    opacity: 0.45,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: 170,
                    right: 16,
                    width: 13,
                    height: 13,
                    borderRadius: "50%",
                    background: "var(--safety)",
                    border: "2px solid var(--ink)",
                  }}
                />
                {doorLit && (
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      bottom: 0,
                      left: -14,
                      width: 14,
                      background:
                        "linear-gradient(90deg,rgba(255,217,138,0),rgba(255,217,138,.9))",
                    }}
                  />
                )}
              </div>
              <div
                className="mono"
                style={{
                  width: 210,
                  height: 46,
                  margin: "10px auto 0",
                  background: "var(--kraft)",
                  border: "2px solid var(--ink)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: ".22em",
                  position: "relative",
                }}
              >
                {SITE.boxLabel}
                <div
                  data-dock="delivery"
                  style={{ position: "absolute", left: "50%", top: -40, width: 2, height: 2 }}
                />
              </div>
              <button
                className="mono bell-btn"
                onClick={doorbell}
                title="Ring the doorbell"
                style={{
                  position: "absolute",
                  right: -64,
                  top: 150,
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: "var(--safety)",
                  border: "2.5px solid var(--ink)",
                  boxShadow: "4px 4px 0 rgba(26,26,26,.9)",
                  cursor: "pointer",
                  fontSize: 8.5,
                  fontWeight: 700,
                  color: "#fff",
                  letterSpacing: ".06em",
                }}
              >
                RING
              </button>
            </div>
          </div>

          <div style={{ display: "grid", gap: 30 }}>
            {/* signature pad */}
            <div
              style={{
                background: "var(--paper)",
                border: "2px solid var(--ink)",
                boxShadow: "8px 8px 0 rgba(26,26,26,.9)",
                padding: 24,
                position: "relative",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <span
                  className="mono"
                  style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: ".14em" }}
                >
                  PROOF OF DELIVERY - SIGN HERE ✕
                </span>
                <button onClick={clearSig} className="btn-line">
                  CLEAR
                </button>
              </div>
              <canvas
                ref={sigRef}
                aria-label="Signature pad - draw with cursor or finger (optional)"
                style={{
                  width: "100%",
                  height: 150,
                  display: "block",
                  border: "2px dashed var(--tape)",
                  background: "#fff",
                  touchAction: "none",
                  cursor: "crosshair",
                }}
              />
              <div
                className="mono"
                style={{
                  fontSize: 9.5,
                  letterSpacing: ".1em",
                  color: "var(--muted)",
                  marginTop: 8,
                }}
              >
                DRAW WITH CURSOR OR FINGER · SIGNING IS OPTIONAL - THE RECEIPT IS YOURS
                EITHER WAY
              </div>
              {signed && (
                <div
                  style={{
                    position: "absolute",
                    top: 52,
                    right: 34,
                    transform: "rotate(-12deg)",
                    pointerEvents: "none",
                  }}
                >
                  <div
                    className="stamp-rect"
                    style={{
                      border: "3.5px solid var(--pass)",
                      color: "var(--pass)",
                      fontSize: 19,
                      letterSpacing: ".2em",
                      padding: "10px 20px",
                      borderRadius: 8,
                      boxShadow: "inset 0 0 0 2.5px #fff, inset 0 0 0 5px var(--pass)",
                      animation: "slamIn .4s cubic-bezier(.2,1.4,.4,1) both",
                      background: "rgba(255,255,255,.75)",
                    }}
                  >
                    DELIVERED ✓
                  </div>
                </div>
              )}
            </div>

            {/* delivery receipt */}
            <div
              style={{
                background: "var(--paper)",
                border: "2px solid var(--ink)",
                boxShadow: "8px 8px 0 rgba(26,26,26,.9)",
                padding: "30px 32px",
                borderBottom: "6px dashed var(--ink)",
              }}
            >
              <div
                className="mono"
                style={{
                  fontSize: 10.5,
                  fontWeight: 700,
                  letterSpacing: ".14em",
                  borderBottom: "1px solid var(--ink)",
                  paddingBottom: 10,
                  marginBottom: 18,
                }}
              >
                DELIVERY RECEIPT - {SITE.trackingNo}
              </div>
              <button
                onClick={copyEmail}
                title="Click to copy"
                className="mono"
                style={{
                  fontSize: "clamp(15px,2.4vw,21px)",
                  fontWeight: 700,
                  letterSpacing: ".02em",
                  background: "none",
                  border: "none",
                  borderBottom: "2.5px solid var(--ink)",
                  padding: "0 0 3px",
                  cursor: "pointer",
                  color: "var(--ink)",
                  wordBreak: "break-all",
                  textAlign: "left",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--safety)";
                  e.currentTarget.style.borderColor = "var(--safety)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--ink)";
                  e.currentTarget.style.borderColor = "var(--ink)";
                }}
              >
                {SITE.email}
              </button>
              <span
                className="mono"
                role="status"
                style={{
                  marginLeft: 12,
                  fontSize: 10.5,
                  fontWeight: 700,
                  letterSpacing: ".1em",
                  color: "var(--pass)",
                  opacity: copied ? 1 : 0,
                }}
              >
                COPIED ✓
              </span>
              <div className="btn-container" style={{ margin: "24px 0 26px" }}>
                <a
                  href={SITE.resume}
                  className="btn-block"
                  style={{ background: "var(--pass)", color: "#fff" }}
                >
                  RESUME ↓
                </a>
                <a
                  href={SITE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-block btn-block--ghost"
                  style={{ background: "var(--paper)", color: "var(--ink)" }}
                >
                  GITHUB ↗
                </a>
                <a
                  href={SITE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-block btn-block--ghost"
                  style={{ background: "var(--paper)", color: "var(--ink)" }}
                >
                  LINKEDIN ↗
                </a>
                <a
                  href={SITE.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-block btn-block--ghost"
                  style={{ background: "var(--paper)", color: "var(--ink)" }}
                >
                  X ↗
                </a>
                <a
                  href="https://medium.com/@jeremiahshadamoro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-block btn-block--ghost"
                  style={{ background: "var(--paper)", color: "var(--ink)" }}
                >
                  MEDIUM ↗
                </a>
              </div>
              <div style={{ maxWidth: 420 }}>
                <div
                  style={{
                    height: 64,
                    background: "#fff",
                    border: "2px solid var(--ink)",
                    padding: 5,
                  }}
                >
                  <Barcode value={`mailto:${SITE.email}`} />
                </div>
                <div
                  className="mono"
                  style={{
                    fontSize: 9.5,
                    letterSpacing: ".1em",
                    color: "var(--muted)",
                    marginTop: 6,
                  }}
                >
                  SCAN WITH YOUR PHONE CAMERA → OPENS AN EMAIL DRAFT TO ME
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* footer - the receipt strip */}
      <footer
        className="mono"
        style={{
          borderTop: "2px solid var(--ink)",
          marginTop: "12vh",
          padding: "16px 5vw 18px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 14,
          flexWrap: "wrap",
          fontSize: 10.5,
          letterSpacing: ".1em",
          color: "var(--muted)",
        }}
      >
        <span>
          © 2026 NATIVE LABS · SHIPPED FROM LAGOS · DESIGNED, BUILT & DEPLOYED BY SOJ · NO TEMPLATES
        </span>
        <span data-clock="1">-:-:- WAT</span>
        <button onClick={onReturnToTop} className="btn-line" style={{ fontSize: 10.5 }}>
          RETURN TO SENDER ↑
        </button>
      </footer>
    </section>
  );
}
