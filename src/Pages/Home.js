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
import StatsCounter from '../Components/StatsCounter'
import TrendingVisas from '../Components/TrendingVisas'
import VideoHeroSection from '../Components/VideoHeroSection'
import ToursSection from '../Components/Tour'
import HajjUmrahSection from '../Components/HajjUmrahSection'


const Home = () => {
  return (
    <div class="container" style={{backgroundColor: 'white'}}>
      <Notification backgroundColor='white' Color='black'/>
      <NavBar backgroundColor='black'/>
      <Hero/>
      <AirwaysGrid/>
      <Hajjintro/>
     {/* <AvailablePackages/> */}
    <TrendingVisas/>
    <VideoHeroSection/>
     <WhyUs/>     
     <ToursSection/>
     <StatsCounter/>

     <ContactForm/>
     
     <Footer/>
     
    </div>
  )
}

export default Home
