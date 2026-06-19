import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';

const icons = ['🏛️', '✅', '🔧', '⚡', '📅', '💰', '🛡️', '🌿'];

export default function WhyChooseUs() {
  const { t } = useLanguage();
  const reasons = t('whyUs.items');

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
            {t('whyUs.badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">{t('whyUs.heading')}</h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">{t('whyUs.sub')}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {Array.isArray(reasons) && reasons.map((reason, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
              className="bg-white rounded-2xl p-5 shadow-sm border border-green-100 transition-all"
            >
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-2xl mb-4" aria-hidden="true">
                {icons[i]}
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{reason.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{reason.desc}</p>
            </motion.div>
          ))}
        </div>

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
            {t('whyUs.cta')}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
