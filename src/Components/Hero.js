import React, { useState, useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { firestore } from '../firebase'; // adjust path as needed
import './hero.css'; // We'll write custom CSS here

const Hero = () => {
  const [heading, setHeading] = useState("Heading");
  const [text, setText] = useState("Subheading");
  const [heroImage, setHeroImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "hero"));
        if (!querySnapshot.empty) {
          const siteData = querySnapshot.docs[0].data();
          setHeading(siteData.heading || heading);
          setText(siteData.text || text);
          setHeroImage(siteData.backgroundImg || heroImage);
        }
      } catch (err) {
        console.error("Hero fetch error:", err);
        setError("Failed to load hero content.");
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  return (
    <section className="newhero-section" style={{ backgroundImage: `url(${heroImage})` }}>
      <div className="overlay">
      <div className="body-cover"> 
        <div className="hero-content">

          {loading ? (
            <p className="loading">Loading...</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : (
            <>
              <h1 className="hero-title">{heading}</h1>
              <p className="hero-subtext">{text}</p>
            </>
          )}
        </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
