import { ImagePlus } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { SITE, type Photo } from '@/config/content'
import { assetUrl, cn } from '@/lib/utils'

interface MediaProps {
  photo: Photo
  className?: string
  imgClassName?: string
}

/*
 * Imagem com espaço reservado: enquanto o arquivo não existir em public/assets/,
 * mostra um card tracejado com o nome esperado do arquivo.
 */
export function Media({ photo, className, imgClassName }: MediaProps) {
  const [missing, setMissing] = useState(false)

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {missing ? (
        <div className="nd-placeholder flex h-full w-full flex-col items-center justify-center gap-2 rounded-[inherit] p-3 text-center lg:gap-3 lg:p-5">
          <ImagePlus aria-hidden className="size-5 lg:size-9" strokeWidth={1.75} />
          <span className="text-note leading-snug font-bold text-balance">{photo.label ?? SITE.mediaPending}</span>
          <span className="text-[10px] break-all opacity-75 lg:text-[13px]">{photo.src.replace('assets/', 'public/assets/')}</span>
        </div>
      ) : (
        <img
          src={assetUrl(photo.src)}
          alt={photo.alt}
          decoding="async"
          onError={() => setMissing(true)}
          className={cn('block h-full w-full object-cover', imgClassName)}
          draggable={false}
        />
      )}
    </div>
  )
}

/* Mockup de celular — moldura escura fina com o print dentro (sempre no tema escuro) */
export function Phone({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      data-theme="dark"
      className={cn('rounded-[26px] border border-line bg-navy-900 p-1.5 shadow-float lg:rounded-[44px] lg:p-3', className)}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[20px] bg-surface-raised lg:rounded-[34px]">
        {children}
        <span aria-hidden className="absolute top-2 left-1/2 h-1.5 w-12 -translate-x-1/2 rounded-full bg-navy-900/90 lg:top-3 lg:h-2 lg:w-20" />
      </div>
    </div>
  )
}
