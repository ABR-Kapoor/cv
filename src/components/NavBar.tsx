import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaDownload } from "react-icons/fa6";
import personalInfo from '../data/personal_info.json';

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
];

const Navbar: React.FC = () => {
  const [, setMenuOpen] = useState(false);

  return (
    <>
      <motion.nav
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-7xl backdrop-blur-md bg-white/20 dark:bg-black/40 border border-white/20 rounded-xl shadow-lg flex justify-between items-center px-8 py-4"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent select-none"
          title="Abeer Kapoor's Portfolio"
          aria-label="Homepage"
          onClick={() => setMenuOpen(false)}
        >
          {personalInfo.name}'s Portfolio
        </Link>
        {/* Navigation Links and Icons */}
        <div className="hidden md:flex space-x-8 font-semibold text-gray-200 items-center">
          {navLinks.map(link => (
            <Link
              key={link.name}
              to={link.path}
              className="relative group px-3 py-2 cursor-pointer text-gray-300 hover:text-cyan-400 transition-colors duration-300 rounded-lg"
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
              <span className="absolute left-0 -bottom-1 w-full h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
            </Link>
          ))}
          {/* LinkedIn Icon */}
          <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn">
            <FaLinkedin size={22} className="text-cyan-400 hover:text-white transition-colors duration-300" />
          </a>
          {/* GitHub Icon */}
          <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" title="GitHub">
            <FaGithub size={22} className="text-purple-400 hover:text-white transition-colors duration-300" />
          </a>
          {/* Download Resume Icon */}
          <a href="/src/assets/ABR-CV25.11.pdf" download title="Download Resume">
            <FaDownload size={22} className="text-purple-400 hover:text-white transition-colors duration-300" />
          </a>
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;