import { motion } from 'framer-motion';

// TODO: Replace with actual certification numbers before launch
const certifications = [
  {
    icon: '🏛️',
    title: 'MNRE Empanelled',
    subtitle: 'Reg. No: TBD',
    color: '#16A34A',
    bg: '#f0fdf4',
  },
  {
    icon: '📋',
    title: 'ALMM Listed',
    subtitle: 'MNRE Approved Vendor',
    color: '#0284C7',
    bg: '#eff6ff',
  },
  {
    icon: '⚡',
    title: 'TANGEDCO Registered',
    subtitle: 'Net Billing Contractor',
    color: '#7C3AED',
    bg: '#faf5ff',
  },
  {
    icon: '🔌',
    title: 'Net Billing Compliant',
    subtitle: 'TNERC Regulations',
    color: '#D97706',
    bg: '#fffbeb',
  },
  {
    icon: '🏆',
    title: 'ISO 9001',
    subtitle: 'Quality Management',
    color: '#DC2626',
    bg: '#fef2f2',
  },
];

export default function Certifications() {
  return (
    <section className="py-14 bg-gray-50" id="certifications">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h3 className="text-xl font-bold text-gray-700">Certifications & Registrations</h3>
          <p className="text-gray-400 text-sm mt-1">Authorized, compliant, and trusted by regulatory bodies.</p>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 px-5 py-3 rounded-xl border shadow-sm transition-all cursor-default"
              style={{
                backgroundColor: cert.bg,
                borderColor: cert.color + '30',
              }}
            >
              <span className="text-2xl">{cert.icon}</span>
              <div>
                <p className="text-sm font-bold" style={{ color: cert.color }}>{cert.title}</p>
                <p className="text-xs text-gray-400">{cert.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-gray-300 text-xs mt-6">
          * Certification numbers will be updated before launch.
        </p>
      </div>
    </section>
  );
}
