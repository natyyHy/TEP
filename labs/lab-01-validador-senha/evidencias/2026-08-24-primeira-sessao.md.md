# 2026-08-24 — implementação de `validar_senha`

- **Autoria:** Natiele
- **Ferramenta e modelo:** OpenCode / gpt-5.4-mini
- **Trilha:** local
- **Ambiente:** Windows (win32), Python 3.13.12, `uv`

## Ponto de partida

0 testes passavam antes da implementação, antes dava 53 failed.

## Resultado

| Métrica | Valor |
|---|---|
| Testes passando antes | 0 |
| Testes passando depois | 53 |
| Tempo total da sessão | não medi |
| Rodadas até passar | 1 |
| Correções manuais necessárias | nenhuma |

`uv run pytest labs/lab-01-validador-senha`

cachedir: .pytest_cache
rootdir: C:\Users\natie\git\tec1053
configfile: pyproject.toml
collected 53 items

labs/lab-01-validador-senha/tests/test_validador_senha.py::test_ca01_senha_valid
a PASSED [  1%]
labs/lab-01-validador-senha/tests/test_validador_senha.py::test_ca02_cada_requis
ito_isolado[RF-01-Ab1!def-sete caracteres, um a menos que o m\xednimo] PASSED [
 3%]
labs/lab-01-validador-senha/tests/test_validador_senha.py::test_ca05_nao_ascii_n
ao_conta[Abcdefg!hij\u0663-RF-05-\u0663 \xe9 d\xedgito Unicode, mas n\xe3o \xe9 0-9] PASSED [ 26%]
labs/lab-01-validador-senha/tests/test_validador_senha.py::test_ca05_nao_ascii_nao_conta[Abcdefg\u2163hij!-RF-05-\u2163 \xe9 numeral romano Unicode, n\xe3o \xe9
 d\xedgito ASCII] PASSED [ 28%]
labs/lab-01-validador-senha/tests/test_validador_senha.py::test_ca05_acentuada_n
ao_e_especial PASSED [ 30%]
labs/lab-01-validador-senha/tests/test_validador_senha.py::test_ca06_limites_inc
lusivos[Abcd1!gh-False-False] PASSED [ 32%]
labs/lab-01-validador-senha/tests/test_validador_senha.py::test_ca06_limites_inc
lusivos[Abcd1!g-True-False] PASSED [ 33%]
labs/lab-01-validador-senha/tests/test_validador_senha.py::test_ca06_limites_inc
lusivos[Abcd1!xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-False-False] PASSED [ 35%]
....
============================= 53 passed in 0.16s ==============================


## O que precisou de retrabalho

Nada após a primeira implementação; a validação passou nos testes do laboratório.

## O que eu entendi do código

A função valida a senha sem normalizar a entrada, acumula todos os códigos de erro em ordem fixa e retorna `ResultadoValidacao` com `valida` coerente com `erros`
