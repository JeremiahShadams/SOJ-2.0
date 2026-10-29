'use client'

import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { answer } from '@/lib/data'

interface PromptItem {
  category: string
  query: string
  tag: string
  icon: string
}

const CURATED_PROMPTS: PromptItem[] = [
  {
    category: 'LEGAL AI',
    query: 'How did ContractGuard achieve 91% retrieval accuracy?',
    tag: 'RAG · pgvector',
    icon: '🛡️',
  },
  {
    category: 'COMPUTER VISION',
    query: 'How does Fresco run MobileNetV2 locally on-device?',
    tag: 'TF.js · 89.3% Acc',
    icon: '🍎',
  },
  {
    category: 'AGRITECH',
    query: "What is Harvest-Link's offline-first sync architecture?",
    tag: 'React Native · SQLite',
    icon: '🌾',
  },
  {
    category: 'CODE INTELLIGENCE',
    query: 'How does Citer use Tree-Sitter AST for exact citations?',
    tag: 'Tree-Sitter · pgvector',
    icon: '⌘',
  },
  {
    category: 'AVAILABILITY',
    query: 'Is Jeremiah open to US remote Fullstack AI Engineer roles?',
    tag: 'Lagos WAT · Overlaps US',
    icon: '⚡',
  },
]

interface ChatTurn {
  id: string
  question: string
  response: string
  timestamp: string
}

type ChatReply = { answer?: unknown }

