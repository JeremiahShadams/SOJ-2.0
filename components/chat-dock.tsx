'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import PortfolioChat from '@/components/portfolio-chat'
import ChatBot2D from '@/components/chat-bot-2d'

const ChatBot3D = dynamic(() => import('@/components/chat-bot-3d'), {
  ssr: false,
  loading: () => <ChatBot2D open={false} />,
})

export default function ChatDock() {
  const [open, setOpen] = useState(false)
  const [tipVisible, setTipVisible] = useState(false)
  const [use3D, setUse3D] = useState(false)
  const [hopRatio, setHopRatio] = useState(0)
  const [hasOpened, setHasOpened] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    // 1. Check if user already saw tooltip this visit
    const tipSeen = sessionStorage.getItem('soj_chat_tip_seen') === 'true'
    if (!tipSeen) {
      // Show tooltip after slight delay, hide after 6 seconds
      const tipTimer = setTimeout(() => {
        setTipVisible(true)
      }, 2500)

      const hideTimer = setTimeout(() => {
        setTipVisible(false)
        sessionStorage.setItem('soj_chat_tip_seen', 'true')
      }, 8500)

      return () => {
        clearTimeout(tipTimer)
        clearTimeout(hideTimer)
      }
    }
  }, [])

  useEffect(() => {
    // 2. Hardware check & Idle mounting for 3D
    const isLowPower =
      typeof navigator !== 'undefined' &&
      navigator.hardwareConcurrency &&
      navigator.hardwareConcurrency <= 2

    // Check WebGL availability
    let hasWebGL = false
    try {
      const canvas = document.createElement('canvas')
      hasWebGL = Boolean(
        window.WebGLRenderingContext &&
          (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      )
    } catch {
      hasWebGL = false
    }

    if (isLowPower || !hasWebGL) {
      setUse3D(false)
      return
    }

    // Mount after window 'load' using requestIdleCallback or setTimeout 1200ms
    const mount3D = () => {
      setUse3D(true)
    }

    if (document.readyState === 'complete') {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(mount3D, { timeout: 1500 })
      } else {
        setTimeout(mount3D, 1200)
      }
    } else {
      const handleLoad = () => {
        if ('requestIdleCallback' in window) {
          window.requestIdleCallback(mount3D, { timeout: 1500 })
        } else {
          setTimeout(mount3D, 1200)
        }
      }
      window.addEventListener('load', handleLoad, { once: true })
      return () => window.removeEventListener('load', handleLoad)
    }
  }, [])

  useEffect(() => {
    // 3. Keyboard and external window event listeners
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const handleOpenChat = () => {
      const terminal = document.getElementById('chat-terminal')
      if (terminal) {
        terminal.scrollIntoView({ behavior: 'smooth', block: 'center' })
        const input = document.getElementById('terminal-query-input') as HTMLInputElement | null
        if (input) setTimeout(() => input.focus(), 450)
        terminal.classList.remove('term-highlight-pulse')
        void terminal.offsetWidth
        terminal.classList.add('term-highlight-pulse')
      } else {
        setOpen(true)
      }
      setHasOpened(true)
      setTipVisible(false)
      sessionStorage.setItem('soj_chat_tip_seen', 'true')
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('open-chat', handleOpenChat)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('open-chat', handleOpenChat)
    }
  }, [])

  const toggle = () => {
    const terminal = document.getElementById('chat-terminal')
    if (terminal) {
      terminal.scrollIntoView({ behavior: 'smooth', block: 'center' })
      const input = document.getElementById('terminal-query-input') as HTMLInputElement | null
      if (input) setTimeout(() => input.focus(), 450)
      terminal.classList.remove('term-highlight-pulse')
      void terminal.offsetWidth
      terminal.classList.add('term-highlight-pulse')
      setHasOpened(true)
      setTipVisible(false)
      sessionStorage.setItem('soj_chat_tip_seen', 'true')
    } else {
      setOpen((prev) => {
        const next = !prev
        if (next) {
          setHasOpened(true)
          setTipVisible(false)
          sessionStorage.setItem('soj_chat_tip_seen', 'true')
        }
        return next
      })
    }
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

      {/* Tooltip bubble (once per visit for 6s) */}
      {!open && tipVisible && (
        <div className="chat-mascot-tip" role="status">
          <span className="chat-mascot-tip-dot" aria-hidden="true" />
          <span>Ask S.O.J&apos;s AI ↓</span>
        </div>
      )}

      {/* Mascot Wrapper with Contact Shadow & Pulse Ring */}
      <div className="chat-mascot-wrapper">
        {/* Soft Laterite Attention Pulse (stops after first open) */}
        {!hasOpened && !open && (
          <div className="chat-mascot-pulse-ring" aria-hidden="true" />
        )}

        {/* Contact Shadow that scales down while bot hops */}
        <div
          className="chat-mascot-shadow"
          style={{
            transform: `scale(${Math.max(0.4, 1 - hopRatio * 0.55)})`,
            opacity: Math.max(0.12, 0.35 - hopRatio * 0.2),
          }}
          aria-hidden="true"
        />

        {/* Interactive Button */}
        <button
          ref={triggerRef}
          className={`chat-mascot-btn ${open ? 'is-open' : ''}`}
          type="button"
          aria-controls="chat-dock-panel"
          aria-expanded={open}
          aria-label="Ask S.O.J's AI assistant"
          onClick={toggle}
        >
          {use3D ? (
            <ChatBot3D
              open={open}
              onToggle={toggle}
              onHopChange={setHopRatio}
            />
          ) : (
            <ChatBot2D open={open} />
          )}

          {/* Close indicator overlay if open */}
          {open && (
            <span className="chat-mascot-close-badge" aria-hidden="true">
              ✕
            </span>
          )}
        </button>
      </div>
    </div>
  )
}
