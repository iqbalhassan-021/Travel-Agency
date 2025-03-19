import React from 'react';

const HajjIntro = () => {
    const visaConsultancyServices = [
        { icon: "fa-solid fa-passport", label: "Visa Processing" },
        { icon: "fa-solid fa-headset", label: "Travel Consultation" },
        { icon: "fa-solid fa-file-contract", label: "Document Assistance" },
        { icon: "fa-solid fa-earth-americas", label: "Visa Regulations" },
        { icon: "fa-solid fa-clock", label: "24/7 Support" },
    ];

    return (
        <div className="container">
            <div className="body-cover">
                <div className="half-height">
                    {/* Image Section */}
                    <div className="image-section center">
                        <img src="/Assets/images/visa83.jpg" alt="background" />
                    </div>
                    
                    {/* Text Section */}
                    <div className="text-section ">
        
                        <h2>Expert Visa & Consultancy Services</h2>
                        <p>
                            We specialize in providing comprehensive visa and consultancy services 
                            for your Hajj & Umrah journey. Our experienced team ensures a smooth 
                            visa application process and offers expert guidance throughout your 
                            pilgrimage planning. From document preparation to visa regulations 
                            compliance, we handle every detail with care and precision. Our 
                            dedicated consultants are available to answer your questions and 
                            provide personalized support, making your travel preparations 
                            hassle-free and efficient.
                        </p>
                        
                        <br />
                        
                        {/* Services Grid */}
                        <div className="grid-2x">
                            {visaConsultancyServices.map((service, index) => (
                                <div className="temp" key={index}>
                                    <i className={service.icon}></i>
                                    <p>{service.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HajjIntro;