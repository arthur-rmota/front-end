// Este módulo concentra a fonte única de verdade da aplicação.
// Nenhuma outra parte do código deve guardar uma segunda lista filtrada:
// tudo que a tela mostra é recalculado a partir deste objeto a cada ciclo.

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

// dados.json guarda o prazo como string "DD/MM/AAAA"; convertemos para um
// número comparável apenas no momento de ordenar, sem alterar a tarefa.
function paraTimestamp(prazo) {
  const [dia, mes, ano] = prazo.split("/").map(Number);
  return new Date(ano, mes - 1, dia).getTime();
}

// Recebe o estado inteiro e devolve a lista visível, combinando busca,
// filtros e ordenação. Não lê o DOM e não altera nem o estado nem
// estado.tarefas: sempre trabalha sobre arrays novos.
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

  // .sort() é chamado sobre uma cópia (spread), nunca sobre estado.tarefas
  // nem sobre o array recebido por referência de fora desta função.
  return [...filtradas].sort((a, b) => fator * (paraTimestamp(a.prazo) - paraTimestamp(b.prazo)));
}
