import React, { useState, useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { firestore } from '../firebase'; // Adjust the import path based on your Firebase config file location

const BookTicketForm = () => {
  // State for available tickets fetched from Firestore
  const [availableTickets, setAvailableTickets] = useState([]);
  const [loadingTickets, setLoadingTickets] = useState(true);
  const [ticketError, setTicketError] = useState('');

  // State to manage form data
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    cnic: '',
    applyingFor: 'myselfe',
    ticketType: '' // Will be set after tickets are loaded
  });
  
  // State for submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // Fetch tickets from Firestore on component mount
  useEffect(() => {
    const fetchTickets = async () => {
      setLoadingTickets(true);
      try {
        const querySnapshot = await getDocs(collection(firestore, "tickets"));
        const ticketsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setAvailableTickets(ticketsData);
        
        // Set default ticketType to first ticket if available
        if (ticketsData.length > 0) {
          setFormData(prev => ({ ...prev, ticketType: ticketsData[0].id }));
        }
      } catch (error) {
        console.error("Error fetching tickets: ", error);
        setTicketError('Failed to load tickets. Please try again later.');
      } finally {
        setLoadingTickets(false);
      }
    };

    fetchTickets();
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
                <option value="myselfe">My Self</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-tab">
              <label htmlFor="tickets">Choose the ticket</label>
              {loadingTickets ? (
                <p style={{ color: 'white' }}>Loading tickets...</p>
              ) : ticketError ? (
                <p style={{ color: 'red' }}>{ticketError}</p>
              ) : (
                <select 
                  name="ticketType" 
                  id="tickets" 
                  required
                  value={formData.ticketType}
                  onChange={handleChange}
                >
                  {availableTickets.length === 0 ? (
                    <option value="">No tickets available</option>
                  ) : (
                    availableTickets.map(ticket => (
                      <option key={ticket.id} value={ticket.id}>
                        {ticket.flight} - {ticket.departureCity} ({ticket.departureCode}) to {ticket.arrivalCity} ({ticket.arrivalCode})
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

export default BookTicketForm;