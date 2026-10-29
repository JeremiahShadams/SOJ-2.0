'use client'

import { useEffect, useRef } from 'react'
import ProjectDemo from '@/components/project-demo'
import type { Project } from '@/lib/data'

type ProjectDialogProps = {
  project: Project | null
  onClose: () => void
}

export default function ProjectDialog({ project, onClose }: ProjectDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (project && !dialog.open) dialog.showModal()
    if (!project && dialog.open) dialog.close()
  }, [project])

  return (
    <dialog
      ref={dialogRef}
      className="project-dialog"
      aria-labelledby="project-dialog-title"
      onCancel={() => onClose()}
      onClose={() => onClose()}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose()
      }}
    >
      {project && (
        <div className={`project-dialog-inner ${project.color}`}>
          <button className="dialog-close" type="button" onClick={onClose} aria-label={`Close ${project.name} details`}>
            Close <span aria-hidden="true">×</span>
          </button>
          <div className={`dialog-demo ${project.format === 'web' ? 'is-web' : 'is-mobile'}`}>
            <ProjectDemo
              key={project.key}
              projectKey={project.key}
              base={project.demo}
              name={project.name}
              format={project.format}
              liveUrl={project.live}
              playing
            />
          </div>
          <p className="section-label">{project.n} / {project.type}</p>
          <h2 id="project-dialog-title">{project.name}</h2>
          <p className="dialog-summary">{project.line}</p>
          <h3>What shipped</h3>
          <ul className="dialog-points">
            {project.points.map((point) => <li key={point}>{point}</li>)}
          </ul>
          {project.stack && <p className="dialog-stack">{project.stack}</p>}
          <div className="project-links">
            {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer">Open the live product ↗</a>}
            {project.repo && <a href={project.repo} target="_blank" rel="noopener noreferrer">Read the source ↗</a>}
            {!project.live && !project.repo && <p>Project links are not available here yet.</p>}
          </div>
        </div>
      )}
    </dialog>
  )
}
