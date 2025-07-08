import React, { useState, useEffect } from 'react';
import './FeatureCard.css';
import life from './images/life.jpg';
import premium from './images/premium.jpeg';
import watch from './images/watch.jpeg'
import techStack from './images/stack.jpeg'
const slides = [
  {
    title: "What is Life Insurance?",
    content: "Life insurance is a safety net for your loved ones. It provides financial support in case of your untimely passing. The insurer pays a lump sum to your chosen beneficiary. This helps cover living expenses, debts, or future goals. It’s peace of mind—knowing your family’s future is protected.",
    image: life
  },
  {
    title: "Fixed Premium: A Limitation",
    content: "Traditional life insurance often uses fixed premiums. These don’t adapt to changes in lifestyle or health. You may end up overpaying or under-insured over time. They lack personalization and dynamic risk assessment. Modern solutions should evolve with your life. Flexibility is key to fair and future-ready coverage.",
    image: premium
  },
  {
    title: "Integrating Health Tech",
    content: "We bridge insurance with real-time health data. Connected devices like Fitbit and Google Fit track your wellness. Insights from your daily activity inform smarter coverage. This integration promotes proactive and personalized insurance. Better health can mean better premiums. Empowering you through technology-driven protection.",
    image: watch
  },
  {
    title: "Tech Stack Used",
    content: "Our platform is powered by modern, scalable technologies. Frontend built with React for a smooth user experience. Backend powered by Node.js and Python for performance and AI logic. MongoDB ensures fast, flexible, and reliable data storage. User authentication and data management via Firebase. Integrated with wearables like Fitbit and Google Fit for real-time insights.",
    image: techStack
  }
];

const SlideShow = () => {
  const [current, setCurrent] = useState(0);

  const goToSlide = (index) => {
    setCurrent(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slideshow">
      <div className="slide">
        <div className="slide-text">
          <h2>{slides[current].title}</h2>
          <p>{slides[current].content}</p>
        </div>
        <div className="slide-image">
          <img src={slides[current].image} alt={slides[current].title} />
        </div>
      </div>

      <div className="slide-dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === current ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default SlideShow;
