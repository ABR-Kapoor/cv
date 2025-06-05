// src/components/ContactMe.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '../utils/animations';
import { Mail, Linkedin, Instagram, Github, Twitter } from 'lucide-react';

const ContactMe: React.FC = () => {
  return (
    <section id="contact" className="min-h-screen py-20 px-8 text-white font-sans">
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          className="text-5xl font-extrabold mb-12 underline underline-offset-8 decoration-cyan-400 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 drop-shadow-lg"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          Contact Me
        </motion.h2>

        <motion.p
          className="text-lg text-gray-300 mb-10 drop-shadow-md"
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Got a project, collaboration, or idea? Let’s talk — don’t be shy!
        </motion.p>

        <motion.form
          className="flex flex-col space-y-6 text-left p-8 rounded-3xl border-2 border-transparent bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-[length:200%_200%] animate-gradient-x shadow-lg"
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          onSubmit={(e) => {
            e.preventDefault();
            alert("Message submitted! 🚀");
          }}
        >
          {['Your Name', 'Your Email'].map((placeholder, i) => (
            <input
              key={i}
              type={placeholder === 'Your Email' ? 'email' : 'text'}
              placeholder={placeholder}
              required
              className="p-4 rounded-xl bg-black bg-opacity-70 text-white placeholder-cyan-400 placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-1 focus:ring-offset-black transition-shadow shadow-md"
            />
          ))}
          <textarea
            placeholder="Your Message"
            rows={5}
            required
            className="p-4 rounded-xl bg-black bg-opacity-70 text-white placeholder-cyan-400 placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-1 focus:ring-offset-black transition-shadow shadow-md resize-none"
          />
          <motion.button
            type="submit"
            className="relative bg-cyan-500 text-white py-3 px-6 rounded-2xl font-semibold shadow-lg overflow-hidden z-10"
            whileHover={{ scale: 1.1, boxShadow: "0 0 15px 5px rgba(6,182,212,0.8)" }}
            animate={{
              scale: [1, 1.05, 1],
              boxShadow: [
                "0 0 10px 3px rgba(6,182,212,0.6)",
                "0 0 15px 5px rgba(6,182,212,0.9)",
                "0 0 10px 3px rgba(6,182,212,0.6)",
              ],
            }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            Send Message
          </motion.button>
        </motion.form>

        <motion.div
          className="mt-12 text-gray-400 text-sm drop-shadow-md"
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          Or reach out directly at{' '}
          <a href="mailto:yourname@example.com" className="text-cyan-400 font-medium underline hover:text-cyan-300 transition-colors">
            yourname@example.com
          </a>
        </motion.div>

        <motion.div
          className="flex justify-center gap-8 mt-8"
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          {[{
            href: "mailto:yourname@example.com",
            icon: Mail,
            label: "Email"
          }, {
            href: "https://linkedin.com/in/yourusername",
            icon: Linkedin,
            label: "LinkedIn"
          }, {
            href: "https://github.com/yourusername",
            icon: Github,
            label: "GitHub"
          }, {
            href: "https://instagram.com/yourusername",
            icon: Instagram,
            label: "Instagram"
          }, {
            href: "https://twitter.com/yourusername",
            icon: Twitter,
            label: "Twitter"
          }].map(({ href, icon: Icon, label }, idx) => (
            <motion.a
              key={idx}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-gray-400 hover:text-cyan-400 transition-colors"
              whileHover={{ scale: 1.3, color: '#06b6d4', textShadow: '0 0 8px #06b6d4' }}
              whileTap={{ scale: 0.95 }}
              tabIndex={0}
            >
              <Icon size={32} />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ContactMe;
