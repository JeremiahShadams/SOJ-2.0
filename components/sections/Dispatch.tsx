"use client";

import { useRef, useState } from "react";
import type { SoundKind } from "@/lib/sound";

type Snd = (k: SoundKind) => void;
type Msg = { who: "user" | "bot"; text: string; time: string };

const CHIPS = [
  "WHAT CAN SOJ BUILD?",
  "IS HE AVAILABLE FOR U.S. REMOTE?",
  "TELL ME ABOUT CONTRACT GUARD",
  "WHY SHOULD WE HIRE HIM?",
];

// Thermal-paper torn edge on dispatcher bubbles.
const TEAR_CLIP =
  "polygon(0 0,100% 0,100% calc(100% - 6px),96% 100%,92% calc(100% - 6px),88% 100%,84% calc(100% - 6px),80% 100%,76% calc(100% - 6px),72% 100%,68% calc(100% - 6px),64% 100%,60% calc(100% - 6px),56% 100%,52% calc(100% - 6px),48% 100%,44% calc(100% - 6px),40% 100%,36% calc(100% - 6px),32% 100%,28% calc(100% - 6px),24% 100%,20% calc(100% - 6px),16% 100%,12% calc(100% - 6px),8% 100%,4% calc(100% - 6px),0 100%)";

