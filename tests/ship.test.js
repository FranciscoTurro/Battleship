import ship from '../src/modules/ship';

test('Ship has length', () => {
  expect(ship(3).length).toBe(3);
});

test('Ship can be hit', () => {
  let ship1 = ship(3);
  ship1.hit(1);
  expect(ship1.hits).toEqual([1]);
});

test('Ship cant be hit on the same place', () => {
  let ship1 = ship(3);
  ship1.hit(1);
  ship1.hit(1);
  expect(ship1.hits).toEqual([1]);
});

test('Ship cant be hit more times than possible', () => {
  let ship1 = ship(3);
  ship1.hit(1);
  ship1.hit(2);
  ship1.hit(3);
  ship1.hit(4);
  expect(ship1.hits).toEqual([1, 2, 3]);
});

test('Ship can be sunk', () => {
  let ship1 = ship(3);
  ship1.hit(1);
  ship1.hit(2);
  ship1.hit(3);
  expect(ship1.isSunk()).toBeTruthy();
});

test('Ship isnt sunk', () => {
  let ship1 = ship(3);
  ship1.hit(1);
  ship1.hit(2);
  expect(ship1.isSunk()).not.toBeTruthy();
});
