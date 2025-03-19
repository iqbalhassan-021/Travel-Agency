import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from "firebase/firestore";
import { firestore } from '../firebase'; // Adjust the import path based on your Firebase config file location
import $ from 'jquery'; // jQuery is required for Slick Slider
import 'slick-carousel/slick/slick.css'; // Slick Slider CSS
import 'slick-carousel/slick/slick-theme.css'; // Slick Slider theme CSS
import 'slick-carousel'; // Slick Slider JS

const VisaSlider = () => {
  // State to manage visa packages
  const [visaPackages, setVisaPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch visa packages from Firestore on mount
  useEffect(() => {
    const fetchVisas = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "visas"));
        const visasData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setVisaPackages(visasData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching visa packages: ", err);
        setError('Failed to load visa packages. Please try again later.');
        setLoading(false);
      }
    };
    fetchVisas();
  }, []);

  // Initialize Slick Slider after visas are loaded
  useEffect(() => {
    if (!loading && visaPackages.length > 0) {
      // Destroy any existing Slick instance before initializing
      if ($('.slider').hasClass('slick-initialized')) {
        $('.slider').slick('unslick');
      }

      $('.slider').slick({
        slidesToShow: 4,     // Show 4 slides by default
        slidesToScroll: 3,   // Scroll 1 slide at a time
        autoplay: false,     // Set to true if you want auto-sliding
        arrows: false,       // Hide navigation arrows
        dots: true,          // Show navigation dots
        variableWidth: true, // Allows slides to have natural image width
        centerMode: false,   // Keeps slides left-aligned
        infinite: true,      // Loops the slider
        speed: 300,          // Transition speed in ms
        responsive: [
          {
            breakpoint: 1024, // Tablet breakpoint
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            }
          },
          {
            breakpoint: 600,  // Mobile breakpoint
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              variableWidth: false, // Optional: ensures consistent width on mobile
            }
          }
        ]
      });
    }

    // Cleanup Slick Slider on unmount
    return () => {
      if ($('.slider').hasClass('slick-initialized')) {
        $('.slider').slick('unslick');
      }
    };
  }, [loading, visaPackages]);

  // Render loading or error state
  if (loading) {
    return (
      <div className="container">
        <p className="section-heading">Available Visa Packages</p>
        <div className="body-cover">
          <p>Loading visa packages...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <p className="section-heading">Available Visa Packages</p>
        <div className="body-cover">
          <p style={{ color: 'red' }}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <p className="section-heading">Available Visa Packages</p>
      <div className="body-cover">
        <div className="slider" style={{marginTop: '20px'}}>
          {visaPackages.map((visa) => (
            <div className="slider-card" key={visa.id}>
              <div 
                className="slider-img" 
                style={{ 
                  backgroundImage: `url(${visa.VisaImage})`, 
                  
                }}
              ></div>
              <div className="slider-text" >
                <h3>
                {visa.country}
                </h3>
                
                <Link to={`/visaInfo/${visa.id}`} className='no-decoration' style={{color: 'white'}}>See Details <i class="fa-solid fa-arrow-right"></i></Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


export default VisaSlider;