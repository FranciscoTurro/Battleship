import gameBoard from '../src/modules/gameBoard';
import ship from '../src/modules/ship';

test('Creates a 10x10 board', () => {
  let gameboard = gameBoard();
  gameboard.initBoard();
  expect(gameboard.board.length && gameboard.board[4].length).toBe(10);
});

test('Can place ships at specific coordinates horizontally', () => {
  let gameboard = gameBoard();
  gameboard.initBoard();
  gameboard.placeShip(2, 1, ship(3), 'h');
  expect(
    gameboard.board[2][1] && gameboard.board[3][1] && gameboard.board[4][1]
  ).toBeTruthy();
});

test('Can place ships at specific coordinates horizontally', () => {
  let gameboard = gameBoard();
  gameboard.initBoard();
  gameboard.placeShip(2, 1, ship(3), 'v');
  expect(
    gameboard.board[2][1] && gameboard.board[2][2] && gameboard.board[2][3]
  ).toBeTruthy();
});

// test('Cant place ships if there is already one', () => {});

// test('An attack hits a ship', () => {});

// test('An attack misses a ship', () => {});

// test('Board keeps track of missed shots', () => {});

// test('All ships on the board have been sunk', () => {});
