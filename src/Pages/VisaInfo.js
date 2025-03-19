import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // To get the visa ID from the URL
import { doc, getDoc } from "firebase/firestore";
import { firestore } from '../firebase'; // Adjust the import path based on your Firebase config file location
import Footer from '../Components/Footer';
import Navbar from '../Components/NavBar';
import Notification from '../Components/Notification';
import { Link } from 'react-router-dom';

const VisaInfo = () => {
  const { id } = useParams(); // Get the visa ID from the URL
  const [visa, setVisa] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch visa details from Firestore based on ID
  useEffect(() => {
    const fetchVisa = async () => {
      try {
        const visaDoc = await getDoc(doc(firestore, "visas", id));
        if (visaDoc.exists()) {
          setVisa({ id: visaDoc.id, ...visaDoc.data() });
        } else {
          setError('Visa not found.');
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching visa details: ", err);
        setError('Failed to load visa details. Please try again later.');
        setLoading(false);
      }
    };
    fetchVisa();
  }, [id]);

  // Render loading state
  if (loading) {
    return (
      <div >
        <p>Loading visa details...</p>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div >
        <p style={{ color: 'red' }}>{error}</p>
      </div>
    );
  }

  // Render visa details
  return (
    <>
        <Notification backgroundColor='white' Color='black'/>
        <Navbar backgroundColor='black'/>
    <div className="container " style={{backgroundColor: 'white'}}>
    <div className="body-cover">
       
      <div className="visa-info">
        {/* Left: Image */}
        <div className='visa-image'>
          <img 
            src={visa.VisaImage} 
            alt={visa.title || 'Visa Image'} 

          />
        </div>
       
        {/* Right: Details */}
        <div className='visa-details'>
        <h3>Visa Information</h3>
            <p><strong>Country:</strong> {visa.country || 'N/A'}</p>
            <p><strong>Visa Type:</strong> {visa.visaType || 'N/A'}</p>
            <p><strong>Price:</strong> PKR{visa.price || 'N/A'}</p>
            <p><strong>Processing Time:</strong> {visa.processingTime || 'N/A'} days</p>
            <p><strong>Documents Required:</strong></p>
            <p>
            {visa.documents || 'N/A'}
            </p>
            <br/>
            <Link to="/book-visa" className='primary-button no-decoration'>Apply Now</Link>
        </div>
      </div>
      </div>
      </div>
    <Footer/>
      </>
  );
};



export default VisaInfo;