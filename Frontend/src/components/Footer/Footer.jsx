import React from 'react';
import './Footer.css'
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Indian Institute of Information Technology, Bhopal</h3>
          <p>Pursuing Excellence in Information Technology Education and Research</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/timetable">Timetable</a></li>
            <li><a href="/academics">Academics</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Us</h4>
          <ul className="contact-info">
            <li><FaMapMarkerAlt /> Bhopal-Indore Highway, Madhya Pradesh</li>
            <li><FaPhone /> +91 755 123 4567</li>
            <li><FaEnvelope /> info@iiitbhopal.ac.in</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-links">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaLinkedin /></a>
            <a href="#"><FaInstagram /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} IIIT Bhopal. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;