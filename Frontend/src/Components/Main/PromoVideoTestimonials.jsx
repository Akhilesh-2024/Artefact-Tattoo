
const PromoVideoTestimonials = () => {
  return (
    <section className="testimonials video-wrapper video">
      <div
        className="background bg-img bg-fixed section-padding pb-0"
        data-background="img/slider/2.jpg"
        data-overlay-dark={3}
      >
        <div className="container">
          <div className="row">
            {/* Promo video */}
            <div className="col-md-7 mb-30">
              <div className="vid-area valign">
                <a className="vid" href="https://youtu.be/UCRNVgJJ97w">
                  <span className="icon">
                    <i className="ti-control-play" />
                  </span>
                </a>
                <div className="cont">
                  <h5>Promo Video</h5>
                </div>
              </div>
            </div>
            {/* Testimonials */}
            <div
              className="col-md-5 animate-box"
              data-animate-effect="fadeInUp"
            >
              <div className="testimonials-box">
                <div className="owl-carousel owl-theme">
                  <div className="item">
                    <span className="quote">
                      <img src="img/quot.png" alt="" />
                    </span>
                    <p className="v-border">
                      Tattoo viverra tristique duis vitae dias the nesueten
                      niva aestan ateuene artines duruna setlie suscena fermen
                      uisque sed tellus man lorem nullaman the rana tortor in
                      the felis fermen.
                    </p>
                    <div className="info">
                      <div className="author-img">
                        <img src="img/team/1.jpg" alt="" />
                      </div>
                      <div className="cont">
                        <h6>Jason Brown</h6> <span>Customer Review</span>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <span className="quote">
                      <img src="img/quot.png" alt="" />
                    </span>
                    <p className="v-border">
                      Tattoo viverra tristique duis vitae dias the nesueten
                      niva aestan ateuene artines duruna setlie suscena fermen
                      uisque sed tellus man lorem nullaman the rana tortor in
                      the felis fermen.
                    </p>
                    <div className="info">
                      <div className="author-img">
                        <img src="img/team/2.jpg" alt="" />
                      </div>
                      <div className="cont">
                        <h6>Emily White</h6> <span>Customer Review</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoVideoTestimonials;
