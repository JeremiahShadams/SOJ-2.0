'use client'

import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { answer } from '@/lib/data'

interface TopicChip {
  id: string
  label: string
  query: string
  icon: string
}

const TOPIC_CHIPS: TopicChip[] = [
  { id: 'cg', label: 'ContractGuard RAG', query: 'How does ContractGuard review contracts?', icon: '🛡️' },
  { id: 'fresco', label: 'Fresco CV Scanner', query: 'What is Fresco and how does it scan produce?', icon: '🍎' },
  { id: 'harvest', label: 'Harvest-Link Logistics', query: "What is Harvest-Link's offline sync architecture?", icon: '🌾' },
  { id: 'citer', label: 'Citer AST Intelligence', query: 'How does Citer search repositories with Tree-Sitter?', icon: '⌘' },
  { id: 'remote', label: 'US Remote Roles', query: 'Is Jeremiah open to US remote AI software engineer roles?', icon: '💼' },
  { id: 'contact', label: 'Direct Contact', query: 'How do I contact Jeremiah or hire him?', icon: '✉️' },
]

interface MessageTurn {
  id: string
  sender: 'user' | 'bot'
  text: string
  timestamp: string
  source?: string | null
  topicKey?: 'cg' | 'fresco' | 'harvest' | 'citer' | 'contact' | 'remote' | null
  suggestions?: string[]
}

type ChatReply = { answer?: unknown }

