import {
  Calendar,
  CalendarCheck,
  ChartColumn,
  Clock,
  Eye,
  Fingerprint,
  Funnel,
  Image,
  Images,
  Library,
  Megaphone,
  MessageCircle,
  Play,
  Quote,
  Repeat,
  ShieldCheck,
  Sparkles,
  Store,
  Target,
  Timer,
  TrendingUp,
  UserCheck,
  Users,
  Video,
  Wallet,
  type LucideIcon,
} from 'lucide-react'

export const CONFIG = {
  // ⚠️ PENDENTE — destino do botão "Vamos começar?" (ex.: link do WhatsApp do comercial ou do contrato)
  CTA_URL: '⚠️ PENDENTE',
  INSTAGRAM: '@novadimensao.med',
} as const

export const isPending = (value: string) => value.startsWith('⚠️')

/*
 * Marcação dos textos:
 *   **trecho**  → destaque. Em títulos vira laranja (palavra-chave); no corpo, negrito.
 *   \n          → quebra de linha.
 *
 * Imagens: coloque o arquivo em public/assets/ com o nome indicado em `src`.
 * Enquanto o arquivo não existir, o slide mostra um espaço reservado com o nome esperado.
 */

export interface Photo {
  src: string
  alt: string
  /** texto do espaço reservado enquanto o arquivo não existe */
  label?: string
}

export interface IconItem {
  icon: LucideIcon
  title: string
  text: string
}

export const SITE = {
  brand: 'Nova Dimensão',
  deckLabel: 'Proposta comercial ND Med Duo',
  slideOf: 'de',
  progressLabel: 'Progresso da apresentação',
  prevLabel: 'Slide anterior',
  nextLabel: 'Próximo slide',
  mediaPending: 'Inserir imagem',
  verified: 'verificado',
  followers: 'seguidores',
}

/* Grade "agenda" do hero do site (SEG–SEX × horários) */
export const AGENDA = {
  days: ['SEG', 'TER', 'QUA', 'QUI', 'SEX'],
  hours: ['08h', '09h', '10h', '11h', '14h', '15h'],
  label: 'Cliente',
} as const

// 01 · Capa
export const CAPA = {
  id: 'inicio',
  label: 'Capa',
  eyebrow: 'Marketing · Vendas · Tecnologia',
  title: 'O programa que **acelera o faturamento** de diversas clínicas por todo o Brasil.',
  badge: 'Acelerando o Marketing e as Vendas dos nossos clientes há **8 anos**.',
  proof: {
    text: '+350 negócios atendidos',
    avatars: [
      'assets/cliente-rafael-ultramar.webp',
      'assets/cliente-claudia-ultramar.webp',
      'assets/cliente-marcel-ferreira.webp',
      'assets/cliente-maira-soliani.webp',
      'assets/cliente-eduardo-schor.webp',
    ],
  },
  /* células preenchidas, na ordem em que aparecem (índice = linha × 5 + coluna) */
  filled: [7, 1, 12, 23, 4, 16, 28, 9, 20, 2, 14, 25, 11, 18, 0, 27, 6, 21],
}

// 02 · Quem somos
export const QUEM_SOMOS = {
  id: 'quem-somos',
  label: 'Quem somos',
  eyebrow: 'Quem somos',
  title: '8 anos de mercado. Um foco definido: **saúde.**',
  text: 'A Nova Dimensão nasceu como um Hub de Marketing, Vendas e Tecnologia focado em ajudar desde pequenas empresas até multinacionais a aumentarem o seu resultado. Hoje, conta com uma operação dedicada ao nicho da saúde: médicos, clínicas e hospitais particulares.',
  stats: [
    { value: '8', caption: 'anos de mercado' },
    { value: '+350', caption: 'empresas atendidas' },
    { prefix: '+R$', value: '50', unit: 'milhões', caption: 'gerados p/ clientes' },
    { value: '+28', caption: 'colaboradores' },
  ],
  closing:
    'Não somos generalistas tentando atender a área da saúde. **Somos dedicados ao seu nicho**, com a solidez de quem já gerou resultado para muitas outras áreas antes.',
}

