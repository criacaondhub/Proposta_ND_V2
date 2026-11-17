# ND Med Duo — Proposta Comercial (adaptação ao design do novadimensaohub.com.br)

> Documento-base para remontar a apresentação **ND-Med-Duo-Proposta** (25 slides, 16:9 / 1920×1080) dentro da linguagem visual do site **novadimensaohub.com.br**.
> Todo o texto abaixo é o conteúdo **original** da apresentação, só com a ortografia corrigida onde necessário (ver "Notas de revisão" no final).

---

## 0. Design system extraído do site

### 0.1 Tipografia
| Uso | Fonte | Tamanho (ref. web 1440px) | Peso | Tracking |
|---|---|---|---|---|
| Display / H1 | **Helvetica Neue World** (fallback: Helvetica Neue, system-ui, sans-serif) | 64px | 700 (Bold) | -0,035em (-2,24px) |
| H2 de seção | Helvetica Neue World | 48px | 700 | -0,03em (-1,44px) |
| H3 / títulos de card | Helvetica Neue World | 36px | 700 | -0,02em (-0,72px) |
| Corpo | Helvetica Neue World | 16–18px | 400 | normal |
| Eyebrow / labels (SEG, TER…) | Helvetica Neue World | 12px | 700 | +0,08em, **CAIXA ALTA** |
| Botão | Helvetica Neue World | 18px | 700 | normal |

- Família **única** no site inteiro (sem serifada). Hierarquia feita só por tamanho, peso e cor.
- Títulos com tracking negativo e entrelinha justa (~1,05–1,1).
- **Palavra-chave do título em laranja** (ex.: "Mais **clientes** na sua agenda.") — usar esse recurso em todos os títulos.
- Para slides 1920×1080: multiplicar referências por ~1,5 (H1 ≈ 96px, H2 ≈ 72px, H3 ≈ 48px, corpo ≈ 24–28px, eyebrow ≈ 16–18px).

### 0.2 Cores
| Token | Hex | Uso |
|---|---|---|
| `--navy-950` | `#070C1C` | Fundo mais profundo, rodapé |
| `--navy-900` | `#0B1226` | **Fundo das seções escuras** (padrão dos slides) |
| `--navy-700` (marca) | `#212D5B` | Cor da marca (theme-color), títulos em fundo claro, glow radial |
| `--slate-500` | `#6F7CA5` | Texto secundário em fundo claro |
| `--slate-400` | `#8F9CC4` | Labels/eyebrows em fundo escuro |
| `--slate-300` | `#B9C3DC` / `#C9D2E8` | Linhas, bordas, texto terciário |
| `--off-white` | `#F9FBFF` | Texto principal em fundo escuro |
| `--paper` | `#F4F6FB` | **Fundo das seções claras** |
| `--white` | `#FFFFFF` | Cards em fundo claro |
| `--orange-500` | `#FF4800` | **Cor de destaque/ação** (CTA, ícones, números) |
| `--orange-600` | `#E8470C` | Ícones de destaque / hover |
| `--orange-400` | `#FF8A57` | Checks, texto laranja em fundo escuro |
| `--orange-300` | `#FF7A3D` / `#F68643` | Início do gradiente |
| `--peach` | `#FFD5C2` | Texto sobre cards laranja translúcidos |
| `--blue-ig` | `#3897F0` | Selo de verificado (Instagram) |

**Gradientes**
- CTA / destaque: `linear-gradient(90deg, #F68643 0%, #FF4800 100%)`
- Glow de fundo (hero): `radial-gradient(closest-side, rgba(33,45,91,.9), transparent)` atrás do título, sobre `#0B1226`
- Card laranja translúcido (agenda do hero): fundo `rgba(255,72,0,.16)` + borda laranja fina + texto `#FFD5C2`
- Gradiente Instagram (anel dos avatares): `45deg, #FEDA75, #FA7E1E 30%, #D62976 55%, #962FBF 80%, #4F5BD5` — usar **só** em molduras de perfil/prints de Instagram.

**Ritmo de fundos:** o site alterna seção escura (`#0B1226`) ↔ seção clara (`#F4F6FB`). A apresentação deve seguir o mesmo ritmo (indicado em cada slide abaixo).

### 0.3 Formas, sombras e componentes
- **Raios:** 6px (chips, células, inputs) · 16px (cards pequenos) · 20px (cards grandes) · pill/999px (botões, tags, avatares).
- **Botão primário:** pill, gradiente laranja, texto `#F9FBFF` 700, seta `→` à direita, sombra `0 8px 24px rgba(255,72,0,.5)`.
- **Cards em fundo claro:** branco, borda 1px `rgba(33,45,91,.06)`, sombra suave `0 1px 2px rgba(33,45,91,.05)`.
- **Cards em fundo escuro:** `rgba(255,255,255,.03)` ou navy `#212D5B` a 40–60%, borda 1px `rgba(201,210,232,.12)`.
- **Prova social:** avatares redondos sobrepostos + texto "+350 negócios atendidos"; cards de case com foto, nome, cargo, @ com selo azul e "+XX MIL SEGUIDORES".
- **Texto com opacidade:** corpo em fundo claro usa navy a 80% / 70% / 60% (hierarquia por opacidade).
- **Efeito "partículas/constelação"** (seção Captar): pontos e linhas em `#8F9CC4`/branco sobre navy com vinheta — usar como textura de fundo em slides de abertura de capítulo.
- **Grade "agenda"** (hero): tabela SEG–SEX × horários, células com borda tracejada e cards laranja "✓ Cliente" — ótimo elemento gráfico para os slides 8, 16 e 25.

