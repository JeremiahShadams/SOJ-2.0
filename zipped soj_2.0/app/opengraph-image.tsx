import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Jeremiah Shadamoro, AI and full-stack engineer'

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 72, background: '#0e0d0b', color: '#f2ede4', position: 'relative' }}>
        <div style={{ position: 'absolute', right: -80, top: -80, width: 520, height: 520, borderRadius: 520, background: '#2b3a8c', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 380, height: 380, borderRadius: 380, border: '10px solid #d8d0c0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 220, height: 220, borderRadius: 220, border: '10px solid #e4491f', display: 'flex' }} />
          </div>
        </div>
        <div style={{ fontSize: 28, letterSpacing: 4, color: '#8c867a', textTransform: 'uppercase', display: 'flex' }}>AI &amp; Full-Stack Engineer</div>
        <div style={{ fontSize: 120, lineHeight: 1, marginTop: 16, display: 'flex' }}>Jeremiah Shadamoro</div>
      </div>
    ),
    size,
  )
}
