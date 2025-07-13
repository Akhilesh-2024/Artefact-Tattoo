/**
 * Utility function to initialize background images
 * This can be called from any component that needs to set background images
 */
export const initBackgroundImages = () => {
  // Get all elements with bg-img class or section elements
  const elements = document.querySelectorAll('.bg-img, section');
  
  // Loop through each element
  elements.forEach(element => {
    // Check if the element has a data-background attribute
    const bgImage = element.getAttribute('data-background');
    if (bgImage) {
      // Set the background image
      element.style.backgroundImage = `url(${bgImage})`;
    }
  });
};

/**
 * Utility function to initialize animations
 * This can be called from any component that needs to initialize animations
 */
export const initAnimations = () => {
  if (window.jQuery) {
    const $ = window.jQuery;
    
    // Initialize animations
    $('.animate-box').waypoint(function(direction) {
      if (direction === 'down' && !$(this.element).hasClass('animated')) {
        $(this.element).addClass('item-animate');
        setTimeout(function() {
          $('.animate-box.item-animate').each(function(k) {
            var el = $(this);
            setTimeout(function() {
              var effect = el.data('animate-effect');
              if (effect === 'fadeIn') {
                el.addClass('fadeIn animated');
              } else if (effect === 'fadeInLeft') {
                el.addClass('fadeInLeft animated');
              } else if (effect === 'fadeInRight') {
                el.addClass('fadeInRight animated');
              } else {
                el.addClass('fadeInUp animated');
              }
              el.removeClass('item-animate');
            }, k * 200, 'easeInOutExpo');
          });
        }, 100);
      }
    }, {
      offset: '85%'
    });
  }
};