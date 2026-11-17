import { useId, useState, type PointerEvent } from 'react'
import { cn } from '@/lib/utils'

/*
 * Minigráfico de linha (série única): linha de 2px em laranja, área com degradê translúcido,
 * grade recessiva, marcador ≥ 9px no último ponto com anel na cor da superfície, rótulo direto
 * só no último valor e tooltip com crosshair no hover. Textos usam tokens de texto, não a cor da série.
 */

interface SparklineProps {
  data: readonly number[]
  format: (value: number) => string
  /** rótulo de cada ponto no tooltip (ex.: "há 3 dias") */
  pointLabel: (index: number) => string
  startLabel: string
  endLabel: string
  ariaLabel: string
  className?: string
}

const W = 880
const H = 240
const PAD = { top: 20, right: 16, bottom: 16, left: 16 }

export function Sparkline({ data, format, pointLabel, startLabel, endLabel, ariaLabel, className }: SparklineProps) {
  const gradientId = useId()
  const [hover, setHover] = useState<number | null>(null)

  const min = Math.min(...data)
  const max = Math.max(...data)
  const span = max - min || 1
  const lo = min - span * 0.25
  const hi = max + span * 0.15
  const x = (i: number) => PAD.left + (i / (data.length - 1)) * (W - PAD.left - PAD.right)
  const y = (v: number) => PAD.top + (1 - (v - lo) / (hi - lo)) * (H - PAD.top - PAD.bottom)

  const line = data.map((v, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ')
  const area = `${line} L${x(data.length - 1).toFixed(1)},${H - PAD.bottom} L${x(0).toFixed(1)},${H - PAD.bottom} Z`
  const last = data.length - 1
  const active = hover ?? last

  const onMove = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const ratio = (event.clientX - rect.left) / rect.width
    const svgX = ratio * W
    const index = Math.round(((svgX - PAD.left) / (W - PAD.left - PAD.right)) * (data.length - 1))
    setHover(Math.min(Math.max(index, 0), last))
  }

  const pct = (value: number, total: number) => `${(value / total) * 100}%`

  return (
    <figure className={cn('relative', className)}>
      <div className="relative" onPointerMove={onMove} onPointerLeave={() => setHover(null)}>
        <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full overflow-visible" role="img" aria-label={ariaLabel}>
          <defs>
            <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#ff4800" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#ff4800" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* grade recessiva */}
          {[0.25, 0.5, 0.75].map((t) => (
            <line
              key={t}
              x1={PAD.left}
              x2={W - PAD.right}
              y1={PAD.top + t * (H - PAD.top - PAD.bottom)}
              y2={PAD.top + t * (H - PAD.top - PAD.bottom)}
              className="stroke-line"
              strokeWidth={1}
              strokeDasharray="4 6"
            />
          ))}
          <line x1={PAD.left} x2={W - PAD.right} y1={H - PAD.bottom} y2={H - PAD.bottom} className="stroke-line" strokeWidth={1} />
          <path d={area} fill={`url(#${gradientId})`} />
          <path d={line} fill="none" stroke="#ff4800" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
          {hover !== null && (
            <line x1={x(hover)} x2={x(hover)} y1={PAD.top} y2={H - PAD.bottom} className="stroke-ink-muted" strokeWidth={1} strokeDasharray="3 4" />
          )}
          {/* marcador com anel na cor do card */}
          <circle cx={x(active)} cy={y(data[active])} r={6} fill="#ff4800" stroke="var(--card-bg)" strokeWidth={3} />
        </svg>

        {/* rótulo direto do ponto ativo (último valor por padrão; o do hover no hover) */}
        <div
          className="pointer-events-none absolute -translate-x-full -translate-y-[130%] rounded-md border border-line bg-surface px-2.5 py-1 text-note whitespace-nowrap text-ink shadow-float"
          style={{ left: pct(x(active), W), top: pct(y(data[active]), H) }}
        >
          {hover !== null && <span className="text-ink-muted">{pointLabel(hover)} · </span>}
          <span className="font-bold tabular-nums">{format(data[active])}</span>
        </div>
      </div>
      <figcaption className="mt-2 flex justify-between text-note text-ink-muted">
        <span>{startLabel}</span>
        <span>{endLabel}</span>
      </figcaption>
    </figure>
  )
}
