const previous = document.querySelector("#previous");
const next = document.querySelector("#next");
const rowSlider = document.getElementById("row__slider");
const slides = document.querySelectorAll('.slide');
const progress = document.querySelectorAll(".progress");
let currentSlide = 0;
let shift = 0;
const rowSliderStyle = getComputedStyle(rowSlider);
const lastSlide = slides.length - 1;
let slideSize = slides[0].clientWidth + parseInt(rowSliderStyle.getPropertyValue('gap'),10);
console.log(rowSlider.clientWidth);
const slideTime = 5000;
let slideInterval;
const stepProgress = 10;
let progressSize = 0;
const finishProgress = 100;
const progressTime = slideTime / stepProgress;
let progressInterval;

function progressSlide(slide) {
    if (progressSize < finishProgress) {
        progressSize += stepProgress;
        progress[slide].style.width = `${progressSize}%`;
    } else {
        progressSize = 0;
        progress[slide].style.width = '0%';
        nextSlide();
        startInterval();
    }
}

function previousSlide() {
    progress[currentSlide].style.width = "0%";
    progressSize = 0;
    currentSlide = (currentSlide === 0) ? lastSlide : (currentSlide - 1);
    if (currentSlide === lastSlide) {
        shift -= currentSlide * slideSize;
    } else {
        shift += slideSize;
    }
    rowSlider.style.transform = `translate(${shift}px)`;
}

function nextSlide() {
    progress[currentSlide].style.width = "0%";
    progressSize = 0;
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
rowSlider.addEventListener("touchstart", stopInterval);
rowSlider.addEventListener("touchend", startInterval);

startInterval();
