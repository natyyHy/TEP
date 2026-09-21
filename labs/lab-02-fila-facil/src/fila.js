/* Lab 02: implemente os três corpos marcados. Contrato em ESPECIFICACAO.md. */
(() => {
  "use strict";

  function criarEstado() {
    const estado = {
      proximaSenha: 1,
      aguardando: [],
      atual: null,
      totalChamadas: 0,
    };
    Object.defineProperties(estado, {
      proximaSenhaPrioritaria: { value: 1, writable: true, configurable: true },
      prioritarias: { value: [], writable: true, configurable: true },
      prioritariasConsecutivas: { value: 0, writable: true, configurable: true },
      senhaTipo: { value: {}, writable: true, configurable: true },
      ultimaCategoria: { value: null, writable: true, configurable: true },
    });
    return estado;
  }

  function formatarSenha(numero, prefixo = "N") {
    return numero === null ? "—" : `${prefixo}${String(numero).padStart(3, "0")}`;
  }

  function emitirSenha(estado, categoria = "comum") {
    let senha;
    if (categoria === "prioritaria") {
      senha = estado.proximaSenhaPrioritaria;
      estado.prioritarias.push(senha);
      estado.proximaSenhaPrioritaria++;
    } else {
      senha = estado.proximaSenha;
      estado.aguardando.push(senha);
      estado.proximaSenha++;
    }
    estado.senhaTipo[`${categoria[0]}:${senha}`] = categoria;
    return senha;
  }

  function chamarProxima(estado) {
    const temComum = estado.aguardando.length > 0;
    const temPrioritaria = estado.prioritarias.length > 0;

    if (!temComum && !temPrioritaria) return null;

    let senha;
    let categoriaAtendida;

    if (temPrioritaria && temComum) {
      if (estado.prioritariasConsecutivas >= 2) {
        senha = estado.aguardando.shift();
        categoriaAtendida = "comum";
        estado.prioritariasConsecutivas = 0;
      } else {
        senha = estado.prioritarias.shift();
        categoriaAtendida = "prioritaria";
        estado.prioritariasConsecutivas++;
      }
    } else if (temPrioritaria) {
      senha = estado.prioritarias.shift();
      categoriaAtendida = "prioritaria";
      estado.prioritariasConsecutivas++;
    } else {
      senha = estado.aguardando.shift();
      categoriaAtendida = "comum";
      estado.prioritariasConsecutivas = 0;
    }

    estado.atual = senha;
    estado.ultimaCategoria = categoriaAtendida;
    estado.totalChamadas++;
    return estado.atual;
  }

  function reiniciarFila(estado) {
    estado.proximaSenha = 1;
    estado.proximaSenhaPrioritaria = 1;
    estado.aguardando = [];
    estado.prioritarias = [];
    estado.atual = null;
    estado.totalChamadas = 0;
    estado.prioritariasConsecutivas = 0;
    estado.senhaTipo = {};
    estado.ultimaCategoria = null;
  }

  globalThis.FilaFacil = Object.freeze({
    criarEstado, formatarSenha, emitirSenha, chamarProxima, reiniciarFila,
  });
})();
