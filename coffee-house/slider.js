const previous = document.querySelector("#previous");
const next = document.querySelector("#next");
const rowSlider = document.getElementById("row__slider");
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;
let shift = 0;
const rowSliderStyle = getComputedStyle(rowSlider);
const lastSlide = slides.length - 1;
let slideSize = slides[0].clientWidth + parseInt(rowSliderStyle.getPropertyValue('gap'),10);


function previousSlide() {
    currentSlide = (currentSlide === 0) ? lastSlide : (currentSlide - 1);
    if (currentSlide === lastSlide) {
        shift -= currentSlide * slideSize;
    } else {
        shift += slideSize;
    }
    rowSlider.style.transform = `translate(${shift}px)`;
}

function nextSlide() {
    currentSlide = (currentSlide === lastSlide) ? 0 : (currentSlide + 1);
    if (currentSlide === 0) {
        shift += (lastSlide) * slideSize;
    } else {
        shift -= slideSize;
    }
    rowSlider.style.transform = `translate(${shift}px)`;
}

previous.addEventListener("click", previousSlide);
next.addEventListener("click", nextSlide);