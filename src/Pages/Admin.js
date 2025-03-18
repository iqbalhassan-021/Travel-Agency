import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { firestore } from '../firebase';
import './AdminPanel.css';

const AdminPanel = () => {
  const [activeSection, setActiveSection] = useState('tickets');
  const [tickets, setTickets] = useState([]);
  const [visas, setVisas] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Form states
  const [ticketForm, setTicketForm] = useState({
    name: '', departureTime: '', departureCity: '', departureCode: '',
    arrivalTime: '', arrivalCity: '', arrivalCode: '', flight: '',
    gate: '', boarding: '', seat: ''
  });
  
  const [visaForm, setVisaForm] = useState({
    country: '', documents: '', price: '', processingTime: '', visaType: ''
  });
  
  const [appointmentForm, setAppointmentForm] = useState({
    type: '', country: '', price: '', date: '', consultant: ''
  });
  
  const [basicInfoForm, setBasicInfoForm] = useState({
    siteName: '', logo: '', aboutText: ''
  });
  
  const [socialsForm, setSocialsForm] = useState({
    facebook: '', instagram: '', twitter: '', whatsapp1: '', whatsapp2: '',
    email: '', officeNumber: '', ceo: '', director: '', contactNumber: ''
  });
  
  const [heroForm, setHeroForm] = useState({
    heading: '', text: '', backgroundImg: ''
  });
  
  const [notificationForm, setNotificationForm] = useState({
    message: ''
  });

  // Reset form states
  const ticketResetForm = {
    name: '', departureTime: '', departureCity: '', departureCode: '',
    arrivalTime: '', arrivalCity: '', arrivalCode: '', flight: '',
    gate: '', boarding: '', seat: ''
  };
  
  const visaResetForm = {
    country: '', documents: '', price: '', processingTime: '', visaType: ''
  };
  
  const appointmentResetForm = {
    type: '', country: '', price: '', date: '', consultant: ''
  };
  
  const notificationResetForm = {
    message: ''
  };

  // Firestore save functions
  const saveTicket = async (ticketData) => {
    try {
      const docRef = await addDoc(collection(firestore, "tickets"), {
        ...ticketData,
        createdAt: new Date().toISOString()
      });
      return docRef.id;
    } catch (error) {
      console.error("Error saving ticket:", error);
      throw error;
    }
  };

  const saveVisa = async (visaData) => {
    try {
      const docRef = await addDoc(collection(firestore, "visas"), {
        ...visaData,
        createdAt: new Date().toISOString()
      });
      return docRef.id;
    } catch (error) {
      console.error("Error saving visa:", error);
      throw error;
    }
  };

  const saveAppointment = async (appointmentData) => {
    try {
      const docRef = await addDoc(collection(firestore, "appointments"), {
        ...appointmentData,
        createdAt: new Date().toISOString()
      });
      return docRef.id;
    } catch (error) {
      console.error("Error saving appointment:", error);
      throw error;
    }
  };

  const saveBasicInfo = async (basicInfoData) => {
    try {
      const docRef = await addDoc(collection(firestore, "basicInfo"), {
        ...basicInfoData,
        updatedAt: new Date().toISOString()
      });
      return docRef.id;
    } catch (error) {
      console.error("Error saving basic info:", error);
      throw error;
    }
  };

  const saveSocials = async (socialsData) => {
    try {
      const docRef = await addDoc(collection(firestore, "socials"), {
        ...socialsData,
        updatedAt: new Date().toISOString()
      });
      return docRef.id;
    } catch (error) {
      console.error("Error saving socials:", error);
      throw error;
    }
  };

  const saveHero = async (heroData) => {
    try {
      const docRef = await addDoc(collection(firestore, "hero"), {
        ...heroData,
        updatedAt: new Date().toISOString()
      });
      return docRef.id;
    } catch (error) {
      console.error("Error saving hero:", error);
      throw error;
    }
  };

  const saveNotification = async (notificationData) => {
    try {
      const docRef = await addDoc(collection(firestore, "notifications"), {
        ...notificationData,
        createdAt: new Date().toISOString(),
        status: "active"
      });
      return docRef.id;
    } catch (error) {
      console.error("Error saving notification:", error);
      throw error;
    }
  };

  // Handler functions
  const handleAdd = async (e, collectionName, formData, setForm, resetForm) => {
    e.preventDefault();
    setLoading(true);
    try {
      let docId;
      switch(collectionName) {
        case 'tickets':
          docId = await saveTicket(formData);
          setTickets([...tickets, { ...formData, id: docId }]);
          break;
        case 'visas':
          docId = await saveVisa(formData);
          setVisas([...visas, { ...formData, id: docId }]);
          break;
        case 'appointments':
          docId = await saveAppointment(formData);
          setAppointments([...appointments, { ...formData, id: docId }]);
          break;
        case 'notifications':
          docId = await saveNotification(formData);
          setNotifications([...notifications, { ...formData, id: docId }]);
          break;
        default:
          break;
      }
      setForm(resetForm);
      setError(null);
    } catch (error) {
      setError('Failed to add item');
    }
    setLoading(false);
  };

  const handleDelete = async (id, collectionName, setState, state) => {
    setLoading(true);
    try {
      await deleteDoc(doc(firestore, collectionName, id));
      setState(state.filter(item => item.id !== id));
      setError(null);
    } catch (error) {
      setError('Failed to delete item');
    }
    setLoading(false);
  };

  const handleBasicInfoUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await saveBasicInfo(basicInfoForm);
      setError(null);
    } catch (error) {
      setError('Failed to update basic info');
    }
    setLoading(false);
  };

  const handleSocialsUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await saveSocials(socialsForm);
      setError(null);
    } catch (error) {
      setError('Failed to update socials');
    }
    setLoading(false);
  };

  const handleHeroUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await saveHero(heroForm);
      setError(null);
    } catch (error) {
      setError('Failed to update hero');
    }
    setLoading(false);
  };

  // Load initial data
  useEffect(() => {
    const collections = ['tickets', 'visas', 'appointments', 'notifications'];
    collections.forEach(async (col) => {
      try {
        const querySnapshot = await getDocs(collection(firestore, col));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        switch(col) {
          case 'tickets': setTickets(data); break;
          case 'visas': setVisas(data); break;
          case 'appointments': setAppointments(data); break;
          case 'notifications': setNotifications(data); break;
        }
      } catch (error) {
        setError(`Failed to load ${col}`);
      }
    });
  }, []);

  return (
    <div className="admin-container">
      <div className="sidebar">
        <h2>Travel Admin</h2>
        <ul>
          {['tickets', 'visas', 'appointments', 'basicInfo', 'socials', 'hero', 'notifications'].map(section => (
            <li 
              key={section} 
              className={activeSection === section ? 'active' : ''} 
              onClick={() => setActiveSection(section)}
            >
              {section === 'basicInfo' ? 'Basic Info' : 
               section === 'socials' ? 'Social Media' : 
               section === 'hero' ? 'Hero Section' : 
               section.charAt(0).toUpperCase() + section.slice(1)}
            </li>
          ))}
        </ul>
      </div>

      <div className="main-content">
        {loading && <div className="loader">Loading...</div>}
        {error && <div className="error">{error}</div>}

        {activeSection === 'tickets' && (
          <section>
            <h2>Manage Tickets</h2>
            <form onSubmit={(e) => handleAdd(e, 'tickets', ticketForm, setTicketForm, ticketResetForm)}>
              <input type="text" placeholder="Passenger Name" value={ticketForm.name} onChange={(e) => setTicketForm({ ...ticketForm, name: e.target.value })} required />
              <input type="text" placeholder="Departure Time" value={ticketForm.departureTime} onChange={(e) => setTicketForm({ ...ticketForm, departureTime: e.target.value })} required />
              <input type="text" placeholder="Departure City" value={ticketForm.departureCity} onChange={(e) => setTicketForm({ ...ticketForm, departureCity: e.target.value })} required />
              <input type="text" placeholder="Departure Code" value={ticketForm.departureCode} onChange={(e) => setTicketForm({ ...ticketForm, departureCode: e.target.value })} required />
              <input type="text" placeholder="Arrival Time" value={ticketForm.arrivalTime} onChange={(e) => setTicketForm({ ...ticketForm, arrivalTime: e.target.value })} required />
              <input type="text" placeholder="Arrival City" value={ticketForm.arrivalCity} onChange={(e) => setTicketForm({ ...ticketForm, arrivalCity: e.target.value })} required />
              <input type="text" placeholder="Arrival Code" value={ticketForm.arrivalCode} onChange={(e) => setTicketForm({ ...ticketForm, arrivalCode: e.target.value })} required />
              <input type="text" placeholder="Flight Number" value={ticketForm.flight} onChange={(e) => setTicketForm({ ...ticketForm, flight: e.target.value })} required />
              <input type="text" placeholder="Gate" value={ticketForm.gate} onChange={(e) => setTicketForm({ ...ticketForm, gate: e.target.value })} required />
              <input type="text" placeholder="Boarding Time" value={ticketForm.boarding} onChange={(e) => setTicketForm({ ...ticketForm, boarding: e.target.value })} required />
              <input type="text" placeholder="Seat" value={ticketForm.seat} onChange={(e) => setTicketForm({ ...ticketForm, seat: e.target.value })} required />
              <button type="submit" disabled={loading}>Add Ticket</button>
            </form>
            <div className="list">
              {tickets.map(ticket => (
                <div key={ticket.id} className="list-item">
                  <span>{ticket.name} - {ticket.flight} ({ticket.departureCity} to {ticket.arrivalCity})</span>
                  <button className="delete-btn" onClick={() => handleDelete(ticket.id, 'tickets', setTickets, tickets)}>Delete</button>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeSection === 'visas' && (
          <section>
            <h2>Manage Visas</h2>
            <form onSubmit={(e) => handleAdd(e, 'visas', visaForm, setVisaForm, visaResetForm)}>
              <input type="text" placeholder="Country" value={visaForm.country} onChange={(e) => setVisaForm({ ...visaForm, country: e.target.value })} required />
              <textarea placeholder="Required Documents" value={visaForm.documents} onChange={(e) => setVisaForm({ ...visaForm, documents: e.target.value })} required />
              <input type="number" placeholder="Price" value={visaForm.price} onChange={(e) => setVisaForm({ ...visaForm, price: e.target.value })} required />
              <input type="text" placeholder="Processing Time" value={visaForm.processingTime} onChange={(e) => setVisaForm({ ...visaForm, processingTime: e.target.value })} required />
              <input type="text" placeholder="Visa Type" value={visaForm.visaType} onChange={(e) => setVisaForm({ ...visaForm, visaType: e.target.value })} required />
              <button type="submit" disabled={loading}>Add Visa</button>
            </form>
            <div className="list">
              {visas.map(visa => (
                <div key={visa.id} className="list-item">
                  <span>{visa.country} - {visa.visaType} (${visa.price})</span>
                  <button className="delete-btn" onClick={() => handleDelete(visa.id, 'visas', setVisas, visas)}>Delete</button>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeSection === 'appointments' && (
          <section>
            <h2>Manage Appointments</h2>
            <form onSubmit={(e) => handleAdd(e, 'appointments', appointmentForm, setAppointmentForm, appointmentResetForm)}>
              <select value={appointmentForm.type} onChange={(e) => setAppointmentForm({ ...appointmentForm, type: e.target.value })} required>
                <option value="">Select Type</option>
                <option value="Work Visa">Work Visa</option>
                <option value="Study Visa">Study Visa</option>
                <option value="Tourist Visa">Tourist Visa</option>
              </select>
              <input type="text" placeholder="Country" value={appointmentForm.country} onChange={(e) => setAppointmentForm({ ...appointmentForm, country: e.target.value })} required />
              <input type="number" placeholder="Price" value={appointmentForm.price} onChange={(e) => setAppointmentForm({ ...appointmentForm, price: e.target.value })} required />
              <input type="date" value={appointmentForm.date} onChange={(e) => setAppointmentForm({ ...appointmentForm, date: e.target.value })} required />
              <input type="text" placeholder="Consultant Name" value={appointmentForm.consultant} onChange={(e) => setAppointmentForm({ ...appointmentForm, consultant: e.target.value })} required />
              <button type="submit" disabled={loading}>Add Appointment</button>
            </form>
            <div className="list">
              {appointments.map(apt => (
                <div key={apt.id} className="list-item">
                  <span>{apt.type} - {apt.country} (${apt.price})</span>
                  <button className="delete-btn" onClick={() => handleDelete(apt.id, 'appointments', setAppointments, appointments)}>Delete</button>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeSection === 'basicInfo' && (
          <section>
            <h2>Basic Information</h2>
            <form onSubmit={handleBasicInfoUpdate}>
              <input 
                type="text" 
                placeholder="Site Name" 
                value={basicInfoForm.siteName} 
                onChange={(e) => setBasicInfoForm({ ...basicInfoForm, siteName: e.target.value })} 
                required 
              />
              <input 
                type="text" 
                placeholder="Logo URL" 
                value={basicInfoForm.logo} 
                onChange={(e) => setBasicInfoForm({ ...basicInfoForm, logo: e.target.value })} 
              />
              <textarea 
                placeholder="About Us Text" 
                value={basicInfoForm.aboutText} 
                onChange={(e) => setBasicInfoForm({ ...basicInfoForm, aboutText: e.target.value })} 
                required 
              />
              <button type="submit" disabled={loading}>Update Basic Info</button>
            </form>
          </section>
        )}

        {activeSection === 'socials' && (
          <section>
            <h2>Contact Information</h2>
            <form onSubmit={handleSocialsUpdate}>
              <input 
                type="text" 
                placeholder="Facebook Link" 
                value={socialsForm.facebook} 
                onChange={(e) => setSocialsForm({ ...socialsForm, facebook: e.target.value })} 
                required 
              />
              <input 
                type="text" 
                placeholder="Instagram Link" 
                value={socialsForm.instagram} 
                onChange={(e) => setSocialsForm({ ...socialsForm, instagram: e.target.value })} 
                required 
              />
              <input 
                type="text" 
                placeholder="Twitter Link" 
                value={socialsForm.twitter} 
                onChange={(e) => setSocialsForm({ ...socialsForm, twitter: e.target.value })} 
                required 
              />
              <input 
                type="text" 
                placeholder="CEO WhatsApp Number" 
                value={socialsForm.whatsapp1} 
                onChange={(e) => setSocialsForm({ ...socialsForm, whatsapp1: e.target.value })} 
                required 
              />
              <input 
                type="text" 
                placeholder="Director WhatsApp Number" 
                value={socialsForm.whatsapp2} 
                onChange={(e) => setSocialsForm({ ...socialsForm, whatsapp2: e.target.value })} 
                required 
              />
              <input 
                type="email" 
                placeholder="Contact Email" 
                value={socialsForm.email} 
                onChange={(e) => setSocialsForm({ ...socialsForm, email: e.target.value })} 
                required 
              />
              <input 
                type="tel" 
                placeholder="Office Number" 
                value={socialsForm.officeNumber} 
                onChange={(e) => setSocialsForm({ ...socialsForm, officeNumber: e.target.value })} 
                required 
              />
              <input 
                type="text" 
                placeholder="CEO Name" 
                value={socialsForm.ceo} 
                onChange={(e) => setSocialsForm({ ...socialsForm, ceo: e.target.value })} 
                required 
              />
              <input 
                type="text" 
                placeholder="Director Name" 
                value={socialsForm.director} 
                onChange={(e) => setSocialsForm({ ...socialsForm, director: e.target.value })} 
                required 
              />
              <input 
                type="text" 
                placeholder="Contact Number" 
                value={socialsForm.contactNumber} 
                onChange={(e) => setSocialsForm({ ...socialsForm, contactNumber: e.target.value })} 
                required 
              />
              <button type="submit" disabled={loading}>Update Contact Info</button>
            </form>
          </section>
        )}

        {activeSection === 'hero' && (
          <section>
            <h2>Hero Section</h2>
            <form onSubmit={handleHeroUpdate}>
              <input 
                type="text" 
                placeholder="Hero Heading" 
                value={heroForm.heading} 
                onChange={(e) => setHeroForm({ ...heroForm, heading: e.target.value })} 
                required 
              />
              <input 
                type="text" 
                placeholder="Hero Text" 
                value={heroForm.text} 
                onChange={(e) => setHeroForm({ ...heroForm, text: e.target.value })} 
                required 
              />
              <input 
                type="text" 
                placeholder="Hero Background Image URL" 
                value={heroForm.backgroundImg} 
                onChange={(e) => setHeroForm({ ...heroForm, backgroundImg: e.target.value })} 
              />
              <button type="submit" disabled={loading}>Update Hero</button>
            </form>
          </section>
        )}

        {activeSection === 'notifications' && (
          <section>
            <h2>Notifications</h2>
            <form onSubmit={(e) => handleAdd(e, 'notifications', notificationForm, setNotificationForm, notificationResetForm)}>
              <textarea placeholder="Notification Message" value={notificationForm.message} onChange={(e) => setNotificationForm({ ...notificationForm, message: e.target.value })} required />
              <button type="submit" disabled={loading}>Send Notification</button>
            </form>
            <div className="list">
              {notifications.map(notif => (
                <div key={notif.id} className="list-item">
                  <span>{notif.message}</span>
                  <button className="delete-btn" onClick={() => handleDelete(notif.id, 'notifications', setNotifications, notifications)}>Delete</button>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;