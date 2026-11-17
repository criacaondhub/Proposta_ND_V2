import { BIBLIOTECA, type Goal } from '@/config/content'
import { Chip, type ChipVariant } from '@/components/ui/Atoms'
import { Media } from '@/components/ui/Media'
import { Reveal } from '@/components/ui/Reveal'
import { Slide } from '@/components/ui/Slide'
import { SlideHeader } from '@/components/ui/Typography'

/* Tag por objetivo: Autoridade (navy), Conexão (peach), Alcance (contorno laranja), Conversão (laranja sólido) */
const GOAL_CHIP: Record<Goal, ChipVariant> = {
  Autoridade: 'navy',
  Conexão: 'peach',
  Alcance: 'outline-orange',
  Conversão: 'orange',
}

// 16 · Entregável 3 · Biblioteca semanal — a grade "agenda" do site em 7 colunas (SEG→DOM) + selo 28/mês
export function Biblioteca() {
  const { eyebrow, title, lead, seal, week, note, why, print } = BIBLIOTECA

  return (
    <Slide theme="light">
      <div className="flex items-start justify-between gap-8">
        <SlideHeader eyebrow={eyebrow} title={title} lead={lead} />
        <Reveal order={3} className="hidden shrink-0 lg:block">
          <div className="flex size-[200px] flex-col items-center justify-center rounded-full bg-orange text-center text-on-accent shadow-cta">
            <p className="flex items-baseline">
              <span className="text-[80px] leading-none font-bold tracking-[-0.03em]">{seal.value}</span>
              <span className="text-[26px] font-bold">{seal.unit}</span>
            </p>
            <p className="mt-1 max-w-[12ch] text-[17px] leading-tight font-bold">{seal.caption}</p>
          </div>
        </Reveal>
      </div>

      <Reveal step={1} className="mt-6 lg:mt-10">
        <ol className="grid gap-2 lg:grid-cols-7 lg:gap-4">
          {week.map((item) => (
            <li key={item.day} className="flex items-center gap-3 lg:flex-col lg:items-stretch lg:gap-3">
              <p className="nd-eyebrow w-10 shrink-0 text-ink-muted lg:w-auto lg:text-center">{item.day}</p>
              <div className="nd-card flex flex-1 items-center justify-between gap-3 p-3 lg:min-h-[236px] lg:flex-col lg:items-start lg:p-6">
                <p className="text-[0.9375rem] leading-snug font-bold text-ink lg:text-[23px]">{item.theme}</p>
                <Chip variant={GOAL_CHIP[item.goal]}>{item.goal}</Chip>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-3 text-note text-ink-muted lg:mt-4">{note}</p>
      </Reveal>

      <Reveal step={2} className="mt-6 lg:mt-auto">
        <div className="grid gap-4 lg:grid-cols-12 lg:items-center lg:gap-8">
          <p className="text-lead text-ink-soft lg:col-span-7">
            <strong className="font-bold text-ink">{why.title}</strong> {why.text}
          </p>
          <Media photo={print} className="h-[180px] rounded-lg lg:col-span-5 lg:h-[250px]" />
        </div>
      </Reveal>
    </Slide>
  )
}
