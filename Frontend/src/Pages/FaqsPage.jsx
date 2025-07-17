import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PromoVideoTestimonials from "../Components/Main/PromoVideoTestimonials";
import Clients from "../Components/Main/Clients";

const FaqsPage = () => {
  const bannerRef = useRef(null);
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
  // Set background image once
  if (bannerRef.current) {
    const section = bannerRef.current;
    const bgImage = section.getAttribute("data-background");
    if (bgImage) {
      section.style.backgroundImage = `url(${bgImage})`;
    }
  }

  // Fetch FAQs from backend
  const fetchFaqs = async () => {
    try {
      const API = import.meta.env.VITE_API_URL;
      const res = await axios.get(`${API}/api/tatto/faqs`);
      setFaqs(res.data);
    } catch (err) {
      console.error("Failed to load FAQs:", err);
    }
  };
  fetchFaqs();
}, []);

useEffect(() => {
  if (!window.jQuery || faqs.length === 0) return;

  const $ = window.jQuery;

  // Clean up old bindings
  $('.accordion-box .acc-btn').off('click').on('click', function () {
    const $button = $(this);
    const $accordion = $button.closest('.block');
    const $content = $button.next('.acc-content');
    const $accordionBox = $button.closest('.accordion-box');

    if ($content.is(':visible')) {
      $button.removeClass('active');
      $accordion.removeClass('active-block');
      $content.slideUp(300);
    } else {
      // Collapse others
      $accordionBox.find('.acc-btn').removeClass('active');
      $accordionBox.find('.block').removeClass('active-block');
      $accordionBox.find('.acc-content').slideUp(300);

      // Expand current
      $button.addClass('active');
      $accordion.addClass('active-block');
      $content.slideDown(300);
    }
  });

  return () => {
    $('.accordion-box .acc-btn').off('click');
  };
}, [faqs]);


  // Split into 2 columns
  const half = Math.ceil(faqs.length / 2);
  const leftFaqs = faqs.slice(0, half);
  const rightFaqs = faqs.slice(half);

  return (
    <>
      {/* Header Banner */}
      <section
        ref={bannerRef}
        className="banner-header full-height section-padding valign bg-img bg-fixed"
        data-overlay-dark="4"
        data-background="img/slider/3.jpg"
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-7 caption mt-90 text-center">
              <h5 className="animate-box" data-animate-effect="fadeInUp">
                <Link to="/">Home</Link> / Faqs
              </h5>
              <h1 className="animate-box" data-animate-effect="fadeInUp">Popular Questions</h1>
              <hr className="animate-box" data-animate-effect="fadeInUp" />
              <p className="animate-box" data-animate-effect="fadeInUp">
                We crafted this page to answer many of the frequently asked questions we were asked along the way.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="line-vr-section"></div>

      {/* FAQs Section */}
      <section className="section-padding">
        <div className="container">
          <div className="row">
            {[leftFaqs, rightFaqs].map((columnFaqs, colIndex) => (
              <div className="col-md-6" key={colIndex}>
                <ul className="accordion-box clearfix">
                  {columnFaqs.map((faq) => (
                    <li className="accordion block" key={faq._id}>
                      <div className="acc-btn">{faq.question}</div>
                      <div className="acc-content">
                        <div className="content">
                          <div className="text">{faq.answer}</div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
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

export default FaqsPage;
