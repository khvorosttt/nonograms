import { startGame } from "./startGame";
import { cellGrid } from "./cellGrid";
import '../css/normalize.css';
import '../css/style.css';
import info from '../data/puzzle.json' assert { type: "json" };

let level = "middle";
let puzzles = info.filter(item => item.level === level);
let solvedArray = puzzles[randomNumber(puzzles.length)].puzzle;
console.log(solvedArray);
let size = solvedArray.length;
console.log(size);
let gameArray = Array(size).fill(0).map(x => Array(size).fill(0));
let verticalHint = Array(Math.ceil(size / 2)).fill(0).map(x => Array(size).fill(0));
setVerticalHint();
console.log(verticalHint);
let gorizontalHint = Array(size).fill(0).map(x => Array(Math.ceil(size / 2)).fill(0));
setGorizontalHint();
console.log(gorizontalHint);

function setVerticalHint() {
    for (let j = 0; j < solvedArray[0].length; j++) {
        let one = 0;
        let hint = verticalHint.length - 1;
        for (let i = solvedArray.length - 1; i >= 0; i--) {
            if (one && solvedArray[i][j] === 0) {
                verticalHint[hint][j] = one;
                one = 0;
                hint--;
            }
            if (solvedArray[i][j] === 1) {
                one++;
            }
        }
        if (one) {
            verticalHint[hint][j] = one;
            one = 0;
            hint--;
        }
    }
    for (let i = 0; i < verticalHint.length; i++) {
        let sum = 0;
        for (let j = 0; j < verticalHint[0].length; j++) {
            sum += verticalHint[i][j];
        }
        if (sum === 0) {
            verticalHint.shift();
            i--;
        } else {
            break;
        }
    }
}

function setGorizontalHint() {
    for (let i = 0; i < solvedArray.length; i++) {
        let one = 0;
        let hint = gorizontalHint[0].length - 1;
        for (let j = solvedArray[0].length - 1; j >=0; j--) {
            if (one && solvedArray[i][j] === 0) {
                gorizontalHint[i][hint] = one;
                one = 0;
                hint--;
            }
            if (solvedArray[i][j] === 1) {
                one++;
            }
        }
        if (one) {
            gorizontalHint[i][hint] = one;
            one = 0;
            hint--;
        }
    }
    for (let j = 0; j < gorizontalHint[0].length; j++) {
        let sum = 0;
        for (let i = 0; i < gorizontalHint.length; i++) {
            sum += gorizontalHint[i][j];
        }
        if (sum === 0) {
            for (let i = 0; i < gorizontalHint.length; i++) {
                gorizontalHint[i].shift();
            }
        } else {
            break;
        }
    }
}

function randomNumber(number) {
    return Math.floor(Math.random()*number);
}


function initGame() {
    document.body.innerHTML = startGame();
    cellGrid(verticalHint, gorizontalHint, gameArray);
}

initGame();
const stopwatchMinutes = document.querySelector('.minutes');
const stopwatchSeconds = document.querySelector('.seconds');
let minutes = 0;
let seconds = 0;
let start = false;

let cells = document.querySelectorAll(".game_cell");

addEventToCells();

function leftClick(event) {
    if (!start) startStopwatch();
    const currentElem = event.currentTarget;
    currentElem.classList.toggle('fill');
    let index = currentElem.getAttribute("data-index");
    let row = Math.floor(index / size);
    let column = index % size;
    if (gameArray[row][column] === 0) {
        gameArray[row][column] = 1;
    } else if (gameArray[row][column] === 1) {
        gameArray[row][column] = 0;
    }
    if (currentElem.classList.contains('cross')) {
        currentElem.replaceChildren();
    }
    if (compareArray(solvedArray, gameArray)) {
        console.log("win");
    }
    console.log(gameArray);
}

function rightClick(event) {
    event.preventDefault();
    if (!start) startStopwatch();
    const currentElem = event.currentTarget;
    currentElem.classList.toggle('cross');
    let index = currentElem.getAttribute("data-index");
    let row = Math.floor(index / size);
    let column = index % size;
    if (currentElem.classList.contains('cross')) {
        currentElem.innerHTML = `
            <span class="cross_line-one"></span>
            <span class="cross_line-two"></span>
        `;
        gameArray[row][column] = 2;
    } else {
        currentElem.replaceChildren();
        gameArray[row][column] = 0;
    }
}

function compareArray(firstArray, secondArray) {
    if (firstArray.length !== secondArray.length ||
        firstArray[0].length !== secondArray[0].length) {
            return false;
        }
    for (let i = 0; i < firstArray.length; i++) {
        for (let j = 0; j < firstArray[0].length; j++) {
            if (firstArray[i][j] !== secondArray[i][j] &&
                firstArray[i][j] !== 0 && secondArray[i][j] !== 2) {
                    return false;
                }
        }
    }
    return true;
}

function startStopwatch() {
    start = true;
    setInterval(stopwatch, 1000);
}

function stopwatch() {
    seconds++;
    if (seconds > 59) {
        seconds = 0;
        minutes++;
    }
    timeToStopwatch(stopwatchSeconds, seconds);
    timeToStopwatch(stopwatchMinutes, minutes);
}

function timeToStopwatch(item, value) {
    if (value < 10) {
        item.innerHTML = `0${value}`;
    } else {
        item.innerHTML = value;
    }
}

const resetGameButton = document.querySelector('.buttons__reset-game');
resetGameButton.addEventListener('click', resetGame);

function addEventToCells(){
    cells.forEach((cell) => {
        cell.addEventListener('click', (event) => leftClick(event));
        cell.addEventListener('contextmenu', (event) => rightClick(event));
    });
}

function resetGame() {
    gameArray = Array(size).fill(0).map(x => Array(size).fill(0));
    cellGrid(verticalHint, gorizontalHint, gameArray);
    cells = document.querySelectorAll(".game_cell");
    addEventToCells();
}