// 03 · Clientes (mesma lista e fotos do novadimensaohub.com.br)
export const CLIENTES = {
  id: 'clientes',
  label: 'Clientes',
  eyebrow: 'Clientes',
  title: 'Quem confia e conta com o **nosso trabalho**',
  items: [
    { name: 'Dr. Rafael Ultramar', specialty: 'Cirurgião Capilar', handle: 'dr.rafaelultramar', followers: '+72 mil', src: 'assets/cliente-rafael-ultramar.webp' },
    { name: 'Dra. Cláudia Ultramar', specialty: 'Endocrinologista', handle: 'draclaudiamocelin', followers: '+5,4 mil', src: 'assets/cliente-claudia-ultramar.webp' },
    { name: 'Dr. Marcel Ferreira', specialty: 'Odontologia Estética', handle: 'drmarcelferreira', followers: '+478 mil', src: 'assets/cliente-marcel-ferreira.webp' },
    { name: 'Dra. Carol Rocha', specialty: 'Endodontia e Harmonização Orofacial', handle: 'dracarolferreira', followers: '+2,4 mil', src: 'assets/cliente-carol-rocha.webp' },
    { name: 'Dr. Gustavo Sá', specialty: 'Nutrologia', handle: 'drgustavosa', followers: '+281 mil', src: 'assets/cliente-gustavo-sa.webp' },
    { name: 'Dra. Maíra Soliani', specialty: 'Medicina Funcional Integrativa', handle: 'dra.mairasoliani', followers: '+212 mil', src: 'assets/cliente-maira-soliani.webp' },
    { name: 'Dr. Eduardo Schor', specialty: 'Ginecologista', handle: 'dr.eduardoschor', followers: '+32 mil', src: 'assets/cliente-eduardo-schor.webp' },
    { name: 'Giane Rocha', specialty: 'Nutricionista', handle: 'gianerocha_nutri', followers: '+26 mil', src: 'assets/cliente-giane-rocha.webp' },
    { name: 'Dra. Gabriele Higashino', specialty: 'Harmonização Orofacial', handle: 'dragabihigashino', followers: '+23 mil', src: 'assets/cliente-gabriele-higashino.webp' },
    { name: 'Dr. Alexandre Kauê', specialty: 'Médico e Empresário', handle: 'alexandrekaue.s', followers: '+54 mil', src: 'assets/cliente-alexandre-kaue.webp' },
    { name: 'Dra. Marina Vanni', specialty: 'Dermatologista', handle: 'dra.marinavanni', followers: '+5,5 mil', src: 'assets/cliente-marina-vanni.webp' },
    { name: 'Dr. Pedro Lacerda', specialty: 'Transplante Capilar', handle: 'dr.pedrolacerda', followers: '+4,9 mil', src: 'assets/cliente-pedro-lacerda.webp' },
  ],
}

// 04 · Resultados reais
export const RESULTADOS = {
  id: 'resultados',
  label: 'Resultados reais',
  eyebrow: 'Resultados',
  title: 'Resultados **reais** no nicho da saúde',
  lead: 'Não é teoria. É o que já entregamos, todo mês:',
  cases: [
    {
      name: 'Dr. Rafael Ultramar',
      category: 'Transplante capilar · média mensal',
      src: 'assets/cliente-rafael-ultramar.webp',
      stat: { prefix: 'R$', value: '788.000', unit: '/mês' },
      caption: 'faturamento via marketing',
      metrics: [
        ['Mídia por mês', 'R$ 4,5 mil'],
        ['ROAS', '86x'],
        ['Ticket médio', 'R$ 55 mil'],
      ],
    },
    {
      name: 'Dra. Cláudia Mocelin',
      category: 'Consultas · média mensal',
      src: 'assets/cliente-claudia-ultramar.webp',
      stat: { value: '20', unit: 'consultas/mês' },
      caption: 'com menos de R$ 2 mil de investimento em ads',
      metrics: [
        ['Mídia por mês', 'R$ 1.250'],
        ['ROAS', '12x'],
        ['CAC p/ consulta', 'R$ 60'],
      ],
    },
    {
      name: 'Instituto Long Life',
      category: 'Recuperação · primeira semana',
      src: 'assets/cliente-instituto-long-life.png',
      stat: { value: '7', unit: 'dias' },
      caption: 'para o primeiro resultado',
      metrics: [
        ['Faturamento 1º mês', 'R$ 66 mil'],
        ['ROAS', '14,7x'],
        ['Investido', 'R$ 4,5 mil'],
      ],
    },
  ],
  note: 'Médias mensais calculadas sobre o período de 18 meses de cada case.',
}

