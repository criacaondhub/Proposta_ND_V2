import { Check, Clock, Wallet } from 'lucide-react'
import { INVESTIMENTO } from '@/config/content'
import { Chip } from '@/components/ui/Atoms'
import { Card } from '@/components/ui/Card'
import { Reveal } from '@/components/ui/Reveal'
import { Slide } from '@/components/ui/Slide'
import { Eyebrow, Title } from '@/components/ui/Typography'

// 23 · Investimento — resumo do contrato (5/12) + 2 cards de preço: cartão em destaque e boleto (7/12)
export function Investimento() {
  const { eyebrow, summary, payTitle, card, boleto, footer } = INVESTIMENTO

  return (
    <Slide theme="light">
      <Reveal order={0}>
        <Eyebrow text={eyebrow} />
      </Reveal>

      <div className="mt-5 grid flex-1 gap-6 lg:mt-8 lg:grid-cols-12 lg:gap-8">
        <Reveal order={1} className="flex lg:col-span-5">
          <Card className="flex w-full flex-col lg:p-10">
            <p className="nd-eyebrow text-ink-muted">{summary.eyebrow}</p>
            <Title text={summary.title} size="h3" className="mt-3 lg:text-[34px]" />
            <ul className="mt-5 flex flex-col divide-y divide-line/70 lg:mt-8">
              {summary.items.map(([item, frequency]) => (
                <li key={item} className="flex items-start gap-3 py-2.5 lg:py-[18px]">
                  <Check aria-hidden className="mt-[0.2em] size-[1.05em] shrink-0 text-orange-soft" strokeWidth={3} />
                  <span className="flex-1 text-body-sm text-ink lg:text-[22px]">{item}</span>
                  <span className="pt-[0.15em] text-note whitespace-nowrap text-ink-muted">{frequency}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 flex items-start gap-2 text-note text-ink-muted lg:mt-auto lg:pt-5">
              <Wallet aria-hidden className="mt-0.5 size-[1.1em] shrink-0 text-orange" strokeWidth={1.75} />
              {summary.note}
            </p>
          </Card>
        </Reveal>

        <div className="flex flex-col lg:col-span-7">
          <Reveal order={2}>
            <p className="nd-eyebrow text-ink-muted">{payTitle}</p>
          </Reveal>
          <div className="mt-6 grid flex-1 gap-6 lg:mt-8 lg:grid-cols-[1.35fr_1fr] lg:items-center">
            <Reveal step={1} className="flex">
              <div
                data-theme="dark"
                className="nd-card-featured relative w-full p-6 pt-8 shadow-float [--featured-bg:var(--color-navy-900)] lg:p-10 lg:pt-12"
              >
                <Chip variant="orange" className="absolute -top-3.5 left-6 uppercase shadow-cta lg:-top-5 lg:left-10">
                  {card.badge}
                </Chip>
                <p className="text-body-sm font-bold text-ink">{card.label}</p>
                <p className="mt-3 flex flex-wrap items-baseline gap-x-3 text-ink lg:mt-5">
                  <span className="text-[1.75rem] font-bold tracking-[-0.02em] lg:text-[44px]">{card.installments}</span>
                  <span className="text-[3rem] leading-none font-bold tracking-[-0.03em] tabular-nums lg:text-[72px]">{card.value}</span>
                </p>
                <p className="mt-2 text-body-sm text-ink-muted lg:mt-3">{card.total}</p>
                <div className="mt-5 flex flex-col items-start gap-2 lg:mt-7 lg:gap-3">
                  <Chip variant="tint">{card.saving}</Chip>
                  <p className="text-body-sm text-ink-soft">{card.monthly}</p>
                </div>
                <p className="mt-5 flex items-center gap-2 border-t border-line pt-4 text-body-sm font-bold text-orange-soft lg:mt-7 lg:pt-5">
                  <Clock aria-hidden className="size-[1.1em] shrink-0" strokeWidth={2} />
                  {card.urgency}
                </p>
              </div>
            </Reveal>

            <Reveal step={2} className="flex">
              <Card className="w-full lg:p-8">
                <p className="text-body-sm font-bold text-ink">{boleto.label}</p>
                <p className="mt-3 text-[2.25rem] leading-none font-bold tracking-[-0.03em] text-ink tabular-nums lg:mt-4 lg:text-[52px]">
                  {boleto.value}
                </p>
                <p className="mt-2 text-body-sm text-ink-muted">
                  {boleto.unit} {boleto.detail}
                </p>
                <p className="mt-5 border-t border-line pt-4 text-body-sm font-bold text-ink/80">{boleto.total}</p>
              </Card>
            </Reveal>
          </div>
        </div>
      </div>

      <Reveal step={2} className="mt-6 lg:mt-8">
        <p className="text-center text-body text-ink-muted">{footer}</p>
      </Reveal>
    </Slide>
  )
}
