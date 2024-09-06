$(document).ready(function() {
    var deg = 0;
    var isDragging = false;
    var previousX = 0;
    var startDeg = 0;
    var panelSize = 250;
    
    function updatePanelSize() {
        var width = $(window).width();
        if (width <= 320) {
            panelSize = 160;
        } else if (width <= 375) {
            panelSize = 170;
        } else if (width <= 425) {
            panelSize = 200;
        } else {
            panelSize = 250;
        }
    }
    
    function setupCarousel() {
        updatePanelSize();
        var numberOfPanels = $('.pane').length - 1;
        var tz = Math.round((panelSize / 2) / Math.tan(((Math.PI * 2) / numberOfPanels) / 2)); // translateZ
        var rY = 360 / numberOfPanels; // rotateY
        var color = ["#ffff", "#ffff", "#ffff", "#ffff", "#ffff"];
        
        deg = 0;
        $('.pane').each(function(i, obj) {
            var rand = color[Math.floor(Math.random() * color.length)];
            $(this).css('background-color', rand);
            if (i != $('.pane').length - 1) {
                $(this).css('transform', 'rotateY(' + deg + 'deg) translateZ(' + tz + 'px)');
            } else {
                $(this).css({
                    'border-radius': '50%',
                    'height': '170px'
                });
            }
            deg += rY;
        });
    }
    
    function setupEvents() {
        $('#carousel').on('mousedown touchstart', function(event) {
            isDragging = true;
            previousX = event.clientX || event.originalEvent.touches[0].clientX;
            startDeg = deg;
            event.preventDefault(); // Prevent default action (scrolling)
        });

        $(document).on('mousemove touchmove', function(event) {
            if (isDragging) {
                var currentX = event.clientX || event.originalEvent.touches[0].clientX;
                var movementX = currentX - previousX;
                deg = startDeg + (movementX / 5); // Adjust sensitivity if necessary
                $('#carousel').css('transform', 'rotateY(' + deg + 'deg)');
                event.preventDefault(); // Prevent default action (scrolling)
                event.stopPropagation(); // Stop event propagation to parent elements
            }
        });

        $(document).on('mouseup touchend', function() {
            isDragging = false;
        });

        $('#carousel').on('mousewheel', function(event) {
            var numberOfPanels = $('.pane').length - 1;
            var rY = 360 / numberOfPanels; // rotateY
            if (event.originalEvent.wheelDelta / 120 > 0) {
                // Scrolling up
                deg -= rY;
            } else {
                // Scrolling down
                deg += rY;
            }
            $('#carousel').css('transform', 'rotateY(' + deg + 'deg)');
            event.preventDefault(); // Prevent default action (scrolling)
            event.stopPropagation(); // Stop event propagation to parent elements
        });

        $('#next').on('click', function() {
            var numberOfPanels = $('.pane').length - 1;
            var rY = 360 / numberOfPanels; // rotateY
            deg -= rY;
            $('#carousel').css('transform', 'rotateY(' + deg + 'deg)');
        });

        $('#prev').on('click', function() {
            var numberOfPanels = $('.pane').length - 1;
            var rY = 360 / numberOfPanels; // rotateY
            deg += rY;
            $('#carousel').css('transform', 'rotateY(' + deg + 'deg)');
        });
    }
    
    setupCarousel();
    setupEvents();

    $(window).resize(function() {
        setupCarousel();
    });
});

  
  
  
  document.addEventListener('DOMContentLoaded', function() {
  
  // Extract details from the first slide
  var firstSlide = document.querySelector('.pane');
  if (firstSlide) {
    var title = firstSlide.querySelector('.slider-3D-text h1').textContent;
    var description = firstSlide.querySelector('.slider-3D-text p').textContent;
  
    // Update the details container
    var detailTitle = document.getElementById('detail-title');
    var detailDescription = document.getElementById('detail-description');
    if (detailTitle && detailDescription) {
      detailTitle.textContent = title;
      detailDescription.textContent = description;
    }
  }
  
  // Add event listener for slide clicks
  var slides = document.querySelectorAll('.pane');
  slides.forEach(function(slide) {
    slide.addEventListener('click', function() {
      // Extract details from the clicked slide
      var title = this.querySelector('.slider-3D-text h1').textContent;
      var description = this.querySelector('.slider-3D-text p').textContent;
  
      // Update the details container
      var detailTitle = document.getElementById('detail-title');
      var detailDescription = document.getElementById('detail-description');
      if (detailTitle && detailDescription) {
        detailTitle.textContent = title;
        detailDescription.textContent = description;
      }
    });
  });
  
  });
  