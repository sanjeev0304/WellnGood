import React from 'react';
import api from '../../api';
import { useState, useEffect } from 'react';
function RiskIndicator() {
  const getRiskColor = (riskConditon) => {
   
    console.log(riskConditon);
    if (riskConditon === 'low') return '#00c853';      // Green
    if (riskConditon === 'medium') return '#ffeb3b';   // Yellow
    if (riskConditon === 'high') return '#d50000';     // Red
    return '#9e9e9e';                           // Default gray
  };

  const [riskLevel, setRiskLevel] = useState(null); //empty 
  const [risk, setRisk] = useState("");
    
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/api/user/data');
        const level = Number( res.data.Cluster);
        console.log(level);
        setRiskLevel(level);
      } catch (err) {
        console.error('Error fetching user data', err);
      }
    };
  
    fetchData();
  }, []);
  
  useEffect(() => {
    if (riskLevel === 2) {
      setRisk('low');
    } else if (riskLevel === 1) {
      setRisk('medium');
    } else if (riskLevel === 0) {
      setRisk('high');
    }
  }, [riskLevel]);
  

  const riskColor = getRiskColor(risk);

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
          {risk}
        </div>
      </div>



      <div className="risk-description">
        <p>
          Based on your recent health data, your risk level is{' '}
          <strong style={{ color: riskColor }}>{risk}</strong>.
        </p>
        <ul>
          {risk === 'high' && (
            <>
              <li>Consider increasing physical activity</li>
              <li>Monitor key vitals daily</li>
              <li>Consult a health professional</li>
            </>
          )}
          {risk === 'medium' && (
            <>
              <li>Maintain current healthy habits</li>
              <li>Stay active and hydrated</li>
              <li>Keep monitoring trends</li>
            </>
          )}
          {risk === 'low' && (
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
