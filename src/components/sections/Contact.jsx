import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const PHONE_REGEX = /^(\+91[\s-]?)?[6-9]\d{9}$/;

export default function Contact() {
  const [form, setForm] = useState({
    name: '', phone: '', email: '', city: '', propertyType: '',
    roofArea: '', monthlyBill: '', message: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.phone.trim()) errs.phone = 'Phone is required';
    else if (!PHONE_REGEX.test(form.phone.trim())) errs.phone = 'Enter a valid 10-digit India phone number';
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.city.trim()) errs.city = 'City is required';
    if (!form.propertyType) errs.propertyType = 'Please select property type';
    return errs;
  };

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmitting(true);
    try {
      const data = new FormData();
      Object.entries(form).forEach(([k, v]) => { if (v) data.append(k, v); });
      data.append('_subject', 'New Solar Enquiry — Contact Section');
      data.append('_captcha', 'false');
      data.append('_template', 'table');
      await fetch('https://formsubmit.co/nsquareenergies@gmail.com', {
        method: 'POST',
        body: data,
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    }
    setSubmitting(false);
  };

  const inputClass = (field) =>
    `w-full px-4 py-3 border rounded-xl text-sm focus:outline-none transition-colors ${
      errors[field]
        ? 'border-red-300 focus:border-red-500 bg-red-50'
        : 'border-gray-200 focus:border-[#16A34A] bg-white'
    }`;

  return (
    <section className="py-20 bg-gray-50" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-3 py-1 bg-green-50 text-[#16A34A] text-sm font-semibold rounded-full mb-3">
            Contact Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Get Your Free Solar Quote
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Fill out the form and our expert will call you within 24 hours to schedule a free site survey.
          </p>
        </motion.div>

        {/* NOTE: First submission from a new email requires one-time email activation from FormSubmit — this is normal, not a bug */}
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 text-lg mb-5">Contact Information</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
                    <FaPhone className="text-[#16A34A]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Phone</p>
                    <a href="tel:+918838098525" className="font-semibold text-gray-900 hover:text-[#16A34A] transition-colors">
                      +91 88380 98525
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
                    <FaEnvelope className="text-[#16A34A]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Email</p>
                    <a href="mailto:nsquareenergies@gmail.com" className="font-semibold text-gray-900 hover:text-[#16A34A] transition-colors text-sm">
                      nsquareenergies@gmail.com
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
                    <FaMapMarkerAlt className="text-[#16A34A]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Address</p>
                    <p className="font-semibold text-gray-900 text-sm">Coimbatore, Tamil Nadu</p>
                    <p className="text-gray-400 text-xs">Serving all of Tamil Nadu</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
                    <FaClock className="text-[#16A34A]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Working Hours</p>
                    <p className="font-semibold text-gray-900 text-sm">Mon–Sat: 9 AM – 6 PM</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Map placeholder */}
            <div className="bg-gray-200 rounded-2xl h-48 flex items-center justify-center border border-gray-200 overflow-hidden relative">
              <div className="text-center">
                <FaMapMarkerAlt className="text-[#16A34A] text-3xl mx-auto mb-2" />
                <p className="text-gray-500 text-sm font-medium">Google Map — Coimbatore</p>
                <p className="text-gray-400 text-xs mt-1">Map embed coming soon</p>
              </div>
              {/* Decorative grid */}
              <svg
                className="absolute inset-0 w-full h-full opacity-10"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#16A34A" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
              {!submitted ? (
                <>
                  <h3 className="font-bold text-gray-900 text-lg mb-6">Send Us a Message</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Full Name *</label>
                        <input
                          type="text"
                          value={form.name}
                          onChange={handleChange('name')}
                          placeholder="Your full name"
                          className={inputClass('name')}
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Phone Number *</label>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={handleChange('phone')}
                          placeholder="+91 XXXXX XXXXX"
                          className={inputClass('phone')}
                        />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Email</label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={handleChange('email')}
                          placeholder="your@email.com (optional)"
                          className={inputClass('email')}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">City *</label>
                        <input
                          type="text"
                          value={form.city}
                          onChange={handleChange('city')}
                          placeholder="Your city"
                          className={inputClass('city')}
                        />
                        {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Property Type *</label>
                        <select
                          value={form.propertyType}
                          onChange={handleChange('propertyType')}
                          className={inputClass('propertyType') + ' text-gray-700'}
                        >
                          <option value="">Select type...</option>
                          <option value="Residential">Residential</option>
                          <option value="Commercial">Commercial</option>
                          <option value="Industrial">Industrial</option>
                        </select>
                        {errors.propertyType && <p className="text-red-500 text-xs mt-1">{errors.propertyType}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Roof Area (sq ft)</label>
                        <input
                          type="number"
                          value={form.roofArea}
                          onChange={handleChange('roofArea')}
                          placeholder="e.g. 600 (optional)"
                          className={inputClass('roofArea')}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Monthly Electricity Bill (₹)</label>
                      <input
                        type="number"
                        value={form.monthlyBill}
                        onChange={handleChange('monthlyBill')}
                        placeholder="e.g. 3000 (optional)"
                        className={inputClass('monthlyBill')}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Message</label>
                      <textarea
                        value={form.message}
                        onChange={handleChange('message')}
                        placeholder="Any specific requirements or questions..."
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#16A34A] resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-4 bg-[#16A34A] text-white font-bold text-base rounded-xl hover:bg-green-700 transition-colors disabled:opacity-60 shadow-lg shadow-green-200"
                    >
                      {submitting ? 'Sending...' : 'Send Enquiry & Get Free Quote →'}
                    </button>

                    <p className="text-xs text-gray-400 text-center">
                      We'll call you within 24 hours. No spam, ever.
                    </p>
                  </form>
                </>
              ) : (
                <div className="text-center py-12">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5"
                  >
                    <svg className="w-10 h-10 text-[#16A34A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Enquiry Received!</h3>
                  <p className="text-gray-500 mb-4">
                    Thank you for reaching out. Our solar expert will call you within 24 hours to discuss your requirements and schedule a free site survey.
                  </p>
                  <p className="text-gray-400 text-sm">
                    You can also reach us directly at{' '}
                    <a href="tel:+918838098525" className="text-[#16A34A] font-semibold">+91 88380 98525</a>
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
