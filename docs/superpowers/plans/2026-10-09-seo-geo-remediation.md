# Plano: correções SEO, GEO e publicação da Sobradinho Diesel

## Contexto

O site já está publicado em `https://sobradinhodiesel.com.br`. A auditoria confirmou overflow horizontal em seis elementos no celular, uma página 404 genérica, ausência de cabeçalhos HTTP de segurança e carregamento de um ID GA4 que retorna 404. O Google Analytics autenticado confirma `G-Q0ET20C21G` para a propriedade deste domínio; a conversão do Google Ads deve continuar usando `AW-18483826712/iK0dCMTCrIwdEJig4-1E`. A checagem também apontou ausência de referência para `llms.txt`, representação Markdown da home, `/AGENTS.md` e banner de consentimento.

O `README.md` ainda diz que o domínio precisa ser publicado, embora já esteja no ar e apareça como propriedade no Search Console. O sitemap e o `robots.txt` já estão corretos. Não incluir `<lastmod>` sem datas de atualização confiáveis.

## Restrições globais

- Trabalhar neste worktree derivado de `origin/main`; preservar todas as edições locais do checkout original.
- Manter domínio, conteúdo factual, IDs e destinos confirmados. Corrigir GA4 para `G-Q0ET20C21G` e preservar a conversão do Ads.
- Não carregar nem ativar tags de análise/publicidade antes da escolha afirmativa do visitante; permitir recusa e reabertura das preferências.
- Não inventar datas de `lastmod`, integrações, capacidades de agente, políticas legais, horários ou fatos de negócio.
- Tornar a home encontrável via `llms.txt`, Markdown e instruções de crawler com conteúdo coerente com o site.
- Um manifesto MCP/Agent Card representa uma superfície de agente invocável. Este site institucional não expõe API ou agente; não publicar um manifesto fictício apenas para satisfazer uma recomendação do checker. Registrar essa limitação e qualquer aviso residual.
- Search Console, Google Ads e Analytics foram consultados em modo somente leitura; não modificar suas configurações.
- Usar testes primeiro em cada tarefa, observar a falha, implementar o menor ajuste e rodar a suíte completa.

## Task 1 — descoberta GEO, 404 e documentação

**Interfaces produzidas:** `/index.md`, `/AGENTS.md`, referência HTML para as representações alternativas, página estática de 404 com navegação útil e resposta 404 no Cloudflare, README atualizado para publicação existente.

**Arquivos prováveis:** `tests/seo-publication.test.mjs` (novo), `index.html`, `public/index.md` (novo), `public/AGENTS.md` (novo), `public/404.html` (novo), `wrangler.jsonc`, `README.md`.

### Passos

1. Criar testes que falhem para a home não referenciar `llms.txt` e Markdown; ausência de `/index.md`, `/AGENTS.md`, 404 útil e `not_found_handling: "404-page"`; README afirmar que o site ainda não foi publicado.
2. Rodar os testes novos e confirmar as falhas esperadas.
3. Publicar resumos factuais em Markdown e instruções curtas para agentes, adicionar referências `rel="alternate"`, criar 404 responsiva acessível e configurar a resposta 404 do Cloudflare.
4. Atualizar README para dizer que o domínio foi publicado e que Search Console já está configurado, sem alegar resultados ou indexação garantida.
5. Rodar `npm run build` e `npm test`; inspecionar o HTML gerado e os arquivos copiados para `dist/`.
6. Commit: `feat(seo): publish machine-readable site resources`.

**Esperado:** build e testes passam; arquivos existem em `dist/`; sitemap segue sem `lastmod`; URLs e dados confirmados permanecem consistentes.

## Task 2 — consentimento, medição e cabeçalhos

**Interfaces produzidas:** escolha e persistência de consentimento, carregamento condicional das tags, eventos de contato que não bloqueiam navegação sem consentimento, sete cabeçalhos HTTP de segurança em assets estáticos.

**Arquivos prováveis:** `tests/privacy-security.test.mjs` (novo), `index.html`, `src/main.tsx`, `src/contactConversion.ts`, novos módulos/componentes de consentimento, `src/site.tsx`, `src/index.css`, `public/_headers` (novo).

### Passos

1. Criar testes que falhem para ID GA4 errado; tags sem escolha prévia; falta de aceitar/recusar/reabrir e armazenamento da preferência; navegação de contato interceptada sem tag; e cada cabeçalho de segurança ausente.
2. Rodar esses testes e confirmar as falhas esperadas.
3. Substituir o ID inválido pelo `G-Q0ET20C21G`, carregar GA4 e Google Ads apenas após consentimento, iniciar Consent Mode com armazenamento negado, dar opção explícita de recusa e permitir atualizar a escolha. Sem tag ativa, o clique de contato navega diretamente.
4. Configurar CSP restritiva e `Strict-Transport-Security`, `X-Frame-Options`, `X-Content-Type-Options`, `Cross-Origin-Opener-Policy`, `Referrer-Policy` e `Permissions-Policy`, compatíveis com os assets próprios e as tags autorizadas.
5. Rodar `npm run build` e `npm test`; conferir que o HTML pré-renderizado não solicita gtag antes da escolha e que o Consent Mode não interrompe os links de telefone/WhatsApp.
6. Commit: `fix(privacy): gate analytics behind visitor consent`.

**Esperado:** testes e build passam; ID correto é único; o ID do Ads e o rótulo de conversão permanecem; nenhuma tag Google é requisitada antes da escolha; os cabeçalhos estão no formato suportado pelo Cloudflare Assets.

## Task 3 — overflow móvel e verificação integral

**Interfaces produzidas:** layout responsivo sem scroll horizontal nos viewports móveis auditados.

**Arquivos prováveis:** `tests/mobile-layout.test.mjs` (novo), `src/index.css`, `src/site.tsx`.

### Passos

1. Reproduzir overflow com auditoria `--mobile` e inspecionar os elementos/bounds com navegador no viewport móvel.
2. Registrar teste de regressão da regra de layout (evidência de navegador para o documento renderizado), observando a falha antes do ajuste.
3. Ajustar largura mínima/flex/grid/tipografia nos elementos identificados; evitar esconder overflow globalmente como substituto para corrigir os componentes.
4. Rodar build e suíte completa; executar SEOmator com crawl/renderização e `--mobile` contra a publicação local do Cloudflare. Inspecionar status 404 e headers HTTP com requisições locais.
5. Reauditar `https://sobradinhodiesel.com.br` após o push/deploy e comparar os achados endereçados.
6. Commit: `fix(mobile): prevent horizontal page overflow`.

**Esperado:** auditoria móvel não reporta overflow; falhas acionáveis listadas no contexto foram resolvidas; erros de carregamento do GA4 desapareceram; o HTML 404 retorna status 404. Registrar limites: CrUX/RUM não é medido em laboratório, cobertura/posições exigem Search Console, e manifesto de agente é não aplicável enquanto não houver superfície invocável.

## Revisão e integração

- Revisão integral da diferença desde `origin/main` por revisor novo, com foco em privacidade/consentimento, CSP, compatibilidade de analytics e conteúdo factual.
- Executar fix pass apenas para achados Críticos/Importantes com teste RED→GREEN e suíte verde.
- Com testes e auditoria local aprovados, integrar conforme pedido explícito do usuário: commit na branch de trabalho e push fast-forward para `origin/main`. Nunca usar force push.
- Repetir auditoria no domínio publicado após deploy e relatar eventuais pendências de plataforma.
