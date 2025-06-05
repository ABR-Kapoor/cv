import { motion } from "framer-motion";
import college1 from "../assets/illustrations/college1.png";
import college2 from "../assets/illustrations/college2.png";
import { fadeInUp } from "../utils/animations";

const subjects1 = ["DS", "ML", "AI", "Cloud", "DSA"];
const performance1 = [90, 85, 88, 75, 95];

const subjects2 = ["Java", "OS", "DBMS", "CN", "Python"];
const performance2 = [89, 92, 87, 80, 93];

const BarChart = ({
  subjects,
  performance,
}: {
  subjects: string[];
  performance: number[];
}) => {
  return (
    <div className="w-full space-y-4">
      {subjects.map((subject, index) => (
        <div key={subject}>
          <div className="flex justify-between text-sm font-medium text-gray-400">
            <span>{subject}</span>
            <span>{performance[index]}%</span>
          </div>
          <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${performance[index]}%` }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

const Education = () => {
  return (
    <section id="education" className="py-20 px-6 text-white">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-left text-4xl md:text-5xl font-extrabold tracking-tight mb-14 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent leading-tight"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          🎓 Education <br />
          <span className="text-gray-300 text-2xl font-medium">With Tech Edge</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Undergraduate Card */}
          <motion.div
            className="bg-[#0f0f0f] p-6 rounded-2xl shadow-2xl hover:shadow-cyan-500/20 border border-gray-800 transition-shadow"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-6">
              <img src={college2} alt="BCA" className="w-16 h-16 rounded-xl" />
              <div>
                <h3 className="text-2xl font-semibold text-white">BCA</h3>
                <p className="text-gray-400 text-sm">
                  Govt. V.Y.T. P.G. Autonomous College, Durg
                </p>
              </div>
            </div>
            <BarChart subjects={subjects1} performance={performance1} />
          </motion.div>

          {/* Postgraduate Card */}
          <motion.div
            className="bg-[#0f0f0f] p-6 rounded-2xl shadow-2xl hover:shadow-purple-500/20 border border-gray-800 transition-shadow"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-6">
              <img src={college1} alt="MCA" className="w-16 h-16 rounded-xl" />
              <div>
                <h3 className="text-2xl font-semibold text-white">MCA</h3>
                <p className="text-gray-400 text-sm">Current Postgrad Institution</p>
              </div>
            </div>
            <BarChart subjects={subjects2} performance={performance2} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Education;
