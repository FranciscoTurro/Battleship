const gameBoard = () => {
  let board = [];

  const initBoard = () => {
    for (let i = 0; i < 10; i++) {
      board[i] = [];
      for (let j = 0; j < 10; j++) {
        board[i].push(false);
      }
    }
  };

  const placeShip = (xCoord, yCoord, ship, orientation) => {
    if (board[xCoord][yCoord]) return;

    let pos = 0;

    if (orientation === 'h') {
      if (ship.length + xCoord > 10) return;
      for (let i = xCoord; i < xCoord + ship.length; i++) {
        board[i][yCoord] = { ship, pos };
        reserveAround(xCoord, yCoord + pos);
        pos++;
      }
    }
    if (orientation === 'v') {
      if (ship.length + yCoord > 10) return;
      for (let i = yCoord; i < yCoord + ship.length; i++) {
        board[xCoord][i] = { ship, pos };
        reserveAround(xCoord + pos, yCoord);
        pos++;
      }
    }
  };

  const reserveAround = (xCoord, yCoord) => {
    const cell = (n1, n2) => {
      if (xCoord + n1 > 9 || xCoord + n1 < 0) return;
      if (board[xCoord + n1][yCoord + n2] === false)
        board[xCoord + n1][yCoord + n2] = 'reserved';
    };
    const reserveCell = (row) => {
      cell(row, -1);
      cell(row, 0);
      cell(row, 1);
    };
    reserveCell(-1);
    reserveCell(0);
    reserveCell(1);
  };

  return { board, initBoard, placeShip };
};

export default gameBoard;
