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

test('Can place ships at specific coordinates vertically', () => {
  let gameboard = gameBoard();
  gameboard.initBoard();
  gameboard.placeShip(2, 1, ship(3), 'v');
  expect(
    gameboard.board[2][1] && gameboard.board[2][2] && gameboard.board[2][3]
  ).toBeTruthy();
});

test('Cant place ships if space is occupied', () => {
  let gameboard = gameBoard();
  gameboard.initBoard();
  gameboard.placeShip(2, 1, ship(3), 'v');
  expect(
    gameboard.board[2][1] && gameboard.board[2][2] && gameboard.board[2][3]
  ).toBeTruthy();
});

test('Cant place ships on reserved space', () => {
  let gameboard = gameBoard();
  gameboard.initBoard();
  gameboard.placeShip(2, 1, ship(2), 'v');
  gameboard.placeShip(2, 0, ship(1), 'v');
  expect(gameboard.board[2][0]).toEqual('reserved');
});

test('Cant place ships on reserved space (edges)', () => {
  let gameboard = gameBoard();
  gameboard.initBoard();
  gameboard.placeShip(0, 0, ship(2), 'h');
  gameboard.placeShip(0, 2, ship(1), 'h');

  expect(gameboard.board[0][2]).toEqual('reserved');
});

test('Cant place ships if it would overflow the board (v)', () => {
  let gameboard = gameBoard();
  gameboard.initBoard();
  gameboard.placeShip(2, 1, ship(11), 'v');
  expect(gameboard.board[2][1]).not.toBeTruthy();
});

test('Cant place ships if it would overflow the board (h)', () => {
  let gameboard = gameBoard();
  gameboard.initBoard();
  gameboard.placeShip(7, 9, ship(4), 'h');
  expect(gameboard.board[7][9]).not.toBeTruthy();
});

// test('An attack hits a ship', () => {});

// test('An attack misses a ship', () => {});

// test('Board keeps track of missed shots', () => {});

// test('All ships on the board have been sunk', () => {});
