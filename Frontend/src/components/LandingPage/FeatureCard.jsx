// src/components/LandingPage/FeatureCard.js
import React from 'react';

const FeatureCard = ({ title, description }) => {
  return (
    <div className="feature-card">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default FeatureCard; // Must be default export