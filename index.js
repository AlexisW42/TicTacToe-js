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
          let j = e.target.cellIndex;
          if (gameBoard.addMark(i, j, gameTurn)) changeTurn();
          checkGameboard();
        });
      }
    }
  }

  const checkGameboard = () => {
    if (gameBoard.checkWin() !== '')
      console.log(`${gameBoard.checkWin()} wins`);
  }

  const changeTurn = () => {
    gameTurn = !gameTurn;
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

  const checkWin = () => {
    if (checkRows() !== '')
      return checkRows();
    else if (checkColumns() !== '') {
      return checkColumns();
    }
    else if (checkDiagonals() !== '') {
      return checkDiagonals();
    }
    return '';
  }

  const checkRows = () => {
    let same = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if ((gameBoard.gridBoard[i][0] === gameBoard.gridBoard[i][j]) && (gameBoard.gridBoard[i][0] !== '')) {
          same++;
          if (same === 3) return gameBoard.gridBoard[i][j];
        }
      }
      same = 0;
    }
    return ''
  }

  const checkColumns = () => {
    let same = 0;
    for (let j = 0; j < 3; j++) {
      for (let i = 0; i < 3; i++) {
        if ((gameBoard.gridBoard[0][j] === gameBoard.gridBoard[i][j]) && (gameBoard.gridBoard[0][j] !== '')) {
          same++;
          if (same === 3) return gameBoard.gridBoard[i][j];
        }
      }
      same = 0;
    }
    return '';
  }

  const checkDiagonals = () => {
    let same = 0;
    for (let i = 0; i < 3; i++) {
      if ((gameBoard.gridBoard[0][0] === gameBoard.gridBoard[i][i]) && (gameBoard.gridBoard[0][0] !== '')) {
        same++;
        if (same === 3) return gameBoard.gridBoard[i][i];
      }
    }
    same = 0;

    let i = 0, j = 2;
    while (i < 3) {
      if ((gameBoard.gridBoard[0][2] === gameBoard.gridBoard[i][j]) && (gameBoard.gridBoard[0][2] !== '')) {
        same++;
        if (same === 3) return gameBoard.gridBoard[i][j];
      }
      i++; j--;
    }
    return '';
  }
  return { gridBoard, addMark, checkWin };
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