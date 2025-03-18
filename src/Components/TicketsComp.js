import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from "firebase/firestore";
import { firestore } from '../firebase'; // Adjust the import path based on your Firebase config file location

const TicketsComp = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch tickets from Firestore
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "tickets"));
        const ticketsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setTickets(ticketsData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching tickets: ", err);
        setError("Failed to load tickets. Please try again later.");
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  if (loading) {
    return <div>Loading tickets...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="tickets-container">
      {tickets.map(ticket => (
        <div className="ticket" key={ticket.id}>
          <div className="headline-container">
            <h2>
              <i className="fa-solid fa-earth-americas"></i>
              B O A R D I N G - P A S S
            </h2>
          </div>
          <div className="tickrt-info">
            <div className="ticket-tab">
              <h2>
                <i className="fa-solid fa-plane"></i>  <span> </span>
                DEPARTURE
              </h2>
              <h3>{ticket.departureTime || 'N/A'}</h3>
              <h3>{ticket.departureCity || 'N/A'}</h3>
              <h3>{ticket.departureCode || 'N/A'}</h3>
            </div>

            <div className="ticket-tab">
              <h2>
                <i className="fa-solid fa-plane"></i>  <span> </span>
                ARRIVAL
              </h2>
              <h3>{ticket.arrivalTime || 'N/A'}</h3>
              <h3>{ticket.arrivalCity || 'N/A'}</h3>
              <h3>{ticket.arrivalCode || 'N/A'}</h3>
            </div>

            <div className="ticket-tab">
              <h2>
                <i className="fa-solid fa-user"></i> <span> </span>
                {ticket.name || 'Passenger Name'}
              </h2>
              <p><strong>Flight: </strong>{ticket.flight || 'N/A'}</p>
              <p><strong>Gate: </strong>{ticket.gate || 'N/A'}</p>
              <p><strong>Boarding: </strong>{ticket.boarding || 'N/A'}</p>
              <p><strong>Seat: </strong>{ticket.seat || 'N/A'}</p>
            </div>

            <div className="ticket-tab">
              <Link to="/book-ticket" className="no-decoration primary-button">
                Book Now
              </Link>
            </div>
          </div>
        </div>
      ))}
      {tickets.length === 0 && (
        <div>No tickets available at the moment.</div>
      )}
    </div>
  );
};

export default TicketsComp;