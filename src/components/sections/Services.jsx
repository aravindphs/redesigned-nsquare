import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';

const serviceColors = ['#16A34A', '#0284C7', '#7C3AED'];
const serviceIcons = ['🏠', '🏢', '🏭'];
const badgeColors = [
  'bg-green-100 text-[#16A34A]',
  'bg-blue-100 text-blue-700',
  'bg-purple-100 text-purple-700',
];

export default function Services() {
  const { t } = useLanguage();
  const services = t('services.items');

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
            {t('services.badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">{t('services.heading')}</h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">{t('services.sub')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {Array.isArray(services) && services.map((svc, i) => {
            const color = serviceColors[i];
            return (
              <motion.div
                key={i}
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
                    style={{ backgroundColor: color + '18' }}
                    aria-hidden="true"
                  >
                    {serviceIcons[i]}
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${badgeColors[i]}`}>
                    {svc.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900">{svc.title}</h3>
                <p className="text-sm font-medium mt-0.5" style={{ color }}>{svc.range}</p>
                <p className="text-gray-500 text-sm mt-3 mb-5 leading-relaxed">{svc.description}</p>

                <ul className="space-y-2 mt-auto" aria-label={`${svc.title} features`}>
                  {Array.isArray(svc.features) && svc.features.map((f, fi) => (
                    <li key={fi} className="flex items-center gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 20 20" fill={color} aria-hidden="true">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="mt-6 w-full py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: color }}
                >
                  {t('services.getQuote')}
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
