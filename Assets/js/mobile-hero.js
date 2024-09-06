// WB Tech Hero Mobile Slider
let hslideIndex = 0;
hshowSlides();

function hshowSlides() {
    let hslides = document.querySelector('.wb-mobile-hero-slides');
    let hslideCount = document.querySelectorAll('.wb-mobile-hero-slide').length;
    
    hslideIndex++;
    if (hslideIndex > hslideCount) { hslideIndex = 1; }
    
    let hoffset = -((hslideIndex - 1) * 100) + '%';
    hslides.style.transform = `translateX(${hoffset})`;

    // setTimeout(showSlides, 8000); // Change slide every 8 seconds
}

function hprevSlide() {
    let hslideCount = document.querySelectorAll('.wb-mobile-hero-slide').length;
    hslideIndex -= 2;
    if (hslideIndex < 0) { hslideIndex = hslideCount - 1; }
    hshowSlides();
}

function hnextSlide() {
    hshowSlides();
}