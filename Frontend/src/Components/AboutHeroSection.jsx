
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

const AboutHeroSection = () => {
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
      className="banner-header full-height valign bg-img bg-fixed" 
      data-overlay-dark="4" 
      data-background="img/slider/3.jpg"
    >
      <div className="container">
        <div className="row">
          <div className="col-md-6 text-left caption mt-60">
            <h5 className="animate-box" data-animate-effect="fadeInUp"><Link to="/">Home</Link> / About</h5>
            <h1 className="animate-box" data-animate-effect="fadeInUp">About Artefact</h1>
            <hr className="animate-box" data-animate-effect="fadeInUp" />
            <p className="animate-box" data-animate-effect="fadeInUp">We provide expert guidance and high-quality artistry. Tattoo viverra tristique uston duis vitae diam nivamus aestan the edino vivera alacus fermen.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutHeroSection