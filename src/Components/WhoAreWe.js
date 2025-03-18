import React from 'react';

const WhoAreWe = () => {
    return (
        <div className="container" style={{ backgroundColor: "#800000" }}>
            <div className="body-cover">
                <div className="we">
                    {/* Image Section */}
                    <img 
                        src="assets/images/map.jpg" 
                        alt="image-here" 
                        className="we-img" 
                    />
                    
                    {/* Text Section */}
                    <div className="we-text">
                        <h2>Who we are?</h2>
                        <p>
                            Excellent Stars Travel Agency, where your journey begins with us and unfolds into unforgettable memories! As your trusted travel partner, we pride ourselves on creating personalized travel experiences that cater to your unique tastes and needs.
                        </p>
                        <br />
                        
                        {/* Button */}
                        <a 
                            href="#" 
                            className="no-decoration primary-button" 
                            style={{ width: "auto" }}
                        >
                            Book An Appointment
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhoAreWe;
