const modalHTML = (message, word) => `
    <div class="modal__background">
        <div class="modal">
            <div class="message">${message}</div>
            <div class="secretWord">${word}</div>
            <button class="playAgain">Play again</button>
        </div>
    </div>
`

export default modalHTML;