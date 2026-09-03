import { renderizarTarefas } from "./renderizacao.js";

const quadro = document.querySelector(".board-grid");
const mensagemEstado = document.querySelector("#mensagem-estado");
const regiaoStatus = document.querySelector("#status-regiao");

function anunciar(texto) {
  regiaoStatus.textContent = texto;
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
  mensagemEstado.textContent = "";
}

export function renderizarEstado(estado, dados) {
  if (estado === "carregando") {
    mostrarMensagem("Carregando tarefas", "Aguarde enquanto as tarefas são carregadas.", "estado-carregando");
    anunciar("Carregando tarefas.");
    return;
  }

  if (estado === "sucesso") {
    renderizarTarefas(dados);
    const total = dados.length;
    mensagemEstado.textContent = `${total} ${total === 1 ? "tarefa carregada" : "tarefas carregadas"}.`;
    anunciar(`${total} ${total === 1 ? "tarefa carregada" : "tarefas carregadas"}.`);
    return;
  }

  if (estado === "vazio") {
    mostrarMensagem("Nenhuma tarefa encontrada", "Não há tarefas para exibir no momento.", "estado-vazio");
    anunciar("Não há tarefas para exibir.");
    return;
  }

  if (estado === "erro") {
    const tipo = dados?.tipo || "desconhecido";
    const mensagens = {
      rede: "Não foi possível carregar as tarefas porque a rede não está disponível.",
      protocolo: `O servidor não conseguiu fornecer as tarefas (HTTP ${dados.status}).`,
      formato: "Os dados recebidos não estão em um formato válido."
    };
    const texto = mensagens[tipo] || "Ocorreu um erro ao carregar as tarefas.";
    mostrarMensagem("Não foi possível carregar as tarefas", texto, "estado-erro");
    anunciar(`Erro ao carregar as tarefas. ${texto}`);
  }
}
