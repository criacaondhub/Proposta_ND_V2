import { motion, useReducedMotion } from 'framer-motion'
import type { CSSProperties, ReactNode } from 'react'
import { useSlide } from '@/lib/deck'

const EASE = [0.22, 1, 0.36, 1] as const
const TAGS = { div: motion.div, li: motion.li, p: motion.p } as const

interface RevealProps {
  children: ReactNode
  /** 0 = entra com o slide; n = n-ésima etapa revelada ao avançar */
  step?: number
  /** posição na cascata dentro da mesma etapa (eyebrow → título → corpo → resto) */
  order?: number
  as?: keyof typeof TAGS
  /** atraso extra em segundos */
  delay?: number
  className?: string
  /** variáveis CSS de posição (ex.: colagens); o transform da animação é do framer */
  style?: CSSProperties
}

/* Entrada suave do design system: fade + translateY 16px, 500ms, ease-out */
export function Reveal({ children, step = 0, order = 0, as = 'div', delay = 0, className, style }: RevealProps) {
  const { inView, revealed, stepMode } = useSlide()
  const reduceMotion = useReducedMotion()
  const visible = inView && revealed >= step
  const Tag = TAGS[as]

  // Sem modo etapas (celular/touch) as etapas entram em cascata logo depois do cabeçalho.
  const stepDelay = step > 0 && !stepMode ? 0.3 + (step - 1) * 0.12 : 0
  const offset = reduceMotion ? 0 : 16

  return (
    <Tag
      data-reveal
      className={className}
      style={style}
      initial={{ opacity: 0, y: offset }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: offset }}
      transition={
        visible
          ? { duration: 0.5, ease: EASE, delay: delay + stepDelay + order * 0.08 }
          : { duration: 0.25, ease: 'easeIn' }
      }
      inert={inView && !visible}
    >
      {children}
    </Tag>
  )
}
