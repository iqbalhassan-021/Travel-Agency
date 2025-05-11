import React from 'react';


const services = [
  {
    icon: 'fas fa-plane-departure',
    title: 'Flight Booking',
    description: 'Book domestic and international flights at the best prices, quickly and securely.',
  },
  {
    icon: 'fas fa-hotel',
    title: 'Hotel Reservations',
    description: 'Find and book top-rated hotels tailored to your travel needs and budget.',
  },
  {
    icon: 'fas fa-passport',
    title: 'Visa Assistance',
    description: 'Hassle-free visa services with full document support and fast processing.',
  },
  {
    icon: 'fas fa-map-marked-alt',
    title: 'Tour Packages',
    description: 'Choose from custom tour packages for unforgettable experiences.',
  },

];

const HajjIntro = () => {
  return (
    <section className="services-section" style={{marginTop: '20px', marginBottom: '20px'}}>
      <h2 className="section-title">Our Travel Services</h2>
      <div className="services-grid">
        {services.map((service, index) => (
          <div className="service-box" key={index}>
            <i className={`service-icon ${service.icon}`}></i>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HajjIntro;
