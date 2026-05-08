import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle, MessageSquare, Phone } from 'lucide-react';
import personalInfo from '../data/personal_info.json';

const WHATSAPP_URL =
  'https://wa.me/919770075755?text=Hi%20Abeer!%20I%20found%20your%20portfolio%20and%20would%20like%20to%20connect.';

const ContactMe = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentEmoji, setCurrentEmoji] = useState('👋');
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true); setSubmitError(null); setCurrentEmoji('📨');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });
      setCurrentEmoji('✈️');
      await new Promise(r => setTimeout(r, 400));
      if (!response.ok) {
        const raw = await response.text();
        let errMsg = 'Failed to send message.';
        try {
          const parsed = JSON.parse(raw) as { error?: string; message?: string };
          errMsg = parsed.error || parsed.message || errMsg;
        } catch {
          errMsg = raw && !raw.startsWith('<') ? raw : `Server error (${response.status})`;
        }
        throw new Error(errMsg);
      }
      setCurrentEmoji('🎉'); setIsSubmitting(false); setIsSubmitted(true);
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => { setIsSubmitted(false); setCurrentEmoji('👋'); }, 3000);
    } catch (err) {
      setCurrentEmoji('😔'); setIsSubmitting(false);
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong.');
      setTimeout(() => { setSubmitError(null); setCurrentEmoji('👋'); }, 5000);
    }
  };

  return (
    <section className="section-light py-16 sm:py-24 relative overflow-hidden">
      <div className="orb orb-indigo w-80 h-80 -top-10 -right-20 opacity-25" />
      <div className="orb orb-pink w-64 h-64 bottom-0 -left-10 opacity-20" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} className="text-center mb-12"
        >
          <motion.div className="text-5xl sm:text-6xl mb-4 inline-block"
            animate={{ rotate: [0, -10, 10, -10, 10, 0] }} transition={{ duration: 2.5, repeat: Infinity }}>
            {currentEmoji}
          </motion.div>
          <h2 className="text-3xl sm:text-5xl font-bold mb-3" style={{
            background: "linear-gradient(135deg, #4f46e5, #7c3aed, #06b6d4)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"
          }}>Let's Connect</h2>
          <p className="text-gray-500 max-w-lg mx-auto text-sm sm:text-base">
            Have a project idea, want to collaborate, or just say hi? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 sm:gap-10">
          {/* Form — wider */}
          <motion.div
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} className="md:col-span-3"
          >
            <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 sm:p-8 space-y-5">
              <div>
                <label className="block text-xs font-semibold text-indigo-700 mb-1.5 uppercase tracking-wide">Your Name</label>
                <motion.input
                  type="text" required value={formState.name}
                  onChange={e => setFormState(p => ({ ...p, name: e.target.value }))}
                  onFocus={() => setCurrentEmoji('😊')}
                  placeholder="Ratan Tata"
                  className="w-full px-4 py-3 rounded-xl bg-white/70 text-gray-800 placeholder-gray-400 border border-indigo-100 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-sm shadow-sm"
                  whileFocus={{ scale: 1.01 }}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-indigo-700 mb-1.5 uppercase tracking-wide">Your Email</label>
                <motion.input
                  type="email" required value={formState.email}
                  onChange={e => setFormState(p => ({ ...p, email: e.target.value }))}
                  onFocus={() => setCurrentEmoji('📧')}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-white/70 text-gray-800 placeholder-gray-400 border border-indigo-100 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-sm shadow-sm"
                  whileFocus={{ scale: 1.01 }}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-indigo-700 mb-1.5 uppercase tracking-wide">Message</label>
                <motion.textarea
                  required value={formState.message}
                  onChange={e => setFormState(p => ({ ...p, message: e.target.value }))}
                  onFocus={() => setCurrentEmoji('💭')}
                  rows={4} placeholder="Tell me about your idea..."
                  className="w-full px-4 py-3 rounded-xl bg-white/70 text-gray-800 placeholder-gray-400 border border-indigo-100 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all resize-none text-sm shadow-sm"
                  whileFocus={{ scale: 1.01 }}
                />
              </div>
              <motion.button
                type="submit" disabled={isSubmitting}
                className={`w-full px-6 py-3 rounded-xl font-bold text-white text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-md
                  ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-indigo-500 to-violet-500 hover:shadow-indigo-200 hover:scale-[1.02]'}`}
                whileHover={!isSubmitting ? { scale: 1.02 } : {}} whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                  : isSubmitted ? <><CheckCircle className="w-4 h-4" /> Sent!</>
                  : <><Send className="w-4 h-4" /> Send Message</>}
              </motion.button>
              {submitError && <p className="text-red-500 text-xs text-center animate-pulse">{submitError}</p>}
            </form>
          </motion.div>

          {/* Info cards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} className="md:col-span-2 space-y-4"
          >
            {/* Email */}
            <div className="glass-card rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 rounded-xl bg-indigo-50 border border-indigo-100">
                  <Mail className="w-4 h-4 text-indigo-500" />
                </div>
                <h3 className="font-bold text-indigo-900 text-sm">Email</h3>
              </div>
              <a href={`mailto:${personalInfo.email}`}
                className="text-indigo-600 text-sm hover:text-indigo-800 transition-colors font-medium">
                {personalInfo.email}
              </a>
            </div>

            {/* Phone */}
            <div className="glass-card rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 rounded-xl bg-green-50 border border-green-100">
                  <Phone className="w-4 h-4 text-green-500" />
                </div>
                <h3 className="font-bold text-indigo-900 text-sm">Phone</h3>
              </div>
              <a href="tel:+919770075755"
                className="text-gray-700 text-sm hover:text-indigo-600 transition-colors font-medium block mb-3">
                +91 97700 75755
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-green-500 hover:bg-green-600 text-white text-xs font-bold transition-colors shadow-sm shadow-green-200">
                💬 Chat on WhatsApp
              </a>
            </div>

            {/* Response time */}
            <div className="glass-card rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded-xl bg-violet-50 border border-violet-100">
                  <MessageSquare className="w-4 h-4 text-violet-500" />
                </div>
                <h3 className="font-bold text-indigo-900 text-sm">Quick Response</h3>
              </div>
              <p className="text-gray-600 text-xs leading-relaxed">
                Usually responds within 24 hours. Based in Bhilai, Chhattisgarh — available for remote work worldwide. 🌎
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactMe;
