import { TriangleAlert } from 'lucide-react'
import type { CSSProperties } from 'react'
import { ESCALA } from '@/config/content'
import { Constellation } from '@/components/ui/backgrounds/Constellation'
import { Card } from '@/components/ui/Card'
import { Reveal } from '@/components/ui/Reveal'
import { RichText } from '@/components/ui/RichText'
import { Slide } from '@/components/ui/Slide'
import { SlideHeader } from '@/components/ui/Typography'

/* Escada no palco: altura do 1º degrau e quanto cada degrau sobe em relação ao anterior (px) */
const STAIR = { base: 190, rise: 52 }

// 10 · 02 · O método ESCALA — escadinha de 6 degraus (E → S → C → A → L → A), cada letra em pé sobre o seu degrau
export function Escala() {
  const { title, lead, steps, alert } = ESCALA

  return (
    <Slide background={<Constellation focusX={0.55} focusY={0.62} count={110} seed={23} />}>
      <SlideHeader title={title} lead={lead} size="title-sm" leadClassName="lg:max-w-none" />

      <ol className="mt-8 grid grid-cols-2 gap-x-3 gap-y-5 sm:grid-cols-3 lg:mt-auto lg:grid-cols-6 lg:items-end lg:gap-x-2">
        {steps.map((step, i) => (
          <Reveal
            as="li"
            key={`${step.letter}-${step.name}`}
            step={i + 1}
            className="flex flex-col"
            style={{ '--stair': `${STAIR.base + i * STAIR.rise}px` } as CSSProperties}
          >
            {/* entrelinha folgada: o gradiente só pinta dentro da caixa da linha */}
            <p aria-hidden className="nd-gradient-text -mb-[0.06em] pl-1 text-[4rem] leading-[1.15] font-bold tracking-[-0.04em] lg:pl-3 lg:text-[112px]">
              {step.letter}
            </p>
            {/* o degrau: bloco navy que "afunda" no chão, mais alto a cada etapa */}
            <div className="flex flex-col rounded-lg border border-[rgb(201_210_232/0.14)] bg-linear-to-b from-brand-navy to-brand-navy/25 p-4 lg:h-[var(--stair)] lg:rounded-b-none lg:border-b-0 lg:px-6 lg:pt-6">
              <h3 className="text-h4 text-ink">{step.name}</h3>
              <p className="mt-2 text-[0.875rem] leading-snug text-ink-soft lg:text-[19px]">{step.text}</p>
            </div>
          </Reveal>
        ))}
      </ol>

      <Reveal step={steps.length + 1} className="mt-6 lg:mt-8">
        <Card variant="alert" className="flex items-start gap-4 lg:items-center lg:gap-6 lg:px-10 lg:py-6">
          <TriangleAlert aria-hidden className="size-6 shrink-0 text-orange-soft lg:size-9" strokeWidth={1.75} />
          <p className="text-body text-peach">
            <RichText text={alert} strongClassName="font-bold text-on-accent" />
          </p>
        </Card>
      </Reveal>
    </Slide>
  )
}
