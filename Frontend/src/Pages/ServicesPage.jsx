import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import PromoVideoTestimonials from "../Components/Main/PromoVideoTestimonials";
import Clients from "../Components/Main/Clients";
import Services from '../Components/Main/Services';

const ServicesPage = () => {
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
    
    // Initialize scripts when component mounts
    
    // Force re-initialization of scripts
    setTimeout(() => {
      if (typeof window.initPageScripts === 'function') {
        window.initPageScripts('/services');
      }
    }, 200);
    
    // Cleanup function
    return () => {
      // Cleanup code if needed
    };
  }, []);
  
  return (
    <>
      {/* Header Banner */}
      <section 
        ref={bannerRef}
        className="banner-header full-height section-padding valign bg-img bg-fixed" 
        data-overlay-dark="4" 
        data-background="img/update/services.jpg"
      >
        <div className="container">
          <div className="row">
            <div className="col-md-6 caption mt-90">
              <h5 className="animate-box" data-animate-effect="fadeInUp">
                <Link to="/">Home</Link> / Services
              </h5>
              <h1 className="animate-box" data-animate-effect="fadeInUp">Our Services</h1>
              <hr className="animate-box" data-animate-effect="fadeInUp" />
              <p className="animate-box" data-animate-effect="fadeInUp">
                Lorem arena nuam enim mi obortis esen the uctus accumsan golden isuame amen auctor orci done vitae vehicula risus duise nun sapien asuam.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* hr */}
      <div className="line-vr-section"></div>
      
      {/* Services */}
      <Services />
      
      {/* Promo video - Testimonials */}
      <PromoVideoTestimonials />
      
      {/* Clients */}
      <Clients />
    </>
  );
};

export default ServicesPage;