import ship from './ship.js';

const fleet = [null, ship(5), ship(4), ship(3), ship(3), ship(2)];

const makePVboard = (p1) => {
  for (let i = 0; i < 10; i++) {
    let row = document.createElement('div');
    row.classList.add('row-pv');
    row.setAttribute('id', `pv-row${i}`);
    document.getElementById('pvBoard').appendChild(row);

    p1.board.board[i].forEach((e, foreachIndex) => {
      let cell = document.createElement('div');
      cell.classList.add('cell-pv');
      cell.setAttribute('id', `pv-row${i}-cell${foreachIndex}`);
      row.appendChild(cell);
    });
  }
};

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
          if (
            searchForArray(p2.board.missedShots, [i, foreachIndex]) === false &&
            searchForArray(p2.board.hitShots, [i, foreachIndex]) === false
          ) {
            let attack = p2.board.receiveAttack(i, foreachIndex);
            if (attack === 'hit') e.target.classList.add('hit');
            if (attack !== 'hit') e.target.classList.add('miss');
            if (p2.board.allShipsSunk()) {
              p1.turn = false;
              p2.turn = false;
              gameOver(p1);
            } else {
              p2.setTurn(p1);
              announceTurn(p1, p2);
              p2Moves(p1, p2);
            }
          }
        }
      });
    });
  }
};

const announceTurn = (p1, p2) => {
  const announcer = document.querySelector('.announcer');
  if (p1.turn === true) {
    announcer.innerHTML = 'Turno del jugador 1';
    announcer.classList.remove(...announcer.classList);
    announcer.classList.add('announcer', 'nes-text', 'is-primary');
  } else {
    announcer.innerHTML = 'Turno del jugador 2';
    announcer.classList.remove(...announcer.classList);
    announcer.classList.add('announcer', 'nes-text', 'is-error');
  }
};

const gameOver = (winner) => {
  const announcer = document.querySelector('.announcer');
  announcer.classList.remove(...announcer.classList);
  announcer.classList.add('announcer');
  announcer.innerHTML = `Fin de la partida, ganador ${winner.name}`;
  console.log('work');
};

function searchForArray(arrayA, arrayB) {
  let i, j, current;
  for (i = 0; i < arrayA.length; ++i) {
    if (arrayB.length === arrayA[i].length) {
      current = arrayA[i];
      for (j = 0; j < arrayB.length && arrayB[j] === current[j]; ++j);
      if (j === arrayB.length) return true;
    }
  }
  return false;
}

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

const updatePVboard = (board) => {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (board[i][j] !== 'reserved' && board[i][j] !== false) {
        document.getElementById(`pv-row${i}-cell${j}`).classList.add('hit');
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
const checkShipsDone = (p1, p2) => {
  if (shipSelector.options.length === 0) {
    modalContainer.style.display = 'none';
    modalButton.remove();
    p1.setTurn(p2);
    announceTurn(p1, p2);
  }
};

function delay(delayInMs) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(2);
    }, delayInMs);
  });
}

const p2Moves = async (p1, p2) => {
  await delay(700);
  let ran1;
  let ran2;
  do {
    ran1 = Math.floor(Math.random() * 10);
    ran2 = Math.floor(Math.random() * 10);
  } while (
    searchForArray(p1.board.missedShots, [ran1, ran2]) === true ||
    searchForArray(p1.board.hitShots, [ran1, ran2]) === true
  );
  if (p1.board.receiveAttack(ran1, ran2) !== 'hit') {
    document.getElementById(`p1-row${ran1}-cell${ran2}`).classList.add('miss');
  } else {
    document
      .getElementById(`p1-row${ran1}-cell${ran2}`)
      .classList.add('hitOwn');
  }
  if (p1.board.allShipsSunk()) {
    p1.turn = false;
    p2.turn = false;
    gameOver(p2);
  } else {
    p1.setTurn(p2);
    announceTurn(p1, p2);
  }
};

export {
  placeShipsAtRandom,
  makeTwoBoards,
  updateBoard,
  updateBoardTroubleshooting,
  checkShipsDone,
  makePVboard,
  updatePVboard,
};
