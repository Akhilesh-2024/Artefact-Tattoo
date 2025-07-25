import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PromoVideoTestimonials from "../Components/Main/PromoVideoTestimonials";
import Clients from "../Components/Main/Clients";

const BlogPage = () => {
  const bannerRef = useRef(null);
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 3;

  // Fetch blogs from backend
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const API = import.meta.env.VITE_API_URL;
        const res = await axios.get(`${API}/api/tatto/blog`);
        setBlogs(res.data.reverse()); // Latest first
      } catch (error) {
        console.error("Failed to load blog posts:", error);
      }
    };
    fetchBlogs();
  }, []);

  // Background image setup
  useEffect(() => {
    if (bannerRef.current) {
      const section = bannerRef.current;
      const bgImage = section.getAttribute('data-background');
      if (bgImage) {
        section.style.backgroundImage = `url(${bgImage})`;
      }
    }

    setTimeout(() => {
      if (typeof window.initPageScripts === 'function') {
        window.initPageScripts('/blog');
      }
    }, 200);
  }, []);

  // Pagination logic
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // scroll to top
  };

  return (
    <>
      {/* Header Banner */}
      <section
        ref={bannerRef}
        className="banner-header section-padding valign bg-img bg-fixed"
        data-overlay-dark="2"
        data-background="img/update/blog.jpg"
      >
        <div className="container">
          <div className="row">
            <div className="col-md-6 text-left caption mt-90">
              <h5 className="animate-box" data-animate-effect="fadeInUp">
                <Link to="/">Home</Link> / Blog
              </h5>
              <h1 className="animate-box" data-animate-effect="fadeInUp">News & Trends</h1>
              <hr className="animate-box" data-animate-effect="fadeInUp" />
              <p className="animate-box" data-animate-effect="fadeInUp">
                Grab a cuppa, a doughnut and get comfy to read our latest news & trends.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="line-vr-section"></div>

      {/* Blog Section */}
      <section className="blog2 section-padding">
        <div className="container">
          <div className="row">
            {/* Blog Posts */}
            <div className="col-md-8">
              <div className="row">
                {currentBlogs.map((item) => (
                  <div className="col-md-12" key={item._id}>
                    <div className="item">
                      <div className="post-img">
                        <Link to="/post">
                          <img src={`${import.meta.env.VITE_API_URL}${item.img}`} alt={item.title} />
                        </Link>
                        <div className="date">
                          <Link to="/post">
                            <span>{new Date(item.date).toLocaleString('default', { month: 'short' })}</span>{" "}
                            <i>{new Date(item.date).getDate()}</i>
                          </Link>
                        </div>
                      </div>
                      <div className="post-cont">
                        <Link to="/blog"><span className="tag">{item.tag || 'Blog'}</span></Link>
                        <h5><Link to="/post">{item.title}</Link></h5>
                        <p>{item.content.substring(0, 250)}...</p>
                        <Link to="/post" className="btn-curve btn-1"><span>Read More</span></Link>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="col-md-12">
                    <ul className="pagination-wrap align-center mb-30 mt-30">
                      <li>
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (currentPage > 1) paginate(currentPage - 1);
                          }}
                        >
                          <i className="ti-angle-left"></i>
                        </a>
                      </li>
                      {Array.from({ length: totalPages }).map((_, index) => (
                        <li key={index}>
                          <a
                            href="#"
                            className={currentPage === index + 1 ? "active" : ""}
                            onClick={(e) => {
                              e.preventDefault();
                              paginate(index + 1);
                            }}
                          >
                            {index + 1}
                          </a>
                        </li>
                      ))}
                      <li>
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (currentPage < totalPages) paginate(currentPage + 1);
                          }}
                        >
                          <i className="ti-angle-right"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-md-4">
              <div className="blog2-sidebar row">
                <div className="col-md-12">
                  <div className="widget search">
                    <form>
                      <input type="text" name="search" placeholder="Type here ..." />
                      <button type="submit"><i className="ti-search" aria-hidden="true"></i></button>
                    </form>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="widget">
                    <div className="widget-title"><h6>Recent Posts</h6></div>
                    <ul className="recent">
                      {blogs.slice(0, 3).map((item, index) => (
                        <li key={item._id || index}>
                          <div className="thum">
                            <img src={`${import.meta.env.VITE_API_URL}${item.img}`} alt={item.title} />
                          </div>
                          <Link to="/post">{item.title}</Link>
                          <Link to="/post">{item.tag}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="widget">
                    <div className="widget-title"><h6>Archives</h6></div>
                    <ul>
                      <li><a href="#">December 2025</a></li>
                      <li><a href="#">November 2025</a></li>
                      <li><a href="#">October 2025</a></li>
                    </ul>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="widget">
                    <div className="widget-title"><h6>Categories</h6></div>
                    <ul>
                      <li><a href="#"><i className="ti-angle-right"></i> Tattooing</a></li>
                      <li><a href="#"><i className="ti-angle-right"></i> Piercing</a></li>
                      <li><a href="#"><i className="ti-angle-right"></i> Laser Removal</a></li>
                    </ul>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="widget">
                    <div className="widget-title"><h6>Tags</h6></div>
                    <ul className="tags">
                      <li><a href="#">Tattoo</a></li>
                      <li><a href="#">Piercing</a></li>
                      <li><a href="#">Laser</a></li>
                      <li><a href="#">Removal</a></li>
                      <li><a href="#">Studio</a></li>
                      <li><a href="#">Artist</a></li>
                    </ul>
                  </div>
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

export default BlogPage;