// 05 · Bastidores dos resultados
export const BASTIDORES = {
  id: 'bastidores',
  label: 'Bastidores dos resultados',
  eyebrow: 'Bastidores',
  title: 'Resultado de verdade das nossas campanhas **chega assim:**',
  lead: 'Prints reais dos grupos com os nossos clientes: agendamentos, consultas realizadas e contratos fechados, mês a mês.',
  prints: [
    { src: 'assets/bastidores-01.jpg', alt: 'Print real de grupo com cliente: fechamento de janeiro', label: 'Print do grupo 1' },
    { src: 'assets/bastidores-02.jpg', alt: 'Print real de grupo com cliente: fechamento de maio', label: 'Print do grupo 2' },
    { src: 'assets/bastidores-03.jpg', alt: 'Print real de grupo com cliente: fechamento de julho', label: 'Print do grupo 3' },
  ] satisfies Photo[],
}

// 06 · Audiência e autoridade
export const AUDIENCIA = {
  id: 'audiencia',
  label: 'Audiência e autoridade',
  eyebrow: 'Audiência e autoridade',
  title: 'E não é só faturamento, é crescimento de **audiência, autoridade** e leads qualificados.',
  items: [
    {
      name: 'Dr. Eduardo Schor',
      specialty: 'Endometriose',
      value: '231 mil',
      caption: 'de views neste carrossel orgânico',
      icon: Eye,
      media: { src: 'assets/audiencia-eduardo-schor.jpg', alt: 'Carrossel orgânico do Dr. Eduardo Schor', label: 'Print do carrossel' },
    },
    {
      name: 'Dr. Rafael Ultramar',
      specialty: 'Transplante capilar',
      value: '10 mil',
      caption: 'de views neste vídeo orgânico focado em gerar autoridade',
      icon: Play,
      media: { src: 'assets/audiencia-rafael-ultramar.jpg', alt: 'Vídeo orgânico do Dr. Rafael Ultramar', label: 'Thumb do vídeo' },
    },
    {
      name: 'Instituto LongLife',
      specialty: 'Clínica Multiespecialidades',
      value: 'Depoimento',
      caption: 'Paloma, gerente comercial de clínica parceira da ND',
      icon: Quote,
      media: { src: 'assets/audiencia-longlife.jpg', alt: 'Depoimento da Paloma, do Instituto LongLife', label: 'Thumb do depoimento' },
    },
  ],
  note: 'Conteúdos orgânicos gravados, editados e publicados pelos próprios profissionais.',
}

// 07 · 01 · O problema
export const PROBLEMA = {
  id: 'o-problema',
  label: 'O problema',
  eyebrow: '01 · O problema',
  title: 'Por que profissionais excelentes continuam **invisíveis?**',
  lead: 'Você provavelmente já disse (ou pensou) em alguma dessas frases:',
  phrases: [
    { quote: 'Eu sei que preciso postar.', text: 'Mas entre uma consulta e outra, o Instagram fica pra depois.' },
    { quote: 'Quando posto, não acontece nada.', text: 'Conteúdo técnico, sem gancho. Só colega de profissão curte.' },
    { quote: 'Já paguei agência.', text: 'Post bonito e relatório de curtida. A agenda continuou igual.' },
    { quote: 'Já rodo anúncio.', text: 'A verba sai todo mês, mas quem chega não agenda.' },
    { quote: 'Vivo de indicação.', text: 'Tem mês bom e mês com buraco na agenda.' },
  ],
  insight: {
    eyebrow: 'O que você não enxerga',
    text: 'O paciente escolhe você antes da consulta. Cada semana sem conteúdo é uma semana em que ele está conhecendo outro profissional…',
  },
}

// 08 · A virada
export const VIRADA = {
  id: 'a-virada',
  label: 'A virada',
  eyebrow: 'A virada',
  title: 'Agora imagina o seu consultório **assim:**',
  moments: [
    { icon: Calendar, title: 'Segunda, 8h.', text: 'Você já sabe exatamente o que gravar na semana. Sem travar, sem “o que eu posto hoje?”.' },
    { icon: Store, title: 'Seu Instagram vira vitrine.', text: 'O paciente chega dizendo: “Dra., eu te acompanho faz tempo”.' },
    { icon: MessageCircle, title: 'O WhatsApp toca.', text: 'Paciente vindo do anúncio, todo dia, direto na sua conversa.' },
    { icon: CalendarCheck, title: 'Seu lead agora converte.', text: 'Você tem um comercial que responde rápido, faz follow-up e transforma conversa em consulta.' },
  ] satisfies IconItem[],
  closing: 'Você grava e atende. A pauta e o tráfego têm **método.**',
}

