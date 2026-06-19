import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import { useLanguage } from '../../contexts/LanguageContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const navLinks = [
    { label: t('nav.home'),       href: '#home' },
    { label: t('nav.howItWorks'), href: '#how-it-works' },
    { label: t('nav.services'),   href: '#services' },
    { label: t('nav.calculator'), href: '#calculator' },
    { label: t('nav.portfolio'),  href: '#portfolio' },
    { label: t('nav.contact'),    href: '#contact' },
  ];

  const textColor = scrolled ? 'text-gray-700' : 'text-white';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#home" onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}>
            <Logo />
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className={`text-sm font-medium transition-colors hover:text-[#16A34A] ${textColor}`}
              >
                {link.label}
              </a>
            ))}

            {/* Language toggle */}
            <button
              onClick={() => setLang(lang === 'en' ? 'ta' : 'en')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${
                scrolled
                  ? 'border-gray-200 text-gray-600 hover:border-[#16A34A] hover:text-[#16A34A]'
                  : 'border-white/30 text-white hover:border-white hover:bg-white/10'
              }`}
              aria-label="Toggle language"
              title={lang === 'en' ? 'Switch to Tamil' : 'Switch to English'}
            >
              <span>{lang === 'en' ? '🇮🇳' : '🔤'}</span>
              <span>{lang === 'en' ? 'தமிழ்' : 'English'}</span>
            </button>

            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
              className="ml-2 px-4 py-2 bg-[#16A34A] text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition-colors"
            >
              {t('nav.getQuote')}
            </a>
          </nav>

          {/* Mobile: language toggle + hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setLang(lang === 'en' ? 'ta' : 'en')}
              className={`text-xs font-semibold px-2 py-1 rounded border transition-colors ${
                scrolled ? 'border-gray-300 text-gray-600' : 'border-white/40 text-white'
              }`}
              aria-label="Toggle language"
            >
              {lang === 'en' ? 'தமிழ்' : 'EN'}
            </button>
            <button
              className="p-2 rounded-md"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <div className="w-6 flex flex-col gap-1.5">
                <span className={`block h-0.5 transition-all ${scrolled ? 'bg-gray-800' : 'bg-white'}`} style={{ width: '100%' }} />
                <span className={`block h-0.5 transition-all ${scrolled ? 'bg-gray-800' : 'bg-white'}`} style={{ width: '75%' }} />
                <span className={`block h-0.5 transition-all ${scrolled ? 'bg-gray-800' : 'bg-white'}`} style={{ width: '100%' }} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-y-0 right-0 w-72 bg-white shadow-2xl z-50 flex flex-col p-6"
          >
            <div className="flex justify-between items-center mb-8">
              <Logo size="sm" />
              <button
                onClick={() => setMobileOpen(false)}
                className="text-gray-500 hover:text-gray-800 text-2xl font-bold"
                aria-label="Close menu"
              >
                ×
              </button>
            </div>
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className="text-gray-700 font-medium text-base py-2 border-b border-gray-100 hover:text-[#16A34A] transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
                className="mt-4 px-4 py-3 bg-[#16A34A] text-white font-semibold rounded-lg text-center hover:bg-green-700 transition-colors"
              >
                {t('nav.getQuote')}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile backdrop */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>
    </header>
  );
}
