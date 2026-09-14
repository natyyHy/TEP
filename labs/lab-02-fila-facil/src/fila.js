/* Lab 02: implemente os três corpos marcados. Contrato em ESPECIFICACAO.md. */
(() => {
  "use strict";

  function criarEstado() {
    return { proximaSenha: 1, aguardando: [], atual: null, totalChamadas: 0 };
  }

  function formatarSenha(numero) {
    return numero === null ? "—" : `N${String(numero).padStart(3, "0")}`;
  }

  function emitirSenha(estado) {
    const senha = estado.proximaSenha;
    estado.aguardando.push(senha);
    estado.proximaSenha++;
    return senha;
  }

  function chamarProxima(estado) {
    if (estado.aguardando.length === 0) return null;
    estado.atual = estado.aguardando.shift();
    estado.totalChamadas++;
    return estado.atual;
  }

  function reiniciarFila(estado) {
    estado.proximaSenha = 1;
    estado.aguardando = [];
    estado.atual = null;
    estado.totalChamadas = 0;
  }

  globalThis.FilaFacil = Object.freeze({
    criarEstado, formatarSenha, emitirSenha, chamarProxima, reiniciarFila,
  });
})();
