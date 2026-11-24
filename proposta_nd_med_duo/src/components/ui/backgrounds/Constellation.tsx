import { useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useRef } from 'react'
import { useDeck, useSlide } from '@/lib/deck'
import { cn } from '@/lib/utils'

export type ConstellationMode = 'default' | 'ember' | 'sky'

interface ConstellationProps {
  /** centro do núcleo denso, em fração da largura/altura */
  focusX?: number
  focusY?: number
  count?: number
  seed?: number
  /** 'default' = rede slate; 'ember' = fagulhas laranjas subindo; 'sky' = rede fria azulada */
  mode?: ConstellationMode
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

function createParticles(
  count: number,
  focusX: number,
  focusY: number,
  seed: number,
  mode: ConstellationMode,
): Particle[] {
  const rand = mulberry32(seed)
  const gauss = () => Math.sqrt(-2 * Math.log(rand() || 1e-6)) * Math.cos(2 * Math.PI * rand())
  return Array.from({ length: count }, (_, i): Particle => {
    const isEmber = mode === 'ember'
    const core = !isEmber && i < count * 0.6
    const x = core ? focusX + gauss() * 0.16 : rand()
    const y = core ? focusY + gauss() * 0.2 : rand()
    const baseSpeed = isEmber ? 0.004 : mode === 'sky' ? 0.005 : 0.008
    const vx = (rand() - 0.5) * baseSpeed
    const vy = isEmber
      ? -(0.012 + rand() * 0.018) // sempre sobe
      : (rand() - 0.5) * baseSpeed
    return {
      x,
      y,
      vx,
      vy,
      r: isEmber ? 1.0 + rand() * 2.2 : 0.8 + rand() * 1.4,
      a: 0.4 + rand() * 0.5,
      bright: rand() < (isEmber ? 0.25 : 0.14),
    }
  })
}

export function Constellation({
  focusX = 0.72,
  focusY = 0.45,
  count = 120,
  seed = 7,
  mode = 'default',
  className,
}: ConstellationProps) {
  const hostRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { index, inView } = useSlide()
  const { current } = useDeck()
  const reduceMotion = useReducedMotion()
  const playing = index === current && inView && !reduceMotion

  const particles = useMemo(
    () => createParticles(count, focusX, focusY, seed, mode),
    [count, focusX, focusY, seed, mode],
  )

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
      const pts = particles.map((p) => ({ x: p.x * width, y: p.y * height, p }))

      // Linhas — apenas nos modos default e sky
      if (mode !== 'ember') {
        const linkDistance = 150 * scale
        ctx.lineWidth = Math.max(0.6, 0.9 * scale)
        const [lr, lg, lb] = mode === 'sky' ? [147, 197, 253] : [143, 156, 196]
        const lineAlphaBase = mode === 'sky' ? 0.26 : 0.32
        for (let i = 0; i < pts.length; i++) {
          for (let j = i + 1; j < pts.length; j++) {
            const dx = pts[i].x - pts[j].x
            const dy = pts[i].y - pts[j].y
            const d = Math.hypot(dx, dy)
            if (d > linkDistance) continue
            const alpha = Math.pow(1 - d / linkDistance, 1.6) * lineAlphaBase
            ctx.strokeStyle = `rgba(${lr}, ${lg}, ${lb}, ${alpha.toFixed(3)})`
            ctx.beginPath()
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.stroke()
          }
        }
      }

      // Partículas
      for (const { x, y, p } of pts) {
        let colorStr: string
        if (mode === 'ember') {
          const topFade = Math.min(1, p.y / 0.22)
          const alpha = (p.a * Math.max(0, topFade)).toFixed(3)
          colorStr = p.bright ? `rgba(255, 160, 50, ${alpha})` : `rgba(249, 100, 20, ${alpha})`
        } else if (mode === 'sky') {
          colorStr = p.bright
            ? `rgba(220, 232, 255, ${p.a.toFixed(3)})`
            : `rgba(185, 205, 240, ${(p.a * 0.8).toFixed(3)})`
        } else {
          colorStr = p.bright ? `rgba(249, 251, 255, ${p.a})` : `rgba(185, 195, 220, ${(p.a * 0.8).toFixed(3)})`
        }
        ctx.fillStyle = colorStr
        ctx.beginPath()
        ctx.arc(x, y, p.r * Math.max(0.7, scale), 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const step = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      if (mode === 'ember') {
        for (const p of particles) {
          p.x += p.vx * dt
          p.y += p.vy * dt // vy < 0 → sobe
          if (p.y < -0.08) {
            p.y = 1.02 + Math.random() * 0.12
            p.x = Math.random()
            p.a = 0.4 + Math.random() * 0.5
            p.vx = (Math.random() - 0.5) * 0.006
          }
          if (p.x < -0.08) p.x = 1.08
          if (p.x > 1.08) p.x = -0.08
        }
      } else {
        for (const p of particles) {
          p.x += p.vx * dt
          p.y += p.vy * dt
          if (p.x < -0.05) p.x = 1.05
          if (p.x > 1.05) p.x = -0.05
          if (p.y < -0.05) p.y = 1.05
          if (p.y > 1.05) p.y = -0.05
        }
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
  }, [particles, playing, mode])

  const maskImage =
    mode === 'ember'
      ? 'linear-gradient(to top, black 0%, black 55%, rgba(0,0,0,0.5) 75%, transparent 92%)'
      : mode === 'sky'
        ? 'radial-gradient(ellipse 85% 85% at 50% 50%, black 15%, rgba(0,0,0,0.55) 55%, transparent 85%)'
        : `radial-gradient(ellipse 60% 70% at ${Math.round(focusX * 100)}% ${Math.round(focusY * 100)}%, black 0%, rgb(0 0 0 / 0.6) 45%, transparent 80%)`

  return (
    <div
      ref={hostRef}
      aria-hidden
      className={cn('h-full w-full', className)}
      style={{ maskImage, WebkitMaskImage: maskImage }}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  )
}
