/**
 * Global script initialization function for React SPA
 * This function will be called after each route change
 * @param {string} path - The current path
 */
window.initPageScripts = function(path) {
  console.log("Initializing page scripts for path:", path || window.location.pathname);
  
  if (window.jQuery) {
    const $ = window.jQuery;
    
    // Initialize background images
    var pageSection = $(".bg-img, section");
    pageSection.each(function() {
      if ($(this).attr("data-background")) {
        $(this).css("background-image", "url(" + $(this).data("background") + ")");
      }
    });
    
    // Initialize animations
    var contentWayPoint = function() {
      var i = 0;
      $('.animate-box').waypoint(function(direction) {
        if (direction === 'down' && !$(this.element).hasClass('animated')) {
          i++;
          $(this.element).addClass('item-animate');
          setTimeout(function() {
            $('body .animate-box.item-animate').each(function(k) {
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
    };
    contentWayPoint();
    
    // Initialize owl carousels
    if ($.fn.owlCarousel) {
      // Testimonials carousel
      $('.testimonials .owl-carousel').owlCarousel({
        loop: true,
        margin: 30,
        mouseDrag: true,
        autoplay: false,
        dots: false,
        nav: false,
        responsiveClass: true,
        responsive: {
          0: { items: 1 },
          600: { items: 1 },
          1000: { items: 1 }
        }
      });
      
      // Team carousel
      $('.team .owl-carousel').owlCarousel({
        loop: true,
        margin: 30,
        mouseDrag: true,
        autoplay: false,
        dots: true,
        autoplayHoverPause: true,
        nav: false,
        responsiveClass: true,
        responsive: {
          0: { items: 1 },
          600: { items: 1 },
          1000: { items: 1 }
        }
      });
      
      // Clients carousel
      $('.clients .owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        mouseDrag: true,
        autoplay: true,
        dots: false,
        responsiveClass: true,
        responsive: {
          0: { margin: 10, items: 3 },
          600: { items: 4 },
          1000: { items: 5 }
        }
      });
      
      // Gallery carousel
      $('.gallery .owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        mouseDrag: true,
        autoplay: false,
        dots: false,
        nav: false,
        responsiveClass: true,
        responsive: {
          0: { items: 1 },
          600: { items: 2 },
          1000: { items: 3 }
        }
      });
      
      // Blog carousel
      $('.blog .owl-carousel').owlCarousel({
        loop: true,
        margin: 30,
        mouseDrag: true,
        autoplay: false,
        dots: true,
        nav: false,
        responsiveClass: true,
        responsive: {
          0: { items: 1 },
          600: { items: 2 },
          1000: { items: 2 }
        }
      });
    }
    
    // Initialize magnific popup
    if ($.fn.magnificPopup) {
      $(".img-zoom").magnificPopup({
        type: "image",
        closeOnContentClick: true,
        mainClass: "mfp-fade",
        gallery: {
          enabled: true,
          navigateByImgClick: true,
          preload: [0, 1]
        }
      });
      
      $('.magnific-youtube, .magnific-vimeo, .magnific-custom').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 300,
        preloader: false,
        fixedContentPos: false
      });
    }
    
    // Update navbar active state based on current path
    const currentPath = path || window.location.pathname;
    $('.navbar-nav .nav-link').removeClass('active');
    if (currentPath === '/') {
      
      // Special handling for home page
      console.log("Special handling for home page");
      
      // Make sure the hero banner is visible
      $('.banner-header').css('opacity', '1');
      
      // Reinitialize any sliders on the home page
      if ($.fn.owlCarousel) {
        setTimeout(function() {
          $('.slider .owl-carousel, .slider-fade .owl-carousel').each(function() {
            try {
              $(this).owlCarousel('destroy');
              $(this).owlCarousel({
                items: 1,
                loop: true,
                dots: false,
                margin: 0,
                autoplay: false,
                autoplayTimeout: 6000,
                smartSpeed: 500,
                nav: true,
                navText: ['<i class="ti-angle-left" aria-hidden="true"></i>', '<i class="ti-angle-right" aria-hidden="true"></i>']
              });
            } catch (e) {
              console.log("Error reinitializing slider:", e);
            }
          });
        }, 100);
      }
    } else {
    }
    
    // Navbar scrolling background
    $(window).trigger('scroll');
  }
};