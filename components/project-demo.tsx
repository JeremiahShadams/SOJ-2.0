'use client'

import { useEffect, useRef, useState } from 'react'

interface ProjectDemoProps {
  base: string | null
  name: string
  playing?: boolean
  format?: 'web' | 'mobile'
  projectKey?: 'cg' | 'fresco' | 'harvest-link' | 'citer' | string
  liveUrl?: string | null
}

export default function ProjectDemo({
  base,
  name,
  playing = true,
  format = 'mobile',
  projectKey,
  liveUrl,
}: ProjectDemoProps) {
  const ref = useRef<HTMLVideoElement>(null)
  const [failed, setFailed] = useState(false)

  const resolvedKey = (
    projectKey ||
    (name.toLowerCase().includes('contract')
      ? 'cg'
      : name.toLowerCase().includes('fresco')
        ? 'fresco'
        : name.toLowerCase().includes('harvest')
          ? 'harvest-link'
          : 'citer')
  ).toLowerCase()

  useEffect(() => {
    const video = ref.current
    if (!video) return
    if (playing) video.play().catch(() => setFailed(true))
    else {
      video.pause()
      video.currentTime = 0
    }
  }, [playing])

  if (!base || failed) {
    if (resolvedKey === 'cg') {
      return (
        <div className="preview-screen is-web preview-cg">
          <div className="browser-chrome">
            <div className="browser-dots">
              <span className="dot dot--red" />
              <span className="dot dot--yellow" />
              <span className="dot dot--green" />
            </div>
            <div className="browser-url">
              <span className="browser-lock">🔒</span>
              <span>cg-ai.onrender.com/review</span>
            </div>
            <div className="browser-badge">RAG AI</div>
          </div>

          <div className="cg-topbar">
            <div className="cg-brand">
              <span className="cg-shield">🛡️</span>
              <span className="cg-title">ContractGuard</span>
              <span className="cg-doc-tag">MSA_Acme_Vendor_v3.pdf</span>
            </div>
            <div className="cg-model-pill">
              <span className="cg-pulse" />
              <span>Claude 3.5 · pgvector</span>
            </div>
          </div>

          <div className="cg-body">
            <div className="cg-doc-pane">
              <div className="cg-pane-header">DOCUMENT STREAM · §14 CLAUSES</div>
              <div className="cg-clause-box">
                <div className="cg-clause-title">§14.3 Indemnification &amp; Exposure</div>
                <p className="cg-clause-text">
                  Supplier shall defend, indemnify, and hold harmless Customer against all third-party claims, liabilities, and damages <mark className="cg-mark">without limitation of liability</mark>...
                </p>
                <div className="cg-alert-tag">
                  <span>⚠️ Uncapped Liability Risk</span>
                  <span className="cg-score">Score: 94/100</span>
                </div>
              </div>
              <div className="cg-clause-ghost">§14.4 Governing Law &amp; Arbitration...</div>
            </div>

            <div className="cg-ai-pane">
              <div className="cg-pane-header">GROUNDED CITATION</div>
              <div className="cg-query-box">
                <span className="cg-query-q">Q:</span>
                <span>Check liability cap &amp; mutual indemnity</span>
              </div>
              <div className="cg-answer-box">
                <div className="cg-answer-header">
                  <span className="cg-ai-icon">✦</span>
                  <span>Analysis (91% confidence)</span>
                </div>
                <p className="cg-answer-text">
                  Clause 14.3 eliminates standard liability caps for direct damages. Exposure is uncapped.
                </p>
                <div className="cg-citation-pill">
                  <span>🔗 Cited from §14.3 (Page 18)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    if (resolvedKey === 'citer') {
      return (
        <div className="preview-screen is-web preview-citer">
          <div className="browser-chrome">
            <div className="browser-dots">
              <span className="dot dot--red" />
              <span className="dot dot--yellow" />
              <span className="dot dot--green" />
            </div>
            <div className="browser-url">
              <span className="browser-lock">🔒</span>
              <span>citer.dev/repo/search</span>
            </div>
            <div className="browser-badge">AST SEARCH</div>
          </div>

          <div className="citer-topbar">
            <div className="citer-brand">
              <span className="citer-icon">⌘</span>
              <span className="citer-title">Citer Engine</span>
              <span className="citer-repo-tag">Native-Labs / core-api</span>
            </div>
            <div className="citer-search-box">
              <span className="citer-search-icon">🔍</span>
              <span>Where is session token verified?</span>
            </div>
          </div>

          <div className="citer-body">
            <div className="citer-tree-pane">
              <div className="citer-tree-title">INDEXED (14.2k)</div>
              <div className="citer-tree-item is-folder">📁 src/middleware/</div>
              <div className="citer-tree-item is-file is-active">
                <span className="citer-file-dot" />
                <span>auth.ts</span>
                <span className="citer-ast-badge">AST</span>
              </div>
              <div className="citer-tree-item is-file">📄 session.ts</div>
              <div className="citer-tree-item is-file">📄 limiter.ts</div>
              <div className="citer-tree-item is-folder">📁 src/routes/</div>
            </div>

            <div className="citer-code-pane">
              <div className="citer-code-header">
                <span className="citer-tab-name">src/middleware/auth.ts</span>
                <span className="citer-lang-tag">TypeScript</span>
              </div>
              <div className="citer-code-lines">
                <div className="code-line"><span className="ln">41</span><span className="c-kw">export async function</span> <span className="c-fn">verifySession</span>(req: Request) &#123;</div>
                <div className="code-line highlight"><span className="ln">42</span>  <span className="c-kw">const</span> token = req.headers.get(<span className="c-str">&quot;authorization&quot;</span>);</div>
                <div className="code-line highlight"><span className="ln">43</span>  <span className="c-kw">if</span> (!token) <span className="c-kw">throw new</span> <span className="c-cls">AuthError</span>(<span className="c-str">&quot;UNAUTHORIZED&quot;</span>);</div>
                <div className="code-line"><span className="ln">44</span>  <span className="c-kw">return await</span> jwt.<span className="c-fn">verify</span>(token, SECRET);</div>
                <div className="code-line"><span className="ln">45</span>&#125;</div>
              </div>
              <div className="citer-citation-bar">
                <span className="citer-check">✓</span>
                <span>Exact Match: auth.ts#L41-L45 · Tree-Sitter</span>
              </div>
            </div>
          </div>
        </div>
      )
    }

    if (resolvedKey === 'fresco') {
      return (
        <div className="preview-screen is-mobile preview-fresco">
          <div className="phone-chrome">
            <span className="phone-time">9:41</span>
            <span className="phone-island" />
            <div className="phone-indicators">
              <span className="phone-signal">●●●○</span>
              <span className="phone-battery">
                <i style={{ width: '84%' }} />
              </span>
            </div>
          </div>

          <div className="fresco-viewfinder">
            <div className="fresco-hud-top">
              <div className="fresco-mode-badge">
                <span className="fresco-rec-dot" />
                <span>CV SCANNER · 60FPS</span>
              </div>
              <span className="fresco-chip">TF.js Local</span>
            </div>

            <div className="fresco-reticle-area">
              <div className="fresco-reticle">
                <span className="reticle-corner c-tl" />
                <span className="reticle-corner c-tr" />
                <span className="reticle-corner c-bl" />
                <span className="reticle-corner c-br" />
                <div className="fresco-scanline" />

                <div className="fresco-produce-art">
                  <svg viewBox="0 0 100 100" className="produce-svg">
                    <circle cx="50" cy="56" r="33" fill="#e4491f" />
                    <circle cx="43" cy="48" r="15" fill="#ff673b" opacity="0.65" />
                    <path d="M50 22 C48 14 42 10 38 12 C44 16 46 22 48 24 Z" fill="#22c55e" />
                    <path d="M50 22 C52 14 58 10 62 12 C56 16 54 22 52 24 Z" fill="#22c55e" />
                    <path d="M50 16 C50 8 46 4 44 2" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  </svg>
                </div>

                <div className="fresco-reticle-label">
                  <span>Roma Tomato</span>
                  <small>96.4% match</small>
                </div>
              </div>
            </div>

            <div className="fresco-card">
              <div className="fresco-card-header">
                <div className="fresco-fresh-pill">
                  <span className="fresco-score-dot" />
                  <span>8.8 / 10 · FRESH</span>
                </div>
                <span className="fresco-days">4-5 days left</span>
              </div>
              <div className="fresco-advice">
                <span>Storage:</span> Keep dry at 12°C in aerated tray.
              </div>
              <div className="fresco-btn">
                <span>Log to Pantry Inventory →</span>
              </div>
            </div>
          </div>

          <div className="phone-home-indicator" />
        </div>
      )
    }

    // Default / harvest-link
    return (
      <div className="preview-screen is-mobile preview-harvest">
        <div className="phone-chrome">
          <span className="phone-time">9:41</span>
          <span className="phone-island" />
          <div className="phone-indicators">
            <span className="phone-signal">●●●●</span>
            <span className="phone-battery">
              <i style={{ width: '76%' }} />
            </span>
          </div>
        </div>

        <div className="harvest-screen">
          <div className="harvest-topbar">
            <div className="harvest-brand">
              <span className="harvest-icon">🌾</span>
              <div>
                <div className="harvest-name">Harvest-Link</div>
                <div className="harvest-region">Ogun / Lagos Corridor</div>
              </div>
            </div>
            <div className="harvest-sync-pill">
              <span className="harvest-sync-dot" />
              <span>Synced</span>
            </div>
          </div>

          <div className="harvest-lot-card">
            <div className="harvest-lot-top">
              <span className="harvest-badge">NEW HARVEST LOT</span>
              <span className="harvest-price">₦1,450 / 50kg</span>
            </div>
            <div className="harvest-produce-name">Yellow Maize &amp; Sweet Cassava</div>
            <div className="harvest-farmer-row">
              <span className="harvest-farmer-avatar">🚜</span>
              <div className="harvest-farmer-info">
                <div className="harvest-farmer-name">Adebayo Co-op</div>
                <div className="harvest-farmer-meta">Verified · Abeokuta Cluster</div>
              </div>
              <span className="harvest-volume">3.2T</span>
            </div>
          </div>

          <div className="harvest-transit-card">
            <div className="harvest-transit-header">
              <span>TRANSIT DISPATCH</span>
              <span className="harvest-transit-eta">ETA 45m</span>
            </div>
            <div className="harvest-route-visual">
              <span className="route-node node--start">Farm Gate</span>
              <div className="route-line">
                <span className="route-truck">🚚</span>
              </div>
              <span className="route-node node--end">Mile 12</span>
            </div>
            <div className="harvest-transit-status">
              <span>Carrier Matched · Fast Direct Dispatch</span>
            </div>
          </div>

          <div className="harvest-action-btn">
            <span>Accept Transit Order ↗</span>
          </div>
        </div>

        <div className="phone-home-indicator" />
      </div>
    )
  }

  return (
    <video
      ref={ref}
      className={`demo-video ${format === 'web' ? 'is-web' : 'is-mobile'}`}
      muted
      loop
      playsInline
      preload="none"
      poster={`${base}.jpg`}
      aria-label={`${name} demo`}
    >
      <source src={`${base}.webm`} type="video/webm" />
      <source src={`${base}.mp4`} type="video/mp4" />
    </video>
  )
}
