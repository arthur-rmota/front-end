// Cada ouvinte aqui faz a mesma coisa: altera uma propriedade do estado e
// chama aoAtualizar(), que sempre aciona o mesmo ponto de renderização em
// main.js. Nenhum ouvinte manipula cartões diretamente.

export function inicializarControles(estado, aoAtualizar) {
  const formulario = document.querySelector(".filter-form");
  const campoBusca = document.querySelector("#busca");
  const campoOrdenacao = document.querySelector("#ordenacao");

  campoBusca.addEventListener("input", (evento) => {
    estado.busca = evento.target.value;
    aoAtualizar();
  });

  // O botão "Buscar" é só um reforço visual/de toque: a busca já reage a
  // cada tecla via "input". Aqui só evitamos o recarregamento de página.
  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
  });

  // Delegação: um único ouvinte no formulário cobre todos os rádios de
  // status e de prioridade, em vez de um ouvinte por input.
  formulario.addEventListener("change", (evento) => {
    const alvo = evento.target;

    if (alvo.name === "status") {
      estado.status = alvo.value;
      aoAtualizar();
      return;
    }

    if (alvo.name === "prioridade") {
      estado.prioridade = alvo.value;
      aoAtualizar();
    }
  });

  if (campoOrdenacao) {
    campoOrdenacao.addEventListener("change", (evento) => {
      estado.ordenacao = evento.target.value;
      aoAtualizar();
    });
  }

  // O evento "reset" dispara ANTES do navegador limpar visualmente os
  // campos (a limpeza automática dos controles só acontece depois que este
  // ouvinte termina, a menos que preventDefault seja chamado). Por isso
  // basta devolver o estado aos valores iniciais aqui: os controles do HTML
  // (rádios marcados com "checked" e a opção "selected" do select) já foram
  // definidos para os mesmos valores, então o reset nativo os mantém em
  // sincronia com o estado sem nenhum código extra.
  formulario.addEventListener("reset", () => {
    estado.busca = "";
    estado.status = "todos";
    estado.prioridade = "todas";
    estado.ordenacao = "nenhuma";
    aoAtualizar();
  });
}

// Um único ouvinte, preso ao contêiner do quadro (que nunca é substituído,
// só o seu conteúdo), continua funcionando depois de qualquer nova
// renderização dos cartões. Não percorre a lista de cartões um a um.
export function inicializarInteracaoCartoes(quadro) {
  quadro.addEventListener("click", (evento) => {
    const cartao = evento.target.closest(".task-card");

    if (!cartao) {
      return;
    }

    cartao.classList.toggle("task-card--selecionado");
  });
}
