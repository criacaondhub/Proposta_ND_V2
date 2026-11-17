import { COMPROMISSO } from '@/config/content'
import { cn, pad2 } from '@/lib/utils'
import { Glow } from '@/components/ui/backgrounds/Glow'
import { Reveal } from '@/components/ui/Reveal'
import { Slide } from '@/components/ui/Slide'

const SCALE = Array.from({ length: 11 }, (_, n) => n)

// 22 · Perguntas de compromisso — 3 perguntas, cada uma com régua 0–10 (o 10 em laranja sólido)
export function Compromisso() {
  const { questions } = COMPROMISSO

  return (
    <Slide decor={<Glow className="top-[-120px] left-[-200px] h-[800px] w-[1200px]" />} className="lg:justify-center">
      <ol className="flex flex-col gap-10 lg:gap-16">
        {questions.map((question, i) => (
          <Reveal as="li" key={question} step={i} order={1} className="grid gap-3 lg:grid-cols-[104px_1fr] lg:gap-8">
            <span className="text-[2rem] leading-none font-bold tracking-[-0.03em] text-orange tabular-nums lg:text-[56px]">{pad2(i + 1)}</span>
            <div>
              <h2 className="max-w-[56ch] text-[1.25rem] leading-[1.25] font-bold tracking-[-0.015em] text-balance text-ink lg:text-[32px]">{question}</h2>
              <div aria-hidden className="mt-4 flex flex-wrap gap-1.5 lg:mt-6 lg:gap-3">
                {SCALE.map((n) => (
                  <span
                    key={n}
                    className={cn(
                      'grid h-8 min-w-8 place-items-center rounded-full px-2 text-note font-bold tabular-nums lg:h-12 lg:min-w-[68px]',
                      n === 10 ? 'border-2 border-dashed border-orange text-orange-soft' : 'border border-line text-ink-muted',
                    )}
                  >
                    {n}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </ol>
    </Slide>
  )
}