// 09 · "Mas o ChatGPT não faz isso?"
export const CHATGPT = {
  id: 'chatgpt',
  label: 'Mas o ChatGPT não faz isso?',
  title: '“Mas o **ChatGPT** não faz isso?”',
  lead: 'Uma IA nunca irá substituir um time de especialistas com:',
  items: [
    { icon: Library, title: 'Repertório', text: 'Anos testando o que viraliza (e o que morre) no nicho da saúde. A IA não sabe o que funcionou no consultório ao lado.' },
    { icon: Target, title: 'Estratégia', text: 'Cada roteiro tem um papel no funil: atrair, gerar autoridade ou converter. Não é post solto.' },
    { icon: Fingerprint, title: 'Domina posicionamento', text: 'Sua voz, sua especialidade, seu paciente ideal. Não texto genérico que serve pra qualquer médico.' },
    { icon: ShieldCheck, title: 'Entende de compliance', text: 'Conteúdo e anúncios dentro da Resolução CFM nº 2.336/2023 de publicidade médica.' },
    { icon: ChartColumn, title: 'Sabe ler números e tomar decisões', text: 'Gente olhando o seu resultado todo mês e corrigindo a rota. Prompt não te avisa quando algo está errado.' },
  ] satisfies IconItem[],
  proof: {
    media: { src: 'assets/prova-alexandre-kaue.jpg', alt: 'Print do grupo do Dr. Alexandre Kauê com o time da ND', label: 'Print do grupo do Dr. Alexandre Kauê' },
    quote: '“Foi o melhor script que vocês escreveram até hoje.”',
    caption: 'Grupo do Dr. Alexandre Kauê com o nosso time',
  },
}

// 10 · 02 · O método ESCALA
export const ESCALA = {
  id: 'metodo-escala',
  label: 'O método ESCALA',
  eyebrow: '02 · O método',
  title: 'Depois de 8 anos, uma metodologia própria: **ESCALA**',
  lead: 'Seis etapas que todo consultório percorre para crescer com previsibilidade. Na ordem certa.',
  steps: [
    { letter: 'E', name: 'Entender', text: 'Quem é você, o que vende, pra quem e como se comunica hoje.' },
    { letter: 'S', name: 'Sistematizar', text: 'Organizar a casa para receber os leads: processos, CRM, automações.' },
    { letter: 'C', name: 'Captar', text: 'Gerar demanda qualificada: tráfego pago e conteúdo orgânico.' },
    { letter: 'A', name: 'Ativar', text: 'Converter leads em pacientes: resposta, follow-up, fechamento.' },
    { letter: 'L', name: 'Lucrar', text: 'Otimizar margem: reduzir custo por paciente, aumentar recorrência.' },
    { letter: 'A', name: 'Acelerar', text: 'Escalar o que já funciona: mais verba, novos canais.' },
  ],
  alert: '**Não pule etapas.** Sem ter feito o E, você gera o lead errado. Fazer o C sem olhar para o A, a conversa nunca vira consulta.',
}

// 11 · Os dois motores
export type Owner = 'ND' | 'VOCÊ' | 'SEU TIME'

export const MOTORES = {
  id: 'dois-motores',
  label: 'Os dois motores',
  eyebrow: 'Os dois motores',
  title: 'Todo consultório cheio roda com **dois motores.**',
  engines: [
    {
      icon: Users,
      eyebrow: 'Audiência · Conteúdo',
      title: 'Ser visto e conhecido.',
      text: 'Ideias e roteiros de conteúdo orgânico com curadoria do que funciona no seu nicho. O paciente te conhece antes de precisar.',
      flow: [
        { label: 'Curadoria de temas', owner: 'ND' },
        { label: 'Roteiro de vídeo e post', owner: 'ND' },
        { label: 'Você grava, edita e posta', owner: 'VOCÊ' },
      ] satisfies { label: string; owner: Owner }[],
    },
    {
      icon: Megaphone,
      eyebrow: 'Aquisição · Anúncio',
      title: 'Ser lembrado e escolhido.',
      text: 'Anúncio no Meta que coloca você na frente de quem já busca o que você faz, na sua região.',
      flow: [
        { label: 'Criativos de anúncio', owner: 'ND' },
        { label: 'Campanha no Meta', owner: 'ND' },
        { label: 'Conversa no WhatsApp', owner: 'SEU TIME' },
      ] satisfies { label: string; owner: Owner }[],
    },
  ],
  closing: 'Um alimenta o outro: o conteúdo gera autoridade, o anúncio leva quem já confia até o seu WhatsApp.',
}

