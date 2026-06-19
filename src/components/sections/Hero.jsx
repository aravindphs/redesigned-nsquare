import { motion } from 'framer-motion';
import { useCountdown } from '../../hooks/useCountdown';

const SUBSIDY_DEADLINE = '2027-03-31T23:59:59+05:30';

function TimeBox({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center">
        <span className="text-2xl sm:text-3xl font-bold text-white tabular-nums">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="text-xs text-white/60 mt-1 uppercase tracking-wider">{label}</span>
    </div>
  );
}

export default function Hero() {
  const { days, hours, minutes, seconds } = useCountdown(SUBSIDY_DEADLINE);

  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0B1A12 0%, #0f2d1a 50%, rgba(22,163,74,0.15) 100%)' }}
    >
      {/* Animated sun rays */}
      <div
        className="sun-ray-anim absolute inset-0 pointer-events-none"
        style={{ transformOrigin: 'center center' }}
      >
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 origin-left"
            style={{
              width: '60vmax',
              height: '1px',
              background: 'linear-gradient(to right, transparent, rgba(22,163,74,0.08), transparent)',
              transform: `rotate(${i * 30}deg)`,
            }}
          />
        ))}
      </div>

      {/* Green glow orb */}
      <div
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(22,163,74,0.15) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#16A34A]/20 border border-[#16A34A]/40 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
            <span className="text-green-400 text-sm font-medium">MNRE Empanelled Solar EPC • Tamil Nadu</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
            Power Your Future
            <br />
            <span style={{ color: '#16A34A' }}>with the Sun</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Tamil Nadu's trusted solar EPC — get up to{' '}
            <span className="text-white font-semibold">₹78,000 in subsidies</span>{' '}
            before the window closes
          </p>

          {/* Countdown */}
          <div className="mb-8">
            <p className="text-white/70 text-sm font-medium uppercase tracking-widest mb-4">
              PM Surya Ghar Subsidy Window Closes In
            </p>
            <div className="flex items-center justify-center gap-3 sm:gap-4">
              <TimeBox value={days} label="Days" />
              <span className="text-white/50 text-2xl font-bold mb-4">:</span>
              <TimeBox value={hours} label="Hours" />
              <span className="text-white/50 text-2xl font-bold mb-4">:</span>
              <TimeBox value={minutes} label="Mins" />
              <span className="text-white/50 text-2xl font-bold mb-4">:</span>
              <TimeBox value={seconds} label="Secs" />
            </div>
            <p className="text-white/40 text-xs mt-3">
              *Based on PM Surya Ghar Yojana scheduled end date. Subject to change by MNRE.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button
              onClick={() => scrollTo('#contact')}
              className="px-8 py-4 bg-[#16A34A] text-white font-bold text-lg rounded-xl hover:bg-green-700 transition-all transform hover:scale-105 shadow-lg shadow-green-900/30"
            >
              Get Free Quote →
            </button>
            <button
              onClick={() => scrollTo('#calculator')}
              className="px-8 py-4 bg-white/10 border border-white/30 text-white font-bold text-lg rounded-xl hover:bg-white/20 transition-all backdrop-blur-sm"
            >
              Calculate Your Savings
            </button>
          </div>

          {/* Trust strip */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
            {[
              { value: '500+', label: 'Installations' },
              { value: '15 MW+', label: 'Capacity' },
              { value: 'MNRE', label: 'Empanelled' },
              { value: '25-Year', label: 'Warranty' },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center">
                <span className="text-2xl font-bold text-white">{value}</span>
                <span className="text-xs text-white/50 uppercase tracking-wider">{label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}