### 0.4 Ícones
- Estilo **linear (outline)**, traço **1,75–2px**, cantos arredondados, padrão **Lucide** (mesma família usada no site Tailwind/shadcn).
- Cor: `#FF4800` / `#E8470C` em destaque; `#8F9CC4` neutro em fundo escuro; navy em fundo claro.
- Checks: `check` com traço 3px em `#FF8A57`.
- Tamanho: 28–36px (web) → 40–56px nos slides. Sempre dentro de um quadrado 56–64px com raio 16px e fundo `rgba(255,72,0,.10)`.
- Sugestões Lucide por conteúdo: `trending-up`, `target`, `megaphone`, `message-circle`, `calendar-check`, `users`, `bar-chart-3`, `shield-check`, `brain`, `sparkles`, `clapperboard`, `image`, `file-text`, `clock`, `eye`, `repeat`, `wallet`, `calculator`, `rocket`, `arrow-right`, `check`.

### 0.5 Grid do slide (1920×1080)
- Margens laterais 120px, topo 96px, base 80px. Grid de 12 colunas, gutter 32px.
- **Eyebrow** (capítulo/categoria) sempre acima do título: 16–18px, 700, caixa alta, tracking +0,08em, `#FF8A57` (escuro) ou `#FF4800` (claro).
- **Rodapé fixo** em todos os slides (exceto capa): logo ND pequeno à esquerda, `@novadimensao.med` à direita, `#8F9CC4`, 16px.
- Paginação opcional "07 / 25" no rodapé.
- Os ornamentos antigos do PPT (linha com bolinhas nas pontas sob o título) **saem**; entram eyebrows em caixa alta.

---

## 1. Slides

### Slide 01 — Capa
**Fundo:** escuro `#0B1226` + glow radial navy atrás do título + textura de partículas sutil à direita.

**Conteúdo**
- Logo ND (horizontal, branco)
- Eyebrow: `MARKETING · VENDAS · TECNOLOGIA`
- Título: **O programa que acelera o faturamento de diversas clínicas por todo o Brasil.** → destaque laranja em "acelera o faturamento"
- Subtítulo (pill/selo): Acelerando o Marketing e as Vendas dos nossos clientes há 8 anos.

**Layout:** coluna esquerda (7/12) com logo, eyebrow, título em 2–3 linhas (H1 ~96px) e o subtítulo dentro de uma pill com borda laranja fina. Coluna direita (5/12): recorte da grade "agenda" do site com células laranja "✓ Cliente", em perspectiva leve e com fade para o fundo. Abaixo do subtítulo: avatares sobrepostos + "+350 negócios atendidos".

---

### Slide 02 — Quem somos
**Fundo:** claro `#F4F6FB`.

**Conteúdo**
- Eyebrow: `QUEM SOMOS`
- Título: **8 anos de mercado. Um foco definido: saúde.** (destaque em "saúde")
- Texto: A Nova Dimensão nasceu como um Hub de Marketing, Vendas e Tecnologia focado em ajudar desde pequenas empresas até multinacionais a aumentarem o seu resultado. Hoje, conta com uma operação dedicada ao nicho da saúde: médicos, clínicas e hospitais particulares.
- Números (4 cards):
  - **8** — anos de mercado
  - **+350** — empresas atendidas
  - **+R$ 50 milhões** — gerados p/ clientes
  - **+28** — colaboradores
- Frase de fechamento: Não somos generalistas tentando atender a área da saúde. Somos dedicados ao seu nicho, com a solidez de quem já gerou resultado para muitas outras áreas antes.

**Layout:** título + parágrafo no topo (largura máx. 8 col). Faixa de 4 cards brancos iguais (raio 20px), número em 72px laranja `#FF4800` bold + legenda navy 70%. Frase final em destaque: bloco com borda esquerda laranja 4px, texto navy 24px.

---

### Slide 03 — Clientes
**Fundo:** claro `#F4F6FB`.

**Conteúdo**
- Eyebrow: `CLIENTES`
- Título: **Quem confia e conta com o nosso trabalho**
- (Grade de logos/fotos de clientes — imagens do PPT original)

**Layout:** título centralizado. Grade 4–5 colunas de cards brancos (raio 16px) com logos em navy monocromático ou fotos com o card de perfil no estilo do site: foto, nome, especialidade, @ com selo azul `#3897F0`, "+XX MIL SEGUIDORES".

---

### Slide 04 — Resultados reais
**Fundo:** escuro `#0B1226`.

**Conteúdo**
- Eyebrow: `RESULTADOS`
- Título: **Resultados reais no nicho da saúde**
- Subtítulo: Não é teoria. É o que já entregamos, todo mês:
- **Card 1 — DR. RAFAEL ULTRAMAR** · Transplante capilar · média mensal
  - Destaque: **R$ 788.000/mês** — faturamento via marketing
  - Mídia por mês: R$ 4,5 mil · ROAS: 86x · Ticket médio: R$ 55 mil