// 12 · Curadoria de conteúdo ND
export const CURADORIA = {
  id: 'curadoria',
  label: 'Curadoria de conteúdo ND',
  eyebrow: 'Curadoria de conteúdo ND',
  quote: 'O que trava você na hora de produzir é a ideia e o roteiro. **Isso a gente entrega.**',
  text: 'A gente pesquisa o mercado, entende o que está engajando e adapta para o seu nicho. Você não começa do zero.',
  onceTag: 'Uma vez',
  monthlyTag: 'Todo mês',
  cfmTag: 'CFM',
  process: [
    { title: 'Onboarding', text: 'seu posicionamento e sua voz' },
    { title: 'Pesquisa', text: 'o que está engajando no seu nicho e fora' },
    { title: 'Análise', text: 'formatos, ganchos e temas que performam' },
    { title: 'Adaptação', text: 'para a sua especialidade e o seu paciente' },
    { title: 'Roteiro', text: 'para vídeos e posts estáticos', cfm: true },
    { title: 'Entrega', text: '7 ideias com roteiro por semana' },
  ],
  delivers: {
    title: 'O que a ND entrega',
    items: [
      'Curadoria de temas do seu nicho, toda semana;',
      '7 ideias com roteiro por semana, para vídeo e estático ou carrossel;',
      'Ganchos e formatos que estão performando agora;',
      'Tudo adaptado ao seu posicionamento e à Resolução CFM nº 2.336/2023.',
    ],
  },
  yours: {
    title: 'O que fica com você',
    text: 'Gravar, editar e postar. Você decide o ritmo. A pauta pronta tira o maior obstáculo do caminho.',
  },
}

// 13 · 03 · A solução
export const SOLUCAO = {
  id: 'a-solucao',
  label: 'A solução',
  eyebrow: '03 · A solução',
  title: 'Qual solução da **ND MED** você está contratando?',
  // ⚠️ o original fala em "3 pilares" com 4 cards; padronizado para 4 (confirmar)
  lead: 'Os 4 pilares que você precisa, em um único lugar. Um time conectado e com experiência para entregar os resultados que você quer.',
  pillars: [
    { icon: TrendingUp, title: 'Performance', text: 'Um gestor de tráfego SR alocado para cuidar das suas campanhas.' },
    { icon: Image, title: 'Anúncios assertivos', text: '12 criativos por mês, separados em 6 por quinzena.' },
    { icon: Sparkles, title: 'Social Media', text: '7 ideias por semana, toda segunda-feira no seu WhatsApp.' },
    { icon: Users, title: 'Comercial afiado', text: '2 reuniões estratégicas por mês. Uma para análise dos números, outra para treinamento de secretária.' },
  ] satisfies IconItem[],
}

// 14 · Entregável 1 · Tráfego no Meta
export const TRAFEGO = {
  id: 'trafego-meta',
  label: 'Tráfego no Meta',
  eyebrow: 'Entregável 1 · Tráfego no Meta',
  title: 'Não é só subir campanha no gerenciador. É **paciente chegando** no seu WhatsApp.',
  before: {
    title: 'O que trava o seu anúncio hoje',
    items: [
      'Campanha montada uma vez e esquecida;',
      'Um ou dois criativos rodando até saturar;',
      'Público e objetivo errados: clique, não conversa;',
      'Ninguém lê o custo por conversa e corrige;',
      'Resultado: verba gasta, agenda igual.',
    ],
  },
  after: {
    title: 'A gestão ND Med',
    items: [
      'Campanhas de mensagem direto pro WhatsApp e Direct;',
      'Segmentação por região, perfil e intenção do paciente;',
      'Estrutura por objetivo: alcance, mensagem e remarketing;',
      'Teste de criativos a cada quinzena: o melhor recebe mais verba;',
      'Otimização contínua de orçamento e público;',
      'Leitura diária de custo por conversa.',
    ],
  },
  note: 'Verba de mídia recomendada: a partir de R$ 2.000/mês, paga direto ao Meta. **0% fica com a ND.**',
}

