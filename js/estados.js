import { renderizarTarefas } from "./renderizacao.js";

const quadro = document.querySelector(".board-grid");
const mensagemEstado = document.querySelector("#mensagem-estado");
const regiaoStatus = document.querySelector("#status-regiao");

function anunciar(texto) {

  regiaoStatus.textContent = texto;
  mensagemEstado.textContent = texto;
}

function mostrarMensagem(titulo, texto, classe) {
  quadro.textContent = "";

  const painel = document.createElement("div");
  painel.className = `estado-painel ${classe}`;

  const heading = document.createElement("h3");
  heading.textContent = titulo;

  const descricao = document.createElement("p");
  descricao.textContent = texto;

  painel.append(heading, descricao);
  quadro.append(painel);
}

export function renderizarEstado(estado, derivarTarefasVisiveis) {
  if (estado.carregando) {
    mostrarMensagem(
      "Carregando tarefas",
      "Aguarde enquanto as tarefas são carregadas.",
      "estado-carregando"
    );
    anunciar("Carregando tarefas.");
    return;
  }

  if (estado.erro) {
    const tipo = estado.erro.tipo || "desconhecido";
    const mensagens = {
      rede: "Não foi possível carregar as tarefas porque a rede não está disponível.",
      protocolo: `O servidor não conseguiu fornecer as tarefas (HTTP ${estado.erro.status}).`,
      formato: "Os dados recebidos não estão em um formato válido."
    };
    const texto = mensagens[tipo] || "Ocorreu um erro ao carregar as tarefas.";

    mostrarMensagem("Não foi possível carregar as tarefas", texto, "estado-erro");
    anunciar(`Erro ao carregar as tarefas. ${texto}`);
    return;
  }

  
  if (estado.tarefas.length === 0) {
    mostrarMensagem(
      "Nenhuma tarefa encontrada",
      "Não há tarefas cadastradas no momento.",
      "estado-vazio"
    );
    anunciar("Não há tarefas para exibir.");
    return;
  }

  const visiveis = derivarTarefasVisiveis(estado);
  const total = estado.tarefas.length;


  if (visiveis.length === 0) {
    mostrarMensagem(
      "Nenhum resultado para os critérios",
      "Nenhuma tarefa corresponde à busca e aos filtros atuais. Ajuste ou limpe os critérios.",
      "estado-sem-resultados"
    );
    anunciar(`0 de ${total} tarefas.`);
    return;
  }

  renderizarTarefas(visiveis);
  anunciar(`${visiveis.length} de ${total} tarefas.`);
}
