import { EyeOff, MessageCircle } from 'lucide-react'
import { PROBLEMA } from '@/config/content'
import { Constellation } from '@/components/ui/backgrounds/Constellation'
import { Card } from '@/components/ui/Card'
import { Reveal } from '@/components/ui/Reveal'
import { Slide } from '@/components/ui/Slide'
import { SlideHeader } from '@/components/ui/Typography'

// 07 · 01 · O problema — abertura de capítulo: 5 frases + card "O que você não enxerga"
export function Problema() {
  const { eyebrow, title, lead, phrases, insight } = PROBLEMA

  return (
    <Slide background={<Constellation focusX={0.86} focusY={0.22} count={110} seed={11} />}>
      <SlideHeader eyebrow={eyebrow} title={title} lead={lead} className="max-w-[1400px]" />

      <ul className="mt-8 grid gap-3 lg:mt-12 lg:grid-cols-3 lg:gap-6">
        {phrases.map((phrase, i) => (
          <Reveal as="li" key={phrase.quote} step={i + 1} className="flex">
            <Card className="w-full lg:p-8">
              <MessageCircle aria-hidden className="size-6 text-orange lg:size-9" strokeWidth={1.75} />
              <p className="mt-4 text-h4 text-ink lg:mt-6">“{phrase.quote}”</p>
              <p className="mt-2 text-body-sm text-ink-muted lg:mt-3">{phrase.text}</p>
            </Card>
          </Reveal>
        ))}
        <Reveal as="li" step={phrases.length + 1} className="flex">
          <Card variant="alert" className="w-full lg:p-8">
            <div className="flex items-center gap-3">
              <EyeOff aria-hidden className="size-6 text-orange-soft lg:size-9" strokeWidth={1.75} />
              <p className="nd-eyebrow text-orange-soft">{insight.eyebrow}</p>
            </div>
            <p className="mt-4 text-body text-peach lg:mt-6">{insight.text}</p>
          </Card>
        </Reveal>
      </ul>
    </Slide>
  )
}
