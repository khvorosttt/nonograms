const burger = document.querySelector("#burger");
burger.addEventListener("click", burgerClick);

function burgerClick () {
    burger.classList.toggle("menu__burger-active");
}