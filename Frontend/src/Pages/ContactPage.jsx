import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PromoVideoTestimonials from "../Components/Main/PromoVideoTestimonials";
import Clients from "../Components/Main/Clients";

const ContactPage = () => {
  const bannerRef = useRef(null);
  const [contactContent, setContactContent] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [formSuccess, setFormSuccess] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await axios.get("/api/tatto/contact/content");
        setContactContent(res.data);
      } catch (err) {
        console.error("Failed to load contact content", err);
      }
    };
    fetchContent();
  }, []);

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
        window.initPageScripts('/contact');
      }
    }, 200);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/tatto/contact/submit", formData);
      setFormSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setTimeout(() => setFormSuccess(false), 3000);
    } catch (err) {
      console.error("Failed to submit contact form", err);
    }
  };

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
            <div className="col-md-7 text-left caption mt-90">
              <h5 className="animate-box" data-animate-effect="fadeInUp">
                <Link to="/">Home</Link> / Contact Us
              </h5>
              <h1 className="animate-box" data-animate-effect="fadeInUp">Contact Us</h1>
              <hr className="animate-box" data-animate-effect="fadeInUp" />
              <p className="animate-box" data-animate-effect="fadeInUp">
                {contactContent?.description || "For more information on our tattoo or piercing services, please feel free to contact our team."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="line-vr-section"></div>

      {/* Contact Section */}
      <section className="contact section-padding">
        <div className="container">
          <div className="row">
            {/* Contact Info */}
            <div className="col-md-6 mb-30">
              <h5>{contactContent?.heading || "Artefact Tattoo Studio"}</h5>
              <p className="mb-30">
                {contactContent?.description ||
                  "Our firm nisl sodales sit amet sapien placerat sodales orcite. Vivamus ne miss rhoncus felis into Artefact Tattoo Studio."}
              </p>
              <div className="item">
                <span className="icon ti-location-pin"></span>
                <div className="cont">
                  <h6>Address</h6>
                  <p>{contactContent?.address || "0665 Broadway NY, 10001 USA"}</p>
                </div>
              </div>
              <div className="item">
                <span className="icon ti-mobile"></span>
                <div className="cont">
                  <h6>Phone</h6>
                  <p>
                    <a href={`tel:${contactContent?.phone || "8551004444"}`}>
                      {contactContent?.phone || "855 100 4444"}
                    </a>
                  </p>
                </div>
              </div>
              <div className="item">
                <span className="icon ti-email"></span>
                <div className="cont">
                  <h6>e-Mail</h6>
                  <p>{contactContent?.email || "info@tattoo.com"}</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="col-md-5 offset-md-1">
              <h5>Contact Form</h5>
              <form className="contact__form" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-12">
                    {formSuccess && (
                      <div className="alert alert-success contact__msg" role="alert">
                        Your message was sent successfully.
                      </div>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 form-group">
                    <input
                      name="name"
                      type="text"
                      placeholder="Your Name *"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6 form-group">
                    <input
                      name="email"
                      type="email"
                      placeholder="Your Email *"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6 form-group">
                    <input
                      name="phone"
                      type="text"
                      placeholder="Your Number *"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-12 form-group">
                    <input
                      name="subject"
                      type="text"
                      placeholder="Subject *"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-12 form-group">
                    <textarea
                      name="message"
                      cols="30"
                      rows="4"
                      placeholder="Message *"
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                  <div className="col-md-12">
                    <input name="submit" type="submit" value="Send Message" />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Promo + Testimonials */}
      <PromoVideoTestimonials />

      {/* Clients */}
      <Clients />
    </>
  );
};

export default ContactPage;
