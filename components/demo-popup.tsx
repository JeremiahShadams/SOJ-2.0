'use client'

import { useEffect, useRef, useState } from 'react'
import ProjectDemo from '@/components/project-demo'
import { projects, type Project } from '@/lib/data'

export default function DemoPopup({ project }: { project: Project | null }) {
  const box = useRef<HTMLDivElement>(null)
  const [activeProject, setActiveProject] = useState<Project | null>(project)
  const projectRef = useRef<Project | null>(project)
  projectRef.current = project

  // Keep the last active project in state so exit fadeout stays visually populated
  useEffect(() => {
    if (project) {
      setActiveProject(project)
    }
  }, [project])

  useEffect(() => {
    let x = 0, y = 0, tx = 0, ty = 0, frame = 0
    const move = (e: PointerEvent) => {
      tx = e.clientX
      ty = e.clientY
    }
    const loop = () => {
      x += (tx - x) * 0.16
      y += (ty - y) * 0.16
      const current = projectRef.current || activeProject
      const isWeb = current?.format === 'web'
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
  }, [activeProject])

  const isVisible = Boolean(project)
  const currentDisplay = project || activeProject
  const isWeb = currentDisplay?.format === 'web'

  return (
    <div
      ref={box}
      className={`demo-pop ${isVisible ? 'on' : ''} ${isWeb ? 'is-web' : 'is-mobile'}`}
      aria-hidden="true"
    >
      <div className="demo-pop-screens">
        {projects.map((p) => {
          const isActive = currentDisplay?.key === p.key
          return (
            <div
              key={p.key}
              className={`demo-pop-layer ${isActive ? 'is-active' : ''}`}
            >
              <ProjectDemo
                projectKey={p.key}
                base={p.demo}
                name={p.name}
                format={p.format}
                liveUrl={p.live}
                playing={isActive && isVisible}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
