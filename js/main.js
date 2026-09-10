import { carregarTarefas } from "./api.js";
import { criarEstadoInicial, derivarTarefasVisiveis } from "./estadoApp.js";
import { renderizarEstado } from "./estados.js";
import { inicializarControles, inicializarInteracaoCartoes } from "./controles.js";

const estado = criarEstadoInicial();


function renderizar() {
  renderizarEstado(estado, derivarTarefasVisiveis);
}

async function iniciar() {
  inicializarControles(estado, renderizar);
  inicializarInteracaoCartoes(document.querySelector(".board-grid"));

 
  renderizar();

  try {
    
    const tarefas = await carregarTarefas();
    estado.tarefas = tarefas;
    estado.carregando = false;
    estado.erro = null;
  } catch (erro) {
    estado.carregando = false;

    if (erro.name === "TypeError") {
      estado.erro = { tipo: "rede" };
    } else if (erro.name === "HTTPError") {
      estado.erro = { tipo: "protocolo", status: erro.status };
    } else {
      
      estado.erro = { tipo: "formato" };
    }
  }

  renderizar();
}

iniciar();
