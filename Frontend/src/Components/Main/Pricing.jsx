import { useEffect, useState } from "react";
import axios from "axios";

const Pricing = () => {
  const [items, setItems] = useState([]);
  const [bgImage, setBgImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPricing = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/tatto/pricing");
        const data = res.data;

        setItems(data?.items || []);
        setBgImage(data?.img || null);
      } catch (error) {
        console.error("Failed to fetch pricing:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPricing();
  }, []);

  return (
    <section className="price-banner menu-book bg-blck">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-5 p-0">
            <div className="img left">
              <img
                src={
                  bgImage
                    ? `${import.meta.env.VITE_API_URL}${bgImage}`
                    : "/img/price.jpg"
                }
                alt="Pricing Section"
              />
            </div>
          </div>
          <div className="col-md-7 p-0 valign">
            <div className="content">
              <div className="section-head mb-30">
                <div className="section-subtitle">Pricing Plan</div>
                <div className="section-title white">Price List</div>
              </div>

              {loading ? (
                <p className="text-light">Loading...</p>
              ) : items.length === 0 ? (
                <p className="text-light">No pricing data found.</p>
              ) : (
                items.map((item, index) => (
                  <div className="menu-list" key={index}>
                    <div className="item">
                      <div className="flex">
                        <div className="title">{item.title}</div>
                        <div className="price">${item.price}</div>
                      </div>
                      <div className="dots" />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
