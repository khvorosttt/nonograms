import info from '../data/questionsAnswers.json' assert { type: "json" };
import gameHTML from './initGameHTML.js';

const letters = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
    'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U',
    'V', 'W', 'X', 'Y', 'Z'
];
const clickedLetters = [];
let numberQuestion = randomNumber(info.length);
let incorrectGuesses = 0;
let question = info[numberQuestion].question;
let answer = info[numberQuestion].answer.toUpperCase();
document.body.insertAdjacentHTML('beforeend', gameHTML(question, incorrectGuesses));
let word = document.querySelector('.word');
const virtualKeyboard = document.querySelector('.virtualKeyboard');
for (let i = 0; i < letters.length; i++) {
    virtualKeyboard.insertAdjacentHTML('beforeend',
        `<button id='letter' class="letter">${letters[i]}</button>`
    );
}

function randomNumber(limit) {
    return Math.floor(limit * Math.random());
}
console.log(word);
console.log(answer);
for (let i = 0; i < answer.length; i++) {
    word.insertAdjacentHTML('beforeend',
        `<span class="answerLetter">__</span>`
    );
}

const guesses = document.querySelector('.falseGuesses');

const keyboardLetters = document.querySelectorAll('.letter');
keyboardLetters.forEach( (item) => {
    item.addEventListener('click', (event) => {
        letterClick(event);
    }, {once: true});
})

document.addEventListener('keydown', (event) => {
    const key = event.key.toUpperCase();
    if (!event.altKey && !event.shiftKey && !event.ctrlKey) {
        if (letters.includes(key)) {
            if(!clickedLetters.includes(key)) {
                ltrClick(key, keyboardLetters[letters.indexOf(key)]);
            }
        }
    }
    console.log(clickedLetters);
})




function letterClick(event) {
    const currentElem = event.currentTarget;
    const clickLetter = currentElem.textContent.toUpperCase().trim();
    ltrClick(clickLetter, currentElem);
}

function ltrClick(clickLetter, currentElem) {
    if (!answer.includes(clickLetter)) {
        incorrectGuesses++;
        currentElem.classList.add('letterClicked');
        guesses.innerHTML = incorrectGuesses + '/6';
    }

    clickedLetters.push(clickLetter);
    console.log(clickedLetters);
}
