import { RESULTADOS } from '@/config/content'
import { Stat } from '@/components/ui/Atoms'
import { Glow } from '@/components/ui/backgrounds/Glow'
import { PatternRail } from '@/components/ui/backgrounds/PatternRail'
import { Card } from '@/components/ui/Card'
import { Reveal } from '@/components/ui/Reveal'
import { Slide } from '@/components/ui/Slide'
import { SlideHeader } from '@/components/ui/Typography'

// 04 · Resultados reais — 3 cards de case: número gigante + 3 métricas em linhas
export function Resultados() {
  const { title, lead, cases, note } = RESULTADOS

  return (
    <Slide
      background={<PatternRail side="right" />}
      decor={<Glow className="top-[-200px] right-[-200px] h-[900px] w-[1100px]" />}
    >
      <SlideHeader title={title} lead={lead} />

      <div className="mt-8 grid gap-4 lg:mt-12 lg:grid-cols-3 lg:gap-8">
        {cases.map((item, i) => (
          <Reveal key={item.name} step={i + 1} className="flex">
            <Card className="flex w-full flex-col lg:min-h-[560px] lg:p-10">
              <div className="flex items-center gap-4">
                <img
                  src={item.src}
                  alt={item.name}
                  className="h-14 w-14 shrink-0 rounded-full border border-line object-cover bg-surface lg:h-16 lg:w-16"
                />
                <div>
                  <h3 className="nd-eyebrow text-orange-soft">{item.name}</h3>
                  <p className="mt-1 text-note text-ink-muted">{item.category}</p>
                </div>
              </div>
              <Stat
                prefix={item.stat.prefix}
                value={item.stat.value}
                unit={item.stat.unit}
                className="mt-6 text-[2.5rem] text-ink lg:mt-10 lg:text-[80px]"
              />
              <p className="mt-2 text-body-sm text-ink-soft lg:mt-3">{item.caption}</p>
              <dl className="mt-6 border-t border-line pt-3 lg:mt-auto lg:pt-4">
                {item.metrics.map(([label, value]) => (
                  <div key={label} className="flex items-baseline justify-between gap-4 py-1.5 lg:py-2.5">
                    <dt className="text-body-sm text-ink-muted">{label}</dt>
                    <dd className="text-body-sm font-bold text-ink tabular-nums">{value}</dd>
                  </div>
                ))}
              </dl>
            </Card>
          </Reveal>
        ))}
      </div>

      <Reveal step={3} className="mt-6 lg:mt-auto">
        <p className="text-note text-ink-muted">{note}</p>
      </Reveal>
    </Slide>
  )
}
