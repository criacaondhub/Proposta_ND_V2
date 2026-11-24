import { useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useRef } from 'react'
import { useDeck, useSlide } from '@/lib/deck'
import { cn } from '@/lib/utils'

export type ConstellationMode = 'default' | 'ember' | 'sky'

interface ConstellationProps {
  focusX?: number
  focusY?: number
  count?: number
  seed?: number
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
  phase: number
  sineFreq: number
  sineAmp: number
  tint: number
  /** ember: labarada (teardrop) vs fagulha (circle) */
  isFlame: boolean
  /** ember: ângulo de inclinação atual (oscila para simular tremular) */
  rotation: number
  /** ember: velocidade de rotação de base */
  rotVel: number
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
    if (mode === 'ember') {
      const isFlame = rand() < 0.4 // 40% labaradas, 60% fagulhas

      return {
        // labaradas concentradas no centro-baixo; fagulhas mais espalhadas
        x: isFlame ? 0.2 + rand() * 0.6 : rand(),
        y: isFlame ? 0.78 + rand() * 0.20 : 0.70 + rand() * 0.28,
        vx: 0,
        // labaradas sobem mais devagar; fagulhas são mais rápidas e variadas
        vy: isFlame ? -(0.003 + rand() * 0.007) : -(0.006 + rand() * 0.014),
        // labaradas grandes; fagulhas bem pequenas
        r: isFlame ? 5 + rand() * 11 : 0.6 + rand() * 1.8,
        a: isFlame ? 0.45 + rand() * 0.40 : 0.20 + rand() * 0.60,
        bright: !isFlame && rand() < 0.20,
        phase: rand() * Math.PI * 2,
        sineFreq: isFlame ? 0.4 + rand() * 0.6 : 0.25 + rand() * 0.45,
        sineAmp: isFlame ? 0.006 + rand() * 0.010 : 0.012 + rand() * 0.016,
        tint: rand(),
        isFlame,
        rotation: (rand() - 0.5) * 0.6,
        rotVel: (rand() - 0.5) * 1.8,
      }
    }

