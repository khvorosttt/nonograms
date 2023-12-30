const modalHTML = (word) => `
    <div class="modal__background">
        <div class="modal">
            <div class="message"></div>
            <div class="answer">Secret word is <span class="secretWord">${word}</span></div>
            <button class="playAgain">Play again</button>
        </div>
    </div>
`

export default modalHTML;