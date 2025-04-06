import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import './App.css';
import Home from './Pages/Home';
import Contact from './Pages/Contact';
import About from './Pages/About';
import Tickets from './Pages/Tickets';
import BookTickets from './Pages/BookTickets';
import Visa from './Pages/Visa';
import BookVisa from './Pages/BookVisa';
import Appointments from './Pages/Appointments';
import BookAppointment from './Pages/BookAppointment';
import TicketBooking from './Pages/TicketBooking';
import Auth from './Pages/Auth';
import Admin from './Pages/Admin';
import VisaInfo from './Pages/VisaInfo';
import AppointmentInfo from './Pages/AppointmentsInfo';
import BookTour from './Pages/TourBooking';
import B2BPanel from './Pages/B2B';

// Function to check if the user is authenticated as Admin
const isAdminAuthenticated = () => {
  return localStorage.getItem("isAdmin") === "true";
};

// Function to check if the user is authenticated as B2B
const isB2BAuthenticated = () => {
  return localStorage.getItem("isB2B") === "true";
};

// Protected Admin Route Component
const ProtectedAdminRoute = ({ element }) => {
  return isAdminAuthenticated() ? element : <Navigate to="/auth" />;
};

// Protected B2B Route Component
const ProtectedB2BRoute = ({ element }) => {
  return isB2BAuthenticated() ? element : <Navigate to="/auth" />;
};

function App() {
  return (
    <>
      <head>
        <title>Excellect Stars Travel and Tours</title>
      </head>
      <Router>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin" element={<ProtectedAdminRoute element={<Admin />} />} />
          <Route path="/b2b" element={<ProtectedB2BRoute element={<B2BPanel />} />} />
          <Route path="/*" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/book-tickets" element={<BookTickets />} />
          <Route path="/visa" element={<Visa />} />
          <Route path="/book-visa" element={<BookVisa />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/book-appointment" element={<BookAppointment />} />
          <Route path="/book-ticket" element={<TicketBooking />} />
          <Route path="/visaInfo/:id" element={<VisaInfo />} />
          <Route path="/appointmentInfo/:id" element={<AppointmentInfo />} />
          <Route path="/book-tour" element={<BookTour />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;