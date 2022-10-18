import ship from './ship.js';

const fleet = [null, ship(5), ship(4), ship(3), ship(3), ship(2)];

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

const placeShipsAtRandom = (board) => {
  const orientations = ['v', 'h'];
  for (let i = 0; i < 6; i++) {
    //to circumvent the while condition (only way i found to make it work) i added an extra element to the array, so it starts at 0, ignores that and then does it 5 times (true length of the arary)
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

export { placeShipsAtRandom, makeTwoBoards };
