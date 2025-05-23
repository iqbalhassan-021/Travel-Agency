import React from 'react';
import { Link } from 'react-router-dom';


const TourFeatureCard = () => {
  return (
    <div className="tour-feature-container">
      <div className="tour-feature-image">
        <img
          src="/Assets/images/tour.jpg"
          alt="Maldives Tour"
        />
      </div>
      <div className="tour-feature-text">
        <h2>The Sunny Side of Life</h2>
        <p>
        Escape to the sun-drenched shores of the Maldives, where crystal-clear waters meet luxurious overwater villas. This dream destination promises tranquility, beauty, and a once-in-a-lifetime experience. Whether you're looking to unwind or explore vibrant marine life, the Maldives offers the perfect tropical getaway.
        Let us handle your travel planning while you focus on making unforgettable memories.
        </p>
    
              <Link to='/visa' className='no-decoration'>
                <button className="apply-btn">Apply Now</button>     
              </Link>
      </div>
    </div>
  );
};

export default TourFeatureCard;
