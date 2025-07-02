import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import profilePic from './profile.jpg';
import api from '../api';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);


    api.post('/api/auth/loginStatus', {}, { withCredentials: true })
      .then(res => {
        if (res.data.isLoggedIn) {

          setUser(res.data.user);
        }
      })
      .catch(err => console.error("Status check error:", err));

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = async () => {
    try {
      await api.post('/api/auth/logout', {}, { withCredentials: true });
      setUser(null);
      setIsDropdownOpen(false);
      navigate('/');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const styles = {
    navbar: {
      backgroundColor: '#222629',
      padding: '1rem 0',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      fontFamily: "'Poppins', sans-serif",
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
      fontSize: '1.8rem',
      fontWeight: 700,
      textDecoration: 'none',
    },
    navLinks: {
      display: isMobile ? (isMenuOpen ? 'flex' : 'none') : 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      position: isMobile ? 'absolute' : 'static',
      top: '70px',
      left: 0,
      width: isMobile ? '100%' : 'auto',
      backgroundColor: isMobile ? '#111' : 'transparent',
      padding: isMobile ? '1.5rem' : 0,
      gap: '1.5rem',
      alignItems: isMobile ? 'flex-start' : 'center',
      marginLeft: 'auto',
    },
    navLink: {
      color: '#FFA500',
      backgroundColor: 'transparent',
      border: 'none',
      textDecoration: 'none',
      fontWeight: 500,
      padding: '0.5rem 1.5rem',
      borderRadius: '6px',
      fontSize: '1.3rem',
      transition: 'all 0.3s ease',
    },
    navLinkHover: {
      backgroundColor: '#fff',
      color: '#000',
    },
    hamburger: {
      display: isMobile ? 'block' : 'none',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '0.5rem',
    },
    hamburgerLine: {
      display: 'block',
      width: '25px',
      height: '3px',
      backgroundColor: '#fff',
      margin: '4px 0',
      transition: 'transform 0.3s, opacity 0.3s',
    },
    profileImage: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      cursor: 'pointer',
      border: '2px solid #FFA500',
    },
    dropdown: {
      position: 'absolute',
      top: '60px',
      right: '2rem',
      backgroundColor: '#333',
      padding: '1rem',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
    },
    dropdownLink: {
      color: '#FFA500',
      textDecoration: 'none',
      fontWeight: 500,
      fontSize: '1rem',
    },
  };

  const handleHover = (e, entering) => {
    if (entering) {
      e.currentTarget.style.backgroundColor = styles.navLinkHover.backgroundColor;
      e.currentTarget.style.color = styles.navLinkHover.color;
    } else {
      e.currentTarget.style.backgroundColor = styles.navLink.backgroundColor;
      e.currentTarget.style.color = styles.navLink.color;
    }
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        {/* Logo */}
        <Link to="/" style={styles.logo}>
          <span style={{ color: '#FFA500' }}>Well</span>
          <span style={{ color: '#fff' }}>n</span>
          <span style={{ color: '#FFA500' }}>Good</span>
        </Link>

        {/* Navigation Links */}
        <div style={styles.navLinks}>
          <Link
            to="/dashboard"
            style={styles.navLink}
            onMouseEnter={(e) => handleHover(e, true)}
            onMouseLeave={(e) => handleHover(e, false)}
            onClick={() => setIsMenuOpen(false)}
          >
            Dashboard
          </Link>

          <Link
            to="/about"
            style={styles.navLink}
            onMouseEnter={(e) => handleHover(e, true)}
            onMouseLeave={(e) => handleHover(e, false)}
            onClick={() => setIsMenuOpen(false)}
          >
            About Us
          </Link>

          {!user ? (
            <Link
              to="/login"
              style={styles.navLink}
              onMouseEnter={(e) => handleHover(e, true)}
              onMouseLeave={(e) => handleHover(e, false)}
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
          ) : (
            <div style={{ position: 'relative' }}>
              <img
                src={user.photo || profilePic}
                alt="Profile"
                style={styles.profileImage}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              />
              {isDropdownOpen && (
                <div style={styles.dropdown}>
                  {/* <Link
                    to="/dashboard"
                    style={styles.dropdownLink}
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Dashboard
                  </Link> */}
                  <button
                    onClick={handleLogout}
                    style={{
                      ...styles.dropdownLink,
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Hamburger Icon */}
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
