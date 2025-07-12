import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import PromoVideoTestimonials from "../Components/Main/PromoVideoTestimonials";
import Clients from "../Components/Main/Clients";

const BlogPage = () => {
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
    console.log("BlogPage mounted");
    
    // Force re-initialization of scripts
    setTimeout(() => {
      if (typeof window.initPageScripts === 'function') {
        window.initPageScripts('/blog');
      }
    }, 200);
    
    // Cleanup function
    return () => {
      console.log("BlogPage unmounted");
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
            <div className="col-md-6 text-left caption mt-90">
              <h5 className="animate-box" data-animate-effect="fadeInUp">
                <Link to="/">Home</Link> / Blog
              </h5>
              <h1 className="animate-box" data-animate-effect="fadeInUp">News & Trends</h1>
              <hr className="animate-box" data-animate-effect="fadeInUp" />
              <p className="animate-box" data-animate-effect="fadeInUp">
                Grab a cuppa, a doughnut and get comfy to read our latest news & trends. Lorem ipsum potenti fringilla pretium ipsum non blan ipsum.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* hr */}
      <div className="line-vr-section"></div>
      
      {/* Blog */}
      <section className="blog2 section-padding">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-12">
                  <div className="item">
                    <div className="post-img">
                      <Link to="/post">
                        <img src="img/news/1.jpg" alt="" />
                      </Link>
                      <div className="date">
                        <Link to="/post">
                          <span>Dec</span> <i>29</i>
                        </Link>
                      </div>
                    </div>
                    <div className="post-cont">
                      <Link to="/blog"><span className="tag">Blog</span></Link>
                      <h5><Link to="/post">Top Ten Tattoo Styles</Link></h5>
                      <p>
                        Lorem ipsum potenti fringilla pretium ipsum non blandit. Vivamus eget nisi non mi iaculis iaculis imperie quiseros sevin elentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis enesta mauris
                        suscipit mis nec est aliquam, a tincidunt eros iacu suscipit risus eu ullamcoren.
                      </p>
                      <Link to="/post" className="btn-curve btn-1"><span>Read More</span></Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="item">
                    <div className="post-img">
                      <Link to="/post">
                        <img src="img/news/2.jpg" alt="" />
                      </Link>
                      <div className="date">
                        <Link to="/post">
                          <span>Dec</span> <i>27</i>
                        </Link>
                      </div>
                    </div>
                    <div className="post-cont">
                      <Link to="/blog"><span className="tag">Blog</span></Link>
                      <h5><Link to="/post">Best Tattoo Back Ideas</Link></h5>
                      <p>
                        Lorem ipsum potenti fringilla pretium ipsum non blandit. Vivamus eget nisi non mi iaculis iaculis imperie quiseros sevin elentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis enesta mauris
                        suscipit mis nec est aliquam, a tincidunt eros iacu suscipit risus eu ullamcoren.
                      </p>
                      <Link to="/post" className="btn-curve btn-1"><span>Read More</span></Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="item">
                    <div className="post-img">
                      <Link to="/post">
                        <img src="img/news/3.jpg" alt="" />
                      </Link>
                      <div className="date">
                        <Link to="/post">
                          <span>Dec</span> <i>25</i>
                        </Link>
                      </div>
                    </div>
                    <div className="post-cont">
                      <Link to="/blog"><span className="tag">Blog</span></Link>
                      <h5><Link to="/post">Best Wrap Around Tattoo Ideas</Link></h5>
                      <p>
                        Lorem ipsum potenti fringilla pretium ipsum non blandit. Vivamus eget nisi non mi iaculis iaculis imperie quiseros sevin elentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis enesta mauris
                        suscipit mis nec est aliquam, a tincidunt eros iacu suscipit risus eu ullamcoren.
                      </p>
                      <Link to="/post" className="btn-curve btn-1"><span>Read More</span></Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  {/* Pagination */}
                  <ul className="pagination-wrap align-center mb-30 mt-30">
                    <li><a href="#"><i className="ti-angle-left"></i></a></li>
                    <li><a href="#">1</a></li>
                    <li><a href="#" className="active">2</a></li>
                    <li><a href="#">3</a></li>
                    <li><a href="#"><i className="ti-angle-right"></i></a></li>
                  </ul>
                </div>
              </div>
            </div>
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
                    <div className="widget-title">
                      <h6>Recent Posts</h6>
                    </div>
                    <ul className="recent">
                      <li>
                        <div className="thum">
                          <img src="img/news/1.jpg" alt="" />
                        </div>
                        <Link to="/post">Top Ten Tattoos Styles</Link>
                      </li>
                      <li>
                        <div className="thum">
                          <img src="img/news/2.jpg" alt="" />
                        </div>
                        <Link to="/post">Best Tattoo Back Ideas</Link>
                      </li>
                      <li>
                        <div className="thum">
                          <img src="img/news/3.jpg" alt="" />
                        </div>
                        <Link to="/post">Best Wrap Around Tattoo Ideas</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="widget">
                    <div className="widget-title">
                      <h6>Archives</h6>
                    </div>
                    <ul>
                      <li><a href="#">December 2025</a></li>
                      <li><a href="#">November 2025</a></li>
                      <li><a href="#">October 2025</a></li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="widget">
                    <div className="widget-title">
                      <h6>Categories</h6>
                    </div>
                    <ul>
                      <li><a href="#"><i className="ti-angle-right"></i>Tattooing</a></li>
                      <li><a href="#"><i className="ti-angle-right"></i>Piercing</a></li>
                      <li><a href="#"><i className="ti-angle-right"></i>Laser Removal</a></li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="widget">
                    <div className="widget-title">
                      <h6>Tags</h6>
                    </div>
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