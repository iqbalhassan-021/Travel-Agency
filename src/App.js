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

// Function to check if the user is authenticated
const isAuthenticated = () => {
  return localStorage.getItem("isAdmin") === "true"; // Check auth status from localStorage
};

// Protected Route Component
const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/auth" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/admin" element={<ProtectedRoute element={<Admin />} />} />
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
      </Routes>
    </Router>
  );
}

export default App;
