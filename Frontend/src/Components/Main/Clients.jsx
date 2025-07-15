import { useEffect } from "react";

const Clients = () => {
  useEffect(() => {
    if (typeof window.$ === "undefined") return;

    const $carousel = window.$(".clients-carousel");

    const initClientsCarousel = () => {
      if ($carousel.hasClass("owl-loaded")) {
        $carousel.trigger("destroy.owl.carousel");
        $carousel.find(".owl-stage-outer").children().unwrap();
        $carousel.removeClass("owl-center owl-loaded owl-text-select-on");
      }

      $carousel.owlCarousel({
        items: 4,
        loop: true,
        margin: 30,
        dots: false,
        nav: false,
        autoplay: true,
        responsive: {
          0: { items: 2 },
          768: { items: 3 },
          1024: { items: 4 },
        },
      });
    };

    const timeout = setTimeout(() => {
      initClientsCarousel();
    }, 200); // shorter, smoother init delay

    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="clients">
      <div className="container">
        <div className="row">
          <div className="col-md-7">
            <div className="owl-carousel owl-theme clients-carousel">
              <div className="clients-logo">
                <a href="#0">
                  <img src="img/clients/1.png" alt="client-1" />
                </a>
              </div>
              <div className="clients-logo">
                <a href="#0">
                  <img src="img/clients/2.png" alt="client-2" />
                </a>
              </div>
              <div className="clients-logo">
                <a href="#0">
                  <img src="img/clients/3.png" alt="client-3" />
                </a>
              </div>
              <div className="clients-logo">
                <a href="#0">
                  <img src="img/clients/4.png" alt="client-4" />
                </a>
              </div>
              <div className="clients-logo">
                <a href="#0">
                  <img src="img/clients/5.png" alt="client-5" />
                </a>
              </div>
              <div className="clients-logo">
                <a href="#0">
                  <img src="img/clients/6.png" alt="client-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clients;
