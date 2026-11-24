import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { EyeOff, MessageCircle } from 'lucide-react'
import { PROBLEMA } from '@/config/content'
import { useSlide } from '@/lib/deck'
import { Constellation } from '@/components/ui/backgrounds/Constellation'
import { Card } from '@/components/ui/Card'
import { Reveal } from '@/components/ui/Reveal'
import { Slide } from '@/components/ui/Slide'
import { SlideHeader } from '@/components/ui/Typography'

const EASE = [0.22, 1, 0.36, 1] as const

// 07 · 01 · O problema — fagulhas laranjas + brilho da base; "invisíveis" com glow laranja
export function Problema() {
  const { title, lead, phrases, insight } = PROBLEMA
  const { revealed, inView } = useSlide()
  const reduceMotion = useReducedMotion()
  const insightStep = phrases.length + 1
  const showInsight = inView && revealed >= insightStep

  const background = (
    <>
      <Constellation mode="ember" focusX={0.86} focusY={0.22} count={44} seed={11} />
      {/* brilho laranja subindo da base — fade in/out conforme o slide entra/sai */}
      <motion.div
        className="absolute inset-x-0 bottom-0 h-[65%] pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: inView ? 1 : 0 }}
        transition={{ duration: inView ? 0.8 : 0.4, ease: 'easeInOut' }}
      >
        <div
          className="ember-pulse h-full w-full"
          style={{
            background:
              'radial-gradient(ellipse 130% 55% at 50% 100%, rgba(249,115,22,0.32) 0%, rgba(249,115,22,0.14) 38%, rgba(249,115,22,0.04) 60%, transparent 75%)',
          }}
        />
      </motion.div>
    </>
  )

  return (
    <Slide background={background}>
      {/* wrapper ember-glow: "invisíveis" recebe glow laranja pulsante via CSS */}
      <div className="ember-glow">
        <SlideHeader title={title} lead={lead} className="max-w-[1400px]" />
      </div>

      <ul className="mt-8 grid gap-3 lg:mt-12 lg:grid-cols-6 lg:grid-rows-2 lg:gap-6">
        {phrases.map((phrase, i) => {
          /* 3 em cima (cols 1-2, 3-4, 5-6) · 2 embaixo centralizadas (cols 2-3, 4-5) */
          const placement = [
            'lg:col-span-2 lg:col-start-1',
            'lg:col-span-2 lg:col-start-3',
            'lg:col-span-2 lg:col-start-5',
            'lg:col-span-2 lg:col-start-2',
            'lg:col-span-2 lg:col-start-4',
          ][i]
          return (
            <Reveal as="li" key={phrase.quote} step={i + 1} className={`flex ${placement}`}>
              <Card className="w-full border border-orange/15 bg-surface-raised/[.97] lg:p-8">
                <MessageCircle aria-hidden className="size-6 text-orange lg:size-9" strokeWidth={1.75} />
                <p className="mt-4 text-h4 text-ink lg:mt-6">"{phrase.quote}"</p>
                <p className="mt-2 text-body-sm text-ink-muted lg:mt-3">{phrase.text}</p>
              </Card>
            </Reveal>
          )
        })}
      </ul>

      <AnimatePresence>
        {showInsight && (
          <motion.div
            key="insight-overlay"
            className="absolute inset-0 z-20 flex items-center justify-center px-6 lg:px-slide-x"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <div aria-hidden className="absolute inset-0 bg-surface/55 backdrop-blur-xl" />
            <motion.div
              className="relative z-10 w-full max-w-[920px]"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.05 }}
            >
              <Card variant="alert" className="w-full shadow-float lg:p-12">
                <div className="flex items-center gap-3">
                  <EyeOff aria-hidden className="size-6 text-orange-soft lg:size-10" strokeWidth={1.75} />
                  <p className="nd-eyebrow text-orange-soft">{insight.eyebrow}</p>
                </div>
                <p className="mt-4 text-body text-peach lg:mt-6 lg:text-[26px] lg:leading-[1.35]">{insight.text}</p>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Slide>
  )
}
