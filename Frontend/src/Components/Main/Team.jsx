import axios from "axios";
import { useEffect, useRef } from "react";
import { useState } from "react";

const Team = () => {
  
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef(null);

  // Fetch team data
  useEffect(() => {
    const fetchTeam = async() => {
      try {
        setLoading(true);
        const res = await axios.get('/api/tatto/team');
        const data = await res.data;
        setTeam(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchTeam();
  }, []) // Empty dependency array means this runs once on mount

  // Initialize Owl Carousel after data is loaded
  useEffect(() => {
    if (!loading && team.length > 0 && carouselRef.current) {
      // Make sure jQuery and Owl Carousel are available
      if (window.jQuery && typeof window.jQuery(carouselRef.current).owlCarousel === 'function') {
        // Destroy existing carousel instance if it exists
        const $carousel = window.jQuery(carouselRef.current);
        if ($carousel.data('owl.carousel')) {
          $carousel.trigger('destroy.owl.carousel');
        }
        
        // Initialize the carousel with your desired options
        $carousel.owlCarousel({
          loop: true,
          margin: 30,
          mouseDrag: true,
          autoplay: false,
          dots: true,
          nav: false,
          items: 1, // Show only 1 item at a time
          navText: ['<i class="fas fa-angle-left" aria-hidden="true"></i>', '<i class="fas fa-angle-right" aria-hidden="true"></i>'],
        });
      }
    }
  }, [team, loading])

  // const team = [
  //   {
  //     id: 1,
  //     img: "img/team/7.jpg",
  //     name: "Andreas Martin",
  //     subname: "Piercing Artist",
  //     info: "Tattoo aliquet miss orci elit gene on tristique in the dream vitaen aliuam lorem tincidunt felis sed gravida aliquam the neque miss blue hendren mavition duru sapien mana amenta the mollis.",
  //   },
  //   {
  //     id: 3,
  //     img: "img/team/8.jpg",
  //     name: "Daniel Brown",
  //     subname: "Tattoo Artist",
  //     info: "Tattoo aliquet miss orci elit gene on tristique in the dream vitaen aliuam lorem tincidunt felis sed gravida aliquam the neque miss blue hendren mavition duru sapien mana amenta the mollis.",
  //   },
  //   {
  //     id: 5,
  //     img: "img/team/9.jpg",
  //     name: "Jason White",
  //     subname: "Tattoo Artist",
  //     info: "Tattoo aliquet miss orci elit gene on tristique in the dream vitaen aliuam lorem tincidunt felis sed gravida aliquam the neque miss blue hendren mavition duru sapien mana amenta the mollis.",
  //   },
  // ];

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
              <div className="owl-carousel owl-theme" ref={carouselRef}>
                {team.map((member) => (
                <div className="item right" key={member._id}>
                <figure>
                  <img src={`${import.meta.env.VITE_API_URL}${member.img}`} alt="" className="img-fluid team-img-fix" />
                </figure>
                <div className="caption padding-left">
                  <div className="name">{member.name}</div>
                  <div className="subname">{member.subname}</div>
                  <p>{member.info}</p>
                  <a href="/team-details" className="btn-curve btn-1 mt-10">
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
