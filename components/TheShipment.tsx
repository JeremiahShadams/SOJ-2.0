"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { SITE, orderPlacedDate } from "@/lib/site";
import { playSound, type SoundKind } from "@/lib/sound";
import Hero from "@/components/sections/Hero";
import Stations from "@/components/sections/Stations";
import Customs from "@/components/sections/Customs";
import Depot from "@/components/sections/Depot";
import Dispatch from "@/components/sections/Dispatch";
import Delivery from "@/components/sections/Delivery";
import CrateModal from "@/components/CrateModal";

type Stamp = {
  key: string;
  text: string;
  color: string;
  left: number;
  top: number;
  rot: number;
};

type RoutePoint = { x: number; y: number; len: number };

const DOCK_NAMES: Record<string, string> = {
  hero: "STATION 00 — THE LABEL",
  s1: "STATION 01 — CONTRACT GUARD",
  s2: "STATION 02 — FRESCO",
  s3: "STATION 03 — PAYTRACE",
  s4: "STATION 04 — KORTEX",
  customs: "CUSTOMS — GATE 05",
  depot: "DEPOT (SIDING)",
  dispatch: "GATE 06 — DISPATCH DESK",
  delivery: "FRONT DOOR",
};

const STAMP_SPOTS: [number, number, number][] = [
  [6, 4, -12],
  [82, 8, 9],
  [10, 44, 7],
  [76, 48, -8],
  [44, 24, -3],
  [42, 56, 12],
  [-12, 20, -15],
];

