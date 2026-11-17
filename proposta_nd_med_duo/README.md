# Proposta Comercial · ND Med Duo

Apresentação web de 25 slides no design system da Nova Dimensão (`design-system.md`).
Conteúdo: `../conteúdo.md` → todo o texto mora em `src/config/content.ts`.

## Rodar

```bash
npm install
npm run dev        # http://localhost:5173/proposta/
npm run build      # gera dist/
```

## Apresentar

- **→ / ↓ / Espaço / PageDown**: avança. No desktop, primeiro revela os itens do slide, um a um; depois passa ao próximo.
- **← / ↑ / PageUp**: volta. **Home / End**: primeiro / último slide.
- **F**: tela cheia.
- Link direto para um slide: `/proposta#investimento` (ids em `content.ts`).
- No desktop cada slide é um palco 1920×1080 reduzido para caber na tela. No celular vira página com rolagem vertical.
- **PDF**: Ctrl+P → "Salvar como PDF" (um slide por página, 1920×1080, com tudo revelado; marque "Gráficos de fundo").

## Imagens pendentes (`public/assets/`)

Enquanto o arquivo não existir, o slide mostra um espaço reservado tracejado com o nome esperado.

| Slide | Arquivo | O que é |
|---|---|---|
| 05 Bastidores | `bastidores-01.webp` … `bastidores-04.webp` | prints dos grupos de WhatsApp (vertical, ~9:19) |
| 06 Audiência | `audiencia-eduardo-schor.webp` | print do carrossel (9:16) |
| 06 Audiência | `audiencia-rafael-ultramar.webp` | thumb do vídeo orgânico (9:16) |
| 06 Audiência | `audiencia-longlife.webp` | thumb do depoimento da Paloma (9:16) |
| 09 ChatGPT | `prova-alexandre-kaue.webp` | print do grupo do Dr. Alexandre Kauê (vertical) |
| 15 Criativos | `anuncio-01.webp`, `anuncio-03.webp` | anúncios em vídeo (9:16) |
| 15 Criativos | `anuncio-02.webp`, `anuncio-04.webp` | anúncios estáticos (4:5) |
| 16 Biblioteca | `biblioteca-print.webp` | print da biblioteca de ideias e roteiros |

Já incluídos: logo oficial (`logo-nd-branco.svg` + versão navy) e as 12 fotos de clientes do novadimensaohub.com.br.

## Pendências antes do deploy

- [ ] `CONFIG.CTA_URL` em `src/config/content.ts`: destino do botão "Vamos começar?" (sem ele, o botão aparece sem ação)
- [ ] `⚠️DOMINIO` e `⚠️NOME_REDE` em `docker-compose.yml` (e o comentário do `nginx.conf`)
- [ ] Liberar o domínio da proposta no kit Adobe Fonts `hra1vhi` (Helvetica Neue World); fora dele cai no fallback Helvetica/Arial
- [ ] Se a proposta não for morar em `/proposta`, trocar `base` no `vite.config.ts` e os caminhos do `nginx.conf`/`Dockerfile`

A página sai com `noindex` (meta + header no nginx): é uma proposta com preço, fora dos buscadores.

## Deploy (Docker Swarm + Traefik)

```bash
./build.sh
```
