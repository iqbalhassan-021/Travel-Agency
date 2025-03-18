import React, { useState, useEffect } from 'react';
import { collection, query, onSnapshot } from "firebase/firestore";
import { firestore } from '../firebase';

const BookAppointmentForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    cnic: '',
    applyingFor: 'myselfe',
    purpose: ''
  });
  
  const [availableAppointments, setAvailableAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all appointments
  useEffect(() => {
    setLoading(true);
    const q = query(collection(firestore, "appointments"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const appointmentList = [];
      querySnapshot.forEach((doc) => {
        appointmentList.push({ id: doc.id, ...doc.data() });
      });
      setAvailableAppointments(appointmentList);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching appointments:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

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
          <input type="hidden" name="access_key" value="0daf682c-49f2-4919-bdfb-26e56f9ffe52"></input>
            <div className="form-tab">
              <label htmlFor="name">Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                placeholder="Your Name"
    
              />
            </div>
            <div className="form-tab">
              <label htmlFor="phone">Phone</label>
              <input 
                type="text" 
                id="phone" 
                name="phone" 
                placeholder="Phone Number"
        
              />
            </div>
            <div className="form-tab">
              <label htmlFor="cnic">CNIC</label>
              <input 
                type="text" 
                id="cnic" 
                name="cnic" 
                placeholder="CNIC"
      
              />
            </div>
            <div className="form-tab">
              <label htmlFor="for">Applying for?</label>
              <select 
                name="applyingFor" 
                id="for" 
      
              >
                <option value="myselfe">My Selfe</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-tab">
              <label htmlFor="purpose">Country</label>
              <select 
                name="purpose" 
                id="purpose" 
      
              >
                <option value="">Select a Country</option>
                {loading ? (
                  <option value="">Loading Country...</option>
                ) : availableAppointments.length === 0 ? (
                  <option value="">No Country available</option>
                ) : (
                  availableAppointments.map((appt) => (
                    <option 
                      key={appt.id} 
                      value={appt.id}
                    >
                      {appt.country}
                    </option>
                  ))
                )}
              </select>
            </div>
            <div className="form-tab">
                            <button type="submit" className="primary-button rounded">
                                Submit
                            </button>
                        </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookAppointmentForm;