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
        if (p1.turn === true) {
          let attack = p2.board.receiveAttack(i, foreachIndex);
          if (attack === 'hit') e.target.classList.add('hit');
          if (attack !== 'hit') e.target.classList.add('miss');
          p2.setTurn(p1);
          p2Moves(p1, p2);
        }
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

const updateBoard = (board) => {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (board[i][j] !== 'reserved' && board[i][j] !== false) {
        document.getElementById(`p1-row${i}-cell${j}`).classList.add('hit');
      }
    }
  }
};

const updateBoardTroubleshooting = (board) => {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (board[i][j] !== 'reserved' && board[i][j] !== false) {
        document.getElementById(`p2-row${i}-cell${j}`).classList.add('hit');
      }
    }
  }
};

const shipSelector = document.querySelector('#shipSelector');
const modalButton = document.querySelector('.modalButton');
const modalContainer = document.querySelector('#modalContainer');
const checkShipsDone = () => {
  if (shipSelector.options.length === 0) {
    modalContainer.style.display = 'none';
    modalButton.classList.add('hide');
  }
};

const p2Moves = (p1, p2) => {
  const ran1 = Math.floor(Math.random() * 9);
  const ran2 = Math.floor(Math.random() * 9);
  if (p1.board.receiveAttack(ran1, ran2) !== 'hit') {
    document.getElementById(`p1-row${ran1}-cell${ran2}`).classList.add('miss');
  } else {
    document
      .getElementById(`p1-row${ran1}-cell${ran2}`)
      .classList.add('hitOwn');
  }
  console.log(p1.board);
  console.log(p2.board);
  p1.setTurn(p2);
};

export {
  placeShipsAtRandom,
  makeTwoBoards,
  updateBoard,
  updateBoardTroubleshooting,
  checkShipsDone,
};
