# CONCEPT TEMPLATE

Template reutilizável criado a partir da arquitetura validada do **Catcooler Concept V2.9.1**.

## Regra principal
Para criar uma nova aplicação, altere primeiro os arquivos da pasta `config/`.
Evite modificar `app.js` e `app.css`. Isso preserva o núcleo comum entre os projetos.

## Fluxo recomendado
1. Duplique esta pasta e renomeie o novo projeto.
2. Substitua `assets/process-placeholder.svg` pela imagem real do processo.
3. Edite `config/app.json`.
4. Posicione as lâmpadas em `config/hotspots.json`.
5. Preencha `config/equipment.json`.
6. Adicione perguntas em `config/quiz.json`.
7. Adicione cenários em `config/scenarios.json`.
8. Se houver matriz causa × efeito, preencha `config/interlocks.json`.
9. Preencha Operações Unitárias / Mecânica dos Fluidos em `config/engineering.json`.
10. Troque os ícones da pasta `assets/` quando quiser uma identidade própria.

## Funcionalidades preservadas no template
- PWA;
- responsividade PC/mobile;
- painel flutuante com rolagem;
- hotspots;
- edição local por item;
- vídeos, imagens, PDF e áudio inline;
- quiz;
- cenários;
- matriz causa × efeito;
- Operações Unitárias;
- Mecânica dos Fluidos.

## Importante
Os ícones incluídos são apenas placeholders herdados do projeto de referência.
Substitua-os no novo projeto para não usar a identidade do Catcooler.

O Catcooler congelado não deve ser alterado para criar aplicações novas.
