import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import PromoVideoTestimonials from "../Components/Main/PromoVideoTestimonials";
import Clients from "../Components/Main/Clients";

const PortfolioPage = () => {
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
    console.log("PortfolioPage mounted");
    
    // Force re-initialization of scripts
    setTimeout(() => {
      if (typeof window.initPageScripts === 'function') {
        window.initPageScripts('/portfolio');
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
          
          $('.vid').magnificPopup({
            type: 'iframe',
            closeOnContentClick: false,
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
          });
        }
      }
    }, 200);
    
    // Cleanup function
    return () => {
      console.log("PortfolioPage unmounted");
    };
  }, []);
  
  return (
    <>
      {/* Header Banner */}
      <div 
        ref={bannerRef}
        className="banner-header full-height section-padding valign bg-img bg-fixed" 
        data-overlay-dark="4" 
        data-background="img/slider/6.jpg"
      >
        <div className="container">
          <div className="row">
            <div className="col-md-6 caption mt-90">
              <h5 className="animate-box" data-animate-effect="fadeInUp">
                <Link to="/">Home</Link> / Gallery & Video
              </h5>
              <h1 className="animate-box" data-animate-effect="fadeInUp">Our Works</h1>
              <hr className="animate-box" data-animate-effect="fadeInUp" />
              <p className="animate-box" data-animate-effect="fadeInUp">
                Check out our work in some of our favorite styles. Tattoo viverra tristique usto duis vitae diam neque nivamus aestan the artine verra nec fermen.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* hr */}
      <div className="line-vr-section"></div>
      
      {/* Image Gallery */}
      <section className="section-padding">
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              <div className="section-title">Image <span>Gallery</span></div>
              <p>
                With Bootstrap grid structure, you can show the gallery as you want. Image gallery lorem ac erat suscipit bibendum. Nullatem volume mollis sapien vel, conseyer turpeutionyer masin libero sempe. Fusceler mollis vestibulum.
              </p>
            </div>
          </div>
          <div className="row">
            {/* 2 columns */}
            <div className="col-md-6 gallery-item">
              <a href="img/gallery/4.jpg" title="" className="img-zoom">
                <div className="gallery-box">
                  <div className="gallery-img">
                    <img src="img/gallery/4.jpg" className="img-fluid mx-auto d-block" alt="" />
                  </div>
                </div>
              </a>
            </div>
            <div className="col-md-6 gallery-item">
              <a href="img/gallery/10.jpg" title="" className="img-zoom">
                <div className="gallery-box">
                  <div className="gallery-img">
                    <img src="img/gallery/10.jpg" className="img-fluid mx-auto d-block" alt="" />
                  </div>
                </div>
              </a>
            </div>
            {/* 3 columns */}
            <div className="col-md-4 gallery-item">
              <a href="img/gallery/1.jpg" title="" className="img-zoom">
                <div className="gallery-box">
                  <div className="gallery-img">
                    <img src="img/gallery/1.jpg" className="img-fluid mx-auto d-block" alt="" />
                  </div>
                </div>
              </a>
            </div>
            <div className="col-md-4 gallery-item">
              <a href="img/gallery/2.jpg" title="" className="img-zoom">
                <div className="gallery-box">
                  <div className="gallery-img">
                    <img src="img/gallery/2.jpg" className="img-fluid mx-auto d-block" alt="" />
                  </div>
                </div>
              </a>
            </div>
            <div className="col-md-4 gallery-item">
              <a href="img/gallery/5.jpg" title="" className="img-zoom">
                <div className="gallery-box">
                  <div className="gallery-img">
                    <img src="img/gallery/5.jpg" className="img-fluid mx-auto d-block" alt="" />
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* hr */}
      <div className="line-vr-section"></div>
      
      {/* Video Gallery */}
      <section className="section-padding">
        <div className="container">
          <div className="row">
            <div className="col-md-9 mb-30">
              <div className="section-title">Video <span>Gallery</span></div>
              <p>
                You can use it by adding your YouTube, vimeo and custom videos. With Bootstrap grid structure, you can show the gallery as you want. Image & Video gallery lorem ac erat suscipit bibendum. Nulla facilisi volume sapien.
              </p>
            </div>
          </div>
          <div className="row">
            {/* 3 columns */}
            <div className="col-md-4">
              <div className="vid-area mb-30">
                <div className="vid-icon">
                  <img src="img/gallery/12.jpg" alt="YouTube" />
                  <a className="video-gallery-button vid" href="https://youtu.be/UCRNVgJJ97w">
                    <span className="video-gallery-polygon">
                      <i className="ti-control-play"></i>
                    </span>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="vid-area mb-30">
                <div className="vid-icon">
                  <img src="img/gallery/13.jpg" alt="YouTube" />
                  <a className="video-gallery-button vid" href="https://youtu.be/UCRNVgJJ97w">
                    <span className="video-gallery-polygon">
                      <i className="ti-control-play"></i>
                    </span>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="vid-area mb-30">
                <div className="vid-icon">
                  <img src="img/gallery/9.jpg" alt="YouTube" />
                  <a className="video-gallery-button vid" href="https://youtu.be/UCRNVgJJ97w">
                    <span className="video-gallery-polygon">
                      <i className="ti-control-play"></i>
                    </span>
                  </a>
                </div>
              </div>
            </div>
            {/* 2 columns */}
            <div className="col-md-6">
              <div className="vid-area mb-30">
                <div className="vid-icon">
                  <img src="img/gallery/10.jpg" alt="YouTube" />
                  <a className="video-gallery-button vid" href="https://youtu.be/UCRNVgJJ97w">
                    <span className="video-gallery-polygon">
                      <i className="ti-control-play"></i>
                    </span>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="vid-area mb-30">
                <div className="vid-icon">
                  <img src="img/gallery/11.jpg" alt="YouTube" />
                  <a className="video-gallery-button vid" href="https://youtu.be/UCRNVgJJ97w">
                    <span className="video-gallery-polygon">
                      <i className="ti-control-play"></i>
                    </span>
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

export default PortfolioPage;