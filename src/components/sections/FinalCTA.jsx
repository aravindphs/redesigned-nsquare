import { motion } from 'framer-motion';
import { useCountdown } from '../../hooks/useCountdown';

const SUBSIDY_DEADLINE = '2027-03-31T23:59:59+05:30';

function MiniTimeBox({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-12 h-12 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center">
        <span className="text-xl font-bold text-white tabular-nums">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="text-xs text-white/50 mt-1 uppercase tracking-wider">{label}</span>
    </div>
  );
}

export default function FinalCTA() {
  const { days, hours, minutes, seconds } = useCountdown(SUBSIDY_DEADLINE);

  return (
    <section
      className="py-20 relative overflow-hidden"
      style={{ backgroundColor: '#0B1A12' }}
    >
      {/* Decorative gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(22,163,74,0.12) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#DC2626]/20 border border-[#DC2626]/40 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-[#DC2626] animate-pulse" />
            <span className="text-red-400 text-sm font-medium">Limited Time — Subsidy Window Closing</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
            Don't Miss the
            <span style={{ color: '#16A34A' }}> Subsidy Window</span>
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Secure your ₹78,000 PM Surya Ghar subsidy before March 31, 2027. Start with a free site visit today.
          </p>

          {/* Compact countdown */}
          <div className="mb-8">
            <p className="text-white/50 text-xs uppercase tracking-widest mb-3">Time Remaining</p>
            <div className="flex items-center justify-center gap-2 sm:gap-3">
              <MiniTimeBox value={days} label="Days" />
              <span className="text-white/30 text-lg font-bold mb-4">:</span>
              <MiniTimeBox value={hours} label="Hrs" />
              <span className="text-white/30 text-lg font-bold mb-4">:</span>
              <MiniTimeBox value={minutes} label="Min" />
              <span className="text-white/30 text-lg font-bold mb-4">:</span>
              <MiniTimeBox value={seconds} label="Sec" />
            </div>
          </div>

          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-10 py-5 bg-[#16A34A] text-white font-bold text-xl rounded-2xl hover:bg-green-600 transition-all transform hover:scale-105 shadow-2xl shadow-green-900/30"
          >
            Book Free Site Visit →
          </button>

          <p className="text-gray-500 text-sm mt-4">
            No commitment. Our engineer visits, assesses, and gives you a detailed quote — all free.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
