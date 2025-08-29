import profilePic from "../assets/illustrations/profile-picture.png";
import personalInfo from "../data/personal_info.json";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaXTwitter, FaDownload } from "react-icons/fa6";
// import pdfFile from '../assets/ABR-CV25-11.pdf'; // Unused import removed


const Intro = () => {
  return (
    <section className="pt-32 pb-24 px-4 bg-gradient-to-br from-[#1e293b] via-[#0f172a] to-[#312e81] text-white min-h-[80vh] flex items-center justify-center">
      <div className="w-full flex flex-col items-center gap-9">
        {/* Name */}
        <motion.h1
            className="text-7xl md:text-8xl font-extrabold text-transparent bg-clip-text
             bg-gradient-to-r from-blue-400 via-pink-400 to-purple-500
             text-center drop-shadow-[0_0_45px_rgba(180,120,255,0.35)] mb-4 tracking-tight"
            initial={{ y: 32, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
          {personalInfo.name}
        </motion.h1>
        {/* Profile Image with effect */}
        <div className="relative group">
          {/* Glowing effect behind image, default white, transitions to pink/blue/red on hover */}
          <div className="absolute inset-0 rounded-full blur-2xl opacity-70 bg-white animate-pulse z-0 group-hover:bg-gradient-to-tr group-hover:from-pink-400 group-hover:via-blue-400 group-hover:to-red-500 group-hover:opacity-90 group-hover:animate-none transition-all duration-500"></div>
          <img
            src={profilePic}
            alt="Profile"
            className="w-44 h-44 md:w-60 md:h-60 rounded-full object-cover border-4 border-cyan-400 shadow-2xl grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500 relative z-10"
          />
          <span className="absolute top-2 left-2 text-3xl animate-pulse z-10"></span>
        </div>
        {/* Headline */}
        <motion.h2
            className="text-2xl md:text-3xl font-bold text-white text-center mb-2
             drop-shadow-[0_0_20px_rgba(255,255,255,0.35)] tracking-tight"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
          Full-Stack & AI Engineer | Hackathon Winner | Data Science Enthusiast
        </motion.h2>
        {/* Description */}
        <p className="text-lg md:text-xl text-gray-100 text-center max-w-3xl mb-4 font-medium">
          I craft ultra-modern,  scalable digital experiences for startups & enterprises— from AI-powered apps to business ecosystems — I turn ideas into impactful products with speed, precision, and creativity
        </p>
        {/* Socials & CV */}
        <div className="flex flex-wrap gap-4 justify-center mt-4 mb-8">
          {/* LinkedIn */}
          <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gray-900 text-cyan-400 border border-cyan-700 shadow hover:bg-cyan-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-200 font-medium"
              aria-label="LinkedIn"
          >
            <FaLinkedin className="w-5 h-5" />
            <span>LinkedIn</span>
          </a>

          {/* GitHub */}
          <a href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gray-900 text-gray-200 border border-gray-700 shadow-md hover:shadow-purple-500/60 hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 font-medium hover:drop-shadow-[0_0_12px_rgba(180,120,255,0.7)]"
              aria-label="GitHub"
          >
            <FaGithub className="w-5 h-5" />
            <span>GitHub</span>
          </a>

          {/* X (Twitter) */}
          <a
              href="https://x.com/AbeerKapoor1/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gray-900 text-blue-400 border border-blue-700 shadow-md hover:shadow-blue-500/60 hover:bg-blue-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 font-medium hover:drop-shadow-[0_0_12px_rgba(59,130,246,0.7)]"
              aria-label="X"
          >
            <FaXTwitter className="w-5 h-5" />
            <span>X</span>
          </a>

          {/* Download CV */}
      <a
        href="/ABR-CV25-11.pdf"
              download
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gray-900 text-purple-400 border border-purple-700 shadow-md hover:shadow-purple-500/60 hover:bg-purple-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-200 font-medium hover:drop-shadow-[0_0_12px_rgba(168,85,247,0.7)]"
              aria-label="Download CV"
          >
            <FaDownload className="w-5 h-5" />
            <span>Download CV</span>
          </a>
        </div>

      </div>
    </section>
  );
};

export default Intro;
