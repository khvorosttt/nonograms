function startGame() {
    return `
        <div class="game light">
            <div class="wrapper">
                <div class="game__buttons buttons">
                    <button class="btns buttons__again-last-game">
                        Again last game
                    </button>
                    <button class="btns buttons__records">
                        Records
                    </button>
                    <button class="btns buttons__show-solution">
                        Solution
                    </button>
                </div>
                <div class="title_space">
                    <h1 class="game__name">
                        Nonograms &laquo<span class="name_puzzle"></span>&raquo
                    </h1>
                    <div class="theme_button"></div>
                </div>
                <div class="time_sounds_wrapper">
                    <div class="game__time">
                        <span class="minutes">00</span>
                        :
                        <span class="seconds">00</span>
                    </div>
                    <button class="sounds btns">🔕</button>
                </div>
                <div class="game__grid">
                </div>
                <div class="game__buttons buttons">
                    <button class="btns buttons__reset-game">
                        Reset game
                    </button>
                    <button class="btns buttons__choose-game">
                        Choose game
                    </button>
                    <button class="btns buttons__save-game">
                        Save game
                    </button>
                </div>
            </div>
        </div>`
} 
export { startGame };