import React from 'react'
import Notification from '../Components/Notification'
import Navbar from '../Components/NavBar'
import TitleBar from '../Components/TitleBar'
import ContactForm from '../Components/ContactForm'
import Footer from '../Components/Footer'

const Contact = () => {
  return (
    <div class="container" style={{backgroundColor: 'white'}}>
        <Notification backgroundColor='white' Color='black'/>
        <Navbar backgroundColor='black'/>
        <div class="container">

            <div class="about-section">
                <TitleBar title="Contact Us"/>
            </div>

            <div class="about-text" style={{padding:'0%'}}>
                <ContactForm/>
            </div>
        </div>
        <Footer marginTop='0%'/>
    </div>
  )
}

export default Contact