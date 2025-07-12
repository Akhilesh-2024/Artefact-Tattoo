import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import PromoVideoTestimonials from "../Components/Main/PromoVideoTestimonials";
import Clients from "../Components/Main/Clients";

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
    console.log("ServicesPage mounted");
    
    // Force re-initialization of scripts
    setTimeout(() => {
      if (typeof window.initPageScripts === 'function') {
        window.initPageScripts('/services');
      }
    }, 200);
    
    // Cleanup function
    return () => {
      console.log("ServicesPage unmounted");
    };
  }, []);
  
  return (
    <>
      {/* Header Banner */}
      <section 
        ref={bannerRef}
        className="banner-header full-height section-padding valign bg-img bg-fixed" 
        data-overlay-dark="4" 
        data-background="img/slider/4.jpg"
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
      <section className="services section-padding">
        <div className="container">
          <div className="row mb-30">
            <div className="col-md-6 animate-box" data-animate-effect="fadeInLeft">
              <div className="img left">
                <Link to="/services-page"><img src="img/services/2.jpg" alt="" /></Link>
              </div>
            </div>
            <div className="col-md-6 valign animate-box" data-animate-effect="fadeInRight">
              <div className="content">
                <div className="date">
                  <h1>01</h1>
                </div>
                <div className="cont">
                  <h5>Tattooing</h5>
                  <p>
                    Lorem arena nuam enim mi obortis esen the uctus accumsan golden alisuame amet auctor orci done vitae vehicula risus duise nun sapien accumsan imauris ullamcorper rutrum asuam.
                  </p>
                  <Link to="/services-page" className="btn-curve btn-1 mt-10">
                    <span>Read More</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="row mb-30">
            <div className="col-md-6 order2 valign animate-box" data-animate-effect="fadeInLeft">
              <div className="content">
                <div className="date">
                  <h1>02</h1>
                </div>
                <div className="cont">
                  <h5>Piercing</h5>
                  <p>
                    Lorem arena nuam enim mi obortis esen the uctus accumsan golden alisuame amet auctor orci done vitae vehicula risus duise nun sapien accumsan imauris ullamcorper rutrum asuam.
                  </p>
                  <Link to="/services-page" className="btn-curve btn-1 mt-10">
                    <span>Read More</span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6 order1 animate-box" data-animate-effect="fadeInRight">
              <div className="img left">
                <Link to="/services-page"><img src="img/services/4.jpg" alt="" /></Link>
              </div>
            </div>
          </div>
          <div className="row mb-30">
            <div className="col-md-6 animate-box" data-animate-effect="fadeInLeft">
              <div className="img left">
                <Link to="/services-page"><img src="img/services/1.jpg" alt="" /></Link>
              </div>
            </div>
            <div className="col-md-6 valign animate-box" data-animate-effect="fadeInRight">
              <div className="content">
                <div className="date">
                  <h1>03</h1>
                </div>
                <div className="cont">
                  <h5>Laser Removal</h5>
                  <p>
                    Lorem arena nuam enim mi obortis esen the uctus accumsan golden alisuame amet auctor orci done vitae vehicula risus duise nun sapien accumsan imauris ullamcorper rutrum asuam.
                  </p>
                  <Link to="/services-page" className="btn-curve btn-1 mt-10">
                    <span>Read More</span>
                  </Link>
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

export default ServicesPage;