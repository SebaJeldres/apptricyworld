import React from 'react';
import '../styles/Footer.css';
import { FaEnvelope, FaFacebook, FaInstagram, FaPhone } from 'react-icons/fa';

function Header() {
  return (
    <div className="Footer">
      <header className="footer">
        <h1>TricyWorld</h1>
       
        <nav className="navbar">
          <ul className="navbar-text">
            <li><FaEnvelope /> </li>
            <li><FaFacebook /></li>
            <li><FaInstagram /></li>
            <li><FaPhone /></li>
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default Header;
