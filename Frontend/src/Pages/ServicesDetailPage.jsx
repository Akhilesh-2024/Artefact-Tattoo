import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import PromoVideoTestimonials from "../Components/Main/PromoVideoTestimonials";
import Clients from "../Components/Main/Clients";

const ServicesDetailPage = () => {
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
    console.log("ServicesDetailPage mounted");
    
    // Force re-initialization of scripts
    setTimeout(() => {
      if (typeof window.initPageScripts === 'function') {
        window.initPageScripts('/services-page');
      }
      
      // Initialize magnific popup for gallery
      if (window.jQuery) {
        const $ = window.jQuery;
        if ($.fn.magnificPopup) {
          $('.img-zoom').magnificPopup({
            type: 'image',
            closeOnContentClick: true,
            mainClass: 'mfp-fade',
            gallery: {
              enabled: true,
              navigateByImgClick: true,
              preload: [0, 1]
            }
          });
        }
      }
    }, 200);
    
    // Cleanup function
    return () => {
      console.log("ServicesDetailPage unmounted");
    };
  }, []);
  
  return (
    <>
      {/* Header Banner */}
      <div 
        ref={bannerRef}
        className="banner-header section-padding valign bg-img bg-fixed" 
        data-overlay-dark="2" 
        data-background="img/slider/1.jpg"
      >
        <div className="container">
          <div className="row">
            <div className="col-md-6 text-left caption mt-90">
              <h5 className="animate-box" data-animate-effect="fadeInUp">
                <Link to="/">Home</Link> / Services
              </h5>
              <h1 className="animate-box" data-animate-effect="fadeInUp">Tattooing</h1>
              <hr className="animate-box" data-animate-effect="fadeInUp" />
              <p className="animate-box" data-animate-effect="fadeInUp">
                We design and build engaging, responsive websites for a wide range of businesses in Charleston and the surrounding areas.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* hr */}
      <div className="line-vr-section"></div>
      
      {/* Services Page */}
      <section className="section-padding">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <p>
                Tattoo nulla facilisi sedeuter nunc volutpat molli sapien veconseyer turpeutionyer mase libero sempe. Fusceler mollis augue sit amet hendrerit vestibulum. Duisteyerionyer venenatis lacus. Web gravida eros in the turpis international umornare. Interdum et malesu they adamale fames ac anteipsun.
              </p>
              <p>
                Lorem ipsum potenti fringilla pretium ipsum non blandit. Vivamus eget nisi non mi iaculis iaculis imperie quiseros sevin elentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis enesta mauris suscipit mis nec est aliquam, a tincidunt eros iacu suscipit risus eu ullamcoren.
              </p>
              {/* Gallery */}
              <div className="row">
                <div className="col-md-6 gallery-item animate-box" data-animate-effect="fadeInUp">
                  <a href="img/services/1.jpg" title="artefact" className="img-zoom">
                    <div className="gallery-box">
                      <div className="gallery-img">
                        <img src="img/services/1.jpg" className="img-fluid mx-auto d-block" alt="" />
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-md-6 gallery-item animate-box" data-animate-effect="fadeInUp">
                  <a href="img/services/2.jpg" title="" className="img-zoom">
                    <div className="gallery-box">
                      <div className="gallery-img">
                        <img src="img/services/2.jpg" className="img-fluid mx-auto d-block" alt="" />
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-md-6 gallery-item animate-box" data-animate-effect="fadeInUp">
                  <a href="img/services/4.jpg" title="artefact" className="img-zoom">
                    <div className="gallery-box">
                      <div className="gallery-img">
                        <img src="img/services/4.jpg" className="img-fluid mx-auto d-block" alt="" />
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-md-6 gallery-item animate-box" data-animate-effect="fadeInUp">
                  <a href="img/services/3.jpg" title="artefact" className="img-zoom">
                    <div className="gallery-box">
                      <div className="gallery-img">
                        <img src="img/services/3.jpg" className="img-fluid mx-auto d-block" alt="" />
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Prev-Next Post */}
      <section className="artefact-post-prev-next">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="d-sm-flex align-items-center justify-content-between">
                <div className="artefact-post-prev-next-left">
                  <Link to="/services-page"><i className="ti-arrow-left"></i> Piercing</Link>
                </div>
                <Link to="/services"><i className="ti-layout-grid3-alt"></i></Link>
                <div className="artefact-post-prev-next-right">
                  <Link to="/services-page">Laser Removal <i className="ti-arrow-right"></i></Link>
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

export default ServicesDetailPage;