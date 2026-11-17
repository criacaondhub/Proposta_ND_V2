import { Stethoscope } from 'lucide-react'
import { QUEM_SOMOS } from '@/config/content'
import { IconBox, Stat } from '@/components/ui/Atoms'
import { PatternRail } from '@/components/ui/backgrounds/PatternRail'
import { Card } from '@/components/ui/Card'
import { Reveal } from '@/components/ui/Reveal'
import { RichText } from '@/components/ui/RichText'
import { Slide } from '@/components/ui/Slide'
import { SlideHeader } from '@/components/ui/Typography'

// 02 · Quem somos — título + parágrafo, faixa de 4 números, frase de fechamento em card navy
export function QuemSomos() {
  const { title, text, stats, closing } = QUEM_SOMOS

  return (
    <Slide theme="light" background={<PatternRail side="left" tone="orange" />}>
      <SlideHeader title={title} lead={text} className="max-w-[1180px]" leadClassName="max-w-[64ch] text-body text-ink-soft" />

      <div className="mt-8 grid grid-cols-2 gap-3 lg:mt-14 lg:grid-cols-4 lg:gap-8">
        {stats.map((stat, i) => (
          <Reveal key={stat.caption} step={1} order={i} className="flex">
            <Card className="flex w-full flex-col justify-between gap-3 lg:p-8">
              <Stat prefix={stat.prefix} value={stat.value} unit={stat.unit} className="lg:text-[80px]" />
              <p className="text-body-sm text-ink/70">{stat.caption}</p>
            </Card>
          </Reveal>
        ))}
      </div>

      <Reveal step={2} className="mt-4 lg:mt-8">
        <div data-theme="dark" className="flex items-center gap-4 rounded-lg bg-brand-navy p-5 lg:gap-8 lg:px-12 lg:py-9">
          <IconBox icon={Stethoscope} />
          <p className="text-lead text-ink-soft">
            <RichText text={closing} strongClassName="font-bold text-ink" />
          </p>
        </div>
      </Reveal>
    </Slide>
  )
}
