import { startGame } from "./startGame";
import { cellGrid } from "./cellGrid";
import '../css/normalize.css';
import '../css/style.css';
import info from '../data/puzzle.json' assert { type: "json" };
import { chooseLevel } from "./modalChooseLevel";
import { selectPuzzle } from "./selectPuzzle";

let level = "low";
let puzzles = info.filter(item => item.level === level);
let currentPuzzle = puzzles[randomNumber(puzzles.length)];
let solvedArray = currentPuzzle.puzzle;
let size = solvedArray.length;
let name = currentPuzzle.name;
let gameArray = Array(size).fill(0).map(x => Array(size).fill(0));
let verticalHint = setVerticalHint();
let gorizontalHint = setGorizontalHint();
let modal__backgroundLevel;
let modal__backgroundPuzzles;
let level_containers;
let modalPuzzles;
let closeLevelButton;
let returnLevelButton;
let cells;
let minutes = 0;
let seconds = 0;
let start = false;
let stopwatchMinutes;
let stopwatchSeconds;
let resetGameButton;
let chooseLevelButton;
let saveGameButton;
let againButton;
let timer;
let dataSave = false;

function setVerticalHint() {
    const array = Array(Math.ceil(size / 2)).fill(0).map(x => Array(size).fill(0)); 
    for (let j = 0; j < solvedArray[0].length; j++) {
        let one = 0;
        let hint = array.length - 1;
        for (let i = solvedArray.length - 1; i >= 0; i--) {
            if (one && solvedArray[i][j] === 0) {
                array[hint][j] = one;
                one = 0;
                hint--;
            }
            if (solvedArray[i][j] === 1) {
                one++;
            }
        }
        if (one) {
            array[hint][j] = one;
            one = 0;
            hint--;
        }
    }
    for (let i = 0; i < array.length; i++) {
        let sum = 0;
        for (let j = 0; j < array[0].length; j++) {
            sum += array[i][j];
        }
        if (sum === 0) {
            array.shift();
            i--;
        } else {
            break;
        }
    }
    return array;
}

function setGorizontalHint() {
    const array = Array(size).fill(0).map(x => Array(Math.ceil(size / 2)).fill(0));
    for (let i = 0; i < solvedArray.length; i++) {
        let one = 0;
        let hint = array[0].length - 1;
        for (let j = solvedArray[0].length - 1; j >=0; j--) {
            if (one && solvedArray[i][j] === 0) {
                array[i][hint] = one;
                one = 0;
                hint--;
            }
            if (solvedArray[i][j] === 1) {
                one++;
            }
        }
        if (one) {
            array[i][hint] = one;
            one = 0;
            hint--;
        }
    }
    for (let j = 0; j < array[0].length; j++) {
        let sum = 0;
        for (let i = 0; i < array.length; i++) {
            sum += array[i][j];
        }
        if (sum === 0) {
            for (let i = 0; i < array.length; i++) {
                array[i].shift();
            }
            j--;
        } else {
            break;
        }
    }
    return array;
}

function randomNumber(number) {
    return Math.floor(Math.random()*number);
}


function initGame() {
    document.body.innerHTML = startGame();
    initGameBoard();
    stopwatchMinutes = document.querySelector('.minutes');
    stopwatchSeconds = document.querySelector('.seconds');
    document.body.insertAdjacentHTML('beforeend',
        chooseLevel()
    );
    document.body.insertAdjacentHTML('beforeend',
        selectPuzzle(size)
    );
    modal__backgroundLevel = document.querySelector('.modal__backgroundLevel');
    modal__backgroundPuzzles = document.querySelector('.modal__backgroundPuzzles');
    modal__backgroundLevel.addEventListener('click', (event) => {
        if(event.target === modal__backgroundLevel) {
            closeModalLevel();
        }
    });
    modal__backgroundPuzzles.addEventListener('click', (event) => {
        if(event.target === modal__backgroundPuzzles) {
            closeModalPuzzles();
        }
    });
    level_containers = document.querySelectorAll('.level_container');
    level_containers.forEach((level_container) => {
        level_container.addEventListener('click', (event) => chooseLevelContainer(event));
    });
    resetGameButton = document.querySelector('.buttons__reset-game');
    resetGameButton.addEventListener('click', resetGame);
    chooseLevelButton = document.querySelector('.buttons__choose-game');
    chooseLevelButton.addEventListener('click', chooseLevelEvent);
    saveGameButton = document.querySelector('.buttons__save-game');
    saveGameButton.addEventListener('click', saveGame);
    againButton = document.querySelector('.buttons__again-last-game');
    againButton.addEventListener('click', againGame);
    againButton = document.querySelector('.buttons__save-game');
    modalPuzzles = document.querySelector('.puzzles_wrapper');
    closeLevelButton = document.querySelector('.close_chooseLevel');
    closeLevelButton.addEventListener('click', closeModalLevel);
    returnLevelButton = document.querySelector('.return_chooseLevel');
    returnLevelButton.addEventListener('click', () => {
        closeModalPuzzles();
        chooseLevelEvent();
    })
}

