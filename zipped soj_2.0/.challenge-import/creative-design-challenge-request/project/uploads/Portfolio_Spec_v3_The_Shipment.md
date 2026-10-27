# SOJ — Design Engineer Portfolio (v3)
## "THE SHIPMENT" — An Original Concept. Complete Design, Motion & Content Spec.

**Why v2 failed:** it borrowed Okpe's *mechanics* (ruler chrome, folder tabs, sticker tags, named cursor), not just his energy. Mechanics are identity. So v3 starts from a mechanic that doesn't exist on his site or anyone else's in this space.

**The core idea — one sentence:**
Your whole brand is *"I ship AI products."* So the portfolio takes that literally: **the visitor follows one physical package traveling through a fulfillment line, and their scroll is what moves it.** Every section is a station on the route. Every project stamps the box. At the end, the package arrives at the recruiter's door — and they literally **sign for the delivery** to contact you.

One continuous object. One continuous journey. One unbroken metaphor from first pixel to last. Nobody else has this.

**The one-line test:** a recruiter scrolls, realizes *they* are pushing the package down the line, laughs, keeps scrolling to see where it ends up — and by the time they sign for it, they've read every project.

---

# 1. CONCEPT & WORLD

**Theme: a stylized fulfillment line / cargo route.**
Not a gritty warehouse — a graphic, flat-illustrated, precision logistics world: conveyor rollers, stamp arms, scan gates, waybills, customs stamps, barcodes. The tone is *industrial-playful*: everything is drawn crisp and geometric, then brought alive with physical motion.

**The protagonist:** THE BOX. A kraft cardboard package with `NATIVE LABS` stenciled on its side. It enters at the hero as a fresh, blank box. It travels the entire page along a drawn conveyor route — around curves, down drops, through scan gates. At each project station it receives a stamped mark bearing that project's real metric. By the contact section it's covered in stamps and stickers — a box that visibly carries the proof of everything you've shipped. The box **is** the portfolio.

**The scroll contract:** scrolling is the conveyor motor. Scroll = the line runs (rollers spin, the box advances along the path, machinery articulates). Stop = the line idles (rollers drift to a stop, the box rocks and settles, a soft warehouse hum of subtle ambient motion). Scroll velocity maps to line speed — flick fast and the box careens around a curve with squash-and-stretch. The visitor isn't watching an animation; **they are operating the machine.** That's the difference between decoration and a mechanic.

---

# 2. COLOR SYSTEM — "Cargo"

Nothing pastel, nothing cream-boutique, nothing dark-neon. This palette comes from the logistics world itself:

| Token | Hex | Usage |
|---|---|---|
| `--concrete` | `#EDEAE3` | Base background — warm concrete floor. Light, but industrial, not stationery. |
| `--kraft` | `#C9A876` | The box, cardboard surfaces, kraft-tape strips. |
| `--kraft-shade` | `#A98B5B` | Box side panels, cardboard shadow faces. |
| `--ink` | `#1A1A1A` | Text, stencils, barcodes, machinery linework. |
| `--safety` | `#FF4D00` | THE accent. Safety orange — hazard stripes, PRIORITY stamps, active states, the signed signature. Loud, industrial, unmistakable. |
| `--cargo-blue` | `#1F4FD8` | Secondary: customs-stamp blue. Links, one stamp per project, the tracking HUD. |
| `--pass` | `#1E7A46` | "Inspection passed" green — reserved exclusively for metrics and the final DELIVERED state. |

**Rules:**
- `--safety` orange is rationed exactly like amber was in v1: hazard chevron strips at section boundaries, stamps, and nothing else. Its scarcity is its volume.
- Machinery is pure ink linework on concrete (2px strokes) — the color lives on the box, the stamps, and the safety markings. The world is monochrome; the cargo is colorful. That inversion is the visual signature.
- Depth via flat offset shadows and isometric-ish side faces on the box — no blurs, no gradients except a single soft floor shadow under the box that stretches with its speed.

---

# 3. TYPOGRAPHY — "Waybill"

