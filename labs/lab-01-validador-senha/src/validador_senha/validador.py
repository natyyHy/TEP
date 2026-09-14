"""Implementação do validador de senha.

O contrato (`ResultadoValidacao`) já está definido e não deve ser alterado — os testes
dependem dele. O que falta é `validar_senha`.

Antes de escrever qualquer linha, leia `ESPECIFICACAO.md`. A seção 4 define maiúscula,
minúscula, dígito, caractere especial e espaço em branco de um jeito que não coincide
com o comportamento padrão dos métodos de `str` do Python. Isso é proposital.
"""

from dataclasses import dataclass
import string


@dataclass(frozen=True)
class ResultadoValidacao:
    """Resultado da validação de uma senha.

    Attributes:
        valida: ``True`` se e somente se ``erros`` estiver vazio.
        erros: códigos dos requisitos violados (``"RF-01"``, ``"RF-02"``, ...),
            em ordem crescente e sem repetição.
    """

    valida: bool
    erros: tuple[str, ...]


def validar_senha(senha: str) -> ResultadoValidacao:
    """Valida uma senha contra a política definida em ``ESPECIFICACAO.md``.

    Args:
        senha: a senha a validar, avaliada exatamente como recebida.

    Returns:
        O resultado da validação, com todos os requisitos violados.

    Raises:
        TypeError: se ``senha`` não for uma ``str``.
    """
    if not isinstance(senha, str):
        raise TypeError("senha deve ser uma string")

    erros: list[str] = []

    if len(senha) < 8:
        erros.append("RF-01")
    if len(senha) > 64:
        erros.append("RF-02")

    tem_maiuscula = any("A" <= caractere <= "Z" for caractere in senha)
    tem_minuscula = any("a" <= caractere <= "z" for caractere in senha)
    tem_digito = any("0" <= caractere <= "9" for caractere in senha)
    tem_especial = any(caractere in string.punctuation for caractere in senha)
    tem_espaco = any(caractere.isspace() for caractere in senha)

    if not tem_maiuscula:
        erros.append("RF-03")
    if not tem_minuscula:
        erros.append("RF-04")
    if not tem_digito:
        erros.append("RF-05")
    if not tem_especial:
        erros.append("RF-06")
    if tem_espaco:
        erros.append("RF-07")

    proibidas = {"123456", "password", "qwerty", "senha123", "admin"}
    if senha.lower() in proibidas:
        erros.append("RF-08")

    return ResultadoValidacao(valida=not erros, erros=tuple(erros))
