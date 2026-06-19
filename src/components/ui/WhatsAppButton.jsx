import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsAppButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50 group">
      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Chat with us
      </div>

      {/* Ripple rings */}
      <div
        className="absolute inset-0 rounded-full bg-[#25D366]/40 ripple-ring"
        style={{ transform: 'scale(1)' }}
      />
      <div
        className="absolute inset-0 rounded-full bg-[#25D366]/30 ripple-ring-delay"
        style={{ transform: 'scale(1)' }}
      />

      {/* Button */}
      <a
        href="https://wa.me/918838098525?text=Hi%2C%20I%27m%20interested%20in%20solar%20installation"
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] shadow-lg hover:bg-[#20c35d] transition-colors"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp className="text-white text-3xl" />
      </a>
    </div>
  );
}
