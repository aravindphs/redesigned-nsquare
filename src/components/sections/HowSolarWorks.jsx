import { motion } from 'framer-motion';

const stages = [
  { id: 'sun', emoji: '☀️', label: 'Sun', sublabel: 'Solar Energy', x: 60, y: 100 },
  { id: 'panels', emoji: '🔆', label: 'Solar Panels', sublabel: 'DC Electricity', x: 220, y: 100 },
  { id: 'inverter', emoji: '⚡', label: 'Inverter', sublabel: 'DC → AC', x: 380, y: 100 },
  { id: 'meter', emoji: '📊', label: 'Net Meter', sublabel: 'TANGEDCO', x: 540, y: 100 },
  { id: 'home', emoji: '🏠', label: 'Home/Grid', sublabel: 'Clean Power', x: 700, y: 100 },
];

const lineCoords = [
  { x1: 95, y1: 100, x2: 185, y2: 100 },
  { x1: 255, y1: 100, x2: 345, y2: 100 },
  { x1: 415, y1: 100, x2: 505, y2: 100 },
  { x1: 575, y1: 100, x2: 665, y2: 100 },
];

export default function HowSolarWorks() {
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
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            How Solar Energy Works
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            From sunlight to savings — understand your solar journey in 5 simple steps.
          </p>
        </motion.div>

        {/* Desktop SVG diagram */}
        <div className="hidden md:block overflow-x-auto">
          <div className="min-w-[760px] max-w-3xl mx-auto">
            <svg width="760" height="200" viewBox="0 0 760 200" className="w-full">
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
                style={{
                  filter: 'drop-shadow(0 0 6px #16A34A)',
                }}
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
              {stages.map((stage, i) => (
                <motion.g
                  key={stage.id}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, type: 'spring' }}
                >
                  <circle
                    cx={stage.x} cy={stage.y} r="35"
                    fill="#F0FDF4"
                    stroke="#16A34A"
                    strokeWidth="2"
                  />
                  <text x={stage.x} y={stage.y + 5} textAnchor="middle" fontSize="22">
                    {stage.emoji}
                  </text>
                  <text
                    x={stage.x} y={stage.y + 52}
                    textAnchor="middle"
                    fontSize="11"
                    fontFamily="Poppins, sans-serif"
                    fontWeight="600"
                    fill="#1a1a1a"
                  >
                    {stage.label}
                  </text>
                  <text
                    x={stage.x} y={stage.y + 66}
                    textAnchor="middle"
                    fontSize="9"
                    fontFamily="Poppins, sans-serif"
                    fill="#6b7280"
                  >
                    {stage.sublabel}
                  </text>
                </motion.g>
              ))}
            </svg>
          </div>
        </div>

        {/* Mobile: stacked vertically */}
        <div className="md:hidden flex flex-col gap-4 max-w-xs mx-auto">
          {stages.map((stage, i) => (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-4"
            >
              <div className="w-14 h-14 rounded-full bg-green-50 border-2 border-[#16A34A] flex items-center justify-center text-2xl flex-shrink-0">
                {stage.emoji}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{stage.label}</p>
                <p className="text-xs text-gray-500">{stage.sublabel}</p>
              </div>
              {i < stages.length - 1 && (
                <div className="absolute left-7 mt-14 w-0.5 h-4 bg-[#16A34A]" style={{ position: 'relative', left: '-100px' }} />
              )}
            </motion.div>
          ))}
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {[
            { title: '5-6 Peak Sun Hours', desc: 'Tamil Nadu daily average solar irradiance' },
            { title: '25-Year Warranty', desc: 'Performance guarantee on all ALMM panels' },
            { title: 'Net Billing', desc: 'Export excess power to TANGEDCO grid' },
            { title: 'Zero Maintenance', desc: 'Just periodic cleaning needed' },
          ].map((card) => (
            <motion.div
              key={card.title}
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