- **Card 2 — DRA. CLÁUDIA MOCELIN** · Consultas · média mensal
  - Destaque: **20 consultas/mês** — com menos de R$ 2 mil de investimento em ads
  - Mídia por mês: R$ 1.250 · ROAS: 12x · CAC p/ consulta: R$ 60
- **Card 3 — INSTITUTO LONG LIFE** · Recuperação · primeira semana
  - Destaque: **7 dias** — para o primeiro resultado
  - Faturamento 1º mês: R$ 66 mil · ROAS: 14,7x · Investido: R$ 4,5 mil
- Nota: Médias mensais calculadas sobre o período de 18 meses de cada case.

**Layout:** 3 cards verticais lado a lado (raio 20px, navy translúcido, borda fina). Em cada card: eyebrow com o nome (laranja `#FF8A57`), linha de categoria em `#8F9CC4`, número principal gigante (64–80px, branco, unidade menor), legenda; divisória; 3 métricas em linhas (rótulo à esquerda em slate, valor à direita em branco bold). Ícone Lucide `trending-up` no topo de cada card. Nota em 14–16px no rodapé.

---

### Slide 05 — Bastidores dos resultados
**Fundo:** claro `#F4F6FB`.

**Conteúdo**
- Eyebrow: `BASTIDORES`
- Título: **Resultado de verdade das nossas campanhas chega assim:**
- Legenda: Prints reais dos grupos com os nossos clientes: agendamentos, consultas realizadas e contratos fechados, mês a mês.

**Layout:** título à esquerda (4 col) + legenda abaixo. À direita (8 col): mosaico/colagem de prints de WhatsApp em "mockups" de celular ou cards com raio 16px e sombra suave, levemente rotacionados (±3°), sobrepostos. Usar os prints do PPT original.

---

### Slide 06 — Audiência e autoridade
**Fundo:** escuro `#0B1226`.

**Conteúdo**
- Título: **E não é só faturamento, é crescimento de audiência, autoridade e leads qualificados.** (destaque em "audiência, autoridade")
- Bloco 1: Dr. Eduardo Schor · Endometriose — **231 mil** de views neste carrossel orgânico
- Bloco 2: Dr. Rafael Ultramar · Transplante capilar — **10 mil** de views neste vídeo orgânico focado em gerar autoridade
- Bloco 3: Instituto LongLife · Clínica Multiespecialidades — **Depoimento:** Paloma, gerente comercial de clínica parceira da ND
- Nota: Conteúdos orgânicos gravados, editados e publicados pelos próprios profissionais.

**Layout:** 3 colunas, cada uma com mockup vertical (9:16, raio 20px, anel em gradiente Instagram) contendo o print/thumb do post/vídeo; abaixo, nome · especialidade em `#8F9CC4` e o número em laranja 48px + legenda. Ícones Lucide `eye` / `play` / `quote` sobre os mockups.

---

### Slide 07 — 01 · O problema
**Fundo:** escuro `#0B1226` com textura de partículas (abertura de capítulo).

**Conteúdo**
- Eyebrow: `01 · O PROBLEMA`
- Título: **Por que profissionais excelentes continuam invisíveis?** (destaque em "invisíveis")
- Intro: Você provavelmente já disse (ou pensou) em alguma dessas frases:
- 5 frases:
  1. **"Eu sei que preciso postar."** Mas entre uma consulta e outra, o Instagram fica pra depois.
  2. **"Quando posto, não acontece nada."** Conteúdo técnico, sem gancho. Só colega de profissão curte.
  3. **"Já paguei agência."** Post bonito e relatório de curtida. A agenda continuou igual.
  4. **"Já rodo anúncio."** A verba sai todo mês, mas quem chega não agenda.
  5. **"Vivo de indicação."** Tem mês bom e mês com buraco na agenda.
- Box: **O QUE VOCÊ NÃO ENXERGA** — O paciente escolhe você antes da consulta. Cada semana sem conteúdo é uma semana em que ele está conhecendo outro profissional…

**Layout:** título no topo à esquerda. Grid de 5 cards (3 + 2 ou lista vertical em 2 colunas): frase entre aspas em branco bold 26px + explicação em `#8F9CC4`. Ícone Lucide `message-circle` (aspas) em laranja. À direita/abaixo, card de destaque com fundo laranja translúcido `rgba(255,72,0,.16)`, borda laranja, eyebrow "O QUE VOCÊ NÃO ENXERGA" em `#FF8A57` e texto `#FFD5C2` + ícone `eye-off`.

---

### Slide 08 — A virada
**Fundo:** claro `#F4F6FB`.

**Conteúdo**
- Título: **Agora imagina o seu consultório assim:**
- 4 momentos:
  1. **Segunda, 8h.** Você já sabe exatamente o que gravar na semana. Sem travar, sem "o que eu posto hoje?".
  2. **Seu Instagram vira vitrine.** O paciente chega dizendo: "Dra., eu te acompanho faz tempo".
  3. **O WhatsApp toca.** Paciente vindo do anúncio, todo dia, direto na sua conversa.
  4. **Seu lead agora converte.** Você tem um comercial que responde rápido, faz follow-up e transforma conversa em consulta.
