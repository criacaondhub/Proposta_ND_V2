import { ArrowRight, ArrowUp, Repeat } from 'lucide-react'
import { REUNIAO } from '@/config/content'
import { Chip, IconBox } from '@/components/ui/Atoms'
import { Card } from '@/components/ui/Card'
import { Reveal } from '@/components/ui/Reveal'
import { Slide } from '@/components/ui/Slide'
import { SlideHeader } from '@/components/ui/Typography'

// 18 · Entregável 5 · Reunião mensal — citação, ciclo de 5 etapas com retorno, 3 gargalos
export function Reuniao() {
  const { title, quote, cycle, cycleNote, tag, bottlenecks } = REUNIAO

  return (
    <Slide theme="light">
      <SlideHeader title={title} size="title-sm" className="max-w-[1500px]" />
      <Reveal order={3} className="mt-3 lg:mt-5">
        <p className="text-[1.25rem] leading-tight font-bold tracking-[-0.02em] text-orange lg:text-[34px]">{quote}</p>
      </Reveal>

      <Reveal step={1} className="mt-6 lg:mt-10">
        <ol className="flex flex-col gap-1 lg:flex-row lg:items-stretch">
          {cycle.map((stage, i) => (
            <li key={stage.title} className="flex flex-col items-stretch lg:flex-1 lg:flex-row lg:items-center">
              <div className="nd-card flex-1 px-4 py-3 lg:px-6 lg:py-4">
                <p className="text-[0.9375rem] font-bold text-ink lg:text-[22px]">{stage.title}</p>
                <p className="text-note text-ink-muted lg:text-[18px]">{stage.text}</p>
              </div>
              {i < cycle.length - 1 && (
                <ArrowRight aria-hidden className="mx-auto my-1 size-4 shrink-0 rotate-90 text-orange lg:mx-3 lg:my-0 lg:size-6 lg:rotate-0" strokeWidth={2} />
              )}
            </li>
          ))}
        </ol>
        {/* seta de retorno: do último de volta ao primeiro */}
        <div className="relative mx-[9%] mt-1 hidden h-7 rounded-b-[18px] border-x-2 border-b-2 border-dashed border-orange/45 lg:block">
          <ArrowUp aria-hidden className="absolute -top-3 -left-[13px] size-6 bg-surface text-orange" strokeWidth={2} />
          <p className="absolute -bottom-3.5 left-1/2 flex -translate-x-1/2 items-center gap-2 bg-surface px-4 text-note whitespace-nowrap text-ink-muted">
            <Repeat aria-hidden className="size-4 text-orange" strokeWidth={2} />
            {cycleNote}
          </p>
        </div>
        <p className="mt-2 flex items-center gap-2 text-note text-ink-muted lg:hidden">
          <Repeat aria-hidden className="size-4 text-orange" strokeWidth={2} />
          {cycleNote}
        </p>
      </Reveal>

      <div className="mt-6 grid gap-3 lg:mt-16 lg:grid-cols-3 lg:gap-8">
        {bottlenecks.map((item, i) => (
          <Reveal key={item.title} step={2} order={i} className="flex">
            <Card className="flex w-full flex-col lg:p-8">
              <div className="flex items-center justify-between">
                <Chip variant="orange" className="uppercase">
                  {tag}
                </Chip>
                <IconBox icon={item.icon} size="sm" />
              </div>
              <h3 className="mt-4 text-[1.125rem] leading-tight font-bold tracking-[-0.015em] text-ink lg:mt-5 lg:text-[28px]">{item.title}</h3>
              <p className="mt-2 text-body-sm text-ink/70">{item.problem}</p>
              <p className="mt-auto flex items-start gap-2 pt-3 text-body-sm font-bold text-ink lg:pt-4">
                <ArrowRight aria-hidden className="mt-[0.2em] size-[1.05em] shrink-0 text-orange" strokeWidth={2.5} />
                {item.solution}
              </p>
            </Card>
          </Reveal>
        ))}
      </div>
    </Slide>
  )
}
