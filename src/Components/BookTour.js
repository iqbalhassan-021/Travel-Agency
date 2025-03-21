import React, { useState, useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { firestore } from '../firebase';

const BookTour = () => {
  // State for available tours fetched from Firestore
  const [availableTours, setAvailableTours] = useState([]);
  const [loadingTours, setLoadingTours] = useState(true);
  const [tourError, setTourError] = useState('');

  // State to manage form data
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    cnic: '',
    applyingFor: 'myself',
    tourCountry: '' // Will be set after tours are loaded
  });
  
  // State for submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // Fetch tours from Firestore on component mount
  useEffect(() => {
    const fetchTours = async () => {
      setLoadingTours(true);
      try {
        const querySnapshot = await getDocs(collection(firestore, "tours"));
        const toursData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setAvailableTours(toursData);
        
        // Set default tourCountry to first tour's country if available
        if (toursData.length > 0) {
          setFormData(prev => ({ ...prev, tourCountry: toursData[0].country }));
        }
      } catch (error) {
        console.error("Error fetching tours: ", error);
        setTourError('Failed to load tours. Please try again later.');
      } finally {
        setLoadingTours(false);
      }
    };

    fetchTours();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="container" style={{ backgroundColor: '#800000' }}>
      <div className="body-cover" style={{ padding: '0%' }}>
        <div className="contact-us">
          <form className="contact-form" action="https://api.web3forms.com/submit" method="POST">
            <input type="hidden" name="access_key" value="0daf682c-49f2-4919-bdfb-26e56f9ffe52" />
            <div className="form-tab">
              <label htmlFor="name">Name</label>
              <input 
                type="text" 
                id="name" 
                required 
                name="name" 
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-tab">
              <label htmlFor="phone">Phone</label>
              <input 
                type="text" 
                id="phone" 
                required 
                name="phone" 
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="form-tab">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                placeholder="email"
      
              />
            </div>
            <div className="form-tab">
              <label htmlFor="for">Applying for?</label>
              <select 
                name="applyingFor" 
                id="for" 
                required
                value={formData.applyingFor}
                onChange={handleChange}
              >
                <option value="myself">My Self</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-tab">
              <label htmlFor="tours">Choose Tour Country</label>
              {loadingTours ? (
                <p style={{ color: 'white' }}>Loading tours...</p>
              ) : tourError ? (
                <p style={{ color: 'red' }}>{tourError}</p>
              ) : (
                <select 
                  name="tourCountry" 
                  id="tours" 
                  required
                  value={formData.tourCountry}
                  onChange={handleChange}
                >
                  {availableTours.length === 0 ? (
                    <option value="">No tours available</option>
                  ) : (
                    availableTours.map(tour => (
                      <option key={tour.id} value={tour.country}>
                        {tour.country}
                        {tour.date && ` - ${tour.date}`}
                        {tour.duration && ` (${tour.duration})`}
                      </option>
                    ))
                  )}
                </select>
              )}
            </div>
            <div className="form-tab">
              <button 
                type="submit" 
                className="primary-button rounded"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookTour;