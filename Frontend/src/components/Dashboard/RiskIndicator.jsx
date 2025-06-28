import React from 'react';

function RiskIndicator(props) {
  const { riskLevel } = props;

  const getRiskColor = () => {
    switch(riskLevel.toLowerCase()) {
      case 'high': return 'var(--danger)';
      case 'medium': return 'var(--warning)';
      case 'low': return 'var(--success)';
      default: return 'var(--text-light)';
    }
  };

  return (
    <div className="risk-card">
      <h3>Health Risk Assessment</h3>
      <div className="risk-level">
        <div 
          className="risk-badge" 
          style={{ backgroundColor: getRiskColor() }}
        >
          {riskLevel.toUpperCase()}
        </div>
      </div>

      <div className="risk-description">
        <p>Based on your recent health data, your risk level is <strong>{riskLevel}</strong>.</p>
        <ul>
          {riskLevel === 'high' && (
            <li>Consider increasing physical activity</li>
          )}
          {riskLevel === 'medium' && (
            <li>Maintain current habits for improvement</li>
          )}
          {riskLevel === 'low' && (
            <li>Excellent! Keep up the healthy lifestyle</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default RiskIndicator;
