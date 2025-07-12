
const Blog = () => {
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
            <div className="item">
              <div className="post-img">
                <a href="post.html">
                  <div className="img">
                    <img src="img/news/1.jpg" alt="" />
                  </div>
                </a>
              </div>
              <div className="cont">
                <h4>
                  <a href="post.html">Top Ten Creative Tattoo Styles</a>
                </h4>
                <div className="info">
                  <a href="blog.html">
                    <span>Blog</span>
                  </a>
                  <a href="blog.html">December, 29</a>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="post-img">
                <a href="post.html">
                  <div className="img">
                    <img src="img/news/2.jpg" alt="" />
                  </div>
                </a>
              </div>
              <div className="cont">
                <h4>
                  <a href="#0">Best Tattoo Back Ideas</a>
                </h4>
                <div className="info">
                  <a href="blog.html">
                    <span>Blog</span>
                  </a>
                  <a href="blog.html">December, 27</a>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="post-img">
                <a href="post.html">
                  <div className="img">
                    <img src="img/news/3.jpg" alt="" />
                  </div>
                </a>
              </div>
              <div className="cont">
                <h4>
                  <a href="#0">Best Wrap Around Tattoo Ideas</a>
                </h4>
                <div className="info">
                  <a href="blog.html">
                    <span>Blog</span>
                  </a>
                  <a href="blog.html">December, 25</a>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="post-img">
                <a href="post.html">
                  <div className="img">
                    <img src="img/news/4.jpg" alt="" />
                  </div>
                </a>
              </div>
              <div className="cont">
                <h4>
                  <a href="post.html">Top Seven Piercing Styles</a>
                </h4>
                <div className="info">
                  <a href="blog.html">
                    <span>Blog</span>
                  </a>
                  <a href="blog.html">December, 24</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
