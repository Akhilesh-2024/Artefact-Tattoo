import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import PromoVideoTestimonials from "../Components/Main/PromoVideoTestimonials";
import Clients from "../Components/Main/Clients";

const PostPage = () => {
  const bannerRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
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
    // Here you would typically send the data to a server
    // For now, we'll just show a success message
    setFormSuccess(true);
    setTimeout(() => {
      setFormSuccess(false);
      setFormData({
        name: '',
        email: '',
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
    
    // Force re-initialization of scripts
    setTimeout(() => {
      if (typeof window.initPageScripts === 'function') {
        window.initPageScripts('/post');
      }
    }, 200);
    
    // Cleanup function
    return () => {
      // Cleanup code if needed
    };
  }, []);
  
  return (
    <>
      {/* Header Banner */}
      <section 
        ref={bannerRef}
        className="banner-header section-padding valign bg-img bg-fixed" 
        data-overlay-dark="2" 
        data-background="img/slider/1.jpg"
      >
        <div className="container">
          <div className="row">
            <div className="col-md-8 text-left caption mt-90">
              <h5 className="animate-box" data-animate-effect="fadeInUp">
                <Link to="/">Home</Link> / News
              </h5>
              <h1 className="animate-box" data-animate-effect="fadeInUp">Top Ten Tattoo Styles</h1>
              <hr className="animate-box" data-animate-effect="fadeInUp" />
              <p className="animate-box" data-animate-effect="fadeInUp">
                Quisque pretium fermentum quam, sit amet cursus ante sollicitudin vel. Morbi consequat risus consequat, porttitor orci sit amet, iaculis nisl. Integer quis sapien nec elit ultrices euismod sit amet id lacus.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* hr */}
      <div className="line-vr-section"></div>
      
      {/* Post */}
      <section className="section-padding">
        <div className="container">
          <div className="row">
            <div className="col-md-12 mb-15">
              <p className="mb-30">
                Quisque pretium fermentum quam, sit amet cursus ante sollicitudin vel. Morbi consequat risus consequat, porttitor orci sit amet, iaculis nisl. Integer quis sapien nec elit ultrices euismod sit amet id lacus. Sed a imperdiet erat. Duis eu est dignissim lacus dictum hendrerit quis vitae mi. Fusce eu nulla ac nisi cursus tincidunt. Interdum et malesuada fames ac ante ipsum primis in faucibus. Integer tristique sem eget leo faucibus porttitor.
              </p>
              <img src="img/slider/2.jpg" className="mb-30" alt="" />
              <p>
                Nulla vitae metus tincidunt, varius nunc quis, porta nulla. Pellentesque vel dui nec libero auctor pretium id sed arcu. Nunc consequat diam id nisl blandit dignissim. Etiam commodo diam dolor, at scelerisque sem finibus sit amet. Curabitur id lectus eget purus finibus laoreet. Nam eget lectus ac sem luctus hendrerit sed nec magna. Maecenas vulputate magna sed nunc pellentesque, in consectetur nisi condimentum.
              </p>
            </div>
            <div className="col-md-6">
              <img src="img/news/1.jpg" className="mb-30" alt="" />
            </div>
            <div className="col-md-6">
              <img src="img/news/2.jpg" className="mb-30" alt="" />
            </div>
          </div>
          <div className="artefact-comment-section">
            <div className="row">
              {/* Comment */}
              <div className="col-md-6">
                <div className="artefact-post-comment-wrap">
                  <div className="artefact-user-comment">
                    <img src="img/team/1.jpg" alt="" />
                  </div>
                  <div className="artefact-user-content">
                    <h6>Robert Misse<span> 29 October 2025</span></h6>
                    <p>
                      Photography ultricies nibh non dolor maximus scee the inte molliser faubs neque nec tincidunte aliquam erat volutpat. Praeser tem malade.
                    </p>
                    <a className="artefact-repay" href="#">Reply<i className="ti-back-left"></i></a>
                  </div>
                </div>
              </div>
              {/* Contact Form */}
              <div className="col-md-5 offset-md-1">
                <h6>Leave a Reply</h6>
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
                        placeholder="Full Name *" 
                        required 
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-md-12 form-group">
                      <input 
                        name="email" 
                        type="email" 
                        placeholder="Email Address *" 
                        required 
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-md-12 form-group">
                      <textarea 
                        name="message" 
                        cols="30" 
                        rows="4" 
                        placeholder="Your Comment *" 
                        required
                        value={formData.message}
                        onChange={handleInputChange}
                      ></textarea>
                    </div>
                    <div className="col-md-12">
                      <input name="submit" type="submit" value="Send Comment" />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Prev-Next Post */}
      <section className="artefact-post-prev-next">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="d-sm-flex align-items-center justify-content-between">
                <div className="artefact-post-prev-next-left">
                  <Link to="/post"><i className="ti-arrow-left"></i> Previous Post</Link>
                </div>
                <Link to="/blog"><i className="ti-layout-grid3-alt"></i></Link>
                <div className="artefact-post-prev-next-right">
                  <Link to="/post">Next Post <i className="ti-arrow-right"></i></Link>
                </div>
              </div>
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

export default PostPage;