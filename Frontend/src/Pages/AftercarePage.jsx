import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import PromoVideoTestimonials from "../Components/Main/PromoVideoTestimonials";
import Clients from "../Components/Main/Clients";

const AftercarePage = () => {
  const bannerRef = useRef(null);
  
  // Initialize background image when component mounts
  useEffect(() => {
    if (bannerRef.current) {
      const section = bannerRef.current;
      const bgImage = section.getAttribute('data-background');
      
      if (bgImage) {
        section.style.backgroundImage = `url(${bgImage})`;
      }
    }
    
    // Force re-initialization of scripts
    setTimeout(() => {
      if (typeof window.initPageScripts === 'function') {
        window.initPageScripts('/aftercare');
      }
    }, 200);
    
    // Cleanup function
    return () => {
    };
  }, []);
  
  return (
    <>
      {/* Header Banner */}
      <section 
        ref={bannerRef}
        className="banner-header full-height valign bg-img bg-fixed" 
        data-overlay-dark="4" 
        data-background="img/slider/7.jpg"
      >
        <div className="container">
          <div className="row">
            <div className="col-md-6 text-left caption mt-90">
              <h5 className="animate-box" data-animate-effect="fadeInUp">
                <Link to="/">Home</Link> / Aftercare
              </h5>
              <h1 className="animate-box" data-animate-effect="fadeInUp">Aftercare</h1>
              <hr className="animate-box" data-animate-effect="fadeInUp" />
              <p className="animate-box" data-animate-effect="fadeInUp">
                We provide expert guidance and high-quality artistry. Tattoo viverra tristique usto vitae diam neque nivamus aestan the artine arinianu finibus viverra.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* hr */}
      <div className="line-vr-section"></div>
      
      {/* Aftercare */}
      <section className="section-padding">
        <div className="container">
          <div className="about-info">
            <div className="row">
              <div className="col-md-4">
                <div className="about-info-img mb-30">
                  <div className="img">
                    <img src="img/aftercare.jpg" className="img-fluid" alt="" />
                  </div>
                </div>
              </div>
              <div className="col-md-8">
                <h2 className="section-title2">Tattoo Aftercare</h2>
                <p>
                  We've provided these helpful aftercare instructions to ensure the health of your tattoo. Healing normally occurs within 1 to 2 weeks. Following these tattoo aftercare instructions will help to ensure its vibrance and quality as
                  it heals. Please avoid exposing it to direct sunlight.
                </p>
                <ul className="about-list list-unstyled mb-30">
                  <li>
                    <div className="about-list-icon">
                      <span className="ti-check"></span>
                    </div>
                    <div className="about-list-text">
                      <p>Following these tattoo aftercare instructions will help to ensure its vibrance and quality as it heals.</p>
                    </div>
                  </li>
                  <li>
                    <div className="about-list-icon">
                      <span className="ti-check"></span>
                    </div>
                    <div className="about-list-text">
                      <p>Wash hands thoroughly prior to touching your tattoo for any reason.</p>
                    </div>
                  </li>
                  <li>
                    <div className="about-list-icon">
                      <span className="ti-check"></span>
                    </div>
                    <div className="about-list-text">
                      <p>Pat dry with a clean cloth or towel.</p>
                    </div>
                  </li>
                  <li>
                    <div className="about-list-icon">
                      <span className="ti-check"></span>
                    </div>
                    <div className="about-list-text">
                      <p>Apply a small amount of ointment to tattoo for the first 4 days.</p>
                    </div>
                  </li>
                  <li>
                    <div className="about-list-icon">
                      <span className="ti-check"></span>
                    </div>
                    <div className="about-list-text">
                      <p>Continue this regiment until the tattoo is fully under the skin.</p>
                    </div>
                  </li>
                  <li>
                    <div className="about-list-icon">
                      <span className="ti-check"></span>
                    </div>
                    <div className="about-list-text">
                      <p>For any questions, concerns, or continued care, reach out to us online, or walk-in to the shop.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="row">
              <div className="col-md-8 mt-90">
                <h2 className="section-title2">Piercing Aftercare</h2>
                <p>
                  We've provided these helpful aftercare instructions to ensure the health of your piercing. Healing times may vary greatly from person to person though, in most cases, a well maintained piercing will feel and appear healed within
                  about 4 weeks.
                </p>
                <ul className="about-list list-unstyled mb-30">
                  <li>
                    <div className="about-list-icon">
                      <span className="ti-check"></span>
                    </div>
                    <div className="about-list-text">
                      <p>Wash your hands thoroughly prior to cleaning or touching your piercing for any reason.</p>
                    </div>
                  </li>
                  <li>
                    <div className="about-list-icon">
                      <span className="ti-check"></span>
                    </div>
                    <div className="about-list-text">
                      <p>Using mild (fragrance-free, alcohol-free) soap, gently lather around the piercing.</p>
                    </div>
                  </li>
                  <li>
                    <div className="about-list-icon">
                      <span className="ti-check"></span>
                    </div>
                    <div className="about-list-text">
                      <p>Rinse area thoroughly to remove all traces of soap from the piercing.</p>
                    </div>
                  </li>
                  <li>
                    <div className="about-list-icon">
                      <span className="ti-check"></span>
                    </div>
                    <div className="about-list-text">
                      <p>Use saline rinse 2 times daily during healing on the front and back of your piercing.</p>
                    </div>
                  </li>
                  <li>
                    <div className="about-list-icon">
                      <span className="ti-check"></span>
                    </div>
                    <div className="about-list-text">
                      <p>Refrain from unnecessary handling of the piercing.</p>
                    </div>
                  </li>
                  <li>
                    <div className="about-list-icon">
                      <span className="ti-check"></span>
                    </div>
                    <div className="about-list-text">
                      <p>For any questions, concerns, or continued care, reach out to us online, or walk-in to the shop.</p>
                    </div>
                  </li>
                  <li>
                    <div className="about-list-icon">
                      <span className="ti-check"></span>
                    </div>
                    <div className="about-list-text">
                      <p>When in doubt, wash and spray twice a day!</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="col-md-4">
                <div className="about-info-img pt-60">
                  <div className="img">
                    <img src="img/aftercare2.jpg" className="img-fluid" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Promo video - Testimonials */}
      <PromoVideoTestimonials />
      
      {/* Clients */}
      <Clients />
    </>
  );
};

export default AftercarePage;