// 'use strict';

const testim = document.getElementById("testim");
const testimDots = Array.from(document.getElementById("testim-dots").children);
const testimContent = Array.from(document.getElementById("testim-content").children);
const testimLeftArrow = document.getElementById("left-arrow");
const testimRightArrow = document.getElementById("right-arrow");
const testimSpeed = 4500;
let tcurrentSlide = 0;
let currentActive = 0;
let testimTimer;
let touchStartPos;
let touchEndPos;
let touchPosDiff;
const ignoreTouch = 30;

// Function to play a specific slide
function playSlide(slide) {
    testimContent.forEach((content, index) => {
        content.classList.remove("active", "inactive");
        testimDots[index].classList.remove("active");
    });

    if (slide < 0) slide = tcurrentSlide = testimContent.length - 1;
    if (slide > testimContent.length - 1) slide = tcurrentSlide = 0;

    if (currentActive !== tcurrentSlide) {
        testimContent[currentActive].classList.add("inactive");
    }
    testimContent[slide].classList.add("active");
    testimDots[slide].classList.add("active");

    currentActive = tcurrentSlide;

    clearTimeout(testimTimer);
    testimTimer = setTimeout(() => {
        playSlide(tcurrentSlide += 1);
    }, testimSpeed);
}

// Event listeners for manual navigation
testimLeftArrow.addEventListener("click", (e) => {
    e.preventDefault();
    playSlide(tcurrentSlide -= 1);
});

testimRightArrow.addEventListener("click", (e) => {
    e.preventDefault();
    playSlide(tcurrentSlide += 1);
});

testimDots.forEach((dot, index) => {
    dot.addEventListener("click", (e) => {
        e.preventDefault();
        playSlide(tcurrentSlide = index);
    });
});

// Keyboard navigation
document.addEventListener("keyup", (e) => {
    switch (e.keyCode) {
        case 37:
            e.preventDefault();
            testimLeftArrow.click();
            break;
        case 39:
            e.preventDefault();
            testimRightArrow.click();
            break;
        default:
            break;
    }
});

// Touch navigation
testim.addEventListener("touchstart", (e) => {
    touchStartPos = e.changedTouches[0].clientX;
});

testim.addEventListener("touchend", (e) => {
    touchEndPos = e.changedTouches[0].clientX;
    touchPosDiff = touchStartPos - touchEndPos;

    if (Math.abs(touchPosDiff) > ignoreTouch) {
        if (touchPosDiff > 0) {
            testimRightArrow.click();
        } else {
            testimLeftArrow.click();
        }
    }
});

// Intersection Observer for autoplay
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            playSlide(tcurrentSlide); // Start autoplay
        } else {
            clearTimeout(testimTimer); // Stop autoplay
        }
    });
}, { threshold: 0.1 });

observer.observe(testim);
