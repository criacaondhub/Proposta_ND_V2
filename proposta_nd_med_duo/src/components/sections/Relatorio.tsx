import { RELATORIO } from '@/config/content'
import { PatternRail } from '@/components/ui/backgrounds/PatternRail'
import { Media } from '@/components/ui/Media'
import { Reveal } from '@/components/ui/Reveal'
import { Slide } from '@/components/ui/Slide'
import { SlideHeader } from '@/components/ui/Typography'

// 17 · Entregável 4 · Relatório diário — 3 itens numerados (5/12) + print real do painel (7/12)
export function Relatorio() {
  const { title, items, print } = RELATORIO

  return (
    <Slide background={<PatternRail side="right" />}>
      <div className="grid flex-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-8">
        <div className="flex flex-col lg:col-span-5 lg:pr-8">
          <SlideHeader title={title} />
          <ol className="mt-8 flex flex-col gap-5 lg:mt-12 lg:gap-8">
            {items.map((item, i) => (
              <Reveal as="li" key={item.title} order={3 + i} className="flex items-start gap-4 lg:gap-6">
                <span className="grid size-10 shrink-0 place-items-center rounded-full border-2 border-orange text-body-sm font-bold text-orange-soft tabular-nums lg:size-12">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-h4 text-ink">{item.title}</h3>
                  <p className="mt-1 text-body-sm text-ink-muted">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal step={1} className="lg:col-span-7">
          <div className="overflow-hidden rounded-xl border border-line bg-surface-raised p-1.5 shadow-float lg:rounded-2xl lg:p-2">
            <Media photo={print} className="aspect-[16/10] w-full rounded-lg lg:rounded-xl" />
          </div>
        </Reveal>
      </div>
    </Slide>
  )
}
