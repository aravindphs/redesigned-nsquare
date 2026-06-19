import { FaInstagram, FaFacebook, FaYoutube, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import Logo from './Logo';

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Services', href: '#services' },
  { label: 'Calculator', href: '#calculator' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

const services = [
  'Residential Solar (1-10 kW)',
  'Commercial Solar (10-100 kW)',
  'Industrial Solar (100 kW+)',
  'Net Metering Assistance',
  'PM Surya Ghar Subsidy Help',
  'Annual Maintenance (AMC)',
];

const socials = [
  { icon: FaInstagram, href: '#', label: 'Instagram' },
  { icon: FaFacebook, href: '#', label: 'Facebook' },
  { icon: FaYoutube, href: '#', label: 'YouTube' },
  { icon: FaLinkedin, href: '#', label: 'LinkedIn' },
];

export default function Footer() {
  const handleNavClick = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer style={{ backgroundColor: '#0B1A12' }} className="text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Logo size="md" />
            <p className="mt-4 text-gray-400 text-sm leading-relaxed">
              Tamil Nadu's trusted solar EPC company. Empowering homes and businesses with clean, affordable solar energy since 2018.
            </p>
            <div className="flex gap-3 mt-5">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#16A34A] transition-colors"
                >
                  <Icon className="text-white text-sm" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                    className="text-gray-400 text-sm hover:text-[#16A34A] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s} className="text-gray-400 text-sm">{s}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <FaPhone className="text-[#16A34A] mt-0.5 flex-shrink-0" />
                <a href="tel:+918838098525" className="text-gray-400 text-sm hover:text-white transition-colors">
                  +91 88380 98525
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FaEnvelope className="text-[#16A34A] mt-0.5 flex-shrink-0" />
                <a href="mailto:nsquareenergies@gmail.com" className="text-gray-400 text-sm hover:text-white transition-colors">
                  nsquareenergies@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-[#16A34A] mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">Coimbatore, Tamil Nadu</span>
              </li>
              <li className="text-gray-400 text-sm">
                Mon–Sat: 9 AM – 6 PM
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-xs">© 2025 N Square Energies. All rights reserved.</p>
          <p className="text-gray-600 text-xs text-center md:text-right">
            PM Surya Ghar Yojana details are subject to change. Verify with MNRE before applying.
          </p>
        </div>
      </div>
    </footer>
  );
}
