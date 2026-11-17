import { AUDIENCIA } from '@/config/content'
import { Media } from '@/components/ui/Media'
import { Reveal } from '@/components/ui/Reveal'
import { Slide } from '@/components/ui/Slide'
import { SlideHeader } from '@/components/ui/Typography'

// 06 · Audiência e autoridade — 3 mockups 9:16 com anel Instagram + número em laranja
export function Audiencia() {
  const { eyebrow, title, items, note } = AUDIENCIA

  return (
    <Slide>
      <SlideHeader eyebrow={eyebrow} title={title} size="title-sm" className="max-w-[1500px]" />

      <div className="mt-8 grid gap-8 lg:my-auto lg:grid-cols-3 lg:gap-8 lg:pt-6">
        {items.map((item, i) => {
          const Icon = item.icon
          return (
            <Reveal key={item.name} step={i + 1}>
              <figure className="flex items-end gap-4 lg:gap-6">
                <div className="relative w-32 shrink-0 lg:w-[240px]">
                  <div className="nd-ig-ring rounded-[19px] p-[2px] lg:rounded-[23px] lg:p-[3px]">
                    <Media photo={item.media} className="aspect-[9/16] rounded-[17px] bg-surface-raised lg:rounded-[20px]" />
                  </div>
                  <span className="absolute -right-3 -bottom-3 grid size-9 place-items-center rounded-full border border-line bg-surface text-orange lg:-right-4 lg:-bottom-4 lg:size-14">
                    <Icon aria-hidden className="size-4 lg:size-6" strokeWidth={2} />
                  </span>
                </div>
                <figcaption className="flex min-w-0 flex-col pb-1 lg:pb-2">
                  <p className="text-body-sm font-bold text-ink">{item.name}</p>
                  <p className="mt-0.5 text-note text-ink-muted">{item.specialty}</p>
                  <p className="mt-4 text-[2rem] leading-none font-bold tracking-[-0.03em] text-orange lg:mt-6 lg:text-[48px]">{item.value}</p>
                  <p className="mt-2 text-body-sm text-ink-soft lg:mt-3">{item.caption}</p>
                </figcaption>
              </figure>
            </Reveal>
          )
        })}
      </div>

      <Reveal step={3} className="mt-8 lg:mt-0">
        <p className="text-note text-ink-muted">{note}</p>
      </Reveal>
    </Slide>
  )
}
