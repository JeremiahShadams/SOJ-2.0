'use client'

import { useState, type KeyboardEvent } from 'react'
import { answer } from '@/lib/data'

const PROMPTS = [
  'What is Fresco?',
  'What did he build at MIST?',
  'Current role?',
  'How do I reach him?',
]

type ChatTurn = { question: string; response: string }

export default function PortfolioChat() {
  const [question, setQuestion] = useState('')
  const [turns, setTurns] = useState<ChatTurn[]>([])

  const [busy, setBusy] = useState(false)
  const submitQuestion = async (value: string) => {
    const trimmed = value.trim().slice(0, 400)
    if (!trimmed || busy) return
    setQuestion('')
    setBusy(true)
    let response: string
    try {
      const reply = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ question: trimmed }) })
      if (!reply.ok) throw new Error('chat unavailable')
      response = String((await reply.json()).answer)
    } catch {
      response = answer(trimmed)
    }
    setTurns((current) => [...current, { question: trimmed, response }])
    setBusy(false)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return
    if (event.nativeEvent.isComposing || event.keyCode === 229) return
    event.preventDefault()
    submitQuestion(question)
  }

  return (
    <div className="portfolio-chat" aria-label="Ask about Jeremiah">
      <div className="chat-heading">
        <div>
          <p className="section-label">Ask my portfolio</p>
          <p className="chat-caption">Ask anything about my work. I answer only from my own CV and case studies.</p>
        </div>
        <span className="chat-method">Powered by Claude</span>
      </div>
      <div className="chat-transcript" aria-live="polite" aria-relevant="additions text">
        {turns.length === 0 ? (
          <div className="chat-prompts">
            {PROMPTS.map((prompt) => (
              <button className="chat-prompt" type="button" key={prompt} onClick={() => submitQuestion(prompt)}>
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
        />
        <button type="button" disabled={busy} onClick={() => submitQuestion(question)}>{busy ? '…' : 'Ask'}</button>
      </div>
    </div>
  )
}
