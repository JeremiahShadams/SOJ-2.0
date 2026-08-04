"use client";

import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { SITE } from "@/lib/site";
import type { SoundKind } from "@/lib/sound";

type Snd = (k: SoundKind) => void;

const BUBBLE_COUNT = 60;

const toyCard: React.CSSProperties = {
  background: "var(--paper)",
  border: "2px solid var(--ink)",
  boxShadow: "6px 6px 0 rgba(26,26,26,.9)",
  padding: 22,
};

/* ── BUBBLE WRAP ── */
function BubbleWrap({ snd }: { snd: Snd }) {
  const [bubbles, setBubbles] = useState<boolean[]>(() =>
    Array(BUBBLE_COUNT).fill(false),
  );
  const popCount = bubbles.filter(Boolean).length;
  const done = popCount === BUBBLE_COUNT;

  const pop = (i: number) => {
    if (bubbles[i]) return;
    setBubbles((b) => {
      const next = [...b];
      next[i] = true;
      if (next.every(Boolean)) snd("bell");
      return next;
    });
    snd("pop");
  };

  return (
    <div style={toyCard}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 14,
          gap: 8,
          flexWrap: "wrap",
        }}
      >
        <span
          className="mono"
          style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: ".12em" }}
        >
          BUBBLE WRAP — QA STRESS RELIEF
        </span>
        <span
          className="mono"
          style={{ fontSize: 10.5, letterSpacing: ".08em", color: "var(--muted)" }}
        >
          POPS: {popCount}/{BUBBLE_COUNT}
        </span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(10,1fr)", gap: 6 }}>
        {bubbles.map((popped, i) => (
          <button
            key={i}
            onClick={() => pop(i)}
            aria-label={popped ? "Popped bubble" : "Pop bubble"}
            style={{
              width: "100%",
              aspectRatio: "1",
              borderRadius: "50%",
              cursor: "pointer",
              padding: 0,
              background: popped ? "#E3DFD5" : "#FFFFFF",
              border: `2px solid ${popped ? "#CFC9BA" : "#B9B29E"}`,
              transform: popped ? "scale(.9)" : "scale(1)",
              boxShadow: popped
                ? "inset 0 2px 4px rgba(0,0,0,.18)"
                : "0 2px 0 rgba(0,0,0,.14)",
            }}
          />
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 14,
          minHeight: 44,
        }}
      >
        {done && (
          <span style={{ display: "inline-block", transform: "rotate(-5deg)" }}>
            <span
              className="stamp-rect"
              style={{
                display: "inline-block",
                border: "2.5px solid var(--safety)",
                color: "var(--safety)",
                fontSize: 10,
                letterSpacing: ".1em",
                padding: "6px 12px",
                borderRadius: 5,
                boxShadow:
                  "inset 0 0 0 2px var(--paper), inset 0 0 0 3.5px var(--safety)",
              }}
            >
              CERTIFIED PROCRASTINATOR
            </span>
          </span>
        )}
        <button
          onClick={() => setBubbles(Array(BUBBLE_COUNT).fill(false))}
          className="btn-line"
          style={{ marginLeft: "auto" }}
        >
          RE-WRAP
        </button>
      </div>
    </div>
  );
}

/* ── LABEL MAKER ── */
type PrintedLabel = { id: number; text: string; x: number; y: number; rot: number };

