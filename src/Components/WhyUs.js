import React from 'react';

const reasons = [
  {
    icon: 'fas fa-star',
    title: 'Trusted Expertise',
    description: 'Years of experience in providing reliable and high-quality travel solutions.',
  },
  {
    icon: 'fas fa-headset',
    title: '24/7 Support',
    description: 'Our dedicated team is available around the clock to assist you anytime.',
  },
  {
    icon: 'fas fa-hand-holding-usd',
    title: 'Best Price Guarantee',
    description: 'We offer competitive pricing without compromising on service quality.',
  },
  {
    icon: 'fas fa-thumbs-up',
    title: 'Customer Satisfaction',
    description: 'Thousands of happy travelers trust us for their travel needs every year.',
  },
];

const WhyUs = () => {
  return (
    <section className="services-section" style={{marginTop: '20px', marginBottom: '20px'}}>
      <h2 className="section-title">Why Choose Us</h2>
      <div className="services-grid">
        {reasons.map((reason, index) => (
          <div className="service-box" key={index}>
            <i className={`service-icon ${reason.icon}`}></i>
            <h3>{reason.title}</h3>
            <p>{reason.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyUs;
