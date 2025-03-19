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


    return (
        <div className="container">
            <div className="body-cover">
                <div className="airways grid-4x">
                    {airways.map((airway, index) => (
                        <div className="card center" key={index}>
                            <img src={airway.src} className="air-image" alt={airway.alt} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AirwaysGrid;
