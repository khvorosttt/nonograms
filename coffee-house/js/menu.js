import info from '../products.json' assert { type: "json" };
import galleryItem from './galleryItem.js';

const gallery_column = document.querySelector(".gallery_column");
const tab__items = document.querySelectorAll(".tab__item");
const addCards = document.querySelector(".add__cards");
const addCardsStyle = getComputedStyle(addCards);
let currentCategory = "coffee";
let categoryData = [];
let categoryDataShow = [];
const stepShow = 4;

function menuList(event) {
    categoryDataShow = [];
    const currentElem = event.currentTarget;
    tab__items.forEach( (tab) => {
        tab.classList.remove("tab__item-active");
    });
    currentElem.classList.add("tab__item-active");
    currentCategory = currentElem.textContent.toLowerCase().trim();
    gallery_column.replaceChildren();
    categoryData = info.filter(item => item.category === currentCategory);
    let displayAddButton = addCardsStyle.display;
    if(displayAddButton == 'none') {
        console.log('klmjnhbgvfcd');
        categoryData.forEach( (item) => {
            categoryDataShow.push(item);
            gallery_column.insertAdjacentHTML('beforeend',galleryItem(item).toString());
        })
    } else {
        for(let i=0; i<stepShow; i++) {
            categoryDataShow.push(categoryData[i]);
            gallery_column.insertAdjacentHTML('beforeend',galleryItem(categoryData[i]).toString());
        }
    }
    if(categoryDataShow.length === categoryData.length) {
        addCards.style.display = 'none';
    } else {
        addCards.style.display = '';
        console.log('////////////////////');
    }

}

function galleryItems() {

}

tab__items.forEach( (tab) => {
    tab.addEventListener("click", (event) => {menuList(event);});
})