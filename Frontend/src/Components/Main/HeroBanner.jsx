
import { useEffect, useRef } from 'react';

const HeroBanner = () => {
  const sectionRef = useRef(null);
  
  // Initialize background image when component mounts
  useEffect(() => {
    if (sectionRef.current) {
      const section = sectionRef.current;
      const bgImage = section.getAttribute('data-background');
      
      if (bgImage) {
        section.style.backgroundImage = `url(${bgImage})`;
      }
      
      // Initialize animations if jQuery is available
      if (window.jQuery) {
        const $ = window.jQuery;
        
        // Initialize animations for this section
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
    }
  }, []);
  
  return (
    <section
      ref={sectionRef}
      className="banner-header index-banner valign bg-img bg-fixed"
      data-overlay-dark={2}
      data-background="img/slider/1.jpg"
    >
      <div className="container">
        <div className="row content-justify-center">
          <div className="col-md-6 text-center">
            <div className="v-middle">
              <h4 className="animate-box" data-animate-effect="fadeInUp">
                <span>Welcome to Artefact Tattoo</span>
              </h4>
              <h2 className="animate-box" data-animate-effect="fadeInUp">
                Be proud of your
                <br />
                <span>New Tattoo</span>
              </h2>
              <a href="#0" className="btn-curve btn-1 mt-30 animate-box" data-animate-effect="fadeInUp">
                <span>Book Your Tattoo</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
