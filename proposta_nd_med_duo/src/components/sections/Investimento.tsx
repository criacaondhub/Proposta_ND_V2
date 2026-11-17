import { AnimatePresence, motion } from 'framer-motion'
import { Check, Clock, Wallet } from 'lucide-react'
import { INVESTIMENTO } from '@/config/content'
import { useSlide } from '@/lib/deck'
import { Chip } from '@/components/ui/Atoms'
import { PatternRail } from '@/components/ui/backgrounds/PatternRail'
import { Card } from '@/components/ui/Card'
import { Reveal } from '@/components/ui/Reveal'
import { Slide } from '@/components/ui/Slide'
import { Title } from '@/components/ui/Typography'

const EASE = [0.22, 1, 0.36, 1] as const

// 23 · Investimento — H1/H2 à esquerda; à direita um box de oferta que troca a cada clique (boleto → cartão)
export function Investimento() {
  const { summary, payTitle, card, boleto, footer } = INVESTIMENTO
  const { revealed } = useSlide()
  const current: 'boleto' | 'card' = revealed >= 1 ? 'card' : 'boleto'

  return (
    <Slide theme="light" background={<PatternRail side="right" tone="orange" />}>
      <div className="grid flex-1 gap-8 lg:grid-cols-12 lg:items-center lg:gap-10">
        {/* Esquerda — cabeçalho + resumo do contrato */}
        <div className="flex flex-col lg:col-span-6">
          <Reveal order={0}>
            <p className="nd-eyebrow text-ink-muted">{summary.eyebrow}</p>
          </Reveal>
          <Reveal order={1} className="mt-3 lg:mt-4">
            <Title text={summary.title} size="title" className="lg:text-[56px]" />
          </Reveal>
          <Reveal order={2} className="mt-3 lg:mt-5">
            <p className="text-lead text-ink-muted">{payTitle}</p>
          </Reveal>

          <Reveal order={3} className="mt-6 lg:mt-8">
            <ul className="flex flex-col divide-y divide-line/70">
              {summary.items.map(([item, frequency]) => (
                <li key={item} className="flex items-start gap-3 py-2 lg:py-2.5">
                  <Check aria-hidden className="mt-[0.2em] size-[1em] shrink-0 text-orange-soft" strokeWidth={3} />
                  <span className="flex-1 text-body-sm text-ink lg:text-[18px]">{item}</span>
                  <span className="pt-[0.15em] text-note whitespace-nowrap text-ink-muted">{frequency}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal order={4} className="mt-4 lg:mt-6">
            <p className="flex items-start gap-2 text-note text-ink-muted">
              <Wallet aria-hidden className="mt-0.5 size-[1.1em] shrink-0 text-orange" strokeWidth={1.75} />
              {summary.note}
            </p>
          </Reveal>
        </div>

        {/* Direita — box fixo de oferta que troca entre boleto e cartão a cada clique */}
        <div className="flex items-center justify-center lg:col-span-6">
          <div className="relative w-full max-w-[440px] px-2 pt-8">
            <AnimatePresence mode="wait" initial={false}>
              {current === 'boleto' ? (
                <motion.div
                  key="boleto"
                  initial={{ y: -40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 40, opacity: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <Card className="w-full lg:p-9">
                    <p className="text-body-sm font-bold text-ink">{boleto.label}</p>
                    <p className="mt-3 text-[2.25rem] leading-none font-bold tracking-[-0.03em] text-ink tabular-nums lg:mt-5 lg:text-[64px]">
                      {boleto.value}
                    </p>
                    <p className="mt-2 text-body-sm text-ink-muted lg:mt-3">
                      {boleto.unit} {boleto.detail}
                    </p>
                    <p className="mt-5 border-t border-line pt-4 text-body-sm font-bold text-ink/80 lg:mt-7 lg:pt-5">{boleto.total}</p>
                  </Card>
                </motion.div>
              ) : (
                <motion.div
                  key="card"
                  initial={{ y: -40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 40, opacity: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <div
                    data-theme="dark"
                    className="nd-card-featured relative w-full p-6 pt-8 shadow-float [--featured-bg:var(--color-navy-900)] lg:p-9 lg:pt-11"
                  >
                    <Chip variant="orange" className="absolute -top-3.5 left-6 uppercase shadow-cta lg:-top-5 lg:left-9">
                      {card.badge}
                    </Chip>
                    <p className="text-body-sm font-bold text-ink">{card.label}</p>
                    <p className="mt-3 flex flex-wrap items-baseline gap-x-3 text-ink lg:mt-5">
                      <span className="text-[1.75rem] font-bold tracking-[-0.02em] lg:text-[40px]">{card.installments}</span>
                      <span className="text-[3rem] leading-none font-bold tracking-[-0.03em] tabular-nums lg:text-[64px]">{card.value}</span>
                    </p>
                    <p className="mt-2 text-body-sm text-ink-muted lg:mt-3">{card.total}</p>
                    <div className="mt-5 flex flex-col items-start gap-2 lg:mt-6 lg:gap-3">
                      <Chip variant="tint">{card.saving}</Chip>
                      <p className="text-body-sm text-ink-soft">{card.monthly}</p>
                    </div>
                    <p className="mt-5 flex items-center gap-2 border-t border-line pt-4 text-body-sm font-bold text-orange-soft lg:mt-6 lg:pt-5">
                      <Clock aria-hidden className="size-[1.1em] shrink-0" strokeWidth={2} />
                      {card.urgency}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Indicador discreto de progressão entre as 2 opções */}
            <div aria-hidden className="mt-5 flex justify-center gap-2">
              {(['boleto', 'card'] as const).map((key) => (
                <span
                  key={key}
                  className={`h-1.5 w-6 rounded-full transition-colors ${current === key ? 'bg-orange' : 'bg-ink-muted/25'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <p className="mt-6 text-center text-body text-ink-muted lg:mt-8">{footer}</p>
    </Slide>
  )
}
