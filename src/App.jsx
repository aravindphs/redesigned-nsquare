import { useRef } from 'react'
import Navbar from './components/ui/Navbar'
import WhatsAppButton from './components/ui/WhatsAppButton'
import PopupForm from './components/ui/PopupForm'
import Footer from './components/ui/Footer'
import Hero from './components/sections/Hero'
import HowSolarWorks from './components/sections/HowSolarWorks'
import Services from './components/sections/Services'
import Calculator from './components/sections/Calculator'
import WhyChooseUs from './components/sections/WhyChooseUs'
import Process from './components/sections/Process'
import Portfolio from './components/sections/Portfolio'
import Testimonials from './components/sections/Testimonials'
import Certifications from './components/sections/Certifications'
import FAQ from './components/sections/FAQ'
import FinalCTA from './components/sections/FinalCTA'
import Contact from './components/sections/Contact'
import { usePopupTrigger } from './hooks/usePopupTrigger'

function App() {
  const howSolarRef = useRef(null)
  const [showPopup, closePopup] = usePopupTrigger(howSolarRef)

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif" }}>
      <Navbar />
      <WhatsAppButton />
      {showPopup && <PopupForm onClose={closePopup} />}
      <main>
        <section id="home"><Hero /></section>
        <section id="how-it-works" ref={howSolarRef}><HowSolarWorks /></section>
        <section id="services"><Services /></section>
        <section id="calculator"><Calculator /></section>
        <section id="why-us"><WhyChooseUs /></section>
        <section id="process"><Process /></section>
        <section id="portfolio"><Portfolio /></section>
        <section id="testimonials"><Testimonials /></section>
        <Certifications />
        <section id="faq"><FAQ /></section>
        <FinalCTA />
        <section id="contact"><Contact /></section>
      </main>
      <Footer />
    </div>
  )
}

export default App
