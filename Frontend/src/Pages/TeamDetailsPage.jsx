import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import PromoVideoTestimonials from "../Components/Main/PromoVideoTestimonials";
import Clients from "../Components/Main/Clients";

const TeamDetailsPage = () => {
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
        window.initPageScripts('/team-details');
      }
      
      // Initialize owl carousel for gallery
      if (window.jQuery) {
        const $ = window.jQuery;
        if ($.fn.owlCarousel) {
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
        }
        
        // Initialize magnific popup
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
      // Cleanup code if needed
    };
  }, []);
  
  return (
    <>
      {/* Header Banner */}
      <section 
        ref={bannerRef}
        className="banner-header section-padding valign bg-img bg-fixed" 
        data-overlay-dark="2" 
        data-background="img/slider/1.jpg"
      >
        <div className="container">
          <div className="row">
            <div className="col-md-6 caption mt-90">
              <h5 className="animate-box" data-animate-effect="fadeInUp">
                <Link to="/">Home</Link> / Team
              </h5>
              <h1 className="animate-box" data-animate-effect="fadeInUp">Andreas Martin</h1>
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
      
      {/* Team */}
      <section className="team section-padding">
        <div className="container">
          <div className="row">
            <div className="col-md-12 mb-60">
              <div className="item right">
                <figure><img src="img/team/7.jpg" alt="" className="img-fluid" /></figure>
                <div className="caption padding-left">
                  <div className="name">Andreas Martin</div>
                  <div className="subname">Tattoo Artist</div>
                  <p>
                    Tattoo aliquet miss orci elit gene on tristique in the dream vitaen aliuam lorem tincidunt felis sed gravida aliquam the neque miss blue hendren mavition duru sapien mana amenta the mollis.
                  </p>
                  <p className="mb-0">
                    <span className="white">Email:</span> <a href="mailto:jennifer@tattoo.com">jennifer@tattoo.com</a>
                  </p>
                  <p>
                    <span className="white">Phone:</span> <a href="tel:8551004444">855 100 4444 / 11</a>
                  </p>
                  <div className="social-list">
                    <a href="#"><i className="ti-instagram"></i></a>
                    <a href="#"><i className="ti-twitter"></i></a>
                    <a href="#"><i className="ti-youtube"></i></a>
                    <a href="#"><i className="ti-facebook"></i></a>
                    <a href="#"><i className="ti-pinterest"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <h2>About Me</h2>
              <p>
                Lorem vavida haretra nuam enim mi obortis eset uctus enec accumsan eu justo alisuame amet auctor orci donec vitae vehicula risus duise sapien accumsan nemauris ullamcorper rutrum asiquam congue nie auctor. Lorem nuam enim mi obortis eset uctus enec accumsan golden alisuame amet auctor orci donec vitae vehicula riduse nunsapien accumsan id mauris ullamcorper rutrum asiquam aucto vavida haretra nuam enim accumsan.
              </p>
              <ul className="about-list list-unstyled">
                <li>
                  <div className="about-list-icon"><span className="ti-check"></span></div>
                  <div className="about-list-text">
                    <p>I'm a professional and certified tattoo.</p>
                  </div>
                </li>
                <li>
                  <div className="about-list-icon"><span className="ti-check"></span></div>
                  <div className="about-list-text">
                    <p>I care about the satisfaction of my customers.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Latest Work Gallery */}
      <section className="gallery section-padding bg-blck">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2>Latest Works</h2>
            </div>
            <div className="col-md-12">
              <div className="owl-carousel owl-theme">
                <div className="gallery-item">
                  <a href="img/services/1.jpg" title="" className="img-zoom">
                    <div className="gallery-box">
                      <div className="gallery-img">
                        <img src="img/services/1.jpg" className="img-fluid mx-auto d-block" alt="work-img" />
                      </div>
                    </div>
                  </a>
                </div>
                <div className="gallery-item">
                  <a href="img/services/2.jpg" title="" className="img-zoom">
                    <div className="gallery-box">
                      <div className="gallery-img">
                        <img src="img/services/2.jpg" className="img-fluid mx-auto d-block" alt="work-img" />
                      </div>
                    </div>
                  </a>
                </div>
                <div className="gallery-item">
                  <a href="img/services/3.jpg" title="" className="img-zoom">
                    <div className="gallery-box">
                      <div className="gallery-img">
                        <img src="img/services/3.jpg" className="img-fluid mx-auto d-block" alt="work-img" />
                      </div>
                    </div>
                  </a>
                </div>
                <div className="gallery-item">
                  <a href="img/services/4.jpg" title="" className="img-zoom">
                    <div className="gallery-box">
                      <div className="gallery-img">
                        <img src="img/services/4.jpg" className="img-fluid mx-auto d-block" alt="work-img" />
                      </div>
                    </div>
                  </a>
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

export default TeamDetailsPage;