document.addEventListener('DOMContentLoaded', (event) => {
    const slides = document.querySelectorAll('.grow');
    
    slides.forEach((slide, index) => {
        slide.addEventListener('mouseover', () => {

            // Check if it's not the last slide
            if (index === slides.length - 1) {
              const prevSlide = slides[index - 1];
             prevSlide.classList.add('hidden');
            }       


            if (index < slides.length - 1) {
                const nextSlide = slides[index + 1];
                nextSlide.classList.add('hidden');
            }
        });

        slide.addEventListener('mouseout', () => {

            // Check if it's the last slide
        if (index === slides.length - 1) {
        const prevSlide = slides[index - 1];
        prevSlide.classList.remove('hidden');
        }
            if (index < slides.length - 1) {
                const nextSlide = slides[index + 1];
                nextSlide.classList.remove('hidden');
            }
        });
    });
});


// USA Slider

let usaslideIndex = 0;
showSlides();

function showSlides() {
    let slides = document.querySelector('.usa-service-mobile-slides');
    let slideCount = document.querySelectorAll('.usa-service-mobile-slide').length;
    
    usaslideIndex++;
    if (usaslideIndex > slideCount) { usaslideIndex = 1; }
    
    let offset = -((usaslideIndex - 1) * 100) + '%';
    slides.style.transform = `translateX(${offset})`;

    // setTimeout(showSlides, 8000); // Change slide every 8 seconds
}

function prevSlide() {
    let slideCount = document.querySelectorAll('.usa-service-mobile-slide').length;
    usaslideIndex -= 2;
    if (usaslideIndex < 0) { usaslideIndex = slideCount - 1; }
    showSlides();
}

function nextSlide() {
    showSlides();
}





let usaServiceSlides = document.querySelectorAll(".usa-service-mobile-slide");

usaServiceSlides.forEach(slide => {
    slide.addEventListener("mouseenter", () => {
        let text = slide.querySelector(".usa-service-mobile-text");
        text.style.opacity = 1;
    });

    slide.addEventListener("mouseleave", () => {
        let text = slide.querySelector(".usa-service-mobile-text");
        text.style.opacity = 0;
    });
});