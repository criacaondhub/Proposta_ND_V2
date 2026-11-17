import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

const VARIANTS = {
  /* branco no claro, surface-raised no escuro */
  default: 'nd-card',
  /* borda em gradiente CTA ("a opção certa") */
  featured: 'nd-card-featured',
  /* laranja translúcido (alerta / insight) */
  alert: 'nd-card-alert',
  /* contorno neutro */
  outline: 'nd-card-outline',
} as const

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof VARIANTS
}

export function Card({ variant = 'default', className, ...props }: CardProps) {
  return <div className={cn(VARIANTS[variant], 'p-5 lg:p-9', className)} {...props} />
}
