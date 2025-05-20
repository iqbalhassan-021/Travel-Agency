import React from 'react'
import Notification from '../Components/Notification'
import Navbar from '../Components/NavBar'
import TitleBar from '../Components/TitleBar'

import Footer from '../Components/Footer'
import AppointmentsComp from '../Components/AppointmentsComp'

const BookAppointmetsPage = () => {
  return (
    <div class="container" style={{backgroundColor: 'white'}}>

        <Navbar backgroundColor='black'/>
        <div class="container">

            <div class="about-section">
                <TitleBar title="Appoitment"/>
            </div>

            <div class="about-text" style={{padding:'0px'}}>
              <AppointmentsComp/>
            </div>
        </div>
        <Footer marginTop='0%'/>
    </div>
  )
}

export default BookAppointmetsPage