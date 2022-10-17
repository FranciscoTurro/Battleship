import './styles.css';
import player from './modules/player.js';
import { placeShipsAtRandom, makeTwoBoards } from './modules/dom.js';

const p1 = player('p1');
const p2 = player('p2');

makeTwoBoards(p1, p2);

placeShipsAtRandom(p2.board);
console.log(p2.board);
