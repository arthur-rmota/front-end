import { carregarTarefas } from "./api.js";
import { renderizarEstado } from "./estados.js";

async function iniciar() {
  renderizarEstado("carregando");

  try {
    const tarefas = await carregarTarefas();

    if (tarefas.length === 0) {
      renderizarEstado("vazio", tarefas);
      return;
    }

    renderizarEstado("sucesso", tarefas);
  } catch (erro) {
    if (erro.name === "TypeError") {
      renderizarEstado("erro", { tipo: "rede" });
      return;
    }

    if (erro.name === "SyntaxError") {
      renderizarEstado("erro", { tipo: "formato" });
      return;
    }

    if (erro.name === "HTTPError") {
      renderizarEstado("erro", {
        tipo: "protocolo",
        status: erro.status
      });
      return;
    }

    renderizarEstado("erro", { tipo: "formato" });
  }
}

iniciar();
