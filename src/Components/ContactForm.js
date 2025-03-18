import React, { useState } from 'react';

const ContactForm = () => {
    

    return (
        <div className="container" style={{ backgroundColor: '#800000' }}>
            <div className="body-cover">
                <div className="contact-us">
                    <form className="contact-form" action="https://api.web3forms.com/submit" method="POST">
                    <input type="hidden" name="access_key" value="0daf682c-49f2-4919-bdfb-26e56f9ffe52"></input>
                        <div className="form-tab">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Your Name"
                             
                            />
                        </div>
                        <div className="form-tab">
                            <label htmlFor="phone">Phone</label>
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                placeholder="Phone Number"
                           
                   
                            />
                        </div>
                        <div className="form-tab">
                            <label htmlFor="subject">Subject</label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                placeholder="Reason to contact"
                             
                            />
                        </div>
                        <div className="form-tab">
                            <label htmlFor="message">Message</label>
                            <textarea
                                name="message"
                                id="message"
                                rows="10"
                                placeholder="Message"
                            
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