export default function SojChatPopup({
  onClose,
  dockPosition = 'center',
  onToggleDock,
}: {
  onClose: () => void
  dockPosition?: 'center' | 'corner'
  onToggleDock?: () => void
}) {
  const [question, setQuestion] = useState('')
  const [busy, setBusy] = useState(false)
  const [activeStep, setActiveStep] = useState<number>(0)
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [copiedTextId, setCopiedTextId] = useState<string | null>(null)
  const transcriptRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const [messages, setMessages] = useState<MessageTurn[]>([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: 'Dispatch on shift. I am Jeremiah "SOJ" Shadamoro\'s AI assistant. I answer questions about his AI architectures, production code, case studies, and availability using only verified facts. What would you like to inspect?',
      timestamp: 'Just now',
      suggestions: [
        'How does ContractGuard achieve 91% accuracy?',
        'How does Fresco run on-device?',
        'Is Jeremiah available for US remote roles?',
        'How do I reach him directly?',
      ],
    },
  ])

  useEffect(() => {
    const transcript = transcriptRef.current
    if (transcript) {
      transcript.scrollTo({
        top: transcript.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [messages, busy])

  useEffect(() => {
    // Focus input on mount
    const timer = setTimeout(() => {
      if (inputRef.current) inputRef.current.focus()
    }, 200)
    return () => clearTimeout(timer)
  }, [])

  const detectTopic = (query: string): MessageTurn['topicKey'] => {
    const q = query.toLowerCase()
    if (q.includes('contract') || q.includes('legal') || q.includes('guard')) return 'cg'
    if (q.includes('fresco') || q.includes('produce') || q.includes('shelf')) return 'fresco'
    if (q.includes('harvest') || q.includes('farm') || q.includes('agritech')) return 'harvest'
    if (q.includes('citer') || q.includes('code') || q.includes('ast') || q.includes('repo')) return 'citer'
    if (q.includes('contact') || q.includes('reach') || q.includes('email') || q.includes('hire')) return 'contact'
    if (q.includes('remote') || q.includes('us') || q.includes('role') || q.includes('available')) return 'remote'
    return null
  }

  const getFollowups = (topic: MessageTurn['topicKey']): string[] => {
    switch (topic) {
      case 'cg':
        return ['Tell me about Fresco', 'What is his tech stack?', 'How do I contact him?']
      case 'fresco':
        return ['Tell me about Harvest-Link', 'How does Citer work?', 'Is he open to remote work?']
      case 'harvest':
        return ['Tell me about ContractGuard', 'What tech stack does he use?', 'Can he work US hours?']
      case 'citer':
        return ['Tell me about ContractGuard', 'What did he build at MIST?', 'How do I hire him?']
      case 'contact':
      case 'remote':
        return ['What are his main AI projects?', 'Tell me about ContractGuard', 'What is his stack?']
      default:
        return ['Tell me about ContractGuard', 'How does Fresco work?', 'How do I contact him?']
    }
  }

  const handleCopy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedTextId(id)
      setTimeout(() => setCopiedTextId(null), 1800)
    } catch {
      // fallback
    }
  }

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('shadams.dev@gmail.com')
      setCopiedEmail(true)
      setTimeout(() => setCopiedEmail(false), 2000)
    } catch {
      // fallback
    }
  }

  const submitQuestion = async (rawQuery: string) => {
    const trimmed = rawQuery.trim().slice(0, 400)
    if (!trimmed || busy) return

    const now = new Date()
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(
      now.getMinutes()
    ).padStart(2, '0')} WAT`

    const userMsg: MessageTurn = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: trimmed,
      timestamp: timeStr,
    }

    setMessages((prev) => [...prev, userMsg])
    setQuestion('')
    setBusy(true)
    setActiveStep(1) // Input analysis

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('chat-thinking'))
    }

    const t1 = setTimeout(() => setActiveStep(2), 220) // Vector search
    const t2 = setTimeout(() => setActiveStep(3), 480) // Grounding

    let response = answer(trimmed)

    try {
      const reply = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: trimmed }),
        cache: 'no-store',
      })
      const payload = (await reply.json()) as ChatReply
      if (
        (reply.ok || reply.status === 429 || reply.status === 503) &&
        typeof payload.answer === 'string'
      ) {
        response = payload.answer
      }
    } catch {
      response = answer(trimmed)
    } finally {
      clearTimeout(t1)
      clearTimeout(t2)
      setActiveStep(4)
      setTimeout(() => setActiveStep(0), 1000)

      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('chat-answered'))
      }
    }

    // Extract source citation
    let cleanText = response
    let extractedSource: string | null = null
    const sourceMatch = response.match(/\s*(Sources?:.*)$/i)
    if (sourceMatch) {
      cleanText = response.replace(/\s*(Sources?:.*)$/i, '').trim()
      extractedSource = sourceMatch[1]
    }

    const topic = detectTopic(trimmed)
    const suggestions = getFollowups(topic)

    const botMsg: MessageTurn = {
      id: `b-${Date.now()}`,
      sender: 'bot',
      text: cleanText,
      source: extractedSource,
      timestamp: timeStr,
      topicKey: topic,
      suggestions,
    }

    setMessages((prev) => [...prev, botMsg])
    setBusy(false)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (e.nativeEvent.isComposing || e.keyCode === 229) return
      e.preventDefault()
      void submitQuestion(question)
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  const resetChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'bot',
        text: 'Session reset. S.O.J Dispatch is ready for fresh queries. Choose a topic below or type any question.',
        timestamp: 'Just now',
        suggestions: [
          'How does ContractGuard achieve 91% accuracy?',
          'Tell me about Harvest-Link',
          'How do I reach Jeremiah?',
        ],
      },
    ])
    setQuestion('')
    if (inputRef.current) inputRef.current.focus()
  }

  return (
    <div className="soj-chat-window" role="dialog" aria-label="S.O.J AI Dispatch Assistant">
      {/* Header Deck */}
      <div className="soj-chat-header">
        <div className="header-persona">
          <div className="header-mascot-avatar" aria-hidden="true">
            {/* Robot Face SVG with Crown */}
            <svg viewBox="0 0 40 40" className="mascot-avatar-svg">
              {/* Crown */}
              <polygon points="12,12 15,6 20,10 25,6 28,12" fill="#e8b23c" />
              <circle cx="15" cy="6" r="1.5" fill="#fde047" />
              <circle cx="20" cy="10" r="1.5" fill="#e4491f" />
              <circle cx="25" cy="6" r="1.5" fill="#fde047" />
              {/* Head */}
              <rect x="8" y="12" width="24" height="20" rx="6" fill="#e4491f" />
              {/* Screen */}
              <rect x="11" y="15" width="18" height="14" rx="3.5" fill="#0b0a09" />
              {/* Eyes */}
              <circle cx="16" cy="21" r="2.2" fill="#f2ede4" />
              <circle cx="24" cy="21" r="2.2" fill="#f2ede4" />
              {/* Smile */}
              <path d="M17 25 Q20 27 23 25" stroke="#e4491f" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            </svg>
            <span className="avatar-online-dot" />
          </div>

          <div className="header-meta">
            <div className="header-title-row">
              <span className="header-title">SOJ DISPATCH</span>
              <span className="header-ai-tag">CLAUDE 3.5 RAG</span>
            </div>
            <div className="header-subtitle">Verified facts · Zero hallucination</div>
          </div>
        </div>

        <div className="header-controls">
          <button
            type="button"
            className="header-btn"
            onClick={resetChat}
            title="Reset conversation"
            aria-label="Reset conversation"
          >
            ↺
          </button>
          {onToggleDock && (
            <button
              type="button"
              className="header-btn btn--dock"
              onClick={onToggleDock}
              title={dockPosition === 'center' ? 'Dock to corner' : 'Center on screen'}
              aria-label={dockPosition === 'center' ? 'Dock to corner' : 'Center on screen'}
            >
              {dockPosition === 'center' ? '⤡' : '⤢'}
            </button>
          )}
          <button
            type="button"
            className="header-btn btn--close"
            onClick={onClose}
            title="Close chat (Esc)"
            aria-label="Close chat"
          >
            ✕
          </button>
        </div>
      </div>

      {/* RAG Telemetry Flow Bar */}
      <div className="soj-chat-telemetry" aria-label="RAG Pipeline Flow">
        <div className={`tele-node ${activeStep >= 1 ? 'is-active' : ''}`}>
          <span className="tele-num">01</span>
          <span>QUERY</span>
        </div>
        <span className="tele-arrow">➔</span>
        <div className={`tele-node ${activeStep >= 2 ? 'is-active' : ''}`}>
          <span className="tele-num">02</span>
          <span>PGVECTOR</span>
        </div>
        <span className="tele-arrow">➔</span>
        <div className={`tele-node ${activeStep >= 3 ? 'is-active' : ''}`}>
          <span className="tele-num">03</span>
          <span>GROUND</span>
        </div>
        <span className="tele-arrow">➔</span>
        <div className={`tele-node ${activeStep >= 4 ? 'is-active' : ''}`}>
          <span className="tele-num">04</span>
          <span>CITE</span>
        </div>
      </div>

      {/* Quick Topic Chips Strip */}
      <div className="soj-chat-topics-bar">
        {TOPIC_CHIPS.map((chip) => (
          <button
            key={chip.id}
            type="button"
            className="topic-chip-btn"
            disabled={busy}
            onClick={() => void submitQuestion(chip.query)}
          >
            <span className="topic-icon">{chip.icon}</span>
            <span className="topic-text">{chip.label}</span>
          </button>
        ))}
      </div>

      {/* Chat Transcript Stream */}
      <div ref={transcriptRef} className="soj-chat-stream" aria-live="polite">
        {messages.map((msg) => (
          <div key={msg.id} className={`chat-bubble-row row--${msg.sender}`}>
            {/* Bot Avatar on left */}
            {msg.sender === 'bot' && (
              <div className="msg-bot-avatar" aria-hidden="true">
                <svg viewBox="0 0 24 24" className="bot-mini-svg">
                  <polygon points="7,7 9,3 12,5 15,3 17,7" fill="#e8b23c" />
                  <rect x="4" y="7" width="16" height="13" rx="3.5" fill="#e4491f" />
                  <rect x="6" y="9" width="12" height="9" rx="2" fill="#0b0a09" />
                  <circle cx="9" cy="13" r="1.4" fill="#f2ede4" />
                  <circle cx="15" cy="13" r="1.4" fill="#f2ede4" />
                </svg>
              </div>
            )}

            <div className="msg-content-wrap">
              {/* Bubble Body */}
              <div className={`chat-bubble bubble--${msg.sender}`}>
                <p className="bubble-text">{msg.text}</p>

                {/* Grounded Source Tag */}
                {msg.source && (
                  <div className="bubble-source-tag">
                    <span className="source-link-icon">🔗</span>
                    <span>{msg.source}</span>
                  </div>
                )}

                {/* Interactive Card: Direct Contact & Hire */}
                {(msg.topicKey === 'contact' || msg.topicKey === 'remote') && (
                  <div className="chat-action-card contact-action-card">
                    <div className="action-card-header">
                      <span>⚡ DIRECT CONTACT CHANNELS</span>
                      <span className="card-wat-badge">WAT (UTC+1)</span>
                    </div>

                    <div className="action-buttons-group">
                      <a
                        href="mailto:shadams.dev@gmail.com"
                        className="action-card-btn btn--primary"
                      >
                        <span>✉️ Email shadams.dev@gmail.com</span>
                      </a>

                      <button
                        type="button"
                        className="action-card-btn btn--secondary"
                        onClick={handleCopyEmail}
                      >
                        <span>{copiedEmail ? 'Copied to Clipboard ✓' : '📋 Copy Email Address'}</span>
                      </button>

                      <a
                        href="https://github.com/JeremiahShadams"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="action-card-btn btn--ghost"
                      >
                        <span>🐙 GitHub: JeremiahShadams ↗</span>
                      </a>
                    </div>
                  </div>
                )}

                {/* Interactive Card: ContractGuard */}
                {msg.topicKey === 'cg' && (
                  <div className="chat-action-card project-action-card">
                    <div className="action-card-header">
                      <span>🛡️ CONTRACTGUARD ARCHITECTURE</span>
                      <span className="card-badge">91% ACCURACY</span>
                    </div>
                    <div className="action-card-meta">
                      <span>Stack: React · Node.js · PostgreSQL / pgvector · LangChain</span>
                    </div>
                    <a
                      href="https://cg-ai.onrender.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="action-card-btn btn--primary"
                    >
                      <span>Open Live ContractGuard Product ↗</span>
                    </a>
                  </div>
                )}

                {/* Interactive Card: Fresco */}
                {msg.topicKey === 'fresco' && (
                  <div className="chat-action-card project-action-card">
                    <div className="action-card-header">
                      <span>🍎 FRESCO ON-DEVICE SCANNER</span>
                      <span className="card-badge">89.3% ACCURACY</span>
                    </div>
                    <div className="action-card-meta">
                      <span>Model: MobileNetV2 · TensorFlow.js in-browser (&lt;2s inference)</span>
                    </div>
                    <a
                      href="https://shelf-life-cyan.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="action-card-btn btn--primary"
                    >
                      <span>Open Live Fresco Scanner ↗</span>
                    </a>
                  </div>
                )}

                {/* Interactive Card: Harvest-Link */}
                {msg.topicKey === 'harvest' && (
                  <div className="chat-action-card project-action-card">
                    <div className="action-card-header">
                      <span>🌾 HARVEST-LINK LOGISTICS</span>
                      <span className="card-badge">OFFLINE-FIRST</span>
                    </div>
                    <div className="action-card-meta">
                      <span>Stack: React Native · Expo · SQLite sync · Fastify · WebSockets</span>
                    </div>
                    <a
                      href="https://github.com/JeremiahShadams/harvest-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="action-card-btn btn--ghost"
                    >
                      <span>View Harvest-Link Repository ↗</span>
                    </a>
                  </div>
                )}

                {/* Interactive Card: Citer */}
                {msg.topicKey === 'citer' && (
                  <div className="chat-action-card project-action-card">
                    <div className="action-card-header">
                      <span>⌘ CITER AST CODE INTELLIGENCE</span>
                      <span className="card-badge">TREE-SITTER</span>
                    </div>
                    <div className="action-card-meta">
                      <span>Stack: Python · LangGraph · pgvector · Tree-Sitter parsing</span>
                    </div>
                    <a
                      href="https://github.com/JeremiahShadams/Citer"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="action-card-btn btn--ghost"
                    >
                      <span>View Citer Repository ↗</span>
                    </a>
                  </div>
                )}
              </div>

              {/* Message Footer: Timestamp & Copy */}
              <div className="bubble-meta-row">
                <span className="bubble-timestamp">{msg.timestamp}</span>
                {msg.sender === 'bot' && (
                  <button
                    type="button"
                    className="bubble-copy-btn"
                    onClick={() => void handleCopy(msg.id, msg.text)}
                  >
                    {copiedTextId === msg.id ? 'Copied ✓' : 'Copy'}
                  </button>
                )}
              </div>

              {/* Dynamic Follow-Up Suggestion Chips */}
              {msg.suggestions && msg.suggestions.length > 0 && (
                <div className="followup-chips-row">
                  {msg.suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      className="followup-chip"
                      disabled={busy}
                      onClick={() => void submitQuestion(suggestion)}
                    >
                      <span>{suggestion}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Real-Time Thinking State */}
        {busy && (
          <div className="chat-bubble-row row--bot">
            <div className="msg-bot-avatar" aria-hidden="true">
              <span className="avatar-pulse-circle" />
            </div>
            <div className="msg-content-wrap">
              <div className="chat-bubble bubble--thinking">
                <div className="thinking-dots">
                  <span className="t-dot dot-1" />
                  <span className="t-dot dot-2" />
                  <span className="t-dot dot-3" />
                </div>
                <span className="thinking-label">Grounding against verified portfolio facts...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Composer Input Deck */}
      <div className="soj-chat-composer">
        <div className="composer-input-pill">
          <span className="composer-prefix" aria-hidden="true">
            ❯
          </span>
          <input
            ref={inputRef}
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about ContractGuard, Fresco, Harvest-Link, Citer..."
            maxLength={400}
            disabled={busy}
            autoComplete="off"
            aria-label="Ask S.O.J's AI a question"
          />
          {question.trim().length > 0 && (
            <button
              type="button"
              className="composer-clear-text"
              onClick={() => setQuestion('')}
              aria-label="Clear input"
            >
              ✕
            </button>
          )}
          <button
            type="button"
            className="composer-send-arrow"
            disabled={busy || !question.trim()}
            onClick={() => void submitQuestion(question)}
            aria-label="Send question"
          >
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" fill="currentColor" />
            </svg>
          </button>
        </div>

        <div className="composer-subhint">
          <span>Press <b>Enter ↵</b> to send</span>
          <span className="subhint-verified">100% Grounded in real production work</span>
        </div>
      </div>
    </div>
  )
}
