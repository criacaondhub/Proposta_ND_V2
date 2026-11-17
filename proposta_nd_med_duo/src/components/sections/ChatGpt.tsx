import { Quote } from 'lucide-react'
import { CHATGPT } from '@/config/content'
import { IconBox } from '@/components/ui/Atoms'
import { PatternRail } from '@/components/ui/backgrounds/PatternRail'
import { Card } from '@/components/ui/Card'
import { Media } from '@/components/ui/Media'
import { Reveal } from '@/components/ui/Reveal'
import { Slide } from '@/components/ui/Slide'
import { SlideHeader } from '@/components/ui/Typography'

// 09 · "Mas o ChatGPT não faz isso?" — 5 diferenciais à esquerda (7/12), print + citação à direita (5/12)
export function ChatGpt() {
  const { title, lead, items, proof } = CHATGPT

  return (
    <Slide background={<PatternRail side="right" />}>
      <div className="grid flex-1 gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="flex flex-col lg:col-span-7">
          <SlideHeader title={title} lead={lead} size="title-sm" />
          <ul className="mt-6 flex flex-col gap-4 lg:mt-10 lg:gap-6">
            {items.map((item, i) => (
              <Reveal as="li" key={item.title} order={3 + i}>
                <div className="flex items-start gap-4 lg:gap-6">
                  <IconBox icon={item.icon} size="sm" />
                  <div>
                    <h3 className="text-h4 text-ink">{item.title}</h3>
                    <p className="mt-1 text-body-sm text-ink-muted">{item.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal step={1} className="relative flex items-center justify-center lg:col-span-5">
          {/* print do WhatsApp Web no aspecto natural, não em moldura de celular */}
          <div
            data-theme="dark"
            className="relative w-full max-w-[420px] rotate-[1.5deg] overflow-hidden rounded-2xl border border-line bg-navy-900 p-1.5 shadow-float lg:max-w-[560px] lg:rounded-3xl lg:p-2"
          >
            <Media photo={proof.media} className="aspect-[645/598] w-full rounded-xl lg:rounded-2xl" />
          </div>
          <Card className="absolute -bottom-4 left-0 max-w-[80%] shadow-float lg:-bottom-6 lg:-left-6 lg:max-w-[380px] lg:p-7">
            <Quote aria-hidden className="size-6 text-orange lg:size-8" strokeWidth={1.75} />
            <p className="mt-3 text-h4 text-ink lg:mt-4">{proof.quote}</p>
            <p className="mt-2 text-note text-ink-muted lg:mt-3">{proof.caption}</p>
          </Card>
        </Reveal>
      </div>
    </Slide>
  )
}
