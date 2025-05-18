import React, { useState, useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { firestore } from '../firebase';
import Notification from '../Components/Notification';
import Navbar from '../Components/NavBar';
import TitleBar from '../Components/TitleBar';
import Footer from '../Components/Footer';
import TrendingVisas from '../Components/TrendingVisas';
import { Link } from 'react-router-dom';

const VisaPage = () => {
  const [visas, setVisas] = useState([]);
  const [visaTypes, setVisaTypes] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [expandedVisa, setExpandedVisa] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Map country names to flag emojis
  const flagMap = {
    'Australia': '🇦🇺',
    'Canada': '🇨🇦',
    'Greece': '🇬🇷',
    'Malaysia': '🇲🇾',
    'Thailand': '🇹🇭',
    'United Kingdom': '🇬🇧',
    'Azerbaijan': '🇦🇿',
    'Egypt': '🇪🇬',
    'Hong Kong': '🇭🇰',
    'Singapore': '🇸🇬',
    'Dubai': '🇦🇪',
    'UAE 30 Days': '🇦🇪',
    'USA': '🇺🇸'
  };

  // Fetch visas and visa types from Firestore
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch visas
        const visasSnapshot = await getDocs(collection(firestore, 'visas'));
        const visaData = visasSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setVisas(visaData);

        // Fetch visa types
        const visaTypesSnapshot = await getDocs(collection(firestore, 'visaTypes'));
        const visaTypeData = visaTypesSnapshot.docs.map(doc => ({
          id: doc.id,
          type: doc.data().name // Firestore stores visa type as 'name'
        }));
        setVisaTypes(visaTypeData);

        setLoading(false);
      } catch (err) {
        setError('Failed to load data');
        setLoading(false);
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  // Filter visas based on selected visa type
  const filteredVisas = selectedType
    ? visas.filter(visa => visa.visaType === selectedType)
    : visas;

  const firstColumn = filteredVisas.slice(0, 6);
  const secondColumn = filteredVisas.slice(6, 12);

  const toggleVisa = (country) => {
    setExpandedVisa(expandedVisa === country ? null : country);
  };

  const getFlag = (country) => {
    return flagMap[country] || '🌐'; // Fallback flag for unmapped countries
  };

  return (
    <div className="container" style={{ backgroundColor: 'white' }}>
      <Notification backgroundColor="white" Color="black" /> 
      <Navbar backgroundColor="black" />
      {loading && <div style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>}
      {error && <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>{error}</div>}
      <div className="visa-type-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '20px', padding: '20px', maxWidth:'1200px', marginLeft:'auto', marginRight:'auto' }}>
        {visaTypes.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedType(item.type)}
            style={{
              backgroundColor: 'black',
              borderRadius: '22px',
              height: '150px',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              paddingBottom: '10px',
              cursor: 'pointer',
              border: selectedType === item.type ? '3px solid #000' : 'none'
            }}
          >
            {item.type}
          </div>
        ))}
      </div>
      <div className="visa-slider-section">
        <section className="visa-section">
          <div className="visa-grid">
            {[firstColumn, secondColumn].map((column, i) => (
              <div className="visa-column" key={i}>
                {column.map((visa) => (
                  <div key={visa.id}>
                    <div className="visa-item" onClick={() => toggleVisa(visa.country)}>
                      <span className="flag">{getFlag(visa.country)}</span>
                      <div className="visa-info">
                        <span className="country">{visa.country}</span>
                        <span className="price">PKR {visa.price}</span>
                      </div>
                      <span className="arrow">{expandedVisa === visa.country ? '▲' : '›'}</span>
                    </div>
                    {expandedVisa === visa.country && (
                      <div className="visa-details">
                        <p><strong>Visa Type:</strong> {visa.visaType}</p>
                        <p><strong>Required Documents:</strong> {visa.documents}</p>
                        <p><strong>Processing Time:</strong> {visa.processingTime} Days</p>
                        
                              <Link to='/book-visa' className='no-decoration'>
                                 <button className="apply-btn">Apply Now</button>     
                              </Link>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <br />
          <style jsx>{`
            .visa-section {
              padding: 2rem 1rem;
              text-align: center;
            }

            .section-title {
              font-size: 1.8rem;
              font-weight: bold;
              margin-bottom: 2rem;
              color: maroon;
            }

            .visa-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
              gap: 2rem;
              max-width: 1200px;
              margin: 0 auto;
            }

            .visa-column {
              display: flex;
              flex-direction: column;
              gap: 1rem;
            }

            .visa-item {
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 1rem;
              border-bottom: 1px solid #ddd;
              cursor: pointer;
              background-color: #f9f9f9;
            }

            .flag {
              font-size: 1.5rem;
              margin-right: 0.8rem;
            }

            .visa-info {
              flex-grow: 1;
              text-align: left;
            }

            .country {
              display: block;
              font-weight: 600;
              color: #000;
            }

            .price {
              font-size: 0.9rem;
              color: maroon;
            }

            .arrow {
              font-size: 1.2rem;
              color: #555;
            }

            .visa-details {
              text-align: left;
              background: #fff7f7;
              border-left: 4px solid maroon;
              padding: 1rem 1.5rem;
              margin: 0 1rem 1rem 1rem;
              font-size: 0.95rem;
            }

            .apply-btn {
              margin-top: 10px;
              background-color: maroon;
              color: white;
              border: none;
              padding: 0.6rem 1.2rem;
              border-radius: 4px;
              cursor: pointer;
            }

            .apply-btn:hover {
              background-color: #8b0000;
            }
          `}</style>
        </section>
      </div>
      <Footer marginTop="0%" />
    </div>
  );
};

export default VisaPage;