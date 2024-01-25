import { startGame } from "./startGame";
import { cellGrid } from "./cellGrid";
import '../css/normalize.css';
import '../css/style.css';

let solvedArray = [
    [0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 1, 0, 1, 1],
    [1, 1, 1, 1, 0]
]
let size = 5;
let gameArray = Array(5).fill(0).map(x => Array(5).fill(0));
let verticalHint = Array(3).fill(0).map(x => Array(5).fill(0));
setVerticalHint();
console.log(verticalHint);
let gorizontalHint = Array(5).fill(0).map(x => Array(3).fill(0));
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



function initGame() {
    document.body.innerHTML = startGame();
    cellGrid(verticalHint, gorizontalHint, 5);
}

initGame();

const cells = document.querySelectorAll(".game_cell");

cells.forEach((cell) => {
    cell.addEventListener('click', (event) => leftClick(event));
    cell.addEventListener('contextmenu', (event) => rightClick(event));
});

function leftClick(event) {
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
    if (compareArray(solvedArray, gameArray)) {
        console.log("win");
    }
    console.log(gameArray);
}

function rightClick(event) {
    event.preventDefault();
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
    return JSON.stringify(firstArray) === JSON.stringify(secondArray);
}