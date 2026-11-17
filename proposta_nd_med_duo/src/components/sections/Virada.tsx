import { VIRADA } from '@/config/content'
import { pad2 } from '@/lib/utils'
import { IconBox } from '@/components/ui/Atoms'
import { Card } from '@/components/ui/Card'
import { Reveal } from '@/components/ui/Reveal'
import { Slide } from '@/components/ui/Slide'
import { SlideHeader, Title } from '@/components/ui/Typography'

// 08 · A virada — timeline de 4 cards ligados por linha fina + faixa navy de fechamento
export function Virada() {
  const { eyebrow, title, moments, closing } = VIRADA

  return (
    <Slide theme="light">
      <SlideHeader eyebrow={eyebrow} title={title} />

      <div className="lg:my-auto lg:pt-6">
        <ol className="relative mt-8 grid gap-3 lg:mt-0 lg:grid-cols-4 lg:gap-8">
          {/* linha da timeline, aparece entre os cards na altura dos ícones */}
          <span aria-hidden className="absolute top-[68px] right-[12%] left-[12%] hidden h-px bg-ink-muted/40 lg:block" />
          {moments.map((moment, i) => (
            <Reveal as="li" key={moment.title} step={i + 1} className="relative flex">
              <Card className="w-full lg:min-h-[400px] lg:p-9">
                <div className="flex items-center justify-between">
                  <IconBox icon={moment.icon} />
                  <span className="nd-eyebrow text-ink-muted tabular-nums">{pad2(i + 1)}</span>
                </div>
                <h3 className="mt-5 text-h4 text-ink lg:mt-10">{moment.title}</h3>
                <p className="mt-2 text-body-sm text-ink-soft lg:mt-4 lg:text-body">{moment.text}</p>
              </Card>
            </Reveal>
          ))}
        </ol>

        <Reveal step={moments.length + 1} className="mt-4 lg:mt-10">
          <div data-theme="dark" className="rounded-lg bg-brand-navy px-5 py-6 lg:px-12 lg:py-10">
            <Title as="p" size="h3" text={closing} />
          </div>
        </Reveal>
      </div>
    </Slide>
  )
}