// 15 · Entregável 2 · Criativos de anúncio
export const CRIATIVOS = {
  id: 'criativos',
  label: 'Criativos de anúncio',
  eyebrow: 'Entregável 2 · Criativos de anúncio',
  title: '12 criativos por mês. Pensados pra gerar **agendamento**, não curtida.',
  cards: [
    { icon: Video, value: '8', unit: 'vídeos/mês', tag: '4 roteiros por quinzena', text: 'A ND escreve, você só grava. Gancho, argumento e chamada para o WhatsApp.' },
    { icon: Images, value: '4', unit: 'estáticos/mês', tag: '2 por quinzena', text: 'Copy + layout: a ND entrega pronto pra rodar. Você não precisa fazer nada.' },
  ],
  note: 'Todo criativo testado e medido. O que performa ganha verba; o que não performa sai.',
  galleryLabel: 'Anúncios reais que produzimos para médicos:',
  gallery: [
    { src: 'assets/anuncio-01.jpg', alt: 'Anúncio em vídeo produzido pela ND para médico', label: 'Anúncio 1 (9:16)' },
    { src: 'assets/anuncio-02.png', alt: 'Anúncio estático produzido pela ND para médico — Dr. Marcel Ferreira', label: 'Anúncio 2 (4:5)' },
    { src: 'assets/anuncio-03.png', alt: 'Anúncio estático produzido pela ND para médico — nutrologia', label: 'Anúncio 3 (4:5)' },
  ] satisfies Photo[],
}

// 16 · Entregável 3 · Biblioteca semanal de conteúdo
export type Goal = 'Autoridade' | 'Conexão' | 'Alcance' | 'Conversão'

export const BIBLIOTECA = {
  id: 'biblioteca',
  label: 'Biblioteca semanal de conteúdo',
  eyebrow: 'Entregável 3 · Biblioteca semanal de conteúdo',
  title: 'Toda semana, **7 ideias** com roteiro.',
  lead: 'Para vídeos e posts estáticos, com curadoria do seu nicho.',
  seal: { value: '28', unit: '/mês', caption: 'ideias com roteiro' },
  week: [
    { day: 'SEG', theme: 'Mito ou verdade', goal: 'Autoridade' },
    { day: 'TER', theme: 'Dúvida que todo paciente faz', goal: 'Autoridade' },
    { day: 'QUA', theme: 'Bastidor do consultório', goal: 'Conexão' },
    { day: 'QUI', theme: 'Tendência adaptada ao seu nicho', goal: 'Alcance' },
    { day: 'SEX', theme: 'Sua história / por que escolheu a área', goal: 'Conexão' },
    { day: 'SÁB', theme: 'Opinião firme sobre um tema do nicho', goal: 'Alcance' },
    { day: 'DOM', theme: 'Chamada: como agendar com você', goal: 'Conversão' },
  ] satisfies { day: string; theme: string; goal: Goal }[],
  note: 'Exemplo ilustrativo de uma semana. As pautas mudam toda semana conforme o que está funcionando no seu nicho.',
  why: {
    title: 'Por que isso te diferencia:',
    text: 'o que trava o médico na hora de produzir é a ideia e o roteiro. Isso chega pronto toda semana, alinhado ao seu posicionamento. A ND entrega ideias e roteiros. Gravar, editar e postar é com você.',
  },
}

// 17 · Entregável 4 · Relatório diário de tráfego
export const RELATORIO = {
  id: 'relatorio-diario',
  label: 'Relatório diário de tráfego',
  eyebrow: 'Entregável 4 · Relatório diário de tráfego',
  title: 'Seus números de tráfego, **todo dia.**',
  items: [
    { icon: Clock, title: 'Todo dia, não no fim do mês.', text: 'Se algo sai do trilho, você e a gente sabemos no mesmo dia.' },
    { icon: ChartColumn, title: 'O que importa, sem enrolação.', text: 'Investimento, conversas geradas e custo por conversa.' },
    { icon: Eye, title: 'Transparência total.', text: 'Você sabe exatamente pra onde vai cada real da sua verba.' },
  ] satisfies IconItem[],
  print: {
    src: 'assets/relatorio-print.png',
    alt: 'Print do painel Controle Diário de Mídia da ND com investimento, leads, CPL, cliques, CTR e gráfico de investimento',
    label: 'Print do relatório diário',
  } satisfies Photo,
}

