function selectPuzzle(size) {
    return `
        <div class="modal__backgroundPuzzles">
            <div class="selectPuzzle_wrapper">
                <h2>Select puzzle</h2>
                <h3>Playing field: ${size}&times${size}</h3>
                <div class="puzzles_wrapper"></div>
                <button class="return_chooseLevel">Return</button>
            </div>
        </div>
    `;
}

export {selectPuzzle};