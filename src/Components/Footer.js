import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from "firebase/firestore";
import { firestore } from '../firebase';

const Footer = ({ marginTop }) => {
  const [siteInfo, setSiteInfo] = useState({
    facebook: '#',
    instagram: '#',
    twitter: '#',
    whatsapp1: '',
    whatsapp2: '',
    email: '',
    officeNumber: '',
    ceo: '',
    director: '',
    contactNumber: '',
    siteName: 'excellentsartrv',
    address: 'address'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSiteInfo = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "socials"));
        if (!querySnapshot.empty) {
          // Get the most recent socials document (assuming you want the latest update)
          const latestDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
          const socialsData = latestDoc.data();

          setSiteInfo(prev => ({
            ...prev,
            facebook: socialsData.facebook || '#',
            instagram: socialsData.instagram || '#',
            twitter: socialsData.twitter || '#',
            whatsapp1: socialsData.whatsapp1 || '',
            whatsapp2: socialsData.whatsapp2 || '',
            email: socialsData.email || '',
            officeNumber: socialsData.officeNumber || '',
            ceo: socialsData.ceo || '',
            director: socialsData.director || '',
            contactNumber: socialsData.contactNumber || '055-5555555',
            // Note: siteName and address aren't in your socials collection from AdminPanel
            // You might want to fetch these from basicInfo collection instead
            siteName: 'excellentsartrv', // Default value
            address: 'address' // Default value
          }));
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching site info: ", err);
        setError('Failed to load social links.');
        setLoading(false);
      }
    };
    fetchSiteInfo();
  }, []);

  return (
    <div className="container footer">
      <div className="body-cover">
        <div className="footer">
          {loading ? (
            <p>Loading social links...</p>
          ) : error ? (
            <p style={{ color: 'red' }}>{error}</p>
          ) : (
            <div className="grid-4x" style={{ marginTop }}>
              <div className="footer-card">
                <Link to="/" className="no-decoration">
                  <img src="assets/images/stars_logo_white.png" alt="site logo" className="logo" />
                </Link>
              </div>
              <div className="footer-card">
                <h3>Quick Links</h3>
                <Link to="/" className="no-decoration">Home</Link>
                <Link to="/about" className="no-decoration">About</Link>
                <Link to="/contact" className="no-decoration">Contact</Link>
                <Link to="/visa" className="no-decoration">Visa</Link>
                <Link to="/appointments" className="no-decoration">Appointments</Link>
                <Link to="/tickets" className="no-decoration">Tickets</Link>
                <Link to="/admin" className="no-decoration">Login</Link>
              </div>
              <div className="footer-card">
                <h3>Contact Links</h3>
                <a 
                  href={siteInfo.instagram} 
                  className="no-decoration" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
                <a 
                  href={siteInfo.facebook} 
                  className="no-decoration" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>
                <a 
                  href={`https://wa.me/${siteInfo.whatsapp1}`} 
                  className="no-decoration" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  CEO Whatsapp: {siteInfo.ceo}
                </a>
                <a 
                  href={`https://wa.me/${siteInfo.whatsapp2}`} 
                  className="no-decoration" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Director Whatsapp: {siteInfo.director}
                </a>
                <a 
                  href={siteInfo.twitter} 
                  className="no-decoration" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  @{siteInfo.siteName}
                </a>
                <a 
                  href={`mailto:${siteInfo.email}`} 
                  className="no-decoration"
                >
                  {siteInfo.email}
                </a>
                <a 
                  href={`tel:${siteInfo.officeNumber}`} 
                  className="no-decoration"
                >
                  Office: {siteInfo.officeNumber}
                </a>
                <a 
                  href={`tel:${siteInfo.contactNumber}`} 
                  className="no-decoration"
                >
                  Contact: {siteInfo.contactNumber}
                </a>
                <a 
                  href="#" 
                  className="no-decoration"
                >
                  Developer
                </a>
              </div>
              <div className="footer-card">
                <h3>Newsletter</h3>
                <form className="sub">
                  <input type="email" name="email" id="email" placeholder="email" />
                  <button type="submit">
                    <i className="fa-solid fa-check"></i>
                  </button>
                </form>
                <p>1st Floor, Asharf Centre, Punjab, opposite Side Vital College, Wazirabad, 52000</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Footer;