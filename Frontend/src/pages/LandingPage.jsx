// src/pages/LandingPage.js
import React from 'react';
import HeroSection from '../components/LandingPage/HeroSection'; // Default import
import FeatureCard from '../components/LandingPage/FeatureCard'; // Default import
import BenefitsSection from '../components/LandingPage/BenefitsSection'; // Default import

const LandingPage = () => {
  return (
    <div className="landing-page">
      <HeroSection />
      
      <section className="features">
        <div className="container">
          <h2>How It Works</h2>
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