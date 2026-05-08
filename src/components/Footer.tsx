import React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Mail } from "lucide-react";

interface FooterProps {
  darkMode?: boolean;
  personalInfo: { name: string; github: string; linkedin: string; email: string; whatsapp: string; };
}

const Footer: React.FC<FooterProps> = ({ personalInfo }) => (
  <motion.footer
    className="relative text-center py-8 px-4 mt-auto"
    style={{
      background: "rgba(255,255,255,0.55)",
      backdropFilter: "blur(18px)",
      borderTop: "1.5px solid rgba(255,255,255,0.7)",
      boxShadow: "0 -4px 24px rgba(99,102,241,0.06)"
    }}
    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
  >
    <div className="flex flex-col items-center gap-4 max-w-lg mx-auto">
      {/* Social icons */}
      <div className="flex items-center gap-4">
        {[
          { href: personalInfo.github, icon: <FaGithub size={18} />, color: "text-gray-600 hover:text-gray-900" },
          { href: personalInfo.linkedin, icon: <FaLinkedin size={18} />, color: "text-indigo-500 hover:text-indigo-700" },
          { href: `mailto:${personalInfo.email}`, icon: <Mail size={18} />, color: "text-rose-500 hover:text-rose-700" },
          { href: "https://x.com/AbeerKapoor1/", icon: <FaXTwitter size={18} />, color: "text-sky-500 hover:text-sky-700" },
        ].map((s, i) => (
          <motion.a key={i} href={s.href} target={s.href.startsWith("mailto") ? undefined : "_blank"}
            rel="noopener noreferrer" className={`p-2.5 rounded-xl transition-colors ${s.color}`}
            style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.8)", boxShadow: "0 2px 8px rgba(99,102,241,0.08)" }}
            whileHover={{ scale: 1.12, y: -2 }} whileTap={{ scale: 0.95 }}>
            {s.icon}
          </motion.a>
        ))}
      </div>

      {/* Made with love */}
      <p className="flex items-center gap-1.5 text-sm font-semibold text-gray-600">
        Made with <Heart size={14} className="text-rose-500 animate-pulse" /> by
        <span className="text-indigo-700 font-bold">{personalInfo.name}</span>
      </p>

      <p className="text-xs text-gray-400 tracking-widest uppercase font-medium">
        All rights reserved · {new Date().getFullYear()}
      </p>
    </div>
  </motion.footer>
);

export default Footer;
