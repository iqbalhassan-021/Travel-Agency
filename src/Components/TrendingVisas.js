import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, limit } from "firebase/firestore";
import { firestore } from '../firebase';

const TrendingVisas = () => {
  const [visas, setVisas] = useState([]);
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
    'USA': '🇺🇸'
  };

  // Fetch visas from Firestore
  useEffect(() => {
    const fetchVisas = async () => {
      try {
        const visasQuery = query(collection(firestore, 'visas'), limit(6));
        const querySnapshot = await getDocs(visasQuery);
        const visaData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setVisas(visaData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load visas');
        setLoading(false);
        console.error("Error fetching visas:", err);
      }
    };
    fetchVisas();
  }, []);

  const firstColumn = visas.slice(0, 3);
  const secondColumn = visas.slice(3, 6);

  const toggleVisa = (country) => {
    setExpandedVisa(expandedVisa === country ? null : country);
  };

  const getFlag = (country) => {
    return flagMap[country] || '🌐'; // Fallback flag for unmapped countries
  };

  return (
    <section className="visa-section">
      <h2 className="section-title">Trending Visas</h2>
      {loading && <div>Loading...</div>}
      {error && <div className="error">{error}</div>}
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
      <h2 className="section-title">
      <Link to='/visa' className='no-decoration'>
            View All Visas
          
      </Link>

        </h2>

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

        .error {
          color: red;
          margin-bottom: 1rem;
        }
      `}</style>
    </section>
  );
};

export default TrendingVisas;