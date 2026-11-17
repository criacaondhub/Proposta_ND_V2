import { SITE } from '@/config/content'
import { assetUrl, cn } from '@/lib/utils'

/* Logo oficial (monograma N·D + NOVA DIMENSÃO): branco no escuro, navy #212D5B no claro */
export function Logo({ theme = 'dark', className }: { theme?: 'dark' | 'light'; className?: string }) {
  return (
    <img
      src={assetUrl(theme === 'light' ? 'assets/logo-nd-navy.svg' : 'assets/logo-nd-branco.svg')}
      alt={SITE.brand}
      width={2309}
      height={549}
      className={cn('block w-auto select-none', className)}
      draggable={false}
    />
  )
}
