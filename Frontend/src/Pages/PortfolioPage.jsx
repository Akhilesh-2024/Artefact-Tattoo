import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PromoVideoTestimonials from "../Components/Main/PromoVideoTestimonials";
import Clients from "../Components/Main/Clients";

const PortfolioPage = () => {
  const bannerRef = useRef(null);
  const [gallery, setGallery] = useState([]);
  const API_BASE = import.meta.env.VITE_API_URL;

  useEffect(() => {
    // Set banner background
    if (bannerRef.current) {
      const section = bannerRef.current;
      const bgImage = section.getAttribute("data-background");
      if (bgImage) {
        section.style.backgroundImage = `url(${bgImage})`;
      }
    }

    // Fetch gallery data
    const fetchGallery = async () => {
      try {
        const API = import.meta.env.VITE_API_URL;
        const res = await axios.get(`${API}/api/tatto/gallery`);
        setGallery(res.data);
      } catch (err) {
        console.error("Failed to load gallery data", err);
      }
    };
    fetchGallery();

    // Initialize scripts
    setTimeout(() => {
      if (typeof window.initPageScripts === "function") {
        window.initPageScripts("/portfolio");
      }
      if (window.jQuery) {
        const $ = window.jQuery;
        if ($.fn.magnificPopup) {
          $(".img-zoom").magnificPopup({
            type: "image",
            closeOnContentClick: true,
            mainClass: "mfp-fade",
            gallery: {
              enabled: true,
              navigateByImgClick: true,
              preload: [0, 1],
            },
          });
          $(".vid").magnificPopup({
            type: "iframe",
            closeOnContentClick: false,
            mainClass: "mfp-fade",
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false,
          });
        }
      }
    }, 200);
  }, []);

  const imageGallery = gallery
    .filter((item) => item.type === "image")
    .sort((a, b) => a.imageOrder - b.imageOrder);

  const videoGallery = gallery
    .filter((item) => item.type === "video")
    .sort((a, b) => a.videoOrder - b.videoOrder);

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
              <h1 className="animate-box" data-animate-effect="fadeInUp">
                Our Works
              </h1>
              <hr className="animate-box" data-animate-effect="fadeInUp" />
              <p className="animate-box" data-animate-effect="fadeInUp">
                Check out our work in some of our favorite styles. Tattoo
                viverra tristique usto duis vitae diam neque nivamus aestan the
                artine verra nec fermen.
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
              <div className="section-title">
                Image <span>Gallery</span>
              </div>
              <p>
                With Bootstrap grid structure, you can show the gallery as you
                want. Image gallery lorem ac erat suscipit bibendum. Nullatem
                volume mollis sapien vel, conseyer turpeutionyer masin libero
                sempe. Fusceler mollis vestibulum.
              </p>
            </div>
          </div>
          <div className="row">
            {imageGallery.map((item, index) => (
              <div
                key={item._id || index}
                className={`col-md-${index < 2 ? 6 : 4} gallery-item`}
              >
                <a
                  href={`${API_BASE}${item.imageUrl}`}
                  title={item.title}
                  className="img-zoom"
                >
                  <div className="gallery-box">
                    <div className="gallery-img">
                      <img
                        src={`${API_BASE}${item.imageUrl}`}
                        className="img-fluid mx-auto d-block"
                        alt={item.title || ""}
                      />
                    </div>
                  </div>
                </a>
              </div>
            ))}
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
              <div className="section-title">
                Video <span>Gallery</span>
              </div>
              <p>
                You can use it by adding your YouTube, vimeo and custom videos.
                With Bootstrap grid structure, you can show the gallery as you
                want. Image & Video gallery lorem ac erat suscipit bibendum.
                Nulla facilisi volume sapien.
              </p>
            </div>
          </div>
          <div className="row">
            {videoGallery.map((item, index) => (
              <div
                key={item._id || index}
                className={`col-md-${index < 3 ? 4 : 6}`}
              >
                <div className="vid-area mb-30">
                  <div className="vid-icon">
                    <img 
                      src={`${API_BASE}${item.imageUrl}`} 
                      alt={item.title || "YouTube Video"} 
                    />
                    <a
                      className="video-gallery-button vid"
                      href={item.videoUrl}
                    >
                      <span className="video-gallery-polygon">
                        <i className="ti-control-play"></i>
                      </span>
                    </a>
                  </div>
                  {item.title && (
                    <h6 className="mt-2 text-center">{item.title}</h6>
                  )}
                </div>
              </div>
            ))}
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