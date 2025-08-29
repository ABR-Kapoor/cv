import React from "react";
import { FaRupeeSign } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { FaLinkedin } from "react-icons/fa";
import personalInfo from "../data/personal_info.json";

const FloatingNavCard: React.FC = () => {
  return (
    <nav
      aria-label="Mobile quick navigation"
      className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 md:hidden flex items-center justify-center"
    >
      <div
        className="backdrop-blur-lg bg-white/30 dark:bg-gray-900/40 shadow-xl rounded-2xl flex gap-8 px-6 py-3 border border-white/20 dark:border-gray-700/30"
        style={{ boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)" }}
      >
        {/* Rupee Icon */}
        <a
          href="/services"
          aria-label="Go to Service page"
          className="flex flex-col items-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
        >
          <FaRupeeSign
            className="w-7 h-7 text-yellow-500 group-hover:scale-110 group-active:scale-95 transition-transform duration-150 drop-shadow"
          />
        </a>
        {/* Download CV Icon */}
        <a
          href="/ABR-CV25-12.pdf"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Download CV"
          className="flex flex-col items-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          onClick={e => {
            e.preventDefault();
            window.open("/ABR-CV25-12.pdf", "_blank");
            const link = document.createElement("a");
            link.href = "/ABR-CV25-12.pdf";
            link.download = "Abeer-Kapoor-Resume.pdf";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }}
        >
          <FiDownload
            className="w-7 h-7 text-blue-500 group-hover:scale-110 group-active:scale-95 transition-transform duration-150 drop-shadow"
          />
        </a>
        {/* LinkedIn Icon */}
        <a
          href={personalInfo.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open LinkedIn profile"
          className="flex flex-col items-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
        >
          <FaLinkedin
            className="w-7 h-7 text-sky-500 group-hover:scale-110 group-active:scale-95 transition-transform duration-150 drop-shadow"
          />
        </a>
      </div>
    </nav>
  );
};

export default FloatingNavCard;

