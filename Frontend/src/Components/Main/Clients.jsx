import { useEffect, useState } from "react";
import axios from "axios";

const Clients = () => {
  const [clients, setClients] = useState([]);

  // Fetch client data
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await axios.get("/api/tatto/clients");
        setClients(res.data);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    fetchClients();
  }, []);

  // Initialize Owl Carousel after data is loaded
  useEffect(() => {
    if (clients.length === 0 || typeof window.$ === "undefined") return;

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
    }, 200); // smooth init

    return () => clearTimeout(timeout);
  }, [clients]);

  return (
    <section className="clients">
      <div className="container">
        <div className="row">
          <div className="col-md-7">
            <div className="owl-carousel owl-theme clients-carousel">
              {clients.map((client) => (
                <div className="clients-logo" key={client._id}>
                  <a href="#0">
                    <img
                      src={`${import.meta.env.VITE_API_URL}${client.img}`}
                      alt={client.name}
                    />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clients;
