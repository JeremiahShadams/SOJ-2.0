'use client'

import { useEffect, useRef } from 'react'

const FRAGMENT_SHADER = `precision mediump float;
uniform vec2 r, m;
uniform float t, s;
float h(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5); }
float n(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f *= f * (3. - 2. * f);
  return mix(mix(h(i), h(i + vec2(1., 0.)), f.x), mix(h(i + vec2(0., 1.)), h(i + 1.), f.x), f.y);
}
float fb(vec2 p) { return .6 * n(p) + .3 * n(p * 2.1) + .1 * n(p * 4.3); }
void main() {
  vec2 u = gl_FragCoord.xy / r;
  float asp = r.x / r.y;
  vec2 d = u - m;
  float md = length(d * vec2(asp, 1.));
  vec2 p = u * vec2(asp, 1.) * 4.2 + vec2(0., s * .6);
  p += (vec2(fb(p * .8 + t * .02), fb(p * .8 + 7.)) - .5) * .32;
  p += d * exp(-md * 6.) * 1.1;
  vec2 id = floor(p), f = fract(p) - .5;
  float k = h(id), rr = length(f), ang = atan(f.y, f.x);
  float rings = (1. - smoothstep(.06, .1, abs(fract(rr * 4.5) - .5))) * step(rr, .47);
  float q = floor(ang / 6.2832 * 12. + .5) / 12. * 6.2832;
  float dots = (1. - smoothstep(.045, .07, length(f - .36 * vec2(cos(q), sin(q))))) + (1. - smoothstep(.06, .1, rr));
  float dm = abs(f.x) + abs(f.y);
  float diam = (1. - smoothstep(.015, .04, abs(dm - .36))) + (1. - smoothstep(.015, .04, abs(dm - .18))) + (1. - smoothstep(.02, .05, min(abs(f.x), abs(f.y)))) * step(dm, .36);
  float v = k < .38 ? rings + (1. - smoothstep(.05, .09, rr)) : (k < .72 ? dots : diam);
  v += (fb(p * 7.) - .5) * .5;
  float resist = smoothstep(.38, .64, v);
  vec3 deep = vec3(.05, .07, .2), mid = vec3(.17, .23, .55);
  vec3 dye = mix(deep, mid, smoothstep(.25, .75, fb(p * .7 + 3.)));
  vec3 paper = vec3(.95, .93, .89), laterite = vec3(.894, .286, .122);
  vec3 c = mix(dye, paper * .78, resist * .58);
  c = mix(c, laterite, resist * exp(-md * 5.) * .9);
  c *= .5 + .5 * smoothstep(0., .7, u.y);
  c *= .6 + .4 * (1. - smoothstep(.3, 1.2, length(u - .5)));
  gl_FragColor = vec4(c, 1.);
}`

const VERTEX_SHADER = 'attribute vec2 a; void main() { gl_Position = vec4(a, 0., 1.); }'

export default function HeroGL({ scroll }: { scroll: { current: number } }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const gl = canvas.getContext('webgl', { alpha: false, antialias: false, powerPreference: 'low-power' })
    if (!gl) return

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type)
      if (!shader) return null
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader)
        return null
      }
      return shader
    }

    const vertexShader = compile(gl.VERTEX_SHADER, VERTEX_SHADER)
    const fragmentShader = compile(gl.FRAGMENT_SHADER, FRAGMENT_SHADER)
    if (!vertexShader || !fragmentShader) return

    const program = gl.createProgram()
    if (!program) return
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)
    gl.deleteShader(vertexShader)
    gl.deleteShader(fragmentShader)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program)
      return
    }
    gl.useProgram(program)

    const buffer = gl.createBuffer()
    if (!buffer) {
      gl.deleteProgram(program)
      return
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const attribute = gl.getAttribLocation(program, 'a')
    gl.enableVertexAttribArray(attribute)
    gl.vertexAttribPointer(attribute, 2, gl.FLOAT, false, 0, 0)

    const resolution = gl.getUniformLocation(program, 'r')
    const mouseUniform = gl.getUniformLocation(program, 'm')
    const timeUniform = gl.getUniformLocation(program, 't')
    const scrollUniform = gl.getUniformLocation(program, 's')
    const mouse = { x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 }
    const move = (event: PointerEvent) => {
      mouse.targetX = event.clientX / window.innerWidth
      mouse.targetY = 1 - event.clientY / window.innerHeight
    }
    const resize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, window.innerWidth < 700 ? 1 : 1.5)
      canvas.width = Math.max(1, Math.floor(canvas.clientWidth * pixelRatio))
      canvas.height = Math.max(1, Math.floor(canvas.clientHeight * pixelRatio))
      gl.viewport(0, 0, canvas.width, canvas.height)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', move, { passive: true })
    let visible = true
    let frame = 0
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting })
    observer.observe(canvas)
    const draw = (milliseconds: number) => {
      frame = window.requestAnimationFrame(draw)
      if (!visible || document.hidden) return
      mouse.x += (mouse.targetX - mouse.x) * 0.06
      mouse.y += (mouse.targetY - mouse.y) * 0.06
      if (resolution) gl.uniform2f(resolution, canvas.width, canvas.height)
      if (mouseUniform) gl.uniform2f(mouseUniform, mouse.x, mouse.y)
      if (timeUniform) gl.uniform1f(timeUniform, milliseconds / 1000)
      if (scrollUniform) gl.uniform1f(scrollUniform, scroll.current)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }
    frame = window.requestAnimationFrame(draw)

    return () => {
      window.cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', move)
      gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
    }
  }, [scroll])

  return <canvas ref={canvasRef} className="hero-gl" aria-hidden="true" />
}
