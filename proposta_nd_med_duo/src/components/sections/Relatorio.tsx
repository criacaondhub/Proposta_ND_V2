import { MessageCircle } from 'lucide-react'
import { RELATORIO } from '@/config/content'
import { Chip, IconBox } from '@/components/ui/Atoms'
import { Card } from '@/components/ui/Card'
import { Reveal } from '@/components/ui/Reveal'
import { Slide } from '@/components/ui/Slide'
import { Sparkline } from '@/components/ui/Sparkline'
import { SlideHeader } from '@/components/ui/Typography'

const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

// 17 · Entregável 4 · Relatório diário — 3 itens numerados (5/12) + mock do relatório com KPIs e minigráfico (7/12)
export function Relatorio() {
  const { eyebrow, title, items, report } = RELATORIO
  const days = report.series.length

  return (
    <Slide>
      <div className="grid flex-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-8">
        <div className="flex flex-col lg:col-span-5 lg:pr-8">
          <SlideHeader eyebrow={eyebrow} title={title} />
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
          <Card className="shadow-float lg:p-10">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <IconBox icon={MessageCircle} size="sm" />
                <div>
                  <p className="text-body-sm font-bold text-ink">{report.title}</p>
                  <p className="text-note text-ink-muted">{report.time}</p>
                </div>
              </div>
              <Chip variant="outline" className="hidden sm:inline-flex">
                {report.disclaimer}
              </Chip>
            </div>

            <dl className="mt-6 grid grid-cols-3 divide-x divide-line rounded-md border border-line lg:mt-8">
              {report.kpis.map((kpi) => (
                <div key={kpi.label} className="px-3 py-3 lg:px-6 lg:py-5">
                  <dt className="text-note text-ink-muted">{kpi.label}</dt>
                  <dd className="mt-1 text-[1.125rem] font-bold tracking-[-0.02em] text-ink tabular-nums lg:mt-2 lg:text-[40px]">{kpi.value}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-6 text-note text-ink-muted lg:mt-8">{report.chartLabel}</p>
            <Sparkline
              data={report.series}
              format={(value) => brl.format(value)}
              pointLabel={(i) => (i === days - 1 ? 'hoje' : `há ${days - 1 - i} ${days - 1 - i === 1 ? 'dia' : 'dias'}`)}
              startLabel={`há ${days - 1} dias`}
              endLabel="hoje"
              ariaLabel={`${report.chartLabel}: de ${brl.format(report.series[0])} para ${brl.format(report.series[days - 1])}`}
              className="mt-3 lg:mt-4"
            />
          </Card>
        </Reveal>
      </div>
    </Slide>
  )
}
