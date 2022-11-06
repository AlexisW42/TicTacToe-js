const gameBoard = (() => {
  const gridBoard = [
    ['', 'x', 'o'],
    ['o', 'x', 'o'],
    ['x', 'o', 'x']
  ];
  const addMark = (i, j, piece) => {
    if(gridBoard[i][j] === '') {
      gridBoard[i][j] = piece;
      displayController.updateCell(i, j, piece)
    }
  }

  return { gridBoard, addMark };
})();

const player = (name, piece) => {
  const getPiece = () => piece;
  const getName = () => name;

  return { getPiece, getName };
};

const displayController = (() => {
  const printGameBoard = () => {
    const table = document.querySelector('table');
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        table.rows[i].cells[j].innerHTML = gameBoard.gridBoard[i][j];
      }
    }
  }
  
  const updateCell = (i, j, piece) => {
    const table = document.querySelector('table');
     table.rows[i].cells[j].innerHTML = piece;
  }
  return {printGameBoard, updateCell}
})();

displayController.printGameBoard();