- Fechamento: **Você grava e atende. A pauta e o tráfego têm método.**

**Layout:** timeline horizontal com 4 cards brancos ligados por linha fina; ícones Lucide `calendar`, `instagram`/`store`, `message-circle`, `calendar-check` em quadrado laranja 10%. Fechamento em faixa navy `#212D5B` com texto branco e "método" em laranja. Elemento opcional: mini grade de agenda com cards "✓ Cliente" preenchendo.

---

### Slide 09 — "Mas o ChatGPT não faz isso?"
**Fundo:** escuro `#0B1226`.

**Conteúdo**
- Título: **"Mas o ChatGPT não faz isso?"**
- Subtítulo: Uma IA nunca irá substituir um time de especialistas com:
- 5 diferenciais:
  - **Repertório** — Anos testando o que viraliza (e o que morre) no nicho da saúde. A IA não sabe o que funcionou no consultório ao lado.
  - **Estratégia** — Cada roteiro tem um papel no funil: atrair, gerar autoridade ou converter. Não é post solto.
  - **Domina posicionamento** — Sua voz, sua especialidade, seu paciente ideal. Não texto genérico que serve pra qualquer médico.
  - **Entende de compliance** — Conteúdo e anúncios dentro da Resolução CFM nº 2.336/2023 de publicidade médica.
  - **Sabe ler números e tomar decisões** — Gente olhando o seu resultado todo mês e corrigindo a rota. Prompt não te avisa quando algo está errado.
- Prova: Grupo do Dr. Alexandre Kauê com o nosso time: "Foi o melhor script que vocês escreveram até hoje."

**Layout:** coluna esquerda (7 col): título + subtítulo + lista de 5 itens com ícone (`library`, `target`, `fingerprint`, `shield-check`, `bar-chart-3`) em quadrado laranja 10%, título branco bold + texto slate. Coluna direita (5 col): mockup de celular com print do grupo do Dr. Alexandre Kauê e a citação em card abaixo.

---

### Slide 10 — 02 · O método ESCALA
**Fundo:** escuro `#0B1226` com partículas (abertura de capítulo).

**Conteúdo**
- Eyebrow: `02 · O MÉTODO`
- Título: **Depois de 8 anos, uma metodologia própria: ESCALA** ("ESCALA" em laranja)
- Subtítulo: Seis etapas que todo consultório percorre para crescer com previsibilidade. Na ordem certa.
- Etapas:
  - **E — Entender:** Quem é você, o que vende, pra quem e como se comunica hoje.
  - **S — Sistematizar:** Organizar a casa para receber os leads: processos, CRM, automações.
  - **C — Captar:** Gerar demanda qualificada: tráfego pago e conteúdo orgânico.
  - **A — Ativar:** Converter leads em pacientes: resposta, follow-up, fechamento.
  - **L — Lucrar:** Otimizar margem: reduzir custo por paciente, aumentar recorrência.
  - **A — Acelerar:** Escalar o que já funciona: mais verba, novos canais.
- Alerta: **Não pule etapas.** Sem ter feito o E, você gera o lead errado. Fazer o C sem olhar para o A, a conversa nunca vira consulta.

**Layout:** 6 colunas iguais em sequência (como degraus subindo levemente da esquerda para a direita). Letra gigante (120px, gradiente laranja) no topo de cada coluna, nome da etapa em branco bold, descrição em slate. Seta `→` fina entre colunas. Alerta em card laranja translúcido no rodapé com ícone `alert-triangle`.

---

### Slide 11 — Os dois motores
**Fundo:** claro `#F4F6FB`.

**Conteúdo**
- Título: **Todo consultório cheio roda com dois motores.**
- Motor 1 — `AUDIÊNCIA · CONTEÚDO` — **Ser visto e conhecido.** Ideias e roteiros de conteúdo orgânico com curadoria do que funciona no seu nicho. O paciente te conhece antes de precisar.
  - Fluxo: Curadoria de temas (**ND**) → Roteiro de vídeo e post (**ND**) → Você grava, edita e posta (**VOCÊ**)
- **+**
- Motor 2 — `AQUISIÇÃO · ANÚNCIO` — **Ser lembrado e escolhido.** Anúncio no Meta que coloca você na frente de quem já busca o que você faz, na sua região.
  - Fluxo: Criativos de anúncio (**ND**) → Campanha no Meta (**ND**) → Conversa no WhatsApp (**SEU TIME**)
- Fechamento: Um alimenta o outro: o conteúdo gera autoridade, o anúncio leva quem já confia até o seu WhatsApp.

**Layout:** 2 cards grandes brancos lado a lado, com um "+" laranja em círculo entre eles. Em cada card: eyebrow, título H3, texto e um fluxo de 3 chips em linha com setas; tags de responsável em pill — **ND** (laranja sólido), **VOCÊ** (navy), **SEU TIME** (contorno navy). Ícones `users` (motor 1) e `megaphone` (motor 2). Fechamento centralizado abaixo com ícone `repeat`.

---

### Slide 12 — Curadoria de conteúdo ND
**Fundo:** escuro `#0B1226`.

