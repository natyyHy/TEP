# 01 — implementar `validar_senha`

- **Data:** 2026-08-24
- **Autoria:** OpenCode
- **Ferramenta:** OpenCode
- **Modelo:** gpt-5.4-mini
- **Trilha:** local
- **Requisito ou critério alvo:** CA-01 a CA-10

## O que foi pedido

Leia labs/lab-01-validador-senha/ESPECIFICACAO.md e implemente a função validar_senha em labs/lab-01-validador-senha/src/validador_senha/validador.py.
Não altere os testes nem o contrato ResultadoValidacao.
Rode os testes com: uv run pytest labs/lab-01-validador-senha

## Contexto fornecido

Arquivos abertos: `AGENTS.md` da raiz, `AGENTS.md` do laboratório, `ESPECIFICACAO.md` e `src/validador_senha/validador.py`.

## O que veio

Foi indicada uma implementação direta da função com validação de tamanho, ASCII estrito para letras e dígitos, uso de `isspace()` para branco e comparação da lista proibida por igualdade total ignorando caixa.

## O que eu fiz com isso

Aceitei como veio e apliquei no arquivo do laboratório.
