import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HeroSection.css';
import api from '../../api';

const HeroSection = () => {
  const navigate = useNavigate();
  const nextSectionRef = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // loading guard

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const res = await api.post('/api/auth/loginStatus', {}, { withCredentials: true });
        if (res.data?.isLoggedIn) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (err) {
        console.error("Status check error:", err);
        setIsLoggedIn(false); // fallback in case of error
      } finally {
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  const handleScroll = () => {
    nextSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Well&Good</h1>
            <p>Life insurance that rewards healthy living</p>
            <div className="cta-buttons">
              {!loading && (
                <button
                  className="btn"
                  onClick={() => navigate(isLoggedIn ? '/dashboard' : '/login')}
                >
                  Get Started
                </button>
              )}
              <button className="btn" onClick={handleScroll}>
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      <section ref={nextSectionRef} className="info-section">
        <div className="container">
          {/* Add informational content here */}
        </div>
      </section>
    </>
  );
};

export default HeroSection;
