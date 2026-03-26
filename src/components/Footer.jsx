import React, { useState } from "react";
import "./Footer.css";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thanks for signing up: ${email}`);
    setEmail("");
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="footer">
      {/* Logo and Featured Events */}
      <div className="footer-brand">
        <div className="footer-logo">
          <span className="event">Event</span>
          <span className="ify">ify</span>
        </div>
         <div className="social-icons">
          <a href="" className="social-icon" aria-label="Facebook">
            <FaFacebookF />
          </a>
          <a href="" className="social-icon" aria-label="Twitter">
            <FaTwitter />
          </a>
          <a href="" className="social-icon" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="" className="social-icon" aria-label="LinkedIn">
            <FaLinkedinIn />
          </a>
          <a href="" className="social-icon" aria-label="YouTube">
            <FaYoutube />
          </a>
        </div>
      </div>

      {/* Quick Links */}
      <div className="footer-links-container">
        <h5 className="footer-heading">Quick Links</h5>
        <ul className="footer-links">
          <li onClick={() => scrollToSection("home")}>Home</li>
          <li onClick={() => scrollToSection("events")}>Events</li>
          <li onClick={() => scrollToSection("contact")}>Contact</li>
        </ul>
      </div>

      {/* Newsletter Signup */}
      <div className="footer-signup">
        <h5 className="footer-heading">Subscribe to Newsletter</h5>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Subscribe</button>
        </form>
        
      </div>
    </footer>
  );
};

export default Footer;