import './styles.css';
import player from './modules/player.js';
import ship from './modules/ship.js';
import 'nes.css/css/nes.min.css';

import {
  placeShipsAtRandom,
  makeTwoBoards,
  updateBoard,
  updateBoardTroubleshooting,
  checkShipsDone,
  makePVboard,
  updatePVboard,
} from './modules/domFunctions.js';

const p1 = player('p1');
const p2 = player('p2');

makeTwoBoards(p1, p2);
makePVboard(p1);

const modalContainer = document.querySelector('#modalContainer');
const modalButton = document.querySelector('.modalButton');
const xSelector = document.querySelector('#xSelector');
const ySelector = document.querySelector('#ySelector');
const addButton = document.querySelector('#addButton');
const orientationSelector = document.querySelector('#orientation');
const shipSelector = document.querySelector('#shipSelector');

modalButton.addEventListener('click', () => {
  modalContainer.style.display = 'block';
  placeShipsAtRandom(p2.board);
  console.log(p2.board);
  p1.setTurn(p2);
});

addButton.addEventListener('click', () => {
  if (xSelector.value.length === 0 || ySelector.value.length === 0) return;
  if (isNaN(xSelector.value) || isNaN(ySelector.value)) return;

  switch (shipSelector.value) {
    case 'carrier':
      if (
        p1.board.placeShip(
          parseInt(xSelector.value),
          parseInt(ySelector.value),
          ship(5),
          orientationSelector.value
        )
      ) {
        for (let i = 0; i < shipSelector.length; i++) {
          if (shipSelector.options[i].value == 'carrier')
            shipSelector.remove(i);
        }
        updateBoard(p1.board.board);
        updatePVboard(p1.board.board);
        checkShipsDone(p1, p2);
      }
      break;

    case 'battleship':
      if (
        p1.board.placeShip(
          parseInt(xSelector.value),
          parseInt(ySelector.value),
          ship(4),
          orientationSelector.value
        )
      ) {
        for (let i = 0; i < shipSelector.length; i++) {
          if (shipSelector.options[i].value == 'battleship')
            shipSelector.remove(i);
        }
        updateBoard(p1.board.board);
        updatePVboard(p1.board.board);
        checkShipsDone(p1, p2);
      }
      break;

    case 'destroyer':
      if (
        p1.board.placeShip(
          parseInt(xSelector.value),
          parseInt(ySelector.value),
          ship(3),
          orientationSelector.value
        )
      ) {
        for (let i = 0; i < shipSelector.length; i++) {
          if (shipSelector.options[i].value == 'destroyer')
            shipSelector.remove(i);
        }
        updateBoard(p1.board.board);
        updatePVboard(p1.board.board);
        checkShipsDone(p1, p2);
      }
      break;

    case 'submarine':
      if (
        p1.board.placeShip(
          parseInt(xSelector.value),
          parseInt(ySelector.value),
          ship(3),
          orientationSelector.value
        )
      ) {
        for (let i = 0; i < shipSelector.length; i++) {
          if (shipSelector.options[i].value == 'submarine')
            shipSelector.remove(i);
        }
        updateBoard(p1.board.board);
        updatePVboard(p1.board.board);
        checkShipsDone(p1, p2);
      }
      break;

    case 'patrol':
      if (
        p1.board.placeShip(
          parseInt(xSelector.value),
          parseInt(ySelector.value),
          ship(2),
          orientationSelector.value
        )
      ) {
        for (let i = 0; i < shipSelector.length; i++) {
          if (shipSelector.options[i].value == 'patrol') shipSelector.remove(i);
        }
        updateBoard(p1.board.board);
        updatePVboard(p1.board.board);
        checkShipsDone(p1, p2);
      }
      break;
  }
});
