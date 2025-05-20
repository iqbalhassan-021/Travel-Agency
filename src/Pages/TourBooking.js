import React from 'react'
import Notification from '../Components/Notification'
import Navbar from '../Components/NavBar'
import TitleBar from '../Components/TitleBar'

import Footer from '../Components/Footer'
import BookTour from '../Components/BookTour'


const TourBooking = () => {
  return (
    <div class="container" style={{backgroundColor: 'white'}}>
  
        <Navbar />
        <div class="container">

            <div class="about-section">
                <TitleBar title="Book Tour"/>
            </div>

            <div class="about-text" style={{padding:'0px'}}>
              <BookTour/>
            </div>
        </div>
        <Footer marginTop='0%'/>
    </div>
  )
}

export default TourBooking