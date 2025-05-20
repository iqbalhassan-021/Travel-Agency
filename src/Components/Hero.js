import React, { useState, useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { firestore } from '../firebase';
import './hero.css';

const Hero = () => {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "hero"));
        if (!querySnapshot.empty) {
          const data = querySnapshot.docs.map(doc => doc.data());
          setSlides(data);
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

  // Auto-transition
  useEffect(() => {
    if (slides.length < 2) return;

    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % slides.length);
    }, 5000); // 5 seconds per slide

    return () => clearInterval(interval);
  }, [slides]);

  const currentSlide = slides[currentIndex] || {};

  return (
    <section
      className="newhero-section"
      style={{ backgroundImage: `url(${currentSlide.backgroundImg || ''})` }}
    >
      <div className="overlay">
        <div className="body-cover">
          <div className="hero-content">
            {loading ? (
              <p className="loading">Loading...</p>
            ) : error ? (
              <p className="error">{error}</p>
            ) : (
              <>
                <h1 className="hero-title">{currentSlide.heading}</h1>
                <p className="hero-subtext">{currentSlide.text}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