function initGameBoard() {
    start = false;
    cellGrid(verticalHint, gorizontalHint, gameArray);
    cells = document.querySelectorAll(".game_cell");
    addEventToCells();
}

function addEventToCells(){
    cells.forEach((cell) => {
        cell.addEventListener('click', (event) => leftClick(event));
        cell.addEventListener('contextmenu', (event) => rightClick(event));
    });
}

initGame();



function leftClick(event) {
    console.log('start');
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
        currentElem.classList.remove('cross');
        gameArray[row][column] = 1;
    }
    if (compareArray(solvedArray, gameArray)) {
        console.log("win");
    }
}

function rightClick(event) {
    console.log('start');
    event.preventDefault();
    if (!start) startStopwatch();
    const currentElem = event.currentTarget;
    currentElem.classList.toggle('cross');
    let index = currentElem.getAttribute("data-index");
    let row = Math.floor(index / size);
    let column = index % size;
    if (currentElem.classList.contains('cross')) {
        gameArray[row][column] = 2;
        currentElem.classList.remove('fill');
    } else {
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
    timer = setInterval(stopwatch, 1000);
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

function resetGame() {
    gameArray = Array(size).fill(0).map(x => Array(size).fill(0));
    cellGrid(verticalHint, gorizontalHint, gameArray);
    cells = document.querySelectorAll(".game_cell");
    addEventToCells();
}

function chooseLevelEvent() {
    modal__backgroundLevel.classList.add('modal-active');
    //document.body.classList.add('no-scroll');
}

function chooseLevelContainer(event) {
    let currentElem = event.currentTarget;
    let tempLevel = currentElem.getAttribute('data-level');
    showPuzzles(tempLevel);
}

function showPuzzles(level) {
    closeModalLevel();
    modal__backgroundPuzzles.classList.add('puzzles-active');
    modalPuzzles.replaceChildren();
    let tempPuzzles = info.filter((item) => item.level === level);
    for (let i = 0; i < tempPuzzles.length; i++) {
        let div = document.createElement("div");
        div.className = "puzzleName";
        div.innerHTML = tempPuzzles[i].name;
        modalPuzzles.append(div);
    }
    const namePuzzles = document.querySelectorAll('.puzzleName');
    namePuzzles.forEach((namePuzzle) => {
        namePuzzle.addEventListener('click', (event) => changeSelectPuzzle(event));
    });
    

}

function changeSelectPuzzle(event) {
    let currentElem = event.currentTarget;
    currentPuzzle = info.filter(item => item.name === currentElem.textContent);
    solvedArray = currentPuzzle[0].puzzle;
    size = solvedArray.length;
    verticalHint = setVerticalHint();
    gorizontalHint = setGorizontalHint();
    level = currentPuzzle[0].level;
    name = currentPuzzle[0].name;
    gameArray = Array(size).fill(0).map(x => Array(size).fill(0));
    seconds = 0;
    minutes = 0;
    timeToStopwatch(stopwatchSeconds, seconds);
    timeToStopwatch(stopwatchMinutes, minutes);
    start = false;
    clearInterval(timer);
    initGameBoard();
    closeModalPuzzles();
}

function closeModalLevel() {
    modal__backgroundLevel.classList.remove('modal-active');
}

function closeModalPuzzles() {
    modal__backgroundPuzzles.classList.remove('puzzles-active');
}

function copyArray(array) {
    const copyArray = [];
    for (let i = 0; i < array.length; i++) {
        copyArray[i] = array[i].slice();
    }
    return copyArray;
}

function saveGame() {
    dataSave = true;
    localStorage.setItem('name', currentPuzzle.name);
    localStorage.setItem('level', currentPuzzle.level);
    localStorage.setItem('gameState', JSON.stringify(gameArray));
    localStorage.setItem('seconds', seconds);
    localStorage.setItem('minutes', minutes);
}

function againGame() {
    if (dataSave) {
        name = localStorage.name;
        console.log(name);
        level = localStorage.level;
        currentPuzzle = info.filter((item) => {
            return item.name === name && item.level === level;
        });
        console.log(currentPuzzle);
        solvedArray = currentPuzzle[0].puzzle;
        verticalHint = setVerticalHint();
        gorizontalHint = setGorizontalHint();
        gameArray = JSON.parse(localStorage.gameState);
        seconds = localStorage.getItem('seconds');
        minutes = localStorage.getItem('minutes');
        initGameBoard();
    }
}