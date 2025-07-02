// src/pages/LandingPage.js
import React from 'react';
<<<<<<< HEAD
import HeroSection from '../components/LandingPage/HeroSection';
import FeatureCard from '../components/LandingPage/FeatureCard';
import BenefitsSection from '../components/LandingPage/BenefitsSection';
import './LandingPage.css';
=======
import HeroSection from '../components/LandingPage/HeroSection'; // Default import
import SlideShow from '../components/LandingPage/FeatureCard'; // Default import
import BenefitsSection from '../components/LandingPage/BenefitsSection'; // Default import
import AboutUs from './AboutUs';
>>>>>>> 24cea7e (Updated LandingPage and AboutUs)

const LandingPage = () => {
  return (
    <div className="landing-page">
      <HeroSection />

<<<<<<< HEAD
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
=======

      <SlideShow />
>>>>>>> 24cea7e (Updated LandingPage and AboutUs)

      <BenefitsSection />

      <AboutUs />
    </div>
  );
};

export default LandingPage;
