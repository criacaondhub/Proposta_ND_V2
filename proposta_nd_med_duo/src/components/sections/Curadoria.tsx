import { ShieldCheck } from 'lucide-react'
import { CURADORIA } from '@/config/content'
import { cn } from '@/lib/utils'
import { CheckList, Chip } from '@/components/ui/Atoms'
import { Card } from '@/components/ui/Card'
import { Reveal } from '@/components/ui/Reveal'
import { Slide } from '@/components/ui/Slide'
import { Title } from '@/components/ui/Typography'

// 12 · Curadoria de conteúdo ND — citação, stepper de 6 passos (1 uma vez, 2–6 todo mês), entrega × você
export function Curadoria() {
  const { quote, text, onceTag, monthlyTag, cfmTag, process, delivers, yours } = CURADORIA

  return (
    <Slide>
      <Reveal order={1}>
        {/* aspas laranja grandes na citação */}
        <Title text={`**“**${quote}**”**`} size="title-sm" className="max-w-[1560px]" />
      </Reveal>
      <Reveal order={2} className="mt-3 lg:mt-5">
        <p className="text-lead text-ink-muted">{text}</p>
      </Reveal>

      <Reveal step={1} className="mt-8 lg:mt-12">
        {/* marcadores de frequência (desktop): passo 1 uma vez; chave sobre os passos 2–6 */}
        <div aria-hidden className="mb-3 hidden grid-cols-6 gap-8 lg:grid">
          <div>
            <Chip variant="outline" className="uppercase">
              {onceTag}
            </Chip>
          </div>
          <div className="relative col-span-5 flex justify-center">
            {/* bracket começa no centro do círculo 2 e termina no centro do círculo 6 (cada col ≈ 20%, círculo ≈ 24px do início) */}
            <span className="absolute top-1/2 right-[18%] left-[2%] h-3 rounded-t-md border-x border-t border-orange/50" />
            <Chip variant="tint" className="relative bg-surface uppercase ring-8 ring-surface">
              {monthlyTag}
            </Chip>
          </div>
        </div>

        <ol className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-6 lg:gap-8">
          {process.map((step, i) => (
            <li key={step.title} className="flex flex-col">
              <div className="flex items-center">
                <span
                  className={cn(
                    'grid size-10 shrink-0 place-items-center rounded-full border-2 text-body-sm font-bold tabular-nums lg:size-12',
                    i === 0 ? 'border-ink-muted text-ink' : 'border-orange bg-orange-tint text-orange-soft',
                  )}
                >
                  {i + 1}
                </span>
                {i < process.length - 1 && (
                  <span
                    aria-hidden
                    className={cn('ml-3 hidden h-0 flex-1 border-t lg:-mr-8 lg:block', i === 0 ? 'border-dashed border-ink-muted/60' : 'border-line')}
                  />
                )}
              </div>
              <p className="mt-3 text-[1.0625rem] font-bold text-ink lg:mt-4 lg:text-[24px]">{step.title}</p>
              <p className="mt-1 text-[0.875rem] leading-snug text-ink-muted lg:text-[19px]">{step.text}</p>
              {(i === 0 || i === 1) && (
                <Chip variant={i === 0 ? 'outline' : 'tint'} className="mt-2 self-start uppercase lg:hidden">
                  {i === 0 ? onceTag : monthlyTag}
                </Chip>
              )}
              {step.cfm && (
                <Chip variant="tint" className="mt-3 self-start">
                  <ShieldCheck aria-hidden className="size-[1.1em]" strokeWidth={2} />
                  {cfmTag}
                </Chip>
              )}
            </li>
          ))}
        </ol>
      </Reveal>

      <Reveal step={2} className="mt-8 lg:mt-14">
        <div className="grid gap-3 lg:grid-cols-12 lg:gap-8">
          <Card className="lg:col-span-8 lg:px-10 lg:py-8">
            <p className="nd-eyebrow text-orange-soft">{delivers.title}</p>
            <CheckList items={delivers.items} className="mt-4 lg:mt-5 lg:grid lg:grid-cols-2 lg:gap-x-10 lg:gap-y-4" />
          </Card>
          <Card variant="outline" className="lg:col-span-4 lg:px-9 lg:py-8">
            <p className="nd-eyebrow text-ink-muted">{yours.title}</p>
            <p className="mt-4 text-body-sm text-ink-soft lg:mt-5">{yours.text}</p>
          </Card>
        </div>
      </Reveal>
    </Slide>
  )
}