export default function TheShipment() {
  const [entOn, setEntOn] = useState(false);
  const [entStamp, setEntStamp] = useState(false);
  const [boxVisible, setBoxVisible] = useState(false);
  const [heroStamp, setHeroStamp] = useState(false);
  const [stamps, setStamps] = useState<Stamp[]>([]);
  const [fired, setFired] = useState<Record<string, boolean>>({});
  const [signed, setSigned] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [crateOpen, setCrateOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [entDate, setEntDate] = useState("");

  const rootRef = useRef<HTMLDivElement>(null);
  const routeSvgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const beltRef = useRef<SVGPathElement>(null);
  const rollersRef = useRef<SVGGElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const boxInnerRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const hudStatusRef = useRef<HTMLSpanElement>(null);
  const hudPctRef = useRef<HTMLSpanElement>(null);
  const hudNextRef = useRef<HTMLSpanElement>(null);
  const hudBarRef = useRef<HTMLDivElement>(null);

  // Mutable machine state — lives outside React so the rAF loop never
  // sees a stale closure.
  const calmRef = useRef(false);
  const soundOnRef = useRef(false);
  const signedRef = useRef(false);
  const firedRef = useRef<Set<string>>(new Set());
  const routeRef = useRef<{ pts: RoutePoint[]; total: number } | null>(null);
  const trigsRef = useRef<{ k: string; len: number }[]>([]);
  const motionRef = useRef({ bx: NaN, by: NaN, i: 0, ly: NaN, sv: 0, moving: false });
  const stampCountRef = useRef(0);

  const snd = useCallback((k: SoundKind) => {
    if (soundOnRef.current) playSound(k);
  }, []);

  const shake = useCallback(() => {
    if (calmRef.current) return;
    const r = rootRef.current;
    if (!r) return;
    r.style.animation = "none";
    void r.offsetWidth;
    r.style.animation = "shakeX .28s";
  }, []);

  const addStamp = useCallback(
    (text: string, color: string) => {
      setStamps((prev) => {
        const sp = STAMP_SPOTS[prev.length % STAMP_SPOTS.length];
        return [
          ...prev,
          { key: "st" + prev.length, text, color, left: sp[0], top: sp[1], rot: sp[2] },
        ];
      });
      shake();
      snd("thunk");
    },
    [shake, snd],
  );

  const fireDock = useCallback(
    (k: string) => {
      if (firedRef.current.has(k)) return;
      firedRef.current.add(k);
      setFired((f) => ({ ...f, [k]: true }));
      if (k === "s1") addStamp("INSPECTED 68→91", "#1E7A46");
      else if (k === "s2") addStamp("KEEP CHILLED", "#1F4FD8");
      else if (k === "s3") addStamp("SETTLED ✓", "#1A1A1A");
      else if (k === "s4") addStamp("IN PROD", "#FF4D00");
      else if (k === "customs") {
        addStamp("CLEARED", "#1E7A46");
        snd("beep");
      } else if (k === "delivery") {
        snd("thunk");
        shake();
      }
    },
    [addStamp, shake, snd],
  );

  const buildRoute = useCallback(() => {
    const root = rootRef.current;
    const svg = routeSvgRef.current;
    const path = pathRef.current;
    const belt = beltRef.current;
    const rollers = rollersRef.current;
    if (!root || !svg || !path || !belt || !rollers) return;

    const H = root.scrollHeight;
    const W = document.documentElement.clientWidth;
    svg.setAttribute("width", String(W));
    svg.setAttribute("height", String(H));

    const sy = window.scrollY;
    const docks = Array.from(root.querySelectorAll<HTMLElement>("[data-dock]"))
      .map((el) => {
        const r = el.getBoundingClientRect();
        return {
          k: el.getAttribute("data-dock") || "",
          x: r.left + r.width / 2,
          y: r.top + sy + r.height / 2,
        };
      })
      .filter((d) => d.y > 0);
    if (docks.length < 2) return;
    docks.sort((a, b) => a.y - b.y);
    for (let i = 1; i < docks.length; i++) {
      if (docks[i].y < docks[i - 1].y + 80) docks[i].y = docks[i - 1].y + 80;
    }

    let d = `M ${docks[0].x} ${docks[0].y}`;
    for (let i = 1; i < docks.length; i++) {
      const a = docks[i - 1];
      const b = docks[i];
      const m = (a.y + b.y) / 2;
      d += ` C ${a.x} ${m} ${b.x} ${m} ${b.x} ${b.y}`;
    }
    path.setAttribute("d", d);
    belt.setAttribute("d", d);

    const total = path.getTotalLength();
    const N = Math.max(200, Math.min(2400, Math.round(total / 6)));
    const pts: RoutePoint[] = [];
    for (let i = 0; i <= N; i++) {
      const p = path.getPointAtLength((total * i) / N);
      pts.push({ x: p.x, y: p.y, len: (total * i) / N });
    }
    // enforce monotonic y so scroll → route-position lookup is stable
    for (let i = 1; i < pts.length; i++) {
      if (pts[i].y < pts[i - 1].y) pts[i].y = pts[i - 1].y;
    }
    routeRef.current = { pts, total };

    let rl = "";
    for (let l = 40; l < total - 20; l += 110) {
      const p = path.getPointAtLength(l);
      rl += `<circle cx="${p.x.toFixed(1)}" cy="${(p.y + 10).toFixed(1)}" r="5" fill="none" stroke="#1A1A1A" stroke-width="2" opacity=".45"/>`;
    }
    rollers.innerHTML = rl;

    trigsRef.current = docks.map((dk) => {
      let best = 0;
      let bd = Infinity;
      for (const p of pts) {
        const dd = (p.x - dk.x) ** 2 + (p.y - dk.y) ** 2;
        if (dd < bd) {
          bd = dd;
          best = p.len;
        }
      }
      return { k: dk.k, len: best };
    });

    const m = motionRef.current;
    if (Number.isNaN(m.bx)) {
      m.bx = pts[0].x;
      m.by = pts[0].y;
    }
  }, []);

  // ── mount: entrance, clock, route build, rAF loop ──
  useEffect(() => {
    calmRef.current =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const intervals: ReturnType<typeof setInterval>[] = [];

    setEntDate(orderPlacedDate());

    // barcode + typing helpers
    const typeAll = () => {
      if (calmRef.current || !rootRef.current) return;
      let delay = 0;
      rootRef.current.querySelectorAll<HTMLElement>("[data-type]").forEach((el) => {
        const full = el.textContent || "";
        el.textContent = "";
        const start = delay;
        delay += full.length * 13 + 240;
        timeouts.push(
          setTimeout(() => {
            let i = 0;
            const iv = setInterval(() => {
              i++;
              el.textContent = full.slice(0, i);
              if (i >= full.length) clearInterval(iv);
            }, 13);
            intervals.push(iv);
          }, start),
        );
      });
    };

    // entrance choreography — skipped on repeat visits (sessionStorage)
    let skip = false;
    try {
      skip = !!sessionStorage.getItem("soj-ent");
    } catch {
      skip = true;
    }
    if (skip) {
      setBoxVisible(true);
      setHeroStamp(true);
      setStamps([
        { key: "st0", text: "FRAGILE", color: "#FF4D00", left: 6, top: 4, rot: -12 },
      ]);
      stampCountRef.current = 1;
    } else {
      setEntOn(true);
      timeouts.push(
        setTimeout(() => {
          setEntStamp(true);
          setBoxVisible(true);
          const bi = boxInnerRef.current;
          if (bi && !calmRef.current) {
            bi.style.animation = "dropIn .6s cubic-bezier(.3,1.3,.5,1) both";
          }
          snd("thunk");
        }, 900),
      );
      timeouts.push(
        setTimeout(() => {
          setEntOn(false);
          setHeroStamp(true);
          addStamp("FRAGILE", "#FF4D00");
          snd("beep");
          try {
            sessionStorage.setItem("soj-ent", "1");
          } catch {
            /* private mode */
          }
          typeAll();
        }, 2100),
      );
    }

    // route build: after fonts settle, then again once layout stabilizes
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => setTimeout(buildRoute, 80));
    }
    timeouts.push(setTimeout(buildRoute, 500));
    timeouts.push(setTimeout(buildRoute, 1600));

    let rt: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(rt);
      rt = setTimeout(buildRoute, 250);
    };
    window.addEventListener("resize", onResize);

    // WAT clock
    const clock = setInterval(() => {
      const t = new Date(Date.now() + (new Date().getTimezoneOffset() + 60) * 60000);
      const pad = (n: number) => String(n).padStart(2, "0");
      const s = `${pad(t.getHours())}:${pad(t.getMinutes())}:${pad(t.getSeconds())} WAT`;
      rootRef.current
        ?.querySelectorAll("[data-clock]")
        .forEach((e) => {
          e.textContent = s;
        });
    }, 1000);
    intervals.push(clock);

    // ── the machine: scroll-scrubbed box + HUD, 60fps ──
    let raf = 0;
    const tick = () => {
      const r = routeRef.current;
      if (r && rootRef.current) {
        const m = motionRef.current;
        const y = window.scrollY;
        const vh = window.innerHeight;
        const v = y - (Number.isNaN(m.ly) ? y : m.ly);
        m.ly = y;
        m.sv = m.sv * 0.85 + v * 0.15;
        const pts = r.pts;
        const targetY = Math.min(
          Math.max(y + vh * 0.6, pts[0].y),
          pts[pts.length - 1].y,
        );
        let i = m.i;
        while (i < pts.length - 1 && pts[i].y < targetY) i++;
        while (i > 0 && pts[i].y > targetY) i--;
        m.i = i;
        const p = pts[i];
        m.bx += (p.x - m.bx) * 0.16;
        m.by += (p.y - m.by) * 0.16;

        const lean = calmRef.current
          ? 0
          : Math.max(-6, Math.min(6, m.sv * 0.25));
        if (boxRef.current) {
          boxRef.current.style.transform = `translate(${m.bx - 70}px,${m.by - 118}px) rotate(${lean}deg)`;
        }
        if (shadowRef.current) {
          shadowRef.current.style.transform = `scaleX(${1 + Math.min(Math.abs(m.sv) * 0.02, 0.7)})`;
        }
        if (beltRef.current) {
          beltRef.current.style.strokeDashoffset = `${-(p.len * 0.9)}px`;
        }

        // settle wobble when the line stops
        const mv = Math.abs(m.sv);
        if (mv > 3) m.moving = true;
        else if (m.moving && mv < 0.4) {
          m.moving = false;
          if (!calmRef.current && boxInnerRef.current) {
            const bi = boxInnerRef.current;
            bi.style.animation = "none";
            void bi.offsetWidth;
            bi.style.animation = "settleW .5s";
          }
        }

        // tracking HUD
        const prog = p.len / r.total;
        const pct = Math.round(prog * 100);
        const L = (k: string) => {
          const t = trigsRef.current.find((t) => t.k === k);
          return t ? t.len : Infinity;
        };
        let st = "IN TRANSIT";
        if (signedRef.current) st = "DELIVERED ✓";
        else if (p.len < 60) st = "ORDER PLACED";
        else if (p.len < L("s1") - r.total * 0.06) st = "PICKED";
        else if (Math.abs(p.len - L("customs")) < r.total * 0.05) st = "IN CUSTOMS";
        else if (p.len > L("delivery") - r.total * 0.03) st = "AT THE DOOR";
        else if (p.len > L("customs")) st = "OUT FOR DELIVERY";
        const nxt = trigsRef.current.find((t) => t.len > p.len + 60);
        if (hudStatusRef.current && hudStatusRef.current.textContent !== st) {
          hudStatusRef.current.textContent = st;
        }
        if (hudPctRef.current) hudPctRef.current.textContent = pct + "%";
        if (hudNextRef.current) {
          hudNextRef.current.textContent = nxt
            ? DOCK_NAMES[nxt.k] || nxt.k.toUpperCase()
            : "— END OF LINE —";
        }
        if (hudBarRef.current) hudBarRef.current.style.width = pct + "%";

        // station triggers
        for (const t of trigsRef.current) {
          if (p.len >= t.len - 50) fireDock(t.k);
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      clearTimeout(rt);
      timeouts.forEach(clearTimeout);
      intervals.forEach(clearInterval);
      document.body.style.overflow = "";
    };
  }, [addStamp, buildRoute, fireDock, snd]);

  useEffect(() => {
    signedRef.current = signed;
  }, [signed]);
  useEffect(() => {
    soundOnRef.current = soundOn;
  }, [soundOn]);

  const toggleSound = () => {
    setSoundOn((s) => {
      if (!s) playSound("beep");
      return !s;
    });
  };

  const openCrate = () => {
    setCrateOpen(true);
    document.body.style.overflow = "hidden";
    snd("thunk");
  };
  const closeCrate = () => {
    setCrateOpen(false);
    document.body.style.overflow = "";
    snd("thunk");
  };

  const onSigned = () => {
    if (signedRef.current) return;
    setSigned(true);
    addStamp("DELIVERED ✓", "#1E7A46");
    snd("bell");
  };

  const returnToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    snd("beep");
  };

  const navLinks = [
    { href: "#manifest", label: "MANIFEST", title: "MANIFEST — my work" },
    { href: "#customs", label: "CUSTOMS", title: "CUSTOMS — about me" },
    { href: "#depot", label: "DEPOT", title: "DEPOT — playground" },
    { href: "#delivery", label: "DELIVERY", title: "DELIVERY — contact" },
  ];

  return (
    <div ref={rootRef} style={{ position: "relative", minHeight: "100vh" }}>
      {/* ══════════ ENTRANCE ══════════ */}
      {entOn && (
        <div
          aria-hidden="true"
          style={{ position: "fixed", inset: 0, zIndex: 500, pointerEvents: "none" }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: 360,
              height: 250,
              background:
                "repeating-linear-gradient(180deg,#DCD8CE 0 22px,#CFCBBF 22px 26px)",
              border: "3px solid var(--ink)",
              borderTop: "none",
              boxShadow: "10px 10px 0 rgba(26,26,26,.25)",
              animation: "doorUp .55s cubic-bezier(.6,0,.4,1) .5s both",
            }}
          >
            <div
              className="mono"
              style={{
                position: "absolute",
                bottom: 10,
                left: 0,
                right: 0,
                textAlign: "center",
                fontSize: 11,
                letterSpacing: ".14em",
                fontWeight: 700,
              }}
            >
              DOCK 01 — INBOUND
            </div>
          </div>
          {entStamp && (
            <div
              style={{
                position: "absolute",
                left: 24,
                bottom: 120,
                transform: "rotate(-8deg)",
              }}
            >
              <div
                className="stamp-rect"
                style={{
                  border: "3px solid var(--cargo-blue)",
                  color: "var(--cargo-blue)",
                  fontSize: 14,
                  letterSpacing: ".12em",
                  padding: "8px 16px",
                  boxShadow:
                    "inset 0 0 0 2px var(--concrete), inset 0 0 0 3.5px var(--cargo-blue)",
                }}
              >
                ORDER PLACED — {entDate}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ══════════ NAV ══════════ */}
      <nav
        aria-label="Site"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 54,
          zIndex: 330,
          background: "var(--concrete)",
          borderBottom: "2px solid var(--ink)",
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "0 20px",
        }}
      >
        <div className="stencil" style={{ fontSize: 17, letterSpacing: ".04em" }}>
          SOJ <span style={{ color: "var(--safety)" }}>/</span> NATIVE LABS
        </div>
        <div
          className={`nav-links${navOpen ? " open" : ""}`}
          style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 4 }}
        >
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              title={l.title}
              className="navlink"
              onClick={() => setNavOpen(false)}
            >
              {l.label}
            </a>
          ))}
        </div>
        <button
          onClick={toggleSound}
          className="mono btn-push"
          aria-pressed={soundOn}
          style={{
            marginLeft: 10,
            fontSize: 10,
            background: "var(--paper)",
            padding: "6px 10px",
          }}
        >
          {soundOn ? "SOUND: ON" : "SOUND: OFF"}
        </button>
        <button
          className="mono btn-push nav-toggle"
          aria-expanded={navOpen}
          aria-label="Toggle section menu"
          onClick={() => setNavOpen((o) => !o)}
          style={{
            marginLeft: 8,
            fontSize: 10,
            background: "var(--paper)",
            padding: "6px 10px",
          }}
        >
          {navOpen ? "CLOSE ✕" : "MENU ☰"}
        </button>
      </nav>

      {/* ══════════ TRACKING HUD ══════════ */}
      <div
        className="mono hud-card"
        aria-hidden="true"
        style={{
          position: "fixed",
          left: 18,
          bottom: 18,
          zIndex: 320,
          background: "var(--paper)",
          border: "2px solid var(--ink)",
          boxShadow: "5px 5px 0 rgba(26,26,26,.9)",
          padding: "12px 16px",
          fontSize: 11,
          letterSpacing: ".06em",
          lineHeight: 1.8,
          minWidth: 250,
        }}
      >
        <div
          style={{
            fontWeight: 700,
            borderBottom: "1px solid var(--ink)",
            paddingBottom: 4,
            marginBottom: 4,
          }}
        >
          TRACKING № {SITE.trackingNo}
        </div>
        <div>
          STATUS:{" "}
          <span ref={hudStatusRef} style={{ color: "var(--cargo-blue)", fontWeight: 700 }}>
            ORDER PLACED
          </span>{" "}
          ▸ <span ref={hudPctRef}>0%</span>
        </div>
        <div>
          NEXT STOP: <span ref={hudNextRef}>STATION 00 — THE LABEL</span>
        </div>
        <div
          style={{
            height: 5,
            background: "#E4DFD3",
            marginTop: 6,
            border: "1px solid var(--ink)",
          }}
        >
          <div
            ref={hudBarRef}
            style={{ height: "100%", width: "0%", background: "var(--cargo-blue)" }}
          />
        </div>
      </div>

      {/* ══════════ THE ROUTE ══════════ */}
      <svg
        ref={routeSvgRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1,
          pointerEvents: "none",
          overflow: "visible",
        }}
      >
        <g ref={rollersRef} />
        <path ref={pathRef} fill="none" stroke="#1A1A1A" strokeWidth={3} />
        <path
          ref={beltRef}
          fill="none"
          stroke="#EDEAE3"
          strokeWidth={3}
          strokeDasharray="7 26"
        />
      </svg>

      {/* ══════════ THE BOX ══════════ */}
      <div
        ref={boxRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 6,
          width: 140,
          pointerEvents: "none",
          willChange: "transform",
          transform: "translate(-600px,-600px)",
          opacity: boxVisible ? 1 : 0,
        }}
      >
        <div ref={boxInnerRef} style={{ position: "relative" }}>
          <div
            ref={shadowRef}
            style={{
              position: "absolute",
              bottom: -9,
              left: 10,
              width: 120,
              height: 13,
              background: "rgba(26,26,26,.18)",
              borderRadius: "50%",
            }}
          />
          <div
            style={{
              height: 22,
              background: "var(--kraft-top)",
              border: "2px solid var(--ink)",
              borderBottom: "none",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: 0,
                bottom: 0,
                width: 28,
                transform: "translateX(-50%)",
                background: "#B99B67",
                borderLeft: "2px solid #A98B5B",
                borderRight: "2px solid #A98B5B",
              }}
            />
          </div>
          <div
            style={{
              height: 96,
              background: "var(--kraft)",
              border: "2px solid var(--ink)",
              position: "relative",
              overflow: "visible",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: 0,
                bottom: 0,
                width: 28,
                transform: "translateX(-50%)",
                background: "#BC9E6A",
                opacity: 0.7,
              }}
            />
            <div
              className="mono"
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: ".22em",
                color: "var(--ink)",
                opacity: 0.85,
                textTransform: "uppercase",
              }}
            >
              {SITE.boxLabel}
            </div>
            <div
              style={{
                position: "absolute",
                left: 6,
                bottom: 6,
                width: 46,
                height: 20,
                background: "var(--paper)",
                border: "1px solid var(--ink)",
                padding: "3px 4px",
              }}
            >
              <div
                style={{
                  height: "100%",
                  background:
                    "repeating-linear-gradient(90deg,#1A1A1A 0 2px,transparent 2px 5px)",
                }}
              />
            </div>
            {stamps.map((st) => (
              <div
                key={st.key}
                style={{
                  position: "absolute",
                  left: st.left,
                  top: st.top,
                  transform: `rotate(${st.rot}deg)`,
                  zIndex: 3,
                }}
              >
                <div
                  className="stamp-round"
                  style={{
                    width: 54,
                    height: 54,
                    border: `2.5px solid ${st.color}`,
                    color: st.color,
                    fontSize: 7.5,
                    letterSpacing: ".03em",
                    lineHeight: 1.3,
                    padding: 5,
                    background: "rgba(255,253,248,.66)",
                    boxShadow: `inset 0 0 0 1.5px rgba(255,253,248,.9), inset 0 0 0 3px ${st.color}`,
                  }}
                >
                  {st.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════ SECTIONS ══════════ */}
      <Hero heroStamp={heroStamp} />
      <div className="hazard" aria-hidden="true" />
      <Stations fired={fired} onOpenCrate={openCrate} />
      <div className="hazard" aria-hidden="true" />
      <Customs cleared={!!fired.customs} />
      <Depot snd={snd} />
      <div className="hazard" aria-hidden="true" />
      <Dispatch snd={snd} />
      <Delivery
        signed={signed}
        onSigned={onSigned}
        snd={snd}
        onReturnToTop={returnToTop}
      />

      {crateOpen && <CrateModal onClose={closeCrate} />}
    </div>
  );
}
