import { useEffect } from "react";
import { motion } from "framer-motion";
import { fadeInUp } from "../utils/animations";
import Intro from "../components/Intro";
import Education from "../components/Education";
import Hackathons from "../components/Hackathons";
import Projects from "../components/Projects";
import WorkExperience from "../components/WorkExperience";
import ContactMe from "../components/ContactMe";
import SkillsAndAwards from "../components/SkillsAndAwards";
import FunEvents from "../components/FunEvents";

const Home: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  // Handle hash navigation
  useEffect(() => {
    if (window.location.hash) {
      const element = document.getElementById(window.location.hash.slice(1));
      element?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div className={`relative overflow-x-hidden ${darkMode ? "bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900" : "bg-gradient-to-b from-[#FFF8E7] via-[#F5E9DA] to-[#FFF8E7]"}`}>
      {/* Content Sections with entrance effects */}
      <div className="relative">
        <motion.section id="intro" className="min-h-screen" initial="initial" animate="animate" variants={fadeInUp}>
          <Intro darkMode={darkMode} />
        </motion.section>

        <motion.section id="education" initial="initial" animate="animate" variants={fadeInUp}>
          <Education darkMode={darkMode} />
        </motion.section>

        <motion.section id="hackathons" initial="initial" animate="animate" variants={fadeInUp}>
          <Hackathons darkMode={darkMode} />
        </motion.section>

        <motion.section id="skills" initial="initial" animate="animate" variants={fadeInUp}>
          <SkillsAndAwards darkMode={darkMode} />
        </motion.section>

        <motion.section id="projects" initial="initial" animate="animate" variants={fadeInUp}>
          <Projects darkMode={darkMode} />
        </motion.section>

        <motion.section id="work" initial="initial" animate="animate" variants={fadeInUp}>
          <WorkExperience darkMode={darkMode} />
        </motion.section>

        <motion.section id="events" initial="initial" animate="animate" variants={fadeInUp}>
          <FunEvents darkMode={darkMode} />
        </motion.section>

        <motion.section id="contact" initial="initial" animate="animate" variants={fadeInUp}>
          <ContactMe darkMode={darkMode} />
        </motion.section>
      </div>
    </div>
  );
};

export default Home;
