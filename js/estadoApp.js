

export function criarEstadoInicial() {
  return {
    tarefas: [],       // array bruto, exatamente como veio de carregarTarefas()
    busca: "",
    status: "todos",
    prioridade: "todas",
    ordenacao: "nenhuma", // "nenhuma" | "prazo-asc" | "prazo-desc"
    carregando: true,
    erro: null
  };
}

function normalizarTexto(texto) {
  return texto.trim().toLowerCase();
}


function paraTimestamp(prazo) {
  const [dia, mes, ano] = prazo.split("/").map(Number);
  return new Date(ano, mes - 1, dia).getTime();
}


export function derivarTarefasVisiveis(estado) {
  const termoBusca = normalizarTexto(estado.busca);

  const filtradas = estado.tarefas.filter((tarefa) => {
    const combinaBusca = termoBusca === "" || normalizarTexto(tarefa.titulo).includes(termoBusca);
    const combinaStatus = estado.status === "todos" || tarefa.status === estado.status;
    const combinaPrioridade = estado.prioridade === "todas" || tarefa.prioridade === estado.prioridade;

    return combinaBusca && combinaStatus && combinaPrioridade;
  });

  if (estado.ordenacao === "nenhuma") {
    return filtradas;
  }

  const fator = estado.ordenacao === "prazo-asc" ? 1 : -1;


  return [...filtradas].sort((a, b) => fator * (paraTimestamp(a.prazo) - paraTimestamp(b.prazo)));
}