function LabelMaker({ snd }: { snd: Snd }) {
  const [text, setText] = useState("");
  const [labels, setLabels] = useState<PrintedLabel[]>([]);
  const labelsRef = useRef(labels);
  labelsRef.current = labels;

  useEffect(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem("soj-labels") || "[]");
      if (Array.isArray(saved) && saved.length) setLabels(saved);
    } catch {
      /* ignore */
    }
  }, []);

  const save = (next: PrintedLabel[]) => {
    try {
      sessionStorage.setItem("soj-labels", JSON.stringify(next));
    } catch {
      /* ignore */
    }
  };

  const print = () => {
    const t = text.trim().slice(0, 24).toUpperCase();
    if (!t) return;
    const lb: PrintedLabel = {
      id: Date.now(),
      text: t,
      x: 14 + Math.random() * 120,
      y: 12 + Math.random() * 120,
      rot: Math.round(Math.random() * 12 - 6),
    };
    setLabels((prev) => {
      const next = [...prev, lb];
      save(next);
      return next;
    });
    setText("");
    snd("print");
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") print();
  };

  const down = (e: ReactPointerEvent, id: number) => {
    e.preventDefault();
    const l = labelsRef.current.find((o) => o.id === id);
    if (!l) return;
    const sx = e.clientX - l.x;
    const sy = e.clientY - l.y;
    const mv = (ev: PointerEvent) => {
      setLabels((prev) =>
        prev.map((o) =>
          o.id === id ? { ...o, x: ev.clientX - sx, y: ev.clientY - sy } : o,
        ),
      );
    };
    const up = () => {
      window.removeEventListener("pointermove", mv);
      window.removeEventListener("pointerup", up);
      save(labelsRef.current);
    };
    window.addEventListener("pointermove", mv);
    window.addEventListener("pointerup", up);
  };

  return (
    <div style={toyCard}>
      <div
        className="mono"
        style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: ".12em", marginBottom: 14 }}
      >
        LABEL MAKER — MARK THE SITE
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, 24))}
          onKeyDown={onKey}
          maxLength={24}
          placeholder="TYPE ANYTHING (24 CHARS)"
          aria-label="Label text"
          className="input-ink"
          style={{
            flex: 1,
            minWidth: 0,
            fontSize: 12,
            textTransform: "uppercase",
            padding: "9px 10px",
          }}
        />
        <button
          onClick={print}
          className="mono btn-push"
          style={{
            fontSize: 11,
            background: "var(--safety)",
            color: "#fff",
            padding: "9px 14px",
          }}
        >
          PRINT
        </button>
      </div>
      <div
        style={{
          position: "relative",
          height: 220,
          marginTop: 14,
          border: "2px dashed var(--tape)",
          overflow: "hidden",
          touchAction: "none",
        }}
      >
        {labels.map((lb) => (
          <div
            key={lb.id}
            onPointerDown={(e) => down(e, lb.id)}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              transform: `translate(${lb.x}px,${lb.y}px) rotate(${lb.rot}deg)`,
              cursor: "grab",
              touchAction: "none",
              background: "#fff",
              border: "2px solid var(--ink)",
              boxShadow: "3px 3px 0 rgba(26,26,26,.85)",
              padding: "7px 10px 6px",
              animation: "slamIn .3s cubic-bezier(.2,1.4,.4,1) both",
              userSelect: "none",
            }}
          >
            <div
              className="stencil"
              style={{ fontSize: 13, letterSpacing: ".06em", whiteSpace: "nowrap" }}
            >
              {lb.text}
            </div>
            <div
              style={{
                height: 8,
                marginTop: 4,
                background:
                  "repeating-linear-gradient(90deg,#1A1A1A 0 2px,transparent 2px 5px)",
              }}
            />
          </div>
        ))}
        <div
          className="mono"
          style={{
            position: "absolute",
            inset: "auto 8px 6px auto",
            fontSize: 9,
            letterSpacing: ".1em",
            color: "var(--tape)",
            pointerEvents: "none",
          }}
        >
          DRAG YOUR STICKERS AROUND
        </div>
      </div>
    </div>
  );
}

/* ── RECEIPT TERMINAL ── */
type TermLine = { t: string; c: string };

