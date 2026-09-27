# CONFIGURAÇÃO DO CONCEPT TEMPLATE

Edite primeiro os arquivos desta pasta. A proposta é NÃO alterar `app.js` e `app.css`
para criar uma nova aplicação.

## app.json
Nome do app, títulos, descrição, imagem principal, versão e chaves de armazenamento.

## hotspots.json
Cada lâmpada:
```json
{
  "key": "equip1",
  "category": "equip",
  "label": "Equipamento A",
  "left": 32.0,
  "top": 48.0
}
```
`left` e `top` são percentuais relativos à imagem.

## equipment.json
Conteúdo de cada hotspot. A chave deve ser igual ao campo `key` do hotspot.

## quiz.json
Banco de questões. `c` é o índice da alternativa correta começando em zero.

## scenarios.json
Cenários operacionais.

## interlocks.json
Matriz causa × efeito reutilizada pelos modos:
- Causa → Efeito
- Efeito → Causa
- Montar lógica
- Completar matriz
- Prova

## engineering.json
Conteúdo de Operações Unitárias e Mecânica dos Fluidos.
