function winModal(name, minutes, seconds) {
    let modal = document.querySelector('.modal_wrapper');
    modal.replaceChildren();
    let wrapper = document.createElement('div');
    wrapper.innerText = `You solved the puzzle &laquo${name}&raquo in ${minutes}:${seconds}`;
    modal.append(wrapper);
}

export {winModal};