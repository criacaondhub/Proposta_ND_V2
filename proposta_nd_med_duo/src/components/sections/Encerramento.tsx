import { ENCERRAMENTO } from '@/config/content'
import { CtaButton } from '@/components/ui/Atoms'
import { AgendaGrid } from '@/components/ui/backgrounds/AgendaGrid'
import { Glow } from '@/components/ui/backgrounds/Glow'
import { Reveal } from '@/components/ui/Reveal'
import { Slide } from '@/components/ui/Slide'
import { Title } from '@/components/ui/Typography'

/* agenda cheia: todas as 30 células, preenchendo em ordem embaralhada */
const FULL = [12, 7, 17, 2, 22, 13, 8, 27, 3, 18, 11, 23, 6, 28, 1, 16, 21, 9, 26, 4, 14, 19, 0, 24, 29, 5, 10, 15, 20, 25]

// 25 · Encerramento / CTA — eco da capa: grade "agenda" cheia ao fundo, pergunta e botão
export function Encerramento() {
  const { title, text, cta } = ENCERRAMENTO

  return (
    <Slide
      decor={
        <>
          <div className="absolute top-1/2 left-1/2 hidden w-[1500px] -translate-x-1/2 -translate-y-1/2 text-[22px] opacity-30 [perspective:1600px] lg:block">
            <div className="[transform:rotateX(24deg)] [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_72%)]">
              <AgendaGrid filled={FULL} delay={0.2} />
            </div>
          </div>
          <Glow className="top-1/2 left-1/2 h-[860px] w-[1500px] -translate-x-1/2 -translate-y-1/2" />
        </>
      }
      className="items-center justify-center text-center"
    >
      <Reveal order={0}>
        <Title text={title} size="display" className="mx-auto max-w-[1400px]" />
      </Reveal>
      <Reveal order={1} className="mt-6 lg:mt-10">
        <p className="mx-auto max-w-[52ch] text-lead text-pretty text-ink-soft">{text}</p>
      </Reveal>
      <Reveal order={2} className="mt-8 lg:mt-14">
        <CtaButton>{cta}</CtaButton>
      </Reveal>
    </Slide>
  )
}
