import { useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useRef } from 'react'
import { useDeck, useSlide } from '@/lib/deck'
import { cn } from '@/lib/utils'

/*
 * Constelação / partículas (design-system.md §8.2): pontos e linhas finas em slate sobre navy,
 * com um núcleo mais denso e vinheta radial. Deriva lenta só no slide atual; sutil, atrás do texto.
 */

interface ConstellationProps {
  /** centro do núcleo denso, em fração da largura/altura */
  focusX?: number
  focusY?: number
  count?: number
  seed?: number
  className?: string
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  a: number
  bright: boolean
}

function mulberry32(seed: number) {
  let t = seed >>> 0
  return () => {
    t = (t + 0x6d2b79f5) >>> 0
    let r = Math.imul(t ^ (t >>> 15), 1 | t)
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
}

function createParticles(count: number, focusX: number, focusY: number, seed: number) {
  const rand = mulberry32(seed)
  const gauss = () => Math.sqrt(-2 * Math.log(rand() || 1e-6)) * Math.cos(2 * Math.PI * rand())
  return Array.from({ length: count }, (_, i): Particle => {
    // 60% no núcleo (gaussiana), 40% espalhados
    const core = i < count * 0.6
    const x = core ? focusX + gauss() * 0.16 : rand()
    const y = core ? focusY + gauss() * 0.2 : rand()
    return {
      x,
      y,
      vx: (rand() - 0.5) * 0.008,
      vy: (rand() - 0.5) * 0.008,
      r: 0.8 + rand() * 1.4,
      a: 0.35 + rand() * 0.55,
      bright: rand() < 0.14,
    }
  })
}

export function Constellation({ focusX = 0.72, focusY = 0.45, count = 120, seed = 7, className }: ConstellationProps) {
  const hostRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { index, inView } = useSlide()
  const { current } = useDeck()
  const reduceMotion = useReducedMotion()
  const playing = index === current && inView && !reduceMotion

  const particles = useMemo(() => createParticles(count, focusX, focusY, seed), [count, focusX, focusY, seed])

  useEffect(() => {
    const host = hostRef.current
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!host || !canvas || !ctx) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let width = 0
    let height = 0
    let frame = 0
    let last = performance.now()

    const resize = () => {
      width = host.offsetWidth
      height = host.offsetHeight
      canvas.width = Math.max(1, Math.round(width * dpr))
      canvas.height = Math.max(1, Math.round(height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      const scale = Math.max(width, height * (16 / 9)) / 1920
      const linkDistance = 150 * scale
      const pts = particles.map((p) => ({ x: p.x * width, y: p.y * height, p }))

      ctx.lineWidth = Math.max(0.6, 0.9 * scale)
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x
          const dy = pts[i].y - pts[j].y
          const d = Math.hypot(dx, dy)
          if (d > linkDistance) continue
          const alpha = Math.pow(1 - d / linkDistance, 1.6) * 0.32
          ctx.strokeStyle = `rgba(143, 156, 196, ${alpha.toFixed(3)})`
          ctx.beginPath()
          ctx.moveTo(pts[i].x, pts[i].y)
          ctx.lineTo(pts[j].x, pts[j].y)
          ctx.stroke()
        }
      }

      for (const { x, y, p } of pts) {
        ctx.fillStyle = p.bright ? `rgba(249, 251, 255, ${p.a})` : `rgba(185, 195, 220, ${(p.a * 0.8).toFixed(3)})`
        ctx.beginPath()
        ctx.arc(x, y, p.r * Math.max(0.7, scale), 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const step = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      for (const p of particles) {
        p.x += p.vx * dt
        p.y += p.vy * dt
        if (p.x < -0.05) p.x = 1.05
        if (p.x > 1.05) p.x = -0.05
        if (p.y < -0.05) p.y = 1.05
        if (p.y > 1.05) p.y = -0.05
      }
      draw()
      frame = requestAnimationFrame(step)
    }

    const observer = new ResizeObserver(() => {
      resize()
      draw()
    })
    observer.observe(host)
    resize()
    draw()
    if (playing) frame = requestAnimationFrame(step)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [particles, playing])

  const fx = `${Math.round(focusX * 100)}%`
  const fy = `${Math.round(focusY * 100)}%`

  return (
    <div
      ref={hostRef}
      aria-hidden
      className={cn('h-full w-full', className)}
      style={{
        maskImage: `radial-gradient(ellipse 60% 70% at ${fx} ${fy}, black 0%, rgb(0 0 0 / 0.6) 45%, transparent 80%)`,
        WebkitMaskImage: `radial-gradient(ellipse 60% 70% at ${fx} ${fy}, black 0%, rgb(0 0 0 / 0.6) 45%, transparent 80%)`,
      }}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  )
}
