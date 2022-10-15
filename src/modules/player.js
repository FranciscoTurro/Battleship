import gameBoard from './gameBoard.js';

const player = (n) => {
  const name = n;
  let board = gameBoard();
  let turn = false;

  const setTurn = (enemy) => {
    obj.turn = true;
    enemy.turn = false;
  };
  const obj = {
    name,
    board,
    turn,
    setTurn,
  };
  return obj;
};

export default player;
