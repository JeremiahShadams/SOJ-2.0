'use client'

import { useEffect, useRef } from 'react'
import ProjectDemo from '@/components/project-demo'
import type { Project } from '@/lib/data'

export default function DemoPopup({ project }: { project: Project | null }) {
  const box = useRef<HTMLDivElement>(null)
  const projectRef = useRef<Project | null>(project)
  projectRef.current = project

  useEffect(() => {
    let x = 0, y = 0, tx = 0, ty = 0, frame = 0
    const move = (e: PointerEvent) => {
      tx = e.clientX
      ty = e.clientY
    }
    const loop = () => {
      x += (tx - x) * 0.16
      y += (ty - y) * 0.16
      const isWeb = projectRef.current?.format === 'web'
      const curW = isWeb ? 380 : 204
      const curH = isWeb ? 246 : 380
      const posX = Math.min(x + 24, window.innerWidth - curW - 16)
      const posY = Math.min(Math.max(y - curH / 2, 12), window.innerHeight - curH - 12)
      if (box.current) {
        box.current.style.transform = `translate3d(${posX}px,${posY}px,0)`
      }
      frame = requestAnimationFrame(loop)
    }
    window.addEventListener('pointermove', move, { passive: true })
    frame = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', move)
    }
  }, [])

  const isWeb = project?.format === 'web'

  return (
    <div
      ref={box}
      className={`demo-pop ${project ? 'on' : ''} ${isWeb ? 'is-web' : 'is-mobile'}`}
      aria-hidden="true"
    >
      {project && (
        <ProjectDemo
          key={project.key}
          projectKey={project.key}
          base={project.demo}
          name={project.name}
          format={project.format}
          liveUrl={project.live}
          playing
        />
      )}
    </div>
  )
}
