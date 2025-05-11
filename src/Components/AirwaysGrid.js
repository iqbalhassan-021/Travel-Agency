import React from 'react';


const AirwaysGrid = () => {
    const airways = [
        { src: "assets/images/679_saudi_airlines.jpg", alt: "Saudi Airlines Logo" },
        { src: "assets/images/Airsial-logo-1.png", alt: "Airsial Logo" },
        { src: "assets/images/Qatar-Airways-Logo.webp", alt: "Qatar Airways Logo" },
        { src: "assets/images/airarabia.png", alt: "Air Arabia Logo" },
        { src: "assets/images/pia.png", alt: "PIA Logo" },
        { src: "assets/images/emirates.png", alt: "emirates Logo" },
        { src: "assets/images/ithad.png", alt: "ithad Logo" },
        { src: "assets/images/salam.jpg", alt: "salam Logo" },
    ];

    // Duplicate the list to create infinite effect
    const duplicatedAirways = [...airways, ...airways];

    return (
        <div className="slider-wrapper">
            <div className="slider-track">
                {duplicatedAirways.map((airway, index) => (
                    <div className="slider-cards" key={index}>
                        <img src={airway.src} alt={airway.alt} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AirwaysGrid;
