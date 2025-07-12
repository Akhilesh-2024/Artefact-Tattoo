
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="footer-column footer-contact">
                <h3 className="footer-title">Contact</h3>
                <p className="footer-contact-text">
                  0665 Broadway NY, New York 10001
                  <br />
                  United States of America
                </p>
                <div className="footer-contact-info">
                  <p className="footer-contact-phone">855 100 4444</p>
                  <p className="footer-contact-mail">info@tattoo.com</p>
                </div>
                <div className="footer-about-social-list">
                  <a href="#">
                    <i className="ti-instagram" />
                  </a>
                  <a href="#">
                    <i className="ti-twitter" />
                  </a>
                  <a href="#">
                    <i className="ti-youtube" />
                  </a>
                  <a href="#">
                    <i className="ti-facebook" />
                  </a>
                  <a href="#">
                    <i className="ti-pinterest" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-3 offset-md-1">
              <div className="item opening">
                <h3 className="footer-title">Work Time</h3>
                <ul>
                  <li>
                    <div className="tit">Monday</div>
                    <div className="dots" />
                    <span>10:00 - 20:00</span>
                  </li>
                  <li>
                    <div className="tit">Tuesday</div>
                    <div className="dots" />
                    <span>10:00 - 20:00</span>
                  </li>
                  <li>
                    <div className="tit">Thursday</div>
                    <div className="dots" />
                    <span>10:00 - 20:00</span>
                  </li>
                  <li>
                    <div className="tit">Friday</div>
                    <div className="dots" />
                    <span>10:00 - 20:00</span>
                  </li>
                  <li>
                    <div className="tit">Saturday</div>
                    <div className="dots" />
                    <span>10:00 - 20:00</span>
                  </li>
                  <li>
                    <div className="tit">Weekend</div>
                    <div className="dots" />
                    <span>Closed</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-4 offset-md-1">
              <div className="footer-column footer-explore clearfix">
                <h3 className="footer-title">Subscribe</h3>
                <div className="row subscribe">
                  <div className="col-md-12">
                    <p>
                      Subscribe to take advantage of our campaigns and gift
                      certificates.
                    </p>
                    <form>
                      <input
                        type="text"
                        name="search"
                        placeholder="Your email"
                        required
                      />
                      <button>Subscribe</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="footer-bottom-inner">
                <p className="footer-bottom-copy-right">
                  2025 © All rights reserved. Designed by{" "}
                  <a
                    href="https://1.envato.market/DuruThemes"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    DuruThemes
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
