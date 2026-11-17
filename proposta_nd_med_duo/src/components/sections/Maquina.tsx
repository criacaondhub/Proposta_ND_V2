import { Cog } from 'lucide-react'
import { MAQUINA } from '@/config/content'
import { splitCurrency } from '@/lib/utils'
import { CheckList, Chip, Stat } from '@/components/ui/Atoms'
import { Card } from '@/components/ui/Card'
import { Reveal } from '@/components/ui/Reveal'
import { RichText } from '@/components/ui/RichText'
import { Slide } from '@/components/ui/Slide'
import { SlideHeader } from '@/components/ui/Typography'

// 21 · Máquina ND Med — 3 engrenagens (8/12) + card de investimento com borda gradiente (4/12) + faixa Duo × Máquina
export function Maquina() {
  const { eyebrow, title, gears, investment, compare } = MAQUINA
  const price = splitCurrency(investment.value)

  return (
    <Slide>
      <SlideHeader eyebrow={eyebrow} title={title} size="title-sm" className="max-w-[1400px]" />

      <div className="mt-8 grid gap-3 lg:mt-10 lg:grid-cols-12 lg:gap-8">
        <div className="grid gap-3 sm:grid-cols-3 lg:col-span-8 lg:gap-6">
          {gears.map((gear, i) => (
            <Reveal key={gear.n} step={1} order={i} className="flex">
              <Card className="flex w-full flex-col lg:p-8">
                <div className="flex items-start justify-between">
                  <span className="nd-outline-text text-[3rem] leading-none font-bold tracking-[-0.04em] lg:text-[88px]">{gear.n}</span>
                  <Cog aria-hidden className="size-6 text-ink-muted lg:size-9" strokeWidth={1.5} />
                </div>
                <Chip variant="tint" className="mt-4 self-start uppercase lg:mt-6">
                  {gear.verb}
                </Chip>
                <h3 className="mt-3 text-h4 text-ink lg:mt-4">{gear.name}</h3>
                <p className="mt-2 text-body-sm text-ink-muted lg:mt-3">
                  <RichText text={gear.text} strongClassName="font-bold text-ink" />
                </p>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal step={2} className="flex lg:col-span-4">
          <Card variant="featured" className="flex w-full flex-col lg:p-9">
            <p className="nd-eyebrow text-orange-soft">{investment.eyebrow}</p>
            <Stat prefix={price.prefix} value={price.value} unit={investment.unit} size="stat-sm" className="mt-3 text-ink lg:mt-4" />
            <p className="mt-6 text-body-sm font-bold text-ink lg:mt-8">{investment.idealTitle}</p>
            <CheckList items={investment.ideal} className="mt-3 lg:mt-4" />
          </Card>
        </Reveal>
      </div>

      <Reveal step={3} className="mt-4 lg:mt-8">
        <div className="grid rounded-lg border border-line lg:grid-cols-2">
          {compare.map((item, i) => (
            <p key={item.label} className={`px-5 py-4 text-body-sm text-ink-soft lg:px-8 lg:py-5 ${i === 1 ? 'border-t border-line lg:border-t-0 lg:border-l' : ''}`}>
              <strong className="font-bold text-ink">{item.label}:</strong> {item.text}
            </p>
          ))}
        </div>
      </Reveal>
    </Slide>
  )
}
