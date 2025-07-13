import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import PromoVideoTestimonials from "../Components/Main/PromoVideoTestimonials";
import Clients from "../Components/Main/Clients";
import axios from "axios";

const TeamPage = () => {
  const bannerRef = useRef(null);
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch team data from API
  useEffect(() => {
    const fetchTeam = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/api/tatto/team');
        setTeam(res.data);
      } catch (error) {
        console.error("Error fetching team:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);
  
  // Initialize background image and scripts when component mounts
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
            {loading ? (
              <div className="col-md-12 text-center">
                <div className="loading-spinner">
                  <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                  <p className="mt-3">Loading team members...</p>
                </div>
              </div>
            ) : (
              team.map((member) => (
                <div 
                  key={member._id}
                  className="col-md-12 mb-60 animate-box" 
                  data-animate-effect="fadeInUp"
                >
                  <div className="item right">
                    <figure>
                      <img 
                        src={`http://localhost:5001${member.img}`} 
                        alt={member.name} 
                        className="img-fluid" 
                      />
                    </figure>
                    <div className="caption padding-left">
                      <div className="name">{member.name}</div>
                      <div className="subname">{member.subname}</div>
                      <p>{member.info}</p>
                      <Link to="/team-details" className="btn-curve btn-1 mt-10">
                        <span>View Details</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
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