function startGame() {
    return `
        <div class="game dark">
            <div class="wrapper">
                <header class="header">
                </header>
                <div class="game__buttons top-buttons">
                    <button class="top-buttons__again-last-game">
                        Again last game
                    </button>
                    <button class="top-buttons__records">
                        Records
                    </button>
                </div>
                <div class="game__name">
                    Nonograms
                </div>
                <div class="game__time">
                </div>
                <div class="game__grid">
                </div>
                <div class="game__buttons bottom-buttons">
                    <button class="bottom-buttons__reset-game">
                        Reset game
                    </button>
                    <button class="bottom-buttons__choose-game">
                        Choose game
                    </button>
                    <button class="bottom-buttons__save-game">
                        Save game
                    </button>
                </div>
            </div>
        </div>`
} 
export { startGame };