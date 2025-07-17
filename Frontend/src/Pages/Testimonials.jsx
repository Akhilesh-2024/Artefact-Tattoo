import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PromoVideoTestimonials from "../Components/Main/PromoVideoTestimonials";
import Clients from "../Components/Main/Clients";

const AddTestimonial = () => {
  const bannerRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    message: "",
    image: null,
  });
  const [formSuccess, setFormSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (bannerRef.current) {
      const bgImage = bannerRef.current.getAttribute("data-background");
      if (bgImage) bannerRef.current.style.backgroundImage = `url(${bgImage})`;
    }

    setTimeout(() => {
      if (typeof window.initPageScripts === "function") {
        window.initPageScripts("/add-testimonial");
      }
    }, 200);
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const API = import.meta.env.VITE_API_URL;
      const data = new FormData();
      data.append("name", formData.name);
      data.append("role", formData.role);
      data.append("message", formData.message);
      if (formData.image) data.append("img", formData.image);

      await axios.post(`${API}/api/tatto/testimonials`, data);
      setFormSuccess(true);
      setShowModal(true);
      setFormData({ name: "", role: "", message: "", image: null });
      setTimeout(() => setFormSuccess(false), 3000);
    } catch (err) {
      console.error("Failed to submit testimonial", err);
    }
  };

  return (
    <>
      {/* Header Banner */}
      <section
        ref={bannerRef}
        className="banner-header full-height section-padding valign bg-img bg-fixed"
        data-overlay-dark="4"
        data-background="img/slider/7.jpg"
      >
        <div className="container">
          <div className="row">
            <div className="col-md-7 text-left caption mt-90">
              <h5 className="animate-box" data-animate-effect="fadeInUp">
                <Link to="/">Home</Link> / Add Testimonial
              </h5>
              <h1 className="animate-box" data-animate-effect="fadeInUp">
                Add Testimonial
              </h1>
              <hr className="animate-box" data-animate-effect="fadeInUp" />
              <p className="animate-box" data-animate-effect="fadeInUp">
                Share your feedback with our community and let others know about
                your experience!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="line-vr-section"></div>

      {/* Form Section */}
      <section className="contact section-padding">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <h5>Add a New Testimonial</h5>
              <form
                className="contact__form"
                onSubmit={handleSubmit}
                encType="multipart/form-data"
              >
                <div className="row">
                  <div className="col-12">
                    {formSuccess && (
                      <div className="alert alert-success contact__msg" role="alert">
                        Your testimonial has been submitted successfully.
                      </div>
                    )}
                  </div>
                  <div className="col-md-6 form-group">
                    <input
                      name="name"
                      type="text"
                      placeholder="Your Name *"
                      required
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6 form-group">
                    <input
                      name="role"
                      type="text"
                      placeholder="Your Role *"
                      required
                      value={formData.role}
                      onChange={handleChange}
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
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <div className="col-md-12 form-group">
                    <label
                      htmlFor="image"
                      style={{
                        display: "inline-block",
                        padding: "10px 20px",
                        backgroundColor: "#111",
                        color: "#fff",
                        cursor: "pointer",
                        border: "1px solid #333",
                        borderRadius: "4px",
                        marginBottom: "10px",
                      }}
                    >
                      Choose Image
                    </label>
                    <input
                      id="image"
                      name="image"
                      type="file"
                      accept="image/*"
                      onChange={handleChange}
                      style={{ display: "none" }}
                    />
                    {formData.image && (
                      <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                        <img
                          src={URL.createObjectURL(formData.image)}
                          alt="Preview"
                          style={{
                            maxWidth: "200px",
                            height: "auto",
                            borderRadius: "6px",
                            border: "1px solid #555",
                          }}
                        />
                      </div>
                    )}
                  </div>

                  <div className="col-md-12">
                    <input
                      name="submit"
                      type="submit"
                      value="Submit Testimonial"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Modal Popup */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.7)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            style={{
              backgroundColor: "#111",
              color: "#fff",
              padding: "30px",
              borderRadius: "8px",
              maxWidth: "400px",
              textAlign: "center",
              boxShadow: "0 0 20px rgba(0,0,0,0.5)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h4 style={{ marginBottom: "15px" }}>Thank you!</h4>
            <p style={{ marginBottom: "20px" }}>
              If you're kind enough, please leave us a review on Google too.
            </p>
            <a
              href="https://maps.app.goo.gl/PTigaZnDVd5HJKv46"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                backgroundColor: "#e91e63",
                color: "#fff",
                padding: "10px 20px",
                borderRadius: "5px",
                textDecoration: "none",
                marginBottom: "10px",
              }}
            >
              Leave a Google Review
            </a>
            <br />
            <button
              onClick={() => setShowModal(false)}
              style={{
                marginTop: "15px",
                padding: "8px 16px",
                backgroundColor: "#444",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Promo + Testimonials */}
      <PromoVideoTestimonials />

      {/* Clients */}
      <Clients />
    </>
  );
};

export default AddTestimonial;
