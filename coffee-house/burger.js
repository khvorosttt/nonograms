const burger = document.querySelector("#burger");
const menu__nav = document.querySelector("#menu__nav");
const header__links = document.querySelectorAll(".header__link");
burger.addEventListener("click", burgerClick);


function burgerClick () {
    burger.classList.toggle("menu__burger-active");
    menu__nav.classList.toggle("active");
    document.body.classList.toggle("no-scroll");
}

header__links.forEach((link) => {
    link.addEventListener("click", burgerClick);
});

const menu__link = document.querySelector(".menu-link-menu-page");
if(menu__link){
    menu__link.addEventListener("click", function (e) {
        e.preventDefault();
    });
}