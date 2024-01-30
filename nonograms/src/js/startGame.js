function startGame() {
    return `
        <div class="game dark">
            <div class="wrapper">
                <header class="header">
                </header>
                <div class="game__buttons buttons">
                    <button class="buttons__again-last-game">
                        Again last game
                    </button>
                    <button class="buttons__records">
                        Records
                    </button>
                    <button class="buttons__show-solution">
                        Solution
                    </button>
                </div>
                <div class="game__name">
                    Nonograms &laquo<span class="name_puzzle"></span>&raquo
                </div>
                <div class="game__time">
                    <span class="minutes">00</span>
                    :
                    <span class="seconds">00</span>
                </div>
                <div class="game__grid">
                </div>
                <div class="game__buttons buttons">
                    <button class="buttons__reset-game">
                        Reset game
                    </button>
                    <button class="buttons__choose-game">
                        Choose game
                    </button>
                    <button class="buttons__save-game">
                        Save game
                    </button>
                </div>
            </div>
        </div>`
} 
export { startGame };