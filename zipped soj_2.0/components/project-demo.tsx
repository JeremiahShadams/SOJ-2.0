'use client'

import { useEffect, useRef, useState } from 'react'

export default function ProjectDemo({ base, name, playing }: { base: string | null; name: string; playing: boolean }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    if (playing) video.play().catch(() => setFailed(true))
    else { video.pause(); video.currentTime = 0 }
  }, [playing])

  if (!base || failed) return <div className="demo-empty"><span>{name}</span><small>Demo recording coming soon</small></div>
  return (
    <video ref={ref} className="demo-video" muted loop playsInline preload="none" poster={`${base}.jpg`} aria-label={`${name} demo`}>
      <source src={`${base}.webm`} type="video/webm" />
      <source src={`${base}.mp4`} type="video/mp4" />
    </video>
  )
}
