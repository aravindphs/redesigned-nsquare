import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import { useLanguage } from '../../contexts/LanguageContext';

const PHONE_REGEX = /^(\+91[\s-]?)?[6-9]\d{9}$/;

export default function PopupForm({ onClose, exitIntent }) {
  const { t } = useLanguage();
  const p = t('popup');
  const [form, setForm] = useState({ name: '', phone: '', city: '', propertyType: '', message: '' });
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
    if (!form.name.trim())  errs.name = p?.errors?.name;
    if (!form.phone.trim()) errs.phone = p?.errors?.phone;
    else if (!PHONE_REGEX.test(form.phone.trim())) errs.phone = p?.errors?.phoneInvalid;
    if (!form.city.trim())  errs.city = p?.errors?.city;
    if (!form.propertyType) errs.propertyType = p?.errors?.propertyType;
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
      data.append('_subject', exitIntent ? 'New Solar Enquiry — Exit Intent Popup' : 'New Solar Enquiry — Popup Form');
      data.append('_captcha', 'false');
      data.append('_template', 'table');
      // NOTE: First submission from a new email requires one-time email activation from FormSubmit — this is normal, not a bug
      await fetch('https://formsubmit.co/nsquareenergies@gmail.com', { method: 'POST', body: data });
      setSubmitted(true);
      window.trackEvent?.('generate_lead', { method: exitIntent ? 'exit_intent_popup' : 'popup_form', property_type: form.propertyType });
    } catch {
      setSubmitted(true);
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
        role="dialog"
        aria-modal="true"
        aria-label={p?.title}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
        >
          <div className="bg-[#0B1A12] px-6 py-4 flex items-center justify-between">
            <Logo size="sm" />
            <button
              onClick={onClose}
              className="text-white/70 hover:text-white text-2xl leading-none"
              aria-label="Close dialog"
            >
              ×
            </button>
          </div>

          <div className="px-6 py-5">
            {!submitted ? (
              <>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{p?.title}</h3>
                <p className="text-sm text-gray-500 mb-4">{p?.sub}</p>
                <form onSubmit={handleSubmit} className="space-y-3" noValidate>
                  <div>
                    <input type="text" placeholder={p?.name} value={form.name} onChange={handleChange('name')}
                      aria-label={p?.name}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#16A34A]" />
                    {errors.name && <p className="text-red-500 text-xs mt-1" role="alert">{errors.name}</p>}
                  </div>
                  <div>
                    <input type="tel" placeholder={p?.phone} value={form.phone} onChange={handleChange('phone')}
                      aria-label={p?.phone}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#16A34A]" />
                    {errors.phone && <p className="text-red-500 text-xs mt-1" role="alert">{errors.phone}</p>}
                  </div>
                  <div>
                    <input type="text" placeholder={p?.city} value={form.city} onChange={handleChange('city')}
                      aria-label={p?.city}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#16A34A]" />
                    {errors.city && <p className="text-red-500 text-xs mt-1" role="alert">{errors.city}</p>}
                  </div>
                  <div>
                    <select value={form.propertyType} onChange={handleChange('propertyType')}
                      aria-label={p?.propertyType}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#16A34A] text-gray-600">
                      <option value="">{p?.propertyType}</option>
                      <option value="Residential">{t('contact.fields.residential')}</option>
                      <option value="Commercial">{t('contact.fields.commercial')}</option>
                      <option value="Industrial">{t('contact.fields.industrial')}</option>
                    </select>
                    {errors.propertyType && <p className="text-red-500 text-xs mt-1" role="alert">{errors.propertyType}</p>}
                  </div>
                  <div>
                    <textarea placeholder={p?.message} value={form.message} onChange={handleChange('message')}
                      rows={2} aria-label={p?.message}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#16A34A] resize-none" />
                  </div>
                  <button type="submit" disabled={submitting}
                    className="w-full py-3 bg-[#16A34A] text-white font-semibold rounded-lg hover:bg-green-700 transition-colors disabled:opacity-60">
                    {submitting ? p?.submitting : p?.submit}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#16A34A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{p?.successTitle}</h3>
                <p className="text-gray-500 text-sm mb-4">{p?.successMsg}</p>
                <button onClick={onClose}
                  className="px-6 py-2 bg-[#16A34A] text-white rounded-lg font-semibold hover:bg-green-700 transition-colors">
                  {p?.close}
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
