import React from "react";
import { motion } from "framer-motion";
import { Heart, Linkedin, Github, Mail } from "lucide-react";

interface FooterProps {
  darkMode?: boolean;
  personalInfo: {
    name: string;
    github: string;
    linkedin: string;
    email: string;
    whatsapp: string;
  };
}

const Footer: React.FC<FooterProps> = ({ darkMode = true, personalInfo }) => (
    <motion.footer
        className="relative bg-black text-gray-400 text-center py-8 px-4 border-t border-gray-700 mt-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
    >
      <div className="flex flex-col items-center space-y-4">
        {/* Social Links */}
        <div className="flex space-x-6">
          <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
          >
            <Github
                size={22}
                className={darkMode ? "text-purple-400" : "text-[#BFA06A]"}
            />
          </a>
          <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
          >
            <Linkedin
                size={22}
                className={darkMode ? "text-cyan-400" : "text-[#7B5E3B]"}
            />
          </a>
          <a href={`mailto:${personalInfo.email}`} aria-label="Email">
            <Mail
                size={22}
                className={darkMode ? "text-pink-500" : "text-[#BFA06A]"}
            />
          </a>
        </div>

        {/* Made with Love */}
        <p
            className={`flex items-center text-sm font-medium ${
                darkMode ? "text-gray-400" : "text-[#7B5E3B]"
            }`}
        >
          Made with <Heart size={16} className="mx-1 text-red-500 animate-pulse" />{" "}
          by{" "}
          <span
              className={`ml-1 font-semibold ${
                  darkMode ? "text-white" : "text-[#7B5E3B]"
              }`}
          >
          {personalInfo.name}
        </span>
        </p>

        {/* Rights */}
        <p
            className={`text-xs tracking-widest uppercase ${
                darkMode ? "text-gray-500" : "text-[#BFA06A]"
            }`}
        >
          All rights reserved
        </p>
      </div>
    </motion.footer>
);

export default Footer;