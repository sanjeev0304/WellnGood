import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Style objects
  const styles = {
    navbar: {
      backgroundColor: '#ffffff',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      padding: '1rem 0',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
    },
    container: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 2rem',
    },
    logo: {
      fontSize: '1.5rem',
      fontWeight: 700,
      color: '#4EA685',
      textDecoration: 'none',
    },
    navLinks: {
      display: 'flex',
      gap: '2rem',
      alignItems: 'center',
      transition: 'all 0.3s ease',
    },
    navLink: {
      color: '#333',
      textDecoration: 'none',
      fontWeight: 500,
      transition: 'color 0.3s',
    },
    navLinkHover: {
      color: '#4EA685',
    },
    loginButton: {
      backgroundColor: '#4EA685',
      color: 'white',
      border: 'none',
      padding: '0.5rem 1.5rem',
      borderRadius: '5px',
      cursor: 'pointer',
      fontWeight: 500,
      transition: 'background-color 0.3s',
    },
    loginButtonHover: {
      backgroundColor: '#3a8a6d',
    },
    hamburger: {
      display: 'none',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '0.5rem',
    },
    hamburgerLine: {
      display: 'block',
      width: '25px',
      height: '2px',
      backgroundColor: '#333',
      margin: '5px 0',
      transition: 'transform 0.3s, opacity 0.3s',
    },
    // Mobile styles
    mobileNavLinks: {
      position: 'fixed',
      top: '70px',
      left: 0,
      width: '100%',
      backgroundColor: 'white',
      flexDirection: 'column',
      gap: '1rem',
      padding: '2rem',
      boxShadow: '0 5px 10px rgba(0, 0, 0, 0.1)',
    },
  };

  // Mobile responsive styles
  if (window.innerWidth <= 768) {
    styles.navLinks.display = isMenuOpen ? 'flex' : 'none';
    styles.hamburger.display = 'block';
    Object.assign(styles.navLinks, styles.mobileNavLinks);
  }

  const handleLoginClick = () => {
    setIsMenuOpen(false);
    navigate('/login');
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <Link to="/" style={styles.logo} onClick={() => setIsMenuOpen(false)}>
          WellandGood
        </Link>

        <div style={styles.navLinks}>
          <Link
            to="/dashboard"
            style={styles.navLink}
            onMouseEnter={(e) => e.currentTarget.style.color = styles.navLinkHover.color}
            onMouseLeave={(e) => e.currentTarget.style.color = styles.navLink.color}
            onClick={() => setIsMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            to="/about"
            style={styles.navLink}
            onMouseEnter={(e) => e.currentTarget.style.color = styles.navLinkHover.color}
            onMouseLeave={(e) => e.currentTarget.style.color = styles.navLink.color}
            onClick={() => setIsMenuOpen(false)}
          >
            About Us
          </Link>

          <button
            style={styles.loginButton}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = styles.loginButtonHover.backgroundColor}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = styles.loginButton.backgroundColor}
            onClick={handleLoginClick}
          >
            Login
          </button>
        </div>

        <button
          style={styles.hamburger}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span style={styles.hamburgerLine}></span>
          <span style={styles.hamburgerLine}></span>
          <span style={styles.hamburgerLine}></span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;