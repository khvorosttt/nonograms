function top(topArray) {
    let modal = document.querySelector('.modal_wrapper');
    modal.replaceChildren();
    let wrapper = document.createElement('div');
    wrapper.className = 'top_wrapper';
    wrapper.innerHTML = `
        <table class="top_table">
            <tbody>
                <tr>
                    <th>Name puzzle</th>
                    <th>Level</th>
                    <th>Time</th>
                </tr>
            </tboby>
        </table>
    `;
    modal.append(wrapper);
    let tbody = modal.querySelector('tbody');
    for (let i = 0; i< topArray.length; i++) {
        let tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${topArray[i][1]}</td>
            <td>${topArray[i][0]}</td>
            <td>${topArray[i][2]}:${topArray[i][3]}</td>
        `;
        tbody.append(tr);
    }
}

export {top};