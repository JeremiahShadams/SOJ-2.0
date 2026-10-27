'use client'

import { useEffect, useState } from 'react'
import PortfolioChat from '@/components/portfolio-chat'

export default function ChatDock() {
  const [open, setOpen] = useState(false)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const key = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const show = () => { setOpen(true); setSeen(true) }
    addEventListener('keydown', key); addEventListener('open-chat', show)
    return () => { removeEventListener('keydown', key); removeEventListener('open-chat', show) }
  }, [])
  const toggle = () => { setOpen((v) => !v); setSeen(true) }
  return (
    <div className="chat-dock">
      {open && <div className="chat-dock-panel" role="dialog" aria-label="Ask about Jeremiah"><PortfolioChat /></div>}
      {!open && !seen && <p className="chat-tip">Ask my AI about my work</p>}
      <button className={open ? 'chat-fab is-open' : 'chat-fab'} type="button" aria-expanded={open} aria-label={open ? 'Close chat' : 'Ask Jeremiah’s AI assistant'} onClick={toggle}>
        {open ? <span aria-hidden="true">✕</span> : (
          <svg viewBox="0 0 48 48" width="40" height="40" aria-hidden="true">
            <line x1="24" y1="4" x2="24" y2="11" stroke="#f2ede4" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="24" cy="4" r="3" fill="#d9a441" />
            <rect x="3" y="21" width="4" height="10" rx="2" fill="#f2ede4" />
            <rect x="41" y="21" width="4" height="10" rx="2" fill="#f2ede4" />
            <rect x="8" y="11" width="32" height="28" rx="9" fill="#f2ede4" />
            <g className="bot-eyes"><circle cx="18" cy="24" r="3.6" fill="#0e0d0b" /><circle cx="30" cy="24" r="3.6" fill="#0e0d0b" /></g>
            <path d="M17 32 Q24 37 31 32" stroke="#e4491f" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </svg>
        )}
      </button>
    </div>
  )
}
