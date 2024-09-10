
// document.querySelectorAll('a').forEach(link => {
//     // Add 'nofollow', 'noopener', and 'noreferrer' to each link
//     link.setAttribute('rel', 'nofollow noopener noreferrer');
// });

// document.addEventListener('DOMContentLoaded', function() {
    



function handleSliderScroll() {
    var screenWidth = window.innerWidth;
    var slide1 = document.getElementById('myDiv-1');
    var slide2 = document.getElementById('myDiv-2');
    var slide3 = document.getElementById('myDiv-3');
    var heroBg = document.querySelector('.header-bg');
    var mainSlider = document.querySelector('.slide-container');
    var afterSliderSection = document.querySelector('.after-slider-section');
    var scrollPosition = window.scrollY;

    // Slide-2 Variables
    var ball1 = document.querySelector('.ball-1');
    var ball2 = document.querySelector('.ball-2');
    var rectangle = document.querySelector('.hero-home-slide-2-rectangle');

    if (screenWidth > 430) {
        // Slide-1 and Slide-2 Animations
        if (scrollPosition > 10 && scrollPosition <= 400) {
            slide1.classList.add('scrolled-1');
            slide2.classList.add('scrolled-1-slide-2');
            ball1.classList.add('up');
            ball2.classList.add('down');
            rectangle.classList.remove('rotate-up');
            rectangle.style.opacity = "0";
            slide3.classList.remove('scrolled-1-slide-3');

            if (scrollPosition > 100 && scrollPosition < 300) {
                rectangle.classList.add('rotate-up');
                rectangle.classList.remove('expand');
            }

            if (scrollPosition > 301 && scrollPosition < 600) {
                rectangle.classList.remove('rotate-up');
                rectangle.style.opacity = "1";
                rectangle.classList.add('expand');
                slide2.classList.remove('scrolled-1-slide-2');
                slide3.classList.add('scrolled-1-slide-3');
            }
        } else {
            slide1.classList.remove('scrolled-1');
            slide2.classList.remove('scrolled-1-slide-2');
            ball1.classList.remove('up');
            ball2.classList.remove('down');
        }

        // Hide slide1 when scroll position exceeds 400px
        slide1.style.display = scrollPosition > 400 ? 'none' : 'block';

        // When scrolling past 600px
        if (scrollPosition >= 600) {
            afterSliderSection.style.display = 'block';
            afterSliderSection.style.opacity = scrollPosition >= 630 ? 1 : 0;
            mainSlider.classList.add('opacity');
            heroBg.style.position = 'static';

            // Hide hero-home-main (mainSlider) when scroll exceeds 600px
            mainSlider.style.display = 'none';
        } else {
            afterSliderSection.style.display = 'none';
            mainSlider.classList.remove('opacity');
            mainSlider.style.display = 'block'; // Ensure it is visible again
            heroBg.style.position = 'fixed';
        }
    } else {
        // For small screens, hide the main slider and hero background
        mainSlider.style.display = 'none';
        heroBg.style.display = 'none';
        afterSliderSection.style.display = 'block';
        afterSliderSection.style.opacity = 1;
    }
}

function handleResize() {
    screenWidth = window.innerWidth;

    // Reset visibility and styles on resize
    if (screenWidth <= 430) {
        document.querySelector('.slide-container').style.display = 'none';
        document.querySelector('.header-bg').style.display = 'none';
        document.querySelector('.after-slider-section').style.display = 'block';
        document.querySelector('.after-slider-section').style.opacity = 1;
        window.removeEventListener('scroll', handleSliderScroll);  // Remove scroll listener on small screens
    } else {
        document.querySelector('.slide-container').style.display = 'block';
        document.querySelector('.header-bg').style.display = 'block';
        document.querySelector('.after-slider-section').style.display = 'none';
        document.querySelector('.after-slider-section').style.opacity = 0;
        window.addEventListener('scroll', handleSliderScroll);  // Re-attach scroll listener for large screens
    }
}

// Initial load and event listeners
window.addEventListener('scroll', handleSliderScroll);
window.addEventListener('resize', handleResize);

// Mobile navigation
document.addEventListener('DOMContentLoaded', function() {
    let mobileNavLinks = document.querySelector('.mobile-nav-links');
    let mainNavbar = document.querySelector('.nav-inner');
    let hamBarTop = document.querySelector('.bar-top');
    let hamBarMiddle = document.querySelector('.bar-middle');
    let hamBarBottom = document.querySelector('.bar-bottom');

    function navShowMobile() {
        mainNavbar.classList.toggle('nav-inner-mobile');
        mobileNavLinks.classList.toggle('open');
        hamBarTop.classList.toggle('change-bar-top');
        hamBarMiddle.classList.toggle('change-bar-middle');
        hamBarBottom.classList.toggle('change-bar-bottom');
    }

    function navSize() {
        if (window.matchMedia("(min-width: 768px)").matches) {
            mainNavbar.classList.remove('nav-inner-mobile');
            mobileNavLinks.classList.remove('open');
            hamBarTop.classList.remove('change-bar-top');
            hamBarMiddle.classList.remove('change-bar-middle');
            hamBarBottom.classList.remove('change-bar-bottom');
        } 
    }

    document.querySelector('.hamburger-menu').addEventListener('click', navShowMobile);
    window.addEventListener('load', navSize);
    window.addEventListener('resize', navSize);
});





// About Section Text Slider
const textItems = Array.from(document.querySelectorAll('.text-item')).map(item => item.innerHTML);
    let currentIndex = 0;
    let scrollDirection = 'down';
    const textDisplay = document.getElementById('textDisplay');
    const sliderContainer = document.querySelector('.slider-container');

    function updateText(newText) {
        textDisplay.classList.remove('show');
        if (scrollDirection === 'up') {
            textDisplay.classList.add('hide-up');
        } else {
            textDisplay.classList.add('hide-down');
        }

        setTimeout(() => {
            textDisplay.innerHTML = newText;
            textDisplay.classList.remove('hide-up', 'hide-down');
            textDisplay.classList.add('show');
        }, 500); // Matches the CSS transition duration
    }

    function handleScroll(event) {
        if (event.deltaY < 0) {
            scrollDirection = 'up';
            currentIndex = (currentIndex - 1 + textItems.length) % textItems.length;
        } else {
            scrollDirection = 'down';
            currentIndex = (currentIndex + 1) % textItems.length;
        }
        updateText(textItems[currentIndex]);
        event.preventDefault();
    }

    function handleClick() {
        scrollDirection = 'down';
        currentIndex = (currentIndex + 1) % textItems.length;
        updateText(textItems[currentIndex]);
    }

    sliderContainer.addEventListener('mouseenter', () => {
        sliderContainer.addEventListener('wheel', handleScroll, { passive: false });
    });

    sliderContainer.addEventListener('mouseleave', () => {
        sliderContainer.removeEventListener('wheel', handleScroll);
    });

    sliderContainer.addEventListener('click', handleClick);

    updateText(textItems[currentIndex]);


// });


