import winImg from '../img/win.png';

function winModal(name, minutes, seconds) {
    let modal = document.querySelector('.modal_wrapper');
    modal.replaceChildren();
    let wrapper = document.createElement('div');
    wrapper.className = 'win_wrapper';
    modal.append(wrapper);
    let img = document.createElement('img');
    img.className = 'win_img';
    img.src = winImg;
    img.alt = 'The game is won';
    wrapper.append(img);
    let h = document.querySelector('h2');
    h.className = 'win_text';
    h.innerText = `You solved the puzzle «${name}» in ${minutes}:${seconds}`;
    wrapper.append(h);
}

export {winModal};