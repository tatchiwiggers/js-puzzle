const hintButton = document.querySelector('#show-hint');
const hint = document.querySelector('.hint');

hintButton.addEventListener('click', () => {
  hint.classList.toggle('active');
});

// 1. Select all tiles
// 2. For each tile
// 3. Listen to the click event
// 4. If it has an empty neighbor
// 5. Swap the tile and the empty space
// 6. Check if player wins

// Queremos acionar o event listener com a ação click em cada peça do quebra-cabeça.
// Para fazer isso, precisamos iterar em nossos blocos e chamar addEventListener em 
// cada bloco.

// 1. Select all tiles
const tiles = document.querySelectorAll('tr td')
console.log(tiles);


// 2. for each tile
tiles.forEach((tile) => {
  // 3. listen to the click event
  tile.addEventListener('click', (event) => {
    // console.log('EVENT ->', event);
    const empty = document.querySelector('.empty');
    if (canMove(tile, empty)) {
      // 5. Swap the tile and the empty tile
      move(tile, empty);
      // 6. Check if player wins
      checkIfPlayerWins();
    }
  });
});

// Callback
// Selecionamos os elementos DOM, conectamos um event listener, agora que precisamos
// verificar se um bloco pode se mover, para então adicionar uma condição no retorno de chamada do evento.
// retorna um true ou false
const canMove = (tile) => {
  // cellIndex -> É uma propriedade que retorna a posição da célula da tabela.
  const tileColumn = tile.cellIndex;
  // rowIndex -> É uma propriedade que retorna a posição de uma linha em relação à <table> inteira.
  const tileRow = tile.parentElement.rowIndex;
  const emptyTile = document.querySelector('.empty');
  const emptyTileColumn = emptyTile.cellIndex;
  // parentElement -> retorna o elemento pai ou null se o nó não tiver pai ou se seu pai não for um elemento DOM.
  const emptyTileRow = emptyTile.parentElement.rowIndex;
  
  // aqui precisaremos fazer 4 validações:
  // 1. a coluna do numero que estou movendo é igual a coluna que contem o espaço em branco e msm coisa pra linha;
  // essa condição tem que ser verdadeira e as adições e subtrações verificam pra onde mover o tile
  return  (tileColumn === emptyTileColumn && tileRow === emptyTileRow + 1) || // mais desce
                          (tileColumn === emptyTileColumn && tileRow === emptyTileRow - 1) || // menos sobe
                          (tileRow === emptyTileRow && tileColumn === emptyTileColumn + 1) || // mais direita
                          (tileRow === emptyTileRow && tileColumn === emptyTileColumn - 1);   // menos esquerda
  
};


  // PSEUDOCODIGO PARA MOVER UM TILE
  // 1. selecionar um tile vazio
  // 2. Substituir seu conteudo com o conteudo do elemento
  // 2. Remover sua classe .empty
  // 4. Esvaziar o conteudo do nosso `elemento`
  // 5. Adicionar a classe .empty ao `elemento`
  
  const move = (cell, emptyCell) => {
    cell.classList.add('empty');
    emptyCell.classList.remove('empty');
    // Uma coisa importante: nossa movimentação do empty tile tem dois passos:
    // mover a classe .empty que dá a estilização do quadrado preto
    // mover o conteúdo textual.

    // aqui precisamos pegar o conteúdo textual do elemento cell e atribuir esse texto para o 
    // elemento emptyCell, ou seja, o conteúdo textual do emptyCell passa ser o mesmo do elemento cell;
    emptyCell.innerText = cell.innerText;
    // agora que ja movemos o conteúdo textual, precisamos limpar o conteúdo do cell,
    // para ficar de acordo com a moviementação do empty tile;
    cell.innerText = '';
  };

  // document.querySelectorAll('td') pega todos os elementos <td> do DOM e
  // retorna um NodeList, que nada mais é do que uma coleção das referências 
  // dos elementos que nos encontramos;

  // Array.from(document.querySelectorAll('td'))
  // aqui criamos uma instância do tipo Array pra nossso NodeList - o NodeList é uma 
  // coleção mas não necessariamente do tipo Array em questão de estruturas de dados

  // .map(element => ...)
  // 1. o .map() é uma função que nos permite iterar sobre um array;
  // 2. o .map() sempre retorna no final um array com exatamente a mesma 
  // quantidade de entradas que tinha antes, ou seja, nos temos um array de 5 
  // entradas, o .map() vai iterar sobre esse array, fazer alguma lógica de dados ali,
  // e retornar UM NOVO array de 5 entradas. É diferente do .forEach onde iteramos
  // sobre um array mas não retorna nada

  // const tilesOrder = Array.from(document.querySelectorAll('td')).map(element => ...)
  // essa nossa função do map está, para cada item da lista de elementos, transformando 
  // o conteúdo dentro do tag <td>{{seu número ta aqui}}</td> em tipo inteiro...
  // no final, nosso tilesOrder vai ser um array com a mesma quantidade de entradas
  // de elementos encontrados no nosso DOM, mas com dados do tipo inteiro. 
  // Mostrar os td do HTML de exemplo: [1, 9, 2, 10...]

  const checkIfPlayerWins = () => {
    const tilesOrder = Array.from(document.querySelectorAll('td')).map(element => Number.parseInt(element.innerHTML, 10));
      if (tilesOrder.join() === "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,NaN") {
        alert("You win! YAY!!!");
      }
  };