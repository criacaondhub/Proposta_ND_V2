import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { useDeck, useSlide } from '@/lib/deck'

// Three-depth bonfire spark system: sharp · soft · bokeh
// Inspired by bokeh fire photography (gaussian origin, lighter compositing)

type Layer = 0 | 1 | 2

interface Spark {
  x: number
  y: number
  vy: number       // upward velocity, normalized/s
  vxBase: number   // base lateral drift, normalized/s
  r: number        // radius in CSS px
  alpha: number    // max alpha for this spark
  layer: Layer
  phase: number    // twinkle / noise phase
  twinkleFreq: number
  noisePhase: number
}

// Layer configs: back (sharp) · mid (soft) · front (bokeh)
const LAYER_CFG = [
  { rMin: 0.5, rMax: 1.5,  aMin: 0.40, aMax: 0.90, vyMin: 0.030, vyMax: 0.075 },
  { rMin: 1.0, rMax: 2.2,  aMin: 0.22, aMax: 0.52, vyMin: 0.060, vyMax: 0.120 },
  { rMin: 4.0, rMax: 11.0, aMin: 0.09, aMax: 0.26, vyMin: 0.090, vyMax: 0.170 },
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

function gauss(rand: () => number): number {
  return Math.sqrt(-2 * Math.log(rand() || 1e-6)) * Math.cos(2 * Math.PI * rand())
}

// Smooth lateral noise — sum of sines, no library needed
function lateralNoise(t: number, phase: number): number {
  return (
    Math.sin(t * 0.38 + phase)         * 0.45 +
    Math.sin(t * 1.05 + phase * 1.70)  * 0.33 +
    Math.sin(t * 2.60 + phase * 0.88)  * 0.22
  )
}

function newSpark(rand: () => number, layer: Layer, startY?: number): Spark {
  const c = LAYER_CFG[layer]
  return {
    x:          Math.max(-0.08, Math.min(1.08, 0.11 + gauss(rand) * 0.22)),
    y:          startY ?? (1.02 + rand() * 0.08),
    vy:         -(c.vyMin + rand() * (c.vyMax - c.vyMin)),
    vxBase:     (rand() - 0.32) * 0.012,  // slight rightward bias
    r:          c.rMin + rand() * (c.rMax - c.rMin),
    alpha:      c.aMin + rand() * (c.aMax - c.aMin),
    layer,
    phase:      rand() * Math.PI * 2,
    twinkleFreq: 1.8 + rand() * 4.2,
    noisePhase:  rand() * 55,
  }
}

function initSparks(count: number): Spark[] {
  const r = mulberry32(0x5eedb0a7)
  const n0 = Math.round(count * 0.6)
  const n1 = Math.round(count * 0.3)
  const n2 = count - n0 - n1
  // Spread initial y across full height so the screen starts populated
  return [
    ...Array.from({ length: n0 }, () => newSpark(r, 0, 1.02 - r() * 1.10)),
    ...Array.from({ length: n1 }, () => newSpark(r, 1, 1.02 - r() * 1.10)),
    ...Array.from({ length: n2 }, () => newSpark(r, 2, 1.02 - r() * 1.10)),
  ]
}

export function Embers({ count = 110 }: { count?: number }) {
  const hostRef  = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { index, inView } = useSlide()
  const { current } = useDeck()
  const reduceMotion = useReducedMotion()
  const playing = index === current && inView && !reduceMotion
  const sparksRef = useRef<Spark[] | null>(null)

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
    const rand = mulberry32(0xf17e1234)

    if (!sparksRef.current) sparksRef.current = initSparks(count)
    const sparks = sparksRef.current

    const resize = () => {
      width  = host.offsetWidth
      height = host.offsetHeight
      canvas.width  = Math.max(1, Math.round(width  * dpr))
      canvas.height = Math.max(1, Math.round(height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      // scale factor so particles stay physically consistent at any canvas size
      const scale = Math.max(width, height * (16 / 9)) / 1920
      const sc = Math.max(0.65, scale)

      ctx.globalCompositeOperation = 'lighter'

      for (const s of sparks) {
        const sx = s.x * width
        const sy = s.y * height
        // Fade as sparks rise — full at y=0.65, zero at top
        const heightFade = Math.max(0, Math.min(1, s.y / 0.65))
        // Twinkle only on sharp layer 0 sparks
        const twinkle = s.layer === 0
          ? 0.28 + 0.72 * (0.5 + 0.5 * Math.sin(time * s.twinkleFreq * Math.PI * 2 + s.phase))
          : 1.0
        const a = s.alpha * heightFade * twinkle
        if (a < 0.005) continue

        if (s.layer === 0) {
          // Sharp spark: tight radial gradient — yellow-white core
          const outer = s.r * 2.8 * sc
          const g = ctx.createRadialGradient(sx, sy, 0, sx, sy, outer)
          g.addColorStop(0,    `rgba(255, 218, 100, ${a.toFixed(3)})`)
          g.addColorStop(0.28, `rgba(255, 155,  42, ${(a * 0.70).toFixed(3)})`)
          g.addColorStop(1,    'rgba(255,  85,  12, 0)')
          ctx.fillStyle = g
          ctx.beginPath()
          ctx.arc(sx, sy, outer, 0, Math.PI * 2)
          ctx.fill()
        } else if (s.layer === 1) {
          // Soft spark: wider gradient — simulates slight defocus
          const outer = s.r * 5.5 * sc
          const g = ctx.createRadialGradient(sx, sy, 0, sx, sy, outer)
          g.addColorStop(0,    `rgba(255, 128,  28, ${a.toFixed(3)})`)
          g.addColorStop(0.35, `rgba(240,  78,  14, ${(a * 0.52).toFixed(3)})`)
          g.addColorStop(1,    'rgba(200,  44,   8, 0)')
          ctx.fillStyle = g
          ctx.beginPath()
          ctx.arc(sx, sy, outer, 0, Math.PI * 2)
          ctx.fill()
        } else {
          // Bokeh disc: near-flat centre, soft diffuse edge
          const drawR = s.r * sc
          const g = ctx.createRadialGradient(sx, sy, drawR * 0.15, sx, sy, drawR)
          g.addColorStop(0,    `rgba(215, 62,  18, ${a.toFixed(3)})`)
          g.addColorStop(0.55, `rgba(182, 42,  10, ${(a * 0.68).toFixed(3)})`)
          g.addColorStop(1,    'rgba(150, 20,   5, 0)')
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

      for (const s of sparks) {
        s.y += s.vy * dt
        s.x += (s.vxBase + lateralNoise(time, s.noisePhase) * 0.018) * dt
        if (s.x < -0.1) s.x = -0.1
        if (s.x >  1.1) s.x =  1.1

        // Respawn at bottom when spark exits top
        if (s.y < -0.08) {
          const f = newSpark(rand, s.layer)
          s.x = f.x; s.y = f.y; s.vy = f.vy; s.vxBase = f.vxBase
          s.r = f.r; s.alpha = f.alpha; s.phase = f.phase
          s.twinkleFreq = f.twinkleFreq; s.noisePhase = f.noisePhase
        }
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
  }, [playing])  // sparks are in a ref — intentionally excluded

  // Fade sparks near very top so they don't fight with the slide header
  const maskImage = 'linear-gradient(to top, black 0%, black 18%, rgba(0,0,0,0.55) 48%, rgba(0,0,0,0.12) 70%, transparent 88%)'

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
