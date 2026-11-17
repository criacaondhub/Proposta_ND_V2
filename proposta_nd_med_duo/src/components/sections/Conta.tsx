import { Calculator } from 'lucide-react'
import { CONTA } from '@/config/content'
import { Chip, IconBox } from '@/components/ui/Atoms'
import { Card } from '@/components/ui/Card'
import { Logo } from '@/components/ui/Logo'
import { Reveal } from '@/components/ui/Reveal'
import { Slide } from '@/components/ui/Slide'
import { SlideHeader } from '@/components/ui/Typography'

// 20 · Antes do preço, uma conta — "recibo" do time interno × card navy da ND Med, com pill "vs"
export function Conta() {
  const { eyebrow, title, team, vs, nd } = CONTA

  return (
    <Slide theme="light">
      <SlideHeader eyebrow={eyebrow} title={title} />

      <div className="relative mt-8 grid gap-4 lg:my-auto lg:grid-cols-2 lg:gap-16 lg:pt-4">
        <Reveal step={1} className="flex">
          <Card className="flex w-full flex-col lg:p-10">
            <div className="flex items-center gap-4">
              <IconBox icon={Calculator} size="sm" />
              <h3 className="nd-eyebrow text-ink-muted">{team.title}</h3>
            </div>
            <dl className="mt-4 lg:mt-6">
              {team.rows.map(([label, value]) => (
                <div key={label} className="flex items-baseline gap-3 py-2 lg:py-3">
                  <dt className="text-body-sm text-ink/80">{label}</dt>
                  <span aria-hidden className="flex-1 border-b border-dashed border-line" />
                  <dd className="text-body-sm font-bold text-ink tabular-nums">{value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-3 flex items-baseline justify-between gap-4 border-t-2 border-ink/15 pt-4 lg:mt-4 lg:pt-5">
              <p className="text-h4 text-ink">{team.total.label}</p>
              <p className="text-h4 text-ink tabular-nums">
                {team.total.value}
                <span className="text-body-sm font-bold">{team.total.unit}</span>
              </p>
            </div>
            <p className="mt-3 text-body-sm text-ink/70 lg:mt-auto lg:pt-5">
              {team.sixMonths.label} <s className="font-bold text-ink-muted decoration-2">{team.sixMonths.value}</s> {team.sixMonths.rest}
            </p>
          </Card>
        </Reveal>

        <Reveal step={2} className="z-10 flex justify-center lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2">
          <span className="nd-eyebrow rounded-full border border-line bg-surface px-4 py-2 text-ink-muted lg:px-6 lg:py-3">{vs}</span>
        </Reveal>

        <Reveal step={2} className="flex">
          <div data-theme="dark" className="flex w-full flex-col rounded-lg bg-brand-navy p-5 shadow-float lg:p-10">
            <Logo className="h-6 self-start lg:h-8" />
            <h3 className="nd-eyebrow mt-6 text-orange-soft lg:mt-8">{nd.eyebrow}</h3>
            <p className="mt-3 text-h4 text-ink">{nd.title}</p>
            <ul className="mt-5 flex flex-wrap gap-2 lg:mt-7 lg:gap-3">
              {nd.chips.map((chip) => (
                <li key={chip}>
                  <Chip variant="outline">{chip}</Chip>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-body-sm text-ink-soft lg:mt-auto lg:pt-7">{nd.text}</p>
          </div>
        </Reveal>
      </div>
    </Slide>
  )
}
