'use client'

import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { answer } from '@/lib/data'

const PROMPTS = [
  'What is Fresco?',
  'What did he build at MIST?',
  'Current role?',
  'How do I reach him?',
]

type ChatTurn = { question: string; response: string }

type ChatReply = { answer?: unknown }

export default function PortfolioChat() {
  const [question, setQuestion] = useState('')
  const [turns, setTurns] = useState<ChatTurn[]>([])
  const [busy, setBusy] = useState(false)
  const transcriptRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const transcript = transcriptRef.current
    if (transcript) transcript.scrollTop = transcript.scrollHeight
  }, [turns])

  const submitQuestion = async (value: string) => {
    const trimmed = value.trim().slice(0, 400)
    if (!trimmed || busy) return

    setQuestion('')
    setBusy(true)
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('chat-thinking'))
    }
    let response = answer(trimmed)

    try {
      const reply = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: trimmed }),
        cache: 'no-store',
      })
      const payload = await reply.json() as ChatReply
      if ((reply.ok || reply.status === 429 || reply.status === 503) && typeof payload.answer === 'string') {
        response = payload.answer
      }
    } catch {
      response = answer(trimmed)
    } finally {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('chat-answered'))
      }
    }

    setTurns((current) => [...current, { question: trimmed, response }])
    setBusy(false)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return
    if (event.nativeEvent.isComposing || event.keyCode === 229) return
    event.preventDefault()
    void submitQuestion(question)
  }

  return (
    <div className="portfolio-chat" aria-label="Ask about Jeremiah" aria-busy={busy}>
      <div className="chat-heading">
        <div>
          <p className="section-label">Ask my portfolio</p>
          <p className="chat-caption">Only answers from verified case studies and my CV. Sources attached.</p>
        </div>
        <span className="chat-method">Portfolio-grounded answers</span>
      </div>
      <div ref={transcriptRef} className="chat-transcript" aria-live="polite" aria-relevant="additions text">
        {turns.length === 0 ? (
          <div className="chat-prompts">
            {PROMPTS.map((prompt) => (
              <button className="chat-prompt" type="button" key={prompt} disabled={busy} onClick={() => void submitQuestion(prompt)}>
                {prompt}
              </button>
            ))}
          </div>
        ) : (
          turns.map((turn, index) => (
            <article className="chat-turn" key={`${turn.question}-${index}`}>
              <p className="chat-question">{turn.question}</p>
              <p className="chat-answer">{turn.response}</p>
            </article>
          ))
        )}
      </div>
      <div className="chat-composer" role="group" aria-label="Ask a question about Jeremiah’s work">
        <label className="sr-only" htmlFor="portfolio-question">Your question</label>
        <input
          id="portfolio-question"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="What did Jeremiah build at MIST?"
          autoComplete="off"
          maxLength={400}
          disabled={busy}
        />
        <button type="button" disabled={busy || !question.trim()} onClick={() => void submitQuestion(question)}>
          {busy ? '…' : 'Ask'}
        </button>
      </div>
    </div>
  )
}
