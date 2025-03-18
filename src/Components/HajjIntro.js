import React from 'react';

const HajjIntro = () => {
    const services = [
        { icon: "fa-solid fa-mosque", label: "Ziarat" },
        { icon: "fa-solid fa-hotel", label: "Hotel" },
        { icon: "fa-solid fa-house-crack", label: "Insurance" },
        { icon: "fa-solid fa-bus", label: "Transport" },
        { icon: "fa-brands fa-cc-visa", label: "Umrah Visa" },
    ];

    return (
        <div className="container">
            <div className="body-cover">
                <div className="half-height">
                    {/* Image Section */}
                    <div className="image-section center">
                        <img src="/Assets/images/background.jpg" alt="background" />
                    </div>
                    
                    {/* Text Section */}
                    <div className="text-section center">
                        <img src="/Assets/images/bismillah.png" alt="bismillah" />
                        <h2>We are an award-winning Hajj & Umrah Agency</h2>
                        <p>
                            We are an award-winning Hajj & Umrah agency, dedicated to providing 
                            exceptional pilgrimage services with a focus on customer satisfaction 
                            and convenience. With years of experience in the travel industry, we 
                            have earned a reputation for excellence, helping countless pilgrims 
                            fulfill their spiritual journey with ease and comfort. Our team of 
                            experts is committed to delivering personalized services, ensuring 
                            that every aspect of the trip, from travel arrangements to 
                            accommodation, is seamless and memorable. We take pride in offering 
                            comprehensive packages that cater to the unique needs of each individual, 
                            making your Hajj and Umrah experience both meaningful and stress-free.
                        </p>
                        
                        <br />
                        
                        {/* Services Grid */}
                        <div className="grid-2x">
                            {services.map((service, index) => (
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