**Stencil display — Allerta Stencil (or custom-cut stencil of Archivo Black):** headlines, the name, station titles. Stencil type IS cargo type — spray-stenciled onto crates for a century. `clamp(3rem, 9vw, 8rem)` for the name. This choice alone separates the site from every portfolio using a fashionable grotesk.

**Body — Archivo (400/600):** paragraphs, project descriptions. Sturdy, neutral, engineered — the same family bolded for subheads keeps the system tight.

**Data — Space Mono:** waybill fields, tracking HUD, timestamps, dimensions, barcode labels. The voice of logistics paperwork: `WT: 74KG · ORIGIN: LAGOS, NG · CONTENTS: 1× DESIGN ENGINEER`.

**Stamps — the fourth voice:** rubber-stamp lockups (slightly rotated, distressed-edge, double-ring borders) built as SVG components: `QUALITY INSPECTED`, `SHIPPED ✓`, `PRIORITY`, `FRAGILE: HANDLE WITH AMBITION`. Stamps are how emphasis works on this site — where other portfolios bold a word, this one stamps it.

**Type motion:**
- Stencil headlines arrive by **spray reveal**: a masked wipe with a rough spray-texture edge sweeps across, 0.6s, as if just stenciled.
- Stamps SLAM: scale 1.6 → 1 with rotation settle and 2px screen-shake, plus an ink-splat particle (4 tiny flecks). Duration 0.35s. It should feel percussive.
- Mono data types itself, 15ms/char, like a dot-matrix waybill printer.

---

# 4. GLOBAL CHROME — "The Tracking System"

Instead of a scroll bar or ruler, the site has a **live tracking HUD** (fixed, bottom-left, mono, `--cargo-blue` accents):

```
TRACKING № NL-2026-SOJ
STATUS: IN TRANSIT ▸ 34%
NEXT STOP: STATION 02 — FRESCO
```

Every field updates in real time with scroll. Status flips through real logistics states as you progress: `ORDER PLACED → PICKED → IN TRANSIT → CUSTOMS (about section) → OUT FOR DELIVERY → DELIVERED`. This is scroll progress reimagined inside the metaphor — informative AND funny.

- **Nav (top):** minimal ink bar — `SOJ / NATIVE LABS` stencil mark left; `MANIFEST` (work) · `CUSTOMS` (about) · `DEPOT` (playground) · `DELIVERY` (contact) as mono labels right. Hover: a tiny `--safety` chevron slides in before the word. Section names inside the metaphor, but a recruiter can't get lost — hover reveals plain-English tooltips (`MANIFEST — my work`).
- **Section boundaries:** thin hazard-stripe tape (ink/`--safety` diagonal, 8px) instead of dividers.
- **The route line:** a 3px ink conveyor path (rollers drawn as small circles beneath it) that runs continuously down the entire page, curving left and right around content — the box rides it the whole way. On mobile the route simplifies to a mostly-vertical line hugging one edge.
- **Cursor:** native cursor kept. Interactive elements get a `--safety` outline offset on hover — like items flagged by a scanner.

---

# 5. PAGE STRUCTURE — STATION BY STATION

## 5.0 Entrance — "ORDER PLACED" (1.5s, first visit)
The concrete floor and route line are already there. A dock door at top of viewport rolls up (clip-path, 0.5s) — the blank box drops onto the line with a bounce (squash 1.15x, settle), the tracking HUD types itself in, a `--cargo-blue` stamp slams onto the corner of the screen: `ORDER PLACED — 10 JUL 2026`. Then the line waits for you. A mono hint pulses gently: `SCROLL TO START THE LINE ▼`. Session-stored, skipped on repeat visits.

## 5.1 Station 00 — The Label (Hero, ~120vh)
The box rolls to center and stops under a **labeling machine** (drawn ink linework, articulated arm above the line). As the visitor makes their first scroll:

