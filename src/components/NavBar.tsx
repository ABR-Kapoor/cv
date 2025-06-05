import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";


const navLinks = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  // { name: "Consulting", path: "/consulting-payment" },
  // { name: "Products", path: "/product-payment" },
];

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <motion.nav
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-7xl
          backdrop-blur-md bg-white/20 dark:bg-black/40 border border-white/20
          rounded-xl shadow-lg flex justify-between items-center px-8 py-4"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent select-none"
          title="Radhe’s Portfolio"
          aria-label="Homepage"
          onClick={() => setMenuOpen(false)}
        >
          Radhe’s Portfolio
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-12 font-semibold text-gray-200">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="relative group px-1 py-2 cursor-pointer
                text-gray-300 hover:text-cyan-400 transition-colors duration-300"
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
              <span
                className="absolute left-0 -bottom-1 w-full h-1
                  bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600
                  scale-x-0 group-hover:scale-x-100 origin-left
                  transition-transform duration-300 rounded"
              />
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col justify-center items-center gap-1 focus:outline-none"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span
            className={`block h-1 w-7 rounded-full bg-gradient-to-r from-cyan-400 to-purple-600
              transition-transform duration-300 origin-left
              ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block h-1 w-7 rounded-full bg-gradient-to-r from-cyan-400 to-purple-600
              transition-opacity duration-300
              ${menuOpen ? "opacity-0" : "opacity-100"}`}
          />
          <span
            className={`block h-1 w-7 rounded-full bg-gradient-to-r from-cyan-400 to-purple-600
              transition-transform duration-300 origin-left
              ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </motion.nav>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <motion.div
          className="fixed top-[72px] left-1/2 -translate-x-1/2 w-[90%] max-w-md
            bg-black/90 backdrop-blur-md rounded-xl shadow-lg py-6 px-8 flex flex-col gap-6 z-40"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-lg text-gray-300 hover:text-cyan-400 font-medium"
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </motion.div>
      )}
    </>
  );
};

export default Navbar;
