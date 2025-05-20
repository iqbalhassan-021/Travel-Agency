import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { firestore } from '../firebase'; // Adjust the import path based on your Firebase config file location
import Footer from '../Components/Footer';
import Navbar from '../Components/NavBar';
import Notification from '../Components/Notification';

const VisaInfo = () => {
  const { id } = useParams(); // Get the appointment ID from the URL
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch appointment details from Firestore based on ID
  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const appointmentDoc = await getDoc(doc(firestore, "appointments", id)); // Changed to "appointments"
        if (appointmentDoc.exists()) {
          setAppointment({ id: appointmentDoc.id, ...appointmentDoc.data() });
        } else {
          setError('Appointment not found.');
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching appointment details: ", err);
        setError('Failed to load appointment details. Please try again later.');
        setLoading(false);
      }
    };
    fetchAppointment();
  }, [id]);

  // Render loading state
  if (loading) {
    return (
      <div>
        <p>Loading appointment details...</p>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div>
        <p style={{ color: 'red' }}>{error}</p>
      </div>
    );
  }

  // Render appointment details
  return (
    <>
    
      <Navbar backgroundColor="black" />
      <div className="container" style={{ backgroundColor: 'white' }}>
        <div className="body-cover">
          <div className="visa-info">
            {/* Left: Image */}
            <div className="visa-image">
              <img
                src={appointment.appimg}
                alt="Appointment Image"
              />
            </div>

            {/* Right: Details */}
            <div className="visa-details">
              <h3>Appointment Information</h3>
              <p><strong>Country:</strong> {appointment.country || 'N/A'}</p>
              <p><strong>Type:</strong> {appointment.type || 'N/A'}</p>
              <p><strong>Price:</strong> PKR {appointment.price || 'N/A'}</p>
              <p><strong>Consultant:</strong> {appointment.consultant || 'N/A'}</p>
              <p><strong>Date:</strong> {appointment.date || 'N/A'}</p>
              <p><strong>Created At:</strong> {new Date(appointment.createdAt).toLocaleString() || 'N/A'}</p>
              <br />
              <Link to="/book-appointment" className="primary-button no-decoration">Apply Now</Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VisaInfo;