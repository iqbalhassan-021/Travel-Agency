import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs } from "firebase/firestore";
import { firestore } from '../firebase'; // Adjust the import path based on your Firebase config file location

const BookVisaForm = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    cnic: '',
    applyingFor: 'myselfe',
    visaType: ''
  });

  // State for submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // State for visa list
  const [availableVisas, setAvailableVisas] = useState([]);
  const [loadingVisas, setLoadingVisas] = useState(true);
  const [visaError, setVisaError] = useState('');

  // Fetch visas from Firestore on mount
  useEffect(() => {
    const fetchVisas = async () => {
      setLoadingVisas(true);
      try {
        const querySnapshot = await getDocs(collection(firestore, "visas"));
        const visasData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setAvailableVisas(visasData);
        setLoadingVisas(false);
      } catch (error) {
        console.error("Error fetching visas: ", error);
        setVisaError('Failed to load visa options. Please refresh the page.');
        setLoadingVisas(false);
      }
    };
    fetchVisas();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle form submission
 

  return (
    <div className="container" style={{ backgroundColor: '#800000' }}>
      <div className="body-cover" style={{ padding: '0%' }}>
        <div className="contact-us">
          <form className="contact-form"  action="https://api.web3forms.com/submit" method="POST">
          <input type="hidden" name="access_key" value="0daf682c-49f2-4919-bdfb-26e56f9ffe52"></input>
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
                <option value="myselfe">My Selfe</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-tab">
              <label htmlFor="visas">Choose the Visa</label>
              {loadingVisas ? (
                <p style={{ color: 'white', margin: 0 }}>Loading visa options...</p>
              ) : visaError ? (
                <p style={{ color: 'red', margin: 0 }}>{visaError}</p>
              ) : availableVisas.length === 0 ? (
                <p style={{ color: 'white', margin: 0 }}>No visas available at this time.</p>
              ) : (
                <select
                  name="visaType"
                  id="visas"
                  required
                  value={formData.visaType}
                  onChange={handleChange}
                >
                  <option value="">-- Select a Visa --</option>
                  {availableVisas.map(visa => (
                    <option key={visa.id} value={visa.id}>
                      {visa.country} - {visa.visaType} (${visa.price})
                    </option>
                  ))}
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

export default BookVisaForm;