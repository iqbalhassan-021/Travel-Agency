import React from 'react';

const AirwaysGrid = () => {
    const airways = [
        { src: "assets/images/679_saudi_airlines.jpg", alt: "Saudi Airlines Logo" },
        { src: "assets/images/Airsial-logo-1.png", alt: "Airsial Logo" },
        { src: "assets/images/Qatar-Airways-Logo.webp", alt: "Qatar Airways Logo" },
        { src: "assets/images/airarabia.png", alt: "Air Arabia Logo" },
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
