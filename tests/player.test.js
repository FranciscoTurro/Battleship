import player from '../src/modules/player.js';

test('Can create a player', () => {
  const p1 = player('p1');
  expect(p1).toBeTruthy();
});

test('There can be more than one player', () => {
  const p1 = player('p1');
  const p2 = player('p2');
  expect(p1 && p2).toBeTruthy();
});

test('Turns work (p1)', () => {
  const p1 = player('p1');
  const p2 = player('p2');
  p1.setTurn(p2);
  expect(p1.turn).toBeTruthy();
});

test('Turns work (p2)', () => {
  const p1 = player('p1');
  const p2 = player('p2');
  p2.setTurn(p1);
  expect(p2.turn).toBeTruthy();
});
