import React from "react";
import { motion } from "framer-motion";
import { zoomIn } from "../utils/animations";

import hardSkillsChart from "../assets/illustrations/hard-skills-chart.png";
import softSkillsChart from "../assets/illustrations/soft-skills-chart.jpg";
import completedIcon from "../assets/illustrations/completed-icon.jpg";

const staggerContainer = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const fadeInUpDelayed = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const SkillsAndAwards: React.FC = () => {
  const hardSkills = [
    "Python",
    "JavaScript",
    "SQL",
    "Machine Learning",
    "React",
  ];
  const softSkills = [
    "Communication",
    "Problem Solving",
    "Creativity",
    "Teamwork",
    "Attention to Detail",
  ];

  const awards = [
    {
      title: "INAE Hackathon - IIT Bhilai",
      description:
        "Secured 3rd position in national-level innovation challenge for LalaAm project.",
      img: completedIcon,
    },
    {
      title: "Coursera Achiever",
      description:
        "Completed 10+ professional courses in data science and AI with distinction.",
      img: completedIcon,
    },
    {
      title: "Academic Excellence",
      description:
        "Achieved top 5% position in college with consistent performance.",
      img: completedIcon,
    },
  ];

  return (
    <>
      {/* Background glow & particles */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-tr from-[#1e2025] via-[#121214] to-[#000000]" />
      <div
        aria-hidden="true"
        className="fixed inset-0 -z-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, #ff008080, transparent 40%), radial-gradient(circle at 70% 70%, #7928ca80, transparent 40%)",
          filter: "blur(150px)",
        }}
      />

      <section
        id="skills"
        className="min-h-screen py-24 px-8 max-w-7xl mx-auto text-white relative"
      >
        <motion.h2
          className="text-6xl font-extrabold mb-20 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-400 bg-clip-text text-transparent drop-shadow-lg tracking-tight"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Skills
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-20"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {/* Hard Skills */}
          <motion.div
            className="bg-gray-900 bg-opacity-70 p-8 rounded-3xl shadow-[0_20px_50px_rgba(255,105,180,0.3)] hover:shadow-[0_25px_60px_rgba(255,105,180,0.7)] transition-shadow duration-500 cursor-pointer"
            variants={fadeInUpDelayed}
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-4xl font-semibold mb-8 text-pink-400 drop-shadow-md">
              Hard Skills
            </h3>
            <motion.img
              src={hardSkillsChart}
              alt="Hard Skills Chart"
              className="w-full h-auto rounded-2xl shadow-lg mb-8 border-4 border-pink-600"
              whileHover={{ scale: 1.07, rotate: 2 }}
              transition={{ type: "spring", stiffness: 120 }}
            />
            <ul className="space-y-3 text-left text-xl font-medium text-pink-200">
              {hardSkills.map((skill, idx) => (
                <motion.li
                  key={idx}
                  className="flex items-center gap-3"
                  whileHover={{ scale: 1.12, color: "#fb7185" }}
                  transition={{ duration: 0.25 }}
                >
                  <svg
                    className="w-6 h-6 text-pink-400 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  {skill}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Soft Skills */}
          <motion.div
            className="bg-gray-900 bg-opacity-70 p-8 rounded-3xl shadow-[0_20px_50px_rgba(110,231,183,0.3)] hover:shadow-[0_25px_60px_rgba(110,231,183,0.7)] transition-shadow duration-500 cursor-pointer"
            variants={fadeInUpDelayed}
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-4xl font-semibold mb-8 text-green-400 drop-shadow-md">
              Soft Skills
            </h3>
            <motion.img
              src={softSkillsChart}
              alt="Soft Skills Chart"
              className="w-full h-auto rounded-2xl shadow-lg mb-8 border-4 border-green-500"
              whileHover={{ scale: 1.07, rotate: -2 }}
              transition={{ type: "spring", stiffness: 120 }}
            />
            <ul className="space-y-3 text-left text-xl font-medium text-green-200">
              {softSkills.map((skill, idx) => (
                <motion.li
                  key={idx}
                  className="flex items-center gap-3"
                  whileHover={{ scale: 1.12, color: "#4ade80" }}
                  transition={{ duration: 0.25 }}
                >
                  <svg
                    className="w-6 h-6 text-green-400 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  {skill}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </section>

      <section
        id="awards"
        className="min-h-screen py-24 px-8 max-w-7xl mx-auto text-white relative"
      >
        <motion.h2
          className="text-6xl font-extrabold mb-20 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-200 bg-clip-text text-transparent drop-shadow-lg tracking-wide"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Awards
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-14"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {awards.map((award, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-b from-yellow-900 via-yellow-800 to-yellow-700 p-8 rounded-3xl shadow-[0_15px_40px_rgba(245,158,11,0.6)] hover:shadow-[0_25px_60px_rgba(245,158,11,0.9)] transition-shadow duration-400 cursor-pointer"
              variants={zoomIn}
              whileHover={{ scale: 1.08 }}
              transition={{ type: "spring", stiffness: 160 }}
            >
              <img
                src={award.img}
                alt={award.title}
                className="w-24 h-24 mx-auto mb-6 rounded-full shadow-xl border-4 border-yellow-400 hover:scale-110 transition-transform duration-300"
              />
              <h3 className="text-3xl font-extrabold mb-3 text-yellow-300 drop-shadow-md">
                {award.title}
              </h3>
              <p className="text-yellow-100 text-lg leading-relaxed">{award.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </>
  );
};

export default SkillsAndAwards;
