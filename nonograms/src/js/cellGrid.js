function cellGrid(verticalHint, gorizontalHint, size) {
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
                verticalHint[i][j] : '');
            tr.append(td);
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
            tr.append(td);
        }
        tbody.append(tr);
    }
}

export {cellGrid};