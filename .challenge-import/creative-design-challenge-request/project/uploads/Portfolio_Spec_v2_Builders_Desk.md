# SOJ — Design Engineer Portfolio (v2)
## "The Builder's Desk" — Complete Design, Motion & Content Spec

**What changed from v1:** Dark mode is out. The moody 3D orb is out. This version is built in the direction of your references — especially the Okpe Onoja Godwin site (paper background, ruler chrome, sticker labels, folder-tab projects, live cursor) and the Daniel Tobi site (warm cream, monospace restraint, real metrics). We borrow the *energy* of those, not the layouts — this has to read as yours, not a clone.

**Positioning:** Same as before — a design engineer who ships AI products end-to-end. But the vibe shifts from "night lab" to **daylight workshop**: warm, playful, tactile, confident. It should feel like walking up to the desk of someone who builds things for fun and happens to be dangerous at it.

**The one-line test:** A recruiter lands and smiles within 3 seconds — then finds a real metric within 10 and thinks "fun AND serious."

---

# 1. CONCEPT & ART DIRECTION

**Theme: "The Builder's Desk."**
The entire site is one giant sheet of engineering paper on a workbench. Ruler tick marks run along the top edge and track your scroll position in pixels — the page literally measures itself as you move through it. On this sheet live the artifacts of a builder: sticker badges, taped-down notes, folder tabs, handwritten annotations, screenshots pinned like prints. Everything looks placeable, peelable, physical.

**The signature element:** the **live measuring page + your cursor as a labeled presence**. Your cursor is a named tag (`YOU`) moving across the sheet, Figma-multiplayer style — and once or twice per visit, a second ghost cursor labeled `SOJ` drifts across the page, drags a sticker somewhere, drops a handwritten note ("thanks for scrolling this far 👀"), and leaves. That moment — the site's owner "showing up" — is the thing people screenshot and share.

**What we still refuse:** dark-mode-with-neon, glassmorphism cards, particle backgrounds, skill bars, "Hi, I'm X 👋" as the whole personality. The fun here is crafted, not template-cute.

---

# 2. COLOR SYSTEM

Paper first, stickers second. The page is warm and quiet; color arrives only as physical objects (tags, tabs, notes, underlines).

| Token | Hex | Usage |
|---|---|---|
| `--paper` | `#F7F4EC` | Base background. Warm engineering paper — not stark white, not the AI-cream cliché (no terracotta pairing anywhere near it). |
| `--grid-line` | `#E4DFD3` | 1px background grid lines + ruler ticks. Barely-there structure. |
| `--ink` | `#141414` | Text, borders, the name block. Near-black, warm. |
| `--marigold` | `#F2A93B` | Sticker/tab color 1. Warm yellow-orange — sun, tape, highlights. |
| `--leaf` | `#7FC8A9` | Sticker/tab color 2. Fresh green — "available" states, Fresco's project panel. |
| `--berry` | `#E8537A` | Sticker/tab color 3. Punchy pink-red — energy accents, one tab, error states. |
| `--sky` | `#6FB8E8` | Sticker/tab color 4. Bright blue — links-on-hover, one project panel. |
| `--stamp` | `#2F6B4F` | Deep green (from the Tobi reference). Serious moments only: metrics, the resume button, name accents. |

**Rules:**
- The four sticker colors appear **only on physical objects** — tags, tabs, panels, notes. Never as text color, never as gradients.
- Every colored object gets a `2px solid var(--ink)` border and a hard offset shadow (`4px 4px 0 var(--ink)`) — the flat "printed sticker" look. No blurred shadows anywhere.
- Project sections each own ONE panel color full-bleed (like your reference: sky → ink → marigold → berry), so scrolling the work section feels like flipping through colored folders.
- `--stamp` green is the "adult in the room": it marks every real number and every serious CTA. Play everywhere, but the metrics wear a suit.

---

# 3. TYPOGRAPHY

Four voices, each with a job:

**The Name — dotted display (custom moment):** `SOJ` / `JEREMIAH SHADAMORO` set in a chunky dotted/stencil display (options: *Rubik Doodle Shadow*, *Cherry Bomb One*, or hand-built SVG dot-matrix lettering — SVG preferred, because then each dot can animate, see §5.1). Used ONCE, in the hero, on an ink-black plate behind it (white letters on `--ink` block, like a printed label slapped on paper). Nowhere else — scarcity keeps it special.

**Headings — Archivo (Black / Expanded):** Section titles and project names. Chunky, friendly-brutal, extremely confident at large sizes. `clamp(2.5rem, 6vw, 4.5rem)`, tracking `-0.02em`.

**Body — Hanken Grotesk:** Paragraphs and descriptions. Round, warm, readable. 17–18px, line-height 1.65, max 62ch. Weight 400/600.

