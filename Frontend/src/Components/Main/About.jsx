import { useEffect, useState } from "react";
import axios from "axios";

const About = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const API = import.meta.env.VITE_API_URL;
        const res = await axios.get(`${API}/api/tatto/about`);
        setAboutData(res.data);
      } catch (err) {
        console.error("Error fetching about data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  useEffect(() => {
    if (aboutData && window.$) {
      window.$(".animate-box").each(function () {
        const el = window.$(this);
        el.removeClass("animated fadeInLeft fadeInRight fadeInUp fadeInDown");
        const effect = el.data("animate-effect") || "fadeInUp";
        setTimeout(() => {
          el.addClass("animated " + effect);
        }, 100);
      });
    }
  }, [aboutData]);

  if (loading) {
    return (
      <section className="about section-padding">
        <div className="container text-center">
          <h3>Loading About Section...</h3>
        </div>
      </section>
    );
  }

  if (!aboutData) return null;

  return (
    <section className="about section-padding">
      <div className="container">
        <div className="row">
          <div
            className="col-md-7 animate-box"
            data-animate-effect="fadeInLeft"
          >
            <div className="section-subtitle">
              Established in {aboutData.established || "Established"}
            </div>
            <div className="section-title white">
              {aboutData.title} <span>{aboutData.subTitle}</span>
            </div>
            <p>{aboutData.description}</p>

            <ul className="about-list list-unstyled">
              {(aboutData.points || []).map((point, index) => (
                <li key={index}>
                  <div className="about-list-icon">
                    <span className="ti-check" />
                  </div>
                  <div className="about-list-text">
                    <p>{point}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="col-md-5 mt-30 animate-box"
            data-animate-effect="fadeInRight"
          >
            <img
              src={`${import.meta.env.VITE_API_URL}${aboutData.img}`}
              alt="About"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
