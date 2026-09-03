export async function carregarTarefas() {
  const resposta = await fetch("./dados.json");

  if (!resposta.ok) {
    const erro = new Error(`Falha HTTP: ${resposta.status}`);
    erro.name = "HTTPError";
    erro.status = resposta.status;
    throw erro;
  }

  const dados = await resposta.json();

  if (!dados || !Array.isArray(dados.tarefas)) {
    const erro = new Error("Formato de dados inválido: a chave tarefas deve conter um array.");
    erro.name = "FormatError";
    throw erro;
  }

  return dados.tarefas;
}
