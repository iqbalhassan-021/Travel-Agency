import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from "firebase/firestore";
import { firestore } from '../firebase'; // Adjust the import path based on your Firebase config file location
import $ from 'jquery'; // jQuery is required for Slick Slider
import 'slick-carousel/slick/slick.css'; // Slick Slider CSS
import 'slick-carousel/slick/slick-theme.css'; // Slick Slider theme CSS
import 'slick-carousel'; // Slick Slider JS

const AppointmentsSlider = () => {
  // State to manage appointments
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch appointments from Firestore on mount
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "appointments"));
        const appointmentsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setAppointments(appointmentsData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching appointments: ", err);
        setError('Failed to load appointments. Please try again later.');
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  // Initialize Slick Slider after appointments are loaded
  useEffect(() => {
    if (!loading && appointments.length > 0) {
      // Destroy any existing Slick instance before initializing
      if ($('.slider').hasClass('slick-initialized')) {
        $('.slider').slick('unslick');
      }

      $('.slider').slick({
        slidesToShow: 4,     // Show 4 slides by default
        slidesToScroll: 3,   // Scroll 3 slides at a time
        autoplay: false,     // Set to true if you want auto-sliding
        arrows: false,       // Hide navigation arrows
        dots: true,          // Show navigation dots
        variableWidth: true, // Allows slides to have natural image width
        centerMode: false,   // Keeps slides left-aligned
        infinite: true,      // Loops the slider
        speed: 300,          // Transition speed in ms
        responsive: [
          {
            breakpoint: 1120, // Tablet breakpoint
            settings: {
              slidesToShow: 3,
              slidesToScroll: 2,
            }
          },
          {
            breakpoint: 780,  // Mobile breakpoint
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              variableWidth: false, // Ensures consistent width on mobile
            }
          },
          {
            breakpoint: 675,  // Mobile breakpoint
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              variableWidth: false, // Ensures consistent width on mobile
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
  }, [loading, appointments]);

  // Render loading or error state
  if (loading) {
    return (
      <div className="container">
        <p className="section-heading">Available Appointments</p>
        <div className="body-cover">
          <p>Loading Appointments...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <p className="section-heading">Available Appointments</p>
        <div className="body-cover">
          <p style={{ color: 'red' }}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ marginBottom: '50px' }}>
      <p className="section-heading">Available Appointments</p>
      <div className="body-cover">
        <div className="slider" style={{ marginTop: '20px' }}>
          {appointments.map((appointment) => (
            <div className="slider-card" key={appointment.id}>
              <div
                className="slider-img"
                style={{
                  backgroundImage: `url(${appointment.appimg})`,
                }}
              ></div>
              <div className="slider-text">
                <h3>{appointment.country || 'N/A'}</h3>
                <Link
                  to={`/appointmentInfo/${appointment.id}`}
                  className="no-decoration"
                  style={{ color: 'white' }}
                >
                  See Details <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppointmentsSlider;