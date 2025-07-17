import React, { useEffect, useState } from "react";
import axios from "axios";

const Footer = () => {
  const [footerData, setFooterData] = useState(null);
  const [emailInput, setEmailInput] = useState("");
  const [subscribeMessage, setSubscribeMessage] = useState("");

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const API = import.meta.env.VITE_API_URL;
        const res = await axios.get(`${API}/api/tatto/footer`);
        setFooterData(res.data);
      } catch (err) {
        console.error("Failed to load footer data", err);
      }
    };

    fetchFooterData();
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!emailInput) return;

    try {
      const API = import.meta.env.VITE_API_URL;
      const res = await axios.post(`${API}/api/tatto/subscribe`, { email: emailInput });
      setSubscribeMessage(res.data.message || "Subscribed successfully!");
      setEmailInput("");
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Subscription failed.";
      setSubscribeMessage(msg);
    }

    setTimeout(() => setSubscribeMessage(""), 5000);
  };

  if (!footerData) return null;

  const { address, phone, email, socialLinks, workHours, subscribeText } = footerData;

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="row">
            {/* Contact Info */}
            <div className="col-md-3">
              <div className="footer-column footer-contact">
                <h3 className="footer-title">Contact</h3>
                <p className="footer-contact-text">
                  {address?.line1}
                  <br />
                  {address?.line2}
                </p>
                <div className="footer-contact-info">
                  <p className="footer-contact-phone">{phone}</p>
                  <p className="footer-contact-mail">{email}</p>
                </div>
                <div className="footer-about-social-list">
                  {socialLinks?.instagram && (
                    <a href={socialLinks.instagram} target="_blank" rel="noreferrer">
                      <i className="ti-instagram" />
                    </a>
                  )}
                  {socialLinks?.twitter && (
                    <a href={socialLinks.twitter} target="_blank" rel="noreferrer">
                      <i className="ti-twitter" />
                    </a>
                  )}
                  {socialLinks?.youtube && (
                    <a href={socialLinks.youtube} target="_blank" rel="noreferrer">
                      <i className="ti-youtube" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Work Hours */}
            <div className="col-md-3 offset-md-1">
              <div className="item opening">
                <h3 className="footer-title">Work Time</h3>
                <ul>
                  {workHours?.map((item, idx) => (
                    <li key={idx}>
                      <div className="tit">{item.day}</div>
                      <div className="dots" />
                      <span>{item.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Subscribe */}
            <div className="col-md-4 offset-md-1">
              <div className="footer-column footer-explore clearfix">
                <h3 className="footer-title">Subscribe</h3>
                <div className="row subscribe">
                  <div className="col-md-12">
                    <p>{subscribeText}</p>
                    <form onSubmit={handleSubscribe}>
                      <input
                        type="email"
                        name="email"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        placeholder="Your email"
                        required
                      />
                      <button type="submit">Subscribe</button>
                    </form>
                    {subscribeMessage && (
                      <p className="mt-2 text-sm text-green-500">{subscribeMessage}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="footer-bottom-inner">
                <p className="footer-bottom-copy-right">
                  2025 © All rights reserved. Designed by{" "}
                  <a
                    href="https://www.linkedin.com/in/akhilesh2022/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Akhilesh Jadhav
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
