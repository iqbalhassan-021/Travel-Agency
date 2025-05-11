import React from 'react';

const HajjUmrahSection = () => {
  return (
    <section className="hajj-umrah-section">
      <div className="hajj-umrah-container">
        <div className="hajj-umrah-image">
          <img
            src="/Assets/images/hajj-umrah.jpg"
            alt="Hajj and Umrah Pilgrimage"
          />
        </div>
        <div className="hajj-umrah-text">
          <h2>Experience the Spiritual Journey of Hajj & Umrah</h2>
          <p>
            Embark on a sacred pilgrimage to Mecca, the heart of Islam. Whether it's the journey of Hajj, performed once in a lifetime, or the Umrah, an optional but highly recommended spiritual journey, we provide everything you need to make your experience seamless. Our services include guided tours, accommodation, and more.
          </p>
          
          <h3>Why Choose Us for Your Pilgrimage?</h3>
          <ul>
            <li>Authentic and trusted services</li>
            <li>Customized packages for every budget</li>
            <li>Experienced guides who understand your needs</li>
            <li>Hassle-free visa processing</li>
          </ul>

          <button className="learn-more-btn">Learn More</button>
          <button className="book-now-btn">Book Your Journey</button>
        </div>
      </div>
    </section>
  );
};

export default HajjUmrahSection;
