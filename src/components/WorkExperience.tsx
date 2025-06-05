import React from "react";
import { motion } from "framer-motion";
// import { fadeInUp } from "../utils/animations";

import internIcon from "../assets/illustrations/internship-logo.png";

const experiences = [
  {
    role: "Java Intern",
    company: "Innodeed Software Solutions",
    duration: "June 2023 – July 2023",
    description:
      "Worked on Java-based backend modules, learned industrial software practices, code versioning, and agile development workflow.",
    icon: internIcon,
  },
  {
    role: "Freelance Data Analyst",
    company: "Independent Projects",
    duration: "2023 – Present",
    description:
      "Delivered data-driven insights and visualizations for local businesses and startups using Python, Pandas, and Tableau.",
    icon: internIcon,
  },
];

const containerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const WorkExperience: React.FC = () => {
  return (
    <section
      id="workexperience"
      className="min-h-screen py-20 px-6 bg-gradient-to-tr  text-white"
    >
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-5xl font-extrabold mb-16 underline underline-offset-8 decoration-purple-500 tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Work Experience
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
          variants={containerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              className="relative bg-black/40 backdrop-blur-md border border-purple-700 rounded-3xl p-8 shadow-[0_0_20px_rgba(139,92,246,0.5)]
                hover:shadow-[0_0_30px_rgba(99,210,255,0.7)] hover:scale-[1.04] transition-transform duration-400 cursor-default"
              variants={cardVariants}
            >
              {/* Icon Circle */}
              <div
                className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-600
                  p-1 shadow-lg"
              >
                <img
                  src={exp.icon}
                  alt={`${exp.company} logo`}
                  className="w-full h-full rounded-full object-cover filter drop-shadow-lg"
                />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500">
                {exp.role}
              </h3>

              <p className="mt-1 text-lg font-semibold text-gray-300">{exp.company}</p>
              <p className="mt-1 text-sm italic text-gray-500">{exp.duration}</p>

              <p className="mt-4 text-gray-300 text-base leading-relaxed">{exp.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WorkExperience;
