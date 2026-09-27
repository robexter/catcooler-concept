# Catcooler Concept U-39

Arquivos principais:
- index.html
- Catcooler_onepage_interativo_editavel.html
- app.css
- app.js
- manifest.json
- sw.js

As alterações feitas pelo usuário ficam salvas localmente no aparelho/navegador.


## V1.4 — Layout congelado

A estrutura visual foi congelada após o ajuste ultrafino das lâmpadas.

Elementos congelados:
- enquadramento da imagem do catcooler;
- aspect ratio da tela;
- posição das lâmpadas/hotspots;
- tamanho visual das lâmpadas;
- painel flutuante;
- filtros e barra de busca;
- identidade visual geral.

A partir desta versão, recomenda-se alterar apenas:
- conteúdo técnico dos pontos;
- observações operacionais;
- fórmulas e relações;
- quiz e feedback;
- novos materiais/vídeos.

Qualquer alteração futura de coordenadas ou enquadramento deve gerar nova rodada de validação visual.


## V1.5 — Conteúdo técnico avançado

O layout permanece congelado. Foram refinados apenas:
- explicações técnicas dos oito pontos;
- sinais e correlações para acompanhamento no CIC;
- alertas operacionais;
- balanços de massa e energia;
- shrink/swell do F-3982;
- conceito de controle de nível com antecipação por HBF/vapor;
- diagnóstico de limitação de remoção de calor;
- interpretação de assimetria C-3901A/B;
- perda de aeração;
- confirmação de fechamento da XV-808;
- cinco novos cenários situacionais no quiz.

Para operação real, prevalecem procedimentos e lógicas oficiais da unidade.


## V2.0 — Training Suite
Layout do HMI e hotspots permanecem congelados. Inclui 6 cenários encadeados, diagnóstico de tendências, simulador shrink/swell, comparação A/B, trip GV-3901, modo localize, quiz por equipamento, banco de 48 questões em 3 níveis, pontuação por habilidade, passagem de turno, ações que pioram, animações e histórico local de desempenho.


## V2.1 — Vídeos e arquivos por ponto

Cada lâmpada/equipamento possui agora duas áreas separadas:
- Vídeos: link de vídeo já existente + upload de vídeos do aparelho com reprodução dentro do app.
- Arquivos/documentos: upload de múltiplos arquivos, com Abrir, Baixar e Excluir.

Os uploads locais são armazenados em IndexedDB no navegador e ficam somente naquele dispositivo/perfil.
Eles não são enviados automaticamente ao GitHub Pages e não ficam visíveis para outros usuários.
Para conteúdo compartilhado entre todos, use links publicados ou inclua os arquivos no repositório/servidor.


## V2.6 — Fundamentos de Engenharia

Foram adicionados dois módulos completos no Centro de Treinamento:

### Operações Unitárias
- transferência de calor;
- ebulição/vaporização;
- separação líquido-vapor;
- circulação água-vapor;
- fluidização/aeração;
- transporte de sólidos;
- contato gás-sólido;
- controle de inventário;
- recuperação de energia;
- dissipação de energia em válvulas/restrições.

### Mecânica dos Fluidos
- continuidade;
- Bernoulli;
- perdas de carga;
- Reynolds;
- escoamento bifásico;
- circulação natural/termossifão (condicional ao projeto);
- swell e shrink;
- separação de gotas/Souders-Brown;
- velocidade mínima de fluidização;
- Ergun e ΔP de leito;
- pressão hidrostática do catalisador aerado;
- escoamento compressível/choked flow;
- válvulas/Cv;
- cavitação/flashing;
- transitórios/golpe de aríete.

Cada tópico inclui onde ocorre, conceito, equações, consequência operacional, diagnóstico no CIC e limite de interpretação.
Também foram adicionadas 20 questões específicas de engenharia ao banco de treinamento.


## V2.7 — Interface simplificada

Removidos da interface:
- Localize na tela;
- Exportar;
- Importar;
- Tela cheia.

Demais módulos, conteúdo técnico, mídias, arquivos, quiz e layout do HMI foram preservados.
