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
  /** 'default' = rede slate; 'ember' = fagulhas laranjas no terço inferior; 'sky' = rede fria azulada */
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
  /** ember: fase da oscilação senoidal lateral */
  phase: number
  /** ember: frequência da oscilação (ciclos/s) */
  sineFreq: number
  /** ember: amplitude da velocidade lateral */
  sineAmp: number
  /** ember: 0 = laranja profundo, 1 = amarelo-laranja */
  tint: number
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

    if (isEmber) {
      // Nasce concentrado no terço inferior (y ∈ [0.65, 1.0])
      return {
        x: rand(),
        y: 0.65 + rand() * 0.35,
        vx: 0,
        vy: -(0.005 + rand() * 0.010), // lenta subida; velocidades diferentes entre si
        r: 0.7 + rand() * 2.3,          // 0.7 – 3.0 px
        a: 0.2 + rand() * 0.6,          // 0.2 – 0.8
        bright: rand() < 0.18,          // poucas maiores e mais brilhantes
        phase: rand() * Math.PI * 2,
        sineFreq: 0.25 + rand() * 0.45, // 0.25 – 0.70 Hz — deriva lenta
        sineAmp: 0.012 + rand() * 0.016, // amplitude de oscilação lateral
        tint: rand(),                    // 0 = laranja profundo, 1 = amarelado
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
      phase: 0,
      sineFreq: 0,
      sineAmp: 0,
      tint: 0,
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
    let time = 0 // tempo acumulado para cálculo senoidal

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
          // O canvas já é mascarado; topFade como camada extra de segurança
          const topFade = Math.min(1, p.y / 0.45)
          const alpha = +(p.a * Math.max(0, topFade)).toFixed(3)
          if (alpha <= 0) continue

          // Cor varia de laranja profundo (tint=0) → amarelo-laranja (tint=1)
          const cr = Math.round(235 + p.tint * 20)  // 235-255
          const cg = Math.round(72 + p.tint * 118)  // 72-190
          const cb = Math.round(12 + p.tint * 48)   // 12-60
          colorStr = `rgba(${cr}, ${cg}, ${cb}, ${alpha})`

          // Partículas grandes e brilhantes ganham glow (halo suave via shadowBlur)
          if (p.bright && p.r > 1.8) {
            ctx.shadowBlur = 7 * scale
            ctx.shadowColor = `rgba(255, 140, 30, ${(alpha * 0.55).toFixed(3)})`
          }
        } else if (mode === 'sky') {
          colorStr = p.bright
            ? `rgba(220, 232, 255, ${p.a.toFixed(3)})`
            : `rgba(185, 205, 240, ${(p.a * 0.8).toFixed(3)})`
        } else {
          colorStr = p.bright
            ? `rgba(249, 251, 255, ${p.a})`
            : `rgba(185, 195, 220, ${(p.a * 0.8).toFixed(3)})`
        }

        ctx.fillStyle = colorStr
        ctx.beginPath()
        ctx.arc(x, y, p.r * Math.max(0.7, scale), 0, Math.PI * 2)
        ctx.fill()

        // Reseta o glow para não contaminar a próxima partícula
        if (ctx.shadowBlur !== 0) ctx.shadowBlur = 0
      }
    }

    const step = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      time += dt

      if (mode === 'ember') {
        for (const p of particles) {
          // Subida lenta
          p.y += p.vy * dt
          // Oscilação senoidal lateral — sem trajetória reta
          p.x += Math.sin(time * p.sineFreq * Math.PI * 2 + p.phase) * p.sineAmp * dt
          // Reinicia na base ao sair pelo topo
          if (p.y < -0.06) {
            p.y = 0.70 + Math.random() * 0.28
            p.x = Math.random()
            p.a = 0.2 + Math.random() * 0.6
            p.vy = -(0.005 + Math.random() * 0.010)
          }
          if (p.x < -0.05) p.x = 1.05
          if (p.x > 1.05) p.x = -0.05
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

  // Máscara vertical para ember: partículas somem bem antes da metade do slide
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
