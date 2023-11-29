const burger = document.querySelector("#burger");
const menu__nav = document.querySelector("#menu__nav");
burger.addEventListener("click", burgerClick);


function burgerClick () {
    burger.classList.toggle("menu__burger-active");
    menu__nav.classList.toggle("active");
}