'use client'

import { useEffect, useRef } from 'react'
import ProjectDemo from '@/components/project-demo'
import type { Project } from '@/lib/data'

const W = 190, H = 364

export default function DemoPopup({ project }: { project: Project | null }) {
  const box = useRef<HTMLDivElement>(null)
  useEffect(() => {
    let x = 0, y = 0, tx = 0, ty = 0, frame = 0
    const move = (e: PointerEvent) => { tx = e.clientX; ty = e.clientY }
    const loop = () => {
      x += (tx - x) * 0.16; y += (ty - y) * 0.16
      if (box.current) box.current.style.transform = `translate3d(${Math.min(x + 28, innerWidth - W - 16)}px,${Math.min(Math.max(y - H / 2, 12), innerHeight - H - 12)}px,0)`
      frame = requestAnimationFrame(loop)
    }
    addEventListener('pointermove', move, { passive: true }); frame = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(frame); removeEventListener('pointermove', move) }
  }, [])
  return (
    <div ref={box} className={project ? 'demo-pop on' : 'demo-pop'} aria-hidden="true">
      <div className="demo-pop-bar"><i /><b>{project?.name.toLowerCase()}</b></div>
      {project && <ProjectDemo key={project.key} base={project.demo} name={project.name} playing />}
    </div>
  )
}
