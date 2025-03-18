import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from "firebase/firestore";
import { firestore } from '../firebase'; // Adjust the import path based on your Firebase config file location

const SearchTickets = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    flightDate: '',
    flight: '',
    flightTime: '',
    destination: ''
  });

  // State for ticket options
  const [ticketOptions, setTicketOptions] = useState({
    dates: [],
    flights: [],
    times: [],
    destinations: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const navigate = useNavigate(); // Hook for navigation

  // Fetch tickets from Firestore on mount
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "tickets"));
        const ticketsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // Extract unique values for each dropdown with detailed display
        const uniqueDates = [...new Set(ticketsData.map(ticket => 
          `${ticket.departureTime} - ${ticket.departureCity} to ${ticket.arrivalCity}`
        ))].sort();
        
        const uniqueFlights = [...new Set(ticketsData.map(ticket => 
          `${ticket.flight} (${ticket.name})`
        ))];
        
        const uniqueTimes = [...new Set(ticketsData.map(ticket => 
          `${ticket.departureTime} - ${ticket.arrivalTime}`
        ))];
        
        const uniqueDestinations = [...new Set(ticketsData.map(ticket => 
          `${ticket.arrivalCity} (${ticket.arrivalCode})`
        ))];

        setTicketOptions({
          dates: uniqueDates,
          flights: uniqueFlights,
          times: uniqueTimes,
          destinations: uniqueDestinations
        });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching tickets: ", err);
        setError('Failed to load ticket options. Please try again later.');
        setLoading(false);
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

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Construct query string from form data
    const queryParams = new URLSearchParams(formData).toString();
    // Navigate to /tickets with query parameters
    navigate(`/tickets?${queryParams}`);
  };

  if (loading) {
    return (
      <div className="container">
        <div className="body-cover">
          <p>Loading ticket options...</p>
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
        <div className="search-form-holder center">
          <form className="search-form rounded" onSubmit={handleSubmit}>
            <div className="search-tab">
              <label htmlFor="flightDate">Flight Date</label>
              <select
                name="flightDate"
                id="flightDate"
                value={formData.flightDate}
                onChange={handleChange}
              >
                <option value="">Any Date</option>
                {ticketOptions.dates.map((date, index) => (
                  <option key={index} value={date}>
                    {date}
                  </option>
                ))}
              </select>
            </div>
            <div className="search-tab">
              <label htmlFor="flight">Flight</label>
              <select
                name="flight"
                id="flight"
                value={formData.flight}
                onChange={handleChange}
              >
                <option value="">Any Flight</option>
                {ticketOptions.flights.map((flight, index) => (
                  <option key={index} value={flight}>
                    {flight}
                  </option>
                ))}
              </select>
            </div>
            <div className="search-tab">
              <label htmlFor="flightTime">Flight Time</label>
              <select
                name="flightTime"
                id="flightTime"
                value={formData.flightTime}
                onChange={handleChange}
              >
                <option value="">Any Time</option>
                {ticketOptions.times.map((time, index) => (
                  <option key={index} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
            <div className="search-tab">
              <label htmlFor="destination">Flight Destination</label>
              <select
                name="destination"
                id="destination"
                value={formData.destination}
                onChange={handleChange}
              >
                <option value="">Any Destination</option>
                {ticketOptions.destinations.map((destination, index) => (
                  <option key={index} value={destination}>
                    {destination}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="rounded-button rounded">
              GO
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchTickets;