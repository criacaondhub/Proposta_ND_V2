import type { ReactNode } from 'react'
import { CONFIG, SITE } from '@/config/content'
import { useDeck, useSlide } from '@/lib/deck'
import { cn, pad2 } from '@/lib/utils'
import { Logo } from './Logo'

export type SlideTheme = 'dark' | 'light'

interface SlideProps {
  children: ReactNode
  /** ritmo escuro ↔ claro do design system */
  theme?: SlideTheme
  /** camada de fundo full-bleed (constelação, glow de tela inteira, agenda) */
  background?: ReactNode
  /** ornamentos posicionados no palco 1920×1080, atrás do conteúdo */
  decor?: ReactNode
  /** rodapé com logo, @ e paginação (todos menos a capa) */
  footer?: boolean
  className?: string
}

/*
 * Slide — no desktop, um palco fixo de 1920×1080 (margens 120/96/80 do design system)
 * reduzido para caber na tela; no celular, o mesmo conteúdo em fluxo vertical.
 */
export function Slide({ children, theme = 'dark', background, decor, footer = true, className }: SlideProps) {
  const { index, label } = useSlide()
  const { total } = useDeck()

  return (
    <section
      data-slide={index}
      data-theme={theme}
      aria-roledescription="slide"
      aria-label={`${pad2(index + 1)} ${SITE.slideOf} ${pad2(total)} · ${label}`}
      className="relative isolate flex min-h-svh w-full shrink-0 snap-start snap-always flex-col overflow-hidden bg-surface text-ink lg:h-svh lg:min-h-0 lg:items-center lg:justify-center"
    >
      {background && (
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          {background}
        </div>
      )}
      <div className="nd-stage relative flex w-full flex-1 flex-col lg:h-[1080px] lg:w-[1920px] lg:flex-none lg:shrink-0">
        {decor && (
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-visible">
            {decor}
          </div>
        )}
        <div className={cn('relative flex flex-1 flex-col px-slide-x pt-slide-t pb-slide-b', className)}>{children}</div>
        {footer && (
          <footer className="relative flex items-center justify-between gap-4 px-slide-x pb-8 lg:absolute lg:inset-x-0 lg:bottom-0 lg:h-[80px] lg:pb-0">
            <Logo theme={theme} className="h-5 lg:h-6" />
            <p className="flex items-center gap-3 text-note text-ink-muted lg:gap-4">
              <span>{CONFIG.INSTAGRAM}</span>
              <span aria-hidden className="h-4 w-px bg-line" />
              <span className="tabular-nums">
                <span className="text-ink">{pad2(index + 1)}</span> / {pad2(total)}
              </span>
            </p>
          </footer>
        )}
      </div>
    </section>
  )
}
