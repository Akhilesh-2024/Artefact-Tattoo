import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import PromoVideoTestimonials from "../Components/Main/PromoVideoTestimonials";
import Clients from "../Components/Main/Clients";

const FaqsPage = () => {
  const bannerRef = useRef(null);
  
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
        window.initPageScripts('/faqs');
      }
      
      // Initialize accordion
      if (window.jQuery) {
        const $ = window.jQuery;
        $('.accordion-box .acc-btn').on('click', function() {
          const outerBox = $(this).parents('.accordion-box');
          const target = $(this).parents('.accordion');
          
          if($(this).hasClass('active') !== true) {
            $(outerBox).find('.accordion .acc-btn').removeClass('active');
          }
          
          if ($(this).next('.acc-content').is(':visible')) {
            return false;
          } else {
            $(this).addClass('active');
            $(outerBox).children('.accordion').removeClass('active-block');
            $(outerBox).find('.accordion').children('.acc-content').slideUp(300);
            target.addClass('active-block');
            $(this).next('.acc-content').slideDown(300);
          }
        });
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
                We crafted this page to answer many of the frequently asked questions we were asked along the way. Lorem arena nuam enim mi obortis esen in the auctor orci done vitae.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* hr */}
      <div className="line-vr-section"></div>
      
      {/* Faqs */}
      <section className="section-padding">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <ul className="accordion-box clearfix">
                <li className="accordion block">
                  <div className="acc-btn">How can i book a tattoo?</div>
                  <div className="acc-content">
                    <div className="content">
                      <div className="text">
                        Tattoo viverra tristique justo duis vitae diam neque nivamus aestan ateuene artines aringianu atelit finibus viverra nec lacus. nedana duru erodino setlie suscipe no tristique inilla duiman at elit finibus viverra nec a lacus themo the drudea seneoice misuscipit non sagie the fermen.
                      </div>
                    </div>
                  </div>
                </li>
                <li className="accordion block">
                  <div className="acc-btn">How should i prepare for my appointment?</div>
                  <div className="acc-content">
                    <div className="content">
                      <div className="text">
                        Tattoo viverra tristique justo duis vitae diam neque nivamus aestan ateuene artines aringianu atelit finibus viverra nec lacus. nedana duru erodino setlie suscipe no tristique inilla duiman at elit finibus viverra nec a lacus themo the drudea seneoice misuscipit non sagie the fermen.
                      </div>
                    </div>
                  </div>
                </li>
                <li className="accordion block">
                  <div className="acc-btn">Can i get tattooed if i am pregnant?</div>
                  <div className="acc-content">
                    <div className="content">
                      <div className="text">
                        Tattoo viverra tristique justo duis vitae diam neque nivamus aestan ateuene artines aringianu atelit finibus viverra nec lacus. nedana duru erodino setlie suscipe no tristique inilla duiman at elit finibus viverra nec a lacus themo the drudea seneoice misuscipit non sagie the fermen.
                      </div>
                    </div>
                  </div>
                </li>
                <li className="accordion block">
                  <div className="acc-btn">Can i get tattooed if i am under 18?</div>
                  <div className="acc-content">
                    <div className="content">
                      <div className="text">
                        Tattoo viverra tristique justo duis vitae diam neque nivamus aestan ateuene artines aringianu atelit finibus viverra nec lacus. nedana duru erodino setlie suscipe no tristique inilla duiman at elit finibus viverra nec a lacus themo the drudea seneoice misuscipit non sagie the fermen.
                      </div>
                    </div>
                  </div>
                </li>
                <li className="accordion block">
                  <div className="acc-btn">Can i bring a friend to my appointment?</div>
                  <div className="acc-content">
                    <div className="content">
                      <div className="text">
                        Tattoo viverra tristique justo duis vitae diam neque nivamus aestan ateuene artines aringianu atelit finibus viverra nec lacus. nedana duru erodino setlie suscipe no tristique inilla duiman at elit finibus viverra nec a lacus themo the drudea seneoice misuscipit non sagie the fermen.
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="col-md-6">
              <ul className="accordion-box clearfix">
                <li className="accordion block">
                  <div className="acc-btn">Do you tattoo the hands, neck and face?</div>
                  <div className="acc-content">
                    <div className="content">
                      <div className="text">
                        Tattoo viverra tristique justo duis vitae diam neque nivamus aestan ateuene artines aringianu atelit finibus viverra nec lacus. nedana duru erodino setlie suscipe no tristique inilla duiman at elit finibus viverra nec a lacus themo the drudea seneoice misuscipit non sagie the fermen.
                      </div>
                    </div>
                  </div>
                </li>
                <li className="accordion block">
                  <div className="acc-btn">Can i see my design prior to my appointment?</div>
                  <div className="acc-content">
                    <div className="content">
                      <div className="text">
                        Tattoo viverra tristique justo duis vitae diam neque nivamus aestan ateuene artines aringianu atelit finibus viverra nec lacus. nedana duru erodino setlie suscipe no tristique inilla duiman at elit finibus viverra nec a lacus themo the drudea seneoice misuscipit non sagie the fermen.
                      </div>
                    </div>
                  </div>
                </li>
                <li className="accordion block">
                  <div className="acc-btn">How should i pay for my tattoo?</div>
                  <div className="acc-content">
                    <div className="content">
                      <div className="text">
                        Tattoo viverra tristique justo duis vitae diam neque nivamus aestan ateuene artines aringianu atelit finibus viverra nec lacus. nedana duru erodino setlie suscipe no tristique inilla duiman at elit finibus viverra nec a lacus themo the drudea seneoice misuscipit non sagie the fermen.
                      </div>
                    </div>
                  </div>
                </li>
                <li className="accordion block">
                  <div className="acc-btn">How much does a tattoo cost?</div>
                  <div className="acc-content">
                    <div className="content">
                      <div className="text">
                        Tattoo viverra tristique justo duis vitae diam neque nivamus aestan ateuene artines aringianu atelit finibus viverra nec lacus. nedana duru erodino setlie suscipe no tristique inilla duiman at elit finibus viverra nec a lacus themo the drudea seneoice misuscipit non sagie the fermen.
                      </div>
                    </div>
                  </div>
                </li>
                <li className="accordion block">
                  <div className="acc-btn">How long will my tattoo take to heal?</div>
                  <div className="acc-content">
                    <div className="content">
                      <div className="text">
                        Tattoo viverra tristique justo duis vitae diam neque nivamus aestan ateuene artines aringianu atelit finibus viverra nec lacus. nedana duru erodino setlie suscipe no tristique inilla duiman at elit finibus viverra nec a lacus themo the drudea seneoice misuscipit non sagie the fermen.
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
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

export default FaqsPage;