    const core = i < count * 0.6
    const baseSpeed = mode === 'sky' ? 0.005 : 0.008
    return {
      x: core ? focusX + gauss() * 0.16 : rand(),
      y: core ? focusY + gauss() * 0.2 : rand(),
      vx: (rand() - 0.5) * baseSpeed,
      vy: (rand() - 0.5) * baseSpeed,
      r: 0.8 + rand() * 1.4,
      a: 0.35 + rand() * 0.55,
      bright: rand() < 0.14,
      phase: 0, sineFreq: 0, sineAmp: 0, tint: 0,
      isFlame: false, rotation: 0, rotVel: 0,
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
    let time = 0

    const resize = () => {
      width = host.offsetWidth
      height = host.offsetHeight
      canvas.width = Math.max(1, Math.round(width * dpr))
      canvas.height = Math.max(1, Math.round(height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const drawFlame = (
      x: number,
      y: number,
      r: number,
      alpha: number,
      tint: number,
      rotation: number,
      sc: number,
    ) => {
      const h = r * 3.2 * sc  // altura da labarada
      const w = r * 1.05 * sc // largura na base

      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)

      // Halo suave (glow ao redor da labarada)
      const glow = ctx.createLinearGradient(0, h * 0.4, 0, -h * 0.7)
      glow.addColorStop(0, `rgba(255, 130, 20, ${(alpha * 0.18).toFixed(3)})`)
      glow.addColorStop(1, 'rgba(200, 40, 5, 0)')
      ctx.fillStyle = glow
      ctx.beginPath()
      ctx.moveTo(0, h * 0.6)
      ctx.bezierCurveTo( w * 1.7, h * 0.1,  w * 0.9, -h * 0.7, 0, -h * 0.9)
      ctx.bezierCurveTo(-w * 0.9, -h * 0.7, -w * 1.7, h * 0.1, 0, h * 0.6)
      ctx.closePath()
      ctx.fill()

      // Corpo da labarada com gradiente amarelo→laranja→transparente
      const g2 = Math.round(170 + tint * 65) // 170–235 (mais amarelo quando tint=1)
      const grad = ctx.createLinearGradient(0, h * 0.35, 0, -h * 0.65)
      grad.addColorStop(0,    `rgba(255, ${g2}, 25, ${alpha.toFixed(3)})`)
      grad.addColorStop(0.35, `rgba(249, ${Math.round(90 + tint * 65)}, 15, ${(alpha * 0.75).toFixed(3)})`)
      grad.addColorStop(0.75, `rgba(220, 50, 8, ${(alpha * 0.35).toFixed(3)})`)
      grad.addColorStop(1,    'rgba(180, 25, 5, 0)')
      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.moveTo(0, h * 0.35)
      ctx.bezierCurveTo( w, h * 0.05,  w * 0.5, -h * 0.50, 0, -h * 0.65)
      ctx.bezierCurveTo(-w * 0.5, -h * 0.50, -w, h * 0.05, 0, h * 0.35)
      ctx.closePath()
      ctx.fill()

      ctx.restore()
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      const scale = Math.max(width, height * (16 / 9)) / 1920
      const sc = Math.max(0.7, scale)
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
        if (mode === 'ember') {
          // Fade extra via posição (máscara CSS já cobre a maior parte)
          const topFade = Math.min(1, p.y / 0.42)
          const alpha = p.a * Math.max(0, topFade)
          if (alpha < 0.01) continue

          if (p.isFlame) {
            drawFlame(x, y, p.r, alpha, p.tint, p.rotation, sc)
          } else {
            // Fagulha: círculo pequeno com cor variada
            const cr = Math.round(235 + p.tint * 20)
            const cg = Math.round(70 + p.tint * 120)
            const cb = Math.round(10 + p.tint * 50)
            const a = alpha.toFixed(3)
            if (p.bright) {
              ctx.shadowBlur = 5 * sc
              ctx.shadowColor = `rgba(255, 160, 30, ${(alpha * 0.6).toFixed(3)})`
            }
            ctx.fillStyle = `rgba(${cr}, ${cg}, ${cb}, ${a})`
            ctx.beginPath()
            ctx.arc(x, y, p.r * sc, 0, Math.PI * 2)
            ctx.fill()
            if (ctx.shadowBlur !== 0) ctx.shadowBlur = 0
          }
        } else if (mode === 'sky') {
          const colorStr = p.bright
            ? `rgba(220, 232, 255, ${p.a.toFixed(3)})`
            : `rgba(185, 205, 240, ${(p.a * 0.8).toFixed(3)})`
          ctx.fillStyle = colorStr
          ctx.beginPath()
          ctx.arc(x, y, p.r * Math.max(0.7, scale), 0, Math.PI * 2)
          ctx.fill()
        } else {
          ctx.fillStyle = p.bright
            ? `rgba(249, 251, 255, ${p.a})`
            : `rgba(185, 195, 220, ${(p.a * 0.8).toFixed(3)})`
          ctx.beginPath()
          ctx.arc(x, y, p.r * Math.max(0.7, scale), 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    const step = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      time += dt

      if (mode === 'ember') {
        for (const p of particles) {
          p.y += p.vy * dt
          // Oscilação senoidal lateral
          p.x += Math.sin(time * p.sineFreq * Math.PI * 2 + p.phase) * p.sineAmp * dt
          // Rotação oscilante (tremular da chama)
          p.rotation += p.rotVel * dt
          p.rotation += Math.sin(time * p.sineFreq * 2.2 * Math.PI + p.phase + 1.1) * 0.9 * dt

          if (p.y < -0.08) {
            p.y = p.isFlame ? 0.78 + Math.random() * 0.20 : 0.70 + Math.random() * 0.28
            p.x = p.isFlame ? 0.2 + Math.random() * 0.6 : Math.random()
            p.a = p.isFlame ? 0.45 + Math.random() * 0.40 : 0.20 + Math.random() * 0.60
            p.vy = p.isFlame ? -(0.003 + Math.random() * 0.007) : -(0.006 + Math.random() * 0.014)
            p.rotation = (Math.random() - 0.5) * 0.6
          }
          if (p.x < -0.06) p.x = 1.06
          if (p.x > 1.06) p.x = -0.06
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
      ? 'linear-gradient(to top, black 0%, black 22%, rgba(0,0,0,0.65) 38%, rgba(0,0,0,0.12) 50%, transparent 60%)'
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
