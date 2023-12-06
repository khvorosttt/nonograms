const modal__background = document.querySelector(".modal__background");
const  modal__name = document.querySelector(".modal__name");
const  modal__description = document.querySelector(".modal__description");
const modal__sizeButtons = document.querySelectorAll(".size-item");
const modal__additivesButtons = document.querySelectorAll(".additives-item");
const modalClose = document.querySelector(".modal__button-close");
const modalPrice = document.querySelector(".modal__total-price");
let priseSize;
let priseAdditives = 0;

export function showModal(item) {
    modal__background.classList.add('modal-active');
    document.body.classList.toggle("no-scroll");
    modal__name.innerHTML = item.name;
    modal__description.innerHTML = item.description;
    let i = 0;
    for(let key in item.sizes) {
        modal__sizeButtons[i].querySelector('.size-item-size').innerHTML = key.toUpperCase();
        modal__sizeButtons[i].querySelector('.size-item-volume').innerHTML = item.sizes[key].size;
        if(key === "s") {
            modal__sizeButtons[i].classList.add("size-item-active");
            priseSize = parseFloat(item.price) + parseFloat(item.sizes[key]["add-price"]);
        }
        i++;
    }
    for(let j = 0; j < item.additives.length; j++) {
        modal__additivesButtons[j].querySelector('.additives-item-number').innerHTML = j+1;
        modal__additivesButtons[j].querySelector('.additives-item-name').innerHTML = item.additives[j].name;
    }
    modalPrice.innerHTML = `$${(priseSize + priseAdditives).toFixed(2)}`;




    modal__sizeButtons.forEach( (button) => {
        button.addEventListener("click", changeSize);
    });
    
    function changeSize(event) {
        const currentElem = event.currentTarget;
        modal__sizeButtons.forEach( (button) => {
            button.classList.remove("size-item-active");
        });
        currentElem.classList.add("size-item-active");
        let newSize = currentElem.querySelector('.size-item-size').textContent.trim().toLowerCase();
        priseSize = parseFloat(item.price) + parseFloat(item.sizes[newSize]["add-price"]);
        modalPrice.innerHTML = `$${(priseSize + priseAdditives).toFixed(2)}`;
    }
}

function closeModal() {
    modal__background.classList.remove('modal-active');
    document.body.classList.toggle("no-scroll");
}

modalClose.addEventListener("click", closeModal);
modal__background.addEventListener("click", (event) => {
    if(event.target === modal__background) {
        modal__background.classList.remove('modal-active');
    }
});

