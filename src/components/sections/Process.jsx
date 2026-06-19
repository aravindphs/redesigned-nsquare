import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const steps = [
  {
    num: '01',
    title: 'Free Site Survey',
    timeline: '1–2 days',
    icon: '🔍',
    desc: 'Our engineers visit your property to assess roof condition, shade analysis, structural load, and electrical setup — completely free.',
  },
  {
    num: '02',
    title: 'Custom System Design',
    timeline: '3–5 days',
    icon: '📐',
    desc: 'We design a system optimized for your roof layout and energy needs, including panel placement simulation and shadow-loss calculation.',
  },
  {
    num: '03',
    title: 'Subsidy & Net Metering Paperwork',
    timeline: '2–4 weeks',
    icon: '📋',
    desc: 'We file your PM Surya Ghar subsidy application and TANGEDCO Net Billing registration. We track approval and keep you updated.',
  },
  {
    num: '04',
    title: 'Professional Installation',
    timeline: '1–3 days',
    icon: '⚙️',
    desc: 'Certified installers mount panels, connect inverter, run cabling and commission the system. Minimal disruption to your daily routine.',
  },
  {
    num: '05',
    title: 'Inspection & Net Meter',
    timeline: '1–2 weeks',
    icon: '✅',
    desc: 'TANGEDCO inspection and Net Meter installation. We coordinate all on-site visits and ensure seamless grid interconnection.',
  },
  {
    num: '06',
    title: 'Go Live & Monitoring',
    timeline: 'Day 1',
    icon: '🚀',
    desc: 'Your system goes live! Access real-time generation data via mobile app. Enjoy clean energy and reduced electricity bills.',
  },
];

export default function Process() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 20%'],
  });

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
            Our Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Your Solar Journey — Step by Step
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            From first call to first unit generated — here's exactly what happens.
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical progress line — desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-100 -translate-x-1/2">
            <motion.div
              className="w-full origin-top"
              style={{
                backgroundColor: '#16A34A',
                scaleY: scrollYProgress,
                transformOrigin: 'top',
                height: '100%',
              }}
            />
          </div>

          <div className="space-y-10 md:space-y-0">
            {steps.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: 0.1 }}
                  className={`md:flex items-center gap-8 md:mb-10 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Content */}
                  <div className={`md:w-[calc(50%-2.5rem)] ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
                    <div
                      className={`inline-flex items-center gap-2 mb-2 ${isLeft ? 'md:flex-row-reverse' : ''}`}
                    >
                      <span className="text-xs font-bold text-[#16A34A] uppercase tracking-widest">{step.timeline}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">
                      <span className="text-[#16A34A] mr-1">{step.num}.</span>
                      {step.title}
                    </h3>
                    <p className="text-gray-500 text-sm mt-1.5 leading-relaxed">{step.desc}</p>
                  </div>

                  {/* Center circle */}
                  <div className="hidden md:flex flex-shrink-0 w-10 h-10 rounded-full bg-[#16A34A] border-4 border-white shadow-md items-center justify-center text-lg z-10">
                    {step.icon}
                  </div>

                  {/* Spacer on alternate side */}
                  <div className="hidden md:block md:w-[calc(50%-2.5rem)]" />

                  {/* Mobile layout */}
                  <div className="md:hidden flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#16A34A] flex items-center justify-center text-lg">
                      {step.icon}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#16A34A] uppercase tracking-widest">{step.timeline}</span>
                      <h3 className="text-base font-bold text-gray-900 mt-0.5">
                        {step.num}. {step.title}
                      </h3>
                      <p className="text-gray-500 text-sm mt-1 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
