document.addEventListener("DOMContentLoaded", function() {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let slideWidth = slides[0].offsetWidth;
    const slideMargin = parseInt(window.getComputedStyle(slides[0]).marginRight) || 0;
    let currentIndex = 1; // Start from the first original slide

    function setSliderPosition() {
        slider.style.transition = 'none';
        slider.style.transform = `translateX(-${(slideWidth + slideMargin) * currentIndex}px)`;
        setTimeout(() => {
            slider.style.transition = 'transform 0.5s ease';
        });
    }

    slider.style.transform = `translateX(-${(slideWidth + slideMargin) * currentIndex}px)`;

    window.addEventListener('resize', () => {
        slideWidth = slides[0].offsetWidth;
        setSliderPosition();
    });

    function slide(direction) {
        if (direction === 'next') {
            currentIndex++;
            if (currentIndex === slides.length - 3) {
                setTimeout(() => {
                    currentIndex = 3;
                    setSliderPosition();
                }, 500);
            }
        } else if (direction === 'prev') {
            currentIndex--;
            if (currentIndex < 1) {
                setTimeout(() => {
                    currentIndex = slides.length - 5;
                    setSliderPosition();
                }, 500);
            }
        }
        slider.style.transition = 'transform 0.5s ease';
        slider.style.transform = `translateX(-${(slideWidth + slideMargin) * currentIndex}px)`;
    }

    prevBtn.addEventListener('click', () => slide('prev'));
    nextBtn.addEventListener('click', () => slide('next'));

    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID = 0;

    slider.addEventListener('mousedown', startDrag);
    slider.addEventListener('touchstart', startDrag);
    slider.addEventListener('mouseup', endDrag);
    slider.addEventListener('mouseleave', endDrag);
    slider.addEventListener('touchend', endDrag);
    slider.addEventListener('mousemove', drag);
    slider.addEventListener('touchmove', drag);

    function startDrag(e) {
        isDragging = true;
        startPos = getPositionX(e);
        animationID = requestAnimationFrame(animation);
        slider.style.cursor = 'grabbing';
    }

    function endDrag() {
        isDragging = false;
        cancelAnimationFrame(animationID);
        const movedBy = currentTranslate - prevTranslate;
        if (movedBy < -100) slide('next');
        else if (movedBy > 100) slide('prev');
        else slider.style.transform = `translateX(-${(slideWidth + slideMargin) * currentIndex}px)`;
        prevTranslate = currentTranslate;
        slider.style.cursor = 'grab';
    }

    function drag(e) {
        if (isDragging) {
            const currentPosition = getPositionX(e);
            currentTranslate = prevTranslate + currentPosition - startPos;
        }
    }

    function getPositionX(event) {
        return event.type.includes('mouse') ? event.clientX : event.touches[0].clientX;
    }

    function animation() {
        slider.style.transform = `translateX(${currentTranslate}px)`;
        if (isDragging) requestAnimationFrame(animation);
    }
});