import { useEffect, useState } from "react";
import axios from "axios";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  // Fetch blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("/api/tatto/blog");
        setBlogs(res.data);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    };

    fetchBlogs();
  }, []);

  // Owl Carousel initialization
  useEffect(() => {
    if (typeof window.$ === "undefined") return;

    const $carousel = window.$(".owl-carousel");

    // Destroy previous instance if exists
    if ($carousel.data("owl.carousel")) {
      $carousel.trigger("destroy.owl.carousel");
      $carousel.find(".owl-stage-outer").children().unwrap();
      $carousel.removeClass("owl-center owl-loaded owl-text-select-on");
    }

    // Reinit only if more than 1 blog exists
    if (blogs.length > 1) {
      setTimeout(() => {
        $carousel.owlCarousel({
          loop: true,
          margin: 30,
          responsiveClass: true,
          dots: true,
          nav: false,
          autoplay: true,
          responsive: {
            0: { items: 1 },
            600: { items: 2 },
            1000: { items: 2 },
          },
        });
      }, 100);
    }
  }, [blogs]);

  return (
    <section className="blog section-padding">
      <div className="container">
        <div className="row">
          <div className="col-md-12 mb-30">
            <div className="section-head text-center">
              <div className="section-subtitle">Blog Articles</div>
              <div className="section-title white">Latest News</div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="owl-carousel owl-theme">
            {blogs.map((item) => (
              <div className="item" key={item._id}>
                <div className="post-img">
                  <a href="/post">
                    <div className="img">
                      <img
                        src={`${import.meta.env.VITE_API_URL}${item.img}`}
                        alt={item.title}
                      />
                    </div>
                  </a>
                </div>
                <div className="cont">
                  <h4>
                    <a href="/post">{item.title}</a>
                  </h4>
                  <div className="info">
                    <a href="/blog">
                      <span>{item.tag || "Blog"}</span>
                    </a>
                    <a href="/blog">
                      {new Date(item.date).toLocaleString("default", {
                        month: "long",
                      })}, {new Date(item.date).getDate()}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
