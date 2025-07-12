import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import PromoVideoTestimonials from "../Components/Main/PromoVideoTestimonials";
import Clients from "../Components/Main/Clients";

const TeamPage = () => {
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
    console.log("TeamPage mounted");
    
    // Force re-initialization of scripts
    setTimeout(() => {
      if (typeof window.initPageScripts === 'function') {
        window.initPageScripts('/team');
      }
    }, 200);
    
    // Cleanup function
    return () => {
      console.log("TeamPage unmounted");
    };
  }, []);
  
  return (
    <>
      {/* Header Banner */}
      <section 
        ref={bannerRef}
        className="banner-header full-height section-padding valign bg-img bg-fixed" 
        data-overlay-dark="4" 
        data-background="img/slider/10.jpg"
      >
        <div className="container">
          <div className="row">
            <div className="col-md-6 caption mt-90">
              <h5 className="animate-box" data-animate-effect="fadeInUp">
                <Link to="/">Home</Link> / Team
              </h5>
              <h1 className="animate-box" data-animate-effect="fadeInUp">Meet Our Artists</h1>
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
            <div className="col-md-12 mb-60 animate-box" data-animate-effect="fadeInUp">
              <div className="item right">
                <figure><img src="img/team/7.jpg" alt="" className="img-fluid" /></figure>
                <div className="caption padding-left">
                  <div className="name">Andreas Martin</div>
                  <div className="subname">Piercing Artist</div>
                  <p>
                    Tattoo aliquet miss orci elit gene on tristique in the dream vitaen aliuam lorem tincidunt felis sed gravida aliquam the neque miss blue hendren mavition duru sapien mana amenta the mollis.
                  </p>
                  <Link to="/team-details" className="btn-curve btn-1 mt-10">
                    <span>View Details</span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-12 mb-60 animate-box" data-animate-effect="fadeInUp">
              <div className="item right">
                <figure><img src="img/team/8.jpg" alt="" className="img-fluid" /></figure>
                <div className="caption padding-left">
                  <div className="name">Daniel Brown</div>
                  <div className="subname">Tattoo Artist</div>
                  <p>
                    Tattoo aliquet miss orci elit gene on tristique in the dream vitaen aliuam lorem tincidunt felis sed gravida aliquam the neque miss blue hendren mavition duru sapien mana amenta the mollis.
                  </p>
                  <Link to="/team-details" className="btn-curve btn-1 mt-10">
                    <span>View Details</span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-12 animate-box" data-animate-effect="fadeInUp">
              <div className="item right">
                <figure><img src="img/team/9.jpg" alt="" className="img-fluid" /></figure>
                <div className="caption padding-left">
                  <div className="name">Jason White</div>
                  <div className="subname">Tattoo Artist</div>
                  <p>
                    Tattoo aliquet miss orci elit gene on tristique in the dream vitaen aliuam lorem tincidunt felis sed gravida aliquam the neque miss blue hendren mavition duru sapien mana amenta the mollis.
                  </p>
                  <Link to="/team-details" className="btn-curve btn-1 mt-10">
                    <span>View Details</span>
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

export default TeamPage;