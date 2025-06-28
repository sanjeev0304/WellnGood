// src/pages/AboutUs.js
import React from 'react';

const AboutUs = () => {
  const teamMembers = [
    { name: 'Jane Smith', role: 'CEO' },
    { name: 'John Doe', role: 'CTO' },
    { name: 'Emily Johnson', role: 'Lead Developer' },
    { name: 'Michael Brown', role: 'Data Scientist' }
  ];

  const techStack = [
    'React', 'Node.js', 'Google Fit API', 
    'TensorFlow.js', 'Firebase', 'Recharts'
  ];

  return (
    <div className="about-us">
      <div className="container">
        <h1>About WellandGood</h1>
        
        <section className="mission">
          <h2>Our Mission</h2>
          <p>"Revolutionizing Life Insurance through Real-Time Health Data"</p>
        </section>
        
        <section className="team">
          <h2>Our Team</h2>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-card">
                <div className="avatar"></div>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
        </section>
        
        <section className="tech-stack">
          <h2>Technology Stack</h2>
          <ul>
            {techStack.map((tech, index) => (
              <li key={index}>{tech}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;