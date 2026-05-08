import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Intro from "../components/Intro";
import Education from "../components/Education";
import Hackathons from "../components/Hackathons";
import Projects from "../components/Projects";
import WorkExperience from "../components/WorkExperience";
import ContactMe from "../components/ContactMe";
import SkillsAndAwards from "../components/SkillsAndAwards";
import FunEvents from "../components/FunEvents";

// 3D scroll section wrapper — gives each section a subtle parallax tilt on scroll
const ScrollSection = ({ children, id, delay = 0 }: {
  children: React.ReactNode; id: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rawY = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [60, 0, 0, -20]);
  const rawOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0.8]);
  const rawScale = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.96, 1, 1, 0.99]);
  const y = useSpring(rawY, { stiffness: 80, damping: 20 });
  const scale = useSpring(rawScale, { stiffness: 80, damping: 20 });

  return (
    <motion.div
      ref={ref}
      id={id}
      style={{ y, opacity: rawOpacity, scale }}
      className="relative will-change-transform"
    >
      {children}
    </motion.div>
  );
};

const Home: React.FC = () => {
  useEffect(() => {
    if (window.location.hash) {
      setTimeout(() => {
        document.getElementById(window.location.hash.slice(1))?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, []);

  return (
    <div className="relative overflow-x-hidden">
      {/* Sticky ambient background blobs that move slowly */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.10) 0%, transparent 70%)", top: "5%", left: "-10%" }}
          animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)", top: "30%", right: "-8%" }}
          animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(14,165,233,0.07) 0%, transparent 70%)", bottom: "10%", left: "30%" }}
          animate={{ x: [0, 15, 0], y: [0, -20, 0] }}
          transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10">
        {/* Intro — no 3D scroll, it IS the entry */}
        <div id="intro" className="min-h-screen">
          <Intro />
        </div>

        <ScrollSection id="education" delay={0}>
          <Education />
        </ScrollSection>

        <ScrollSection id="hackathons" delay={0.1}>
          <Hackathons />
        </ScrollSection>

        <ScrollSection id="skills" delay={0}>
          <SkillsAndAwards />
        </ScrollSection>

        <ScrollSection id="projects" delay={0}>
          <Projects />
        </ScrollSection>

        <ScrollSection id="work" delay={0}>
          <WorkExperience />
        </ScrollSection>

        <ScrollSection id="events" delay={0}>
          <FunEvents />
        </ScrollSection>

        <ScrollSection id="contact" delay={0}>
          <ContactMe />
        </ScrollSection>
      </div>
    </div>
  );
};

export default Home;
