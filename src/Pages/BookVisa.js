import React from 'react'
import Notification from '../Components/Notification'
import Navbar from '../Components/NavBar'
import TitleBar from '../Components/TitleBar'

import Footer from '../Components/Footer'
import BookVisaForm from '../Components/BookVisaForm'

const BookVisaPage = () => {
  return (
    <div class="container" style={{backgroundColor: 'white'}}>

        <Navbar backgroundColor='black'/>
        <div class="container">

            <div class="about-section">
                <TitleBar title="Book a Visa"/>
            </div>

            <div class="about-text" style={{padding:'0px'}}>
              <BookVisaForm/>
            </div>
        </div>
        <Footer marginTop='0%'/>
    </div>
  )
}

export default BookVisaPage