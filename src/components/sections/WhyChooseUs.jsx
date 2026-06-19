import { motion } from 'framer-motion';

const reasons = [
  {
    icon: '🏛️',
    title: 'MNRE Empanelled',
    desc: 'Officially registered with Ministry of New & Renewable Energy. Eligible for all central subsidy schemes.',
  },
  {
    icon: '✅',
    title: 'ALMM-Compliant Panels',
    desc: 'We use only Approved List of Models and Manufacturers panels as mandated for subsidy eligibility.',
  },
  {
    icon: '🔧',
    title: 'End-to-End Service',
    desc: 'From free site survey to net metering connection — we handle everything so you don\'t have to.',
  },
  {
    icon: '⚡',
    title: 'TANGEDCO Experts',
    desc: 'Deep expertise in Tamil Nadu DISCOM paperwork, Net Billing registration, and regulatory approvals.',
  },
  {
    icon: '📅',
    title: '25-Year Panel Warranty',
    desc: 'Tier-1 panels with 25-year linear performance warranty and 10-year product warranty.',
  },
  {
    icon: '💰',
    title: 'Transparent Pricing',
    desc: 'No hidden costs. What we quote is what you pay — itemized bills for every component.',
  },
  {
    icon: '🛡️',
    title: 'After-Sales AMC',
    desc: 'Annual Maintenance Contracts available. Priority support and annual system health check.',
  },
  {
    icon: '🌿',
    title: 'Local Tamil Nadu Team',
    desc: 'On-the-ground team across Coimbatore, Salem, Erode, Tiruppur, and all of Tamil Nadu.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20" style={{ backgroundColor: '#F0FDF4' }} id="why-us">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-3 py-1 bg-[#16A34A]/10 text-[#16A34A] text-sm font-semibold rounded-full mb-3">
            Why N Square
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Why Choose N Square Energies?
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            8 reasons why Tamil Nadu homeowners and businesses trust us for their solar journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
              className="bg-white rounded-2xl p-5 shadow-sm border border-green-100 transition-all"
            >
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-2xl mb-4">
                {reason.icon}
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{reason.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{reason.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-[#16A34A] text-white font-bold text-lg rounded-xl hover:bg-green-700 transition-colors shadow-lg shadow-green-200"
          >
            Start Your Solar Journey →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