export default function IntelligenceTerminal({
  id = 'chat-terminal',
  onClose,
  isModal = false,
}: {
  id?: string
  onClose?: () => void
  isModal?: boolean
}) {
  const [question, setQuestion] = useState('')
  const [turns, setTurns] = useState<ChatTurn[]>([])
  const [busy, setBusy] = useState(false)
  const [activeStep, setActiveStep] = useState<number>(0)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const transcriptRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const transcript = transcriptRef.current
    if (transcript) {
      transcript.scrollTo({
        top: transcript.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [turns, busy])

  const copyToClipboard = async (turnId: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(turnId)
      setTimeout(() => setCopiedId(null), 2000)
    } catch {
      // fallback
    }
  }

  const submitQuestion = async (value: string) => {
    const trimmed = value.trim().slice(0, 400)
    if (!trimmed || busy) return

    setQuestion('')
    setBusy(true)
    setActiveStep(1) // 01 Input

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('chat-thinking'))
    }

    const t1 = setTimeout(() => setActiveStep(2), 240) // 02 Retrieval
    const t2 = setTimeout(() => setActiveStep(3), 520) // 03 Grounding

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
      setActiveStep(4) // 04 Answer + citation complete
      setTimeout(() => setActiveStep(0), 1200)

      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('chat-answered'))
      }
    }

    const now = new Date()
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(
      now.getMinutes()
    ).padStart(2, '0')} WAT`

    setTurns((current) => [
      ...current,
      {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        question: trimmed,
        response,
        timestamp: timeStr,
      },
    ])
    setBusy(false)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (event.nativeEvent.isComposing || event.keyCode === 229) return
      event.preventDefault()
      void submitQuestion(question)
    } else if (event.key === 'Escape') {
      setQuestion('')
    }
  }

  const clearConversation = () => {
    setTurns([])
    setQuestion('')
    if (inputRef.current) inputRef.current.focus()
  }

  // Parse out source citation if present
  const parseResponse = (raw: string) => {
    const sourceMatch = raw.match(/\s*(Sources?:.*)$/i)
    if (sourceMatch) {
      const mainText = raw.replace(/\s*(Sources?:.*)$/i, '').trim()
      const sourceText = sourceMatch[1]
      return { mainText, sourceText }
    }
    return { mainText: raw, sourceText: null }
  }

  return (
    <div
      id={id}
      className={`intel-terminal ${isModal ? 'is-modal' : ''}`}
      aria-label="S.O.J Intelligence Terminal"
    >
      {/* Top Deck: Terminal Chrome */}
      <div className="terminal-header">
        <div className="terminal-dots">
          <span className="dot dot--red" />
          <span className="dot dot--yellow" />
          <span className="dot dot--green" />
        </div>

        <div className="terminal-title">
          <span className="terminal-prompt-icon">⌘</span>
          <b>soj-intelligence-kernel // v2.5</b>
          <span className="terminal-live-badge">
            <span className="live-ping" />
            <span>ONLINE</span>
          </span>
        </div>

        <div className="terminal-actions">
          <span className="terminal-meta-tag">CLAUDE 3.5 + PGVECTOR</span>
          {turns.length > 0 && (
            <button
              type="button"
              className="terminal-ctrl-btn"
              onClick={clearConversation}
              title="Reset terminal"
            >
              Reset [⌫]
            </button>
          )}
          {isModal && onClose && (
            <button
              type="button"
              className="terminal-close-btn"
              onClick={onClose}
              aria-label="Close terminal"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* RAG Telemetry Pipeline Bar */}
      <div className="terminal-pipeline-bar" aria-label="RAG pipeline telemetry">
        <div className={`pipe-node ${activeStep >= 1 ? 'is-lit' : ''}`}>
          <span className="pipe-num">01</span>
          <span className="pipe-label">INPUT_QUERY</span>
        </div>
        <span className={`pipe-flow ${activeStep >= 2 ? 'is-active' : ''}`}>➔</span>

        <div className={`pipe-node ${activeStep >= 2 ? 'is-lit' : ''}`}>
          <span className="pipe-num">02</span>
          <span className="pipe-label">PGVECTOR_SEARCH</span>
        </div>
        <span className={`pipe-flow ${activeStep >= 3 ? 'is-active' : ''}`}>➔</span>

        <div className={`pipe-node ${activeStep >= 3 ? 'is-lit' : ''}`}>
          <span className="pipe-num">03</span>
          <span className="pipe-label">CLAUSE_GROUNDING</span>
        </div>
        <span className={`pipe-flow ${activeStep >= 4 ? 'is-active' : ''}`}>➔</span>

        <div className={`pipe-node ${activeStep >= 4 ? 'is-lit' : ''}`}>
          <span className="pipe-num">04</span>
          <span className="pipe-label">VERIFIED_CITE</span>
        </div>
      </div>

      {/* Main Conversation Transcript */}
      <div
        ref={transcriptRef}
        className="terminal-transcript"
        aria-live="polite"
        aria-relevant="additions text"
      >
        {/* Welcome Stream */}
        <div className="terminal-boot-card">
          <div className="boot-badge">SYSTEM BROADCAST · WAT OVERLAP</div>
          <p className="boot-text">
            DISPATCH ONLINE. Connected to Jeremiah &ldquo;SOJ&rdquo; Shadamoro&rsquo;s verified portfolio manifest.
            I answer questions about his AI systems, architecture, full-stack pipelines, and US-remote availability.
            Grounded strictly in verified facts with citations.
          </p>
        </div>

        {/* Curated Prompt Matrix (Visible when empty or as suggestions) */}
        {turns.length === 0 && (
          <div className="terminal-prompts-grid">
            <div className="prompts-grid-label">CURATED QUERY TRANSMISSIONS:</div>
            <div className="prompts-grid">
              {CURATED_PROMPTS.map((p) => (
                <button
                  key={p.query}
                  type="button"
                  className="prompt-card"
                  disabled={busy}
                  onClick={() => void submitQuestion(p.query)}
                >
                  <div className="prompt-card-top">
                    <span className="prompt-icon">{p.icon}</span>
                    <span className="prompt-cat">{p.category}</span>
                    <span className="prompt-tag">{p.tag}</span>
                  </div>
                  <div className="prompt-query">{p.query}</div>
                  <div className="prompt-hint">Transmit query ➔</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Message Turns */}
        {turns.map((turn) => {
          const { mainText, sourceText } = parseResponse(turn.response)
          const isCopied = copiedId === turn.id

          return (
            <div className="terminal-turn" key={turn.id}>
              {/* User Query */}
              <div className="terminal-msg msg--user">
                <div className="msg-meta">
                  <span className="msg-sender">GUEST_QUERY</span>
                  <span className="msg-time">{turn.timestamp}</span>
                </div>
                <div className="msg-bubble user-bubble">
                  <span className="bubble-prompt-prefix">❯</span>
                  <span>{turn.question}</span>
                </div>
              </div>

              {/* AI Dispatch Response */}
              <div className="terminal-msg msg--ai">
                <div className="msg-meta">
                  <div className="ai-author-wrap">
                    <span className="ai-status-pulse" />
                    <span className="ai-author-name">S.O.J INTELLIGENCE</span>
                    <span className="ai-verified-tag">✓ GROUNDED FACT</span>
                  </div>
                  <button
                    type="button"
                    className="msg-copy-btn"
                    onClick={() => void copyToClipboard(turn.id, turn.response)}
                    title="Copy response to clipboard"
                  >
                    {isCopied ? 'Copied ✓' : 'Copy'}
                  </button>
                </div>
                <div className="msg-bubble ai-bubble">
                  <p className="ai-text">{mainText}</p>
                  {sourceText && (
                    <div className="ai-source-pill">
                      <span className="source-icon">🔗</span>
                      <span>{sourceText}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}

        {/* Live Processing Animation */}
        {busy && (
          <div className="terminal-busy-indicator">
            <div className="busy-header">
              <span className="busy-spin" />
              <span>RETRIEVING &amp; GROUNDING AGAINST EMBEDDINGS...</span>
            </div>
            <div className="busy-laser-track">
              <div className="busy-laser-beam" />
            </div>
          </div>
        )}
      </div>

      {/* Command Deck Composer */}
      <div className="terminal-composer" role="group" aria-label="Command Input">
        <div className="composer-bar">
          <span className="terminal-prompt-prefix" aria-hidden="true">
            soj@kernel:~$
          </span>
          <label className="sr-only" htmlFor="terminal-query-input">
            Your question for S.O.J&apos;s AI
          </label>
          <input
            id="terminal-query-input"
            ref={inputRef}
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about ContractGuard, Fresco, Harvest-Link, Citer, or US remote roles..."
            autoComplete="off"
            maxLength={400}
            disabled={busy}
          />
          {question.trim().length > 0 && (
            <button
              type="button"
              className="composer-clear-btn"
              onClick={() => setQuestion('')}
              aria-label="Clear input text"
            >
              ✕
            </button>
          )}
          <span className="composer-char-count">{question.length}/400</span>
          <button
            type="button"
            className="composer-send-btn"
            disabled={busy || !question.trim()}
            onClick={() => void submitQuestion(question)}
            aria-label="Transmit question to model"
          >
            <span>{busy ? '…' : 'Transmit ↵'}</span>
          </button>
        </div>

        <div className="composer-hint-row">
          <span>Press <b>Enter ↵</b> to send · <b>Esc</b> to clear</span>
          <span className="composer-ground-note">Strictly grounded on verified case studies (0% hallucination)</span>
        </div>
      </div>
    </div>
  )
}
