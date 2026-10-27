import { useCallback, useEffect, useRef, useState } from "react";
import { orderPlacedDate } from "@/lib/site";
import { playSound, type SoundKind } from "@/lib/sound";

export type Stamp = {
  key: string;
  text: string;
  color: string;
  left: number;
  top: number;
  rot: number;
};

type RoutePoint = { x: number; y: number; len: number };

const DOCK_NAMES: Record<string, string> = {
  hero: "STATION 00 - THE LABEL",
  s1: "STATION 01 - CONTRACT GUARD",
  s2: "STATION 02 - FRESCO",
  s3: "STATION 03 - CODEBASE Q&A AGENT",
  s4: "STATION 04 - MCP SERVER",
  s5: "STATION 05 - NL TO SQL AGENT",
  customs: "CUSTOMS - GATE 05",
  depot: "DEPOT (SIDING)",
  dispatch: "GATE 06 - DISPATCH DESK",
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

export function useShipmentEngine() {
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
      if (k === "s1") addStamp("QUALITY ASSURED", "#1E7A46");
      else if (k === "s2") addStamp("KEEP CHILLED", "#1F4FD8");
      else if (k === "s3") addStamp("LANGGRAPH LIVE", "#1A1A1A");
      else if (k === "s4") addStamp("CONNECTED", "#FF4D00");
      else if (k === "s5") addStamp("EXECUTED", "#1E7A46");
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

  useEffect(() => {
    calmRef.current =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const intervals: ReturnType<typeof setInterval>[] = [];

    setEntDate(orderPlacedDate());

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
          } catch {}
          typeAll();
        }, 2100),
      );
    }

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
            : "- END OF LINE -";
        }
        if (hudBarRef.current) hudBarRef.current.style.width = pct + "%";

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

  return {
    refs: {
      rootRef,
      routeSvgRef,
      pathRef,
      beltRef,
      rollersRef,
      boxRef,
      boxInnerRef,
      shadowRef,
      hudStatusRef,
      hudPctRef,
      hudNextRef,
      hudBarRef,
    },
    state: {
      entOn,
      entStamp,
      boxVisible,
      heroStamp,
      stamps,
      fired,
      signed,
      soundOn,
      crateOpen,
      navOpen,
      entDate,
    },
    actions: {
      setNavOpen,
      toggleSound,
      openCrate,
      closeCrate,
      onSigned,
      returnToTop,
      snd,
    },
  };
}