1. The arm descends and applies a huge shipping label — and the label IS the hero content, printed line by line (dot-matrix type-on):
   - `SHIP FROM: LAGOS, NIGERIA (WAT)`
   - `CONTENTS: JEREMIAH "SOJ" SHADAMORO` — the name breaks out of the label in giant stencil, spray-revealed, overlapping the label edge (the one grid-break of the page)
   - `DECLARED VALUE: DESIGN ENGINEER — AI PRODUCTS, END-TO-END`
   - `HANDLING: ● AVAILABLE FOR U.S. REMOTE ROLES` (pulsing `--pass` dot — the recruiter's answer, above the fold, inside the metaphor)
2. A scanner gate flashes a `--cargo-blue` laser line across the box — beep — the barcode on the label renders. **The barcode is real** (Code 128 encoding your portfolio URL). Anyone who points a phone at the screen and scans it gets the site. Recruiters demo this to colleagues. Mad detail, ~40 lines of code.
3. `FRAGILE: HANDLE WITH AMBITION` stamp slams diagonally.

Below the label machine, the route curves right and dips off-screen — the box rolls away as you scroll, and you follow it down.

## 5.2 Stations 01–04 — The Manifest (Projects)
Four stations, one per project, each ~100vh. **The layout physically alternates with the route**: the conveyor S-curves down the page, so stations sit left, right, left, right — the zig-zag *is* the layout system (no card grid anywhere).

**Station anatomy (e.g., Station 01 — CONTRACT GUARD):**
- The box rolls in and stops (scroll-scrubbed — the visitor controls exactly when).
- Overhead, a **station gantry** (ink linework) holds the project display like a mounted inspection screen: the project screenshot in a bolted frame (visible corner bolts, not tape — this world is machined).
- Left of the gantry, the **waybill panel** (white sheet, ink border, perforated edge):
  - `STATION 01 / QUALITY CONTROL` (mono eyebrow)
  - **CONTRACT GUARD** (stencil, 4rem)
  - `CLASS: AI · RAG · LEGAL-TECH` (mono chips)
  - Two sentences of plain Archivo, ending in the metric — and here's the section's showpiece:
- **THE STAMP MOMENT:** as the box sits at the station, a stamp arm articulates down and SLAMS a stamp onto the box itself: a circular mark reading `RETRIEVAL 68% → 91% · INSPECTED`. Screen-shake, ink flecks, the box rocks. **The metric is now physically on the box** and travels with it for the rest of the page. Four projects = four stamps accumulating on the cardboard. The box becomes a scrolling résumé.
- `OPEN CRATE ↗` link (mono, `--cargo-blue`): hover = a crowbar icon slides in; click = case-study transition (below).
- **Fresco's station** differs: it's a **cold-chain station** — the gantry frame is a fridge unit, the waybill gets a `PERISHABLE` sticker, and the mounted screen shows the phone app loop. Kortex's station is **under construction**: hazard tape across half the gantry, stamp reads `IN PRODUCTION`, blinking `--safety` beacon. Building in public, in-world.

**Station transitions:** between stations the route does something physical each time — a short drop (the box tips off a ledge and lands, squash-stretch), a curve (it banks, contents-shift wobble), a scan gate (laser sweep + beep). Travel is never dead scroll; the journey itself is choreographed.

## 5.3 Case Study Pages — "Inside the Crate"
- **Transition:** clicking `OPEN CRATE` — the box slides to center, the lid pries open (two flaps swing out, 0.6s), and the camera "falls in": the flaps expand past the viewport edges becoming the new page background. Reverse on exit. Continuity, in-metaphor, unforgettable.
- Inside: white inspection-sheet layout. `INSPECTION REPORT` header, mono metadata grid (`ROLE / STACK / TIMELINE / STATUS`), then Problem → Approach → Result.
- Architecture diagrams drawn as **conveyor-flow schematics** — data moving between machines on little belts (self-drawing SVG strokes on scroll). Your RAG pipeline as a literal pipeline. The metaphor does explanatory work here, not just aesthetic work.
- Results: big `--pass` numbers stamped in (slam animation) rather than counted up.
- Exit: `RESEAL & CONTINUE →` — the flaps close over the screen and you're back on the line, box moving to the next station.

## 5.4 Customs — About (~100vh)
The box reaches a **customs checkpoint**: a booth, a barrier arm, an X-RAY gate.

- **The X-ray moment (section signature):** the box passes through the scanner and the viewport shows the X-RAY VIEW — the box in schematic blue transparency, and inside it: your silhouette (a simple ink illustration of you at a laptop), plus icons of your tools (Python, TS, React, PyTorch, FastAPI...) floating around you like packed contents. Caption, mono: `CONTENTS VERIFIED: 1× ENGINEER · FUTA CS '26 · SHIPS WITHOUT PERMISSION`. Skills communicated as an x-ray manifest — zero skill bars, maximum character.
- Beside the scanner, the **customs declaration form** (white sheet): 3 short paragraphs of real about-copy, typewriter-set fields (`OCCUPATION`, `DECLARED EXPERIENCE: Tecvison — Software & AI Eng · Emperor Financial — AI Eng (contract)`), and your photo as a passport photo stapled to the corner (hover: the staple pops and it tilts).
- The barrier arm lifts, `CLEARED` stamp slams in `--pass`, the box rolls on. Tracking HUD flips to `OUT FOR DELIVERY`.

## 5.5 The Depot — Playground (~80vh)
A siding off the main route (the route visibly forks; a mono sign: `DEPOT — AUTHORIZED PERSONNEL & CURIOUS RECRUITERS ONLY`).

1. **Forklift game:** a tiny keyboard/touch-drivable forklift (arrow keys / on-screen d-pad) in a fenced yard. Crates are physics bodies (Matter.js) — stack them, knock them over. High score = tallest stack survives 3s. Absurd, 30-second fun.
2. **The label maker:** type anything (max 24 chars) → it prints as a stencil-and-barcode sticker with the slam animation → drag it anywhere; it persists for the session. Visitors write their names, their company, jokes — they *mark the site*, which makes them remember it.
3. **The bubble wrap sheet:** a grid of poppable bubbles (tap = pop + tiny haptic on mobile). Zero purpose. 100% dwell time. A mono counter tracks pops; at 100 pops a stamp appears: `CERTIFIED PROCRASTINATOR`.
4. **Terminal, receipt-printer edition (kept — it earns its place):** commands print on receipt paper that scrolls up. `sudo hire soj` → prints an actual packing slip with your email and rings a bell sound (muted by default, unmutable).

## 5.6 Delivery — Contact (~100vh)
The route ends at a drawn **front door** (porch light, doormat reading `NATIVE LABS`). The box — now covered in four project stamps, the customs clearance, and any labels the visitor printed — slides to the doormat and settles. Doorbell button (`--safety`, round): click = *ding-dong* (again, opt-in sound) and the door cracks open with warm light.

- Giant stencil headline: **`SIGN FOR DELIVERY.`**
- **The signature pad (final signature moment):** a real signature field — the visitor draws their signature with cursor/finger in `--safety` ink. On release: `DELIVERED ✓` stamp slams in `--pass`, the tracking HUD flips to `DELIVERED — 100%`, and the contact block unfolds like a delivery receipt:
  - Your email, huge, mono — click to copy (`COPIED ✓` stamp)
  - `RESUME ↓` (solid `--pass` — the one suit-and-tie button), `GITHUB ↗ LINKEDIN ↗ X ↗`
  - A second **real barcode** encoding `mailto:` your address — scan the screen with a phone and it opens a draft email. The single maddest, most demo-able detail on the site.
- Signing is optional — the contact block also unlocks on plain scroll (never hold contact info hostage) — but ~80% will sign, because signing things is irresistible.

## 5.7 Footer — the Receipt
A thin receipt strip: `© 2026 NATIVE LABS · SHIPPED FROM LAGOS · NO TEMPLATES IN THIS CONSIGNMENT`, live `WAT` clock, and `RETURN TO SENDER ↑` — clicking it sends the box hurtling back up the route in 1.4s (rollers spin in reverse, stamps stay on) to the top.

---

# 6. GLOBAL MOTION SYSTEM

1. **One mechanic to rule them all:** the box's journey is a single GSAP timeline scrubbed by scroll (MotionPath along the route SVG). Every station animation is a labeled window on that master timeline. This keeps the whole site feeling like ONE machine, not scattered effects — and it's technically clean.
2. **Physics personality:** cardboard, not silk. Squash-and-stretch on every landing (1.15x/0.9x), settle wobbles (2–3 diminishing oscillations), contents-shift on hard stops. Easing: `back.out(1.4)` for impacts, `power3.inOut` for travel, springs only in the Depot.
3. **Velocity mapping:** roller rotation speed, box lean angle (up to 6°), and floor-shadow stretch all derive from live scroll velocity — the site's responsiveness to the *visitor's own energy* is what makes it feel alive.
4. **Percussion budget:** stamps and landings may shake the screen max 2px, max once per station. Impact is a spice.
5. **Durations:** impacts 0.3–0.4s · reveals 0.5–0.7s · crate open/close 0.6s. Nothing over 1.5s.
6. **Sound (all opt-in):** a tiny speaker toggle in the nav, OFF by default. When on: roller rumble tied to velocity, stamp thunks, scanner beeps, the doorbell. Done tastefully, sound is a differentiator; done by default, it's a tab-close. Opt-in only, always.
7. **`prefers-reduced-motion`:** the master timeline switches to discrete states — the box simply *appears* at each station (crossfade), stamps fade in, no shake, no velocity effects, no scrub. Full content parity.
8. **Mobile:** route simplifies to near-vertical, box smaller and edge-hugging, stations stack, forklift gets a d-pad, everything else translates 1:1.
9. **Performance:** the box + machinery are SVG/DOM transforms (GPU-composited), zero WebGL, Matter.js only mounted inside the Depot when scrolled into view. Reveal-once for text; the box scrub is always live.

---

# 7. COPY & VOICE

- **Register:** deadpan logistics. The comedy comes from treating a job hunt with the total seriousness of freight paperwork: `DECLARED VALUE`, `HANDLE WITH AMBITION`, `SHIPS WITHOUT PERMISSION`, `CURIOUS RECRUITERS ONLY`. Never winking, never "quirky" — the form is played straight, which is what makes it funny.
- Substance stays sharp and plain: project sentences, about paragraphs, and case studies are written like the Tobi reference — verbs, systems, numbers. Metaphor on the chrome, clarity on the content. A recruiter skimming only the waybills still gets a complete, serious picture.
- Every stamp metric is real. `--pass` green remains a promise.
- 404: a torn shipping label, `PACKAGE NOT FOUND — 404`, button `FILE A CLAIM (GO HOME)`.

---

# 8. TECH & BUDGETS

- **Next.js (App Router) + TypeScript.** GSAP + ScrollTrigger + MotionPathPlugin (the spine), Framer Motion for micro-states, Matter.js (Depot only, lazy), Lenis (lerp 0.1 — scrubbing needs smooth input). Barcodes via a tiny Code-128 SVG generator. Signature pad: pointer-events on a canvas, ~60 lines.
- **Budgets:** LCP < 2.0s, INP < 200ms, CLS < 0.1, JS < 250KB gzipped (no 3D). Route/machinery SVGs inlined and compressed. Fonts subset via `next/font`.
- **A11y:** all content readable with animation off; stations are semantic sections with headings; signature pad skippable; sounds opt-in; focus outlines `--safety` 2px offset; contrast AA verified (ink on concrete ≈ 12:1; white text never on `--kraft`).
- **OG image:** the stamped box on the doormat — instantly communicates the whole site in a Slack unfurl.

---

# 9. BUILD ORDER (4–5 weeks)

1. **Week 1:** World + spine — concrete/grid, nav, tracking HUD, the route SVG, and the box scrubbing along it end-to-end with placeholder stations. *If the spine feels good, everything else is decoration; if it doesn't, we find out in week 1, not week 4.*
2. **Week 2:** Stations 01–04 with real copy, screenshots, waybills, and the stamp system. Case-study pages (static first).
3. **Week 3:** Choreography — labeling machine, scan gates, customs x-ray, crate open/close transition, entrance, delivery + signature pad.
4. **Week 4:** Depot toys, barcodes, sound layer, reduced-motion pass, mobile pass, perf/a11y audit. Ship.
5. **(Buffer week 5** for the forklift, because physics toys always eat a few extra days.)

**The spine first. Always the spine.** A box that travels beautifully with four plain stations beats a gorgeous station on a broken line.
