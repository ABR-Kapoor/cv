import Intro from "../components/Intro";
import Education from "../components/Education";
import Hackathons from "../components/Hackathons";
import Projects from "../components/Projects";
import WorkExperience from "../components/WorkExperience";
import ContactMe from "../components/ContactMe";
import SkillsAndAwards from "../components/SkillsAndAwards";
import FunEvents from "../components/FunEvents";

const Home = () => {
  return (

      


    <div className="bg-gradient-to-black text-white min-h-screen w-full overflow-x-hidden font-sans">
      <section id="intro" className="py-16 px-4 sm:px-8 md:px-12">
        <Intro />
      </section>
      <section id="education" className="py-16 px-4 sm:px-8 md:px-12">
        <Education />
      </section>
      <section id="hackathons" className="py-16 px-4 sm:px-8 md:px-12">
        <Hackathons />
      </section>
      <section id="skills" className="py-16 px-4 sm:px-8 md:px-12">
        <SkillsAndAwards />
      </section>
      <section id="projects" className="py-16 px-4 sm:px-8 md:px-12">
        <Projects />
      </section>
      <section id="work" className="py-16 px-4 sm:px-8 md:px-12">
        <WorkExperience />
      </section>
      <section id="contact" className="py-16 px-4 sm:px-8 md:px-12">
        <FunEvents />
      </section>
      <section id="contact" className="py-16 px-4 sm:px-8 md:px-12">
        <ContactMe />
      </section>
    </div>
  );
};

export default Home;
