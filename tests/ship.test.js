import ship from '../src/modules/ship';

test('Ship has length', () => {
  expect(ship(3).length).toBe(3);
});

test('Ship can be hit', () => {
  let ship1 = ship(3);
  ship1.hit([2, 1]);
  expect(ship1.hitSpots).toEqual([[2, 1]]);
});

test('Ship can be sunk', () => {
  let ship1 = ship(3);
  ship1.hit([2, 1]);
  ship1.hit([2, 2]);
  ship1.hit([2, 3]);
  expect(ship1.isSunk()).toBe(true);
});

test('Ship isnt sunk', () => {
  let ship1 = ship(3);
  ship1.hit([2, 1]);
  ship1.hit([2, 2]);
  expect(ship1.isSunk()).toBe(false);
});
