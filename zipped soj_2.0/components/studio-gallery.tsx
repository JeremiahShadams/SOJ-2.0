'use client'

import { useEffect, useRef, useState } from 'react'

const COUNT = 10

function Frame({ i }: { i: number }) {
  const [ok, setOk] = useState(true)
  const n = String(i + 1).padStart(2, '0')
  return (
    <figure className="art-card">
      <div className="art-img">
        {ok ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={`/art/${n}.jpg`} alt={`Original painting ${n}`} loading="lazy" decoding="async" onError={() => setOk(false)} />
        ) : (
          <div className="art-empty" aria-hidden="true"><span>{n}</span></div>
        )}
      </div>
      <figcaption>STUDY / {n}</figcaption>
    </figure>
  )
}

export default function StudioGallery() {
  const outer = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const [num, setNum] = useState(1)

  useEffect(() => {
    const layout = () => {
      if (outer.current && track.current) outer.current.style.height = `${track.current.scrollWidth - innerWidth + innerHeight}px`
    }
    const update = () => {
      const o = outer.current, t = track.current
      if (!o || !t) return
      const max = Math.max(o.offsetHeight - innerHeight, 1)
      const p = Math.min(Math.max((scrollY - o.offsetTop) / max, 0), 1)
      t.style.transform = `translate3d(${-p * (t.scrollWidth - innerWidth)}px,0,0)`
      let best = 0, bestD = 9
      Array.from(t.children).forEach((c, i) => {
        const el = c as HTMLElement
        const b = el.getBoundingClientRect()
        const off = b.left + b.width / 2 - innerWidth / 2
        const d = Math.min(Math.abs(off) / (innerWidth * 0.55), 1)
        const e = 1 - d * d
        el.style.transform = `scale(${0.72 + 0.3 * e})`
        el.style.opacity = String(0.4 + 0.6 * e)
        const inner = el.querySelector('.art-img > *') as HTMLElement | null
        if (inner) inner.style.transform = `scale(${1.2 - 0.2 * e}) translateX(${off * -0.05}px)`
        if (d < bestD) { bestD = d; best = i }
      })
      setNum(best + 1)
    }
    let f = 0
    const on = () => { cancelAnimationFrame(f); f = requestAnimationFrame(update) }
    const resize = () => { layout(); on() }
    layout(); update()
    addEventListener('scroll', on, { passive: true }); addEventListener('resize', resize)
    return () => { cancelAnimationFrame(f); removeEventListener('scroll', on); removeEventListener('resize', resize) }
  }, [])

  return (
    <div className="art-outer" ref={outer}>
      <div className="art-stick">
        <p className="art-count" aria-hidden="true">{String(num).padStart(2, '0')} / {COUNT}</p>
        <div className="art-track" ref={track}>
          {Array.from({ length: COUNT }, (_, i) => <Frame key={i} i={i} />)}
        </div>
      </div>
    </div>
  )
}
