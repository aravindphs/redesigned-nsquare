import { useRef, lazy, Suspense } from 'react'
import Navbar from './components/ui/Navbar'
import WhatsAppButton from './components/ui/WhatsAppButton'
import PopupForm from './components/ui/PopupForm'
import Footer from './components/ui/Footer'
import Hero from './components/sections/Hero'
import { usePopupTrigger } from './hooks/usePopupTrigger'
import { useExitIntent } from './hooks/useExitIntent'
import { LanguageProvider } from './contexts/LanguageContext'

// Lazy-load all below-fold sections to reduce initial bundle
const HowSolarWorks  = lazy(() => import('./components/sections/HowSolarWorks'))
const Services       = lazy(() => import('./components/sections/Services'))
const Calculator     = lazy(() => import('./components/sections/Calculator'))
const WhyChooseUs    = lazy(() => import('./components/sections/WhyChooseUs'))
const Process        = lazy(() => import('./components/sections/Process'))
const Portfolio      = lazy(() => import('./components/sections/Portfolio'))
const Testimonials   = lazy(() => import('./components/sections/Testimonials'))
const Certifications = lazy(() => import('./components/sections/Certifications'))
const FAQ            = lazy(() => import('./components/sections/FAQ'))
const FinalCTA       = lazy(() => import('./components/sections/FinalCTA'))
const Contact        = lazy(() => import('./components/sections/Contact'))

function SectionFallback() {
  return <div className="py-20 flex justify-center"><div className="w-8 h-8 border-4 border-[#16A34A] border-t-transparent rounded-full animate-spin" /></div>
}

function App() {
  const howSolarRef = useRef(null)
  const [showPopup, closePopup]       = usePopupTrigger(howSolarRef)
  const [showExitPopup, closeExitPopup] = useExitIntent()

  return (
    <LanguageProvider>
      <div style={{ fontFamily: "'Poppins', sans-serif" }}>
        <Navbar />
        <WhatsAppButton />
        {showPopup     && <PopupForm onClose={closePopup} />}
        {showExitPopup && <PopupForm onClose={closeExitPopup} exitIntent />}
        <main>
          <section id="home"><Hero /></section>
          <Suspense fallback={<SectionFallback />}>
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
          </Suspense>
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  )
}

export default App
