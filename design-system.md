# Nova Dimensão — Design System

> Extraído de **novadimensaohub.com.br** (novembro/2026). Vale para peças da ND e ND Med: apresentações comerciais, landing pages, carrosséis e criativos.
> Referência de tela: web 1440px. Para slides 1920×1080, multiplique tamanhos de fonte e espaçamentos por **~1,5**.

---

## 1. Princípios

1. **Navy profundo + um laranja.** O fundo é navy (#0B1226) e a única cor de ação é o laranja (#FF4800). Não existe segunda cor de destaque.
2. **Uma família tipográfica.** Helvetica Neue World em tudo. A hierarquia vem só de tamanho, peso (400/700) e cor.
3. **Palavra-chave em laranja.** Todo título tem 1 a 3 palavras em laranja: "Mais **clientes** na sua agenda."
4. **Ritmo escuro ↔ claro.** Seções e slides alternam fundo escuro (#0B1226) e claro (#F4F6FB).
5. **Prova antes de promessa.** Números grandes, cases com foto, @ e selo de verificado, prints reais.
6. **Respiro.** Muito espaço vazio, poucos elementos por tela, um foco por bloco.

---

## 2. Voz e tom

- Direta, em **segunda pessoa** ("você"), frases curtas.
- Fala de **agenda, paciente, cliente, faturamento**, nunca de curtida ou "engajamento" vazio.
- Sem jargão de marketing sem explicação. Números concretos sempre que possível.
- Usa contraste para vender: "Não é só subir campanha. É paciente chegando no seu WhatsApp."
- Exemplos do site/proposta:
  - "Mais clientes na sua agenda."
  - "Seu negócio não precisa de mais um post bonito."
  - "Você grava e atende. A pauta e o tráfego têm método."

---

## 3. Cores

### 3.1 Paleta base
| Token | Hex | Papel |
|---|---|---|
| `navy-950` | `#070C1C` | Fundo mais profundo, rodapé |
| `navy-900` | `#0B1226` | **Fundo padrão escuro** (seções/slides) |
| `navy-800` | `#141C38` | Cards sobre fundo escuro |
| `brand-navy` | `#212D5B` | **Cor da marca** (theme-color), cards de destaque, glow, títulos no claro |
| `slate-500` | `#6F7CA5` | Texto secundário no fundo claro |
| `slate-400` | `#8F9CC4` | Texto secundário/eyebrow no fundo escuro |
| `slate-300` | `#B9C3DC` | Texto terciário sobre navy, linhas de partícula |
| `slate-200` | `#C9D2E8` | Bordas e divisórias no claro |
| `line-dark` | `#2A3560` | Bordas finas no escuro |
| `off-white` | `#F9FBFF` | Texto principal no escuro |
| `paper` | `#F4F6FB` | **Fundo padrão claro** |
| `white` | `#FFFFFF` | Cards no claro |
| `orange` | `#FF4800` | **Ação/destaque**: CTA, palavra-chave, ícones, números |
| `orange-deep` | `#E8470C` | Ícones de destaque, hover do CTA, laranja pequeno no claro |
| `orange-soft` | `#FF8A57` | Checks e eyebrows laranja no escuro |
| `orange-start` | `#F68643` | Início do gradiente do CTA |
| `peach` | `#FFD5C2` | Texto sobre card laranja translúcido |
| `orange-tint` | `rgba(255,72,0,.16)` (escuro) / `rgba(255,72,0,.10)` (claro) | Fundo de célula "✓ Cliente", caixa de ícone |
| `verified` | `#3897F0` | **Só** selo de verificado do Instagram |

### 3.2 Tokens semânticos por tema
| Token | Escuro (padrão) | Claro |
|---|---|---|
| `surface` | `#0B1226` | `#F4F6FB` |
| `surface-deep` | `#070C1C` | `#FFFFFF` |
| `surface-raised` | `#141C38` | `#FFFFFF` |
| `ink` | `#F9FBFF` | `#212D5B` |
| `ink-muted` | `#8F9CC4` | `#6F7CA5` |
| `line` | `#2A3560` | `#C9D2E8` |
| `accent` | `#FF4800` | `#FF4800` |
| `accent-small-text` | `#FF8A57` | `#E8470C` |
| `on-accent` | `#F9FBFF` | `#F9FBFF` |

No tema claro, o corpo de texto também usa navy com opacidade para criar hierarquia: **80%** (corpo), **70%** (secundário), **60%** (terciário).

### 3.3 Gradientes
| Nome | Valor | Uso |
|---|---|---|
| CTA | `linear-gradient(90deg, #F68643 0%, #FF4800 100%)` | Botão primário, bordas de card destacado, letras gigantes (ex.: método ESCALA) |
| Glow hero | `radial-gradient(closest-side, rgba(33,45,91,.9), transparent)` | Atrás do título principal, sobre `#0B1226` |
| Instagram | `linear-gradient(45deg, #FEDA75, #FA7E1E 30%, #D62976 55%, #962FBF 80%, #4F5BD5)` | **Só** anel de avatar/mockup de perfil |

### 3.4 Regras de contraste
- `ink` sobre `surface`: passa AA nos dois temas.
- `orange` (#FF4800) sobre `#0B1226`: ~3,6:1 → laranja como texto **só em ≥24px ou bold**. Para texto pequeno, use `orange-soft` (escuro) ou `orange-deep` (claro).
- Texto sobre botão laranja: sempre `#F9FBFF`, bold, ≥18px.
- Não usar laranja em textos longos, só em palavras-chave, números e ícones.

### 3.5 Proporção de uso
~70% navy/fundo · ~20% texto neutro (branco/slate) · ~10% laranja.

---

## 4. Tipografia

**Família:** `"helvetica-neue-world", "Helvetica Neue", Helvetica, system-ui, -apple-system, sans-serif`
Fonte licenciada pela Adobe Fonts (Typekit). Fallback: Helvetica Neue. Não existe fonte serifada nem secundária.

### 4.1 Escala
| Estilo | Web (1440) | Slide (1920×1080) | Peso | Entrelinha | Tracking | Caixa |
|---|---|---|---|---|---|---|
| Display / H1 | 64px | 96px | 700 | 1,05 | -0,035em | normal |
| H2 (seção) | 48px | 72px | 700 | 1,08 | -0,03em | normal |
| H3 (card) | 36px | 48–54px | 700 | 1,1 | -0,02em | normal |
| Número de destaque | 64–80px | 96–120px | 700 | 1,0 | -0,03em | normal |
| Lead | 18px | 28px | 400 | 1,55 | normal | normal |
| Body | 16px | 24px | 400 | 1,5 | normal | normal |
| Botão | 18px | 24–28px | 700 | 1,3 | normal | normal |
| Eyebrow / label | 12px | 16–18px | 700 | 1,3 | +0,08em | **CAIXA ALTA** |
| Nota / rodapé | 13–14px | 14–16px | 400 | 1,4 | normal | normal |

### 4.2 Regras
- Títulos **sempre bold (700)** com tracking negativo; corpo sempre 400.
- Palavra-chave do título em `orange`.
- Eyebrow sempre acima do título: caixa alta, `ink-muted` (calendário/labels) ou `orange-soft` (capítulo).
- Nunca distorcer nem esticar letras. Se precisar de mais presença, aumente o tamanho proporcionalmente ou troque o peso.
- Largura máxima de parágrafo: ~60–70 caracteres.
- Números com unidade menor ao lado: **R$ 788.000** /mês.

---

## 5. Espaçamento e grid

### 5.1 Escala (base 4px)
| Token | Valor | Uso |
|---|---|---|
| `space-1` | 4px | Ícone ↔ texto em chip |
| `space-2` | 8px | Gap entre células da agenda |
| `space-3` | 12px | Gap interno pequeno |
| `space-4` | 16px | Padding de chip/célula |
| `space-6` | 24px | Padding de card |
| `space-8` | 32px | Gutter do grid |
| `space-12` | 48px | Entre blocos de conteúdo |
| `space-16` | 64px | Entre grupos grandes |
| `space-24` | 96px | Respiro entre seções / margem superior de slide |
| `space-30` | 120px | Margem lateral de slide |

### 5.2 Grid
- **Web:** container ~1200px, 12 colunas, gutter 32px.
- **Slide 1920×1080:** margens laterais 120px, topo 96px, base 80px; 12 colunas, gutter 32px.
- Rodapé fixo nos slides (menos a capa): logo ND pequeno à esquerda, `@novadimensao.med` à direita, `ink-muted`, 16px. Paginação opcional "07 / 25".

---

## 6. Forma: cantos, bordas e sombras

| Token | Valor | Uso |
|---|---|---|
| `radius-sm` | 6px | Células da agenda, chips, inputs |
| `radius-md` | 16px | Cards pequenos, caixa de ícone |
| `radius-lg` | 20px | Cards grandes, mockups, imagens |
| `radius-pill` | 9999px | Botões, tags, avatares |

| Token | Valor | Uso |
|---|---|---|
| `shadow-cta` | `0 8px 24px rgba(255,72,0,.5)` | Botão primário |
| `shadow-card` | `0 1px 2px rgba(33,45,91,.05)` | Card branco no claro |
| `border-card-light` | `1px solid rgba(33,45,91,.06)` | Card branco no claro |
| `border-card-dark` | `1px solid rgba(201,210,232,.12)` | Card no escuro |
| `border-cell` | `1px dashed #2A3560` | Célula vazia da agenda |

Sem sombras pesadas e sem neumorfismo. A profundidade vem de cor de fundo e bordas finas.

---

## 7. Iconografia

- **Estilo:** linear (outline), padrão **Lucide**. Traço **1,75–2px**, pontas e cantos arredondados, grade 24×24.
- **Cores:** `orange`/`orange-deep` em destaque; `ink-muted` neutro no escuro; `brand-navy` no claro.
- **Checks:** `check` com traço 3px em `orange-soft`.
- **Caixa de ícone:** quadrado 56–64px, `radius-md`, fundo `orange-tint`, ícone 28–32px centralizado.
- **Tamanhos:** 16px (inline), 24px (lista), 28–36px (card), 40–56px (slide).
- **Proibido:** ícones preenchidos, emoji, ilustração 3D, ícones multicoloridos.

### Biblioteca sugerida (Lucide)
| Conceito | Ícone |
|---|---|
| Crescimento / resultado | `trending-up`, `bar-chart-3` |
| Estratégia / alvo | `target` |
| Anúncio / aquisição | `megaphone` |
| WhatsApp / conversa | `message-circle` |
| Agendamento | `calendar-check`, `calendar` |
| Time / pessoas | `users`, `user-check` |
| Conteúdo / roteiro | `file-text`, `sparkles` |
| Vídeo | `clapperboard`, `play` |
| Estático | `image` |
| Compliance / segurança | `shield-check` |
| Tempo / velocidade | `clock`, `timer` |
| Transparência | `eye` |
| Ciclo / follow-up | `repeat` |
| Investimento | `wallet`, `calculator` |
| Escala | `rocket` |
| Ação | `arrow-right` |

---

## 8. Elementos de assinatura

### 8.1 Grade "agenda"
O elemento visual mais reconhecível do site (hero).
- Tabela com colunas **SEG–SEX** (ou SEG–DOM) e linhas de horário (08h, 09h, 10h…).
- Cabeçalho dos dias: eyebrow 12px, 700, caixa alta, `ink-muted`.
- Célula vazia: `radius-sm`, borda `border-cell` tracejada.
- Célula preenchida: fundo `orange-tint`, borda 1px `orange` a ~40%, texto "✓ Cliente" em `peach`, check em `orange-soft`.
- Fade inferior para o fundo e leve perspectiva.
- **Uso:** capa, encerramento, calendários de conteúdo, "agenda cheia".

### 8.2 Constelação / partículas
- Pontos e linhas finas em `ink-muted`/branco sobre navy, com vinheta radial e um núcleo mais denso.
- **Uso:** fundo de abertura de capítulo e etapas do método ("Captar", "Converter").
- Sempre sutil, atrás do texto, nunca competindo com o título.

### 8.3 Glow radial
- `radial-gradient` em `brand-navy` 90% atrás do título principal, sobre `navy-900`.

### 8.4 Prova social
- Avatares redondos sobrepostos (−8px), borda 2px do fundo + texto "+350 negócios atendidos" em `ink-muted`.

---

## 9. Componentes

### 9.1 Botão primário (CTA)
- Formato pill (`radius-pill`), fundo gradiente CTA, texto `on-accent` 18px/700, seta `→` à direita.
- Padding 16px × 32px (web) / 24px × 48px (slide). Sombra `shadow-cta`.
- Hover: fundo vai para `orange-deep`, seta desloca 4px para a direita.
- Microtexto opcional abaixo: 13px `ink-muted` ("Leva 1 minuto…").
- Exemplo: **Quero mais clientes na agenda →**

### 9.2 Botão secundário
- Pill, transparente, borda 1px `line`, texto `ink` 16px/700.

### 9.3 Eyebrow
- 12px (web) / 16–18px (slide), 700, caixa alta, +0,08em.
- Capítulo: `orange-soft` → "01 · O PROBLEMA". Categoria: `ink-muted`.

### 9.4 Título com destaque
- H1/H2 bold, `ink`, com `<span>` laranja nas palavras-chave.

### 9.5 Card padrão
- **Claro:** fundo branco, `radius-lg`, `border-card-light`, `shadow-card`, padding 24–32px.
- **Escuro:** fundo `surface-raised`, `radius-lg`, `border-card-dark`, padding 24–32px.
- Estrutura: caixa de ícone → H3 → texto `ink-muted`.

### 9.6 Card de destaque
- Fundo `brand-navy` (no claro) ou borda gradiente CTA (no escuro). Usado para "a opção certa" em comparativos e preço.

### 9.7 Card laranja translúcido (alerta/insight)
- Fundo `orange-tint`, borda 1px `orange` a 40%, `radius-lg`, eyebrow `orange-soft`, texto `peach`.
- Ex.: "O QUE VOCÊ NÃO ENXERGA".

### 9.8 Stat (número de destaque)
- Número 64–80px bold `orange` (ou `ink` no card escuro), unidade menor; legenda 14–16px `ink-muted`.
- Em grupo: 3–4 stats em linha, cada um em card ou separados por divisória `line`.

### 9.9 Card de case
- Foto do profissional (`radius-lg`, anel gradiente Instagram opcional).
- Nome bold `ink` + especialidade `ink-muted`.
- `@usuario` + selo `verified` + "+72 MIL SEGUIDORES" (eyebrow).
- Métricas: "+R$ X mi em vendas" e "ROI 14,2x", com o valor em `orange`.

### 9.10 Tag / chip
- Pill, 12–14px/700, padding 4×12px.
- Variantes: **sólida laranja** (ND, MAIS VANTAJOSO), **navy** (VOCÊ, Autoridade), **contorno** (SEU TIME, Alcance), **peach** (Conexão).

### 9.11 Lista com check
- Ícone `check` traço 3 em `orange-soft` + texto `ink` 16–18px; gap 12px.
- Lista negativa (problema): ícone `x` em `ink-muted`, texto a 60–70% de opacidade.

### 9.12 Stepper / processo
- Círculos numerados (40px, borda `orange` ou fundo `orange-tint`) ligados por linha `line`; título bold + descrição `ink-muted`.

### 9.13 Comparativo (antes × depois / vs)
- Dois cards lado a lado com pill "vs" no meio (fundo `surface`, borda `line`).
- Lado "antes": card neutro, ícones `x`, texto apagado. Lado "ND": card de destaque, checks laranja.

### 9.14 Card de preço
- Recomendado: fundo `navy-900`, borda gradiente CTA, badge pill laranja, preço 72px bold, economia em chip `orange-tint`, urgência com ícone `clock` em `orange-soft`.
- Alternativo: card branco simples, menor.

### 9.15 Mockup de celular / print
- `radius-lg`, borda 1px `line`, sombra suave; rotação ±3° em colagens; anel gradiente Instagram só quando é post/perfil.

### 9.16 Rodapé de slide
- Logo ND (branco no escuro, navy no claro) à esquerda; `@novadimensao.med` à direita; 16px `ink-muted`.

---

## 10. Layout e composição

- **Hero/capa:** texto à esquerda (7/12) com eyebrow → H1 → lead → CTA → prova social; à direita (5/12) a grade "agenda".
- **Seção de prova (claro):** H2 centralizado + grade de cards de case.
- **Seção de método (escuro):** fundo com constelação + palavra gigante ("Captar") + 1 linha de descrição.
- **Seção de problemas (claro):** H2 + cards grandes por dor, com H3 de 36px.
- Alinhamento à esquerda por padrão; centralizado só em slides de respiro, perguntas e CTA final.
- No máximo **um** elemento laranja dominante por tela.

---

## 11. Imagem e fotografia

- Fotos reais de profissionais e clientes, bem iluminadas e com fundo limpo.
- Prints reais (WhatsApp, Instagram, gerenciador) como prova, sempre em mockup ou card arredondado.
- Sem banco de imagem genérico, sem ilustração cartoon, sem 3D brilhante.
- Tratamento: leve escurecimento/vinheta navy quando a foto fica atrás de texto.

---

## 12. Movimento (web/motion)

- Entradas suaves: fade + translateY 8–16px, 300–500ms, `ease-out`.
- Seta do CTA desliza no hover. Células da agenda "preenchem" em sequência (stagger 60–80ms).
- Partículas com deriva lenta. Nada de bounce ou efeito chamativo.

---

## 13. Logo

- Arquivo oficial: `logo-nd-branco.svg` (versão branca, monograma "N·D" + "NOVA DIMENSÃO").
- Sobre navy: versão branca. Sobre claro: versão navy `#212D5B`.
- Área de proteção: altura do "N" em volta. Tamanho mínimo: 24px de altura (digital).
- Não recolorir de laranja, não distorcer, não aplicar sombra nem gradiente.

---

## 14. O que não fazer

- ❌ Segunda cor de destaque (verde, roxo, azul) além do laranja.
- ❌ Gradiente azul-roxo e gradiente Instagram fora de avatar ou perfil.
- ❌ Fonte serifada, script ou uma segunda família.
- ❌ Texto pequeno em `#FF4800` sobre navy.
- ❌ Esticar ou distorcer tipografia.
- ❌ Emoji como ícone, ícones preenchidos ou coloridos.
- ❌ Cards com borda lateral colorida grossa.
- ❌ Telas lotadas: um foco por bloco.

---

## 15. Tokens prontos (CSS)

```css
:root {
  /* tema escuro (padrão) */
  --surface: #0B1226;
  --surface-deep: #070C1C;
  --surface-raised: #141C38;
  --brand-navy: #212D5B;
  --ink: #F9FBFF;
  --ink-muted: #8F9CC4;
  --line: #2A3560;
  --slate-300: #B9C3DC;
  --orange: #FF4800;
  --orange-deep: #E8470C;
  --orange-soft: #FF8A57;
  --orange-start: #F68643;
  --peach: #FFD5C2;
  --orange-tint: rgba(255, 72, 0, .16);
  --on-orange: #F9FBFF;
  --verified: #3897F0;

  --grad-cta: linear-gradient(90deg, var(--orange-start), var(--orange));
  --grad-glow: radial-gradient(closest-side, rgba(33, 45, 91, .9), transparent);

  --font-sans: "helvetica-neue-world", "Helvetica Neue", Helvetica, system-ui, -apple-system, sans-serif;

  --space-1: 4px;  --space-2: 8px;  --space-3: 12px; --space-4: 16px;
  --space-6: 24px; --space-8: 32px; --space-12: 48px; --space-16: 64px;
  --space-24: 96px; --space-30: 120px;

  --radius-sm: 6px; --radius-md: 16px; --radius-lg: 20px; --radius-pill: 9999px;

  --shadow-cta: 0 8px 24px rgba(255, 72, 0, .5);
  --shadow-card: 0 1px 2px rgba(33, 45, 91, .05);
}

[data-theme="light"] {
  --surface: #F4F6FB;
  --surface-deep: #FFFFFF;
  --surface-raised: #FFFFFF;
  --ink: #212D5B;
  --ink-muted: #6F7CA5;
  --line: #C9D2E8;
  --orange-soft: #E8470C;
  --orange-tint: rgba(255, 72, 0, .10);
}

h1 { font: 700 64px/1.05 var(--font-sans); letter-spacing: -.035em; color: var(--ink); }
h2 { font: 700 48px/1.08 var(--font-sans); letter-spacing: -.03em; color: var(--ink); }
h3 { font: 700 36px/1.1 var(--font-sans); letter-spacing: -.02em; color: var(--ink); }
.lead { font: 400 18px/1.55 var(--font-sans); color: var(--ink-muted); }
.eyebrow { font: 700 12px/1.3 var(--font-sans); letter-spacing: .08em; text-transform: uppercase; color: var(--ink-muted); }
.hl { color: var(--orange); }

.btn-primary {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 16px 32px; border-radius: var(--radius-pill);
  background: var(--grad-cta); color: var(--on-orange);
  font: 700 18px/1.3 var(--font-sans); box-shadow: var(--shadow-cta);
}
.card { background: var(--surface-raised); border: 1px solid var(--line); border-radius: var(--radius-lg); padding: var(--space-6); }
.icon-box { width: 56px; height: 56px; display: grid; place-items: center; border-radius: var(--radius-md); background: var(--orange-tint); color: var(--orange); }
.cell { border-radius: var(--radius-sm); border: 1px dashed var(--line); }
.cell.filled { background: var(--orange-tint); border: 1px solid rgba(255, 72, 0, .4); color: var(--peach); }
```
