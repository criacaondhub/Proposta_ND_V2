import { ChevronLeft, ChevronRight } from 'lucide-react'
import { SITE } from '@/config/content'
import { useDeck } from '@/lib/deck'

// Discretas: só o ícone apagado; borda e fundo aparecem no hover. Área de clique de 44px.
const arrowClass =
  'pointer-events-auto grid size-11 place-items-center rounded-full border border-transparent text-ink-muted/70 transition-[color,border-color,background-color,opacity] duration-300 hover:border-ink-muted/30 hover:bg-ink-muted/10 hover:text-orange disabled:pointer-events-none disabled:opacity-0'

/* Setas laterais: telas ≥ 1024px com mouse ou trackpad (no touch a navegação é por swipe/scroll) */
export function DeckArrows() {
  const { canPrev, canNext, prev, next } = useDeck()

  return (
    <div
      data-deck-chrome
      className="pointer-events-none fixed inset-y-0 inset-x-0 z-30 hidden items-center justify-between px-2 lg:pointer-fine:flex"
    >
      <button type="button" onClick={prev} disabled={!canPrev} aria-label={SITE.prevLabel} className={arrowClass}>
        <ChevronLeft aria-hidden className="size-5" strokeWidth={1.75} />
      </button>
      <button type="button" onClick={next} disabled={!canNext} aria-label={SITE.nextLabel} className={arrowClass}>
        <ChevronRight aria-hidden className="size-5" strokeWidth={1.75} />
      </button>
    </div>
  )
}
