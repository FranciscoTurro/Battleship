import ship from '../src/modules/ship';

test('Ship has length', () => {
  expect(ship(3).length).toBe(3);
});

test('Ship can be hit', () => {
  let ship1 = ship(3);
  ship1.hit(2);
  expect(ship1.hitSpots).toEqual([0, 0, 1]);
});

test('Ship can be sunk', () => {
  let ship1 = ship(3);
  ship1.hit(0);
  ship1.hit(1);
  ship1.hit(2);
  expect(ship1.isSunk()).toBe(true);
});
