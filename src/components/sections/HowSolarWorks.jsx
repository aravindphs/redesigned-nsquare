import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';

const stageEmojis = ['☀️', '🔆', '⚡', '📊', '🏠'];
const stageX = [60, 220, 380, 540, 700];

export default function HowSolarWorks() {
  const { t } = useLanguage();
  const stages = t('howSolar.stages');
  const cards = t('howSolar.cards');

  const lineCoords = [
    { x1: 95, y1: 100, x2: 185, y2: 100 },
    { x1: 255, y1: 100, x2: 345, y2: 100 },
    { x1: 415, y1: 100, x2: 505, y2: 100 },
    { x1: 575, y1: 100, x2: 665, y2: 100 },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-3 py-1 bg-green-50 text-[#16A34A] text-sm font-semibold rounded-full mb-3">
            {t('howSolar.badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">{t('howSolar.heading')}</h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">{t('howSolar.sub')}</p>
        </motion.div>

        {/* Desktop SVG diagram */}
        <div className="hidden md:block overflow-x-auto">
          <div className="min-w-[760px] max-w-3xl mx-auto">
            <svg width="760" height="200" viewBox="0 0 760 200" className="w-full" role="img" aria-label="Solar energy flow diagram">
              {/* Connection lines */}
              {lineCoords.map((line, i) => (
                <motion.line
                  key={i}
                  x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
                  stroke="#16A34A"
                  strokeWidth="2"
                  strokeDasharray="6 3"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                />
              ))}

              {/* Animated traveling dot */}
              <motion.circle
                r="6"
                fill="#16A34A"
                style={{ filter: 'drop-shadow(0 0 6px #16A34A)' }}
                animate={{
                  cx: [60, 220, 380, 540, 700],
                  cy: [100, 100, 100, 100, 100],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatDelay: 0.5,
                  ease: 'linear',
                  times: [0, 0.25, 0.5, 0.75, 1],
                }}
              />

              {/* Stage nodes */}
              {Array.isArray(stages) && stages.map((stage, i) => (
                <motion.g
                  key={i}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, type: 'spring' }}
                >
                  <circle cx={stageX[i]} cy={100} r="35" fill="#F0FDF4" stroke="#16A34A" strokeWidth="2" />
                  <text x={stageX[i]} y={105} textAnchor="middle" fontSize="22" aria-hidden="true">
                    {stageEmojis[i]}
                  </text>
                  <text x={stageX[i]} y={152} textAnchor="middle" fontSize="11" fontFamily="Poppins, sans-serif" fontWeight="600" fill="#1a1a1a">
                    {stage.label}
                  </text>
                  <text x={stageX[i]} y={166} textAnchor="middle" fontSize="9" fontFamily="Poppins, sans-serif" fill="#6b7280">
                    {stage.sublabel}
                  </text>
                </motion.g>
              ))}
            </svg>
          </div>
        </div>

        {/* Mobile: vertical SVG diagram with traveling green pulse */}
        <div className="md:hidden mx-auto" style={{ maxWidth: 320 }}>
          <svg width="320" height="620" viewBox="0 0 320 620" className="w-full" role="img" aria-label="Solar energy flow diagram">
            {/* Vertical connection lines */}
            {Array.isArray(stages) && stages.slice(0, -1).map((_, i) => (
              <motion.line
                key={i}
                x1="50" y1={70 + i * 130}
                x2="50" y2={130 + i * 130}
                stroke="#16A34A"
                strokeWidth="2"
                strokeDasharray="6 3"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              />
            ))}

            {/* Animated traveling dot running top → bottom, looping */}
            <motion.circle
              r="6"
              cx="50"
              fill="#16A34A"
              style={{ filter: 'drop-shadow(0 0 6px #16A34A)' }}
              animate={{ cy: [50, 180, 310, 440, 570] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatDelay: 0.5,
                ease: 'linear',
                times: [0, 0.25, 0.5, 0.75, 1],
              }}
            />

            {/* Stage nodes */}
            {Array.isArray(stages) && stages.map((stage, i) => {
              const cy = 50 + i * 130;
              return (
                <motion.g
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, type: 'spring' }}
                >
                  <circle cx="50" cy={cy} r="28" fill="#F0FDF4" stroke="#16A34A" strokeWidth="2" />
                  <text x="50" y={cy + 6} textAnchor="middle" fontSize="22" aria-hidden="true">{stageEmojis[i]}</text>
                  <text x="95" y={cy - 4} fontSize="14" fontFamily="Poppins, sans-serif" fontWeight="600" fill="#1a1a1a">
                    {stage.label}
                  </text>
                  <text x="95" y={cy + 14} fontSize="11" fontFamily="Poppins, sans-serif" fill="#6b7280">
                    {stage.sublabel}
                  </text>
                </motion.g>
              );
            })}
          </svg>
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {Array.isArray(cards) && cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-green-50 rounded-xl p-4 border border-green-100"
            >
              <p className="font-semibold text-gray-900 text-sm">{card.title}</p>
              <p className="text-gray-500 text-xs mt-1">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
