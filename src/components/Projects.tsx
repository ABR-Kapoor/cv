import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

import project1Img from "../assets/illustrations/project1.jpg";
import project2Img from "../assets/illustrations/project2.jpg";
import project3Img from "../assets/illustrations/project3.png";

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.3,
    },
  },
};

const fadeInUpBounce = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 15,
    },
  },
};

const shineAnimation = {
  animate: {
    x: ["-100%", "150%"],
    transition: {
      duration: 1.8,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

const projects = [
  {
    title: "LalaAm – Smart Agriculture Assistant",
    description:
      "AI-powered assistant designed for farmers to optimize irrigation, crop health, and resource planning. Recognized in INAE Hackathon.",
    img: project1Img,
    tech: ["Python", "Flask", "OpenCV", "ML"],
  },
  {
    title: "Zomato Data Analysis",
    description:
      "Analyzed user patterns and restaurant performance using real Zomato data. Suggested location-based business decisions.",
    img: project2Img,
    tech: ["Python", "Pandas", "Seaborn", "Matplotlib"],
  },
  {
    title: "Portfolio Website",
    description:
      "Fully responsive React + Tailwind portfolio showcasing skills, projects, and animations using Framer Motion.",
    img: project3Img,
    tech: ["React", "Tailwind", "Framer Motion"],
  },
];

const Projects: React.FC = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.25 });

  React.useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  return (
    <section
      id="projects"
      className="min-h-screen w-full py-24 px-6 bg-gradient-to-br  text-white relative overflow-hidden"
    >
      {/* Background subtle glow */}
      <div
        // aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-radial from-purple-900 via-transparent to-transparent opacity-30"
      />

      <div className="max-w-7xl mx-auto text-left">
        <motion.h2
          className="relative inline-block text-6xl font-extrabold mb-14 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400 select-none"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
        Projects
          <motion.span
            className="absolute top-2 left-0 w-24 h-12 bg-white/20 blur-lg rounded-full pointer-events-none"
            style={{ mixBlendMode: "screen" }}
            variants={shineAnimation}
            animate="animate"
          />
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-15"
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={controls}
        >
          {projects.map((project, index) => (
            <motion.article
              key={index}
              className="relative bg-gray-800 bg-opacity-90 rounded-3xl shadow-[0_10px_30px_rgba(255,192,203,0.3)] hover:shadow-[0_20px_60px_rgba(255,105,180,0.6)] cursor-pointer transform-gpu will-change-transform"
              variants={fadeInUpBounce}
              whileHover={{
                scale: 1.06,
                rotateX: 4,
                rotateY: -5,
                boxShadow:
                  "0 30px 60px rgba(255,105,180,0.9), 0 0 20px rgba(255,192,203,0.8)",
              }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              tabIndex={0}
              aria-label={`Project titled ${project.title}`}
            >
              <div className="overflow-hidden rounded-2xl relative">
                <motion.img
                  src={project.img}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-500"
                  whileHover={{ scale: 1.1 }}
                  draggable={false}
                />
                {/* Overlay glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl pointer-events-none" />
              </div>

              <div className="p-6 flex flex-col items-center">
                <h3 className="text-3xl font-bold text-pink-400 mb-3 tracking-wide drop-shadow-lg">
                  {project.title}
                </h3>
                <p className="text-gray-300 text-base mb-5 max-w-xs sm:max-w-full">
                  {project.description}
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {project.tech.map((tech, idx) => (
                    <motion.span
                      key={idx}
                      className="inline-block px-4 py-1 rounded-full text-sm font-semibold cursor-default select-none shadow-md"
                      style={{
                        background:
                          "linear-gradient(135deg, #ec4899, #f43f5e, #fbbf24)",
                        color: "white",
                        textShadow:
                          "0 0 3px rgba(255,182,193,0.8), 0 0 6px rgba(255,105,180,0.7)",
                      }}
                      whileHover={{
                        scale: 1.1,
                        boxShadow:
                          "0 0 12px rgba(255,182,193,0.9), 0 0 18px rgba(255,105,180,0.8)",
                        filter: "brightness(1.2)",
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
