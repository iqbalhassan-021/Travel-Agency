import React, { useState, useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { firestore } from '../firebase'; // Adjust the import path based on your Firebase config file location

const Hero = () => {
  // State to manage hero content
  const [heading, setHeading] = useState("HAJJ UMRAH"); // Default fallback for heading
  const [text, setText] = useState("Hajj and Umrah packages are available at low and affordable prices"); // Default fallback for text
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch hero data from Firestore on mount
  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "hero"));
        if (!querySnapshot.empty) {
          const siteData = querySnapshot.docs[0].data();
          setHeading(siteData.heading || "HAJJ UMRAH"); // Use fetched heading or fallback
          setText(siteData.text || "Hajj and Umrah packages are available at low and affordable prices"); // Use fetched text or fallback
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching hero data: ", err);
        setError('Failed to load hero content.');
        setLoading(false);
      }
    };
    fetchHeroData();
  }, []);

  const headingWords = heading.split(' ');
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
                {heading}
              </h1>
              <p>
                {text}
              </p>
              <br />
              <br />
              <a href="/visa" className="no-decoration primary-button rounded">
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