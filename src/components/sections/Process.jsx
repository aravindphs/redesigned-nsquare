import { motion, useScroll } from 'framer-motion';
import { useRef } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const stepIcons = ['🔍', '📐', '📋', '⚙️', '✅', '🚀'];
const stepNums  = ['01', '02', '03', '04', '05', '06'];

export default function Process() {
  const containerRef = useRef(null);
  const { t } = useLanguage();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 20%'],
  });

  const steps = t('process.steps');

  return (
    <section className="py-20 bg-white" id="process" ref={containerRef}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block px-3 py-1 bg-green-50 text-[#16A34A] text-sm font-semibold rounded-full mb-3">
            {t('process.badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">{t('process.heading')}</h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">{t('process.sub')}</p>
        </motion.div>

        <div className="relative">
          {/* Vertical progress line — desktop (center) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-100 -translate-x-1/2">
            <motion.div
              className="w-full origin-top"
              style={{ backgroundColor: '#16A34A', scaleY: scrollYProgress, transformOrigin: 'top', height: '100%' }}
            />
          </div>

          {/* Vertical progress line — mobile (left rail) */}
          <div className="md:hidden absolute left-5 top-2 bottom-2 w-0.5 bg-gray-100 -translate-x-1/2">
            <motion.div
              className="w-full origin-top"
              style={{ backgroundColor: '#16A34A', scaleY: scrollYProgress, transformOrigin: 'top', height: '100%' }}
            />
          </div>

          {/* DESKTOP timeline */}
          <div className="hidden md:block">
            {Array.isArray(steps) && steps.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: 0.1 }}
                  className={`flex items-center gap-8 mb-10 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`w-[calc(50%-2.5rem)] ${isLeft ? 'text-right' : 'text-left'}`}>
                    <span className="text-xs font-bold text-[#16A34A] uppercase tracking-widest">{step.timeline}</span>
                    <h3 className="text-lg font-bold text-gray-900 mt-1">
                      <span className="text-[#16A34A] mr-1">{stepNums[i]}.</span>
                      {step.title}
                    </h3>
                    <p className="text-gray-500 text-sm mt-1.5 leading-relaxed">{step.desc}</p>
                  </div>
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#16A34A] border-4 border-white shadow-md flex items-center justify-center text-lg z-10" aria-hidden="true">
                    {stepIcons[i]}
                  </div>
                  <div className="w-[calc(50%-2.5rem)]" />
                </motion.div>
              );
            })}
          </div>

          {/* MOBILE timeline */}
          <div className="md:hidden space-y-6">
            {Array.isArray(steps) && steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="relative flex items-start gap-4"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#16A34A] border-4 border-white shadow-md flex items-center justify-center text-lg z-10" aria-hidden="true">
                  {stepIcons[i]}
                </div>
                <div className="flex-1 bg-white border border-gray-100 rounded-xl shadow-sm p-4">
                  <span className="text-xs font-bold text-[#16A34A] uppercase tracking-widest">{step.timeline}</span>
                  <h3 className="text-base font-bold text-gray-900 mt-0.5">
                    <span className="text-[#16A34A] mr-1">{stepNums[i]}.</span>
                    {step.title}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1.5 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