// 18 · Entregável 5 · Reunião mensal de resultado
export const REUNIAO = {
  id: 'reuniao-mensal',
  label: 'Reunião mensal de resultado',
  eyebrow: 'Entregável 5 · Reunião mensal de resultado',
  title: '1x por mês, a gente olha o que acontece **depois que o lead chega.**',
  quote: '“Agência entrega o lead e some. A ND treina quem atende.”',
  cycle: [
    { title: 'Números do mês', text: 'tráfego + conversas' },
    { title: 'Diagnóstico', text: 'onde o lead se perde' },
    { title: 'Treino do time', text: 'o que fazer e como' },
    { title: 'Correção aplicada', text: 'na rotina da recepção' },
    { title: 'Mês seguinte', text: 'mais consulta com a mesma verba' },
  ],
  cycleNote: 'e o ciclo recomeça todo mês',
  tag: 'Gargalo',
  bottlenecks: [
    { icon: Timer, title: 'Tempo de resposta (lead response time)', problem: 'A secretária demora pra responder e o lead esfria.', solution: 'Treinamos a importância da velocidade e como responder rápido.' },
    { icon: Funnel, title: 'Qualificação', problem: 'Resposta em textão, sem condução.', solution: 'Ensinamos a conduzir a conversa até a consulta marcada.' },
    { icon: Repeat, title: 'Follow-up', problem: 'O lead para de responder e ninguém chama de novo, nunca mais.', solution: 'Mostramos como fazer follow-up que traz o paciente de volta.' },
  ],
}

// 19 · Pausa / pergunta
export const PAUSA = {
  id: 'pausa',
  label: 'Antes de seguirmos',
  eyebrow: 'Antes de seguirmos',
  title: 'De tudo que você viu até aqui, o que mais fez sentido pra **sua realidade?**',
}

// 20 · Antes do preço, uma conta
export const CONTA = {
  id: 'quanto-custaria',
  label: 'Antes do preço, uma conta',
  eyebrow: 'Antes do preço, uma conta',
  title: 'Quanto custaria montar isso **sozinho?**',
  team: {
    title: 'Time interno',
    rows: [
      ['Gestor de tráfego', 'R$ 2.500'],
      ['Copywriter / roteirista', 'R$ 3.000'],
      ['Designer', 'R$ 2.000'],
      ['Estrategista de conteúdo', 'R$ 2.500'],
      ['Consultoria comercial', 'R$ 2.000'],
    ],
    total: { label: 'Time interno', value: 'R$ 12 mil', unit: '/mês' },
    sixMonths: { label: 'Em 6 meses:', value: 'R$ 72.000', rest: '+ recrutar, treinar e gerenciar 5 pessoas.' },
  },
  vs: 'vs',
  nd: {
    eyebrow: 'Com a ND Med',
    title: 'Um time inteiro, especialista em saúde, atuando em prol dos resultados do seu consultório.',
    chips: ['Estratégia', 'Funis', 'Criativos', 'Tráfego', 'Ideias', 'Análises de mercado', 'Roteiros', 'Treinamento comercial'],
    text: 'Sem contratar, sem treinar, sem depender de uma agência genérica que não entende do seu mercado.',
  },
}

// 21 · Máquina ND Med (upsell)
export const MAQUINA = {
  id: 'maquina-nd-med',
  label: 'Máquina ND Med',
  eyebrow: 'Para clínicas prontas para escalar',
  title: 'Conheça também a Máquina ND Med: uma máquina, **três engrenagens.**',
  gears: [
    { n: '01', name: 'DOXA · Orgânica', verb: 'Atrair', text: '60 vídeos em 90 dias, sem você gravar. Constrói autoridade e atrai: o paciente te conhece antes de precisar. **Garantia de 1 milhão de views.**' },
    { n: '02', name: 'Performance Paga', verb: 'Captar', text: 'Google Ads + Meta Ads, funis, landing page e criativos. Traz quem está pronto pra agendar, direto pro CRM.' },
    { n: '03', name: 'iSale · Vendas', verb: 'Converter', text: 'SDR com IA que responde em minutos, qualifica, faz follow-up infinito e entrega a consulta agendada, 24h por dia, com lembrete anti-no-show.' },
  ],
  investment: {
    eyebrow: 'Investimento',
    value: 'R$ 9.000',
    unit: '/mês',
    idealTitle: 'Ideal para:',
    ideal: [
      'Clínicas com recepção ou time comercial;',
      'Ticket alto e verba de mídia para Google + Meta;',
      'Quem quer a operação inteira rodando, sem precisar gravar.',
    ],
  },
  compare: [
    { label: 'Duo', text: 'a ND entrega ideias, roteiros e tráfego; você grava.' },
    { label: 'Máquina', text: 'a ND grava, capta e converte por você.' },
  ],
}

