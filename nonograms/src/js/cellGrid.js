function cellGrid(verticalHint, gorizontalHint, gameArray) {
    const size = gameArray.length;
    const grid = document.querySelector(".game__grid");
    grid.replaceChildren();
    grid.innerHTML = `
        <table class="game_board">
            <tbody>
            </tboby>
        </table>
    `;
    const tbody = document.getElementsByTagName("tbody")[0];
    for (let i = 0; i < verticalHint.length; i++) {
        let tr = document.createElement("tr");
        tr.className = "row";
        for (let j = 0; j < gorizontalHint[0].length; j++) {
            let td = document.createElement("td");
            td.className = "empty_cell";
            tr.append(td);
        }
        for (let j = 0; j < size; j++) {
            let td = document.createElement("td");
            td.className = "verticalHint_cell";
            td.append(verticalHint[i][j] ? 
                verticalHint[i][j] : ''
            );
            if (j % 5 === 4) {
                td.classList.add('right_border');
            }
            if (j === 0) {
                td.classList.add('left_border');
            }
            tr.append(td);
        }
        if (i % 5 === 4) {
            tr.classList.add('bottom_border');
        }
        if (i === 0) {
            tr.classList.add('top_border');
        }
        tbody.append(tr);
    }
    for (let i = 0; i < size; i++) {
        let tr = document.createElement("tr");
        tr.className = "row";
        for (let j = 0; j < gorizontalHint[0].length; j++) {
            let td = document.createElement("td");
            td.className = "gorizontalHint_cell";
            td.append(gorizontalHint[i][j] ? 
                gorizontalHint[i][j] : '');
            tr.append(td);
        }
        for (let j = 0; j < size; j++) {
            let td = document.createElement("td");
            td.className = "game_cell";
            td.setAttribute("data-index", i * size + j);
            if (j % 5 === 4) {
                td.classList.add('right_border');
            }
            if (j === 0) {
                td.classList.add('left_border');
            }
            if (gameArray[i][j] === 1) {
                td.classList.add('fill');
            } else if (gameArray[i][j] === 2) {
                td.classList.add('cross');
                td.append(`
                    <span class="cross_line-one"></span>
                    <span class="cross_line-two"></span>
                `);
            }
            tr.append(td);
        }
        if (i % 5 === 4) {
            tr.classList.add('bottom_border');
        }
        if (i === 0) {
            tr.classList.add('top_border');
        }
        tbody.append(tr);
    }
}

export {cellGrid};