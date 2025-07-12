
const Process = () => {
  return (
    <section className="section-padding">
      <div className="container">
        <div className="row">
          <div
            className="col-md-5 section-head animate-box"
            data-animate-effect="fadeInLeft"
          >
            <div className="section-subtitle">Our Process</div>
            <div className="section-title white">
              How It <span>Works</span>
            </div>
            <p>
              Tattoo viverra tristique usto duis vitae diam neque nivamus
              aestan atene artine arinianu ateli finibus viverra nec lacus
              nedana duru meetion setlie in the miss fermen.
            </p>
            <ul className="about-list list-unstyled">
              <li>
                <div className="about-list-icon">
                  <span className="ti-layout-line-solid" />
                </div>
                <div className="about-list-text">
                  <p>We're professional and certified tattoo</p>
                </div>
              </li>
              <li>
                <div className="about-list-icon">
                  <span className="ti-layout-line-solid" />
                </div>
                <div className="about-list-text">
                  <p>We care about our customers satisfaction</p>
                </div>
              </li>
            </ul>
          </div>
          <div
            className="col-md-6 offset-md-1 mt-30 animate-box"
            data-animate-effect="fadeInRight"
          >
            <div
              className="accrodion-grp"
              data-grp-name="process-faq-one-accrodion"
            >
              <div className="accrodion active">
                <div className="accrodion-title">
                  <h4>
                    <span>1.</span> Free Consultation
                  </h4>
                </div>
                <div className="accrodion-content">
                  <div className="inner">
                    <p>
                      Email us or come into the shop to discuss your tattoo.
                      Bring your ideas, and we'll guide you on how to make it
                      a tattoo you'll love.
                    </p>
                  </div>
                </div>
              </div>
              <div className="accrodion">
                <div className="accrodion-title">
                  <h4>
                    <span>2.</span> Book An Appointment
                  </h4>
                </div>
                <div className="accrodion-content">
                  <div className="inner">
                    <p>
                      Once you've decided what you want, we will give you a
                      quote so you can book the date for your tattoo and pay
                      your deposit.
                    </p>
                  </div>
                </div>
              </div>
              <div className="accrodion last-chiled">
                <div className="accrodion-title">
                  <h4>
                    <span>3.</span> Get Your Tattoo
                  </h4>
                </div>
                <div className="accrodion-content">
                  <div className="inner">
                    <p>
                      When you arrive at the shop, your artist will have your
                      design prepared. Now you settle in and enjoy getting
                      your new tattoo.
                    </p>
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

export default Process;
