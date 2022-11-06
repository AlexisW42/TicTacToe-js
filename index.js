const gameFlow = (() => {

  let gameTurn = false;

  const initGame = () => {
    displayController.printGameBoard();
    addEventsClick();
  }

  const addEventsClick = () => {
    const table = document.querySelector('table');
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        table.rows[i].cells[j].addEventListener('click', (e) => {
          let i = e.target.parentElement.rowIndex;
          let j = e.target.cellIndex
          gameBoard.addMark(i, j, gameTurn) ? gameTurn = !gameTurn : gameTurn = gameTurn;
        });
      }
    }
  }

  return {
    initGame
  };
})();

const gameBoard = (() => {
  const gridBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  const addMark = (i, j, piece) => {
    if (gridBoard[i][j] === '') {
      let mark
      piece ? mark = 'o' : mark = 'x';
      gridBoard[i][j] = mark;
      displayController.updateCell(i, j, mark);
      return true;
    }
    return false;
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
  return { printGameBoard, updateCell }
})();

gameFlow.initGame();