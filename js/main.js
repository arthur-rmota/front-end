import { carregarTarefas } from "./api.js";
import { criarEstadoInicial, derivarTarefasVisiveis } from "./estadoApp.js";
import { renderizarEstado } from "./estados.js";
import { inicializarControles, inicializarInteracaoCartoes } from "./controles.js";

// Estado único da aplicação. Toda a tela é uma projeção deste objeto.
const estado = criarEstadoInicial();

// Ponto único de renderização: qualquer alteração de estado termina
// chamando esta mesma função, que deriva a lista visível e desenha tudo
// de novo (cartões, contagem e mensagens) a partir dela.
function renderizar() {
  renderizarEstado(estado, derivarTarefasVisiveis);
}

async function iniciar() {
  inicializarControles(estado, renderizar);
  inicializarInteracaoCartoes(document.querySelector(".board-grid"));

  // estado.carregando começa true em criarEstadoInicial(), então esta
  // primeira renderização já mostra a mensagem de carregamento.
  renderizar();

  try {
    // carregarTarefas() só busca e valida os dados; quem decide o que
    // fazer com o resultado é este módulo, via alterações de estado.
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
      // Cobre tanto SyntaxError (JSON inválido) quanto o FormatError
      // lançado por carregarTarefas() quando a chave "tarefas" não é array.
      estado.erro = { tipo: "formato" };
    }
  }

  renderizar();
}

iniciar();
