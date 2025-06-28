import React from 'react';

function PremiumCalculator(props) {
  const { premium } = props;

  return (
    <div className="premium-card">
      <h3>Your Insurance Premium</h3>
      <div className="premium-display">
        <h4>${premium.toFixed(2)}</h4>
        <span>per month</span>
      </div>
      <div className="premium-explanation">
        <p>This premium is calculated based on:</p>
        <ul>
          <li>Your current health metrics</li>
          <li>Risk assessment analysis</li>
          <li>Historical trends</li>
        </ul>
        <div className="savings-notice">
          <p>Maintain healthy habits to potentially lower your premium next month!</p>
        </div>
      </div>
    </div>
  );
}

export default PremiumCalculator;