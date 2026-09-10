
export function inicializarControles(estado, aoAtualizar) {
  const formulario = document.querySelector(".filter-form");
  const campoBusca = document.querySelector("#busca");
  const campoOrdenacao = document.querySelector("#ordenacao");

  campoBusca.addEventListener("input", (evento) => {
    estado.busca = evento.target.value;
    aoAtualizar();
  });

  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
  });

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


  formulario.addEventListener("reset", () => {
    estado.busca = "";
    estado.status = "todos";
    estado.prioridade = "todas";
    estado.ordenacao = "nenhuma";
    aoAtualizar();
  });
}


export function inicializarInteracaoCartoes(quadro) {
  quadro.addEventListener("click", (evento) => {
    const cartao = evento.target.closest(".task-card");

    if (!cartao) {
      return;
    }

    cartao.classList.toggle("task-card--selecionado");
  });
}
