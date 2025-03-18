import React, { useState } from 'react';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        subject: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add form submission logic here
        console.log('Form Submitted:', formData);
        alert('Thank you for contacting us!');
    };

    return (
        <div className="container" style={{ backgroundColor: '#800000' }}>
            <div className="body-cover">
                <div className="contact-us">
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-tab">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-tab">
                            <label htmlFor="phone">Phone</label>
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                placeholder="Phone Number"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-tab">
                            <label htmlFor="subject">Subject</label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                placeholder="Reason to contact"
                                value={formData.subject}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-tab">
                            <label htmlFor="message">Message</label>
                            <textarea
                                name="message"
                                id="message"
                                rows="10"
                                placeholder="Message"
                                value={formData.message}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-tab">
                            <button type="submit" className="primary-button rounded">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactForm;
