import './styles.css';
import player from './modules/player.js';
import ship from './modules/ship.js';

const fleet = [ship(5), ship(4), ship(3), ship(3), ship(2)];

const makeTwoBoards = (p1, p2) => {
  //SAME CODE TWO TIMES LIKE A NEANDERTHAL, TRY TO KEEP IT DRY
  for (let i = 0; i < 10; i++) {
    let row = document.createElement('div');
    row.classList.add('row-p1');
    row.setAttribute('id', `p1-row${i}`);
    document.getElementById('board1').appendChild(row);

    p1.board.board[i].forEach((e, foreachIndex) => {
      let cell = document.createElement('div');
      cell.classList.add('cell-p1');
      cell.setAttribute('id', `p1-row${i}-cell${foreachIndex}`);
      row.appendChild(cell);

      cell.addEventListener('click', () => {
        p1.board.receiveAttack(i, foreachIndex);
      });
    });
  }

  for (let i = 0; i < 10; i++) {
    let row = document.createElement('div');
    row.classList.add('row-p2');
    row.setAttribute('id', `p2-row${i}`);
    document.getElementById('board2').appendChild(row);

    p2.board.board[i].forEach((e, foreachIndex) => {
      let cell = document.createElement('div');
      cell.classList.add('cell-p2');
      cell.setAttribute('id', `p2-row${i}-cell${foreachIndex}`);
      row.appendChild(cell);

      cell.addEventListener('click', (e) => {
        let attack = p2.board.receiveAttack(i, foreachIndex);
        if (attack === 'hit') e.target.classList.add('hit');
        if (attack === 'miss') e.target.classList.add('miss');
      });
    });
  }
};

// const placeShipsAtRandom = (board) => {
//   var orientations = ['v', 'h'];
//   fleet.forEach((ship) => {
//     board.placeShip(
//       Math.floor(Math.random() * 10),
//       Math.floor(Math.random() * 10),
//       ship,
//       orientations[Math.floor(Math.random() * orientations.length)]
//     );
//   });
// };

const placeShipsAtRandom = (board) => {
  var orientations = ['v', 'h'];
  for (let i = 0; i < 5; i++) {
    while (board.placedShips.length !== i) {
      board.placeShip(
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        fleet[i],
        orientations[Math.floor(Math.random() * orientations.length)]
      );
    }
  }
};

const p1 = player('p1');
const p2 = player('p2');

makeTwoBoards(p1, p2);

placeShipsAtRandom(p2.board);
console.log(p2.board);
