import { startGame } from "./startGame";
import { cellGrid } from "./cellGrid";
import '../css/normalize.css';
import '../css/style.css';
import info from '../data/puzzle.json' assert { type: "json" };
import { chooseLevel } from "./modalChooseLevel";
import { selectPuzzle } from "./selectPuzzle";
import { modalHTML } from "./modal";
import { top } from "./top";
import { winModal } from "./win";
import fillSound from "../sounds/fill.mp3";
import hideSound from "../sounds/hide.mp3";
import crossSound from "../sounds/cross.mp3";
import winSound from "../sounds/win-gong.ogg";

let level = "low";
let puzzles = info.filter(item => item.level === level);
let currentPuzzle = puzzles[randomNumber(puzzles.length)];
let solvedArray = currentPuzzle.puzzle;
let size = solvedArray.length;
let name = currentPuzzle.name;
let gameArray = Array(size).fill(0).map(x => Array(size).fill(0));
let verticalHint = setVerticalHint();
let gorizontalHint = setGorizontalHint();
let modal__background;
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
let showSolutionButton;
let topButton;
let closeModalButton;
let randomButton;
let timer;
let shownSolution;
let win = false;
let namePuzzle;
let fillAudio = new Audio(fillSound);
let hideAudio = new Audio(hideSound);
let crossAudio = new Audio(crossSound);
let winAudio = new Audio(winSound);
let themeButton;
let game;

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
    game = document.querySelector('.game');
    namePuzzle = document.querySelector('.name_puzzle');
    namePuzzle.innerText = name;
    stopwatchMinutes = document.querySelector('.minutes');
    stopwatchSeconds = document.querySelector('.seconds');
    game.insertAdjacentHTML('beforeend',
        chooseLevel()
    );
    game.insertAdjacentHTML('beforeend',
        selectPuzzle(size)
    );
    game.insertAdjacentHTML('beforeend',
        modalHTML()
    );
    modal__background = document.querySelector('.modal__background');
    modal__backgroundLevel = document.querySelector('.modal__backgroundLevel');
    modal__backgroundPuzzles = document.querySelector('.modal__backgroundPuzzles');
    modal__background.addEventListener('click', (event) => {
        if(event.target === modal__background) {
            closeModal();
        }
    });
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
    themeButton = document.querySelector('.theme_button');
    themeButton.addEventListener('click', changeTheme);
    resetGameButton = document.querySelector('.buttons__reset-game');
    resetGameButton.addEventListener('click', resetGame);
    chooseLevelButton = document.querySelector('.buttons__choose-game');
    chooseLevelButton.addEventListener('click', chooseLevelEvent);
    saveGameButton = document.querySelector('.buttons__save-game');
    saveGameButton.addEventListener('click', saveGame);
    againButton = document.querySelector('.buttons__again-last-game');
    againButton.addEventListener('click', againGame);
    againButton = document.querySelector('.buttons__save-game');
    showSolutionButton = document.querySelector('.buttons__show-solution');
    showSolutionButton.addEventListener('click', showSolution);
    topButton = document.querySelector('.buttons__records');
    randomButton = document.querySelector('.random_button');
    randomButton.addEventListener('click', randomGame);
    topButton.addEventListener('click', topAction);
    modalPuzzles = document.querySelector('.puzzles_wrapper');
    closeLevelButton = document.querySelector('.close_chooseLevel');
    closeLevelButton.addEventListener('click', closeModalLevel);
    closeModalButton = document.querySelector('.modal__close_button');
    closeModalButton.addEventListener('click', closeModal);
    returnLevelButton = document.querySelector('.return_chooseLevel');
    returnLevelButton.addEventListener('click', () => {
        closeModalPuzzles();
        chooseLevelEvent();
    })
}

function initGameBoard() {
    shownSolution = false;
    cellGrid(verticalHint, gorizontalHint, gameArray);
    cells = document.querySelectorAll(".game_cell");
    addEventToCells();
}

function addEventToCells(){
    cells.forEach((cell) => {
        cell.addEventListener('click', leftClick);
        cell.addEventListener('contextmenu', rightClick);
        cell.addEventListener('contextmenu', (event) => {
            event.preventDefault();
        });
    });
}

function removeEventToCells(){
    cells.forEach((cell) => {
        cell.removeEventListener('click', leftClick);
        cell.removeEventListener('contextmenu', rightClick);
    });
}

initGame();


function changeTheme(event) {
    let currentElem = event.currentTarget;
    currentElem.classList.toggle('theme-dark');
    if (currentElem.classList.contains('theme-dark')) {
        game.classList.remove('light');
        game.classList.add('dark');
    } else {
        game.classList.remove('dark');
        game.classList.add('light');
    }
}


function leftClick(event) {
    if (!start) startStopwatch();
    const currentElem = event.currentTarget;
    if (currentElem.classList.contains('fill')) {
        hideAudio.currentTime = 0;
        hideAudio.play();
    } else {
        fillAudio.currentTime = 0;
        fillAudio.play();
    }
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
        winAction();
    }
}

