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
        <p className="section-heading">Available Packages</p>
        <div className="body-cover">
          <p>Loading visa packages...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <p className="section-heading">Available Packages</p>
        <div className="body-cover">
          <p style={{ color: 'red' }}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <p className="section-heading">Available Packages</p>
      <div className="body-cover">
        <div className="grid-4x visa-3x">
          {visaPackages.length === 0 ? (
            <p>No visa packages available at this time.</p>
          ) : (
            visaPackages.map((pkg) => (
              <div className="visa-card" key={pkg.id}>
                {/* Country Name */}
                <div className="country">
                  <h2 style={{ color: 'white' }}>{pkg.country}</h2>
                </div>

                {/* Visa Type */}
                <div className="visa-type">
                  <p><strong>Type:</strong> {pkg.visaType}</p>
                </div>

                {/* Price */}
                <div className="price">
                  <h1>${pkg.price}</h1>
                </div>

                {/* Documents */}
                <div className="docs">
                  <h3>Required Documents:</h3>
                  {pkg.documents.split(',').map((doc, docIndex) => (
                    <p key={docIndex}>{doc.trim()}</p>
                  ))}
                </div>

                {/* Processing Time */}
                <div className="processing-time">
                  <p><strong>Processing Time:</strong> {pkg.processingTime}</p>
                </div>

                {/* Book Now Button */}
                <div className="book">
                  <Link to="/book-visa" className="no-decoration primary-button rounded">
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

export default AvailablePackages;