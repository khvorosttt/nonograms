import info from '../data/questionsAnswers.json' assert { type: "json" };
import gameHTML from './initGameHTML.js';

const letters = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
    'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U',
    'V', 'W', 'X', 'Y', 'Z'
];
let numberQuestion = randomNumber(info.length);
document.body.insertAdjacentHTML('beforeend', gameHTML(info[numberQuestion].question));

const virtualKeyboard = document.querySelector('.virtualKeyboard');
for (let i = 0; i < letters.length; i++) {
    virtualKeyboard.insertAdjacentHTML('beforeend',
        `<button id='letter' class="letter">${letters[i]}</button>`
    );
}

function randomNumber(limit) {
    return Math.floor(limit * Math.random());
}