import { Quote } from 'lucide-react'
import { CHATGPT } from '@/config/content'
import { IconBox } from '@/components/ui/Atoms'
import { Card } from '@/components/ui/Card'
import { Media, Phone } from '@/components/ui/Media'
import { Reveal } from '@/components/ui/Reveal'
import { Slide } from '@/components/ui/Slide'
import { SlideHeader } from '@/components/ui/Typography'

// 09 · "Mas o ChatGPT não faz isso?" — 5 diferenciais à esquerda (7/12), print + citação à direita (5/12)
export function ChatGpt() {
  const { title, lead, items, proof } = CHATGPT

  return (
    <Slide>
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
          <Phone className="aspect-[9/19] w-[240px] rotate-[2deg] lg:w-[340px]">
            <Media photo={proof.media} className="h-full w-full" />
          </Phone>
          <Card className="absolute bottom-4 left-0 max-w-[85%] shadow-float lg:bottom-[60px] lg:left-[-10px] lg:max-w-[440px] lg:p-8">
            <Quote aria-hidden className="size-6 text-orange lg:size-9" strokeWidth={1.75} />
            <p className="mt-3 text-h4 text-ink lg:mt-4">{proof.quote}</p>
            <p className="mt-2 text-note text-ink-muted lg:mt-3">{proof.caption}</p>
          </Card>
        </Reveal>
      </div>
    </Slide>
  )
}
