import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaLinkedin, FaGithub } from "react-icons/fa6";
import { Download, Menu, X } from "lucide-react";
import personalInfo from '../data/personal_info.json';

const RESUME = "/Abeer_Kapoor_Resume_v26.17.pdf";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
];

const handleDownload = (e: React.MouseEvent) => {
  e.preventDefault();
  window.open(RESUME, "_blank");
  const a = document.createElement("a");
  a.href = RESUME; a.download = "Abeer_Kapoor_Resume.pdf";
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
};

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="mx-auto transition-all duration-300"
          style={{
            maxWidth: scrolled ? "100%" : "100%",
            padding: scrolled ? "0 1.5rem" : "1rem 1.5rem",
          }}
        >
          <div
            className="flex items-center justify-between px-5 sm:px-8 py-3.5 transition-all duration-300"
            style={{
              background: scrolled
                ? "rgba(247,246,243,0.90)"
                : "rgba(247,246,243,0.60)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderBottom: scrolled ? "1px solid rgba(0,0,0,0.07)" : "1px solid transparent",
              borderRadius: scrolled ? "0" : "12px",
              boxShadow: scrolled ? "0 2px 16px rgba(0,0,0,0.06)" : "none",
              marginTop: scrolled ? "0" : "0",
            }}
          >
            {/* Logo mark */}
            <Link
              to="/"
              className="flex items-center gap-2 select-none"
              aria-label="Home"
            >
              <span
                className="font-display font-bold tracking-tight"
                style={{ fontSize: "1.1rem", color: "var(--text-primary)" }}
              >
                Abeer
              </span>
              <span
                className="font-mono text-xs px-1.5 py-0.5 rounded"
                style={{
                  background: "var(--accent-primary)",
                  color: "#fff",
                  letterSpacing: "0.02em",
                  fontSize: "0.62rem",
                }}
              >
                .dev
              </span>
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(link => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                  style={{
                    color: location.pathname === link.path ? "var(--accent-primary)" : "var(--text-secondary)",
                    background: location.pathname === link.path ? "rgba(79,70,229,0.08)" : "transparent",
                  }}
                  onMouseEnter={e => {
                    if (location.pathname !== link.path)
                      (e.target as HTMLElement).style.color = "var(--text-primary)";
                  }}
                  onMouseLeave={e => {
                    if (location.pathname !== link.path)
                      (e.target as HTMLElement).style.color = "var(--text-secondary)";
                  }}
                >
                  {link.name}
                </Link>
              ))}

              <div className="w-px h-4 mx-2" style={{ background: "var(--border-strong)" }} />

              <a
                href={personalInfo.linkedin}
                target="_blank" rel="noopener noreferrer"
                className="p-2 rounded-lg transition-colors duration-200"
                style={{ color: "var(--text-muted)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--accent-primary)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
              >
                <FaLinkedin size={16} />
              </a>
              <a
                href={personalInfo.github}
                target="_blank" rel="noopener noreferrer"
                className="p-2 rounded-lg transition-colors duration-200"
                style={{ color: "var(--text-muted)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--text-primary)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
              >
                <FaGithub size={16} />
              </a>

              <div className="w-px h-4 mx-2" style={{ background: "var(--border-strong)" }} />

              <a href={RESUME} onClick={handleDownload} className="btn-primary" style={{ padding: "0.45rem 1rem" }}>
                <Download size={13} strokeWidth={2.5} />
                <span>Resume</span>
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-lg transition-colors"
              style={{ color: "var(--text-secondary)" }}
              onClick={() => setMenuOpen(p => !p)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="fixed top-16 left-4 right-4 z-40 rounded-2xl p-5 flex flex-col gap-3"
            style={{
              background: "rgba(247,246,243,0.97)",
              backdropFilter: "blur(24px)",
              border: "1px solid var(--border-strong)",
              boxShadow: "var(--shadow-xl)",
            }}
          >
            {navLinks.map(link => (
              <Link
                key={link.name}
                to={link.path}
                className="text-sm font-semibold px-3 py-2.5 rounded-lg transition-colors"
                style={{ color: "var(--text-primary)", background: "transparent" }}
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <hr style={{ border: "none", height: "1px", background: "var(--border-light)" }} />
            <a href={RESUME} onClick={e => { handleDownload(e); setMenuOpen(false); }} className="btn-primary justify-center">
              <Download size={14} /> Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
