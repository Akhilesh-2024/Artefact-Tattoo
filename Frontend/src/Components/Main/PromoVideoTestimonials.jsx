import { useEffect, useState } from "react";
import axios from "axios";

const PromoVideoTestimonials = () => {
  const [promo, setPromo] = useState(null);
  const [testimonials, setTestimonials] = useState([]);

  // Fetch promo video and testimonials data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [promoRes, testimonialsRes] = await Promise.all([
          axios.get("/api/tatto/promo"),
          axios.get("/api/tatto/testimonials"),
        ]);
        setPromo(promoRes.data);
        setTestimonials(testimonialsRes.data);
      } catch (error) {
        console.error("Failed to load promo or testimonials:", error);
      }
    };
    fetchData();
  }, []);

  // Set background image for the promo section
  useEffect(() => {
    const section = document.querySelector(".background.bg-img");
    if (section && promo?.background) {
      const fullImageUrl = `${import.meta.env.VITE_API_URL}${promo.background}`;
      section.removeAttribute("data-background");
      section.style.backgroundImage = `url('${fullImageUrl}')`;
    }
  }, [promo]);

  // Initialize Owl Carousel for testimonials
  useEffect(() => {
    if (typeof window.$ === "undefined") return;

    const $carousel = window.$(".testimonials-carousel");

    const initCarousel = () => {
      if ($carousel.hasClass("owl-loaded")) {
        $carousel.trigger("destroy.owl.carousel");
        $carousel.find(".owl-stage-outer").children().unwrap();
        $carousel.removeClass("owl-center owl-loaded owl-text-select-on");
      }

      $carousel.owlCarousel({
        items: 1,
        loop: true,
        margin: 30,
        dots: true,
        nav: false,
        autoplay: true,
        autoHeight: true,
        responsive: {
          0: { items: 1 },
          768: { items: 1 },
          1024: { items: 1 },
        },
      });
    };

    const timeout = setTimeout(() => {
      if (testimonials.length > 0) {
        initCarousel();
      }
    }, 200); // short delay ensures DOM is rendered

    return () => clearTimeout(timeout);
  }, [testimonials]);

  return (
    <section className="testimonials video-wrapper video">
      <div
        className="background bg-img bg-fixed section-padding pb-0"
        data-overlay-dark={3}
        style={
          promo?.background
            ? {
                backgroundImage: `url(${import.meta.env.VITE_API_URL}${promo.background})`,
              }
            : {}
        }
      >
        <div className="container">
          <div className="row">
            {/* Promo video */}
            <div className="col-md-7 mb-30">
              <div className="vid-area valign">
                <a
                  className="vid"
                  href={promo?.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="icon">
                    <i className="ti-control-play" />
                  </span>
                </a>
                <div className="cont">
                  <h5>{promo?.title || "Promo Video"}</h5>
                </div>
              </div>
            </div>

            {/* Testimonials */}
            <div
              className="col-md-5 animate-box"
              data-animate-effect="fadeInUp"
            >
              <div className="testimonials-box">
                <div
                  className="owl-carousel owl-theme testimonials-carousel"
                  key={testimonials.length}
                >
                  {testimonials.map((item) => (
                    <div className="item" key={item._id}>
                      <span className="quote">
                        <img src="img/quot.png" alt="quote" />
                      </span>
                      <p className="v-border">{item.message}</p>
                      <div className="info">
                        <div className="author-img">
                          <img
                            src={`${import.meta.env.VITE_API_URL}${item.img}`}
                            alt={item.name}
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                        <div className="cont">
                          <h6>{item.name}</h6>
                          <span>{item.role}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoVideoTestimonials;
