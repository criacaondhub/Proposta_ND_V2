import type { CSSProperties } from 'react'
import { BASTIDORES } from '@/config/content'
import { PatternRail } from '@/components/ui/backgrounds/PatternRail'
import { Media, Phone } from '@/components/ui/Media'
import { Reveal } from '@/components/ui/Reveal'
import { Slide } from '@/components/ui/Slide'
import { SlideHeader } from '@/components/ui/Typography'

/* Colagem no palco: posição (px) e rotação (±3°) de cada print */
const COLLAGE = [
  { x: 40, y: 150, r: -3 },
  { x: 370, y: 40, r: 2 },
  { x: 700, y: 170, r: -2 },
]

// 05 · Bastidores — título à esquerda (4/12), colagem de prints reais à direita (8/12)
export function Bastidores() {
  const { title, lead, prints } = BASTIDORES

  return (
    <Slide theme="light" background={<PatternRail side="left" tone="orange" />}>
      <div className="grid flex-1 gap-8 lg:grid-cols-12 lg:gap-8">
        <div className="flex flex-col justify-center lg:col-span-4">
          <SlideHeader
            title={title}
            lead={lead}
            size="title-sm"
            titleClassName="text-balance"
            leadClassName="text-balance"
          />
        </div>

        <div className="relative grid grid-cols-2 gap-3 lg:col-span-8 lg:block">
          {prints.map((print, i) => (
            <Reveal
              key={print.src}
              order={3 + i}
              className="lg:absolute lg:top-[var(--y)] lg:left-[var(--x)] lg:w-[300px] lg:rotate-[var(--r)]"
              style={{ '--x': `${COLLAGE[i].x}px`, '--y': `${COLLAGE[i].y}px`, '--r': `${COLLAGE[i].r}deg` } as CSSProperties}
            >
              <Phone className="aspect-[9/19]">
                <Media photo={print} className="h-full w-full" />
              </Phone>
            </Reveal>
          ))}
        </div>
      </div>
    </Slide>
  )
}