function now(): string {
  const t = new Date();
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(t.getHours())}:${p(t.getMinutes())}`;
}

// Offline dispatcher — used whenever /api/dispatch is unreachable or errors.
function cannedReply(q: string): string {
  const ql = q.toLowerCase();
  if (ql.includes("avail") || ql.includes("hire") || ql.includes("remote")) {
    return "AFFIRMATIVE — SOJ IS CLEARED FOR U.S. REMOTE ROLES. WAT TIMEZONE, OVERLAPS YOUR MORNINGS. RADIO SHADAMS.DEV@GMAIL.COM OR SIGN FOR DELIVERY BELOW.";
  }
  if (ql.includes("contract")) {
    return "CONTRACT GUARD: RAG ENGINE FOR LEGAL DOCS. CLAUSE-AWARE CHUNKING, HYBRID RETRIEVAL, GROUNDED CITATIONS. ACCURACY 68 TO 91 PERCENT ACROSS 50 CONTRACT TYPES. FULL REPORT: OPEN CRATE, STATION 01.";
  }
  if (
    ql.includes("build") ||
    ql.includes("do") ||
    ql.includes("skill") ||
    ql.includes("work")
  ) {
    return "CARGO ON RECORD: CONTRACT GUARD (RAG, 68 TO 91 PERCENT), FRESCO (CV SHELF-LIFE), PAYTRACE (PAYMENTS), KORTEX (AGENTIC, IN PRODUCTION). SOJ DESIGNS THE INTERFACE AND ENGINEERS THE INTELLIGENCE.";
  }
  return "CHANNEL IS RUNNING ON BACKUP POWER — LIVE DISPATCHER UNREACHABLE. KNOWN FACTS: SOJ, DESIGN ENGINEER, AI PRODUCTS, LAGOS, AVAILABLE U.S. REMOTE. TRY: AVAILABILITY, CONTRACT GUARD, WHAT CAN HE BUILD.";
}

export default function Dispatch({ snd }: { snd: Snd }) {
  const [chat, setChat] = useState<Msg[]>([
    {
      who: "bot",
      text: 'DISPATCH ON SHIFT. THIS CHANNEL COVERS ONE CONSIGNMENT: JEREMIAH "SOJ" SHADAMORO, DESIGN ENGINEER. GO AHEAD.',
      time: "--:--",
    },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef(chat);
  chatRef.current = chat;

  const scrollDown = () => {
    requestAnimationFrame(() => {
      const el = scrollRef.current;
      if (el) el.scrollTop = el.scrollHeight;
    });
  };

  const send = async (raw?: string) => {
    const q = (raw ?? input).trim();
    if (!q || busy) return;
    snd("print");
    setChat((c) => [...c, { who: "user", text: q, time: now() }]);
    setInput("");
    setBusy(true);
    scrollDown();

    let reply: string;
    try {
      const history = [...chatRef.current, { who: "user" as const, text: q, time: "" }]
        .slice(-10)
        .map((m) => ({
          role: m.who === "user" ? "user" : "assistant",
          content: m.text,
        }));
      const res = await fetch("/api/dispatch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      if (!res.ok) throw new Error("offline");
      const data = await res.json();
      reply = String(data.reply || "").trim().slice(0, 600);
      if (!reply) throw new Error("empty");
    } catch {
      reply = cannedReply(q);
    }
    setChat((c) => [...c, { who: "bot", text: reply, time: now() }]);
    setBusy(false);
    snd("print");
    snd("beep");
    scrollDown();
  };

  return (
    <section
      id="dispatch"
      aria-label="Dispatch — ask the dispatcher"
      style={{ position: "relative", zIndex: 5, padding: "13vh 5vw", scrollMarginTop: 70 }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
        <div
          data-dock="dispatch"
          style={{ position: "absolute", left: "50%", top: -40, width: 2, height: 2 }}
        />
        <div className="eyebrow" style={{ marginBottom: 10 }}>
          GATE 06 / DISPATCH DESK
        </div>
        <h2
          className="stencil"
          style={{ fontSize: "clamp(2.4rem,5vw,4.2rem)", margin: "0 0 8px" }}
        >
          ASK DISPATCH.
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.6, maxWidth: "56ch", margin: "0 0 38px" }}>
          A live dispatcher is on shift. Ask anything about this consignment — the
          projects, the engineer, the availability. Replies print below.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
            gap: 48,
            alignItems: "start",
          }}
        >
          {/* intercom unit */}
          <div
            style={{
              background: "var(--ink)",
              border: "2px solid var(--ink)",
              boxShadow: "8px 8px 0 rgba(26,26,26,.4)",
              padding: 26,
              position: "relative",
              maxWidth: 420,
            }}
          >
            <div
              className="mono"
              style={{
                position: "absolute",
                top: -14,
                left: 20,
                background: "var(--safety)",
                color: "#fff",
                fontSize: 9.5,
                fontWeight: 700,
                letterSpacing: ".14em",
                padding: "4px 10px",
                border: "2px solid var(--ink)",
              }}
            >
              INTERCOM UNIT NL-06
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <span
                className="mono"
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: ".14em",
                  color: "var(--concrete)",
                }}
              >
                DISPATCH CHANNEL 1
              </span>
              <span
                className="mono"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  fontSize: 9.5,
                  fontWeight: 700,
                  letterSpacing: ".1em",
                  color: busy ? "#FFB300" : "#4CE07C",
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    width: 9,
                    height: 9,
                    borderRadius: "50%",
                    background: busy ? "#FFB300" : "#4CE07C",
                    display: "inline-block",
                    animation: busy ? "blinkB .5s infinite" : "pulseDot 2s infinite",
                  }}
                />
                {busy ? "KEYING…" : "ON AIR"}
              </span>
            </div>
            <div
              aria-hidden="true"
              style={{
                height: 110,
                background:
                  "repeating-linear-gradient(180deg,#2E2C28 0 5px,#1A1A1A 5px 10px)",
                border: "2px solid #4A473F",
                marginBottom: 18,
              }}
            />
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              {CHIPS.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  disabled={busy}
                  className="mono"
                  style={{
                    fontSize: 10.5,
                    fontWeight: 700,
                    letterSpacing: ".08em",
                    textAlign: "left",
                    background: "var(--concrete)",
                    color: "var(--ink)",
                    border: "2px solid #4A473F",
                    padding: "10px 13px",
                    cursor: busy ? "default" : "pointer",
                    opacity: busy ? 0.6 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (busy) return;
                    e.currentTarget.style.background = "var(--safety)";
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "var(--concrete)";
                    e.currentTarget.style.color = "var(--ink)";
                  }}
                >
                  ▸ {q}
                </button>
              ))}
            </div>
            <div
              className="mono"
              style={{
                fontSize: 9,
                letterSpacing: ".1em",
                color: "#8a8578",
                marginTop: 16,
              }}
            >
              HOLD BUTTON ETIQUETTE NOT REQUIRED · TYPE FREELY, RIGHT →
            </div>
          </div>

          {/* receipt printer chat */}
          <div
            style={{
              background: "var(--paper)",
              border: "2px solid var(--ink)",
              boxShadow: "8px 8px 0 rgba(26,26,26,.9)",
              padding: 22,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid var(--ink)",
                paddingBottom: 10,
                marginBottom: 14,
              }}
            >
              <span
                className="mono"
                style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: ".14em" }}
              >
                RECEIPT PRINTER — TRANSCRIPT
              </span>
              <span
                className="mono"
                style={{ fontSize: 9.5, letterSpacing: ".1em", color: "var(--muted)" }}
              >
                FEED: THERMAL 80MM
              </span>
            </div>
            <div
              ref={scrollRef}
              role="log"
              aria-live="polite"
              style={{
                height: 340,
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: 14,
                padding: "4px 2px",
              }}
            >
              {chat.map((m, i) =>
                m.who === "user" ? (
                  <div
                    key={i}
                    style={{ alignSelf: "flex-end", maxWidth: "82%", transform: "rotate(1deg)" }}
                  >
                    <div
                      style={{
                        background: "#fff",
                        border: "2px solid var(--ink)",
                        boxShadow: "3px 3px 0 rgba(26,26,26,.85)",
                        padding: "9px 12px 8px",
                        animation: "slamIn .3s cubic-bezier(.2,1.4,.4,1) both",
                      }}
                    >
                      <div
                        className="mono"
                        style={{
                          fontSize: 8.5,
                          fontWeight: 700,
                          letterSpacing: ".14em",
                          color: "var(--safety)",
                          marginBottom: 3,
                        }}
                      >
                        YOU — VISITOR BADGE
                      </div>
                      <div
                        className="mono"
                        style={{ fontSize: 12, lineHeight: 1.6, letterSpacing: ".02em" }}
                      >
                        {m.text}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    key={i}
                    style={{ alignSelf: "flex-start", maxWidth: "86%", transform: "rotate(-.6deg)" }}
                  >
                    <div
                      style={{
                        background: "#fff",
                        border: "1.5px solid #D8D2C2",
                        borderBottom: "none",
                        boxShadow: "2px 3px 0 rgba(26,26,26,.14)",
                        padding: "11px 14px 12px",
                        animation: "fadeUp .35s ease both",
                        position: "relative",
                        clipPath: TEAR_CLIP,
                      }}
                    >
                      <div
                        className="mono"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          gap: 12,
                          fontSize: 8.5,
                          fontWeight: 700,
                          letterSpacing: ".14em",
                          color: "var(--muted)",
                          marginBottom: 5,
                        }}
                      >
                        <span>DISPATCH — NATIVE LABS</span>
                        <span>{m.time}</span>
                      </div>
                      <div
                        className="mono"
                        style={{
                          fontSize: 12,
                          lineHeight: 1.7,
                          letterSpacing: ".02em",
                          whiteSpace: "pre-wrap",
                          paddingBottom: 6,
                        }}
                      >
                        {m.text}
                      </div>
                    </div>
                  </div>
                ),
              )}
              {busy && (
                <div
                  className="mono"
                  style={{
                    alignSelf: "flex-start",
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: ".12em",
                    color: "var(--muted)",
                    padding: "4px 2px",
                  }}
                >
                  DISPATCHER IS KEYING
                  <span style={{ animation: "blinkB 1s infinite" }}>▮</span>
                </div>
              )}
            </div>
            <div
              style={{
                display: "flex",
                gap: 10,
                borderTop: "2px dashed var(--tape)",
                paddingTop: 14,
                marginTop: 10,
              }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !busy) send();
                }}
                maxLength={200}
                placeholder="ASK THE DISPATCHER ANYTHING…"
                aria-label="Message to the dispatcher"
                className="input-ink"
                style={{ flex: 1, minWidth: 0, fontSize: 12, padding: "11px 12px" }}
              />
              <button
                onClick={() => send()}
                disabled={busy}
                className="mono btn-push"
                style={{
                  fontSize: 11,
                  background: "var(--cargo-blue)",
                  color: "#fff",
                  padding: "11px 16px",
                  opacity: busy ? 0.6 : 1,
                }}
              >
                SEND ▸
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
