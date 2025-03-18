import React, { useState, useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { firestore } from '../firebase'; // Adjust the import path based on your Firebase config file location

const Hero = () => {
  // State to manage hero text
  const [heroText, setHeroText] = useState("HAJJ UMRAH"); // Default fallback
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch hero text from Firestore on mount
  useEffect(() => {
    const fetchHeroText = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "siteInfo"));
        if (!querySnapshot.empty) {
          const siteData = querySnapshot.docs[0].data(); // Assuming one document for site info
          setHeroText(siteData.heroText || "HAJJ UMRAH"); // Use fetched text or fallback
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching hero text: ", err);
        setError('Failed to load hero text.');
        setLoading(false);
      }
    };
    fetchHeroText();
  }, []);

  const headingWords = heroText.split(' ');
  const fontClass = headingWords.length > 2 ? 'smallerFontSize' : 'largerFontSize';

  return (
    <div className="container">
      <div className="hero center">
        <div className="hero-text center">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p style={{ color: 'red' }}>{error}</p>
          ) : (
            <>
              <h1 id="heading" className={fontClass}>
                {heroText}
              </h1>
              <p>
                Hajj and Umrah packages are available at low and affordable prices
              </p>
              <br />
              <br />
              <a href="#" className="no-decoration primary-button rounded">
                Get Started
              </a>
            </>
          )}
        </div>
        <br />
        <br />
      </div>
    </div>
  );
};

export default Hero;