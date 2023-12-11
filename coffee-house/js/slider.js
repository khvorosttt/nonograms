const previous = document.querySelector("#previous");
const next = document.querySelector("#next");
const rowSlider = document.getElementById("row__slider");
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;
let shift = 0;
const rowSliderStyle = getComputedStyle(rowSlider);
let gapWidth = parseInt(rowSliderStyle.getPropertyValue('gap'),10)
const lastSlide = slides.length - 1;
let slideWidth = slides[0].clientWidth;
let slideSize = slideWidth + gapWidth;
const progress = document.querySelectorAll(".progress");
const minDist = slideWidth / 4;

function previousSlide() {
    progress[currentSlide].classList.remove("active-progress");
    currentSlide = (currentSlide === 0) ? lastSlide : (currentSlide - 1);
    if (currentSlide === lastSlide) {
        shift -= currentSlide * slideSize;
    } else {
        shift += slideSize;
    }
    rowSlider.style.transform = `translate(${shift}px)`;
    progress[currentSlide].classList.add("active-progress");
}

function nextSlide() {
    progress[currentSlide].classList.remove("active-progress");
    currentSlide = (currentSlide === lastSlide) ? 0 : (currentSlide + 1);
    if (currentSlide === 0) {
        shift += lastSlide * slideSize;
    } else {
        shift -= slideSize;
    }
    rowSlider.style.transform = `translate(${shift}px)`;
    progress[currentSlide].classList.add("active-progress");
}

function touchStart(event) {
    progress[currentSlide].style.animationPlayState = "paused";
    startTouch = event.touches[0].clientX;
}

function touchEnd(event) {
    endTouch = event.changedTouches[0].clientX;
    let distance = startTouch - endTouch;
    if(Math.abs(distance)<minDist) {
        progress[currentSlide].style.animationPlayState = "running";
    } else {
        if(distance>0){
            progress[currentSlide].style.animationPlayState = "running";
            nextSlide();
        } else {
            progress[currentSlide].style.animationPlayState = "running";
            previousSlide();
        }
    }
}

previous.addEventListener("click", () => {
    previousSlide();
});
next.addEventListener("click", () => {
    nextSlide();
});
progress.forEach ( (progressItem) => {
    progressItem.addEventListener("animationend", nextSlide);
});
rowSlider.addEventListener("mouseover", () => {
    progress[currentSlide].style.animationPlayState = "paused";
});
rowSlider.addEventListener("mouseout", () => {
    progress[currentSlide].style.animationPlayState = "running";
});
rowSlider.addEventListener("touchstart", (event) => {touchStart(event)});
rowSlider.addEventListener("touchend", (event) => {touchEnd(event)});

