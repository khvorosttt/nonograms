const modal = document.querySelector(".modal__background");
const  modal__name = document.querySelector(".modal__name");
const  modal__description = document.querySelector(".modal__description");

export function showModal(item) {
    console.log(item);
    modal.classList.add('modal-active');
    document.body.classList.toggle("no-scroll");
    modal__name.innerHTML = item.name;
    modal__description.innerHTML = item.description;
}
