import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { useDeck, useSlide } from '@/lib/deck'

// Three-depth star field: sharp · soft · bokeh
// Uniform distribution, slow bidirectional drift, twinkle on sharp layer

type Layer = 0 | 1 | 2

interface Star {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  alpha: number
  layer: Layer
  phase: number
  twinkleFreq: number
  noisePhase: number
}

const LAYER_CFG = [
  { rMin: 0.3, rMax: 1.0,  aMin: 0.55, aMax: 1.00, spMin: 0.003, spMax: 0.011 },
  { rMin: 0.8, rMax: 2.2,  aMin: 0.22, aMax: 0.52, spMin: 0.004, spMax: 0.013 },
  { rMin: 5.0, rMax: 16.0, aMin: 0.06, aMax: 0.20, spMin: 0.005, spMax: 0.015 },
] as const

function mulberry32(seed: number) {
  let t = seed >>> 0
  return () => {
    t = (t + 0x6d2b79f5) >>> 0
    let r = Math.imul(t ^ (t >>> 15), 1 | t)
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
}

function driftNoise(t: number, phase: number): number {
  return (
    Math.sin(t * 0.22 + phase)        * 0.50 +
    Math.sin(t * 0.68 + phase * 1.55) * 0.32 +
    Math.sin(t * 1.70 + phase * 0.80) * 0.18
  )
}

function newStar(rand: () => number, layer: Layer): Star {
  const c = LAYER_CFG[layer]
  const sp = c.spMin + rand() * (c.spMax - c.spMin)
  const angle = rand() * Math.PI * 2
  return {
    x: rand(),
    y: rand(),
    vx: Math.cos(angle) * sp,
    vy: Math.sin(angle) * sp,
    r: c.rMin + rand() * (c.rMax - c.rMin),
    alpha: c.aMin + rand() * (c.aMax - c.aMin),
    layer,
    phase: rand() * Math.PI * 2,
    twinkleFreq: 0.4 + rand() * 1.4,
    noisePhase: rand() * 55,
  }
}

function initStars(count: number): Star[] {
  const r = mulberry32(0x57a750ff)
  const n0 = Math.round(count * 0.6)
  const n1 = Math.round(count * 0.3)
  const n2 = count - n0 - n1
  return [
    ...Array.from({ length: n0 }, () => newStar(r, 0)),
    ...Array.from({ length: n1 }, () => newStar(r, 1)),
    ...Array.from({ length: n2 }, () => newStar(r, 2)),
  ]
}

export function Stars({ count = 150 }: { count?: number }) {
  const hostRef  = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { index, inView } = useSlide()
  const { current } = useDeck()
  const reduceMotion = useReducedMotion()
  const playing = index === current && inView && !reduceMotion
  const starsRef = useRef<Star[] | null>(null)

  useEffect(() => {
    const host   = hostRef.current
    const canvas = canvasRef.current
    const ctx    = canvas?.getContext('2d')
    if (!host || !canvas || !ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let width = 0, height = 0
    let frame = 0
    let last = performance.now()
    let time = 0
    const rand = mulberry32(0xc7e5a09b)

    if (!starsRef.current) starsRef.current = initStars(count)
    const stars = starsRef.current

    const resize = () => {
      width  = host.offsetWidth
      height = host.offsetHeight
      canvas.width  = Math.max(1, Math.round(width  * dpr))
      canvas.height = Math.max(1, Math.round(height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      const scale = Math.max(width, height * (16 / 9)) / 1920
      const sc = Math.max(0.65, scale)

      ctx.globalCompositeOperation = 'lighter'

      for (const s of stars) {
        const sx = s.x * width
        const sy = s.y * height
        // fade near the very bottom (where the word lives)
        const bottomFade = Math.min(1, s.y / 0.14)
        const twinkle = s.layer === 0
          ? 0.30 + 0.70 * (0.5 + 0.5 * Math.sin(time * s.twinkleFreq * Math.PI * 2 + s.phase))
          : 1.0
        const a = s.alpha * bottomFade * twinkle
        if (a < 0.004) continue

        if (s.layer === 0) {
          // Sharp star: warm-white tight radial gradient
          const outer = s.r * 2.5 * sc
          const g = ctx.createRadialGradient(sx, sy, 0, sx, sy, outer)
          g.addColorStop(0,    `rgba(248, 251, 255, ${a.toFixed(3)})`)
          g.addColorStop(0.28, `rgba(200, 225, 255, ${(a * 0.65).toFixed(3)})`)
          g.addColorStop(1,    'rgba(160, 200, 255, 0)')
          ctx.fillStyle = g
          ctx.beginPath()
          ctx.arc(sx, sy, outer, 0, Math.PI * 2)
          ctx.fill()
        } else if (s.layer === 1) {
          // Soft star: wider gradient, cool blue-white
          const outer = s.r * 5.0 * sc
          const g = ctx.createRadialGradient(sx, sy, 0, sx, sy, outer)
          g.addColorStop(0,    `rgba(190, 220, 255, ${a.toFixed(3)})`)
          g.addColorStop(0.38, `rgba(140, 190, 255, ${(a * 0.50).toFixed(3)})`)
          g.addColorStop(1,    'rgba(100, 160, 255, 0)')
          ctx.fillStyle = g
          ctx.beginPath()
          ctx.arc(sx, sy, outer, 0, Math.PI * 2)
          ctx.fill()
        } else {
          // Bokeh disc: near-flat center, soft ice-blue edge
          const drawR = s.r * sc
          const g = ctx.createRadialGradient(sx, sy, drawR * 0.1, sx, sy, drawR)
          g.addColorStop(0,    `rgba(140, 192, 255, ${a.toFixed(3)})`)
          g.addColorStop(0.55, `rgba(100, 155, 235, ${(a * 0.65).toFixed(3)})`)
          g.addColorStop(1,    'rgba( 60, 110, 200, 0)')
          ctx.fillStyle = g
          ctx.beginPath()
          ctx.arc(sx, sy, drawR, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      ctx.globalCompositeOperation = 'source-over'
    }

    const step = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      time += dt

      for (const s of stars) {
        s.x += (s.vx + driftNoise(time,     s.noisePhase) * 0.003) * dt
        s.y += (s.vy + driftNoise(time + 7, s.noisePhase) * 0.003) * dt
        if (s.x < -0.05) s.x = 1.05
        if (s.x > 1.05)  s.x = -0.05
        if (s.y < -0.05) s.y = 1.05
        if (s.y > 1.05)  s.y = -0.05
      }

      draw()
      frame = requestAnimationFrame(step)
    }

    const observer = new ResizeObserver(() => { resize(); draw() })
    observer.observe(host)
    resize()
    draw()
    if (playing) frame = requestAnimationFrame(step)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [playing])

  // mask: visible across the sky, fades at very bottom where the word lives
  const maskImage = 'radial-gradient(ellipse 115% 105% at 50% 32%, black 20%, rgba(0,0,0,0.65) 55%, rgba(0,0,0,0.15) 78%, transparent 92%)'

  return (
    <div
      ref={hostRef}
      aria-hidden
      className="h-full w-full"
      style={{ maskImage, WebkitMaskImage: maskImage }}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  )
}
