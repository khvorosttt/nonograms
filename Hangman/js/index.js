import info from '../data/questionsAnswers.json' assert { type: "json" };
import gameHTML from './initGameHTML.js';
import modal from './modal.js';

const letters = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
    'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U',
    'V', 'W', 'X', 'Y', 'Z'
];
let clickedLetters;
let numberQuestion;
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

function initGame() {
    document.body.replaceChildren();
    clickedLetters = [];
    numberQuestion = randomNumber(info.length);
    incorrectGuesses = 0;
    question = info[numberQuestion].question;
    answer = info[numberQuestion].answer.toUpperCase();
    lengthRightLetters = 0;
    document.body.insertAdjacentHTML('beforeend', gameHTML(question, incorrectGuesses));
    word = document.querySelector('.word');
    virtualKeyboard = document.querySelector('.virtualKeyboard');
    addVirtualKeyboard();
    hideLetters();
    guesses = document.querySelector('.falseGuesses');
    answerLetters = document.querySelectorAll('.answerLetter');
    keyboardLetters = document.querySelectorAll('.letter');
    keyboardLetters.forEach( (item) => {
        item.addEventListener('click', (event) => {
            letterClick(event);
        }, {once: true});
    });
    document.addEventListener('keydown', physicalClick);
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

const physicalClick = function(event) {
    const key = event.key.toUpperCase();
    if (!event.altKey && !event.shiftKey && !event.ctrlKey) {
        if (letters.includes(key)) {
            if(!clickedLetters.includes(key)) {
                ltrClick(key, keyboardLetters[letters.indexOf(key)]);
            }
        }
    }
}

function letterClick(event) {
    const currentElem = event.currentTarget;
    const clickLetter = currentElem.textContent.toUpperCase().trim();
    ltrClick(clickLetter, currentElem);
}

function ltrClick(clickLetter, currentElem) {
    if (!answer.includes(clickLetter)) {
        incorrectGuesses++;
        guesses.innerHTML = incorrectGuesses + '/6';
        if (incorrectGuesses === incorrectGuessesEnd) {
            showModal("You lose!");
            document.removeEventListener('keydown', physicalClick);
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
            document.removeEventListener('keydown', physicalClick);
        }
    }
    currentElem.classList.add('letterClicked');
    clickedLetters.push(clickLetter);
}

function showModal(message) {
    document.body.insertAdjacentHTML('beforeend',
        modal(message,answer)
    );
    let againButton = document.querySelector('.playAgain');
    againButton.addEventListener('click', initGame, {once:true});
}

window.addEventListener('load', initGame);




