import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from "firebase/firestore";
import { firestore } from '../firebase'; // Adjust the import path based on your Firebase config file location

const AvailablePackages = () => {
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

  // Render loading or error state
  if (loading) {
    return (
      <div className="container">

        <div className="body-cover">
          <p>Loading visa packages...</p>
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
          {visaPackages.length === 0 ? (
            <p>No visa packages available at this time.</p>
          ) : (
            visaPackages.map((visa) => (
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
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AvailablePackages;