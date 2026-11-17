import { motion } from 'framer-motion'
import { SITE } from '@/config/content'
import { useDeck } from '@/lib/deck'

const EASE = [0.22, 1, 0.36, 1] as const

/*
 * Gravatinha: o triângulo do monograma N·D do logo (36,25 × 64,62 no SVG oficial),
 * duplicado e espelhado — os dois de frente um para o outro, pontas se tocando.
 */
function BowTie({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 72.5 64.62" aria-hidden className={className}>
      <path d="M0 0 L36.25 32.31 L0 64.62 Z M72.5 0 L36.25 32.31 L72.5 64.62 Z" fill="currentColor" />
    </svg>
  )
}

/* Barra de progresso na base: trilho em line, preenchimento no gradiente CTA e a gravatinha na ponta */
export function DeckProgress() {
  const { current, total } = useDeck()
  const last = current === total - 1

  return (
    <div
      data-deck-chrome
      role="progressbar"
      aria-label={SITE.progressLabel}
      aria-valuemin={1}
      aria-valuemax={total}
      aria-valuenow={current + 1}
      className="pointer-events-none fixed inset-x-0 bottom-0 z-40 h-[18px] lg:h-[22px]"
    >
      <div className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 bg-ink-muted/15">
        <motion.div
          className="relative h-full bg-linear-to-r from-orange-start to-orange"
          initial={false}
          animate={{ width: `${((current + 1) / total) * 100}%` }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          {/* centrada na ponta da barra; no último slide encosta na borda para não cortar */}
          <motion.span
            className="absolute top-1/2 right-0 block -translate-y-1/2 text-orange drop-shadow-[0_0_6px_rgb(255_72_0/0.6)]"
            initial={false}
            animate={{ x: last ? '0%' : '50%' }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <BowTie className="block h-[14px] w-auto lg:h-[18px]" />
          </motion.span>
        </motion.div>
      </div>
    </div>
  )
}
