import axios from "axios";
import { useEffect, useRef, useState } from "react";

const Team = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef(null);

  // Fetch team data
  useEffect(() => {
    const fetchTeam = async () => {
      try {
        setLoading(true);
        const API = import.meta.env.VITE_API_URL;
        const res = await axios.get(`${API}/api/tatto/team`);
        setTeam(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  // Owl Carousel setup after loading and data available
  useEffect(() => {
    if (!loading && team.length > 0 && carouselRef.current) {
      const $ = window.jQuery;
      const $carousel = $(carouselRef.current);

      // Fully destroy existing carousel (important)
      if ($carousel.hasClass("owl-loaded")) {
        $carousel.trigger("destroy.owl.carousel");
        $carousel.removeClass("owl-loaded owl-center owl-hidden");
        $carousel.find(".owl-stage-outer").children().unwrap();
        $carousel.find(".owl-stage").children().unwrap();
        $carousel.html($carousel.find(".item")); // Keep only .item elements
      }

      // Initialize again
      setTimeout(() => {
        $carousel.owlCarousel({
          loop: true,
          margin: 30,
          mouseDrag: true,
          autoplay: false,
          dots: true,
          nav: false,
          items: 1,
        });
      }, 200); // slight delay to ensure DOM is ready
    }
  }, [loading, team]);

  useEffect(() => {
    if (team && window.$) {
      window.$(".animate-box").each(function () {
        const el = window.$(this);
        el.removeClass("animated fadeInLeft fadeInRight fadeInUp fadeInDown");
        const effect = el.data("animate-effect") || "fadeInUp";
        setTimeout(() => {
          el.addClass("animated " + effect);
        }, 100);
      });
    }
  }, [team]);

  return (
    <section className="team section-padding">
      <div className="container">
        <div className="row mb-30">
          <div className="section-head col-md-12 text-center">
            <div className="section-subtitle">Our Team</div>
            <div className="section-title white">
              Tattoo <span>Artists</span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            {loading ? (
              <div className="text-center">
                <div className="spinner-border text-light" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : team.length === 0 ? (
              <div className="text-center">
                <p>No team members found.</p>
              </div>
            ) : (
              <div
                className="owl-carousel owl-theme"
                ref={carouselRef}
              >
                {team.map((member) => (
                  <div className="item right" key={member._id}>
                    <figure>
                      <img
                        src={`${import.meta.env.VITE_API_URL}${member.img}`}
                        alt={member.name}
                        className="img-fluid team-img-fix"
                      />
                    </figure>
                    <div className="caption padding-left">
                      <div className="name">{member.name}</div>
                      <div className="subname">{member.subname}</div>
                      <p>{member.info}</p>
                      <a href={`/team-details`} className="btn-curve btn-1 mt-10">
                        <span>View Details</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
