import React from 'react'
import Notification from '../Components/Notification'
import NavBar from '../Components/NavBar'
import Hero from '../Components/Hero'
import SearchTickets from '../Components/SearchTickets'
import AirwaysGrid from '../Components/AirwaysGrid'
import Hajjintro from '../Components/HajjIntro'
import AvailablePackages from '../Components/AvailablePackages'
import WhoAreWe from '../Components/WhoAreWe'
import WhyUs from '../Components/WhyUs'
import ContactForm from '../Components/ContactForm'
import QuickSection from '../Components/QuickSection'
import Footer from '../Components/Footer'
import VisaSlider from '../Components/VisaSlider'
import AppointmentsSlider from '../Components/AppoitmentsSlider'
import Tours from '../Components/Tour'


const Home = () => {
  return (
    <div class="container" style={{backgroundColor: 'white'}}>
            <Notification backgroundColor='black' Color='white'/>
      <div className="merge" style={{ backgroundImage: 'url(/Assets/images/background.jpg)' }}>
        <NavBar/>
        <Hero/>
      </div>
      <SearchTickets/>
      <AirwaysGrid/>
      <Hajjintro/>
      <VisaSlider/>
      <AppointmentsSlider/>
      <Tours/>
     {/* <AvailablePackages/> */}
     <WhoAreWe/>
     <WhyUs/>
     <ContactForm/>
     <QuickSection/>
     <Footer marginTop='20%'/>
     
    </div>
  )
}

export default Home
