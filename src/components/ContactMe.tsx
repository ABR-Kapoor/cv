// src/components/ContactMe.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, CheckCircle, MessageSquare } from 'lucide-react';
import content from '../data/content.json';

const ContactMe = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentEmoji, setCurrentEmoji] = useState('👋');

  const emojis = ['👋', '💌', '🚀', '✨', '💻', '🎯'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission with fun emoji changes
    setCurrentEmoji('📨');
    await new Promise(resolve => setTimeout(resolve, 500));
    setCurrentEmoji('✈️');
    await new Promise(resolve => setTimeout(resolve, 500));
    setCurrentEmoji('🎉');

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormState({ name: '', email: '', message: '' });

    // Reset success message and emoji after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setCurrentEmoji('👋');
    }, 3000);
  };

  const handleInputFocus = (emoji: string) => {
    setCurrentEmoji(emoji);
  };

  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Fun Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            className="text-6xl mb-4 cursor-pointer"
            animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {currentEmoji}
          </motion.div>
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 mb-4">
            Let's Connect!
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Got a cool project idea? Want to collaborate? Or just want to say hi?
            Drop me a message! 🚀
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form
              onSubmit={handleSubmit}
              className="space-y-6 bg-gray-800 p-8 rounded-xl shadow-xl"
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Your Name
                  </label>
                  <motion.input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
                    onFocus={() => handleInputFocus('😊')}
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-shadow"
                    placeholder="John Doe"
                    whileFocus={{ scale: 1.02 }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Your Email
                  </label>
                  <motion.input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
                    onFocus={() => handleInputFocus('📧')}
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-shadow"
                    placeholder="john@example.com"
                    whileFocus={{ scale: 1.02 }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Your Message
                  </label>
                  <motion.textarea
                    required
                    value={formState.message}
                    onChange={(e) => setFormState(prev => ({ ...prev, message: e.target.value }))}
                    onFocus={() => handleInputFocus('💭')}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-shadow resize-none"
                    placeholder="Tell me about your ideas..."
                    whileFocus={{ scale: 1.02 }}
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-6 py-3 rounded-lg font-medium text-white 
                  ${isSubmitting ? 'bg-gray-600' : 'bg-gradient-to-r from-cyan-500 to-blue-500'}
                  hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300
                  flex items-center justify-center space-x-2`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                ) : isSubmitted ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span>Message Sent!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Contact Details */}
            <div className="bg-gray-800 p-8 rounded-xl shadow-xl">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Mail className="w-6 h-6 text-cyan-400" />
                Get in Touch
              </h3>
              <motion.a
                href={`mailto:${content.personal.email}`}
                className="flex items-center space-x-3 text-gray-400 hover:text-cyan-400 transition-colors"
                whileHover={{ x: 5 }}
              >
                <Mail className="w-5 h-5" />
                <span>{content.personal.email}</span>
              </motion.a>
            </div>

            {/* Quick Response Promise */}
            <motion.div
              className="bg-gray-800 p-8 rounded-xl shadow-xl"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <MessageSquare className="w-6 h-6 text-purple-400" />
                Quick Response
              </h3>
              <p className="text-gray-400">
                I usually respond within 24 hours! Let's create something amazing together. ⚡
              </p>
            </motion.div>

            {/* Location */}
            <motion.div
              className="bg-gray-800 p-8 rounded-xl shadow-xl"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-2xl font-bold text-white mb-4">Location</h3>
              <p className="text-gray-400">
                Based in {content.personal.location}, available for remote work worldwide 🌎
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactMe;
