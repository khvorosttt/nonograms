const modal__background = document.querySelector(".modal__background");
const  modal__name = document.querySelector(".modal__name");
const  modal__description = document.querySelector(".modal__description");
const modal__sizeButtons = document.querySelectorAll(".size-item");
const modal__additivesButtons = document.querySelectorAll(".additives-item");
const modalClose = document.querySelector(".modal__button-close");
const modalPrice = document.querySelector(".modal__total-price");
const modalImg = document.querySelector('.modal__img');
let priceSize;
let priceAdditives = 0;
let item;

export function showModal(currentItem) {
    item = currentItem;
    modal__background.classList.add('modal-active');
    document.body.classList.add("no-scroll");
    modalImg.src = item.img;
    modalImg.alt = item.name;
    modal__name.innerHTML = item.name;
    modal__description.innerHTML = item.description;
    let i = 0;
    for(let key in item.sizes) {
        modal__sizeButtons[i].querySelector('.size-item-size').innerHTML = key.toUpperCase();
        modal__sizeButtons[i].querySelector('.size-item-volume').innerHTML = item.sizes[key].size;
        if(key === "s") {
            modal__sizeButtons[i].classList.add("size-item-active");
            priceSize = parseFloat(item.price) + parseFloat(item.sizes[key]["add-price"]);
        }
        i++;
    }
    for(let j = 0; j < item.additives.length; j++) {
        modal__additivesButtons[j].querySelector('.additives-item-number').innerHTML = j+1;
        modal__additivesButtons[j].querySelector('.additives-item-name').innerHTML = item.additives[j].name;
    }
    modalPrice.innerHTML = `$${(priceSize + priceAdditives).toFixed(2)}`;
}

function changeSize(event) {
    const currentElem = event.currentTarget;
    modal__sizeButtons.forEach( (button) => {
        button.classList.remove("size-item-active");
    });
    currentElem.classList.add("size-item-active");
    let newSize = currentElem.querySelector('.size-item-size').textContent.trim().toLowerCase();
    priceSize = parseFloat(item.price) + parseFloat(item.sizes[newSize]["add-price"]);
    modalPrice.innerHTML = `$${(priceSize + priceAdditives).toFixed(2)}`;
}

function changeAdditives(event) {
    const currentElem = event.currentTarget;
    currentElem.classList.toggle('additives-item-active');
    const nameAddAdditive = currentElem.querySelector('.additives-item-name').textContent.trim();
    const addAdditive = item.additives.find(additive => additive.name === nameAddAdditive);
    const priceAddAdditive = addAdditive["add-price"];
    if(currentElem.classList.contains('additives-item-active')){
        priceAdditives += parseFloat(priceAddAdditive);
    } else {
        priceAdditives -= parseFloat(priceAddAdditive);
    }
    modalPrice.innerHTML = `$${(priceSize + priceAdditives).toFixed(2)}`;
}

function closeModal() {
    modal__background.classList.remove('modal-active');
    document.body.classList.remove("no-scroll");
    modal__sizeButtons.forEach( (button) => {
        button.classList.remove("size-item-active");
    });
    modal__additivesButtons.forEach( (button) => {
        button.classList.remove("additives-item-active");
    });
    priceAdditives = 0
}




modal__sizeButtons.forEach( (button) => {
    button.addEventListener("click", (event) => {changeSize(event);});
});

modal__additivesButtons.forEach( (button) => {
    button.addEventListener("click", (event) => {changeAdditives(event);})
});

modalClose.addEventListener("click", closeModal);

modal__background.addEventListener("click", (event) => {
    if(event.target === modal__background) {
        closeModal();
    }
});

