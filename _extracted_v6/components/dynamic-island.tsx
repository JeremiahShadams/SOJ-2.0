'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

const TABS = [
  { id: 'work', label: 'Work' },
  { id: 'studio', label: 'Studio' },
  { id: 'process', label: 'Process' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]
const EMAIL = 'jeremiahshadamoro@gmail.com'

type Clock = { h: number; m: number; s: number }
const fmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Africa/Lagos', hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23' })
const lagosNow = (): Clock => {
  const p = Object.fromEntries(fmt.formatToParts(new Date()).map((x) => [x.type, x.value]))
  return { h: +p.hour, m: +p.minute, s: +p.second }
}
const two = (n: number) => String(n).padStart(2, '0')

function ClockRing({ c, size }: { c: Clock | null; size: number }) {
  const h = c?.h ?? 0, m = c?.m ?? 0, s = c?.s ?? 0
  const hand = (deg: number, len: number, w: number, color: string, ease = false) => (
    <g style={{ transform: `rotate(${deg}deg)`, transformOrigin: '50px 50px', transition: ease ? 'transform .35s cubic-bezier(.4,2.1,.5,1)' : 'none' }}>
      <line x1="50" y1="50" x2="50" y2={50 - len} stroke={color} strokeWidth={w} strokeLinecap="round" />
    </g>
  )
  return (
    <svg className="isl-clock" viewBox="0 0 100 100" width={size} height={size} aria-hidden="true">
      <circle cx="50" cy="50" r="47" fill="none" stroke="#f2ede4" strokeOpacity=".22" />
      <circle cx="50" cy="50" r="27" fill="none" stroke="#7d8be0" strokeOpacity=".7" strokeWidth="2.2" strokeDasharray="1.2 4.2" strokeLinecap="round" />
      {Array.from({ length: 12 }, (_, i) => {
        const a = ((i * 30 - 90) * Math.PI) / 180, on = c && i === h % 12
        return <circle key={i} cx={50 + 39 * Math.cos(a)} cy={50 + 39 * Math.sin(a)} r={on ? 3.6 : 2} fill={on ? '#d9a441' : '#f2ede4'} fillOpacity={on ? 1 : 0.5} />
      })}
      {c && hand((h % 12) * 30 + m * 0.5, 15, 3.4, '#f2ede4')}
      {c && hand(m * 6 + s * 0.1, 23, 2.4, '#f2ede4')}
      {c && hand(s * 6, 35, 1.6, '#e4491f', s !== 0)}
      <circle cx="50" cy="50" r="2.8" fill="#e4491f" />
    </svg>
  )
}

export default function DynamicIsland() {
  const [open, setOpen] = useState(false)
  const [clock, setClock] = useState<Clock | null>(null)
  const [active, setActive] = useState(-1)
  const [progress, setProgress] = useState(0)
  const [copied, setCopied] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => {
    setClock(lagosNow())
    const iv = setInterval(() => setClock(lagosNow()), 1000)
    return () => clearInterval(iv)
  }, [])

  useEffect(() => {
    let f = 0
    const update = () => {
      const max = document.documentElement.scrollHeight - innerHeight
      setProgress(max > 0 ? Math.min(Math.max(scrollY / max, 0), 1) : 0)
      let idx = -1
      TABS.forEach((t, i) => { const el = document.getElementById(t.id); if (el && el.getBoundingClientRect().top <= innerHeight * 0.4) idx = i })
      setActive(idx)
    }
    const on = () => { cancelAnimationFrame(f); f = requestAnimationFrame(update) }
    update(); addEventListener('scroll', on, { passive: true }); addEventListener('resize', on)
    return () => { cancelAnimationFrame(f); removeEventListener('scroll', on); removeEventListener('resize', on) }
  }, [])

  useEffect(() => {
    if (!open) return
    const out = (e: PointerEvent) => { if (!root.current?.contains(e.target as Node)) setOpen(false) }
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    addEventListener('pointerdown', out); addEventListener('keydown', esc)
    return () => { removeEventListener('pointerdown', out); removeEventListener('keydown', esc) }
  }, [open])

  const hold = useCallback(() => { window.clearTimeout(timer.current); setOpen(true) }, [])
  const release = useCallback(() => { window.clearTimeout(timer.current); timer.current = window.setTimeout(() => setOpen(false), 260) }, [])
  const jump = (e: React.MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    scrollTo({ top: ((e.clientX - r.left) / r.width) * (document.documentElement.scrollHeight - innerHeight), behavior: 'smooth' })
  }
  const copy = () => { navigator.clipboard?.writeText(EMAIL); setCopied(true); setTimeout(() => setCopied(false), 1800) }
  const askAI = () => { window.dispatchEvent(new Event('open-chat')); setOpen(false) }
  const time = clock ? `${two(clock.h)}:${two(clock.m)}` : '--:--'

  return (
    <div
      ref={root}
      className={open ? 'island is-open' : 'island'}
      onPointerEnter={(e) => e.pointerType === 'mouse' && hold()}
      onPointerLeave={(e) => e.pointerType === 'mouse' && release()}
      onFocus={hold}
      onBlur={(e) => { if (!root.current?.contains(e.relatedTarget as Node)) release() }}
    >
      <nav className="island-body" aria-label="Primary navigation">
        <div className="island-row">
          <a className="isl-mark" href="#top" aria-label="Jeremiah Shadamoro, back to top">J / S</a>
          <button className="isl-pill" type="button" aria-expanded={open} aria-label="Open navigation" onClick={() => setOpen((v) => !v)}>
            <ClockRing c={clock} size={26} />
            <span className="isl-time">{time}</span>
            <span className="isl-sec">{active >= 0 ? TABS[active].label : 'Hello'}</span>
          </button>
        </div>
        <div className="island-panel" inert={!open}>
          <div className="island-inner">
            <div className="isl-tabs">
              {TABS.map((t, i) => (
                <a key={t.id} href={`#${t.id}`} aria-current={i === active ? 'true' : undefined} onClick={() => setOpen(false)}>
                  <small>{two(i + 1)}</small>{t.label}<i />
                </a>
              ))}
            </div>
            <div className="isl-cards">
              <div className="isl-card isl-lagos">
                <ClockRing c={clock} size={96} />
                <div><small>Lagos</small><strong>{time}<em>:{clock ? two(clock.s) : '--'}</em></strong><small>WAT · UTC+1</small></div>
              </div>
              <div className="isl-card isl-now">
                <small>Now</small>
                <strong>Software Engineer</strong>
                <span>Tecvison, since Jul 2025</span>
                <span>AI &amp; full-stack, remote</span>
              </div>
            </div>
            <div className="isl-actions">
              <button type="button" onClick={askAI}>Ask my AI</button>
              <a href="/Jeremiah_Shadamoro_CV.pdf" download>CV ↓</a>
              <button type="button" onClick={copy}>{copied ? 'Copied ✓' : 'Copy email'}</button>
              <a href="https://medium.com/@jeremiahshadamoro" target="_blank" rel="noopener noreferrer">Medium ↗</a>
            </div>
            <button className="isl-scrub" type="button" aria-label={`Page progress ${Math.round(progress * 100)} percent. Click to jump.`} onClick={jump}>
              <span style={{ width: `${progress * 100}%` }} />
              <i style={{ left: `${progress * 100}%` }} />
            </button>
            <p className="isl-foot"><span>Scroll</span><span>{Math.round(progress * 100)}%</span></p>
          </div>
        </div>
      </nav>
    </div>
  )
}
