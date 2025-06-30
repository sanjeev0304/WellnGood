// src/pages/LandingPage.js
import React from 'react';
import HeroSection from '../components/LandingPage/HeroSection';
import FeatureCard from '../components/LandingPage/FeatureCard';
import BenefitsSection from '../components/LandingPage/BenefitsSection';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <HeroSection />

      <section className="features">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <div className="features-grid">
            <FeatureCard
              title="Google Fit Integration"
              description="Seamlessly connect your health data from Google Fit"
            />
            <FeatureCard
              title="Dynamic Premium Adjustment"
              description="Your insurance costs update based on real-time health metrics"
            />
            <FeatureCard
              title="Risk Clustering"
              description="Personalized risk assessment (High/Medium/Low)"
            />
          </div>
        </div>
      </section>

      <BenefitsSection />
    </div>
  );
};

export default LandingPage;
