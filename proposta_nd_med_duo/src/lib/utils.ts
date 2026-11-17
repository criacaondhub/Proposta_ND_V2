import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

// Ensina ao tailwind-merge os tokens do design system; sem isso `text-title`
// é lido como cor e some quando aparece junto de `text-ink`, `text-orange` etc.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ['display', 'title', 'title-sm', 'h3', 'h4', 'stat', 'stat-sm', 'lead', 'body', 'body-sm', 'eyebrow', 'note', 'button'],
      spacing: ['slide-x', 'slide-t', 'slide-b'],
      shadow: ['cta', 'card', 'float'],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const pad2 = (n: number) => String(n).padStart(2, '0')

/** 'R$ 5.333' → { prefix: 'R$', value: '5.333' } para o número de destaque com unidade menor */
export function splitCurrency(text: string) {
  const match = text.match(/^(R\$)\s?(.+)$/)
  return match ? { prefix: match[1], value: match[2] } : { prefix: undefined, value: text }
}

/**
 * Resolve um caminho de public/ (ex.: 'assets/foto.webp') contra a base do site (/proposta/).
 * Sem isso, um caminho relativo quebra quando a página é aberta em /proposta sem a barra final.
 */
export function assetUrl(src: string) {
  if (/^([a-z]+:|\/)/i.test(src)) return src
  return `${import.meta.env.BASE_URL}${src}`
}
