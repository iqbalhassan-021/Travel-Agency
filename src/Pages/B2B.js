import React, { useState, useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { firestore } from '../firebase';
import Notification from '../Components/Notification';
import Navbar from '../Components/NavBar';
import Footer from '../Components/Footer';
import './B2BPanel.css';
import { Link } from 'react-router-dom';

const B2BPanel = () => {
  const [activeTab, setActiveTab] = useState('tickets');
  const [data, setData] = useState({ tickets: [], visas: [], appointments: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const tabs = ['tickets', 'visas', 'appointments'];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const newData = {};
        for (const tab of tabs) {
          const querySnapshot = await getDocs(collection(firestore, tab));
          newData[tab] = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        }
        setData(newData);
      } catch (err) {
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const renderTable = () => {
    const rows = data[activeTab] || [];
    if (rows.length === 0) return <p>No {activeTab} available</p>;

    let headers = [];
    switch (activeTab) {
      case 'tickets':
        headers = ['Name', 'Flight', 'From', 'To', 'Gate', 'Boarding', 'Seat', 'B2B Price', 'Apply'];
        break;
      case 'visas':
        headers = ['Country', 'Type', 'Price', 'B2B Price', 'Processing Time', 'Documents', 'Apply'];
        break;
      case 'appointments':
        headers = ['Type', 'Country', 'Price', 'B2B Price', 'Date', 'Consultant', 'Apply'];
        break;
      default:
        return null;
    }

    return (
      <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            {headers.map((h, i) => <th key={i}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((item) => {
            switch (activeTab) {
              case 'tickets':
                return (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.flight}</td>
                    <td>{item.departureCity} ({item.departureCode})</td>
                    <td>{item.arrivalCity} ({item.arrivalCode})</td>
                    <td>{item.gate}</td>
                    <td>{item.boarding}</td>
                    <td>{item.seat}</td>
                    <td>PKR {item.ticketB2B}</td>
                    <td>
                      <Link to='/book-ticket' className='primary-button'>
                        Apply
                      </Link>
                    </td>
                  </tr>
                );
              case 'visas':
                return (
                  <tr key={item.id}>
                    <td>{item.country}</td>
                    <td>{item.visaType}</td>
                    <td>PKR {item.price}</td>
                    <td>PKR {item.visaB2B}</td>
                    <td>{item.processingTime}</td>
                    <td>{item.documents}</td>
                      <Link to='/book-visa' className='primary-button'>
                        Apply
                      </Link>
                  </tr>
                );
              case 'appointments':
                return (
                  <tr key={item.id}>
                    <td>{item.type}</td>
                    <td>{item.country}</td>
                    <td>PKR {item.price}</td>
                    <td>PKR {item.appB2B}</td>
                    <td>{item.date}</td>
                    <td>{item.consultant}</td>
                      <Link to='/book-appointment' className='primary-button'>
                        Apply
                      </Link>
                  </tr>
                );
              default:
                return null;
            }
          })}
        </tbody>
      </table>
      </div>
    );
  };

  return (
    <div className="container" style={{ backgroundColor: 'white' }}>

      <Navbar backgroundColor="black" />
    <div className='body-cover'>
      <div className="b2b-panel">
        <h1>B2B Portal</h1>

        <div className="tab-grid">
          {tabs.map(tab => (
            <button
              key={tab}
              className={`tab-button ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="tab-content">
          {loading && <div className="loader">Loading...</div>}
          {error && <div className="error">{error}</div>}
          {!loading && renderTable()}
        </div>
      </div>
</div>
      <Footer />
    </div>

  );
};

export default B2BPanel;
