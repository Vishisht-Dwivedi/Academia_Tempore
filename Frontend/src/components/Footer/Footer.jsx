import React from 'react';
import './Footer.css'
const Footer = () => {
  return (
    <footer className="site-footer">
      <p>&copy; {new Date().getFullYear()} IIIT Bhopal. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;