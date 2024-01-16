import info from '../data/questionsAnswers.json' assert { type: "json" };
import gameHTML from './initGameHTML.js';
import modal from './modal.js';

const letters = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
    'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U',
    'V', 'W', 'X', 'Y', 'Z'
];
let clickedLetters;
let numberQuestion = -1;
let incorrectGuesses;
let question;
let answer;
let word;
let virtualKeyboard;
let guesses;
let answerLetters;
let keyboardLetters;
let lengthRightLetters;
const incorrectGuessesEnd = 6;
let canvas;
let contextCanvas;
let modal__background;


function initGame() {
    document.body.replaceChildren();
    clickedLetters = [];
    let temp = randomNumber(info.length);
    while(numberQuestion === temp) {
        temp = randomNumber(info.length);
    }
    numberQuestion = temp;
    incorrectGuesses = 0;
    question = info[numberQuestion].question;
    answer = info[numberQuestion].answer.toUpperCase();
    console.log(answer);
    lengthRightLetters = 0;
    document.body.insertAdjacentHTML('beforeend', gameHTML(question, incorrectGuesses));
    canvas = document.getElementById('hangmanDraw');
    contextCanvas = canvas.getContext('2d');
    canvas.height = canvas.width;
    contextCanvas.clearRect(0, 0, canvas.width, canvas.height);
    drawHangman();
    word = document.querySelector('.word');
    virtualKeyboard = document.querySelector('.virtualKeyboard');
    addVirtualKeyboard();
    hideLetters();
    guesses = document.querySelector('.falseGuesses');
    answerLetters = document.querySelectorAll('.answerLetter');
    keyboardLetters = document.querySelectorAll('.letter');
    keyboardLetters.forEach( (item) => {
        item.addEventListener('click', virtualClick, {once: true});
    });
    document.addEventListener('keydown', physicalClick);
    document.body.insertAdjacentHTML('beforeend',
        modal(answer)
    );
}

function drawHangman() {
    contextCanvas.lineWidth = 4;
    contextCanvas.moveTo(20, canvas.height - 5);
    contextCanvas.lineTo(canvas.width - 20, canvas.height - 5);
    contextCanvas.moveTo(40, canvas.height - 5);
    contextCanvas.lineTo(40, 5);
    contextCanvas.lineTo(canvas.width - 80, 5);
    contextCanvas.lineTo(canvas.width - 80, 20);
    contextCanvas.moveTo(60, 5);
    contextCanvas.lineTo(40, 25);
    contextCanvas.stroke();
}

function drawHuman(state) {
    contextCanvas.lineWidth = 3;
    switch(state) {
        case 1:
            contextCanvas.beginPath();
            contextCanvas.arc(canvas.width - 80, 45, 25, 0, 2 * Math.PI, true);
            contextCanvas.stroke();
            break;
        case 2:
            contextCanvas.beginPath();
            contextCanvas.moveTo(canvas.width - 80, 70);
            contextCanvas.lineTo(canvas.width - 80, 150);
            contextCanvas.stroke();
            break;
        case 3:
            contextCanvas.beginPath();
            contextCanvas.moveTo(canvas.width - 80, 70);
            contextCanvas.lineTo(canvas.width - 80 - 20, 110);
            contextCanvas.stroke();
            break
        case 4:
            contextCanvas.beginPath();
            contextCanvas.moveTo(canvas.width - 80, 70);
            contextCanvas.lineTo(canvas.width - 80 + 20, 110);
            contextCanvas.stroke();
            break;
        case 5:
            contextCanvas.beginPath();
            contextCanvas.moveTo(canvas.width - 80, 150);
            contextCanvas.lineTo(canvas.width - 80 - 20, 190);
            contextCanvas.stroke();
            break;
        case 6:
            contextCanvas.beginPath();
            contextCanvas.moveTo(canvas.width - 80, 150);
            contextCanvas.lineTo(canvas.width - 80 + 20, 190);
            contextCanvas.stroke();
            break;
    }
}

function randomNumber(limit) {
    return Math.floor(limit * Math.random());
}

function addVirtualKeyboard() {
    for (let i = 0; i < letters.length; i++) {
        virtualKeyboard.insertAdjacentHTML('beforeend',
            `<button id='letter' class="letter">${letters[i]}</button>`
        );
    }
}

function hideLetters() {
    for (let i = 0; i < answer.length; i++) {
        word.insertAdjacentHTML('beforeend',
            `<span class="answerLetter">__</span>`
        );
    }
}

const virtualClick = function(event) {
    letterClick(event);
}

const physicalClick = function(event) {
    const key = event.key.toUpperCase();
    if (!event.altKey && !event.shiftKey && !event.ctrlKey) {
        if (letters.includes(key)) {
            if(!clickedLetters.includes(key)) {
                ltrClick(key, keyboardLetters[letters.indexOf(key)]);
            }
        } else {
            document.body.insertAdjacentHTML('beforeend',
                `<div class="suggestLanguage">
                    Use letters from the English keyboard 
                    layout or the virtual keyboard
                </div>`);
            setTimeout(function() {
                document.querySelector('.suggestLanguage').remove()
            }, 3000);
        }
    }
}

function letterClick(event) {
    const currentElem = event.currentTarget;
    const clickLetter = currentElem.textContent.toUpperCase().trim();
    if(!clickedLetters.includes(clickLetter)) {
        ltrClick(clickLetter, currentElem);
    }
}

function ltrClick(clickLetter, currentElem) {
    if (!answer.includes(clickLetter)) {
        incorrectGuesses++;
        guesses.innerHTML = incorrectGuesses + '/6';
        drawHuman(incorrectGuesses);
        if (incorrectGuesses === incorrectGuessesEnd) {
            showModal("You lose!");
        }
    } else {
        for (let i = 0; i < answer.length; i++) {
            if (answer[i] === clickLetter) {
                answerLetters[i].innerHTML = clickLetter;
                lengthRightLetters++;
            }
        }
        if (lengthRightLetters === answer.length) {
            showModal("You won!");
        }
    }
    currentElem.classList.add('letterClicked');
    clickedLetters.push(clickLetter);
}

function showModal(message) {
    document.removeEventListener('keydown', physicalClick);
    keyboardLetters.forEach( (item) => {
        item.removeEventListener('click', virtualClick, {once: true});
    });
    document.querySelector('.message').innerHTML = message;
    modal__background = document.querySelector('.modal__background');
    modal__background.classList.add('modal-active');
    document.body.classList.add('no-scroll');
    let againButton = document.querySelector('.playAgain');
    againButton.addEventListener('click', PlayAgain, {once:true});
}

function PlayAgain() {
    modal__background.classList.remove('modal-active');
    document.body.classList.remove('no-scroll');
    initGame();
}

window.addEventListener('load', initGame);




