import React, { useState, useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { firestore } from '../firebase';
import './B2BPanel.css'; // You'll need to create this CSS file

const B2BPanel = () => {
  const [activeTab, setActiveTab] = useState('tickets');
  const [tickets, setTickets] = useState([]);
  const [visas, setVisas] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load data from Firestore
  useEffect(() => {
    const collections = ['tickets', 'visas', 'appointments', 'tours'];
    setLoading(true);
    
    collections.forEach(async (col) => {
      try {
        const querySnapshot = await getDocs(collection(firestore, col));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        switch(col) {
          case 'tickets': setTickets(data); break;
          case 'visas': setVisas(data); break;
          case 'appointments': setAppointments(data); break;
          case 'tours': setTours(data); break;
        }
      } catch (error) {
        setError(`Failed to load ${col}`);
      }
    });
    
    setLoading(false);
  }, []);

  return (
    <div className="b2b-container">
        <img src="/assets/images/stars_logo_black.png" alt="Logo" className="logo" /> {/* Replace with your logo URL */}
      <h1>B2B Portal</h1>
      
      {/* Tab Navigation */}
      <div className="tab-navigation">
        <button 
          className={activeTab === 'tickets' ? 'active' : ''} 
          onClick={() => setActiveTab('tickets')}
        >
          Tickets
        </button>
        <button 
          className={activeTab === 'visas' ? 'active' : ''} 
          onClick={() => setActiveTab('visas')}
        >
          Visas
        </button>
        <button 
          className={activeTab === 'appointments' ? 'active' : ''} 
          onClick={() => setActiveTab('appointments')}
        >
          Appointments
        </button>
        <button 
          className={activeTab === 'tours' ? 'active' : ''} 
          onClick={() => setActiveTab('tours')}
        >
          Tours
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {loading && <div className="loader">Loading...</div>}
        {error && <div className="error">{error}</div>}

        {activeTab === 'tickets' && (
          <div className="ticket-list">
            {tickets.length === 0 ? (
              <p>No tickets available</p>
            ) : (
              tickets.map(ticket => (
                <div key={ticket.id} className="ticket-item">
                  <h3>{ticket.name}</h3>
                  <p>Flight: {ticket.flight}</p>
                  <p>From: {ticket.departureCity} ({ticket.departureCode}) at {ticket.departureTime}</p>
                  <p>To: {ticket.arrivalCity} ({ticket.arrivalCode}) at {ticket.arrivalTime}</p>
                  <p>Gate: {ticket.gate}</p>
                  <p>Boarding: {ticket.boarding}</p>
                  <p>Seat: {ticket.seat}</p>
                  <p>B2B Price: PKR{ticket.ticketB2B}</p>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'visas' && (
          <div className="visa-list">
            {visas.length === 0 ? (
              <p>No visas available</p>
            ) : (
              visas.map(visa => (
                <div key={visa.id} className="visa-item">
                  <img src={visa.VisaImage} alt={visa.country} className="visa-image" />
                  <h3>{visa.country} - {visa.visaType}</h3>
                  <p>Price: PKR{visa.price}</p>
                  <p>B2B Price: PKR{visa.visaB2B}</p>
                  <p>Processing Time: {visa.processingTime}</p>
                  <p>Required Documents: {visa.documents}</p>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'appointments' && (
          <div className="appointment-list">
            {appointments.length === 0 ? (
              <p>No appointments available</p>
            ) : (
              appointments.map(apt => (
                <div key={apt.id} className="appointment-item">
                  <img src={apt.appimg} alt={apt.type} className="appointment-image" />
                  <h3>{apt.type} - {apt.country}</h3>
                  <p>Price: PKR{apt.price}</p>
                  <p>B2B Price: PKR{apt.appB2B}</p>
                  <p>Date: {apt.date}</p>
                  <p>Consultant: {apt.consultant}</p>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'tours' && (
          <div className="tour-list">
            {tours.length === 0 ? (
              <p>No tours available</p>
            ) : (
              tours.map(tour => (
                <div key={tour.id} className="tour-item">
                  <img src={tour.imageUrl} alt={tour.country} className="tour-image" />
                  <h3>{tour.country}</h3>
                  <p>Price: PKR{tour.price}</p>
                  <p>B2B Price: PKR{tour.tourB2B}</p>
                  <p>Duration: {tour.duration}</p>
                  <p>Date: {tour.date}</p>
                  <p>Required Documents: {tour.requiredDocuments}</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default B2BPanel;