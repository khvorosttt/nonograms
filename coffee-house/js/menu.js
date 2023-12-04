import info from '../products.json' assert { type: "json" };

const gallery_column = document.querySelector(".gallery_column");
const tab__items = document.querySelectorAll(".tab__item");

function menuList(event) {
    const currentElem = event.target;
    tab__items.forEach( (tab) => {
        tab.classList.remove("tab__item-active");
    });
    currentElem.classList.add("tab__item-active");
    console.log(currentElem.textContent);
    gallery_column.replaceChildren();
}

tab__items.forEach( (tab) => {
    tab.addEventListener("click", (event) => {menuList(event);});
})