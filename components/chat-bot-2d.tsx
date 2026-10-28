'use client'

import { useEffect, useRef, useState } from 'react'

interface ChatBot2DProps {
  open: boolean
}

export default function ChatBot2D({ open }: ChatBot2DProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const nx = Math.max(-1, Math.min(1, (e.clientX - centerX) / (window.innerWidth * 0.5)))
      const ny = Math.max(-1, Math.min(1, (e.clientY - centerY) / (window.innerHeight * 0.5)))

      const maxTilt = prefersReducedMotion ? 8 : 16
      setTilt({
        x: -ny * maxTilt,
        y: nx * maxTilt,
      })
      setEyeOffset({
        x: nx * 3.5,
        y: ny * 2.5,
      })
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onPointerMove)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="chat-bot-2d"
      style={{
        transform: `perspective(400px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 112 112"
        width="100%"
        height="100%"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Contact shadow */}
        <ellipse cx="56" cy="104" rx="34" ry="5" fill="rgba(0,0,0,0.3)" filter="blur(3px)" />

        {/* Ears */}
        <rect x="10" y="44" width="8" height="24" rx="4" fill="#b8300f" />
        <rect x="94" y="44" width="8" height="24" rx="4" fill="#b8300f" />

        {/* Main Head (Laterite rounded box) */}
        <rect x="16" y="24" width="80" height="64" rx="18" fill="#e4491f" />
        <rect x="16" y="24" width="80" height="64" rx="18" stroke="#ff6b42" strokeWidth="1" strokeOpacity="0.4" />

        {/* Screen */}
        <rect x="23" y="32" width="66" height="48" rx="12" fill="#0b0a09" stroke="#1a2260" strokeWidth="1.5" />

        {/* Eyes (in inner tracking group) */}
        <g transform={`translate(${eyeOffset.x}, ${eyeOffset.y})`}>
          {open ? (
            <>
              {/* Happy/Attentive arches */}
              <path d="M38 52 Q44 45 50 52" stroke="#f2ede4" strokeWidth="3" strokeLinecap="round" />
              <path d="M62 52 Q68 45 74 52" stroke="#f2ede4" strokeWidth="3" strokeLinecap="round" />
            </>
          ) : (
            <>
              {/* Normal Glowing Ivory Eyes */}
              <ellipse cx="44" cy="52" rx="5" ry="7" fill="#f2ede4" />
              <ellipse cx="68" cy="52" rx="5" ry="7" fill="#f2ede4" />
              <ellipse cx="45" cy="50" rx="1.8" ry="2.5" fill="#ffffff" />
              <ellipse cx="69" cy="50" rx="1.8" ry="2.5" fill="#ffffff" />
            </>
          )}
        </g>

        {/* Smile */}
        <path
          d="M47 66 Q56 73 65 66"
          stroke="#e4491f"
          strokeWidth="2.8"
          strokeLinecap="round"
          fill="none"
        />

        {/* Crown on top (rakish -8° tilt) */}
        <g transform="translate(56, 24) rotate(-8) translate(-56, -24)">
          {/* Crown Band */}
          <path d="M40 22 L72 22 L70 16 L42 16 Z" fill="#e8b23c" />
          {/* Spikes */}
          <path d="M42 16 L45 7 L48 16" fill="#e8b23c" />
          <path d="M48 16 L51 5 L54 16" fill="#e8b23c" />
          <path d="M53 16 L56 3 L59 16" fill="#e8b23c" />
          <path d="M58 16 L61 5 L64 16" fill="#e8b23c" />
          <path d="M64 16 L67 7 L70 16" fill="#e8b23c" />
          {/* Tip balls */}
          <circle cx="45" cy="7" r="1.5" fill="#ffd700" />
          <circle cx="51" cy="5" r="1.8" fill="#ffd700" />
          <circle cx="56" cy="3" r="2.2" fill="#ffd700" />
          <circle cx="61" cy="5" r="1.8" fill="#ffd700" />
          <circle cx="67" cy="7" r="1.5" fill="#ffd700" />
          {/* Red Gem on front */}
          <circle cx="56" cy="19" r="2.2" fill="#e4491f" stroke="#ff7a50" strokeWidth="0.8" />
        </g>
      </svg>
    </div>
  )
}
