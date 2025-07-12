import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import PromoVideoTestimonials from "../Components/Main/PromoVideoTestimonials";
import Clients from "../Components/Main/Clients";

const ContactPage = () => {
  const bannerRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [formSuccess, setFormSuccess] = useState(false);
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to a server
    // For now, we'll just show a success message
    setFormSuccess(true);
    setTimeout(() => {
      setFormSuccess(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };
  
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
    console.log("ContactPage mounted");
    
    // Force re-initialization of scripts
    setTimeout(() => {
      if (typeof window.initPageScripts === 'function') {
        window.initPageScripts('/contact');
      }
    }, 200);
    
    // Cleanup function
    return () => {
      console.log("ContactPage unmounted");
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
            <div className="col-md-7 text-left caption mt-90">
              <h5 className="animate-box" data-animate-effect="fadeInUp">
                <Link to="/">Home</Link> / Contact Us
              </h5>
              <h1 className="animate-box" data-animate-effect="fadeInUp">Contact Us</h1>
              <hr className="animate-box" data-animate-effect="fadeInUp" />
              <p className="animate-box" data-animate-effect="fadeInUp">
                For more information on our tattoo or piercing services, please feel free to contact our team. Lorem sodales sit amet sapien idea placeran sodales orcite
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* hr */}
      <div className="line-vr-section"></div>
      
      {/* Contact */}
      <section className="contact section-padding">
        <div className="container">
          <div className="row">
            <div className="col-md-6 mb-30">
              <h5>Artefact Tattoo Studio</h5>
              <p className="mb-30">
                Our firm nisl sodales sit amet sapien idea placeran sodales orcite. Vivamus ne miss rhoncus felis into Artefact Tattoo Studio. Lorem arena nuam enim mi obortis esen the uctus ametion in the auctor orci done vitae.
              </p>
              <div className="item">
                <span className="icon ti-location-pin"></span>
                <div className="cont">
                  <h6>Address</h6>
                  <p>0665 Broadway NY, 10001 USA</p>
                </div>
              </div>
              <div className="item">
                <span className="icon ti-mobile"></span>
                <div className="cont">
                  <h6>Phone</h6>
                  <p><a href="tel:8551004444">855 100 4444</a></p>
                </div>
              </div>
              <div className="item">
                <span className="icon ti-email"></span>
                <div className="cont">
                  <h6>e-Mail</h6>
                  <p>info@tattoo.com</p>
                </div>
              </div>
            </div>
            <div className="col-md-5 offset-md-1">
              <h5>Contact Form</h5>
              <form className="contact__form" onSubmit={handleSubmit}>
                {/* Form message */}
                <div className="row">
                  <div className="col-12">
                    <div 
                      className="alert alert-success contact__msg" 
                      style={{ display: formSuccess ? 'block' : 'none' }} 
                      role="alert"
                    >
                      Your message was sent successfully.
                    </div>
                  </div>
                </div>
                {/* Form elements */}
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
      
      {/* Promo video - Testimonials */}
      <PromoVideoTestimonials />
      
      {/* Clients */}
      <Clients />
    </>
  );
};

export default ContactPage;