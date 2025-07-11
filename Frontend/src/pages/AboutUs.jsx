import React from 'react';
import {
  FaArrowRight,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram
} from 'react-icons/fa';
import './AboutStyles.css';

const techStack = [
  'React', 'Node.js', 'Google Fit API',
  'TensorFlow.js', 'Firebase', 'Recharts',
  'Python', 'MongoDB', 'Express'
];

const teamMembers = [
  {
    name: "",
    role: "",
    avatar: "https://via.placeholder.com/150"
  },
  {
    name: "",
    role: "",
    avatar: "https://via.placeholder.com/150"
  },
  {
    name: "",
    role: "",
    avatar: "https://via.placeholder.com/150"
  },
  {
    name: "",
    role: "Fullstack Developer",
    avatar: "https://via.placeholder.com/150"
  },
  {
    name: "",
    role: "Fullstack Developer",
    avatar: "https://via.placeholder.com/150"
  },
  {
    name: "",
    role: "Fullstack Developer",
    avatar: "https://via.placeholder.com/150"
  }
];

const AboutUs = () => {
  return (
    <div className="about-page">
      {/* Header Section */}
      <div className="about-header">
        <h1 className="section-title">About Us</h1>
        <div className="title-divider"></div>
        <p className="tagline">Redefining Health Insurance with Smart Incentives</p>
      </div>

      {/* Main Content Layout */}
      <div className="content-wrapper">
        {/* Left Column */}
        <div className="content-column">
          {/* Mission */}
          <section className="mission-section">
            <div className="mission-card">
              <h2>Why We Exist</h2>
              <h3>We're making health insurance proactive, not reactive.</h3>
              <p>
                At WellnGood, we believe insurance should be more than a safety net — it should be a partner in your wellness journey.
                That’s why we use real-time data from wearables and AI to customize premiums based on your daily lifestyle and health patterns.
              </p>
              <p>
                No more generic pricing. No more invisible progress. Just fair, dynamic, personalized coverage.
              </p>

              <h3 style={{ marginTop: '1.5rem' }}>Our Mission</h3>
              <ul className="arrow-list">
                <li>Leverage wearables + AI to make premiums fair and performance-based</li>
                <li>Promote prevention and healthy habits instead of just treatment payouts</li>
                <li>Deliver transparency, adaptability, and empowerment to policyholders</li>
              </ul>
            </div>

            {/* Values Section */}
            <div className="mission-card">
              <h2>Our Core Values</h2>
              <ul className="arrow-list">
                <li><strong>Transparency:</strong> No hidden clauses. No gimmicks.</li>
                <li><strong>Innovation:</strong> Tech-first approach to age-old problems.</li>
                <li><strong>Trust:</strong> We succeed only when you do.</li>
                <li><strong>Accessibility:</strong> Insurance that works for everyone, not just the few.</li>
              </ul>
            </div>

            {/* How it works */}
            <div className="mission-card">
              <h2>How It Works</h2>
              <p>
                <strong>1. Sign Up / Log In:</strong> Create your WellnGood account securely.<br />
                <strong>2. Sync Your Devices:</strong> Connect your Google Fit or compatible wearables.<br />
                <strong>3. View Your Dashboard:</strong> Monitor daily steps, sleep, heart rate, calories and more.<br />
                <strong>4. Earn Dynamic Premiums:</strong> Healthier lifestyle? Lower premiums — it's that simple.<br />
                <strong>5. Get Covered Smarter:</strong> Your policy auto-updates based on your monthly trends.
              </p>
            </div>
          </section>
        </div>

        {/* Right Column - Team Section */}
        <div className="team-column">
          <section className="team-section">
            <h2>Meet the Team</h2>
            <div className="team-grid">
              {teamMembers.map((member, index) => (
                <div className="team-card" key={index}>
                  <img src={member.avatar} alt={member.name} className="avatar" />
                  <div className="team-info">
                    <h3>{member.name}</h3>
                    <p className="team-role">{member.role}</p>
                    <div className="social-links">
                      <a href="#"><FaLinkedin /></a>
                      <a href="#"><FaInstagram /></a>
                      <a href="#"><FaGithub /></a>
                      <a href="#"><FaTwitter /></a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
