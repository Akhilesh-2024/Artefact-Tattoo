
const About = () => {
  return (
    <section className="about section-padding">
      <div className="container">
        <div className="row">
          <div
            className="col-md-7 animate-box"
            data-animate-effect="fadeInLeft"
          >
            <div className="section-subtitle">Established 1985</div>
            <div className="section-title white">
              Artefact <span>Tattoo</span>
            </div>
            <p>
              Tattoo viverra tristique usto duis vitae diam neque nivamus
              aestan the artine arinian aten mis viverra nec lacus nedana duru
              edino setlie suscipe curas tristique inila duman aten elit
              finibus vivera alacus fermen. Lorem arena nuam enim mi obortis
              esen the uctus cumsan solden malisuametion ametion in the auctor
              orci done vitae.
            </p>
            <ul className="about-list list-unstyled">
              <li>
                <div className="about-list-icon">
                  <span className="ti-check" />
                </div>
                <div className="about-list-text">
                  <p>Comfortable and relaxing environment</p>
                </div>
              </li>
              <li>
                <div className="about-list-icon">
                  <span className="ti-check" />
                </div>
                <div className="about-list-text">
                  <p>Experienced artist input on your tattoo</p>
                </div>
              </li>
              <li>
                <div className="about-list-icon">
                  <span className="ti-check" />
                </div>
                <div className="about-list-text">
                  <p>Top of the line cleaning and safety protocols</p>
                </div>
              </li>
              <li>
                <div className="about-list-icon">
                  <span className="ti-check" />
                </div>
                <div className="about-list-text">
                  <p>Full aftercare instructions for a well-healed tattoo</p>
                </div>
              </li>
            </ul>
          </div>
          <div
            className="col-md-5 mt-30 animate-box"
            data-animate-effect="fadeInRight"
          >
            <img src="img/about.jpg" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
