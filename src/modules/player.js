import gameBoard from './gameBoard';

const player = (n) => {
  const name = n;
  let board = gameBoard();
  let turn = false;

  const setTurn = (enemy) => {
    turn = true;
    enemy.turn = false;
  };
  return { name, board, turn, setTurn };
};

export default player;