**Conteúdo**
- Eyebrow: `CURADORIA DE CONTEÚDO ND`
- Citação-título: **"O que trava você na hora de produzir é a ideia e o roteiro. Isso a gente entrega."**
- Texto: A gente pesquisa o mercado, entende o que está engajando e adapta para o seu nicho. Você não começa do zero.
- Processo (6 passos):
  1. **Onboarding** — seu posicionamento e sua voz · tag `UMA VEZ`
  2. **Pesquisa** — o que está engajando no seu nicho e fora · tag `TODO MÊS` (vale para os passos 2–6)
  3. **Análise** — formatos, ganchos e temas que performam
  4. **Adaptação** — para a sua especialidade e o seu paciente
  5. **Roteiro** — para vídeos e posts estáticos · selo `CFM`
  6. **Entrega** — 7 ideias com roteiro por semana
- **O QUE A ND ENTREGA**
  - ✓ Curadoria de temas do seu nicho, toda semana;
  - ✓ 7 ideias com roteiro por semana, para vídeo e estático ou carrossel;
  - ✓ Ganchos e formatos que estão performando agora;
  - ✓ Tudo adaptado ao seu posicionamento e à Resolução CFM nº 2.336/2023.
- **O QUE FICA COM VOCÊ** — Gravar, editar e postar. Você decide o ritmo. A pauta pronta tira o maior obstáculo do caminho.

**Layout:** topo: citação em H2 com aspas laranja grandes. Meio: stepper horizontal de 6 passos (círculos numerados ligados por linha), com o passo 1 separado por um tracejado e tag "UMA VEZ"; chave/colchete sobre 2–6 com tag "TODO MÊS"; selo `CFM` (ícone `shield-check`) no passo 5. Base: 2 cards — esquerdo (8 col) "O que a ND entrega" com checks `#FF8A57`; direito (4 col) "O que fica com você" em card contorno.

---

### Slide 13 — 03 · A solução
**Fundo:** escuro `#0B1226` com partículas (abertura de capítulo).

**Conteúdo**
- Eyebrow: `03 · A SOLUÇÃO`
- Título: **Qual solução da ND MED você está contratando?**
- Subtítulo: Os 3 pilares que você precisa, em um único lugar. Um time conectado e com experiência para entregar os resultados que você quer.
- 4 cards:
  - **Performance** — Um gestor de tráfego SR alocado para cuidar das suas campanhas. (`trending-up`)
  - **Anúncios assertivos** — 12 criativos por mês, separados em 6 por quinzena. (`image`)
  - **Social Media** — 7 ideias por semana, toda segunda-feira no seu WhatsApp. (`sparkles`)
  - **Comercial afiado** — 2 reuniões estratégicas por mês. Uma para análise dos números, outra para treinamento de secretária. (`users`)

**Layout:** título + subtítulo à esquerda no topo; 4 cards em linha (raio 20px, navy translúcido), ícone grande laranja no topo, título H3 branco, texto slate. Hover visual: o primeiro card com borda gradiente laranja para dar ritmo. (Obs.: o subtítulo fala em 3 pilares e há 4 cards — ver notas.)

---

### Slide 14 — Entregável 1 · Tráfego no Meta
**Fundo:** claro `#F4F6FB`.

**Conteúdo**
- Eyebrow: `ENTREGÁVEL 1 · TRÁFEGO NO META`
- Título: **Não é só subir campanha no gerenciador. É paciente chegando no seu WhatsApp.**
- Coluna "O que trava o seu anúncio hoje":
  - Campanha montada uma vez e esquecida;
  - Um ou dois criativos rodando até saturar;
  - Público e objetivo errados: clique, não conversa;
  - Ninguém lê o custo por conversa e corrige;
  - Resultado: verba gasta, agenda igual.
- Coluna "→ A gestão ND Med":
  - Campanhas de mensagem direto pro WhatsApp e Direct;
  - Segmentação por região, perfil e intenção do paciente;
  - Estrutura por objetivo: alcance, mensagem e remarketing;
  - Teste de criativos a cada quinzena: o melhor recebe mais verba;
  - Otimização contínua de orçamento e público;
  - Leitura diária de custo por conversa.
- Nota: Verba de mídia recomendada: a partir de R$ 2.000/mês, paga direto ao Meta. 0% fica com a ND.

**Layout:** comparativo antes × depois em 2 cards. Esquerdo branco com ícones `x` em slate/vermelho apagado e texto navy 60%. Direito em navy `#212D5B` com ícones `check` laranja e texto branco (card "vencedor", levemente maior/elevado). Nota em pill clara com ícone `wallet` abaixo.

---

### Slide 15 — Entregável 2 · Criativos de anúncio
**Fundo:** escuro `#0B1226`.

**Conteúdo**
- Eyebrow: `ENTREGÁVEL 2 · CRIATIVOS DE ANÚNCIO`
- Título: **12 criativos por mês. Pensados pra gerar agendamento, não curtida.**
- Card A: **8 vídeos/mês** · 4 roteiros por quinzena — A ND escreve, você só grava. Gancho, argumento e chamada para o WhatsApp. (`clapperboard`)
- Card B: **4 estáticos/mês** · 2 por quinzena — Copy + layout: a ND entrega pronto pra rodar. Você não precisa fazer nada. (`image`)
- Nota: Todo criativo testado e medido. O que performa ganha verba; o que não performa sai.
- Galeria: **Anúncios reais que produzimos para médicos:** (imagens do PPT)

