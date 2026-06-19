import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { testimonials } from '../../data/testimonials';

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-200'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto) return;
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [auto]);

  const goTo = (idx) => {
    setCurrent(idx);
    setAuto(false);
    setTimeout(() => setAuto(true), 10000);
  };

  return (
    <section className="py-20 bg-white" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-3 py-1 bg-green-50 text-[#16A34A] text-sm font-semibold rounded-full mb-3">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            What Our Customers Say
          </h2>
          <p className="text-gray-500 mt-3">Real stories from real solar owners across Tamil Nadu.</p>
        </motion.div>

        {/* Desktop grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-gray-50 rounded-2xl p-5 flex flex-col"
            >
              <StarRating rating={t.rating} />
              <p className="text-gray-600 text-sm mt-3 leading-relaxed flex-1">
                "{t.quote}"
              </p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="w-8 h-8 rounded-full bg-[#16A34A] flex items-center justify-center text-white font-bold text-sm">
                  {t.name.charAt(0)}
                </div>
                <p className="font-semibold text-gray-900 text-sm mt-2">{t.name}</p>
                <p className="text-gray-400 text-xs">{t.location} · {t.system}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden">
          <div className="relative overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-50 rounded-2xl p-6"
              >
                <StarRating rating={testimonials[current].rating} />
                <p className="text-gray-600 text-sm mt-3 leading-relaxed">
                  "{testimonials[current].quote}"
                </p>
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#16A34A] flex items-center justify-center text-white font-bold">
                    {testimonials[current].name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{testimonials[current].name}</p>
                    <p className="text-gray-400 text-xs">{testimonials[current].location} · {testimonials[current].system}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === current ? 'bg-[#16A34A] w-6' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: '4.9/5', label: 'Average Rating' },
            { value: '500+', label: 'Happy Customers' },
            { value: '98%', label: 'Would Recommend' },
            { value: '4.6 yrs', label: 'Avg. Payback' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center bg-green-50 rounded-xl py-5">
              <p className="text-2xl font-bold text-[#16A34A]">{value}</p>
              <p className="text-xs text-gray-500 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
