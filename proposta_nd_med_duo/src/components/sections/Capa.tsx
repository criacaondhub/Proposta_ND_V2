import { CAPA } from '@/config/content'
import { assetUrl } from '@/lib/utils'
import { AgendaGrid } from '@/components/ui/backgrounds/AgendaGrid'
import { Constellation } from '@/components/ui/backgrounds/Constellation'
import { Glow } from '@/components/ui/backgrounds/Glow'
import { Logo } from '@/components/ui/Logo'
import { Reveal } from '@/components/ui/Reveal'
import { RichText } from '@/components/ui/RichText'
import { Slide } from '@/components/ui/Slide'
import { Eyebrow, Title } from '@/components/ui/Typography'

// 01 · Capa — texto à esquerda (7/12), grade "agenda" à direita, glow atrás do título
export function Capa() {
  const { eyebrow, title, badge, proof, filled } = CAPA

  return (
    <Slide
      footer={false}
      background={<Constellation focusX={0.86} focusY={0.32} count={80} seed={3} className="opacity-70" />}
      decor={<Glow className="top-[120px] left-[-160px] h-[860px] w-[1300px]" />}
      className="justify-center"
    >
      <div className="relative z-10 flex max-w-[1040px] flex-col items-start">
        <Reveal order={0}>
          <Logo className="h-7 lg:h-11" />
        </Reveal>
        <Reveal order={1} className="mt-10 lg:mt-16">
          <Eyebrow text={eyebrow} tone="muted" />
        </Reveal>
        <Reveal order={2} className="mt-4 lg:mt-6">
          <Title as="h1" size="display" text={title} />
        </Reveal>
        <Reveal order={3} className="mt-6 lg:mt-10">
          <p className="inline-flex rounded-full border border-orange/40 px-4 py-2 text-body-sm text-ink-soft lg:px-7 lg:py-3.5 lg:text-body">
            <span>
              <RichText text={badge} strongClassName="font-bold text-ink" />
            </span>
          </p>
        </Reveal>
        <Reveal order={4} className="mt-6 flex items-center gap-4 lg:mt-12 lg:gap-5">
          <div className="flex">
            {proof.avatars.map((src, i) => (
              <img
                key={src}
                src={assetUrl(src)}
                alt=""
                className="size-10 rounded-full border-2 border-surface object-cover lg:size-14"
                style={{ marginLeft: i === 0 ? 0 : -10 }}
                draggable={false}
              />
            ))}
          </div>
          <p className="text-body-sm font-bold text-ink-muted">{proof.text}</p>
        </Reveal>
      </div>

      {/* Grade "agenda" do hero do site, em leve perspectiva e com fade para o fundo */}
      <div aria-hidden className="pointer-events-none absolute top-[150px] right-[-40px] hidden w-[800px] text-[20px] [perspective:1800px] lg:block">
        <div className="[transform:rotateX(10deg)_rotateY(-14deg)] [mask-image:linear-gradient(to_bottom,black_50%,transparent_96%)]">
          <AgendaGrid filled={filled} delay={0.9} />
        </div>
      </div>
    </Slide>
  )
}