**Layout:** metade esquerda: título + 2 cards com número grande laranja (96px) + texto. Metade direita: carrossel/galeria de 3–4 anúncios reais em mockups 4:5 e 9:16 sobrepostos, com o label "Anúncios reais que produzimos para médicos" acima. Nota no rodapé com ícone `flask-conical`/`activity`.

---

### Slide 16 — Entregável 3 · Biblioteca semanal de conteúdo
**Fundo:** claro `#F4F6FB`.

**Conteúdo**
- Eyebrow: `ENTREGÁVEL 3 · BIBLIOTECA SEMANAL DE CONTEÚDO`
- Título: **Toda semana, 7 ideias com roteiro.** Para vídeos e posts estáticos, com curadoria do seu nicho.
- Selo: **28/mês** ideias com roteiro
- Semana exemplo:
  - SEG — Mito ou verdade · `Autoridade`
  - TER — Dúvida que todo paciente faz · `Autoridade`
  - QUA — Bastidor do consultório · `Conexão`
  - QUI — Tendência adaptada ao seu nicho · `Alcance`
  - SEX — Sua história / por que escolheu a área · `Conexão`
  - SÁB — Opinião firme sobre um tema do nicho · `Alcance`
  - DOM — Chamada: como agendar com você · `Conversão`
- Nota: Exemplo ilustrativo de uma semana. As pautas mudam toda semana conforme o que está funcionando no seu nicho.
- Diferencial: **Por que isso te diferencia:** o que trava o médico na hora de produzir é a ideia e o roteiro. Isso chega pronto toda semana, alinhado ao seu posicionamento. A ND entrega ideias e roteiros. Gravar, editar e postar é com você.
- Espaço reservado: **[INSERIR print da biblioteca de ideias e roteiros]**

**Layout:** reaproveitar a **grade "agenda" do hero do site**: 7 colunas SEG→DOM (eyebrow 16px caixa alta `#8F9CC4`), cada coluna com um card contendo o tema e uma tag colorida por objetivo — Autoridade (navy), Conexão (laranja claro `#FFD5C2`), Alcance (contorno laranja), Conversão (laranja sólido). Selo "28/mês" em círculo laranja no canto superior direito. Abaixo: à esquerda o texto "Por que isso te diferencia"; à direita o placeholder do print (card tracejado, raio 20px).

---

### Slide 17 — Entregável 4 · Relatório diário de tráfego
**Fundo:** escuro `#0B1226`.

**Conteúdo**
- Eyebrow: `ENTREGÁVEL 4 · RELATÓRIO DIÁRIO DE TRÁFEGO`
- Título: **Seus números de tráfego, todo dia.**
- 1 — **Todo dia, não no fim do mês.** Se algo sai do trilho, você e a gente sabemos no mesmo dia. (`clock`)
- 2 — **O que importa, sem enrolação.** Investimento, conversas geradas e custo por conversa. (`bar-chart-3`)
- 3 — **Transparência total.** Você sabe exatamente pra onde vai cada real da sua verba. (`eye`)

**Layout:** esquerda (5 col): título + 3 itens numerados (número em círculo laranja, título branco, texto slate). Direita (7 col): mock de relatório/mensagem de WhatsApp diária estilizada — card com 3 KPIs (Investimento · Conversas · Custo por conversa) e minigráfico de linha laranja.

---

### Slide 18 — Entregável 5 · Reunião mensal de resultado
**Fundo:** claro `#F4F6FB`.

**Conteúdo**
- Eyebrow: `ENTREGÁVEL 5 · REUNIÃO MENSAL DE RESULTADO`
- Título: **1x por mês, a gente olha o que acontece depois que o lead chega.**
- Citação: **"Agência entrega o lead e some. A ND treina quem atende."**
- Ciclo (5 etapas): Números do mês (tráfego + conversas) → Diagnóstico (onde o lead se perde) → Treino do time (o que fazer e como) → Correção aplicada (na rotina da recepção) → Mês seguinte (mais consulta com a mesma verba) — *e o ciclo recomeça todo mês*
- 3 gargalos:
  - `GARGALO` **Tempo de resposta (lead response time)** — A secretária demora pra responder e o lead esfria. → Treinamos a importância da velocidade e como responder rápido. (`timer`)
  - `GARGALO` **Qualificação** — Resposta em textão, sem condução. → Ensinamos a conduzir a conversa até a consulta marcada. (`filter`)
  - `GARGALO` **Follow-up** — O lead para de responder e ninguém chama de novo, nunca mais. → Mostramos como fazer follow-up que traz o paciente de volta. (`repeat`)

**Layout:** topo: título + citação em destaque laranja. Meio: ciclo horizontal de 5 chips com setas e uma seta de retorno curva (`repeat`) com o texto "e o ciclo recomeça todo mês". Base: 3 cards brancos com tag pill "GARGALO" laranja, título H3, problema em navy 70% e solução em linha com `→` laranja.

---

