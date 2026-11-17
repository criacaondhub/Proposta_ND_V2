import type { DeckSlide } from '@/components/ui/Deck'
import {
  AUDIENCIA,
  BASTIDORES,
  BIBLIOTECA,
  CAPA,
  CHATGPT,
  CLIENTES,
  COMPROMISSO,
  CONTA,
  CRIATIVOS,
  CURADORIA,
  ENCERRAMENTO,
  ESCALA,
  INVESTIMENTO,
  MAQUINA,
  MOTORES,
  PAUSA,
  PROBLEMA,
  QUEM_SOMOS,
  RELATORIO,
  RESULTADOS,
  REUNIAO,
  ROI,
  SOLUCAO,
  TRAFEGO,
  VIRADA,
} from '@/config/content'
import { Audiencia } from './Audiencia'
import { Bastidores } from './Bastidores'
import { Biblioteca } from './Biblioteca'
import { Capa } from './Capa'
import { ChatGpt } from './ChatGpt'
import { Clientes } from './Clientes'
import { Compromisso } from './Compromisso'
import { Conta } from './Conta'
import { Criativos } from './Criativos'
import { Curadoria } from './Curadoria'
import { Encerramento } from './Encerramento'
import { Escala } from './Escala'
import { Investimento } from './Investimento'
import { Maquina } from './Maquina'
import { Motores } from './Motores'
import { Pausa } from './Pausa'
import { Problema } from './Problema'
import { QuemSomos } from './QuemSomos'
import { Relatorio } from './Relatorio'
import { Resultados } from './Resultados'
import { Reuniao } from './Reuniao'
import { Roi } from './Roi'
import { Solucao } from './Solucao'
import { Trafego } from './Trafego'
import { Virada } from './Virada'

/*
 * Ordem da apresentação (25 slides).
 * `steps` = quantas vezes o "avançar" revela itens do slide antes de passar ao próximo (desktop).
 */
export const SLIDES: DeckSlide[] = [
  { id: CAPA.id, label: CAPA.label, steps: 0, Component: Capa },
  { id: QUEM_SOMOS.id, label: QUEM_SOMOS.label, steps: 2, Component: QuemSomos },
  { id: CLIENTES.id, label: CLIENTES.label, steps: 0, Component: Clientes },
  { id: RESULTADOS.id, label: RESULTADOS.label, steps: 3, Component: Resultados },
  { id: BASTIDORES.id, label: BASTIDORES.label, steps: 0, Component: Bastidores },
  { id: AUDIENCIA.id, label: AUDIENCIA.label, steps: 3, Component: Audiencia },
  { id: PROBLEMA.id, label: PROBLEMA.label, steps: PROBLEMA.phrases.length + 1, Component: Problema },
  { id: VIRADA.id, label: VIRADA.label, steps: VIRADA.moments.length + 1, Component: Virada },
  { id: CHATGPT.id, label: CHATGPT.label, steps: 1, Component: ChatGpt },
  { id: ESCALA.id, label: ESCALA.label, steps: ESCALA.steps.length + 1, Component: Escala },
  { id: MOTORES.id, label: MOTORES.label, steps: 3, Component: Motores },
  { id: CURADORIA.id, label: CURADORIA.label, steps: 2, Component: Curadoria },
  { id: SOLUCAO.id, label: SOLUCAO.label, steps: SOLUCAO.pillars.length, Component: Solucao },
  { id: TRAFEGO.id, label: TRAFEGO.label, steps: 2, Component: Trafego },
  { id: CRIATIVOS.id, label: CRIATIVOS.label, steps: 3, Component: Criativos },
  { id: BIBLIOTECA.id, label: BIBLIOTECA.label, steps: 2, Component: Biblioteca },
  { id: RELATORIO.id, label: RELATORIO.label, steps: 1, Component: Relatorio },
  { id: REUNIAO.id, label: REUNIAO.label, steps: 2, Component: Reuniao },
  { id: PAUSA.id, label: PAUSA.label, steps: 0, Component: Pausa },
  { id: CONTA.id, label: CONTA.label, steps: 2, Component: Conta },
  { id: MAQUINA.id, label: MAQUINA.label, steps: 3, Component: Maquina },
  { id: COMPROMISSO.id, label: COMPROMISSO.label, steps: COMPROMISSO.questions.length - 1, Component: Compromisso },
  { id: INVESTIMENTO.id, label: INVESTIMENTO.label, steps: 2, Component: Investimento },
  { id: ROI.id, label: ROI.label, steps: ROI.funnel.length + 1, Component: Roi },
  { id: ENCERRAMENTO.id, label: ENCERRAMENTO.label, steps: 0, Component: Encerramento },
]
