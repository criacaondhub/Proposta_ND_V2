import { ArrowRight, Plus, Repeat } from 'lucide-react'
import { Fragment } from 'react'
import { MOTORES, type Owner } from '@/config/content'
import { Chip, IconBox, type ChipVariant } from '@/components/ui/Atoms'
import { Card } from '@/components/ui/Card'
import { Reveal } from '@/components/ui/Reveal'
import { Slide } from '@/components/ui/Slide'
import { SlideHeader } from '@/components/ui/Typography'

/* Responsável por cada etapa: ND (laranja sólido), VOCÊ (navy), SEU TIME (contorno) */
const OWNER_CHIP: Record<Owner, ChipVariant> = { ND: 'orange', VOCÊ: 'navy', 'SEU TIME': 'outline' }

type Engine = (typeof MOTORES.engines)[number]

function EngineCard({ engine }: { engine: Engine }) {
  return (
    <Card className="flex h-full flex-col lg:p-10">
      <div className="flex items-center gap-4">
        <IconBox icon={engine.icon} />
        <p className="nd-eyebrow text-ink-muted">{engine.eyebrow}</p>
      </div>
      <h3 className="mt-5 text-h3 text-ink lg:mt-7">{engine.title}</h3>
      <p className="mt-3 text-body-sm text-ink-soft">{engine.text}</p>
      <ol className="mt-6 flex flex-col gap-2 lg:mt-auto lg:grid lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-stretch lg:gap-3 lg:pt-8">
        {engine.flow.map((stage, i) => (
          <Fragment key={stage.label}>
            <li className="flex items-center justify-between gap-3 rounded-md border border-line bg-surface px-4 py-3 lg:flex-col lg:items-start lg:justify-between lg:p-4">
              <span className="text-[0.9375rem] leading-snug font-bold text-ink lg:text-[19px]">{stage.label}</span>
              <Chip variant={OWNER_CHIP[stage.owner]}>{stage.owner}</Chip>
            </li>
            {i < engine.flow.length - 1 && (
              <li aria-hidden className="flex justify-center lg:items-center">
                <ArrowRight className="size-4 rotate-90 text-orange lg:size-6 lg:rotate-0" strokeWidth={2} />
              </li>
            )}
          </Fragment>
        ))}
      </ol>
    </Card>
  )
}

// 11 · Os dois motores — 2 cards grandes com "+" laranja entre eles
export function Motores() {
  const { eyebrow, title, engines, closing } = MOTORES

  return (
    <Slide theme="light">
      <SlideHeader eyebrow={eyebrow} title={title} />

      <div className="lg:my-auto lg:pt-6">
        <div className="mt-8 grid gap-3 lg:mt-0 lg:grid-cols-[1fr_auto_1fr] lg:gap-6">
          <Reveal step={1} className="flex">
            <EngineCard engine={engines[0]} />
          </Reveal>
          <Reveal step={2} className="flex items-center justify-center">
            <span aria-hidden className="grid size-11 place-items-center rounded-full bg-orange text-on-accent shadow-cta lg:size-16">
              <Plus className="size-5 lg:size-8" strokeWidth={2.5} />
            </span>
          </Reveal>
          <Reveal step={2} className="flex">
            <EngineCard engine={engines[1]} />
          </Reveal>
        </div>

        <Reveal step={3} className="mt-6 lg:mt-12">
          <p className="mx-auto flex max-w-[62ch] items-start justify-center gap-3 text-center text-lead text-ink lg:items-center lg:gap-4">
            <Repeat aria-hidden className="mt-1 size-5 shrink-0 text-orange lg:mt-0 lg:size-8" strokeWidth={2} />
            <span className="text-balance">{closing}</span>
          </p>
        </Reveal>
      </div>
    </Slide>
  )
}
