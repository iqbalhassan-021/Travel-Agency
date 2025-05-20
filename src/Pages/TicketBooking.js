import React from 'react'
import Notification from '../Components/Notification'
import Navbar from '../Components/NavBar'
import TitleBar from '../Components/TitleBar'

import Footer from '../Components/Footer'
import BookTicketForm from '../Components/BookTicketForm'



const TicketsPage = () => {
  return (
    <div class="container" style={{backgroundColor: 'white'}}>

        <Navbar />
        <div class="container">

            <div class="about-section">
                <TitleBar title="Book Tickets"/>
            </div>

            <div class="about-text" style={{padding:'0px'}}>
               <BookTicketForm/>
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default TicketsPage