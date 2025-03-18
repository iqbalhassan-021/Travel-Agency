import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from "firebase/firestore";
import { firestore } from '../firebase'; // Adjust the import path based on your Firebase config file location

const AppointmentsComp = () => {
  // State to manage appointment packages
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

  // Render loading or error state
  if (loading) {
    return (
      <div className="container">
        <p className="section-heading">Available Appointments</p>
        <div className="body-cover">
          <p>Loading appointments...</p>
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
    <div className="container">
      <p className="section-heading">Available Appointments</p>
      <div className="body-cover">
        <div className="grid-4x">
          {appointments.length === 0 ? (
            <p>No appointments available at this time.</p>
          ) : (
            appointments.map((pkg) => (
              <div className="visa-card" key={pkg.id}>
                {/* Country Name and Type */}
                <div className="countery" >
                  <h2 style={{ color: 'white' }}>{pkg.country} - {pkg.type}</h2>
                </div>

                {/* Price */}
                <div className="price">
                  <h1>${pkg.price}</h1>
                </div>

                {/* Consultant and Date */}
                <div className="docs">
                  <p><strong>Consultant:</strong> {pkg.consultant}</p>
                  <p><strong>Date:</strong> {pkg.date}</p>
                </div>

                {/* Book Now Button */}
                <div className="book">
                  <Link to="/book-appointment" className="no-decoration primary-button rounded">
                    Book Now
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentsComp;