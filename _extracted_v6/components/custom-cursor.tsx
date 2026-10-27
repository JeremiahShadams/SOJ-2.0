'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const ring = useRef<HTMLDivElement>(null)
  const dot = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return
    document.documentElement.classList.add('has-cursor')
    let x = -100, y = -100, rx = -100, ry = -100, f = 0, seen = false
    const move = (e: PointerEvent) => {
      x = e.clientX; y = e.clientY
      if (!seen) { seen = true; rx = x; ry = y; ring.current?.classList.add('on'); dot.current?.classList.add('on') }
      if (dot.current) dot.current.style.transform = `translate3d(${x}px,${y}px,0) translate(-50%,-50%)`
      const hot = (e.target as HTMLElement | null)?.closest?.('a,button,[role="button"],input,textarea,label,summary')
      ring.current?.classList.toggle('hot', !!hot)
    }
    const leave = () => { ring.current?.classList.remove('on'); dot.current?.classList.remove('on'); seen = false }
    const loop = () => {
      rx += (x - rx) * 0.2; ry += (y - ry) * 0.2
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px,${ry}px,0) translate(-50%,-50%)`
      f = requestAnimationFrame(loop)
    }
    addEventListener('pointermove', move, { passive: true }); document.addEventListener('pointerleave', leave)
    f = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(f); removeEventListener('pointermove', move); document.removeEventListener('pointerleave', leave); document.documentElement.classList.remove('has-cursor') }
  }, [])
  return (<><div ref={ring} className="cur-ring" aria-hidden="true" /><div ref={dot} className="cur-dot" aria-hidden="true" /></>)
}
