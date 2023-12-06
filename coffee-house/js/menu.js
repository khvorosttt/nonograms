import info from '../data/products.json' assert { type: "json" };
import galleryItem from './galleryItem.js';
import * as modal  from './modal.js'
const gallery_column = document.querySelector(".gallery_column");
const tab__items = document.querySelectorAll(".tab__item");
const addCards = document.querySelector(".add__cards");
const addCardsStyle = getComputedStyle(addCards);
let currentCategory = "coffee";
let categoryData = info.filter(item => item.category === currentCategory);
let categoryDataShow = [];
const stepShow = 4;
let galleryItems;

function menuList(event) {
    categoryDataShow = [];
    const currentElem = event.currentTarget;
    tab__items.forEach( (tab) => {
        tab.classList.remove("tab__item-active");
    });
    currentElem.classList.add("tab__item-active");
    currentCategory = currentElem.textContent.toLowerCase().trim();
    categoryData = info.filter(item => item.category === currentCategory);
    resize();
}

function resize() {
    let sizeWindow = document.documentElement.getBoundingClientRect().width;
    gallery_column.replaceChildren();
    categoryDataShow = [];
    if(sizeWindow < 1090){
        moreCards();
    } else {
        addCards.classList.remove('add__cards-active');
        categoryData.forEach( (item) => {
            categoryDataShow.push(item);
            gallery_column.insertAdjacentHTML('beforeend',galleryItem(item).toString());
        })
    }
    galleryItems = document.querySelectorAll('.gallery-item');
}

function moreCards() {
    const startIndex = categoryDataShow.length;
    const endIndex = categoryDataShow.length + stepShow;
    for(let i=startIndex; i<endIndex; i++) {
        categoryDataShow.push(categoryData[i]);
        gallery_column.insertAdjacentHTML('beforeend',galleryItem(categoryData[i]).toString());
    }
    if(categoryDataShow.length!=categoryData.length) {
        addCards.classList.add('add__cards-active');
    } else {
        addCards.classList.remove('add__cards-active');
    }
}

window.addEventListener('resize', resize);
tab__items.forEach( (tab) => {
    tab.addEventListener("click", (event) => {menuList(event);});
});
addCards.addEventListener("click", moreCards);

resize();

galleryItems.forEach( (item) => {
    item.addEventListener('click', (event) => {
        const item_name = event.currentTarget.querySelector('.item__name').textContent.trim();
        const item = info.filter(product => product.name === item_name);
        modal.showModal(item[0]);});
})

// function showModal() {
//     console.log(galleryItems);
// }