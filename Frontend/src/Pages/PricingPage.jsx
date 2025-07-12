import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import PromoVideoTestimonials from "../Components/Main/PromoVideoTestimonials";
import Clients from "../Components/Main/Clients";

const PricingPage = () => {
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
    console.log("PricingPage mounted");
    
    // Force re-initialization of scripts
    setTimeout(() => {
      if (typeof window.initPageScripts === 'function') {
        window.initPageScripts('/pricing');
      }
    }, 200);
    
    // Cleanup function
    return () => {
      console.log("PricingPage unmounted");
    };
  }, []);
  
  return (
    <>
      {/* Header Banner */}
      <section 
        ref={bannerRef}
        className="banner-header full-height section-padding valign bg-img bg-fixed" 
        data-overlay-dark="4" 
        data-background="img/slider/2.jpg"
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-7 text-center caption mt-90">
              <h5 className="animate-box" data-animate-effect="fadeInUp">
                <Link to="/">Home</Link> / Pricing
              </h5>
              <h1 className="animate-box" data-animate-effect="fadeInUp">Pricing List</h1>
              <hr className="animate-box" data-animate-effect="fadeInUp" />
              <p className="animate-box" data-animate-effect="fadeInUp">
                Choose the plan that's right for you. Please contact for detailed information. Tattoo miss silver viverra estiue in the duis vitae dias the nesueten niva aestan.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* hr */}
      <div className="line-vr-section"></div>
      
      {/* Price */}
      <section className="price-banner menu-book section-padding">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-md-7 valign">
              <div className="content">
                <div className="menu-list">
                  <div className="item">
                    <div className="flex">
                      <div className="title">Tattooing</div>
                      <div className="price">$60</div>
                    </div>
                    <div className="dots"></div>
                  </div>
                </div>
                <div className="menu-list">
                  <div className="item">
                    <div className="flex">
                      <div className="title">Tattoo Cover Up</div>
                      <div className="price">$45</div>
                    </div>
                    <div className="dots"></div>
                  </div>
                </div>
                <div className="menu-list">
                  <div className="item">
                    <div className="flex">
                      <div className="title">Piercing</div>
                      <div className="price">$30</div>
                    </div>
                    <div className="dots"></div>
                  </div>
                </div>
                <div className="menu-list">
                  <div className="item">
                    <div className="flex">
                      <div className="title">Laser Removal</div>
                      <div className="price">$75</div>
                    </div>
                    <div className="dots"></div>
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

export default PricingPage;