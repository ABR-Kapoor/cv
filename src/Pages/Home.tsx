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

const Home: React.FC = () => {
  useEffect(() => {
    if (window.location.hash) {
      const element = document.getElementById(window.location.hash.slice(1));
      element?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div className={`relative overflow-x-hidden "bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900"`}>
      {/* Content Sections with entrance effects */}
      <div className="relative">
        <motion.section id="intro" className="min-h-screen" initial="initial" animate="animate" variants={fadeInUp}>
          <Intro />
        </motion.section>

        <motion.section id="education" initial="initial" animate="animate" variants={fadeInUp}>
          <Education />
        </motion.section>

        <motion.section id="hackathons" initial="initial" animate="animate" variants={fadeInUp}>
          <Hackathons />
        </motion.section>

        <motion.section id="skills" initial="initial" animate="animate" variants={fadeInUp}>
          <SkillsAndAwards  />
        </motion.section>

        <motion.section id="projects" initial="initial" animate="animate" variants={fadeInUp}>
          <Projects />
        </motion.section>

        <motion.section id="work" initial="initial" animate="animate" variants={fadeInUp}>
          <WorkExperience />
        </motion.section>

        <motion.section id="events" initial="initial" animate="animate" variants={fadeInUp}>
          <FunEvents  />
        </motion.section>

        <motion.section id="contact" initial="initial" animate="animate" variants={fadeInUp}>
          <ContactMe />
        </motion.section>
      </div>
    </div>
  );
};

export default Home;
