import React from 'react';
import logo from '../../assets/logo.png';
import gandhi from '../../assets/satyamev_jayte.png'
import './Navbar.css'
function Navbar() {
  return (
    <>
      <nav>
        <img src={logo} alt="College Logo" />
        <div className="nav-title">
          <span className="hindi">भारतीय सूचना प्रौद्योगिकी संस्थान, भोपाल</span>
          <span className="english">Indian Institute Of Information Technology, Bhopal</span>
          <span className="description">(An Autonomous Institute of National Importance under act of Parliament)</span>
        </div>
        <div className="nav-right">
          <img src={gandhi} alt="Satyamev jayte" />
        </div>
      </nav>
    </>
  );
}

export default Navbar;