# Sobradinho Injeção Diesel

Site institucional de página única, feito em Vite, React, Tailwind CSS 4 e componentes shadcn/ui. Execute `npm install` e `npm run dev` para visualizar localmente. `npm run build` verifica TypeScript, gera `dist/` e pré-renderiza o conteúdo da home no HTML. `npm test` valida conteúdo, links, metadados e arquivos de publicação.

## Conteúdo

A home apresenta reparo de bicos e bombas diesel, marcas, serviços, consulta de bicos à venda e contato. A seção de bicos informa que há modelos novos e recondicionados e encaminha a consulta de disponibilidade e valores pelo WhatsApp. Não há página de catálogo, carrinho ou pagamento.

O conteúdo segue o briefing do Segundo Cérebro. Telefone, endereço e foco dos serviços foram confirmados. A lista de marcas e aplicações ainda precisa de validação final com a oficina; os logos não afirmam representação, autorização ou parceria. A garantia de 3 meses ou 10 mil km se aplica somente aos bicos vendidos; confirmar as condições completas antes de detalhá-la no site.

Os serviços explicam que a oficina testa a peça antes do reparo, mostra o resultado para decisão do cliente e documenta os testes e reparos. A oficina atende bombas de alta e injetoras. Não há visitas para acompanhar testes ou conhecer a oficina.

## SEO e publicação

O site está publicado em `https://sobradinhodiesel.com.br`. Canonical, Open Graph e dados estruturados usam esse endereço. `public/sitemap.xml` lista a home; `public/robots.txt` permite rastreamento geral e para `OAI-SearchBot`; `public/llms.txt` resume informações confirmadas. A home aponta para `llms.txt` e para sua representação Markdown em `index.md`. `public/AGENTS.md` também oferece contexto factual para agentes. Esses arquivos descrevem o site; não criam uma API ou um agente invocável.

### Resultado da auditoria pública (09/10/2026)

A auditoria SEO/GEO do site publicado terminou com **95/100, zero falhas, 35 avisos e 12 itens não medidos**. Mobile, GEO, Legal, JavaScript, Técnico e Core Web Vitals de laboratório ficaram em 100; Segurança ficou em 97. “Zero falhas” significa que os critérios de falha dessa execução passaram, não que todos os avisos ou indicadores de campo foram eliminados.

Remediações incluídas no repositório:

- Corrigida a rolagem horizontal em telas estreitas e publicada uma página 404 própria que responde com status 404.
- Adicionadas as referências da home a `llms.txt` e `index.md`, além de `index.md` e `AGENTS.md` públicos.
- Corrigida a tag de Analytics para GA4 `G-Q0ET20C21G`. As tags GA4 e Google Ads e o registro de cliques de contato só são carregados/registrados depois do consentimento explícito do visitante. Sem consentimento, a navegação continua normalmente sem disparar a conversão.
- Adicionadas políticas de segurança em `public/_headers`: CSP, HSTS, X-Frame-Options, X-Content-Type-Options, COOP, Referrer-Policy e Permissions-Policy.
- Impedida a injeção automática do beacon de Cloudflare Web Analytics nas respostas HTML com `Cache-Control: ... no-transform`, inclusive na resposta 404. Para `/assets/*`, esse cabeçalho é removido e a regra de cache estático volta ao padrão. A verificação local com Wrangler e a verificação pública confirmaram esse comportamento. A configuração da conta Cloudflare não foi alterada; a proteção está aplicada às respostas do site.
- Incluídas perguntas frequentes curtas, limitadas a informações confirmadas pela oficina.

### Avisos e limites ainda conhecidos

- Os avisos restantes incluem a proporção de texto/HTML (10,4%), recomendações de metadados, imagens/cache/compactação, links, sinais de confiança, dados estruturados e acessibilidade. HSTS ainda não usa `includeSubDomains` nem `preload`, e a política não inclui Trusted Types. Tratar cada recomendação conforme compatibilidade e evidência, sem enfraquecer a CSP ou inventar informações comerciais.
- O sitemap não declara `<lastmod>` porque não há uma data de alteração por URL mantida com precisão. Não preencher com datas artificiais.
- O checker ainda sugere um manifesto em `/.well-known`; o site não expõe uma API ou agente que justifique publicar um Agent Card/MCP manifest.
- Os 12 itens “não medidos” incluem INP real. INP requer dados de campo (CrUX ou RUM); uma execução de laboratório não o confirma. O beacon de Cloudflare RUM continua bloqueado nas respostas HTML; CrUX ou uma alternativa de RUM compatível com consentimento podem fornecer dados de campo.
- A propriedade do domínio existe no Google Search Console. Não se registrou como concluído o envio do sitemap nem uma faixa de datas para métricas de desempenho; consultar a interface antes de relatar posições, cliques ou cobertura.
- Na propriedade GA4 não havia dados recebidos nas 48 horas observadas. Como a coleta depende de consentimento, validar em tempo real depois de publicar e aceitar Analytics no banner. No Google Ads, a conversão de contato estava ativa e primária, mas sem conversões no período de sete dias selecionado na inspeção.

Commits da implementação SEO/GEO e privacidade enviados para `main` até a auditoria: `6e292e9`, `44615de`, `0c35d8b`, `5d3f8eb`, `f18099f`, `b55b4e6`, `239fede` e `0e15f6b`. Consulte o histórico Git para os títulos completos.

Para acompanhar rastreamento e indexação, consulte a propriedade do domínio no Google Search Console e verifique `https://sobradinhodiesel.com.br/sitemap.xml`. Confira também se o Perfil da Empresa no Google usa o mesmo nome, telefone e endereço. A presença nos resultados depende da indexação e não é garantida por arquivos ou marcação estruturada.

### Verificações locais

```sh
npm install
npm run dev
npm run build
npm test
npm run preview
```

`npm run build` verifica TypeScript, gera `dist/` e pré-renderiza a home. `npm test` valida conteúdo, links, metadados e arquivos de publicação. A prévia de produção é servida por `npm run preview`.

## Imagens, marcas e fontes

- `public/assets/logo-sobradinho.png`: logo horizontal original, preservada como referência da identidade.
- `public/assets/simbolo-injetor-sem-derivacao.png`: símbolo anterior do cabeçalho, mantido no repositório.
- `public/assets/logo-sobradinho-quadrada.png`: imagem quadrada original de 1254 × 1254 px enviada pelo cliente, preservada como referência.
- `public/assets/logo-sobradinho-transparente.png`: versão sem fundo da imagem enviada; usada no cabeçalho, no rodapé e nos dados estruturados. No rodapé, o traço aparece branco sobre o fundo azul.
- `public/assets/favicon-sobradinho.png`: ícone quadrado de 256 px do injetor, otimizado para navegadores e buscadores.
- `public/assets/picapes-modelos-diesel.webp`: composição ilustrativa criada em 25/09/2026 a partir de referências enviadas pelo cliente (Amarok branca, Nissan azul e Mitsubishi prata). Não representa a oficina nem veículos de clientes. O texto alternativo também identifica a imagem como ilustração.
- Logos de Bosch, DENSO, John Deere, Siemens e Delphi em `public/assets/`. A lista atendida e o contexto de uso público precisam de confirmação com a oficina, especialmente se “Siemens” se refere a Siemens VDO.
- A interface usa Barlow local nos pesos 400, 700 e 800, com licença SIL OFL 1.1 em `public/assets/fonts/OFL.txt`.

O link “Traçar rota” usa as coordenadas do local compartilhado pela oficina no Google Maps. Fotos reais da oficina, horário e condições completas da garantia ainda precisam ser confirmados.
