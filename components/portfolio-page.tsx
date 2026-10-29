'use client'

import { useEffect, useRef, useState } from 'react'
import HeroGL from '@/components/hero-gl'
import ChatDock from '@/components/chat-dock'
import DynamicIsland from '@/components/dynamic-island'
import CustomCursor from '@/components/custom-cursor'
import StudioGallery from '@/components/studio-gallery'
import DemoPopup from '@/components/demo-popup'
import ProjectDialog from '@/components/project-dialog'
import IntelligenceTerminal from '@/components/intelligence-terminal'
import { experience, projects, type Project } from '@/lib/data'

const EMAIL = 'jeremiahshadamoro@gmail.com'
const STATEMENT = ['I make useful things', 'with an artist’s eye', 'and an engineer’s patience.']

export default function PortfolioPage() {
  const [time, setTime] = useState('')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [copied, setCopied] = useState(false)
  const [hovered, setHovered] = useState<Project | null>(null)
  const clearTimerRef = useRef<NodeJS.Timeout | null>(null)
  const scrollProgress = useRef(0)
  const statementRef = useRef<HTMLHeadingElement>(null)
  const timelineProgressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleGlobalPointerMove = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null
      const row = target?.closest('.project-row')
      if (!row) {
        if (clearTimerRef.current) clearTimeout(clearTimerRef.current)
        clearTimerRef.current = setTimeout(() => {
          setHovered((curr) => (curr ? null : curr))
        }, 60)
      }
    }

    const handleWindowLeave = () => {
      if (clearTimerRef.current) clearTimeout(clearTimerRef.current)
      setHovered(null)
    }

    const handleScroll = () => {
      if (clearTimerRef.current) clearTimeout(clearTimerRef.current)
      setHovered(null)
    }

    window.addEventListener('pointermove', handleGlobalPointerMove, { passive: true })
    window.addEventListener('mouseleave', handleWindowLeave)
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('pointermove', handleGlobalPointerMove)
      window.removeEventListener('mouseleave', handleWindowLeave)
      window.removeEventListener('scroll', handleScroll)
      if (clearTimerRef.current) clearTimeout(clearTimerRef.current)
    }
  }, [])

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
      const emphasis =
        token === 'artist’s' || token === 'eye'
          ? 'statement-laterite'
          : token === 'patience'
          ? 'statement-ochre'
          : undefined

      return (
        <span className={emphasis} data-reveal key={`${lineIndex}-${index}`}>
          {word}{' '}
        </span>
      )
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
          <div className="hero-name-clean">
            <span className="hero-name-title">Jeremiah Shadamoro</span>
            <span className="hero-name-badge">/ S.O.J</span>
          </div>

          <div className="hero-role-block">
            <h1 className="hero-role-headline">
              FULL-STACK{' '}<span className="hero-role-accent">AI</span>{' '}ENGINEER
            </h1>
            <p className="hero-role-description">
              Designing interfaces that earn trust, engineering low-latency retrieval &amp; vision pipelines, and carrying resilient full-stack systems to production.
            </p>
          </div>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {Array.from({ length: 2 }, (_, index) => (
            <p key={index}>
              FULL-STACK AI ENGINEER / PAINTER / WRITER / RAG / AGENTS / COMPUTER VISION / LAGOS / S.O.J /{' '}
            </p>
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
          <p className="section-note">Four case studies. Hover for a demo, select one for architecture &amp; links.</p>
        </div>
        <div
          className="project-list"
          onPointerLeave={() => {
            if (clearTimerRef.current) clearTimeout(clearTimerRef.current)
            clearTimerRef.current = setTimeout(() => setHovered(null), 50)
          }}
        >
          {projects.map((project) => (
            <button
              className={`project-row ${project.color}`}
              type="button"
              key={project.key}
              onClick={() => {
                if (clearTimerRef.current) clearTimeout(clearTimerRef.current)
                setHovered(null)
                setSelectedProject(project)
              }}
              onPointerEnter={() => {
                if (clearTimerRef.current) clearTimeout(clearTimerRef.current)
                setHovered(project)
              }}
              onPointerLeave={() => {
                if (clearTimerRef.current) clearTimeout(clearTimerRef.current)
                clearTimerRef.current = setTimeout(() => setHovered(null), 50)
              }}
              onFocus={(e) => {
                if (e.currentTarget.matches(':focus-visible')) {
                  if (clearTimerRef.current) clearTimeout(clearTimerRef.current)
                  setHovered(project)
                }
              }}
              onBlur={() => {
                if (clearTimerRef.current) clearTimeout(clearTimerRef.current)
                setHovered(null)
              }}
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
          <h2 id="studio-title">
            Before the interface,<br />
            <em>there is a gesture.</em>
          </h2>
          <p className="studio-copy">Paintings and drawings are the other place I test an idea.</p>
        </div>
        <StudioGallery />
        <div className="studio-writing section-pad">
          <p className="section-label">Notes from the desk</p>
          <a
            className="writing-link"
            href="https://medium.com/@jeremiahshadamoro"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read my writing on Medium ↗
          </a>
        </div>
      </section>

      <section className="process section-pad" id="process" aria-labelledby="process-title">
        <div className="section-top">
          <p className="section-label" id="process-title">04 / S.O.J Intelligence Terminal</p>
          <p className="section-note">Retrieve first. Answer only what you can cite. Try the live model below.</p>
        </div>
        <div className="pipeline" aria-label="Question, retrieve, ground, answer with a source">
          {['Question', 'Retrieve', 'Ground', 'Answer + cite'].map((step, index) => (
            <div className="pipeline-step" key={step}>
              <div className={`pipeline-node node-${index}`}>
                <b>0{index + 1}</b>
                <span>{step}</span>
              </div>
              {index < 3 && <span className="pipeline-arrow" aria-hidden="true">→</span>}
            </div>
          ))}
        </div>

        {/* The Dedicated S.O.J Intelligence Terminal */}
        <div className="terminal-section-wrap">
          <IntelligenceTerminal id="chat-terminal" />
        </div>
      </section>

      <section className="experience section-pad" id="experience" aria-labelledby="experience-title">
        <div className="section-top">
          <p className="section-label" id="experience-title">05 / Experience</p>
          <p className="section-note">Oldest first. Frontend became full-stack.</p>
        </div>
        <div className="timeline">
          <div className="timeline-line" aria-hidden="true">
            <div ref={timelineProgressRef} />
          </div>
          {experience.map((item, index) => (
            <article className="xp" key={item.org}>
              <span className={`timeline-dot dot-${index % 4}`} aria-hidden="true" />
              <div className="xp-head">
                <strong>{item.org}</strong>
                <span>{item.role} · {item.where}</span>
                <time>{item.when}</time>
              </div>
              <ul className="xp-points">
                {item.pts.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div className="stack">
          <p className="section-label">Tools I reach for</p>
          <p>
            Python / TypeScript / Next.js / React Native<br />
            FastAPI / LangGraph / RAG / agents<br />
            PostgreSQL / pgvector / Redis / Firebase<br />
            GSAP / Three.js / Tailwind / GitHub Actions
          </p>
        </div>
      </section>

      <footer className="footer section-pad" id="contact">
        <div className="footer-main">
          <p className="section-label">06 / Contact</p>
          <h2>
            <a href={`mailto:${EMAIL}`}>
              Let&apos;s make<br />
              <em>something useful.</em>
            </a>
          </h2>
          <button className="copy-button" type="button" onClick={copyEmail} aria-live="polite">
            {copied ? 'Copied' : 'Copy email'}
          </button>
        </div>
        <div className="footer-meta">
          <p>
            Lagos, Nigeria<br />
            <span className="clock">{time || '00:00:00'} WAT</span>
          </p>
          <div className="footer-links">
            <a href="https://github.com/JeremiahShadams" target="_blank" rel="noopener noreferrer">
              GitHub ↗
            </a>
            <a
              href="https://www.linkedin.com/in/jeremiah-shadamoro-547224235/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn ↗
            </a>
            <a href="https://medium.com/@jeremiahshadamoro" target="_blank" rel="noopener noreferrer">
              Medium ↗
            </a>
            <a href="/Jeremiah_Shadamoro_CV.pdf" download>
              Download CV ↓
            </a>
            <a href="#top">Back to top ↑</a>
          </div>
        </div>

        <div className="footer-adire-wrapper">
          <p className="footer-adire-description">
            Canvas backdrop inspired by <em>Adire</em> — traditional Yoruba resist-dyed indigo textiles (Oniko rings, stitched dots, and Ibadandun geometric patterns), rendered in real-time WebGL.
          </p>
        </div>
      </footer>

      <DemoPopup project={hovered} />
      <ChatDock />
      <ProjectDialog project={selectedProject} onClose={() => setSelectedProject(null)} />
    </main>
  )
}
