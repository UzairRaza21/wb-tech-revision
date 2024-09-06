let slideIndex = 1;
    let numberIndex = 1;
    const wslides = document.querySelectorAll('.slide');
    const nextButton = document.querySelector('.next-button');
    let autoPlayInterval = setInterval(() => plusSlides(1), 300000000); // Change slide every 3 seconds

    function showSlides(n) {
        if (n > wslides.length) slideIndex = 1;
        if (n < 1) slideIndex = wslides.length;
        
        wslides.forEach(slide => slide.style.display = 'none');
        
        wslides[slideIndex - 1].style.display = 'flex';
    }

    function currentSlide(n) {
        clearInterval(autoPlayInterval);
        showSlides(slideIndex = n);
        autoPlayInterval = setInterval(() => plusSlides(1), 300000000);
    }

    function plusSlides(n) {
        clearInterval(autoPlayInterval);
        showSlides(slideIndex += n);
        updateNumberSequence(numberIndex += n);
       autoPlayInterval = setInterval(() => plusSlides(1), 300000000);
    }

    function updateNumberSequence(n) {
        if (n > wslides.length) numberIndex = 1;
        if (n < 1) numberIndex = wslides.length;
        nextButton.textContent = numberIndex;
    }

    nextButton.addEventListener('click', () => {
        plusSlides(1);
    });


    showSlides(slideIndex);
    updateNumberSequence(numberIndex);