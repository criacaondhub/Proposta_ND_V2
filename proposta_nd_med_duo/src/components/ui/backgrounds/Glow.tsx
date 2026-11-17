import { cn } from '@/lib/utils'

/* Glow radial do hero: brand-navy a 90% dissolvendo no navy-900, atrás do título */
export function Glow({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn('pointer-events-none absolute bg-[radial-gradient(closest-side,rgb(33_45_91/0.9),transparent)]', className)}
    />
  )
}
