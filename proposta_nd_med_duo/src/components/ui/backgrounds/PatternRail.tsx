import { assetUrl, cn } from '@/lib/utils'

/*
 * PatternRail — trilha vertical do "Pattern ND.svg" ancorada na borda do palco.
 * O SVG é usado como `mask`, o que permite trocar a cor via `background-color`
 * (branco p/ slides escuros, laranja da marca p/ slides claros).
 * A camada externa aplica uma máscara em gradiente nos topos pra esconder o corte.
 */
export function PatternRail({
  side = 'right',
  tone = 'light',
  className,
}: {
  side?: 'left' | 'right'
  /** `light` = branco (p/ slides escuros) · `orange` = laranja da marca (p/ slides claros) */
  tone?: 'light' | 'orange'
  className?: string
}) {
  const positionClass = side === 'right' ? 'right-0' : 'left-0'
  const fade = 'linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)'
  const patternUrl = `url("${assetUrl('assets/Pattern ND.svg')}")`
  const maskPosition = side === 'right' ? 'right -65px center' : 'left -65px center'
  const color = tone === 'orange' ? 'var(--color-orange)' : '#ffffff'
  const opacity = tone === 'orange' ? 0.16 : 0.08

  return (
    <div
      aria-hidden
      className={cn('pointer-events-none absolute inset-y-0 w-[50px] lg:w-[100px]', positionClass, className)}
      style={{
        maskImage: fade,
        WebkitMaskImage: fade,
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: color,
          opacity,
          maskImage: patternUrl,
          WebkitMaskImage: patternUrl,
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
          maskSize: 'auto 140%',
          WebkitMaskSize: 'auto 140%',
          maskPosition,
          WebkitMaskPosition: maskPosition,
        }}
      />
    </div>
  )
}