// 22 · Perguntas de compromisso (0 a 10)
export const COMPROMISSO = {
  id: 'compromisso',
  label: 'Perguntas de 0 a 10',
  eyebrow: 'Antes de falarmos de preço…',
  questions: [
    'De 0 a 10, você acredita que está no momento de avançar com a gente para faturar mais e crescer seus resultados?',
    'De 0 a 10, você acredita que toda essa entrega vai realmente facilitar sua vida e sua jornada?',
    'De 0 a 10, você acredita que nossos cases de sucesso e tudo que mostrei trazem a segurança necessária para você se tornar nosso cliente?',
  ],
}

// 23 · Investimento
export const INVESTIMENTO = {
  id: 'investimento',
  label: 'Investimento',
  eyebrow: 'Investimento',
  summary: {
    eyebrow: 'Resumo completo do contrato',
    title: 'ND Med Duo · **6 meses** de trabalho',
    items: [
      ['Gestão de Tráfego Pago', '6 meses'],
      ['72 criativos de anúncio', '12 por mês'],
      ['168 ideias de conteúdos orgânicos', '7 por semana'],
      ['Relatório em tempo real de tráfego', 'todo dia'],
      ['6 reuniões de resultado + treinamentos comerciais', '1 por mês'],
      ['Onboarding e análise de posicionamento', 'no início'],
    ],
    note: 'Verba de mídia sugerida: mínimo de R$ 2.000/mês, paga direto ao Meta. Nenhuma % fica com a ND.',
  },
  payTitle: 'Escolha como pagar',
  card: {
    badge: 'Mais vantajoso',
    label: 'Integral no cartão de crédito, parcelado',
    installments: '6x',
    value: 'R$ 3.333',
    total: 'Cobrança total realizada: R$ 20.000',
    saving: 'Você economiza R$ 5.200,00 no total',
    monthly: 'R$ 867 a menos por mês',
    urgency: 'Condição válida só nesta reunião',
  },
  boleto: {
    label: 'Boleto mensal',
    value: 'R$ 4.200',
    unit: 'p/ mês',
    detail: 'durante 6 meses',
    total: 'Total R$ 25.200',
  },
  footer: 'Mesmo plano, mesmas entregas. Só muda quanto e como você paga.',
}

// 24 · ROI
export const ROI = {
  id: 'roi',
  label: 'ROI',
  eyebrow: 'A matemática é simples…',
  title: 'Não tem como não dar **ROI**',
  funnel: [
    { icon: Wallet, label: 'Verba no Meta', value: 'R$ 2.000', text: 'Com R$ 2.000 de mídia no mês…' },
    { icon: MessageCircle, label: 'Conversas', value: '100', text: 'a R$ 20 por conversa (conservador), são 100 conversas no WhatsApp e Direct.' },
    { icon: CalendarCheck, label: 'Agendamento', value: '20', text: 'Se 20% agendarem: 20 consultas marcadas.' },
    { icon: UserCheck, label: 'Comparecimento', value: '12', text: 'Se 60% comparecerem: 12 pacientes na sua cadeira.' },
    { icon: TrendingUp, label: 'Faturamento', value: 'R$ 7.200', text: 'Com ticket de R$ 600: R$ 7.200 no mês.' },
  ],
  breakEven: {
    eyebrow: 'Ponto de equilíbrio',
    equationLabel: 'Seu investimento no mês:',
    terms: ['R$ 3.333', 'R$ 2.000'],
    total: 'R$ 5.333',
    text: 'Com ticket de R$ 600, **9 pacientes** pagam o mês inteiro. A partir do 10º, é lucro.',
    extra: 'Sem contar retorno, procedimento e indicação.',
  },
  note: 'Referência real: a Dra. Cláudia Mocelin teve R$ 62 de mídia por consulta. Aqui usamos R$ 167, quase 3x pior, e a conta ainda fecha. Premissas ilustrativas, não são promessa de resultado: dependem de oferta, atendimento comercial e outros fatores.',
}

// 25 · Encerramento / CTA
export const ENCERRAMENTO = {
  id: 'vamos-comecar',
  label: 'Vamos começar?',
  title: 'Daqui a seis meses… sua agenda vai estar **cheia** ou igual hoje?',
  text: 'Chega de postar sem estratégia e de anunciar no escuro. Você precisa de método pra ser lembrado e ser procurado.',
  cta: 'Vamos começar?',
}
