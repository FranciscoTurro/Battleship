import gameBoard from '../src/modules/gameBoard.js';
import ship from '../src/modules/ship.js';

test('Creates a 10x10 board', () => {
  let gameboard = gameBoard();
  expect(gameboard.board.length && gameboard.board[4].length).toBe(10);
});

test('Can place ships at specific coordinates horizontally', () => {
  let gameboard = gameBoard();
  gameboard.placeShip(2, 1, ship(3), 'h');
  expect(
    gameboard.board[2][1] && gameboard.board[2][2] && gameboard.board[2][3]
  ).toBeTruthy();
});

test('Can place ships at specific coordinates vertically', () => {
  let gameboard = gameBoard();
  gameboard.placeShip(2, 1, ship(3), 'v');
  expect(
    gameboard.board[2][1] && gameboard.board[3][1] && gameboard.board[4][1]
  ).toBeTruthy();
});

test('Cant place ships if space is occupied', () => {
  let gameboard = gameBoard();
  gameboard.placeShip(2, 1, ship(3), 'h');
  gameboard.placeShip(1, 1, ship(3), 'h');
  expect(gameboard.board[1][1]).toEqual('reserved');
});

test('Cant place ships on another ship', () => {
  let gameboard = gameBoard();
  gameboard.placeShip(2, 1, ship(3), 'h');
  expect(gameboard.placeShip(2, 1, ship(1), 'h')).not.toBeTruthy();
});

test('Cant place ships on another ship (length case)', () => {
  let gameboard = gameBoard();
  gameboard.placeShip(2, 1, ship(3), 'h');
  expect(gameboard.placeShip(0, 2, ship(4), 'v')).not.toBeTruthy();
});

test('Cant place ships on reserved space', () => {
  let gameboard = gameBoard();
  gameboard.placeShip(2, 1, ship(2), 'v');
  gameboard.placeShip(2, 0, ship(1), 'v');
  expect(gameboard.board[2][0]).toEqual('reserved');
});

test('Cant place ships on reserved space (edges)', () => {
  let gameboard = gameBoard();
  gameboard.placeShip(0, 0, ship(2), 'h');
  gameboard.placeShip(0, 2, ship(1), 'h');

  expect(gameboard.board[0][2]).toEqual('reserved');
});

test('Cant place ships if it would overflow the board (v)', () => {
  let gameboard = gameBoard();
  gameboard.placeShip(2, 1, ship(11), 'v');
  expect(gameboard.board[2][1]).not.toBeTruthy();
});

test('Cant place ships if it would overflow the board (h)', () => {
  let gameboard = gameBoard();
  gameboard.placeShip(7, 9, ship(4), 'h');
  expect(gameboard.board[7][9]).not.toBeTruthy();
});

test('An attack hits a ship', () => {
  let gameboard = gameBoard();
  gameboard.placeShip(0, 0, ship(2), 'h');
  gameboard.receiveAttack(0, 0);
  expect(gameboard.board[0][0].ship.hits).toEqual([0]);
});

test('An attack misses a ship', () => {
  let gameboard = gameBoard();
  gameboard.receiveAttack(3, 2);
  expect(gameboard.missedShots).toEqual([[3, 2]]);
});

test('Board keeps track of missed shots', () => {
  let gameboard = gameBoard();
  gameboard.receiveAttack(3, 2);
  gameboard.receiveAttack(0, 2);
  expect(gameboard.missedShots).toEqual([
    [3, 2],
    [0, 2],
  ]);
});

test('All ships on the board have been sunk', () => {
  let gameboard = gameBoard();
  gameboard.placeShip(0, 0, ship(2), 'h');
  gameboard.placeShip(3, 4, ship(1), 'h');
  gameboard.receiveAttack(0, 0);
  gameboard.receiveAttack(0, 1);
  gameboard.receiveAttack(3, 4);
  expect(gameboard.allShipsSunk()).toBeTruthy();
});

test('All ships on the board have not been sunk', () => {
  let gameboard = gameBoard();
  gameboard.placeShip(0, 0, ship(2), 'h');
  gameboard.placeShip(3, 4, ship(1), 'h');
  gameboard.receiveAttack(0, 0);
  gameboard.receiveAttack(1, 0);
  expect(gameboard.allShipsSunk()).not.toBeTruthy();
});

test('Keeps track of attacks that hit ships', () => {
  let gameboard = gameBoard();
  gameboard.placeShip(3, 4, ship(3), 'h');
  gameboard.receiveAttack(3, 4);
  gameboard.receiveAttack(3, 5);
  expect(gameboard.hitShots).toEqual([
    [3, 4],
    [3, 5],
  ]);
});

test('Cant place a ship on usable space if the length will reach reserved space', () => {
  let gameboard = gameBoard();
  gameboard.placeShip(1, 2, ship(1), 'h');
  gameboard.placeShip(0, 0, ship(3), 'h');
  console.log(gameboard.board);
  expect(gameboard.board[0][0]).toBe(false);
});
