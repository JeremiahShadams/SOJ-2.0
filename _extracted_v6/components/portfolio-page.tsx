'use client'

import { useEffect, useRef, useState } from 'react'
import HeroGL from '@/components/hero-gl'
import ChatDock from '@/components/chat-dock'
import DynamicIsland from '@/components/dynamic-island'
import CustomCursor from '@/components/custom-cursor'
import StudioGallery from '@/components/studio-gallery'
import DemoPopup from '@/components/demo-popup'
import ProjectDialog from '@/components/project-dialog'
import { experience, projects, type Project } from '@/lib/data'

const EMAIL = 'jeremiahshadamoro@gmail.com'
const STATEMENT = ['I make useful things', 'with an artist’s eye', 'and an engineer’s patience.']
const NAV_ITEMS = [
  ['Work', '#work'],
  ['Studio', '#studio'],
  ['Process', '#process'],
  ['Experience', '#experience'],
  ['Contact', '#contact'],
]

export default function PortfolioPage() {
  const [time, setTime] = useState('')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [copied, setCopied] = useState(false)
  const [hovered, setHovered] = useState<Project | null>(null)
  const scrollProgress = useRef(0)
  const statementRef = useRef<HTMLHeadingElement>(null)
  const timelineProgressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat('en-NG', {
      timeZone: 'Africa/Lagos',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
    const updateTime = () => setTime(formatter.format(new Date()))
    let frame = 0

    const updateScrollEffects = () => {
      scrollProgress.current = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 2)

      const heading = statementRef.current
      const bounds = heading?.getBoundingClientRect()
      const words = heading?.querySelectorAll<HTMLElement>('[data-reveal]')
      if (bounds && words?.length) {
        const progress = Math.min(Math.max((window.innerHeight * 0.85 - bounds.top) / (window.innerHeight * 0.7), 0), 1)
        words.forEach((word, index) => {
          word.style.opacity = String(Math.min(Math.max(progress * words.length - index, 0.18), 1))
        })
      }

      const line = timelineProgressRef.current
      const timeline = line?.parentElement?.getBoundingClientRect()
      if (line && timeline) {
        const progress = Math.min(Math.max((window.innerHeight * 0.72 - timeline.top) / Math.max(timeline.height, 1), 0), 1)
        line.style.transform = `scaleY(${progress})`
      }
    }

    const scheduleScrollUpdate = () => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(updateScrollEffects)
    }

    updateTime()
    scheduleScrollUpdate()
    const interval = window.setInterval(updateTime, 1000)
    window.addEventListener('scroll', scheduleScrollUpdate, { passive: true })
    window.addEventListener('resize', scheduleScrollUpdate)

    return () => {
      window.clearInterval(interval)
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', scheduleScrollUpdate)
      window.removeEventListener('resize', scheduleScrollUpdate)
    }
  }, [])

  const renderStatementWords = (line: string, lineIndex: number) =>
    line.split(' ').map((word, index) => {
      const token = word.toLowerCase().replace(/[^a-z’]/g, '')
      const emphasis = token === 'artist’s' || token === 'eye'
        ? 'statement-laterite'
        : token === 'patience'
          ? 'statement-ochre'
          : undefined

      return <span className={emphasis} data-reveal key={`${lineIndex}-${index}`}>{word} </span>
    })

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <main className="site-shell">
      <DynamicIsland />
      <CustomCursor />

      <section className="hero" id="top">
        <HeroGL scroll={scrollProgress} />
        <div className="hero-copy">
          <h1 aria-label="Jeremiah Shadamoro">
            {['Jeremiah', 'Shadamoro'].map((word, row) => (
              <span className={`hero-name-row${row ? ' hero-name-emphasis' : ''}`} key={word} aria-hidden="true">
                {word.split('').map((letter, index) => (
                  <span key={index} style={{ animationDelay: `${(row * 9 + index) * 45 + 200}ms` }}>{letter}</span>
                ))}
              </span>
            ))}
          </h1>
          <div className="hero-foot">
            <p>AI &amp; full-stack engineer<br />who paints, draws and writes.</p>
            <span className="scroll-note">Move your cursor. Scroll to enter ↓</span>
          </div>
        </div>
        <p className="hero-mark" aria-hidden="true">INK<br />&amp;<br />CIRCUIT</p>
        <p className="adire-note">Adire / Yoruba resist-dyed indigo cloth</p>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {Array.from({ length: 2 }, (_, index) => (
            <p key={index}>AI ENGINEER / FULL-STACK / PAINTER / WRITER / RAG / AGENTS / LAGOS / </p>
          ))}
        </div>
      </div>

      <div className="adire-band" aria-hidden="true" />

      <section className="statement section-pad" aria-labelledby="statement-title">
        <p className="section-label">01 / A working thesis</p>
        <h2 id="statement-title" aria-label={STATEMENT.join(' ')} ref={statementRef}>
          {STATEMENT.map((line, index) => (
            <span className="statement-line" key={line}>
              {renderStatementWords(line, index)}
              {index < STATEMENT.length - 1 && <br />}
            </span>
          ))}
        </h2>
      </section>

      <section className="work section-pad" id="work" aria-labelledby="work-title">
        <div className="section-top">
          <p className="section-label" id="work-title">02 / Selected work</p>
          <p className="section-note">Three case studies. Hover for a demo, select one for the details and links.</p>
        </div>
        <div className="project-list">
          {projects.map((project) => (
            <button
              className={`project-row ${project.color}`}
              type="button"
              key={project.key}
              onClick={() => setSelectedProject(project)}
              onPointerEnter={() => setHovered(project)}
              onPointerLeave={() => setHovered(null)}
              onFocus={() => setHovered(project)}
              onBlur={() => setHovered(null)}
            >
              <span className="project-number">{project.n}</span>
              <span className="project-main">
                <span className="project-title">{project.name}</span>
                <span className="project-description">{project.line}</span>
              </span>
              <span className="project-meta">
                <span>{project.type}</span>
                <span>{project.year}</span>
                <span className="arrow" aria-hidden="true">↗</span>
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="studio" id="studio" aria-labelledby="studio-title">
        <div className="section-pad studio-intro">
          <p className="section-label">03 / Studio</p>
          <h2 id="studio-title">Before the interface,<br /><em>there is a gesture.</em></h2>
          <p className="studio-copy">Paintings and drawings are the other place I test an idea.</p>
        </div>
        <StudioGallery />
        <div className="studio-writing section-pad">
          <p className="section-label">Notes from the desk</p>
          <a className="writing-link" href="https://medium.com/@jeremiahshadamoro" target="_blank" rel="noopener noreferrer">Read my writing on Medium ↗</a>
        </div>
      </section>

      <section className="process section-pad" id="process" aria-labelledby="process-title">
        <div className="section-top">
          <p className="section-label" id="process-title">04 / How I build</p>
          <p className="section-note">Retrieve first. Answer only what you can cite.</p>
        </div>
        <div className="pipeline" aria-label="Question, retrieve, ground, answer with a source">
          {['Question', 'Retrieve', 'Ground', 'Answer + cite'].map((step, index) => (
            <div className="pipeline-step" key={step}>
              <div className={`pipeline-node node-${index}`}><b>0{index + 1}</b><span>{step}</span></div>
              {index < 3 && <span className="pipeline-arrow" aria-hidden="true">→</span>}
            </div>
          ))}
        </div>
        <p className="chat-caption">Questions? The chat button in the corner knows my work.</p>
      </section>

      <section className="experience section-pad" id="experience" aria-labelledby="experience-title">
        <div className="section-top">
          <p className="section-label" id="experience-title">05 / Experience</p>
          <p className="section-note">Oldest first. Frontend became full-stack.</p>
        </div>
        <div className="timeline">
          <div className="timeline-line" aria-hidden="true"><div ref={timelineProgressRef} /></div>
          {experience.map((item, index) => (
            <article className="xp" key={item.org}>
              <span className={`timeline-dot dot-${index % 4}`} aria-hidden="true" />
              <div className="xp-head">
                <strong>{item.org}</strong>
                <span>{item.role} · {item.where}</span>
                <time>{item.when}</time>
              </div>
              <ul className="xp-points">
                {item.pts.map((point) => <li key={point}>{point}</li>)}
              </ul>
            </article>
          ))}
        </div>
        <div className="stack">
          <p className="section-label">Tools I reach for</p>
          <p>Python / TypeScript / Next.js / React Native<br />FastAPI / LangGraph / RAG / agents<br />PostgreSQL / pgvector / Redis / Firebase<br />GSAP / Three.js / Tailwind / GitHub Actions</p>
        </div>
      </section>

      <footer className="footer section-pad" id="contact">
        <div className="footer-main">
          <p className="section-label">06 / Contact</p>
          <h2><a href={`mailto:${EMAIL}`}>Let&apos;s make<br /><em>something useful.</em></a></h2>
          <button className="copy-button" type="button" onClick={copyEmail} aria-live="polite">
            {copied ? 'Copied' : 'Copy email'}
          </button>
        </div>
        <div className="footer-meta">
          <p>Lagos, Nigeria<br /><span className="clock">{time || '00:00:00'} WAT</span></p>
          <div className="footer-links">
            <a href="https://github.com/JeremiahShadams" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
            <a href="https://www.linkedin.com/in/jeremiah-shadamoro-547224235/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
            <a href="https://medium.com/@jeremiahshadamoro" target="_blank" rel="noopener noreferrer">Medium ↗</a>
            <a href="/Jeremiah_Shadamoro_CV.pdf" download>Download CV ↓</a>
            <a href="#top">Back to top ↑</a>
          </div>
        </div>
      </footer>

      <DemoPopup project={hovered} />
      <ChatDock />
      <ProjectDialog project={selectedProject} onClose={() => setSelectedProject(null)} />
    </main>
  )
}
