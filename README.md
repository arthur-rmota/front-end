# Quadro de Tarefas Acadêmicas

Gerenciador de tarefas acadêmicas em HTML, CSS e JavaScript puro (sem
frameworks, bundler ou build), organizado em quatro entregas incrementais
(E1 a E4).

## 🔗 Aplicação publicada

**URL:** _substitua este texto pelo link do seu GitHub Pages, por exemplo:_
`https://SEU-USUARIO.github.io/front-end/`

## Sobre esta entrega (E4)

Esta etapa liga de fato os controles construídos nas entregas anteriores a
um **estado único da aplicação**. A regra central: o estado é a fonte, a
tela é uma projeção dele.

- `js/api.js` — só busca e valida `dados.json` (`carregarTarefas()`); não
  lê controles nem toca no DOM.
- `js/estadoApp.js` — define o estado inicial (`criarEstadoInicial()`) e a
  função pura de derivação (`derivarTarefasVisiveis()`), que combina busca,
  filtros de status/prioridade e ordenação por prazo sem alterar o array
  original.
- `js/controles.js` — liga cada evento (busca, rádios de status/prioridade,
  ordenação, "Limpar filtros" e clique nos cartões) a uma alteração de
  estado seguida de uma chamada ao mesmo ponto de renderização.
- `js/estados.js` — ponto único de renderização: decide entre carregando,
  erro, origem vazia, resultado vazio ou lista de cartões, e atualiza a
  região `role="status"` com "N de M tarefas".
- `js/renderizacao.js` — desenha os cartões a partir do array já derivado
  (não filtra nem ordena).
- `js/main.js` — orquestra tudo: cria o estado, inicializa os controles e
  dispara o carregamento inicial.

## Como rodar localmente

Como os módulos usam `fetch` para `dados.json`, é preciso servir os
arquivos por HTTP (abrir `index.html` direto com `file://` não funciona).
Qualquer servidor estático serve, por exemplo:

```bash
npx serve .
# ou
python3 -m http.server 8000
```

Depois acesse o endereço indicado no terminal.

## Como publicar no GitHub Pages

1. Confirme que os arquivos (`index.html`, `styles.css`, `dados.json`,
   pasta `js/`) estão na raiz do repositório (ou na pasta que você vai
   apontar no passo 3) e faça commit/push para a branch padrão.
2. No GitHub, abra **Settings → Pages** do repositório.
3. Em **Build and deployment**, escolha **Deploy from a branch**, selecione
   a branch padrão (ex.: `main`) e a pasta `/ (root)`.
4. Salve e aguarde o GitHub gerar a URL pública (leva alguns minutos na
   primeira vez).
5. Copie a URL exibida e cole no topo deste README, no lugar do link de
   exemplo acima.
6. Abra a URL publicada em uma janela anônima/privada e confira, no
   DevTools:
   - **Network**: `dados.json`, `styles.css` e todos os arquivos de
     `js/` retornam status `200` (não `404`).
   - **Console**: nenhum erro ao carregar, buscar, filtrar, ordenar e
     limpar os filtros.

## Estrutura de arquivos

```
.
├── index.html
├── styles.css
├── dados.json
├── README.md
└── js/
    ├── api.js
    ├── estadoApp.js
    ├── controles.js
    ├── estados.js
    ├── renderizacao.js
    └── main.js
```
