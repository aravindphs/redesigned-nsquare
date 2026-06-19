import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../../data/projects';

const tabs = ['All', 'Residential', 'Commercial', 'Industrial'];

const typeConfig = {
  Residential: { bg: '#dcfce7', accent: '#16A34A', icon: '🏠' },
  Commercial: { bg: '#dbeafe', accent: '#0284C7', icon: '🏢' },
  Industrial: { bg: '#ede9fe', accent: '#7C3AED', icon: '🏭' },
};

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState('All');

  const filtered = activeTab === 'All'
    ? projects
    : projects.filter((p) => p.type === activeTab);

  return (
    <section className="py-20 bg-gray-50" id="portfolio">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="inline-block px-3 py-1 bg-green-50 text-[#16A34A] text-sm font-semibold rounded-full mb-3">
            Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Our Installations Across Tamil Nadu
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            500+ successful solar installations from 1 kW rooftop systems to 500 kW industrial plants.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                activeTab === tab
                  ? 'bg-[#16A34A] text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-[#16A34A] hover:text-[#16A34A]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => {
              const cfg = typeConfig[project.type];
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -4, boxShadow: '0 16px 32px rgba(0,0,0,0.1)' }}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100"
                >
                  {/* Gradient header */}
                  <div
                    className="h-36 relative flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${project.color}22, ${project.color}44)`,
                    }}
                  >
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl shadow-lg"
                      style={{ backgroundColor: project.color + '33' }}
                    >
                      {cfg.icon}
                    </div>
                    <div
                      className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-xs font-semibold"
                      style={{ backgroundColor: cfg.bg, color: cfg.accent }}
                    >
                      {project.type}
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-bold text-gray-900">{project.name}</h3>
                    <p className="text-sm text-gray-400 mt-0.5">📍 {project.location}</p>
                    <div className="flex gap-4 mt-4">
                      <div>
                        <p className="text-xs text-gray-400">System Size</p>
                        <p className="text-sm font-bold" style={{ color: project.color }}>{project.size}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Monthly Output</p>
                        <p className="text-sm font-bold text-gray-800">{project.output}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <p className="text-gray-400 text-sm">
            Showing {filtered.length} of 500+ completed installations
          </p>
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="mt-4 px-6 py-3 border-2 border-[#16A34A] text-[#16A34A] font-semibold rounded-xl hover:bg-[#16A34A] hover:text-white transition-all"
          >
            Get Your Installation Quote
          </button>
        </motion.div>
      </div>
    </section>
  );
}
