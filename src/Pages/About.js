import React from 'react'
import Notification from '../Components/Notification'
import Navbar from '../Components/NavBar'
import TitleBar from '../Components/TitleBar'

import Footer from '../Components/Footer'
import AboutComp from '../Components/AboutComp'

const About = () => {
  return (
    <div class="container" style={{backgroundColor: 'white'}}>

        <Navbar />
        <div class="container">

            <div class="about-section">
                <TitleBar title="About Us"/>
            </div>

            <div class="about-text" style={{padding:'0%'}}>
               <AboutComp/>
            </div>
        </div>
        <Footer marginTop='0%'/>
    </div>
  )
}

export default About