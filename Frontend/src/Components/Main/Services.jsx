import { useEffect, useState } from "react";
import axios from "axios";

const Services = () => {
  const [services, setServices] = useState([]);
  const baseURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const API = import.meta.env.VITE_API_URL;
    axios
      .get(`${API}/api/tatto/service`)
      .then((res) => setServices(res.data))
      .catch((err) => console.error("Failed to fetch services", err));
  }, []);

  useEffect(() => {
    if (services.length > 0 && window.$) {
      window.$(".animate-box").each(function () {
        const el = window.$(this);
        el.removeClass("animated fadeInLeft fadeInRight fadeInUp fadeInDown");
        const effect = el.data("animate-effect") || "fadeInUp";
        setTimeout(() => {
          el.addClass("animated " + effect);
        }, 100);
      });
    }
  }, [services]);

  return (
    <section className="services section-padding">
      <div className="container">
        <div className="row mb-30">
          <div className="section-head col-md-12">
            <div className="section-subtitle">What We Do</div>
            <div className="section-title white">Our Services</div>
          </div>
        </div>

        {services.map((service, index) => (
          <div className="row mb-30" key={service._id}>
            {index % 2 === 0 ? (
              <>
                <div
                  className="col-md-6 animate-box"
                  data-animate-effect="fadeInLeft"
                >
                  <div className="img left">
                    <img
                      src={`${baseURL}/uploads/service/${service.img}`}
                      alt={service.title}
                    />
                  </div>
                </div>
                <div
                  className="col-md-6 valign animate-box"
                  data-animate-effect="fadeInRight"
                >
                  <div className="content">
                    <div className="date">
                      <h1>{String(service.order).padStart(2, "0")}</h1>
                    </div>
                    <div className="cont">
                      <h5>{service.title}</h5>
                      <p>{service.description}</p>
                      <a
                        href="/services-page.html"
                        className="btn-curve btn-1 mt-10"
                      >
                        <span>Read More</span>
                      </a>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div
                  className="col-md-6 order2 valign animate-box"
                  data-animate-effect="fadeInLeft"
                >
                  <div className="content">
                    <div className="date">
                      <h1>{String(service.order).padStart(2, "0")}</h1>
                    </div>
                    <div className="cont">
                      <h5>{service.title}</h5>
                      <p>{service.description}</p>
                      <a
                        href="/services-page.html"
                        className="btn-curve btn-1 mt-10"
                      >
                        <span>Read More</span>
                      </a>
                    </div>
                  </div>
                </div>
                <div
                  className="col-md-6 order1 animate-box"
                  data-animate-effect="fadeInRight"
                >
                  <div className="img left">
                    <img
                      src={`${baseURL}/uploads/service/${service.img}`}
                      alt={service.title}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
