const modal = document.querySelector(".modal__background");
const  modal__name = document.querySelector(".modal__name");
const  modal__description = document.querySelector(".modal__description");
const modal__sizeButtons = document.querySelectorAll(".size-item");
const modal__additivesButtons = document.querySelectorAll(".additives-item");
const modalClose = document.querySelector(".modal__button-close");
const modalPrice = document.querySelector(".modal__total-price");

export function showModal(item) {
    console.log(item);
    modal.classList.add('modal-active');
    document.body.classList.toggle("no-scroll");
    modal__name.innerHTML = item.name;
    modal__description.innerHTML = item.description;
    let i = 0;
    for(let key in item.sizes) {
        modal__sizeButtons[i].querySelector('.size-item-size').innerHTML = key;
        modal__sizeButtons[i].querySelector('.size-item-volume').innerHTML = item.sizes[key].size;
        i++;
    }
    for(let j = 0; j < item.additives.length; j++) {
        modal__additivesButtons[j].querySelector('.additives-item-number').innerHTML = j+1;
        modal__additivesButtons[j].querySelector('.additives-item-name').innerHTML = item.additives[j].name;
    }
    modalPrice.innerHTML = item.price;
}
