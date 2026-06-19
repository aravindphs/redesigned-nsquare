import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

const PHONE_REGEX = /^(\+91[\s-]?)?[6-9]\d{9}$/;

export default function PopupForm({ onClose }) {
  const [form, setForm] = useState({
    name: '', phone: '', city: '', propertyType: '', message: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.phone.trim()) errs.phone = 'Phone is required';
    else if (!PHONE_REGEX.test(form.phone.trim())) errs.phone = 'Enter a valid 10-digit India phone number';
    if (!form.city.trim()) errs.city = 'City is required';
    if (!form.propertyType) errs.propertyType = 'Please select property type';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmitting(true);
    try {
      const data = new FormData();
      data.append('name', form.name);
      data.append('phone', form.phone);
      data.append('city', form.city);
      data.append('propertyType', form.propertyType);
      data.append('message', form.message);
      data.append('_subject', 'New Solar Enquiry — Popup Form');
      data.append('_captcha', 'false');
      data.append('_template', 'table');
      await fetch('https://formsubmit.co/nsquareenergies@gmail.com', {
        method: 'POST',
        body: data,
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true); // Show success even on network error (graceful)
    }
    setSubmitting(false);
  };

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((er) => ({ ...er, [field]: undefined }));
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ backdropFilter: 'blur(6px)', backgroundColor: 'rgba(0,0,0,0.5)' }}
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
        >
          {/* Header */}
          <div className="bg-[#0B1A12] px-6 py-4 flex items-center justify-between">
            <div>
              <Logo size="sm" />
            </div>
            <button
              onClick={onClose}
              className="text-white/70 hover:text-white text-2xl leading-none"
              aria-label="Close"
            >
              ×
            </button>
          </div>

          <div className="px-6 py-5">
            {!submitted ? (
              <>
                <h3 className="text-xl font-bold text-gray-900 mb-1">Get Free Solar Consultation</h3>
                <p className="text-sm text-gray-500 mb-4">Subsidy window closes March 31, 2027. Act now!</p>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name *"
                      value={form.name}
                      onChange={handleChange('name')}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#16A34A]"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Phone Number *"
                      value={form.phone}
                      onChange={handleChange('phone')}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#16A34A]"
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="City *"
                      value={form.city}
                      onChange={handleChange('city')}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#16A34A]"
                    />
                    {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                  </div>
                  <div>
                    <select
                      value={form.propertyType}
                      onChange={handleChange('propertyType')}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#16A34A] text-gray-600"
                    >
                      <option value="">Property Type *</option>
                      <option value="Residential">Residential</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Industrial">Industrial</option>
                    </select>
                    {errors.propertyType && <p className="text-red-500 text-xs mt-1">{errors.propertyType}</p>}
                  </div>
                  <div>
                    <textarea
                      placeholder="Message (optional)"
                      value={form.message}
                      onChange={handleChange('message')}
                      rows={2}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#16A34A] resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 bg-[#16A34A] text-white font-semibold rounded-lg hover:bg-green-700 transition-colors disabled:opacity-60"
                  >
                    {submitting ? 'Sending...' : 'Get Free Consultation →'}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#16A34A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Thank you!</h3>
                <p className="text-gray-500 text-sm mb-4">We'll call you within 24 hours to schedule your free site survey.</p>
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-[#16A34A] text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
