"use client";

import Barcode from "@/components/Barcode";
import { SITE } from "@/lib/site";

export default function Hero({ heroStamp }: { heroStamp: boolean }) {
  return (
    <section
      id="label"
      aria-label="Station 00 — The Label"
      style={{
        position: "relative",
        zIndex: 5,
        padding: "86px 5vw 6vh",
        scrollMarginTop: 70,
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div
          className="mono"
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 10.5,
            letterSpacing: ".12em",
            color: "var(--muted)",
            borderTop: "1px solid var(--ink)",
            borderBottom: "1px solid var(--ink)",
            padding: "8px 2px",
            flexWrap: "wrap",
            gap: 6,
          }}
        >
          <span>SOJ</span>
          <span>
            <span data-clock="1">—:—:— WAT</span> · LAGOS, NG
          </span>
        </div>

        {/* labeling machine */}
        <svg
          width="240"
          height="132"
          viewBox="0 0 240 132"
          aria-hidden="true"
          style={{ display: "block", margin: "26px auto 0" }}
        >
          <line x1="120" y1="0" x2="120" y2="46" stroke="#1A1A1A" strokeWidth="5" />
          <rect x="66" y="46" width="108" height="36" fill="#FFFDF8" stroke="#1A1A1A" strokeWidth="3" />
          <text
            x="120"
            y="69"
            textAnchor="middle"
            fontFamily="Space Mono,monospace"
            fontSize="11"
            fontWeight="700"
            fill="#1A1A1A"
            letterSpacing="1"
          >
            LABELER-01
          </text>
          <circle cx="182" cy="52" r="5" fill="#FF4D00" />
          <line x1="96" y1="82" x2="96" y2="114" stroke="#1A1A1A" strokeWidth="3" />
          <line x1="144" y1="82" x2="144" y2="114" stroke="#1A1A1A" strokeWidth="3" />
          <rect x="80" y="114" width="80" height="12" fill="#1A1A1A" />
        </svg>
        <div data-dock="hero" style={{ width: 2, height: 150, margin: "0 auto" }} />

        {/* the shipping label = hero content */}
        <div
          style={{
            position: "relative",
            background: "var(--paper)",
            border: "2px solid var(--ink)",
            boxShadow: "10px 10px 0 rgba(26,26,26,.9)",
            maxWidth: 920,
            margin: "60px auto 0",
            padding: "42px 48px 44px",
          }}
        >
          <div
            data-type="1"
            className="mono"
            style={{ fontSize: 12.5, letterSpacing: ".12em", color: "var(--ink)" }}
          >
            SHIP FROM: LAGOS, NIGERIA (WAT)
          </div>
          <h1
            className="stencil"
            style={{
              fontSize: "clamp(2.6rem,8.4vw,7rem)",
              lineHeight: 0.98,
              letterSpacing: ".01em",
              margin: "18px 0 14px",
              width: "110%",
              marginLeft: "-5%",
              animation: "sprayIn .7s ease .4s both",
              textWrap: "balance",
            }}
          >
            {SITE.name}
          </h1>
          <div
            data-type="1"
            className="mono"
            style={{ fontSize: 12.5, letterSpacing: ".12em" }}
          >
            DECLARED VALUE: DESIGN ENGINEER AI PRODUCTS, END-TO-END
          </div>
          <div
            className="mono"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginTop: 14,
              fontSize: 12.5,
              letterSpacing: ".12em",
              fontWeight: 700,
              color: "var(--pass)",
            }}
          >
            <span
              aria-hidden="true"
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "var(--pass)",
                display: "inline-block",
                animation: "pulseDot 2s infinite",
              }}
            />
            HANDLING: AVAILABLE FOR REMOTE ROLES
          </div>
          <p
            style={{
              fontSize: "clamp(17px,2vw,21px)",
              lineHeight: 1.55,
              maxWidth: "58ch",
              margin: "26px 0 30px",
            }}
          >
            I design the interface <strong>and</strong> engineer the intelligence
            behind it. Legal Systems, food systems, payments packed, inspected and
            shipped from Lagos.
          </p>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 18, flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 230, maxWidth: 380 }}>
              <div
                style={{
                  height: 58,
                  background: "#fff",
                  border: "2px solid var(--ink)",
                  padding: 5,
                }}
              >
                <Barcode value={SITE.github} />
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
                REAL CODE 128 — SCAN WITH A PHONE → MY GITHUB
              </div>
            </div>
          </div>
          {heroStamp && (
            <div
              style={{
                position: "absolute",
                top: -22,
                right: -18,
                transform: "rotate(9deg)",
              }}
            >
              <div
                className="stamp-rect"
                style={{
                  border: "3px solid var(--safety)",
                  color: "var(--safety)",
                  fontSize: 12,
                  letterSpacing: ".1em",
                  padding: "8px 14px",
                  background: "var(--paper)",
                  boxShadow:
                    "inset 0 0 0 2px var(--paper), inset 0 0 0 3.5px var(--safety)",
                }}
              >
                FRAGILE: HANDLE WITH AMBITION
              </div>
            </div>
          )}
        </div>

        <div
          className="mono"
          style={{
            textAlign: "center",
            marginTop: "9vh",
            fontSize: 11,
            letterSpacing: ".18em",
            animation: "hintP 2.4s infinite",
          }}
        >
          SCROLL TO START THE LINE ▼
        </div>
      </div>
    </section>
  );
}
