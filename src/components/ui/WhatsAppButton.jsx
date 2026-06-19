import { FaWhatsapp, FaPhone } from 'react-icons/fa';

export default function WhatsAppButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
      {/* Call button */}
      <div className="group relative">
        <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 px-2.5 py-1 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Call us
        </div>
        <a
          href="tel:+918838098525"
          className="flex items-center justify-center w-12 h-12 rounded-full bg-[#16A34A] shadow-lg hover:bg-green-700 transition-colors"
          aria-label="Call N Square Energies"
        >
          <FaPhone className="text-white text-xl" />
        </a>
      </div>

      {/* WhatsApp button with ripple */}
      <div className="group relative">
        <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 px-2.5 py-1 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Chat with us
        </div>

        {/* Ripple rings */}
        <div className="absolute inset-0 rounded-full bg-[#25D366]/40 ripple-ring" />
        <div className="absolute inset-0 rounded-full bg-[#25D366]/30 ripple-ring-delay" />

        <a
          href="https://wa.me/918838098525?text=Hi%2C%20I%27m%20interested%20in%20solar%20installation"
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] shadow-lg hover:bg-[#20c35d] transition-colors"
          aria-label="Chat on WhatsApp"
          onClick={() => window.trackEvent?.('contact', { method: 'whatsapp' })}
        >
          <FaWhatsapp className="text-white text-3xl" />
        </a>
      </div>
    </div>
  );
}
