import './styles.css';
import player from './modules/player.js';
import { placeShipsAtRandom, makeTwoBoards } from './modules/dom.js';

const p1 = player('p1');
const p2 = player('p2');

makeTwoBoards(p1, p2);

placeShipsAtRandom(p2.board);
console.log(p2.board);

const modalContainer = document.querySelector('#modalContainer');
const modalButton = document.querySelector('.modalButton');
const xSelector = document.querySelector('#xSelector');
const ySelector = document.querySelector('#ySelector');
const addButton = document.querySelector('#addButton');
const orientationSelector = document.querySelector('#orientation');

modalButton.addEventListener('click', () => {
  modalContainer.style.display = 'block'; //makes the modal appear
});

window.addEventListener('click', (e) => {
  if (e.target == modalContainer) {
    modalContainer.style.display = 'none'; //makes the modal dissappear if i click outside of it
  }
});

addButton.addEventListener('click', (e) => {});
