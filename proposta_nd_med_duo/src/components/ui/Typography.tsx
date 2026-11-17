import { cn } from '@/lib/utils'
import { Reveal } from './Reveal'
import { RichText } from './RichText'

/* Eyebrow — caixa alta acima do título. accent = capítulo (orange-soft); muted = categoria */
export function Eyebrow({ text, tone = 'accent', className }: { text: string; tone?: 'accent' | 'muted'; className?: string }) {
  return <p className={cn('nd-eyebrow', tone === 'accent' ? 'text-orange-soft' : 'text-ink-muted', className)}>{text}</p>
}

const TITLE_SIZES = {
  display: 'text-display',
  title: 'text-title',
  'title-sm': 'text-title-sm',
  h3: 'text-h3',
} as const

export type TitleSize = keyof typeof TITLE_SIZES

interface TitleProps {
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'p'
  size?: TitleSize
  className?: string
}

/* Título — sempre bold com tracking negativo; **palavra-chave** em laranja */
export function Title({ text, as: Tag = 'h2', size = 'title', className }: TitleProps) {
  return (
    <Tag className={cn('text-balance text-ink', TITLE_SIZES[size], className)}>
      <RichText text={text} strongClassName="font-bold text-orange" />
    </Tag>
  )
}

/* Cabeçalho padrão: eyebrow → título → lead, entrando em cascata */
interface SlideHeaderProps {
  title: string
  eyebrow?: string
  eyebrowTone?: 'accent' | 'muted'
  lead?: string
  as?: TitleProps['as']
  size?: TitleSize
  align?: 'left' | 'center'
  className?: string
  titleClassName?: string
  leadClassName?: string
}

export function SlideHeader({
  title,
  eyebrow,
  eyebrowTone = 'accent',
  lead,
  as = 'h2',
  size = 'title',
  align = 'left',
  className,
  titleClassName,
  leadClassName,
}: SlideHeaderProps) {
  const center = align === 'center'
  return (
    <header className={cn('flex flex-col gap-3 lg:gap-5', center ? 'items-center text-center' : 'items-start text-left', className)}>
      {eyebrow && (
        <Reveal order={0}>
          <Eyebrow text={eyebrow} tone={eyebrowTone} />
        </Reveal>
      )}
      <Reveal order={1}>
        <Title text={title} as={as} size={size} className={titleClassName} />
      </Reveal>
      {lead && (
        <Reveal order={2}>
          <p className={cn('max-w-[62ch] text-pretty text-lead text-ink-muted lg:mt-1', leadClassName)}>
            <RichText text={lead} strongClassName="font-bold text-ink" />
          </p>
        </Reveal>
      )}
    </header>
  )
}
