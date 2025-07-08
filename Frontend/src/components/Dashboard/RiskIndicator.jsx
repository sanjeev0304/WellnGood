import React from 'react';

function RiskIndicator({ riskLevel }) {
  const getRiskColor = () => {
    const level = riskLevel.toLowerCase();

    if (level === 'low') return '#00c853';      // Green
    if (level === 'medium') return '#ffeb3b';   // Yellow
    if (level === 'high') return '#d50000';     // Red
    return '#9e9e9e';                           // Default gray
  };

  const riskColor = getRiskColor();

  return (
    <div className="risk-card">
      <h3 className="risk-heading">Health Risk Assessment</h3>

      <div className="risk-level" style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
        <div
          className="risk-badge"
          style={{
            background: `linear-gradient(135deg, ${riskColor} 0%,rgb(255, 250, 250) 100%)`, // Gradient to soft white
            color: '#1a1a1a',
            fontWeight: '600',
            padding: '10px 24px',
            borderRadius: '999px',
            display: 'inline-block',
            fontSize: '1rem',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            transition: 'transform 0.2s ease-in-out',
          }}
        >
          {riskLevel}
        </div>
      </div>



      <div className="risk-description">
        <p>
          Based on your recent health data, your risk level is{' '}
          <strong style={{ color: riskColor }}>{riskLevel}</strong>.
        </p>
        <ul>
          {riskLevel === 'high' && (
            <>
              <li>Consider increasing physical activity</li>
              <li>Monitor key vitals daily</li>
              <li>Consult a health professional</li>
            </>
          )}
          {riskLevel === 'medium' && (
            <>
              <li>Maintain current healthy habits</li>
              <li>Stay active and hydrated</li>
              <li>Keep monitoring trends</li>
            </>
          )}
          {riskLevel === 'low' && (
            <>
              <li>Excellent! Keep up the great work</li>
              <li>Maintain a balanced lifestyle</li>
              <li>Regularly review your progress</li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default RiskIndicator;
