'use client'

import { useEffect, useRef } from 'react'
import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  Group,
  Mesh,
  MeshStandardMaterial,
  CylinderGeometry,
  SphereGeometry,
  TorusGeometry,
  ConeGeometry,
  HemisphereLight,
  DirectionalLight,
  DoubleSide,
} from 'three'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'

interface ChatBot3DProps {
  open: boolean
  onToggle: () => void
  onHopChange?: (hopRatio: number) => void
}

export default function ChatBot3D({ open, onToggle, onHopChange }: ChatBot3DProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const openRef = useRef(open)
  openRef.current = open

  const onToggleRef = useRef(onToggle)
  onToggleRef.current = onToggle

  const onHopChangeRef = useRef(onHopChange)
  onHopChangeRef.current = onHopChange

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Detect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // 1. Scene & Camera
    const scene = new Scene()
    const camera = new PerspectiveCamera(28, 1, 0.1, 100)
    camera.position.set(0, 0.05, 6.2)
    camera.lookAt(0, 0, 0)

    // 2. Lights
    const hemiLight = new HemisphereLight('#ffe9d6', '#1a1f4a', 1.1)
    scene.add(hemiLight)

    const dirLight = new DirectionalLight('#fff3e0', 2.1)
    dirLight.position.set(2.5, 3, 4)
    scene.add(dirLight)

    const rimLight = new DirectionalLight('#7d8be0', 1.2)
    rimLight.position.set(-3, 1.5, -2)
    scene.add(rimLight)

    // 3. Renderer
    let renderer: WebGLRenderer
    try {
      renderer = new WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'low-power',
      })
    } catch {
      return
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    const width = container.clientWidth || 112
    const height = container.clientHeight || 112
    renderer.setSize(width, height, false)
    renderer.domElement.setAttribute('aria-hidden', 'true')
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    renderer.domElement.style.display = 'block'
    renderer.domElement.style.pointerEvents = 'none'
    container.appendChild(renderer.domElement)

    // 4. Model Hierarchy
    const botRoot = new Group()
    scene.add(botRoot)

    const headGroup = new Group()
    botRoot.add(headGroup)

    // Track all disposable resources
    const disposables: { dispose: () => void }[] = []

    // 4a. Head (Laterite rounded box)
    const headGeo = new RoundedBoxGeometry(1.6, 1.22, 1.1, 5, 0.38)
    const headMat = new MeshStandardMaterial({
      color: '#e4491f',
      roughness: 0.38,
      metalness: 0.05,
    })
    disposables.push(headGeo, headMat)
    const headMesh = new Mesh(headGeo, headMat)
    headGroup.add(headMesh)

    // 4b. Screen (Dark bezel / face display)
    const screenGeo = new RoundedBoxGeometry(1.3, 0.88, 0.1, 4, 0.22)
    const screenMat = new MeshStandardMaterial({
      color: '#0b0a09',
      roughness: 0.12,
      metalness: 0.3,
      emissive: '#1a2260',
      emissiveIntensity: 0.35,
    })
    disposables.push(screenGeo, screenMat)
    const screenMesh = new Mesh(screenGeo, screenMat)
    screenMesh.position.set(0, -0.02, 0.52)
    headGroup.add(screenMesh)

    // 4c. Eyes Group (can slide independently on the screen)
    const eyesGroup = new Group()
    headGroup.add(eyesGroup)

    const eyeGeo = new SphereGeometry(0.11, 20, 16)
    const eyeMat = new MeshStandardMaterial({
      color: '#f2ede4',
      emissive: '#f2ede4',
      emissiveIntensity: 0.9,
      roughness: 0.4,
    })
    disposables.push(eyeGeo, eyeMat)

    const leftEye = new Mesh(eyeGeo, eyeMat)
    leftEye.position.set(-0.29, 0.06, 0.585)
    leftEye.scale.set(0.9, 1.25, 0.4)
    eyesGroup.add(leftEye)

    const rightEye = new Mesh(eyeGeo, eyeMat)
    rightEye.position.set(0.29, 0.06, 0.585)
    rightEye.scale.set(0.9, 1.25, 0.4)
    eyesGroup.add(rightEye)

    // 4d. Smile (Laterite curved arc)
    const smileGeo = new TorusGeometry(0.2, 0.034, 10, 28, Math.PI * 0.7)
    const smileMat = new MeshStandardMaterial({
      color: '#e4491f',
      emissive: '#e4491f',
      emissiveIntensity: 0.7,
    })
    disposables.push(smileGeo, smileMat)
    const smileMesh = new Mesh(smileGeo, smileMat)
    smileMesh.position.set(0, -0.2, 0.585)
    smileMesh.rotation.z = Math.PI * 1.15 // arc opens upward
    headGroup.add(smileMesh)

    // 4e. Ears
    const earGeo = new CylinderGeometry(0.25, 0.25, 0.2, 24)
    const earMat = new MeshStandardMaterial({
      color: '#b8300f',
      roughness: 0.4,
    })
    disposables.push(earGeo, earMat)

    const leftEar = new Mesh(earGeo, earMat)
    leftEar.position.set(-0.9, -0.02, 0)
    leftEar.rotation.z = Math.PI / 2
    headGroup.add(leftEar)

    const rightEar = new Mesh(earGeo, earMat)
    rightEar.position.set(0.9, -0.02, 0)
    rightEar.rotation.z = Math.PI / 2
    headGroup.add(rightEar)

    // 4f. Gold Crown
    const crownMount = new Group()
    crownMount.position.set(0, 0.74, 0)
    crownMount.rotation.z = -8 * (Math.PI / 180) // rakish -8° tilt
    headGroup.add(crownMount)

    const crownWobble = new Group()
    crownMount.add(crownWobble)

    const crownMat = new MeshStandardMaterial({
      color: '#e8b23c',
      metalness: 0.95,
      roughness: 0.22,
      emissive: '#6b4a00',
      emissiveIntensity: 0.15,
    })
    const crownBandMat = new MeshStandardMaterial({
      color: '#e8b23c',
      metalness: 0.95,
      roughness: 0.22,
      emissive: '#6b4a00',
      emissiveIntensity: 0.15,
      side: DoubleSide,
    })
    disposables.push(crownMat, crownBandMat)

    const bandGeo = new CylinderGeometry(0.4, 0.44, 0.16, 28, 1, true)
    disposables.push(bandGeo)
    const bandMesh = new Mesh(bandGeo, crownBandMat)
    crownWobble.add(bandMesh)

    const spikeGeo = new ConeGeometry(0.095, 0.26, 12)
    const ballGeo = new SphereGeometry(0.035, 12, 12)
    disposables.push(spikeGeo, ballGeo)

    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI * 2
      const sx = Math.sin(angle) * 0.4
      const sz = Math.cos(angle) * 0.4

      const spike = new Mesh(spikeGeo, crownMat)
      spike.position.set(sx, 0.21, sz)
      crownWobble.add(spike)

      const ball = new Mesh(ballGeo, crownMat)
      ball.position.set(sx, 0.34, sz)
      crownWobble.add(ball)
    }

    const gemGeo = new SphereGeometry(0.05, 16, 16)
    const gemMat = new MeshStandardMaterial({
      color: '#e4491f',
      emissive: '#e4491f',
      emissiveIntensity: 1.2,
    })
    disposables.push(gemGeo, gemMat)
    const gemMesh = new Mesh(gemGeo, gemMat)
    gemMesh.position.set(0, 0, 0.42)
    crownWobble.add(gemMesh)

    // ══════════════════════════════════════════════════════════════════
    // STATE & PHYSICS VARIABLES
    // ══════════════════════════════════════════════════════════════════
    let pointerX = window.innerWidth / 2
    let pointerY = window.innerHeight / 2
    let lastPointerX = pointerX
    let lastPointerY = pointerY
    let lastPointerTime = performance.now()
    let lastMovementTime = performance.now()
    let isPointerOverBot = false

    // Head rotation
    let currentYaw = 0
    let currentPitch = 0
    let currentRoll = 0

    // Eye sliding
    let currentEyeX = 0
    let currentEyeY = 0

    // Crown physics (spring lag + overshoot)
    let crownRotY = 0
    let crownVelY = 0
    let crownRotX = 0
    let crownVelX = 0

    // Hop physics
    let hopY = 0
    let hopVel = 0
    let lastHopTime = 0

    // Squash & Stretch
    let squashY = 1
    let squashX = 1
    let clickAnimStart = -1

    // Blinking
    let nextBlinkTime = performance.now() + 2500
    let blinkStage: 'idle' | 'closing' | 'opening' = 'idle'
    let blinkStartTime = 0
    let isDoubleBlink = false

    // Ear twitch
    let nextEarTwitch = performance.now() + 6000
    let earTwitchStart = 0

    // Startle
    let lastStartleTime = 0

    // Thinking & Happy states
    let isThinking = false
    let happyUntil = 0

    // Entrance animation (spring up from 40px below after 2.5s)
    let entranceDone = false
    let entranceStart = performance.now() + 2500
    let entranceY = -1.2 // ~40px below in 3D units

    // ══════════════════════════════════════════════════════════════════
    // EVENT LISTENERS
    // ══════════════════════════════════════════════════════════════════
    const onPointerMove = (e: PointerEvent) => {
      const now = performance.now()
      const dt = Math.max(0.001, (now - lastPointerTime) / 1000)
      const dx = e.clientX - lastPointerX
      const dy = e.clientY - lastPointerY
      const speed = Math.sqrt(dx * dx + dy * dy) / dt

      pointerX = e.clientX
      pointerY = e.clientY
      lastPointerX = pointerX
      lastPointerY = pointerY
      lastPointerTime = now
      lastMovementTime = now

      // Check startle
      const rect = container.getBoundingClientRect()
      const botCenterX = rect.left + rect.width / 2
      const botCenterY = rect.top + rect.height / 2
      const distToBot = Math.hypot(pointerX - botCenterX, pointerY - botCenterY)

      if (
        !prefersReducedMotion &&
        speed > 1800 &&
        distToBot < 320 &&
        now - lastStartleTime > 4000
      ) {
        // Startle trigger!
        lastStartleTime = now
        hopVel += 1.8
        crownVelY += 12.0
      }
    }

    const onPointerDown = (e: PointerEvent) => {
      pointerX = e.clientX
      pointerY = e.clientY
      lastMovementTime = performance.now()
    }

    const onMouseEnter = () => {
      isPointerOverBot = true
      const now = performance.now()
      if (!prefersReducedMotion && now - lastHopTime > 700) {
        lastHopTime = now
        hopVel += 2.5
      }
    }

    const onMouseLeave = () => {
      isPointerOverBot = false
    }

    const onChatThinking = () => {
      isThinking = true
    }

    const onChatAnswered = () => {
      isThinking = false
      happyUntil = performance.now() + 600
      if (!prefersReducedMotion) {
        hopVel += 1.2
      }
    }

    const onClick = () => {
      clickAnimStart = performance.now()
      currentPitch += 0.25 // nod
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerdown', onPointerDown, { passive: true })
    container.addEventListener('pointerenter', onMouseEnter)
    container.addEventListener('pointerleave', onMouseLeave)
    container.addEventListener('click', onClick)
    window.addEventListener('chat-thinking', onChatThinking)
    window.addEventListener('chat-answered', onChatAnswered)

    // Handle resize
    const onResize = () => {
      if (!container) return
      const w = container.clientWidth || 112
      const h = container.clientHeight || 112
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h, false)
    }
    window.addEventListener('resize', onResize)

    // ══════════════════════════════════════════════════════════════════
    // MAIN RENDER LOOP
    // ══════════════════════════════════════════════════════════════════
    let rafId: number
    let lastFrameTime = performance.now()

    const render = (time: number) => {
      rafId = requestAnimationFrame(render)

      if (document.hidden) return

      const dt = Math.min(0.1, (time - lastFrameTime) / 1000)
      lastFrameTime = time
      const t = time / 1000

      const isChatOpen = openRef.current
      const isAsleep = !isChatOpen && time - lastMovementTime > 9000

      // Entrance animation
      if (!entranceDone) {
        if (time >= entranceStart) {
          const entranceDt = Math.min(0.05, dt)
          entranceY += (0 - entranceY) * (1 - Math.exp(-entranceDt * 12))
          if (Math.abs(entranceY) < 0.02) {
            entranceY = 0
            entranceDone = true
            // Landing squash
            squashY = 0.86
            squashX = 1.1
          }
        }
      }

      // Compute cursor vector
      const rect = container.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const nx = Math.max(-1, Math.min(1, (pointerX - centerX) / (window.innerWidth * 0.5)))
      const ny = Math.max(-1, Math.min(1, (pointerY - centerY) / (window.innerHeight * 0.5)))

      // Target head rotations
      let targetYaw = nx * 0.58
      let targetPitch = ny * 0.38
      let targetRoll = -nx * 0.06

      if (isPointerOverBot) {
        targetYaw = 0
        targetPitch = 0
        targetRoll = 0
      } else if (isChatOpen) {
        // Look up and left toward panel
        targetYaw = -0.42
        targetPitch = -0.22
        targetRoll = 0.04
      } else if (isThinking) {
        targetRoll = 0.08 * Math.sin(t * Math.PI * 2.5)
      } else if (isAsleep) {
        targetPitch = 0.25 // droop
        targetYaw = 0
        targetRoll = 0
      }

      if (prefersReducedMotion) {
        targetYaw *= 0.5
        targetPitch *= 0.5
        targetRoll = 0
      }

      // Smooth head rotation spring
      const headSpringRate = prefersReducedMotion ? 3 : 7
      currentYaw += (targetYaw - currentYaw) * (1 - Math.exp(-dt * headSpringRate))
      currentPitch += (targetPitch - currentPitch) * (1 - Math.exp(-dt * headSpringRate))
      currentRoll += (targetRoll - currentRoll) * (1 - Math.exp(-dt * headSpringRate))

      headGroup.rotation.y = currentYaw
      headGroup.rotation.x = currentPitch
      headGroup.rotation.z = currentRoll

      // Crown spring physics (lag & overshoot)
      if (!prefersReducedMotion) {
        const crownK = 28
        const crownD = 7
        crownVelY += (currentYaw - crownRotY) * crownK * dt - crownVelY * crownD * dt
        crownRotY += crownVelY * dt
        crownVelX += (currentPitch - crownRotX) * crownK * dt - crownVelX * crownD * dt
        crownRotX += crownVelX * dt

        crownWobble.rotation.y = (crownRotY - currentYaw) * 1.08
        crownWobble.rotation.x = (crownRotX - currentPitch) * 1.08 + (isAsleep ? 0.07 : 0)
      } else {
        crownWobble.rotation.set(0, 0, 0)
      }

      // Eyes sliding
      let eyeTargetX = nx * 0.06 * 1.6
      let eyeTargetY = -ny * 0.04 * 1.6

      if (isThinking) {
        eyeTargetX = Math.sin(t * Math.PI * 2.5) * 0.05
      } else if (isPointerOverBot || isChatOpen || isAsleep) {
        eyeTargetX = 0
        eyeTargetY = 0
      }

      eyeTargetX = Math.max(-0.06, Math.min(0.06, eyeTargetX))
      eyeTargetY = Math.max(-0.04, Math.min(0.04, eyeTargetY))

      currentEyeX += (eyeTargetX - currentEyeX) * (1 - Math.exp(-dt * 12))
      currentEyeY += (eyeTargetY - currentEyeY) * (1 - Math.exp(-dt * 12))
      eyesGroup.position.set(currentEyeX, currentEyeY, 0)

      // Hop physics
      if (!prefersReducedMotion) {
        const hopK = 180
        const hopD = 11
        const hopAcc = -hopK * hopY - hopD * hopVel
        hopVel += hopAcc * dt
        hopY += hopVel * dt
        if (hopY < 0) {
          hopY = 0
          hopVel = 0
        }
      } else {
        hopY = 0
      }

      // Report hop ratio for contact shadow scaling
      if (onHopChangeRef.current) {
        onHopChangeRef.current(Math.min(1, hopY / 0.28))
      }

      // Idle bob & breathe
      let bob = 0
      let breathe = 1
      if (!prefersReducedMotion) {
        const bobScale = isChatOpen ? 0.5 : isAsleep ? 0.6 : 1.0
        bob = Math.sin(t * 2.0) * 0.04 * bobScale
        breathe = 1 + Math.sin(t * 1.5) * 0.015
      }

      // Click animation squash/stretch
      if (clickAnimStart > 0) {
        const elapsed = time - clickAnimStart
        if (elapsed < 80) {
          squashY = 0.82
          squashX = 1.12
        } else if (elapsed < 220) {
          squashY = 1.1
          squashX = 0.95
        } else if (elapsed < 440) {
          squashY += (1 - squashY) * 0.15
          squashX += (1 - squashX) * 0.15
        } else {
          squashY = 1
          squashX = 1
          clickAnimStart = -1
        }
      } else {
        squashY += (1 - squashY) * 0.15
        squashX += (1 - squashX) * 0.15
      }

      botRoot.position.y = entranceY + hopY + bob
      botRoot.scale.set(breathe * squashX, breathe * squashY, breathe)

      // Blinking & Eyes scale
      let eyeScaleY = 1.25
      let eyeScaleX = 0.9

      if (isAsleep) {
        eyeScaleY = 0.1
      } else if (time < happyUntil) {
        // Happy arcs
        eyeScaleY = 0.5
        leftEye.position.y = 0.09
        rightEye.position.y = 0.09
      } else {
        leftEye.position.y = 0.06
        rightEye.position.y = 0.06

        if (time >= nextBlinkTime && blinkStage === 'idle') {
          blinkStage = 'closing'
          blinkStartTime = time
          isDoubleBlink = Math.random() < 0.25
        }

        if (blinkStage === 'closing') {
          const bElapsed = time - blinkStartTime
          if (bElapsed < 60) {
            eyeScaleY = 1.25 * (1 - (bElapsed / 60) * 0.92)
          } else {
            blinkStage = 'opening'
            blinkStartTime = time
          }
        } else if (blinkStage === 'opening') {
          const bElapsed = time - blinkStartTime
          if (bElapsed < 90) {
            eyeScaleY = 0.08 + (bElapsed / 90) * (1.25 - 0.08)
          } else {
            blinkStage = 'idle'
            if (isDoubleBlink) {
              isDoubleBlink = false
              nextBlinkTime = time + 140
            } else {
              nextBlinkTime = time + 2200 + Math.random() * 3300
            }
          }
        }

        // Hover or startle widen
        if (isPointerOverBot) {
          eyeScaleX = 1.1
          eyeScaleY = Math.max(eyeScaleY, 1.4)
        } else if (time - lastStartleTime < 250) {
          eyeScaleX = 1.2
          eyeScaleY = 1.5
        }
      }

      leftEye.scale.set(eyeScaleX, eyeScaleY, 0.4)
      rightEye.scale.set(eyeScaleX, eyeScaleY, 0.4)

      // Smile reaction
      if (isThinking) {
        smileMesh.scale.set(1.0, 0.3, 1.0)
      } else if (isPointerOverBot) {
        smileMesh.scale.set(1.25, 1.15, 1.0)
      } else {
        smileMesh.scale.set(1.0, 1.0, 1.0)
      }

      // Ear twitching
      if (!prefersReducedMotion) {
        if (time >= nextEarTwitch && earTwitchStart === 0) {
          earTwitchStart = time
        }
        if (earTwitchStart > 0) {
          const eElapsed = time - earTwitchStart
          if (eElapsed < 200) {
            rightEar.rotation.z = Math.PI / 2 + Math.sin((eElapsed / 200) * Math.PI) * 0.12
          } else {
            rightEar.rotation.z = Math.PI / 2
            earTwitchStart = 0
            nextEarTwitch = time + 6000 + Math.random() * 4000
          }
        }
      }

      renderer.render(scene, camera)
    }

    rafId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerdown', onPointerDown)
      container.removeEventListener('pointerenter', onMouseEnter)
      container.removeEventListener('pointerleave', onMouseLeave)
      container.removeEventListener('click', onClick)
      window.removeEventListener('chat-thinking', onChatThinking)
      window.removeEventListener('chat-answered', onChatAnswered)
      window.removeEventListener('resize', onResize)

      disposables.forEach((d) => d.dispose())
      renderer.dispose()
      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="chat-bot-canvas-wrapper"
      aria-hidden="true"
    />
  )
}