function Terminal({ snd }: { snd: Snd }) {
  const [lines, setLines] = useState<TermLine[]>([
    { t: "NATIVE LABS - RECEIPT TERMINAL v3.0", c: "#1A1A1A" },
    { t: "TYPE 'HELP' AND HIT ENTER", c: "#8a8578" },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const run = (cmd: string) => {
    if (cmd === "clear") {
      setLines([]);
      setInput("");
      return;
    }
    const out: TermLine[] = [{ t: "> " + cmd, c: "#8a8578" }];
    const G = "#1E7A46";
    const I = "#1A1A1A";
    const D = "#8a8578";
    const O = "#FF4D00";
    if (cmd === "help") {
      out.push(
        { t: "COMMANDS: WORK · CONTACT · TRACK · BLOG · WHOAMI · CLEAR", c: I },
        { t: "PRIVILEGED: SUDO HIRE SOJ", c: D },
      );
    } else if (cmd === "work" || cmd === "manifest") {
      out.push(
        { t: "01 CONTRACT GUARD - RAG · HYBRID RETRIEVAL", c: I },
        { t: "02 FRESCO - CV SHELF-LIFE ESTIMATOR", c: I },
        { t: "03 CODEBASE Q&A - LANGGRAPH SEMANTIC SEARCH", c: I },
        { t: "04 MCP SERVER - CLAUDE DESKTOP INTEGRATION", c: I },
        { t: "05 NL TO SQL - SCHEMA INTROSPECTION", c: O },
      );
    } else if (cmd === "contact") {
      out.push(
        { t: `${SITE.email.toUpperCase()} - REPLIES FROM WAT`, c: I },
        { t: `GITHUB: ${SITE.github}`, c: I },
        { t: `LINKEDIN: ${SITE.linkedin}`, c: I },
        { t: `X: ${SITE.x}`, c: I },
      );
    } else if (cmd === "track") {
      out.push({ t: `CONSIGNMENT ${SITE.trackingNo}: SEE HUD, BOTTOM-LEFT`, c: I });
    } else if (cmd === "whoami") {
      out.push({ t: "CURIOUS RECRUITER: YOU'RE EXACTLY WHERE YOU SHOULD BE. TYPE 'SUDO HIRE SOJ' WHEN READY.", c: I });
    } else if (cmd === "sudo hire soj") {
      out.push(
        { t: "════════ PACKING SLIP ════════", c: I },
        { t: "1× FULLSTACK AI ENGINEER - INTERFACE TO INTELLIGENCE", c: I },
        { t: "SHIP TO: YOUR TEAM (THEY'LL THANK YOU LATER)", c: I },
        { t: `CONTACT: ${SITE.email.toUpperCase()}`, c: I },
        { t: "PERMISSION GRANTED ✓", c: G },
      );
      snd("bell");
    } else if (cmd === "blog" || cmd === "medium" || cmd === "writing") {
      out.push(
        { t: "REDIRECTING TO MEDIUM...", c: I },
        { t: "URL: HTTPS://MEDIUM.COM/@JEREMIAHSHADAMORO", c: D },
        { t: "WARNING: MAY CONTAIN HIGHLY OPINIONATED TECHNICAL TAKES", c: O },
      );
    } else {
      out.push({ t: `COMMAND NOT FOUND: ${cmd.toUpperCase()} - TRY 'HELP'`, c: O });
    }
    setLines((prev) => [...prev, ...out]);
    setInput("");
    snd("print");
    requestAnimationFrame(() => {
      const el = scrollRef.current;
      if (el) el.scrollTop = el.scrollHeight;
    });
  };

  return (
    <div
      style={{
        ...toyCard,
        padding: "22px 22px 26px",
        backgroundImage:
          "linear-gradient(180deg,transparent 96%,rgba(26,26,26,.06) 100%)",
      }}
    >
      <div
        className="mono"
        style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: ".12em", marginBottom: 14 }}
      >
        RECEIPT TERMINAL — TRY “SUDO HIRE SOJ”
      </div>
      <div
        ref={scrollRef}
        className="mono"
        style={{
          height: "35vh",
          minHeight: 220,
          maxHeight: 280,
          overflowY: "auto",
          fontSize: 11.5,
          lineHeight: 1.85,
          letterSpacing: ".03em",
          border: "1px solid #E0DBCD",
          padding: 12,
          background: "#fff",
        }}
      >
        {lines.map((l, i) => (
          <div key={i} style={{ color: l.c, whiteSpace: "pre-wrap" }}>
            {l.t}
          </div>
        ))}
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <span style={{ color: "var(--safety)", fontWeight: 700 }} aria-hidden="true">
            &gt;
          </span>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && input.trim()) run(input.trim().toLowerCase());
            }}
            placeholder="help"
            aria-label="Terminal command"
            className="mono"
            style={{
              flex: 1,
              minWidth: 0,
              fontSize: 11.5,
              letterSpacing: ".03em",
              border: "none",
              outline: "none",
              background: "transparent",
              textTransform: "lowercase",
            }}
          />
        </div>
      </div>
    </div>
  );
}

/* ── THE DEPOT ── */
export default function Depot({ snd }: { snd: Snd }) {
  return (
    <section
      id="depot"
      aria-label="Depot - playground"
      style={{ position: "relative", zIndex: 5, padding: "10vh 5vw", scrollMarginTop: 70 }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative" }}>
        <div
          data-dock="depot"
          style={{ position: "absolute", left: "6%", top: "40%", width: 2, height: 2 }}
        />
        <div
          style={{
            border: "3px dashed var(--ink)",
            padding: "38px clamp(18px,4vw,48px) 44px",
            position: "relative",
          }}
        >
          <div
            className="mono"
            style={{
              position: "absolute",
              top: -14,
              left: 28,
              background: "var(--concrete)",
              padding: "2px 12px",
              fontSize: 10.5,
              fontWeight: 700,
              letterSpacing: ".14em",
            }}
          >
            DEPOT - AUTHORIZED PERSONNEL, CURIOUS RECRUITERS &amp; BORED ENGINEERS ONLY
          </div>
          <h2
            className="stencil"
            style={{ fontSize: "clamp(2rem,4vw,3.2rem)", margin: "0 0 34px" }}
          >
            THE DEPOT{" "}
            <span
              className="mono"
              style={{
                fontSize: 12,
                letterSpacing: ".14em",
                color: "var(--muted)",
                fontWeight: 400,
              }}
            >
              - A SIDING OFF THE MAIN LINE
            </span>
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
              gap: 34,
              alignItems: "start",
            }}
          >
            <BubbleWrap snd={snd} />
            <LabelMaker snd={snd} />
            <Terminal snd={snd} />
          </div>
        </div>
      </div>
    </section>
  );
}
