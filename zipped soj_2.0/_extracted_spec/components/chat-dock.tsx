'use client'

import { useEffect, useRef, useState } from 'react'
import PortfolioChat from '@/components/portfolio-chat'

export default function ChatDock() {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const previouslyOpened = useRef(false)

  useEffect(() => {
    if (!open) {
      if (previouslyOpened.current) {
        previouslyOpened.current = false
        triggerRef.current?.focus()
      }
      return
    }

    previouslyOpened.current = true
    document.getElementById('portfolio-question')?.focus()
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [open])

  return (
    <div className="chat-dock">
      <div
        className="chat-dock-panel"
        id="chat-dock-panel"
        role="dialog"
        aria-label="Ask about Jeremiah"
        aria-hidden={!open}
        hidden={!open}
      >
        {open && <PortfolioChat />}
      </div>
      <button
        ref={triggerRef}
        className="chat-fab"
        type="button"
        aria-controls="chat-dock-panel"
        aria-expanded={open}
        aria-label={open ? 'Close chat' : 'Ask about Jeremiah'}
        onClick={() => setOpen((current) => !current)}
      >
        {open ? '×' : 'Ask'}
      </button>
    </div>
  )
}
