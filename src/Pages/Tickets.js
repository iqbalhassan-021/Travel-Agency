import React from 'react'
import Notification from '../Components/Notification'
import Navbar from '../Components/NavBar'
import TitleBar from '../Components/TitleBar'

import Footer from '../Components/Footer'
import Tickets from '../Components/TicketsComp'



const TicketsPage = () => {
  return (
    <div class="container" style={{backgroundColor: 'white'}}>

        <Navbar />
        <div class="container">

            <div class="about-section">
                <TitleBar title="Tickets"/>
            </div>

            <div class="about-text" style={{padding:'20px'}}>
               <Tickets/>
            </div>
        </div>
        <Footer marginTop='0%'/>
    </div>
  )
}

export default TicketsPage