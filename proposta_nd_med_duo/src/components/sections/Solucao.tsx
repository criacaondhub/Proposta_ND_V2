import { SOLUCAO } from '@/config/content'
import { IconBox } from '@/components/ui/Atoms'
import { Constellation } from '@/components/ui/backgrounds/Constellation'
import { Card } from '@/components/ui/Card'
import { Reveal } from '@/components/ui/Reveal'
import { Slide } from '@/components/ui/Slide'
import { SlideHeader } from '@/components/ui/Typography'

// 13 · 03 · A solução — abertura de capítulo com os 4 pilares (o primeiro com borda gradiente)
export function Solucao() {
  const { eyebrow, title, lead, pillars } = SOLUCAO

  return (
    <Slide background={<Constellation focusX={0.82} focusY={0.24} count={110} seed={31} />}>
      <SlideHeader eyebrow={eyebrow} title={title} lead={lead} className="max-w-[1300px]" />

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:mt-auto lg:grid-cols-4 lg:gap-8">
        {pillars.map((pillar, i) => (
          <Reveal key={pillar.title} step={i + 1} className="flex">
            <Card variant={i === 0 ? 'featured' : 'default'} className="flex w-full flex-col lg:p-10">
              <IconBox icon={pillar.icon} />
              <h3 className="mt-6 text-h3 text-ink lg:mt-10 lg:text-[40px]">{pillar.title}</h3>
              <p className="mt-3 text-body-sm text-ink-muted lg:mt-4">{pillar.text}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </Slide>
  )
}
