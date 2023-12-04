const previous = document.querySelector("#previous");
const next = document.querySelector("#next");
const rowSlider = document.getElementById("row__slider");
const slides = document.querySelectorAll('.slide');
const progress = document.querySelectorAll(".progress");
let currentSlide = 0;
let shift = 0;
const rowSliderStyle = getComputedStyle(rowSlider);
let gapWidth = parseInt(rowSliderStyle.getPropertyValue('gap'),10)
const lastSlide = slides.length - 1;
let slideWidth = slides[0].clientWidth;
let slideSize = slideWidth + gapWidth;
const slideTime = 5000;
let slideInterval;
const stepProgress = 10;
let progressSize = 0;
const startProgress = 0;
const finishProgress = 100;
const progressTime = slideTime / stepProgress;
let progressInterval;
let startTouch;
let endTouch;
const minDist = slideWidth / 4;


function progressSlide(slide) {
    if (progressSize < finishProgress) {
        progressSize += stepProgress;
        progress[slide].style.width = `${progressSize}%`;
    } else {
        progressSize = startProgress;
        progress[slide].style.width = `${startProgress}%`;
        nextSlide();
        startInterval();
    }
}

function previousSlide() {
    progress[currentSlide].style.width = `${startProgress}%`;
    progressSize = startProgress;
    currentSlide = (currentSlide === 0) ? lastSlide : (currentSlide - 1);
    if (currentSlide === lastSlide) {
        shift -= currentSlide * slideSize;
    } else {
        shift += slideSize;
    }
    rowSlider.style.transform = `translate(${shift}px)`;
}

function nextSlide() {
    progress[currentSlide].style.width = `${startProgress}%`;
    progressSize = startProgress;
    currentSlide = (currentSlide === lastSlide) ? 0 : (currentSlide + 1);
    if (currentSlide === 0) {
        shift += lastSlide * slideSize;
    } else {
        shift -= slideSize;
    }
    rowSlider.style.transform = `translate(${shift}px)`;
}

function startInterval() {
    stopInterval();
    progressInterval = setInterval( () => {
        progressSlide(currentSlide);
    }, progressTime);
    slideInterval = setInterval( () => {
        nextSlide();
    }, slideTime);
}

function stopInterval() {
    clearInterval(progressInterval);
    clearInterval(slideInterval);
}

function touchStart(event) {
    stopInterval();
    startTouch = event.touches[0].clientX;
}

function touchEnd(event) {
    endTouch = event.changedTouches[0].clientX;
    let distance = startTouch - endTouch;
    if(Math.abs(distance)<minDist) {
        startInterval();
    } else {
        if(distance>0){
            startInterval();
            nextSlide();
        } else {
            startInterval();
            previousSlide();
        }
    }
}

previous.addEventListener("click", () => {
    stopInterval();
    startInterval();
    previousSlide();
});
next.addEventListener("click", () => {
    stopInterval();
    startInterval();
    nextSlide();
});
rowSlider.addEventListener("mouseover",stopInterval);
rowSlider.addEventListener("mouseout", startInterval);
rowSlider.addEventListener("touchstart", (event) => {touchStart(event)});
rowSlider.addEventListener("touchend", (event) => {touchEnd(event)});

startInterval();