**Utility — Space Mono:** The instrument voice. Ruler numbers, live clock (`08:04:33 WAT`), labels (`PROJECT 01`, `AVAILABLE FOR NEW WORK`), status chips, metadata. 11–13px, uppercase, tracking `+0.06em`.

**Annotations — Shantell Sans (or Caveat):** The handwriting. Small phrases with squiggly underlines: *"my name is"*, *"explore my work!"*, *"this one paid rent"*. Max one per section — handwriting everywhere reads as noise; handwriting occasionally reads as a person.

**Type motion:**
- Headlines enter word-by-word: each word pops in with a tiny overshoot scale (0.9→1.03→1, 0.5s, spring) staggered 60ms — playful bounce, not the corporate mask-reveal from v1.
- Handwritten annotations **draw themselves**: SVG stroke animation, 0.8s, as if being written the moment you arrive.
- Squiggly underlines under annotations wobble subtly on a 3s loop (SVG path morph, 2px amplitude) — the page feels hand-touched.

---

# 4. LAYOUT & GLOBAL CHROME

- **The ruler:** fixed horizontal ruler under the nav with tick marks and pixel numbers (`0 — 100 — 200 …`) that **scroll with the page content**, so the visitor always knows "how far down the sheet" they are. On mobile it becomes a thin progress strip with the current px readout.
- **Background grid:** faint `--grid-line` graph squares (~64px) across the whole site. Sections never sit in cards — content sits ON the paper, separated by whitespace and full-bleed color panels.
- **Nav:** left — a small logo mark; center-left — `HOME / ABOUT / WORK` as mono labels where the active item gets a solid `--sky` highlight block (exactly like your reference); right — circular chips `EM / GH / LI` (email, GitHub, LinkedIn) plus a bordered `♥ CONTACT` button. Nav is sticky with a 1px ink bottom rule.
- **Cursor system (desktop only):** native cursor stays (accessibility), but a small `YOU` name-tag chip trails it at 0.12 lerp. Over draggable stickers it flips to `GRAB ✋`; over project panels, `PEEK →`. On touch: no cursor chrome at all.
- **Live data chrome:** top-center of hero shows the ticking clock `HH:MM:SS WAT` (Space Mono). Footer repeats it. Recruiters in the U.S. instantly grasp the timezone story — it quietly answers "can he work with our hours?" before they ask.
- **Grid rhythm:** 12-col, 1280px max, sections 140–200px apart desktop / 88px mobile.

---

# 5. PAGE STRUCTURE — SECTION BY SECTION

## 5.0 Entrance (no preloader)
No loading screen in this version — paper sites should feel instant. Instead, a 1.2s **desk setup choreography** on first paint: the grid fades in → ruler ticks stamp in left-to-right (30ms stagger, like a printer head passing) → stickers "toss" onto the page one by one (each flies in from a random edge with rotation, lands with a squash-and-settle bounce, 4 items, 120ms stagger) → name plate slides in → handwriting draws. Everything under 1.5s total. Session-stored; repeat visits skip straight to settled state.

## 5.1 Hero (100vh)
Recreating the *energy* of your reference, with your content:

- **Center:** handwritten *"my name is"* with wobbling underline → below it, the ink plate with **`JEREMIAH SHADAMORO`** in the dotted display. **Dot-matrix entrance:** the letters assemble dot-by-dot in 0.9s (each dot scales in with slight random delay — like a printer or LED board waking up). On hover, dots near the cursor swell 1.4× and tint `--marigold`, relaxing as you leave — the name is touchable.
- **Around the name, four sticker tags** (angled 3–8°, ink borders, hard shadows):
  - `--leaf` note top-left: *"Shipped Contract Guard — 91% retrieval accuracy"*
  - `--marigold` note top-right: *"Built Fresco — CV shelf-life estimator"*
  - `--marigold` ribbon lower-left: `AI + DESIGN ENGINEER`
  - `--berry` ribbon lower-right: `LAGOS · WAT`
  - **All four are draggable** (spring physics, slight inertia, rotate with fling velocity, constrained to hero bounds). They remember positions for the session. Hover = the "sticker peel" lift: `translateY(-3px)` + shadow grows to `6px 6px 0`.
- **Under the name:** pulsing `--leaf` dot + mono `AVAILABLE FOR U.S. REMOTE ROLES` — the availability line lives in the hero, not buried in the footer, because it's the single highest-value sentence for a recruiter.
- **Below:** the thesis in Hanken Grotesk, 28–34px, center: *"I design the interface **and** engineer the intelligence behind it — AI products shipped end-to-end."* The word **and** carries a hand-drawn `--berry` circle around it (SVG, draws on load). Inline doodle icons in the sentence (a tiny target, a tiny flower — like your reference) that spin once on hover.
- **Bottom:** handwritten *"explore my work!"* + an arrow that draws itself, then the first folder tab (§5.2) already peeking up from the fold — the next section physically invites the scroll.

