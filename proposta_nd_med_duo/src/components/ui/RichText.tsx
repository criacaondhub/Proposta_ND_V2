import { Fragment } from 'react'

interface RichTextProps {
  /** **destaque** e \n = quebra de linha */
  text: string
  strongClassName?: string
}

function withBreaks(text: string) {
  return text.split('\n').flatMap((line, i) => (i === 0 ? [line] : [<br key={`br-${i}`} />, line]))
}

export function RichText({ text, strongClassName = 'font-bold' }: RichTextProps) {
  return (
    <>
      {text
        .split(/(\*\*.+?\*\*)/g)
        .filter(Boolean)
        .map((part, i) =>
          part.startsWith('**') && part.endsWith('**') ? (
            <strong key={i} className={strongClassName}>
              {part.slice(2, -2)}
            </strong>
          ) : (
            <Fragment key={i}>{withBreaks(part)}</Fragment>
          ),
        )}
    </>
  )
}
