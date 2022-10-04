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
    if (orientation === 'h') {
      for (let i = xCoord; i < xCoord + ship.length; i++) {
        board[i][yCoord] = ship;
      }
    }
    if (orientation === 'v') {
      for (let i = yCoord; i < yCoord + ship.length; i++) {
        board[xCoord][i] = ship;
      }
    }
  };

  return { board, initBoard, placeShip };
};

export default gameBoard;
