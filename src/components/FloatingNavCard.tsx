import React from "react";
import { FaRupeeSign } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { FaLinkedin } from "react-icons/fa";
import personalInfo from "../data/personal_info.json";

const RESUME = "/Abeer_Kapoor_Resume_v26.17.pdf";

const FloatingNavCard: React.FC = () => {
  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open(RESUME, "_blank");
    const link = document.createElement("a");
    link.href = RESUME;
    link.download = "Abeer_Kapoor_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <nav
      aria-label="Mobile quick navigation"
      className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 md:hidden flex items-center justify-center"
    >
      <div
        className="backdrop-blur-xl bg-white/70 shadow-2xl rounded-2xl flex gap-7 px-7 py-3.5 border border-white/50"
        style={{ boxShadow: "0 8px 32px 0 rgba(99,102,241,0.18), 0 1.5px 0 0 rgba(255,255,255,0.6) inset" }}
      >
        <a href="/services" aria-label="Services" className="flex flex-col items-center group focus:outline-none">
          <FaRupeeSign className="w-6 h-6 text-amber-500 group-hover:scale-110 group-active:scale-95 transition-transform" />
        </a>
        <a
          href={RESUME}
          aria-label="Download Resume"
          onClick={handleDownload}
          className="flex flex-col items-center group focus:outline-none"
        >
          <FiDownload className="w-6 h-6 text-indigo-500 group-hover:scale-110 group-active:scale-95 transition-transform" />
        </a>
        <a
          href={personalInfo.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="flex flex-col items-center group focus:outline-none"
        >
          <FaLinkedin className="w-6 h-6 text-sky-500 group-hover:scale-110 group-active:scale-95 transition-transform" />
        </a>
      </div>
    </nav>
  );
};

export default FloatingNavCard;
