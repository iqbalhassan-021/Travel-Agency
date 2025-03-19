import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from "firebase/firestore";
import { firestore } from '../firebase'; // Adjust the import path based on your Firebase config file location

const AvailablePackages = () => {
  // State to manage visa packages
  const [appointmentsPkgs, setappointmentsPkgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch visa packages from Firestore on mount
  useEffect(() => {
    const fetchVisas = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "appointments"));
        const visasData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setappointmentsPkgs(visasData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching visa packages: ", err);
        setError('Failed to load visa packages. Please try again later.');
        setLoading(false);
      }
    };
    fetchVisas();
  }, []);

  // Render loading or error state
  if (loading) {
    return (
      <div className="container">

        <div className="body-cover">
          <p>Loading visa appointments...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
     
        <div className="body-cover">
          <p style={{ color: 'red' }}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
    
      <div className="body-cover">
        <div className="grid-4x visa-4x">
          {appointmentsPkgs.length === 0 ? (
            <p>No visa packages available at this time.</p>
          ) : (
            appointmentsPkgs.map((appointment) => (
            <div className="slider-card" key={appointment.id}>
              <div 
                className="slider-img" 
                style={{ 
                  backgroundImage: `url(${appointment.appimg})`, 
                  
                }}
              ></div>
              <div className="slider-text" >
                <h3>
                {appointment.country}
                </h3>
                
                <Link to={`/appointmentInfo/${appointment.id}`} className='no-decoration' style={{color: 'white'}}>See Details <i class="fa-solid fa-arrow-right"></i></Link>
              </div>
            </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AvailablePackages;