### Slide 19 — Pausa / Pergunta
**Fundo:** escuro `#0B1226` com glow radial central.

**Conteúdo**
- Eyebrow: `ANTES DE SEGUIRMOS`
- Pergunta: **De tudo que você viu até aqui, o que mais fez sentido pra sua realidade?**

**Layout:** slide de respiro — pergunta centralizada em H1 (~88px), destaque laranja em "sua realidade". Ícone `message-circle-question` grande e sutil acima. Nada mais na tela.

---

### Slide 20 — Antes do preço, uma conta
**Fundo:** claro `#F4F6FB`.

**Conteúdo**
- Eyebrow: `ANTES DO PREÇO, UMA CONTA`
- Título: **Quanto custaria montar isso sozinho?**
- Time interno:
  - Gestor de tráfego — R$ 2.500
  - Copywriter / roteirista — R$ 3.000
  - Designer — R$ 2.000
  - Estrategista de conteúdo — R$ 2.500
  - Consultoria comercial — R$ 2.000
  - **Time interno — R$ 12 mil/mês**
  - Em 6 meses: R$ 72.000 + recrutar, treinar e gerenciar 5 pessoas.
- **vs**
- **COM A ND MED** — Um time inteiro, especialista em saúde, atuando em prol dos resultados do seu consultório. Estratégia, funis, criativos, tráfego, ideias, análises de mercado, roteiros, treinamento comercial. Sem contratar, sem treinar, sem depender de uma agência genérica que não entende do seu mercado.

**Layout:** dois cards lado a lado com pill "vs" no meio. Esquerdo branco: lista tipo "recibo" (rótulo à esquerda, valor à direita, linhas tracejadas), total em navy bold e a linha "Em 6 meses…" com R$ 72.000 riscado/em vermelho apagado. Direito em navy `#212D5B`: logo ND Med, título em branco, texto slate claro, e lista de chips com as entregas (estratégia, funis, criativos…). Ícone `calculator` no card esquerdo.

---

### Slide 21 — Máquina ND Med (upsell)
**Fundo:** escuro `#0B1226`.

**Conteúdo**
- Eyebrow: `PARA CLÍNICAS PRONTAS PARA ESCALAR`
- Título: **Conheça também a Máquina ND Med: uma máquina, três engrenagens.**
- 01 · **DOXA · Orgânica** — `ATRAIR` — 60 vídeos em 90 dias, sem você gravar. Constrói autoridade e atrai: o paciente te conhece antes de precisar. Garantia de 1 milhão de views.
- 02 · **Performance Paga** — `CAPTAR` — Google Ads + Meta Ads, funis, landing page e criativos. Traz quem está pronto pra agendar, direto pro CRM.
- 03 · **iSale · Vendas** — `CONVERTER` — SDR com IA que responde em minutos, qualifica, faz follow-up infinito e entrega a consulta agendada, 24h por dia, com lembrete anti-no-show.
- Investimento: **R$ 9.000/mês**
- Ideal para:
  - Clínicas com recepção ou time comercial;
  - Ticket alto e verba de mídia para Google + Meta;
  - Quem quer a operação inteira rodando, sem precisar gravar.
- Comparação: **Duo:** a ND entrega ideias, roteiros e tráfego; você grava. **Máquina:** a ND grava, capta e converte por você.

**Layout:** 3 cards em linha (engrenagens) com número "01/02/03" grande em contorno laranja, tag pill do verbo (ATRAIR/CAPTAR/CONVERTER) e ícone `settings`/`cog`. À direita ou abaixo: card de investimento com borda gradiente laranja, valor 64px e lista "Ideal para" com checks. Rodapé: faixa comparativa Duo × Máquina em 2 colunas.

---

### Slide 22 — Perguntas de compromisso (0 a 10)
**Fundo:** escuro `#0B1226`.

**Conteúdo**
- Eyebrow: `ANTES DE FALARMOS DE PREÇO…`
- 3 perguntas:
  1. De 0 a 10, você acredita que está no momento de avançar com a gente para faturar mais e crescer seus resultados?
  2. De 0 a 10, você acredita que toda essa entrega vai realmente facilitar sua vida e sua jornada?
  3. De 0 a 10, você acredita que nossos cases de sucesso e tudo que mostrei trazem a segurança necessária para você se tornar nosso cliente?

**Layout:** 3 linhas empilhadas, cada uma com número da pergunta em laranja, pergunta em branco 32px e, abaixo, uma régua 0–10 de 11 pills (contorno slate, a pill "10" em laranja sólido). Bastante respiro.

---

### Slide 23 — Investimento
**Fundo:** claro `#F4F6FB`.

**Conteúdo**
- Eyebrow: `INVESTIMENTO`
- Card "Resumo completo do contrato" — **ND Med Duo · 6 meses de trabalho**
  - ✓ Gestão de Tráfego Pago — 6 meses
  - ✓ 72 criativos de anúncio — 12 por mês
  - ✓ 168 ideias de conteúdos orgânicos — 7 por semana
  - ✓ Relatório em tempo real de tráfego — todo dia
  - ✓ 6 reuniões de resultado + treinamentos comerciais — 1 por mês
  - ✓ Onboarding e análise de posicionamento — no início
  - Nota: Verba de mídia sugerida: mínimo de R$ 2.000/mês, paga direto ao Meta. Nenhuma % fica com a ND.
