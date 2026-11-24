import { motion, useReducedMotion, type Variants } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { Calendar, CalendarCheck, MessageCircle, Store } from 'lucide-react'
import { VIRADA } from '@/config/content'
import { useSlide } from '@/lib/deck'
import { pad2 } from '@/lib/utils'
import { Stars } from '@/components/ui/backgrounds/Stars'
import { Card } from '@/components/ui/Card'
import { Reveal } from '@/components/ui/Reveal'
import { Slide } from '@/components/ui/Slide'
import { SlideHeader, Title } from '@/components/ui/Typography'

/*
 * Cada ícone tem um loop próprio alinhado ao que ele representa:
 * Calendar — "tick" sutil (gira levinho e volta, como virar página)
 * Store — abre/respira (escala + leve bob)
 * MessageCircle — campainha (rotação curta, estilo toque de WhatsApp)
 * CalendarCheck — pulso aprovado (scale + brilho)
 */
const ICON_MOTIONS: Record<string, Variants> = {
  Calendar: {
    animate: {
      rotate: [0, -18, 18, -10, 10, 0],
      scale: [1, 1.1, 1.1, 1.05, 1],
      transition: { duration: 1.8, repeat: Infinity, repeatDelay: 0.6, ease: 'easeInOut' },
    },
  },
  Store: {
    animate: {
      y: [0, -10, 0],
      scale: [1, 1.18, 1],
      rotate: [0, -3, 3, 0],
      transition: { duration: 1.9, repeat: Infinity, repeatDelay: 0.4, ease: 'easeInOut' },
    },
  },
  MessageCircle: {
    animate: {
      rotate: [0, 22, -22, 18, -14, 10, -6, 0],
      scale: [1, 1.1, 1.1, 1.05, 1.05, 1, 1, 1],
      transition: { duration: 1.1, repeat: Infinity, repeatDelay: 0.5, ease: 'easeInOut' },
    },
  },
  CalendarCheck: {
    animate: {
      scale: [1, 1.3, 0.92, 1.15, 1],
      rotate: [0, 4, -4, 2, 0],
      transition: { duration: 1.4, repeat: Infinity, repeatDelay: 0.6, ease: 'easeInOut' },
    },
  },
}

function getMotionKey(icon: LucideIcon): keyof typeof ICON_MOTIONS {
  if (icon === Calendar) return 'Calendar'
  if (icon === Store) return 'Store'
  if (icon === MessageCircle) return 'MessageCircle'
  if (icon === CalendarCheck) return 'CalendarCheck'
  return 'Calendar'
}

function AnimatedIconBox({ icon: Icon, delay = 0 }: { icon: LucideIcon; delay?: number }) {
  const reduceMotion = useReducedMotion()
  const variants = ICON_MOTIONS[getMotionKey(Icon)]

  return (
    <span
      aria-hidden
      className="grid size-11 shrink-0 place-items-center rounded-md bg-orange-tint text-orange lg:size-16"
    >
      <motion.span
        className="inline-flex"
        variants={reduceMotion ? undefined : variants}
        animate={reduceMotion ? undefined : 'animate'}
        style={{ transformOrigin: '50% 50%' }}
        transition={{ delay }}
      >
        <Icon className="size-5 lg:size-8" strokeWidth={1.75} />
      </motion.span>
    </span>
  )
}

const EASE = [0.22, 1, 0.36, 1] as const

// 08 · A virada — céu estrelado + "PARAÍSO" em contorno + luz fria no topo
export function Virada() {
  const { title, moments, closing } = VIRADA
  const { inView, revealed } = useSlide()
  const reduceMotion = useReducedMotion()

  const background = (
    <>
      <Stars />

      {/* "PARAÍSO" em contorno — desfoca após a aparição do primeiro card */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-center overflow-hidden">
        <motion.span
          className="select-none whitespace-nowrap font-sans font-bold uppercase lg:text-[490px]"
          initial={{ opacity: 0 }}
          animate={{
            opacity: inView ? 1 : 0,
            filter: revealed >= 1 ? 'blur(22px)' : 'blur(0px)',
          }}
          transition={{
            opacity: { duration: 1.1, ease: 'easeOut' },
            filter: { duration: 1.6, ease: EASE },
          }}
          style={{
            lineHeight: 0.88,
            letterSpacing: '0',
            color: 'transparent',
            WebkitTextStroke: '1.5px rgb(180 215 255 / 0.38)',
          }}
        >
          paraíso
        </motion.span>
      </div>

      {/* luz fria no topo — entra suave quando o slide fica visível */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-0 h-[60%]"
        initial={{ opacity: 0 }}
        animate={{ opacity: inView ? 1 : 0 }}
        transition={{ duration: reduceMotion ? 0 : 1.2, ease: 'easeOut' }}
        style={{
          background:
            'radial-gradient(ellipse 100% 90% at 50% 0%, rgba(147,197,253,0.14) 0%, rgba(100,160,255,0.06) 50%, transparent 80%)',
        }}
      />
    </>
  )

  return (
    <Slide background={background}>
      <SlideHeader title={title} />

      <div className="lg:my-auto lg:pt-6">
        <ol className="relative mt-8 grid gap-3 lg:mt-0 lg:grid-cols-4 lg:gap-8">
          {/* linha da timeline, aparece entre os cards na altura dos ícones */}
          <span aria-hidden className="absolute top-[68px] right-[12%] left-[12%] hidden h-px bg-ink-muted/40 lg:block" />
          {moments.map((moment, i) => (
            <Reveal as="li" key={moment.title} step={i + 1} className="relative flex">
              <Card className="w-full lg:min-h-[400px] lg:p-9">
                <div className="flex items-center justify-between">
                  <AnimatedIconBox icon={moment.icon} delay={i * 0.35} />
                  <span className="nd-eyebrow text-ink-muted tabular-nums">{pad2(i + 1)}</span>
                </div>
                <h3 className="mt-5 text-h4 text-ink lg:mt-10">{moment.title}</h3>
                <p className="mt-2 text-body-sm text-ink-soft lg:mt-4 lg:text-body">{moment.text}</p>
              </Card>
            </Reveal>
          ))}
        </ol>

        <Reveal step={moments.length + 1} className="mt-4 lg:mt-10">
          <div className="rounded-lg bg-brand-navy px-5 py-6 lg:px-12 lg:py-10">
            <Title as="p" size="h3" text={closing} />
          </div>
        </Reveal>
      </div>
    </Slide>
  )
}
