import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from "firebase/firestore";
import { firestore } from '../firebase';
import $ from 'jquery';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel';

const Tours = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch appointments from Firestore
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "tours"));
        const appointmentsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setAppointments(appointmentsData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching tours: ", err);
        setError('Failed to load tours. Please try again later.');
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  // Initialize Slick Slider after data is loaded
  useEffect(() => {
    if (!loading && appointments.length > 0) {
      $('.tour-slider-container').slick({
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 6000,
      });
    }
    
    // Cleanup on unmount
    return () => {
      if ($('.tour-slider-container').hasClass('slick-initialized')) {
        $('.tour-slider-container').slick('unslick');
      }
    };
  }, [loading, appointments]);

  if (loading) {
    return (
      <div className="container">
        <p className="section-heading">Available Tour plans</p>
        <div className="body-cover">
          <p>Loading Tour plans...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <p className="section-heading">Available Tour plans</p>
        <div className="body-cover">
          <p style={{ color: 'red' }}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container tour">

      <div className="tour-slider-container">
        {appointments.map((tour) => (
          <div key={tour.id} className="tour-slider" 
               style={{ backgroundImage: `url(${tour.imageUrl || '../images/world.jpg'})` }}>
            <div className="body-cover">
              <div className="tour-slide">
                <div className="tour-slide-content">
                    <div>
                        
                    <h3>{tour.country || 'Country'}</h3>
                  <p><strong>Date : </strong>{tour.date || 'Date'}</p>
                  <p><strong>Duration : </strong>{tour.duration || 'Duration'}</p>
                  <p><strong>Required Documents : </strong></p>
                  <p>
                    {tour.requiredDocuments || 'Required Documents'}
                  </p>
                  <p><strong>Price : </strong>PKR{tour.price || 'Price'}</p>
                  <br/>

                    </div>
                    <div>
                    <Link 
                    to={`/book-tour`} 
                    className="no-decoration primary-button"
                  >
                    Book Now
                  </Link>
                    </div>


                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tours;