import { motion, useReducedMotion } from 'framer-motion'
import { Check } from 'lucide-react'
import { Fragment, useMemo } from 'react'
import { AGENDA } from '@/config/content'
import { useSlide } from '@/lib/deck'
import { cn } from '@/lib/utils'

/*
 * Grade "agenda" (design-system.md §8.1): SEG–SEX × horários, célula vazia tracejada e
 * célula "✓ Cliente" em laranja translúcido, preenchendo em sequência (stagger 70ms).
 * O tamanho do texto vem do font-size do container (className).
 */

interface AgendaGridProps {
  /** índices das células preenchidas (linha × nº de dias + coluna), na ordem de entrada */
  filled: readonly number[]
  days?: readonly string[]
  hours?: readonly string[]
  label?: string
  /** atraso antes da primeira célula (s) */
  delay?: number
  className?: string
}

export function AgendaGrid({ filled, days = AGENDA.days, hours = AGENDA.hours, label = AGENDA.label, delay = 0.4, className }: AgendaGridProps) {
  const { inView } = useSlide()
  const reduceMotion = useReducedMotion()
  const order = useMemo(() => new Map(filled.map((cell, i) => [cell, i])), [filled])

  return (
    <div
      className={cn('grid gap-[0.45em]', className)}
      style={{ gridTemplateColumns: `auto repeat(${days.length}, minmax(0, 1fr))` }}
    >
      <span />
      {days.map((day) => (
        <span key={day} className="pb-[0.2em] text-center text-[0.72em] font-bold tracking-[0.08em] text-ink-muted">
          {day}
        </span>
      ))}
      {hours.map((hour, row) => (
        <Fragment key={hour}>
          <span className="self-center pr-[0.5em] text-[0.72em] font-bold tracking-[0.08em] text-ink-muted tabular-nums">{hour}</span>
          {days.map((day, col) => {
            const position = order.get(row * days.length + col)
            return (
              <div key={day} className="relative aspect-[150/78]">
                <div className="nd-cell absolute inset-0" />
                {position !== undefined && (
                  <motion.div
                    data-reveal
                    className="nd-cell-filled absolute inset-0 flex items-center justify-center gap-[0.3em] font-bold"
                    initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.88 }}
                    animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: reduceMotion ? 1 : 0.88 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: inView ? delay + position * 0.07 : 0 }}
                  >
                    <Check aria-hidden className="size-[0.95em] text-orange-soft" strokeWidth={3} />
                    <span>{label}</span>
                  </motion.div>
                )}
              </div>
            )
          })}
        </Fragment>
      ))}
    </div>
  )
}