- **Escolha como pagar**
  - Opção 1 (badge `MAIS VANTAJOSO`): **Integral no cartão de crédito, parcelado** — **6x R$ 3.333** · Cobrança total realizada: R$ 20.000 · Você economiza R$ 5.200,00 no total · R$ 867 a menos por mês · *Condição válida só nesta reunião*
  - Opção 2: **Boleto mensal** — R$ 4.200 p/ mês durante 6 meses · Total R$ 25.200
- Rodapé: Mesmo plano, mesmas entregas. Só muda quanto e como você paga.

**Layout:** esquerda (5 col): card branco "Resumo do contrato" com checks laranja, item à esquerda e frequência à direita em slate. Direita (7 col): 2 cards de preço lado a lado (estilo pricing). O cartão é o destaque: fundo navy `#0B1226`, borda gradiente laranja, badge pill laranja "MAIS VANTAJOSO", preço "6x R$ 3.333" em 72px, economia em pill laranja translúcida, ícone `clock` + "Condição válida só nesta reunião" em `#FF8A57`. Boleto em card branco simples, menor. Frase de rodapé centralizada.

---

### Slide 24 — ROI
**Fundo:** escuro `#0B1226`.

**Conteúdo**
- Eyebrow: `A MATEMÁTICA É SIMPLES…`
- Título: **NÃO TEM COMO NÃO DAR ROI**
- Funil (5 etapas):
  1. **Verba no Meta** — Com R$ 2.000 de mídia no mês…
  2. **Conversas** — a R$ 20 por conversa (conservador), são 100 conversas no WhatsApp e Direct.
  3. **Agendamento** — Se 20% agendarem: 20 consultas marcadas.
  4. **Comparecimento** — Se 60% comparecerem: 12 pacientes na sua cadeira.
  5. **Faturamento** — Com ticket de R$ 600: R$ 7.200 no mês.
- Box **PONTO DE EQUILÍBRIO** — Seu investimento no mês: R$ 3.333 + R$ 2.000 = **R$ 5.333**. Com ticket de R$ 600, 9 pacientes pagam o mês inteiro. A partir do 10º, é lucro. Sem contar retorno, procedimento e indicação.
- Nota: Referência real: a Dra. Cláudia Mocelin teve R$ 62 de mídia por consulta. Aqui usamos R$ 167, quase 3x pior, e a conta ainda fecha. Premissas ilustrativas, não são promessa de resultado: dependem de oferta, atendimento comercial e outros fatores.

**Layout:** esquerda (7 col): funil horizontal ou escada descendente de 5 barras que vão estreitando (navy → laranja), cada uma com ícone (`wallet`, `message-circle`, `calendar-check`, `user-check`, `trending-up`) e o número-chave em destaque. Direita (5 col): card de ponto de equilíbrio com borda laranja, conta montada como equação e "R$ 5.333" grande; "9 pacientes" em destaque laranja. Nota em 14–16px no rodapé.

---

### Slide 25 — Encerramento / CTA
**Fundo:** escuro `#0B1226` + glow radial + grade "agenda" cheia de cards "✓ Cliente" ao fundo (eco da capa e do site).

**Conteúdo**
- Título: **Daqui a seis meses… sua agenda vai estar cheia ou igual hoje?** ("cheia" em laranja)
- Texto: Chega de postar sem estratégia e de anunciar no escuro. Você precisa de método pra ser lembrado e ser procurado.
- CTA (botão): **Vamos começar? →**

**Layout:** título centralizado em H1, texto abaixo em `#C9D2E8`, botão pill gradiente laranja com sombra, idêntico ao "Quero mais clientes na agenda" do site. Logo ND + @novadimensao.med no rodapé.

---

## 2. Notas de revisão (aplicadas no texto acima)
- **Anos de mercado:** o PPT diz "7 anos" (slides 2 e 10) e "8 anos" (slides 1 e 2). Padronizei para **8 anos** — confirmar.
- **"Dra. Cláudia Moncelin"** → **Mocelin** (slides 4 e 24).
- "emalguma" → "em alguma" (slide 7); "desde de" → "desde" (slide 2); "chegam assim" → "chega assim" (slide 5).
- "Clinica Multi Especialidades" → "Clínica Multiespecialidades"; "analises/Analise" → "análises/análise"; "tua jornada" → "sua jornada"; "momento avançar" → "momento de avançar" (slide 22).
- "Lead time response" → "Tempo de resposta (lead response time)" (slide 18).
- Slide 13: o texto fala em **3 pilares**, mas há **4 cards** — decidir se vira "4 pilares" ou se Anúncios entra junto de Performance.
- Slide 24: R$ 2.000 ÷ 12 pacientes ≈ **R$ 167** de mídia por consulta (bate com a nota). R$ 5.333 ÷ R$ 600 = 8,9 → 9 pacientes (ok).
- Slide 23: 6 × R$ 3.333 = R$ 19.998 (apresentado como R$ 20.000); economia R$ 25.200 − R$ 20.000 = R$ 5.200 ✓; R$ 4.200 − R$ 3.333 = R$ 867 ✓.
