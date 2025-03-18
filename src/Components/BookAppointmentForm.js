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
          <div className="contact-form">
            <div className="form-tab">
              <label htmlFor="name">Name</label>
              <input 
                type="text" 
                id="name" 
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
                name="phone" 
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="form-tab">
              <label htmlFor="cnic">CNIC</label>
              <input 
                type="text" 
                id="cnic" 
                name="cnic" 
                placeholder="CNIC"
                value={formData.cnic}
                onChange={handleChange}
              />
            </div>
            <div className="form-tab">
              <label htmlFor="for">Applying for?</label>
              <select 
                name="applyingFor" 
                id="for" 
                value={formData.applyingFor}
                onChange={handleChange}
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
                value={formData.purpose}
                onChange={handleChange}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAppointmentForm;