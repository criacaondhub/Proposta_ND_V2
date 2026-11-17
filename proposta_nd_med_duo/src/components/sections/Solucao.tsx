import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { SOLUCAO } from '@/config/content'
import { useSlide } from '@/lib/deck'
import { IconBox } from '@/components/ui/Atoms'
import { Constellation } from '@/components/ui/backgrounds/Constellation'
import { PatternRail } from '@/components/ui/backgrounds/PatternRail'
import { Card } from '@/components/ui/Card'
import { Slide } from '@/components/ui/Slide'
import { SlideHeader } from '@/components/ui/Typography'

const EASE = [0.22, 1, 0.36, 1] as const

/* Entrada mais evidente: scale + translate + rotação sutil, controlado pelo step do slide */
function PillarReveal({ step, children }: { step: number; children: ReactNode }) {
  const { inView, revealed, stepMode } = useSlide()
  const reduceMotion = useReducedMotion()
  const visible = inView && revealed >= step
  // Em touch (sem stepMode), encadeia 160ms entre cards depois do header
  const cascadeDelay = stepMode ? 0 : 0.3 + (step - 1) * 0.16

  if (reduceMotion) {
    return (
      <div className="flex" data-reveal inert={inView && !visible ? true : undefined} style={{ opacity: visible ? 1 : 0 }}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      className="flex"
      data-reveal
      initial={{ opacity: 0, y: 56, scale: 0.88, rotate: -1.5 }}
      animate={visible ? { opacity: 1, y: 0, scale: 1, rotate: 0 } : { opacity: 0, y: 56, scale: 0.88, rotate: -1.5 }}
      transition={
        visible
          ? { duration: 0.65, ease: EASE, delay: cascadeDelay }
          : { duration: 0.25, ease: 'easeIn' }
      }
      inert={inView && !visible}
    >
      {children}
    </motion.div>
  )
}

// 13 · 03 · A solução — abertura de capítulo com os 4 pilares (o primeiro com borda gradiente)
export function Solucao() {
  const { title, lead, pillars } = SOLUCAO

  return (
    <Slide
      background={
        <>
          <Constellation focusX={0.82} focusY={0.24} count={110} seed={31} />
          <PatternRail side="left" />
        </>
      }
    >
      <SlideHeader title={title} lead={lead} align="center" className="mx-auto max-w-[1300px]" leadClassName="mx-auto" />

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-8">
        {pillars.map((pillar, i) => (
          <PillarReveal key={pillar.title} step={i + 1}>
            <Card variant={i === 0 ? 'featured' : 'default'} className="flex w-full flex-col lg:p-10">
              <IconBox icon={pillar.icon} />
              <h3 className="mt-6 text-h3 text-ink lg:mt-10 lg:text-[40px]">{pillar.title}</h3>
              <p className="mt-3 text-body-sm text-ink-muted lg:mt-4">{pillar.text}</p>
            </Card>
          </PillarReveal>
        ))}
      </div>
    </Slide>
  )
}
