// src/components/LandingPage/HeroSection.js
import React from 'react';

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1>WellandGood Insurance</h1>
          <p>Life insurance that rewards healthy living</p>
          <div className="cta-buttons">
            <button className="btn primary">Get Started</button>
            <button className="btn secondary">Learn More</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;