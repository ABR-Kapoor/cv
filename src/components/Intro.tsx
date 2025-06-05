import { motion } from "framer-motion";
import profilePic from "../assets/illustrations/profile-picture.png";

const Intro = () => {
  return (
    <section className="py-28 px-6 text-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
        {/* Profile Picture with Neon Ring Effect */}
        <motion.div
          className="relative w-44 h-44 md:w-64 md:h-64 group"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Outer Ring Glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500 via-purple-600 to-indigo-500 blur-xl opacity-30 group-hover:opacity-60 transition duration-500 animate-pulse"></div>

          {/* Inner Profile Image */}
          <div className="relative w-full h-full rounded-full overflow-hidden border-3 border-white shadow-xl shadow-purple-800/30 group-hover:shadow-2xl group-hover:shadow-cyan-500/50 transition duration-500 group-hover:border-2">
            <img
              src={profilePic}
              alt="Profile"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition duration-500 ease-in-out"
            />
          </div>
        </motion.div>

        {/* Intro Text */}
        <motion.div
          className="max-w-xl text-center md:text-left"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient-x">
            Hi, I’m Radhe
          </h1>
          <p className="text-lg md:text-xl font-light text-gray-300 leading-relaxed">
            MCA Student • Data Science & AI Enthusiast • Hackathon Winner <br /> Future-ready
            Technocrat with a Vision for Bharat 🚀
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Intro;
