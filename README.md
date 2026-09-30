# Sobradinho Injeção Diesel

Site institucional de página única, feito em Vite, React, Tailwind CSS 4 e componentes shadcn/ui. Execute `npm install` e `npm run dev` para visualizar localmente. `npm run build` verifica TypeScript, gera `dist/` e pré-renderiza o conteúdo da home no HTML. `npm test` valida conteúdo, links, metadados e arquivos de publicação.

## Conteúdo

A home apresenta reparo de bicos e bombas diesel, marcas, serviços, consulta de bicos à venda e contato. A seção de bicos informa que há modelos novos e recondicionados e encaminha a consulta de disponibilidade e valores pelo WhatsApp. Não há página de catálogo, carrinho ou pagamento.

O conteúdo segue o briefing do Segundo Cérebro. Telefone, endereço e foco dos serviços foram confirmados. A lista de marcas e aplicações ainda precisa de validação final com a oficina; os logos não afirmam representação, autorização ou parceria. A garantia de 3 meses ou 10 mil km se aplica somente aos bicos vendidos; confirmar as condições completas antes de detalhá-la no site.

Os serviços explicam que a oficina testa a peça antes do reparo, mostra o resultado para decisão do cliente e documenta os testes e reparos. A oficina atende bombas de alta e injetoras. Não há visitas para acompanhar testes ou conhecer a oficina.

## SEO e publicação

O domínio escolhido é `https://sobradinhodiesel.com.br`. Canonical, Open Graph e dados estruturados usam esse endereço. `public/sitemap.xml` lista a home; `public/robots.txt` permite rastreamento e aponta para o sitemap; `public/llms.txt` resume informações confirmadas e liga para a home. DNS, hospedagem, HTTPS e redirecionamentos ainda precisam ser configurados para publicar o domínio.

Depois de apontar o DNS e publicar com HTTPS, cadastre o domínio no Google Search Console e no Bing Webmaster Tools, envie `https://sobradinhodiesel.com.br/sitemap.xml` e inspecione a URL inicial. Verifique também se o perfil da empresa no Google usa o mesmo nome, telefone e endereço. A presença nos resultados depende da indexação e não é garantida por arquivos ou marcação estruturada.

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