## 5.2 Selected Work — "The Folders" (the heart)
Direct evolution of your reference's strongest idea: **each project is a full-bleed colored panel with an angled folder tab**, and the tabs **stack and stay stuck** at the top as you scroll deeper — by project 4, four colored tabs sit stacked under the ruler like an open filing drawer. Clicking any stuck tab scrolls you back to that project. This is navigation, memory, and delight in one mechanic.

**Order & panel colors:**
1. `--sky` — **Contract Guard** · eyebrow `AI · RAG · LEGAL TECH`
2. `--ink` (white text) — **Fresco** · `COMPUTER VISION · MOBILE`
3. `--marigold` — **PayTrace** · `FINTECH · PAYMENTS`
4. `--berry` — **Kortex** · `AGENTIC AI · CONTENT SYSTEMS` (tab reads `IN PROGRESS` with a pulsing dot if unshipped — building in public is on-brand for you)

**Each panel (≈90vh):**
- Left 40%: mono eyebrow with a bullet dot → project name in Archivo Black (5rem) → two sentences ending in **one real metric** set in `--stamp` on a small white chip: e.g. *"Retrieval accuracy `68% → 91%` across 50 contract types."* → `VIEW PROJECT ↗` mono link, underline draws on hover, arrow nudges 45°.
- Right 55%: the screenshot **taped down** — two `--marigold` tape strips across its corners, tiny mono `IMAGE.JPG` filename chip on the frame (that filing-cabinet honesty from your reference). Fresco gets a phone mockup with a looping screen capture.
- **Motions:** panel background wipes up from the fold as the tab enters (0.7s expo) · screenshot enters with a 2° tilt straightening to 0° · **hover on the screenshot = 3D paper-lift tilt** (perspective 800px, up to 4° toward cursor, tape corners stay pinned so it flexes like real taped paper) · text column parallaxes 0.9× scroll.
- **Panel transitions:** the next tab's angled shape slides up over the current panel before its color floods — the exact folder-over-folder overlap from your reference, and it's what makes the section feel physical.

## 5.3 Case Study Pages
- Same paper world. Hero = project name huge + the screenshot taped at a slight angle + mono metadata strip (`ROLE / STACK / TIMELINE / STATUS`) as sticker chips.
- Body: Problem → Approach → Result. Architecture diagrams drawn as **hand-sketch-style SVG** (slightly wobbly lines, self-drawing strokes on scroll) — matches the desk world and, honestly, reads more senior than sterile boxes.
- Result metrics: 2–3 big `--stamp` numbers that count up on entry (1s), each on a white chip with ink border.
- Footer: `NEXT PROJECT →` where the next folder tab literally slides in from the right edge for you to grab.

## 5.4 About — "The ID Card"
- Left: your photo as a **taped Polaroid**, 3° tilt, handwritten caption *"the operator"* beneath. Hover: it straightens and lifts.
- Right: 3 short paragraphs, Hanken Grotesk. Key line kept from v1: *"Final-year CS at FUTA. I've shipped AI products across contracts, food systems, and payments — I don't wait for permission to build."*
- **Sticker wall of capability areas** (not skill bars): `BACKEND SYSTEMS` (`--marigold`) · `AI / RAG PIPELINES` (`--leaf`) · `MOBILE APPS` (`--berry`) · `INTERFACES & MOTION` (`--sky`) — the exact colored-block move from your reference, each with the peel-lift hover, each draggable for fun.
- Below: experience notes as **two taped index cards** (Tecvison, Emperor Financial Consulting) with 2-line summaries — the yellow/green note style from your reference screens.

