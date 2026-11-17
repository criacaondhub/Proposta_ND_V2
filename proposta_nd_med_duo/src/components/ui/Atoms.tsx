import { ArrowRight, Check, X, type LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { CONFIG, isPending } from '@/config/content'
import { cn } from '@/lib/utils'
import { RichText } from './RichText'

/* Caixa de ícone — 64px no palco, raio 16, fundo orange-tint, ícone Lucide linear */
export function IconBox({ icon: Icon, size = 'md', className }: { icon: LucideIcon; size?: 'sm' | 'md'; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        'grid shrink-0 place-items-center rounded-md bg-orange-tint text-orange',
        size === 'md' ? 'size-11 lg:size-16' : 'size-9 lg:size-14',
        className,
      )}
    >
      <Icon className={size === 'md' ? 'size-5 lg:size-8' : 'size-4 lg:size-7'} strokeWidth={1.75} />
    </span>
  )
}

/* Tag / chip — pill 700. sólida laranja (ND), navy (VOCÊ), contorno (SEU TIME), peach, tint */
const CHIP_VARIANTS = {
  orange: 'bg-orange text-on-accent',
  navy: 'bg-brand-navy text-on-accent',
  outline: 'border border-ink/35 text-ink',
  'outline-orange': 'border border-orange text-orange-soft',
  peach: 'bg-peach text-brand-navy',
  tint: 'bg-orange-tint text-orange-soft',
} as const

export type ChipVariant = keyof typeof CHIP_VARIANTS

export function Chip({ children, variant = 'orange', className }: { children: ReactNode; variant?: ChipVariant; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-note leading-tight font-bold whitespace-nowrap lg:px-4 lg:py-1.5',
        CHIP_VARIANTS[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}

/* Lista com check (traço 3, orange-soft) ou lista negativa (x, ink-muted, texto apagado) */
export function CheckList({
  items,
  negative = false,
  className,
  itemClassName,
}: {
  items: readonly string[]
  negative?: boolean
  className?: string
  itemClassName?: string
}) {
  const Icon = negative ? X : Check
  return (
    <ul className={cn('flex flex-col gap-2.5 lg:gap-4', className)}>
      {items.map((item) => (
        <li key={item} className={cn('flex items-start gap-3 text-body-sm', negative ? 'text-ink/65' : 'text-ink', itemClassName)}>
          <Icon
            aria-hidden
            className={cn('mt-[0.2em] size-[1.05em] shrink-0', negative ? 'text-ink-muted' : 'text-orange-soft')}
            strokeWidth={negative ? 2.5 : 3}
          />
          <span>
            <RichText text={item} />
          </span>
        </li>
      ))}
    </ul>
  )
}

/* Número de destaque com unidade menor ao lado: R$ 788.000 /mês */
export function Stat({
  value,
  prefix,
  unit,
  size = 'stat',
  className,
}: {
  value: string
  prefix?: string
  unit?: string
  size?: 'stat' | 'stat-sm'
  className?: string
}) {
  return (
    <p className={cn('flex flex-wrap items-baseline gap-x-[0.12em] text-orange', size === 'stat' ? 'text-stat' : 'text-stat-sm', className)}>
      {prefix && <span className="mr-[0.08em] text-[0.42em] tracking-[-0.01em]">{prefix}</span>}
      <span className="tabular-nums">{value}</span>
      {unit && <span className="ml-[0.08em] text-[0.36em] tracking-[-0.01em]">{unit}</span>}
    </p>
  )
}

/* Botão primário — pill em gradiente CTA com seta. Destino pendente = botão sem ação. */
export function CtaButton({ children, href = CONFIG.CTA_URL, className }: { children: ReactNode; href?: string; className?: string }) {
  const content = (
    <>
      {children}
      <ArrowRight aria-hidden className="size-[1.1em]" strokeWidth={2.25} />
    </>
  )
  if (isPending(href)) {
    return (
      <button type="button" className={cn('nd-btn', className)}>
        {content}
      </button>
    )
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cn('nd-btn', className)}>
      {content}
    </a>
  )
}
