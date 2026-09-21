/* Interface fornecida: a tarefa do fluxo básico está em fila.js. */
(() => {
  "use strict";
  const fila = globalThis.FilaFacil;
  const estado = fila.criarEstado();
  const obter = (id) => document.getElementById(id);
  const dialogo = obter("confirmacao");

  function informar(texto) { obter("mensagem").textContent = texto; }
  function tipoDe(numero) {
    return estado.senhaTipo[`c:${numero}`] ?? estado.senhaTipo[`p:${numero}`] ?? "comum";
  }

  function renderizar() {
    const totalEspera = estado.aguardando.length + estado.prioritarias.length;
    const tipoAtual = estado.atual !== null
      ? estado.ultimaCategoria ?? tipoDe(estado.atual)
      : null;
    const preAtual = tipoAtual === "prioritaria" ? "P" : "N";
    obter("senha-atual").textContent = fila.formatarSenha(estado.atual, preAtual);
    obter("legenda-atual").textContent = estado.atual === null
      ? "Aguardando a primeira chamada" : "Por favor, dirija-se ao guichê 01";
    obter("quantidade").textContent = totalEspera;
    obter("contador-prioritarias").textContent =
      `${estado.prioritarias.length} prioritárias`;
    obter("contador-comuns").textContent =
      `${estado.aguardando.length} comuns`;
    obter("total-chamadas").textContent = estado.totalChamadas;
    obter("fila-vazia").hidden = totalEspera > 0;
    const todas = [
      ...estado.prioritarias.map((n) => ({ n, pri: true })),
      ...estado.aguardando.map((n) => ({ n, pri: false })),
    ];
    obter("lista-espera").replaceChildren(...todas.map(({ n, pri }) => {
      const item = document.createElement("li");
      item.textContent = fila.formatarSenha(n, pri ? "P" : "N");
      if (pri) item.classList.add("prioritaria");
      return item;
    }));
  }

  function executar(acao) {
    try { acao(); renderizar(); }
    catch (erro) {
      if (erro instanceof Error && erro.message.startsWith("LAB02_PENDENTE:")) {
        informar("Esta ação ainda precisa ser implementada no laboratório.");
        return;
      }
      informar("Ocorreu um erro. Confira o console do navegador.");
      throw erro;
    }
  }

  obter("emitir").addEventListener("click", () => executar(() => {
    const numero = fila.emitirSenha(estado);
    obter("ultima-emitida").textContent = fila.formatarSenha(numero);
    obter("comprovante").hidden = false;
    informar(`Senha ${fila.formatarSenha(numero)} emitida. Aguarde a chamada.`);
  }));
  obter("btn-emitir-prioritaria").addEventListener("click", () => executar(() => {
    const numero = fila.emitirSenha(estado, "prioritaria");
    obter("ultima-emitida").textContent = fila.formatarSenha(numero, "P");
    obter("comprovante").hidden = false;
    informar(`Senha prioritária ${fila.formatarSenha(numero, "P")} emitida. Aguarde a chamada.`);
  }));
  obter("chamar").addEventListener("click", () => executar(() => {
    const numero = fila.chamarProxima(estado);
    if (numero === null) {
      informar("Não há senhas aguardando.");
    } else {
      const pre = estado.ultimaCategoria === "prioritaria" ? "P" : "N";
      informar(`Chamando ${fila.formatarSenha(numero, pre)}. Guichê 01.`);
    }
  }));
  obter("reiniciar").addEventListener("click", () => {
    dialogo.returnValue = "";
    dialogo.showModal();
  });
  dialogo.addEventListener("close", () => {
    if (dialogo.returnValue !== "confirmar") return;
    executar(() => {
      fila.reiniciarFila(estado);
      obter("comprovante").hidden = true;
      obter("ultima-emitida").textContent = "";
      informar("Demonstração reiniciada. A próxima senha será N001.");
    });
  });
  renderizar();
})();