function rightClick(event) {
    event.preventDefault();
    if (!start) startStopwatch();
    const currentElem = event.currentTarget;
    if (currentElem.classList.contains('cross')) {
        hideAudio.currentTime = 0;
        hideAudio.play();
    } else {
        crossAudio.currentTime = 0;
        crossAudio.play();
    }
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

function showPuzzles(tempLevel) {
    closeModalLevel();
    modal__backgroundPuzzles.classList.add('puzzles-active');
    modalPuzzles.replaceChildren();
    let tempPuzzles = info.filter((item) => item.level === tempLevel);
    for (let i = 0; i < tempPuzzles.length; i++) {
        let div = document.createElement("div");
        div.className = "puzzleName";
        div.innerHTML = tempPuzzles[i].name;
        modalPuzzles.append(div);
    }
    const namePuzzles = document.querySelectorAll('.puzzleName');
    namePuzzles.forEach((namePuzzle) => {
        namePuzzle.addEventListener('click', (event) => changeSelectPuzzle(event, tempLevel));
    });
    

}

function changeSelectPuzzle(event, tempLevel) {
    win = false;
    let currentElem = event.currentTarget;
    currentPuzzle = info.filter(item => item.name === currentElem.textContent && item.level === tempLevel)[0];
    solvedArray = currentPuzzle.puzzle;
    size = solvedArray.length;
    verticalHint = setVerticalHint();
    gorizontalHint = setGorizontalHint();
    level = currentPuzzle.level;
    name = currentPuzzle.name;
    gameArray = Array(size).fill(0).map(x => Array(size).fill(0));
    seconds = 0;
    minutes = 0;
    timeToStopwatch(stopwatchSeconds, seconds);
    timeToStopwatch(stopwatchMinutes, minutes);
    start = false;
    clearInterval(timer);
    initGameBoard();
    namePuzzle.innerText = name;
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
    if (!shownSolution && !win) {
        localStorage.setItem('save', true);
        localStorage.setItem('name', currentPuzzle.name);
        localStorage.setItem('level', currentPuzzle.level);
        localStorage.setItem('gameState', JSON.stringify(gameArray));
        localStorage.setItem('seconds', seconds);
        localStorage.setItem('minutes', minutes);
    }
}

function againGame() {
    let dataSave = localStorage.getItem('save');
    if (dataSave) {
        win = false;
        name = localStorage.name;
        level = localStorage.level;
        currentPuzzle = info.filter((item) => {
            return item.name === name && item.level === level;
        })[0];
        solvedArray = currentPuzzle.puzzle;
        verticalHint = setVerticalHint();
        gorizontalHint = setGorizontalHint();
        gameArray = JSON.parse(localStorage.gameState);
        seconds = localStorage.getItem('seconds');
        minutes = localStorage.getItem('minutes');
        namePuzzle.innerText = name;
        clearInterval(timer);
        startStopwatch();
        initGameBoard();
    }
}

function showSolution() {
    gameArray = copyArray(solvedArray);
    initGameBoard();
    shownSolution = true;
    clearInterval(timer);
}

function winAction() {
    if (!win) {
        clearInterval(timer);
        let data = JSON.parse(localStorage.getItem('top'));
        let gameInfo = [level, name, minutes, seconds];
        let array = [];
        if (data) {
            array = data;
            if (array.length < 5) {
                array.push(gameInfo);
            } else {
                array.shift();
                array.push(gameInfo);
            }
        } else {
            array.push(gameInfo);
        }
        localStorage.setItem('top', JSON.stringify(array));
        win = true;
        modal__background.classList.add('modal-active');
        winModal(name, minutes, seconds);
        winAudio.currentTime = 0;
        winAudio.play();
    }    
}

function topAction() {
    modal__background.classList.add('modal-active');
    let data = JSON.parse(localStorage.getItem('top'));
    if (data) {
        let topArray = data;
        topArray = sortTop(topArray);
        top(topArray);
    }
}

function sortTop(array) {
    array.sort((a, b) => {
        return (a[2]*60 + a[3]) - (b[2]*60 +b[3]);
    });
    return array;
}

function closeModal() {
    modal__background.classList.remove('modal-active');
    winAudio.pause();
}

function randomGame() {
    win = false;
    let number = randomNumber(info.length);
    currentPuzzle = info[number];
    level = currentPuzzle.level;
    name = currentPuzzle.name;
    solvedArray = copyArray(currentPuzzle.puzzle);
    size = solvedArray.length;
    gameArray = Array(size).fill(0).map(x => Array(size).fill(0));
    verticalHint = setVerticalHint();
    gorizontalHint = setGorizontalHint();
    start = false;
    seconds = 0;
    minutes = 0;
    namePuzzle.innerText = name;
    closeModalLevel();
    timeToStopwatch(stopwatchSeconds, seconds);
    timeToStopwatch(stopwatchMinutes, minutes);
    clearInterval(timer);
    initGameBoard();
}