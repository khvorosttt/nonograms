function selectPuzzle(size) {
    return `
        <div class="modal__backgroundPuzzles">
            <div class="selectPuzzle_wrapper">
                <div class="selectPuzzle__title">
                    <h2>Select puzzle</h2>
                    <h3>Playing field: ${size}&times${size}</h3>
                </div>
                <div class="puzzles_wrapper"></div>
                <button class="btns return_chooseLevel">Return</button>
            </div>
        </div>
    `;
}

export {selectPuzzle};