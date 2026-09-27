# Sobradinho Injeção Diesel

Site com duas páginas, feito em Vite, React e componentes shadcn/ui. Execute `npm install` e `npm run dev` para visualizar localmente. `npm run build` gera a versão de produção em `dist/`.

## Conteúdo e decisões

O conteúdo segue o briefing mantido no Segundo Cérebro, no projeto “Sobradinho Diesel”. Telefone, endereço e foco em reparo de bicos e bombas foram confirmados. A ordem da página é hero, marcas, serviços, bicos à venda e contato. A lista de marcas e aplicações ainda precisa de validação final com a oficina; os logotipos indicam marcas trabalhadas, sem afirmar representação, autorização ou parceria.

O hero oferece atendimento por WhatsApp e um link direto para `bicos-a-venda.html`. A seção de bicos da página inicial também abre essa página em outra aba. Os serviços usam desenhos vetoriais simples de um bico injetor e de uma bomba diesel, feitos para a página; as imagens de produtos consultadas como referência não foram incorporadas.

A página de bicos mostra consulta de disponibilidade enquanto não houver itens confirmados. Quando houver estoque validado, cada item publicado deve usar dados reais de marca, código/modelo, aplicação, condição e foto; remover o campo de condição quando não houver essa informação.

As descrições dos serviços explicam que a oficina testa as peças antes do reparo, mostra o resultado para decisão do cliente, filma e registra os testes e serviços e aceita que o cliente acompanhe o teste. Também atende bombas de alta e injetoras, oferece bicos diesel recondicionados e modelos novos a preço de atacado e vende peças originais Delphi, Bosch e Denso. A garantia de 3 meses ou 10 mil km foi confirmada pelo cliente apenas para os bicos vendidos; não deve ser atribuída aos reparos.

## Tipografia

O site usa [Barlow](https://fonts.google.com/specimen/Barlow), família de Jeremy Tribby inspirada em letras de placas e sinalização de transporte. Os pesos 400, 700 e 800 estão hospedados em `public/assets/fonts/` no formato WOFF2 (subconjunto latino, que inclui os acentos usados no site), sem depender de requisição externa em tempo de execução. A licença SIL Open Font License 1.1 está em `public/assets/fonts/OFL.txt`. Fonte: [projeto Barlow](https://github.com/jpt/barlow) e arquivos servidos pelo Google Fonts.

## Imagens e logotipos

- `public/assets/logo-sobradinho.png`: logo fornecida pelo cliente, recortada para retirar margens transparentes. `public/assets/simbolo-injetor.png` é o símbolo da mesma arte usado no cabeçalho, sem distorção.
- `public/assets/picapes-modelos-diesel.webp`: composição ilustrativa gerada com a ferramenta integrada de imagens em 25/09/2026 a partir das três imagens enviadas pelo cliente nesta conversa: Volkswagen Amarok branca, Nissan azul e Mitsubishi prata. As picapes foram colocadas em um pátio de oficina coerente; a imagem não representa a oficina nem veículos de clientes. Resolução: 1672 × 941 px. Os arquivos de referência vieram das imagens anexadas pelo cliente; a composição gerada é um novo asset.
- `public/assets/bosch-official.svg`: SVG do cabeçalho do [site oficial da Bosch](https://www.bosch.com/).
- `public/assets/denso.png`: [PNG 3× do cabeçalho da DENSO Aftermarket Europe](https://www.denso-am.eu/dist/images/logo@3x.png), no fundo vermelho original do asset.
- `public/assets/johndeere-official.svg`: [SVG usado no site oficial John Deere Brasil](https://www.deere.com.br/assets/images/deere-logo-agriculture.svg).
- `public/assets/siemens-official-white.svg`: [SVG branco do cabeçalho do site oficial Siemens Brasil](https://images.sw.cdn.siemens.com/logo/logo-white.svg), sobre fundo escuro para preservar a leitura.
- `public/assets/delphi-official.svg`: [SVG usado no site oficial Delphi Autoparts](https://www.delphiautoparts.com/ResourcePackages/Delphi/dist/a1d6c1389a3f6b5a43bd.svg).

Siemens e Siemens VDO não devem ser tratados como equivalentes sem confirmação da linha atendida. A [história da Continental](https://cdn.continental.com/en/company/history/milestones/) registra a aquisição da Siemens VDO em 2007; a [Continental Aftermarket](https://www.continental-aftermarket.com/en-en/magazine/technology-products/vdo-will-become-continental-what-you-can-expect) descreve a migração posterior de VDO para Continental em produtos e serviços. Confirmar com a oficina qual identidade corresponde às peças atendidas. A apresentação pública final e o uso dos logotipos devem ser validados com a oficina.

Ainda faltam itens reais do estoque, fotos da oficina e domínio final. Canonical e sitemap dependem desse domínio.

O link “Traçar rota” usa as coordenadas do [local compartilhado pela oficina no Google Maps](https://maps.app.goo.gl/PqFhCXtw3TQ5N2Yn9), evitando depender da busca pelo endereço escrito.
