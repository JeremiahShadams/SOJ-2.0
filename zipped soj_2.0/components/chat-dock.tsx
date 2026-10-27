'use client'

import { useEffect, useRef, useState } from 'react'
import PortfolioChat from '@/components/portfolio-chat'

export default function ChatDock() {
  const [open, setOpen] = useState(false)
  const [seen, setSeen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const handleOpenChat = () => {
      setOpen(true)
      setSeen(true)
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('open-chat', handleOpenChat)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('open-chat', handleOpenChat)
    }
  }, [])

  const toggle = () => {
    setOpen((v) => !v)
    setSeen(true)
  }

  return (
    <div className="chat-dock">
      {open && (
        <div
          className="chat-dock-panel"
          id="chat-dock-panel"
          role="dialog"
          aria-label="Ask about Jeremiah"
        >
          <PortfolioChat />
        </div>
      )}

      {!open && !seen && (
        <div className="chat-tip" role="status">
          <span className="chat-tip-dot" aria-hidden="true" />
          <span>Ask S.O.J&apos;s AI about his work</span>
        </div>
      )}

      <button
        ref={triggerRef}
        className={open ? 'chat-fab is-open' : 'chat-fab'}
        type="button"
        aria-controls="chat-dock-panel"
        aria-expanded={open}
        aria-label={open ? 'Close chat' : 'Ask Jeremiah’s portfolio assistant'}
        onClick={toggle}
      >
        {open ? (
          <span className="chat-fab-close" aria-hidden="true">✕</span>
        ) : (
          <div className="chat-fab-content" aria-hidden="true">
            <svg
              className="chat-fab-icon"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Intelligent AI Spark / Neural Circuit */}
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="#e4491f" strokeWidth="1.5" opacity="0.6" />
              <path d="M12 6l1.8 4.2L18 12l-4.2 1.8L12 18l-1.8-4.2L6 12l4.2-1.8L12 6z" fill="#f2ede4" stroke="#e4491f" strokeWidth="1.2" />
              <circle cx="12" cy="12" r="1.5" fill="#e4491f" />
            </svg>
            <span className="chat-fab-pulse" />
          </div>
        )}
      </button>
    </div>
  )
}
