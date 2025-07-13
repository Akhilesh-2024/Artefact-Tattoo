import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const HeroBanner = () => {
  const sectionRef = useRef(null);
  const [heroData, setHeroData] = useState({
    background: '',
    headingLine1: '',
    headingLine2: '',
    subheading: '',
    buttonText: '',
    buttonLink: '',
  });

  // Fetch hero data
  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await axios.get('/api/tatto/hero');
        const hero = res.data;
        
        console.log('Hero data received:', hero); // Log the data received from the API
        
        setHeroData({
          background: hero.background || '',
          headingLine1: hero.headingLine1 || '',
          headingLine2: hero.headingLine2 || '',
          subheading: hero.subheading || '',
          buttonText: hero.buttonText || '',
          buttonLink: hero.buttonLink || '',
        });
      } catch (err) {
        console.error("Error loading hero data:", err);
      }
    };
    fetchHero();
  }, []);

  // Apply background + jQuery animations
  useEffect(() => {
    if (sectionRef.current) {
      // Prepend the server URL to the background path
      const serverUrl = import.meta.env.VITE_API_URL; // Update this to match your server URL
      const bgUrl = heroData.background 
        ? `${serverUrl}${heroData.background}?t=${new Date().getTime()}`
        : '/path/to/default/hero-image.jpg'; // Add a default fallback
      
      console.log('Hero background URL:', bgUrl); // For debugging

      sectionRef.current.style.backgroundImage = `url(${bgUrl})`;

      if (window.jQuery) {
        const $ = window.jQuery;
        $('.animate-box').waypoint(function (direction) {
          if (direction === 'down' && !$(this.element).hasClass('animated')) {
            $(this.element).addClass('item-animate');
            setTimeout(() => {
              $('.animate-box.item-animate').each(function (k) {
                const el = $(this);
                setTimeout(() => {
                  const effect = el.data('animate-effect');
                  if (effect === 'fadeIn') el.addClass('fadeIn animated');
                  else if (effect === 'fadeInLeft') el.addClass('fadeInLeft animated');
                  else if (effect === 'fadeInRight') el.addClass('fadeInRight animated');
                  else el.addClass('fadeInUp animated');
                  el.removeClass('item-animate');
                }, k * 200, 'easeInOutExpo');
              });
            }, 100);
          }
        }, {
          offset: '85%',
        });
      }
    }
  }, [heroData.background]);

  return (
    <section
      ref={sectionRef}
      className="banner-header index-banner valign bg-img bg-fixed"
      data-overlay-dark={2}
    >
      <div className="container">
        <div className="row content-justify-center">
          <div className="col-md-6 text-center">
            <div className="v-middle">
              <h4 className="animate-box" data-animate-effect="fadeInUp">
                <span>{heroData.subheading}</span>
              </h4>

              <h2 className="animate-box" data-animate-effect="fadeInUp">
                {heroData.headingLine1 && <>{heroData.headingLine1}<br /></>}
                {heroData.headingLine2 && <span>{heroData.headingLine2}</span>}
              </h2>

              {heroData.buttonText && (
                <a
                  href={heroData.buttonLink || "#0"}
                  className="btn-curve btn-1 mt-30 animate-box"
                  data-animate-effect="fadeInUp"
                >
                  <span>{heroData.buttonText}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;