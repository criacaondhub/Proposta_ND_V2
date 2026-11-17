import { AtSign, BadgeCheck } from 'lucide-react'
import { CLIENTES, SITE } from '@/config/content'
import { Media } from '@/components/ui/Media'
import { Reveal } from '@/components/ui/Reveal'
import { Slide } from '@/components/ui/Slide'
import { SlideHeader } from '@/components/ui/Typography'

// 03 · Clientes — grade de cards de perfil no estilo do site (foto, nome, especialidade, @ verificado, seguidores)
export function Clientes() {
  const { title, items } = CLIENTES

  return (
    <Slide theme="light" className="lg:justify-center">
      <SlideHeader title={title} align="center" />

      <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:mt-14 lg:grid-cols-6 lg:gap-6">
        {items.map((client, i) => (
          <Reveal as="li" key={client.handle} order={2 + i * 0.5} className="flex">
            <article className="nd-card flex w-full flex-col items-center p-3 text-center lg:px-5 lg:py-7">
              <div className="nd-ig-ring rounded-full p-[2px] lg:p-[3px]">
                <Media
                  photo={{ src: client.src, alt: client.name, label: client.name }}
                  className="size-16 rounded-full border-2 border-white bg-white lg:size-24 lg:border-[3px]"
                />
              </div>
              <h3 className="mt-3 text-[0.875rem] leading-tight font-bold text-balance text-ink lg:mt-5 lg:text-[21px]">{client.name}</h3>
              <p className="mt-1 text-[0.75rem] leading-snug text-balance text-ink-muted lg:mt-1.5 lg:text-[16px]">{client.specialty}</p>
              <p className="mt-auto flex items-center gap-1 pt-3 text-[0.6875rem] font-bold text-ink/80 lg:pt-4 lg:text-[15px]">
                <AtSign aria-hidden className="size-[1em] shrink-0 text-ink-muted" strokeWidth={2} />
                <span className="break-all">{client.handle}</span>
                <BadgeCheck aria-label={SITE.verified} className="size-[1.1em] shrink-0 text-verified" strokeWidth={2.25} />
              </p>
              <p className="mt-1 text-[0.625rem] font-bold tracking-[0.1em] text-ink/60 uppercase lg:mt-1.5 lg:text-[13px]">
                {client.followers} {SITE.followers}
              </p>
            </article>
          </Reveal>
        ))}
      </ul>
    </Slide>
  )
}
