import { MessageCircleQuestion } from 'lucide-react'
import { PAUSA } from '@/config/content'
import { Glow } from '@/components/ui/backgrounds/Glow'
import { Reveal } from '@/components/ui/Reveal'
import { Slide } from '@/components/ui/Slide'
import { Eyebrow, Title } from '@/components/ui/Typography'

// 19 · Pausa / pergunta — slide de respiro, pergunta centralizada sobre glow radial
export function Pausa() {
  const { eyebrow, title } = PAUSA

  return (
    <Slide
      decor={<Glow className="top-1/2 left-1/2 h-[900px] w-[1500px] -translate-x-1/2 -translate-y-1/2" />}
      className="items-center justify-center text-center"
    >
      <Reveal order={0}>
        <MessageCircleQuestion aria-hidden className="mx-auto size-14 text-ink-muted/60 lg:size-24" strokeWidth={1.25} />
      </Reveal>
      <Reveal order={1} className="mt-6 lg:mt-10">
        <Eyebrow text={eyebrow} />
      </Reveal>
      <Reveal order={2} className="mt-4 lg:mt-6">
        <Title text={title} size="display" className="mx-auto max-w-[1400px] lg:text-[88px]" />
      </Reveal>
    </Slide>
  )
}
