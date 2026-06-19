import { motion } from 'framer-motion';

const services = [
  {
    title: 'Residential Solar',
    range: '1–10 kW',
    icon: '🏠',
    badge: 'Subsidy Eligible',
    badgeColor: 'bg-green-100 text-[#16A34A]',
    color: '#16A34A',
    description: 'Ideal for homes and apartments. Get up to ₹78,000 PM Surya Ghar subsidy. Reduce your electricity bill to near zero.',
    features: [
      '₹78,000 central subsidy available',
      'Net billing with TANGEDCO',
      'ALMM-compliant panels',
      '25-year performance warranty',
      'Mobile monitoring app',
      'Complete paperwork assistance',
    ],
  },
  {
    title: 'Commercial Solar',
    range: '10–100 kW',
    icon: '🏢',
    badge: 'Accelerated Depreciation',
    badgeColor: 'bg-blue-100 text-blue-700',
    color: '#0284C7',
    description: 'For offices, retail, schools and institutions. Benefit from accelerated depreciation under Income Tax Act.',
    features: [
      'Up to 40% accelerated depreciation (Y1)',
      'Net billing for excess power',
      'Custom system design',
      'TANGEDCO interconnection',
      'Commercial-grade inverters',
      'Priority AMC support',
    ],
  },
  {
    title: 'Industrial Solar',
    range: '100 kW+',
    icon: '🏭',
    badge: 'Open Access',
    badgeColor: 'bg-purple-100 text-purple-700',
    color: '#7C3AED',
    description: 'For factories, textile mills and large industries. Explore open access and captive power arrangements.',
    features: [
      'Open access eligibility (>1 MW)',
      'Captive power arrangements',
      'Ground mount & rooftop options',
      'Power Purchase Agreement support',
      'Load analysis & optimization',
      'Dedicated project manager',
    ],
  },
];

export default function Services() {
  return (
    <section className="py-20 bg-gray-50" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-3 py-1 bg-green-50 text-[#16A34A] text-sm font-semibold rounded-full mb-3">
            Our Services
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Solar Solutions for Every Scale
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Whether you're a homeowner, business, or factory — we have the right solar solution for you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((svc, i) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ scale: 1.03, boxShadow: '0 20px 40px rgba(0,0,0,0.12)' }}
              className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 flex flex-col"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
                  style={{ backgroundColor: svc.color + '18' }}
                >
                  {svc.icon}
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${svc.badgeColor}`}>
                  {svc.badge}
                </span>
              </div>

              <h3 className="text-xl font-bold text-gray-900">{svc.title}</h3>
              <p className="text-sm font-medium mt-0.5" style={{ color: svc.color }}>{svc.range}</p>
              <p className="text-gray-500 text-sm mt-3 mb-5 leading-relaxed">{svc.description}</p>

              <ul className="space-y-2 mt-auto">
                {svc.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                    <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 20 20" fill={svc.color}>
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="mt-6 w-full py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90"
                style={{ backgroundColor: svc.color }}
              >
                Get Quote
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
