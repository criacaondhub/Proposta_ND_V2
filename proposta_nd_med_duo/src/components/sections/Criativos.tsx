import { FlaskConical } from 'lucide-react'
import type { CSSProperties } from 'react'
import { CRIATIVOS } from '@/config/content'
import { Chip, IconBox, Stat } from '@/components/ui/Atoms'
import { Card } from '@/components/ui/Card'
import { Media } from '@/components/ui/Media'
import { Reveal } from '@/components/ui/Reveal'
import { Slide } from '@/components/ui/Slide'
import { SlideHeader } from '@/components/ui/Typography'

/* Galeria no palco: anúncios 9:16 e 4:5 sobrepostos, levemente rotacionados */
const GALLERY = [
  { x: 0, y: 20, w: 270, ratio: '9 / 16', r: -3 },
  { x: 220, y: 290, w: 320, ratio: '4 / 5', r: 2 },
  { x: 440, y: 0, w: 270, ratio: '9 / 16', r: 3 },
  { x: 500, y: 340, w: 320, ratio: '4 / 5', r: -2 },
]

// 15 · Entregável 2 · Criativos de anúncio — 2 cards com número grande + galeria de anúncios reais
export function Criativos() {
  const { eyebrow, title, cards, note, galleryLabel, gallery } = CRIATIVOS

  return (
    <Slide>
      <div className="grid flex-1 gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="flex flex-col lg:col-span-6">
          <SlideHeader eyebrow={eyebrow} title={title} size="title-sm" />

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:mt-12 lg:gap-6">
            {cards.map((card, i) => (
              <Reveal key={card.unit} step={i + 1} className="flex">
                <Card className="flex w-full flex-col lg:p-8">
                  <IconBox icon={card.icon} size="sm" />
                  <Stat value={card.value} unit={card.unit} className="mt-5 lg:mt-7" />
                  <Chip variant="tint" className="mt-3 self-start">
                    {card.tag}
                  </Chip>
                  <p className="mt-4 text-body-sm text-ink-muted">{card.text}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:col-span-6">
          <Reveal step={3}>
            <p className="nd-eyebrow text-ink-muted">{galleryLabel}</p>
          </Reveal>
          <div className="relative mt-4 grid flex-1 grid-cols-2 gap-3 lg:mt-6 lg:block">
            {gallery.map((ad, i) => (
              <Reveal
                key={ad.src}
                step={3}
                order={i + 1}
                className="lg:absolute lg:top-[var(--y)] lg:left-[var(--x)] lg:w-[var(--w)] lg:rotate-[var(--r)]"
                style={
                  {
                    '--x': `${GALLERY[i].x}px`,
                    '--y': `${GALLERY[i].y}px`,
                    '--w': `${GALLERY[i].w}px`,
                    '--r': `${GALLERY[i].r}deg`,
                    '--ratio': GALLERY[i].ratio,
                  } as CSSProperties
                }
              >
                <Media photo={ad} className="aspect-[var(--ratio)] rounded-lg border border-line bg-surface-raised shadow-float" />
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* nota em faixa de largura total, numa linha só no desktop */}
      <Reveal step={2} className="mt-6 lg:mt-8">
        <p className="flex items-start gap-3 text-body-sm text-ink-soft lg:items-center lg:whitespace-nowrap">
          <FlaskConical aria-hidden className="mt-0.5 size-5 shrink-0 text-orange-soft lg:mt-0 lg:size-7" strokeWidth={1.75} />
          {note}
        </p>
      </Reveal>
    </Slide>
  )
}
