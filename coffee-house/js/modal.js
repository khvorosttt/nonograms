const modal = document.querySelector(".modal__background");

export function showModal(item) {
    modal.classList.add('modal-active');
    document.body.classList.toggle("no-scroll");
}
