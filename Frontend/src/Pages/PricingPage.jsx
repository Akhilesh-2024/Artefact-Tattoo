import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import PromoVideoTestimonials from "../Components/Main/PromoVideoTestimonials";
import Clients from "../Components/Main/Clients";
import axios from 'axios';

const PricingPage = () => {
  const bannerRef = useRef(null);
  const [pricingItems, setPricingItems] = useState([]);
  const [bgImage, setBgImage] = useState("");

  useEffect(() => {
    // Fetch pricing data
    const fetchPricing = async () => {
      try {
        const res = await axios.get("/api/tatto/pricing");
        setPricingItems(res.data.items || []);
        setBgImage(`${import.meta.env.VITE_API_URL}${res.data.img}`);
      } catch (error) {
        console.error("Failed to load pricing data:", error);
      }
    };

    fetchPricing();
  }, []);

  // Set background image
  useEffect(() => {
    if (bannerRef.current && bgImage) {
      bannerRef.current.style.backgroundImage = `url(${bgImage})`;
    }

    // Optional: Call your custom page scripts
    setTimeout(() => {
      if (typeof window.initPageScripts === 'function') {
        window.initPageScripts('/pricing');
      }
    }, 200);
  }, [bgImage]);

  return (
    <>
      {/* Header Banner */}
      <section 
        ref={bannerRef}
        className="banner-header full-height section-padding valign bg-img bg-fixed"
        data-overlay-dark="4"
        data-background={bgImage || "img/slider/2.jpg"}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-7 text-center caption mt-90">
              <h5 className="animate-box" data-animate-effect="fadeInUp">
                <Link to="/">Home</Link> / Pricing
              </h5>
              <h1 className="animate-box" data-animate-effect="fadeInUp">Pricing List</h1>
              <hr className="animate-box" data-animate-effect="fadeInUp" />
              <p className="animate-box" data-animate-effect="fadeInUp">
                Choose the plan that's right for you. Please contact for detailed information.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* hr */}
      <div className="line-vr-section"></div>

      {/* Price List Section */}
      <section className="price-banner menu-book section-padding">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-md-7 valign">
              <div className="content">
                {pricingItems && pricingItems.length > 0 ? (
                  pricingItems.map((item, index) => (
                    <div className="menu-list" key={index}>
                      <div className="item">
                        <div className="flex">
                          <div className="title">{item.title}</div>
                          <div className="price">${item.price}</div>
                        </div>
                        <div className="dots"></div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500">No pricing items found.</p>
                )}
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

export default PricingPage;
