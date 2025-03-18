import React from 'react';

const WhyUs = () => {
    const reasons = [
        {
            icon: "fa-solid fa-taxi",
            title: "Personalized Service:",
            description: `
                We believe that every pilgrimage is a deeply personal journey, and our services are designed to reflect that.
                Unlike other agencies, we take the time to understand your unique needs and preferences, ensuring that your Hajj & Umrah experience
                is perfectly suited to you. Whether you require special accommodations, specific transportation preferences, or assistance with particular
                rituals, our team is here to cater to your every requirement. We offer a wide range of packages with flexibility in travel dates, duration, 
                and services, allowing you to choose the experience that best fits your spiritual and personal needs. Our attention to detail means you can focus entirely on your worship, while we handle the logistics.
            `,
        },
        {
            icon: "fa-solid fa-award",
            title: "Award-Winning Expertise:",
            description: `
                With years of experience and numerous industry awards to our name, we have earned our reputation as a leader in Hajj & Umrah travel.
                Our team is made up of travel professionals with deep knowledge of the pilgrimage process, and we are committed to upholding the highest
                standards of service. From handling visa applications to arranging transportation and accommodations in Mecca and Medina, we ensure everything is organized with precision and care. Our reputation for excellence has been built on the trust and satisfaction of countless pilgrims, and we continuously strive to innovate and improve our offerings to ensure you have the best experience possible. Choosing us means you are entrusting your spiritual journey to the experts.
            `,
        },
        {
            icon: "fa-solid fa-plane",
            title: "Seamless Travel Experience:",
            description: `
                We understand that the logistics of planning a Hajj or Umrah trip can be overwhelming, which is why we manage every aspect of your journey with ease and efficiency. 
                Our seamless travel experience includes arranging flights with reputable airlines, providing comfortable accommodations close to the holy sites, and ensuring reliable ground transportation throughout the trip.
                Our packages are designed to minimize stress and eliminate any travel-related concerns, allowing you to focus solely on your worship.
                We also offer special services such as 24/7 customer support, ensuring that any issues or questions you have are addressed promptly, making your pilgrimage as smooth and hassle-free as possible.
            `,
        },
        {
            icon: "fa-solid fa-check",
            title: "Commitment to Excellence:",
            description: `
                At our agency, we take pride in delivering exceptional service that goes beyond expectations. 
                From the moment you contact us to the completion of your pilgrimage, our commitment to excellence is evident in everything we do.
                We work closely with a network of trusted partners and service providers to ensure that every aspect of your trip meets the highest standards of quality and safety. 
                Our experienced guides and staff are always on hand to offer support, advice, and assistance throughout your journey. 
                Whether it's through ensuring that all your travel documents are in order, providing comfortable and convenient accommodation, or offering tailored spiritual guidance, we are dedicated to making your pilgrimage experience meaningful, fulfilling, and stress-free.
            `,
        },
    ];

    return (
        <div className="container">
            <p className="section-heading">Why Us</p>
            <div className="body-cover">
                <div className="reasons grid-2x">
                    {reasons.map((reason, index) => (
                        <div className="reason-card" key={index}>
                            <h3>
                                <i className={reason.icon}></i>
                                {reason.title}
                            </h3>
                            <p>{reason.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WhyUs;
