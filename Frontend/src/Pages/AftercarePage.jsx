import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PromoVideoTestimonials from "../Components/Main/PromoVideoTestimonials";
import Clients from "../Components/Main/Clients";

const AftercarePage = () => {
  const bannerRef = useRef(null);
  const [aftercareData, setAftercareData] = useState(null);

  useEffect(() => {
    if (bannerRef.current) {
      const section = bannerRef.current;
      const bgImage = section.getAttribute('data-background');
      if (bgImage) {
        section.style.backgroundImage = `url(${bgImage})`;
      }
    }

    setTimeout(() => {
      if (typeof window.initPageScripts === 'function') {
        window.initPageScripts('/aftercare');
      }
    }, 200);

    // Fetch aftercare data
    const API = import.meta.env.VITE_API_URL;
    axios.get(`${API}/api/tatto/aftercare`)
      .then((res) => {
        setAftercareData(res.data);
      })
      .catch((err) => {
        console.error("Error loading aftercare data", err);
      });
  }, []);

  if (!aftercareData) return null;

  const { tattoo, piercing } = aftercareData;

  return (
    <>
      {/* Header Banner */}
      <section 
        ref={bannerRef}
        className="banner-header full-height valign bg-img bg-fixed" 
        data-overlay-dark="4" 
        data-background="img/slider/7.jpg"
      >
        <div className="container">
          <div className="row">
            <div className="col-md-6 text-left caption mt-90">
              <h5 className="animate-box" data-animate-effect="fadeInUp">
                <Link to="/">Home</Link> / Aftercare
              </h5>
              <h1 className="animate-box" data-animate-effect="fadeInUp">Aftercare</h1>
              <hr className="animate-box" data-animate-effect="fadeInUp" />
              <p className="animate-box" data-animate-effect="fadeInUp">
                We provide expert guidance and high-quality artistry.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="line-vr-section"></div>

      <section className="section-padding">
        <div className="container">
          <div className="about-info">
            {/* Tattoo Aftercare */}
            <div className="row">
              <div className="col-md-4">
                <div className="about-info-img mb-30">
                  <div className="img">
                    <img
                      src={`${import.meta.env.VITE_API_URL}${tattoo?.image || ''}`}
                      className="img-fluid"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-8">
                <h2 className="section-title2">{tattoo?.heading}</h2>
                <p>{tattoo?.description}</p>
                <ul className="about-list list-unstyled mb-30">
                  {tattoo?.points?.map((point, i) => (
                    <li key={i}>
                      <div className="about-list-icon">
                        <span className="ti-check"></span>
                      </div>
                      <div className="about-list-text">
                        <p>{point}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Piercing Aftercare */}
            <div className="row">
              <div className="col-md-8 mt-90">
                <h2 className="section-title2">{piercing?.heading}</h2>
                <p>{piercing?.description}</p>
                <ul className="about-list list-unstyled mb-30">
                  {piercing?.points?.map((point, i) => (
                    <li key={i}>
                      <div className="about-list-icon">
                        <span className="ti-check"></span>
                      </div>
                      <div className="about-list-text">
                        <p>{point}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-md-4">
                <div className="about-info-img pt-60">
                  <div className="img">
                    <img
                      src={`${import.meta.env.VITE_API_URL}${piercing?.image || ''}`}
                      className="img-fluid"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PromoVideoTestimonials />
      <Clients />
    </>
  );
};

export default AftercarePage;
