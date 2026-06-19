import { FaInstagram, FaFacebook, FaYoutube, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import Logo from './Logo';
import { useLanguage } from '../../contexts/LanguageContext';

const footerLinks = ['#home', '#how-it-works', '#services', '#calculator', '#portfolio', '#faq', '#contact'];
const socials = [
  { icon: FaInstagram, href: '#', label: 'Instagram' },
  { icon: FaFacebook,  href: '#', label: 'Facebook' },
  { icon: FaYoutube,   href: '#', label: 'YouTube' },
  { icon: FaLinkedin,  href: '#', label: 'LinkedIn' },
];

export default function Footer() {
  const { t } = useLanguage();
  const handleNavClick = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const links = t('footer.links');
  const serviceList = t('footer.serviceList');

  return (
    <footer style={{ backgroundColor: '#0B1A12' }} className="text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Logo size="md" />
            <p className="mt-4 text-gray-400 text-sm leading-relaxed">{t('footer.tagline')}</p>
            <div className="flex gap-3 mt-5">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#16A34A] transition-colors"
                >
                  <Icon className="text-white text-sm" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2">
              {Array.isArray(links) && links.map((label, i) => (
                <li key={i}>
                  <a
                    href={footerLinks[i]}
                    onClick={(e) => { e.preventDefault(); handleNavClick(footerLinks[i]); }}
                    className="text-gray-400 text-sm hover:text-[#16A34A] transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('footer.ourServices')}</h4>
            <ul className="space-y-2">
              {Array.isArray(serviceList) && serviceList.map((s, i) => (
                <li key={i} className="text-gray-400 text-sm">{s}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('footer.contactUs')}</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <FaPhone className="text-[#16A34A] mt-0.5 flex-shrink-0" aria-hidden="true" />
                <a href="tel:+918838098525" className="text-gray-400 text-sm hover:text-white transition-colors">
                  +91 88380 98525
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FaEnvelope className="text-[#16A34A] mt-0.5 flex-shrink-0" aria-hidden="true" />
                <a href="mailto:nsquareenergies@gmail.com" className="text-gray-400 text-sm hover:text-white transition-colors">
                  nsquareenergies@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-[#16A34A] mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span className="text-gray-400 text-sm">Coimbatore, Tamil Nadu</span>
              </li>
              <li className="text-gray-400 text-sm">Mon–Sat: 9 AM – 6 PM</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-xs">{t('footer.copyright')}</p>
          <p className="text-gray-600 text-xs text-center md:text-right">{t('footer.disclaimer')}</p>
        </div>
      </div>
    </footer>
  );
}
