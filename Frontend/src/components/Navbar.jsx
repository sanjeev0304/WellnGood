import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">WellandGood</Link>

        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/about">About Us</Link>
          <Link to="/login" className="login-btn">Login</Link>
        </div>

        <button className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          ☰
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
