import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { firestore } from '../firebase';

const TrendingAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Country to ISO code map for flag emoji
  const isoMap = {
    "Afghanistan": "AF", "Albania": "AL", "Algeria": "DZ", "Andorra": "AD", "Angola": "AO",
    "Argentina": "AR", "Armenia": "AM", "Australia": "AU", "Austria": "AT", "Azerbaijan": "AZ",
    "Bahrain": "BH", "Bangladesh": "BD", "Belarus": "BY", "Belgium": "BE", "Bhutan": "BT",
    "Bosnia and Herzegovina": "BA", "Brazil": "BR", "Brunei": "BN", "Bulgaria": "BG",
    "Cambodia": "KH", "Canada": "CA", "China": "CN", "Colombia": "CO", "Croatia": "HR",
    "Cyprus": "CY", "Czech Republic": "CZ", "Denmark": "DK", "Dubai": "AE", "Egypt": "EG",
    "Estonia": "EE", "Finland": "FI", "France": "FR", "Germany": "DE", "Greece": "GR",
    "Hong Kong": "HK", "Hungary": "HU", "India": "IN", "Indonesia": "ID", "Iran": "IR",
    "Iraq": "IQ", "Ireland": "IE", "Israel": "IL", "Italy": "IT", "Japan": "JP", "Jordan": "JO",
    "Kazakhstan": "KZ", "Kenya": "KE", "Kuwait": "KW", "Laos": "LA", "Latvia": "LV",
    "Lebanon": "LB", "Lithuania": "LT", "Luxembourg": "LU", "Malaysia": "MY", "Maldives": "MV",
    "Mexico": "MX", "Monaco": "MC", "Morocco": "MA", "Nepal": "NP", "Netherlands": "NL",
    "New Zealand": "NZ", "Nigeria": "NG", "North Korea": "KP", "Norway": "NO", "Oman": "OM",
    "Pakistan": "PK", "Philippines": "PH", "Poland": "PL", "Portugal": "PT", "Qatar": "QA",
    "Romania": "RO", "Russia": "RU", "Saudi Arabia": "SA", "Serbia": "RS", "Singapore": "SG",
    "Slovakia": "SK", "Slovenia": "SI", "South Africa": "ZA", "South Korea": "KR",
    "Spain": "ES", "Sri Lanka": "LK", "Sweden": "SE", "Switzerland": "CH", "Syria": "SY",
    "Taiwan": "TW", "Thailand": "TH", "Tunisia": "TN", "Turkey": "TR", "Ukraine": "UA",
    "United Arab Emirates": "AE", "United Kingdom": "GB", "United States": "US", "USA": "US",
    "Uzbekistan": "UZ", "Vietnam": "VN", "Yemen": "YE", "UAE": "AE", "UK": "GB"
  };

  const getFlag = (country) => {
    const code = isoMap[country];
    if (!code) return '🌐';
    return String.fromCodePoint(...[...code.toUpperCase()].map(c => 127397 + c.charCodeAt()));
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const q = query(collection(firestore, 'appointments'), orderBy('createdAt', 'desc'), limit(6));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAppointments(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load appointments.');
        setLoading(false);
        console.error(err);
      }
    };

    fetchAppointments();
  }, []);

  const firstCol = appointments.slice(0, 3);
  const secondCol = appointments.slice(3, 6);

  const toggle = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="visa-section">
   
      {loading && <div>Loading...</div>}
      {error && <div className="error">{error}</div>}
      <div className="visa-grid">
        {[firstCol, secondCol].map((col, i) => (
          <div className="visa-column" key={i}>
            {col.map((item) => (
              <div key={item.id}>
                <div className="visa-item" onClick={() => toggle(item.id)}>
                  <span className="flag">{getFlag(item.country)}</span>
                  <div className="visa-info">
                    <span className="country">{item.country}</span>
                    <span className="price">PKR {item.price}</span>
                  </div>
                  <span className="arrow">{expandedId === item.id ? '▲' : '›'}</span>
                </div>
                {expandedId === item.id && (
                  <div className="visa-details">
                    <p><strong>Consultant:</strong> {item.consultant}</p>
                    <p><strong>Visa Type:</strong> {item.type}</p>
                    <p><strong>Appointment Date:</strong> {item.date}</p>
                    <p><strong>Posted:</strong> {new Date(item.createdAt).toLocaleString()}</p>
                    <Link to='/book-appointment' className="no-decoration">
                      <button className="apply-btn">Book Appointment</button>
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

        .error {
          color: red;
          margin-bottom: 1rem;
        }
      `}</style>
    </section>
  );
};

export default TrendingAppointments;
