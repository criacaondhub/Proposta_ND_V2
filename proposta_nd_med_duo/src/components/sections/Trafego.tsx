import { ArrowRight, Wallet } from 'lucide-react'
import { TRAFEGO } from '@/config/content'
import { CheckList } from '@/components/ui/Atoms'
import { Card } from '@/components/ui/Card'
import { Reveal } from '@/components/ui/Reveal'
import { RichText } from '@/components/ui/RichText'
import { Slide } from '@/components/ui/Slide'
import { SlideHeader } from '@/components/ui/Typography'

// 14 · Entregável 1 · Tráfego no Meta — comparativo antes × gestão ND Med, com pill "vs"
export function Trafego() {
  const { title, before, after, note } = TRAFEGO

  return (
    <Slide theme="light">
      <SlideHeader title={title} size="title-sm" className="max-w-[1500px]" />

      <div className="relative mt-8 grid gap-4 lg:my-auto lg:grid-cols-2 lg:items-center lg:gap-16 lg:pt-4">
        <Reveal step={1} className="flex">
          <Card className="w-full lg:p-10">
            <h3 className="nd-eyebrow text-ink-muted">{before.title}</h3>
            <CheckList items={before.items} negative className="mt-5 lg:mt-7" itemClassName="lg:text-body" />
          </Card>
        </Reveal>

        <Reveal step={2} className="z-10 flex justify-center lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2">
          <span className="nd-eyebrow rounded-full border border-line bg-surface px-4 py-2 text-ink-muted lg:px-6 lg:py-3">vs</span>
        </Reveal>

        <Reveal step={2} className="flex">
          <div data-theme="dark" className="w-full rounded-lg bg-brand-navy p-5 shadow-float lg:px-10 lg:py-12">
            <h3 className="nd-eyebrow flex items-center gap-2 text-orange-soft">
              <ArrowRight aria-hidden className="size-[1.2em]" strokeWidth={2.5} />
              {after.title}
            </h3>
            <CheckList items={after.items} className="mt-5 lg:mt-7" itemClassName="lg:text-body" />
          </div>
        </Reveal>
      </div>

      <Reveal step={2} className="mt-6 lg:mt-0">
        <p className="inline-flex items-start gap-3 rounded-lg border border-line bg-white px-5 py-3 text-body-sm text-ink/80 lg:items-center lg:rounded-full lg:px-8 lg:py-4">
          <Wallet aria-hidden className="mt-0.5 size-5 shrink-0 text-orange lg:mt-0 lg:size-7" strokeWidth={1.75} />
          <span>
            <RichText text={note} strongClassName="font-bold text-ink" />
          </span>
        </p>
      </Reveal>
    </Slide>
  )
}
