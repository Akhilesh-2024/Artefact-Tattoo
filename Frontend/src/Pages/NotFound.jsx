import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import PromoVideoTestimonials from "../Components/Main/PromoVideoTestimonials";
import Clients from "../Components/Main/Clients";

const NotFound = () => {
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
    console.log("NotFound page mounted");
    
    // Force re-initialization of scripts
    setTimeout(() => {
      if (typeof window.initPageScripts === 'function') {
        window.initPageScripts('/404');
      }
    }, 200);
    
    // Cleanup function
    return () => {
      console.log("NotFound page unmounted");
    };
  }, []);
  
  return (
    <>
      {/* Header Banner */}
      <section 
        ref={bannerRef}
        className="banner-header section-padding valign bg-img bg-fixed" 
        data-overlay-dark="3" 
        data-background="img/slider/2.jpg"
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 text-center caption mt-90">
              <h5 className="animate-box" data-animate-effect="fadeInUp">
                <Link to="/">Home</Link> / 404
              </h5>
              <h1 className="animate-box" data-animate-effect="fadeInUp">Not Found</h1>
              <hr className="animate-box" data-animate-effect="fadeInUp" />
              <p className="animate-box" data-animate-effect="fadeInUp">
                The page you are looking for was moved, removed, renamed or never existed.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* hr */}
      <div className="line-vr-section"></div>
      
      {/* Not found 404 */}
      <section className="section-padding">
        <div className="container">
          <div className="row">
            <div className="col-md-6 offset-md-3 text-center">
              <div className="section-number">404</div>
              <div className="section-title">
                Sorry We Can't Find <span>That Page!</span>
              </div>
              <p>The page you are looking for was moved, removed, renamed or never existed.</p>
              <div className="error-form">
                <form method="post" action="/blog">
                  <div className="form-group clearfix">
                    <input type="search" name="text" placeholder="Search here" required />
                    <button type="submit" className="theme-btn">
                      <span className="ti-search"></span>
                    </button>
                  </div>
                </form>
              </div>
              <Link to="/" className="btn-curve btn-1 mt-30 text-center">
                <span>Back to Home</span>
              </Link>
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

export default NotFound;