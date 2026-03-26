import React, { useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaCommentDots, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaMapMarkerAlt } from "react-icons/fa";
import "./Contact.css";
import { BiColor } from "react-icons/bi";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you ${formData.name}, we received your message!`);
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        
        {/* Left Content - Plain */}
        <div className="contact-info">
          <h2>Contact <span style={{ color: "purple" }}>Us</span></h2>
          <p>We'd love to hear from you! Reach out for any queries, Local events or partnership opportunities.</p>

          <div className="contact-details">
            <div className="info-item">
              <div className="info-icon-circle">
                <FaPhone />
              </div>
              <span>+1 234 567 890</span>
            </div>
            <div className="info-item">
              <div className="info-icon-circle">
                <FaEnvelope />
              </div>
              <span>contact@eventify.com</span>
            </div>
            <div className="info-item">
              <div className="info-icon-circle">
                <FaMapMarkerAlt />
              </div>
              <span>123 Eventify Street, City, Country</span>
            </div>
          </div>

          <div className="social-icons-container">
            <h4>Follow Us</h4>
            <div className="social-icons">
              <a href="#" className="social-icon-circle" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="#" className="social-icon-circle" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="#" className="social-icon-circle" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="#" className="social-icon-circle" aria-label="LinkedIn">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        {/* Right Form - In Box */}
        <div className="contact-form">
          <div className="form-wrapper">
            <h3>Send us a Message</h3>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <FaUser className="input-icon" />
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="input-group">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div className="input-group">
                <FaPhone className="input-icon" />
                <input
                  type="tel"
                  placeholder="Your Phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div className="input-group">
                <FaCommentDots className="input-icon" />
                <textarea
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>
              <button type="submit">Send Message</button>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Contact;