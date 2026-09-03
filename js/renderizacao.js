const STATUS = [
  { chave: "a-fazer", classe: "status-todo", titulo: "A fazer", id: "titulo-a-fazer" },
  { chave: "em-andamento", classe: "status-progress", titulo: "Em andamento", id: "titulo-em-andamento" },
  { chave: "em-revisao", classe: "status-review", titulo: "Em revisão", id: "titulo-em-revisao" },
  { chave: "concluida", classe: "status-done", titulo: "Concluída", id: "titulo-concluida" }
];

function classePrioridade(prioridade) {
  return `priority-${prioridade}`;
}

function criarCartao(tarefa) {
  const item = document.createElement("li");
  item.className = "task-item";

  const artigo = document.createElement("article");
  artigo.className = "task-card";

  const titulo = document.createElement("h4");
  titulo.className = "task-title";
  titulo.textContent = tarefa.titulo;

  const projeto = document.createElement("p");
  projeto.textContent = `Projeto: ${tarefa.projeto}`;

  const responsavel = document.createElement("p");
  responsavel.textContent = `Responsável: ${tarefa.responsavel}`;

  const prazo = document.createElement("p");
  prazo.className = "task-deadline";
  prazo.textContent = `Prazo: ${tarefa.prazo}`;

  const prioridade = document.createElement("p");
  prioridade.className = `task-priority ${classePrioridade(tarefa.prioridade)}`;
  prioridade.textContent = `Prioridade: ${tarefa.prioridade}`;

  artigo.append(titulo, projeto, responsavel, prazo, prioridade);
  item.append(artigo);

  return item;
}

export function renderizarTarefas(tarefas) {
  const quadro = document.querySelector(".board-grid");
  quadro.textContent = "";

  STATUS.forEach((status) => {
    const coluna = document.createElement("section");
    coluna.className = `board-column ${status.classe}`;
    coluna.setAttribute("aria-labelledby", status.id);

    const titulo = document.createElement("h3");
    titulo.id = status.id;
    titulo.textContent = status.titulo;

    const lista = document.createElement("ul");
    lista.className = "task-list";

    tarefas
      .filter((tarefa) => tarefa.status === status.chave)
      .forEach((tarefa) => lista.append(criarCartao(tarefa)));

    coluna.append(titulo, lista);
    quadro.append(coluna);
  });
}