## 5.5 The Playground — "SCRAP PAPER"
A bordered dashed region (literally outlined like a cut-here zone), header: *"Where I break things on purpose."*
1. **Sticker bin:** a pile of extra stickers (emojis, tool logos, shapes) you can drag anywhere on the page — they persist for the session. A `RESET DESK` mono button tidies them with a spring animation.
2. **The doodle corner:** a small canvas where visitors can draw with an ink pen tool; `CLEAR` stamps it blank.
3. **The terminal (kept from v1 — it's too good to cut):** paper-styled this time, like a receipt printer. `help`, `work`, `contact`, and `sudo hire soj` → prints `PERMISSION GRANTED — opening mail…` and actually does.
4. **Konami code:** flips the paper to **blueprint mode** for the session (paper → deep blue, ink → white, grid brightens) — the inverse world, hidden where only the curious find it.

## 5.6 Contact — "LEAVE A NOTE"
- Full-viewport closer on plain paper. Giant Archivo line: **`LET'S BUILD SOMETHING REAL.`** — "REAL" circled by hand in `--berry` (draws on entry).
- Your email as a huge mono link on a `--marigold` sticker: hover = peel lift, click = copies, sticker briefly stamps `COPIED ✓` in `--stamp` with a little rotation kick.
- Row of chips: `RESUME ↓` (solid `--stamp`, the one serious button on the site) · `GITHUB ↗` · `LINKEDIN ↗` · `X ↗`.
- Availability line repeated with the pulsing `--leaf` dot.
- The `SOJ` ghost cursor makes its final appearance here: drifts in, drops a handwritten *"talk soon — S."* note near the email, drifts off.

## 5.7 Footer
Hairline ink rule. Left: `© 2026 NATIVE LABS — MADE BY HAND IN LAGOS`. Center (mono, dim): `NEXT.JS · GSAP · MATTER.JS · NO TEMPLATES`. Right: live `WAT` clock + `BACK TO TOP ↑` (1.2s eased scroll; the ruler numbers visibly spin back down to 0 — a tiny reward for noticing).

---

# 6. GLOBAL MOTION SYSTEM

1. **Personality of motion:** springy and physical, not sleek and cinematic. Default spring: stiffness 260 / damping 20 (a visible but quick overshoot). Non-spring tweens: `cubic-bezier(0.34, 1.56, 0.64, 1)` (back-out) for pops, `expo.out` for wipes.
2. **Durations:** micro 0.2–0.35s · reveals 0.5–0.8s · panel wipes 0.7s. This world is snappier than v1 — paper is light.
3. **Physicality rules:** everything colored behaves like an object — it lifts (translate + hard-shadow growth), never glows, never blurs. Rotation is everywhere but tiny (±1–8°). Nothing fades in from nothing if it can toss, stamp, or draw in instead.
4. **Scroll reveals** play once. Draggables and the tab-stack are live always.
5. **Smooth scroll:** Lenis at lerp 0.12 — slightly lighter than v1.
6. **Transform + opacity only;** physics simulations (stickers) capped at 60fps and paused off-screen.
7. **`prefers-reduced-motion`:** springs → simple 0.25s fades, draw-on animations render pre-drawn, stickers static (still draggable — dragging is user-initiated), ghost cursor disabled, smooth scroll off.
8. **Touch:** drag works natively; hover states become tap states; the tab-stack remains (it's the best mobile nav this design has).

---

# 7. COPY & VOICE

- Register: playful in the margins (handwriting, terminal, stickers), plain and sharp in the substance (project descriptions, about, case studies). The contrast IS the brand: the desk is fun; the work is serious.
- Section eyebrows (mono): `01 — THE WORK`, `02 — THE OPERATOR`, `03 — SCRAP PAPER`, `04 — LEAVE A NOTE`.
- Buttons say what they do: `COPY EMAIL`, `VIEW PROJECT`, `RESET DESK`, `RESUME ↓`.
- Every metric real and verifiable — `--stamp` green is a promise, never decoration.
- 404 page: a crumpled paper ball SVG, mono `PAGE NOT ON THIS DESK — 404`, button `BACK TO THE DESK`.

---

# 8. TECH STACK & BUDGETS

- **Next.js (App Router) + TypeScript.** Motion: **GSAP + ScrollTrigger** (tab stacking, panel wipes, scroll-linked ruler) + **Framer Motion** (springs, drag on stickers) + **Matter.js** only inside the playground. **Lenis** scroll. No Three.js in this version — the physicality replaces the 3D, and the page gets dramatically lighter for it.
- **Budgets:** LCP < 2.0s (achievable now — no WebGL), INP < 200ms, CLS < 0.1, JS < 220KB gzipped. Fonts subset via `next/font`. Images AVIF/WebP, lazy below fold.
- **A11y:** real cursor preserved; all draggables keyboard-operable or decorative-marked; focus rings = 2px `--stamp` offset outline; contrast AA on every panel (white text on `--sky`/`--marigold` checked — use ink text there instead, white only on `--ink` and `--berry`); tab-stack fully keyboard navigable.
- **OG image:** the name plate + two stickers on paper — looks great in a Slack unfurl.

---

# 9. BUILD ORDER (4 weeks, unchanged discipline)

1. **Week 1:** Paper world — grid, ruler, nav, type/color tokens, all sections static with real copy and real screenshots.
2. **Week 2:** The Folders — panel system, tab stacking, case study pages, metrics. (This section alone is 60% of the site's value.)
3. **Week 3:** Motion pass — entrance choreography, dot-matrix name, draggable stickers, hovers, handwriting draws.
4. **Week 4:** Playground, ghost cursor, terminal, konami blueprint mode, a11y + perf audit. Ship.

**Content first. Folders second. Toys last.** A recruiter who never touches a sticker should still leave convinced.
