const gameBoard = () => {
  let board = [];
  let missedShots = [];
  let placedShips = [];
  let hitShots = [];

  const initBoard = (() => {
    for (let i = 0; i < 10; i++) {
      board[i] = [];
      for (let j = 0; j < 10; j++) {
        board[i].push(false);
      }
    }
  })();

  const placeShip = (xCoord, yCoord, ship, orientation) => {
    if (board[xCoord][yCoord]) return;

    let pos = 0;

    if (orientation === 'h') {
      if (ship.length + yCoord > 10) return false;

      for (let i = 0; i < ship.length; i++) {
        if (board[xCoord][yCoord + i] === 'reserved') return false;
      }

      placedShips.push([xCoord, yCoord]);
      for (let i = yCoord; i < yCoord + ship.length; i++) {
        board[xCoord][i] = { ship, pos };
        reserveAround(xCoord, yCoord + pos);
        pos++;
      }
      return true;
    }
    if (orientation === 'v') {
      if (ship.length + xCoord > 10) return false;

      for (let i = 0; i < ship.length; i++) {
        if (board[xCoord + i][yCoord] === 'reserved') return false;
      }

      placedShips.push([xCoord, yCoord]);
      for (let i = xCoord; i < xCoord + ship.length; i++) {
        board[i][yCoord] = { ship, pos };
        reserveAround(xCoord + pos, yCoord);
        pos++;
      }
      return true;
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

  const receiveAttack = (xCoord, yCoord) => {
    if (board[xCoord][yCoord] === 'reserved') return 'nothing';
    if (board[xCoord][yCoord] && board[xCoord][yCoord] !== 'missed') {
      board[xCoord][yCoord].ship.hit(board[xCoord][yCoord].pos);
      hitShots.push([xCoord, yCoord]);
      return 'hit';
    } else {
      missedShots.push([xCoord, yCoord]);
      board[xCoord][yCoord] = 'missed';
      return 'miss';
    }
  };

  const allShipsSunk = () => {
    let allSunk = true;
    placedShips.forEach((element) => {
      if (!board[element[0]][element[1]].ship.isSunk()) allSunk = false;
    });
    return allSunk;
  };

  return {
    board,
    placeShip,
    missedShots,
    receiveAttack,
    placedShips,
    allShipsSunk,
    hitShots,
  };
};

export default gameBoard;
