import type { CSSProperties } from 'react'
import { ROI } from '@/config/content'
import { cn, splitCurrency } from '@/lib/utils'
import { Stat } from '@/components/ui/Atoms'
import { Card } from '@/components/ui/Card'
import { Reveal } from '@/components/ui/Reveal'
import { RichText } from '@/components/ui/RichText'
import { Slide } from '@/components/ui/Slide'
import { SlideHeader } from '@/components/ui/Typography'

// 24 · ROI — funil de 5 barras estreitando (a última em gradiente CTA) + card do ponto de equilíbrio
export function Roi() {
  const { eyebrow, title, funnel, breakEven, note } = ROI
  const total = splitCurrency(breakEven.total)

  return (
    <Slide>
      <SlideHeader eyebrow={eyebrow} title={title} />

      <div className="mt-8 grid flex-1 gap-6 lg:mt-10 lg:grid-cols-12 lg:items-center lg:gap-8">
        <ol className="flex flex-col gap-2 lg:col-span-7 lg:gap-3">
          {funnel.map((stage, i) => {
            const last = i === funnel.length - 1
            const Icon = stage.icon
            return (
              <Reveal
                as="li"
                key={stage.label}
                step={i + 1}
                className="lg:mx-auto lg:w-[var(--w)]"
                style={{ '--w': `${100 - i * 6}%` } as CSSProperties}
              >
                <div
                  className={cn(
                    'flex items-center gap-4 rounded-lg px-4 py-3 lg:gap-6 lg:px-7 lg:py-4',
                    last ? 'bg-linear-to-r from-orange-start to-orange text-on-accent shadow-cta' : 'nd-card',
                  )}
                >
                  <Icon aria-hidden className={cn('size-5 shrink-0 lg:size-8', last ? 'text-on-accent' : 'text-orange')} strokeWidth={1.75} />
                  <div className="min-w-0 flex-1">
                    <p className={cn('nd-eyebrow', last ? 'text-on-accent/85' : 'text-ink-muted')}>{stage.label}</p>
                    <p className={cn('mt-0.5 text-note', last ? 'text-on-accent' : 'text-ink-soft')}>{stage.text}</p>
                  </div>
                  <p className="text-[1.5rem] font-bold tracking-[-0.02em] whitespace-nowrap tabular-nums lg:text-[40px]">{stage.value}</p>
                </div>
              </Reveal>
            )
          })}
        </ol>

        <Reveal step={funnel.length + 1} className="flex lg:col-span-5">
          <Card variant="featured" className="w-full lg:p-10">
            <p className="nd-eyebrow text-orange-soft">{breakEven.eyebrow}</p>
            <p className="mt-4 text-body-sm text-ink-muted lg:mt-6">{breakEven.equationLabel}</p>
            <p className="mt-1 text-body font-bold text-ink tabular-nums">{breakEven.terms.join(' + ')} =</p>
            <Stat prefix={total.prefix} value={total.value} className="mt-2 text-ink" />
            <p className="mt-5 border-t border-line pt-5 text-body text-ink-soft lg:mt-6 lg:pt-6">
              <RichText text={breakEven.text} strongClassName="font-bold text-orange" />
            </p>
            <p className="mt-3 text-body-sm text-ink-muted">{breakEven.extra}</p>
          </Card>
        </Reveal>
      </div>

      <Reveal order={4} className="mt-6 lg:mt-8">
        <p className="max-w-[150ch] text-note text-ink-muted">{note}</p>
      </Reveal>
    </Slide>
  )
}
