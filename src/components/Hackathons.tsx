import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import hackathon1 from "../assets/illustrations/hackathon1.jpg";
import hackathon2 from "../assets/illustrations/hackathon2.jpg";
import learningChart from "../assets/illustrations/hackathon-learn-chart.jpg";

const Hackathons = () => {
  return (
    <div className="text-center  text-white">
      <h2 className="text-left mx-35 md:text-left text-4xl md:text-6xl font-extrabold tracking-tight mb-10 bg-gradient-to-r from-yellow-400 via-pink-500 to-blue-500 bg-clip-text text-transparent leading-tight">
        Hackathons
      </h2>
      <div className="flex flex-col md:flex-row justify-center items-center gap-10">
        {[
          {
            img: hackathon1,
            title: "IIT Bhilai",
            desc: "3rd Prize – Project LalaAm",
          },
          {
            img: hackathon2,
            title: "IIM Raipur",
            desc: "Policy Hackathon – Agri-Tech",
          },
        ].map((hack, index) => (
          <Tilt
            key={index}
            glareEnable={true}
            glareMaxOpacity={0.35}
            scale={1.05}
            transitionSpeed={1000}
            tiltMaxAngleX={10}
            tiltMaxAngleY={10}
            className="w-full md:w-1/3"
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.3, duration: 0.6 }}
              className="p-4 bg-gray-900 rounded-2xl shadow-xl hover:shadow-blue-500/40 border border-gray-700 hover:border-blue-500"
            >
              <img
                src={hack.img}
                alt={hack.title}
                className="rounded-xl mb-4 hover:scale-105 transition-transform duration-300"
              />
              <p className="text-lg font-semibold text-blue-400">
                {hack.title}
              </p>
              <p className="text-sm text-gray-300">{hack.desc}</p>
            </motion.div>
          </Tilt>
        ))}
      </div>

      <motion.div
        className="mt-16"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="text-3xl font-bold mb-6 underline decoration-blue-500 decoration-4 underline-offset-4">
          📊 What I Learned
        </h3>
        <img
          src={learningChart}
          alt="Hackathon Learnings Chart"
          className="rounded-lg mx-auto w-4/5 max-w-3xl hover:scale-105 transition-transform duration-300 shadow-lg"
        />
      </motion.div>
    </div>
  );
};

export default Hackathons;
