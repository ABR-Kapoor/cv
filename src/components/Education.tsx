import { useState } from "react";
import { motion } from "framer-motion";
import educationData from "../data/education.json";
import { FaCalendarAlt, FaStar, FaMedal, FaBookOpen } from "react-icons/fa";
import college1 from "../assets/illustrations/college1.png";
import college2 from "../assets/illustrations/college2.png";

const collegeImages: Record<string, string> = {
  "Govt. V.Y.T. Post Graduate Autonomous College (Durg)": college2,
  "Bhilai Institute of Technology College (Bhilai)": college1,
};

type EducationType = {
  degree: string;
  college: string;
  year: string;
  cgpa?: string;
  status?: string;
  achievements: string[];
  subjects: string[];
};

const EducationCard = ({
  edu,
  imgSrc,
  flipped,
  onFlip,
}: {
  edu: EducationType;
  imgSrc: string;
  flipped: boolean;
  onFlip: () => void;
}) => {
  return (
    <motion.div
      className="w-full h-[520px] [perspective:1000px] cursor-pointer"
      onClick={onFlip}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onFlip();
        }
      }}
      tabIndex={0}
      role="button"
      aria-pressed={flipped}
    >
      <motion.div
        className="relative w-full h-full [transform-style:preserve-3d]"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        {/* Front Face */}
        <div
          className={`absolute w-full h-full rounded-2xl bg-gradient-to-r from-gray-900 to-blue-900 [backface-visibility:hidden] flex flex-col items-center justify-center gap-4 p-6 text-white`}
        >
          <img
            src={imgSrc}
            alt={`Logo of ${edu.college}`}
            className="w-32 h-32 rounded-lg shadow-lg bg-white/10 object-cover"
            loading="lazy"
          />
          <h3 className="text-2xl font-extrabold text-center text-cyan-300 drop-shadow">
            {edu.degree}
          </h3>
          <p className="text-lg text-gray-200 text-center">{edu.college}</p>
          <div className="flex items-center gap-2 text-md text-gray-300">
            <FaCalendarAlt className="text-cyan-400" /> {edu.year}
          </div>
          {edu.cgpa && (
            <div className="flex items-center gap-1 text-md text-yellow-300 font-semibold">
              <FaStar /> GPA: {edu.cgpa}
            </div>
          )}
          {edu.status && (
            <span className="text-sm text-blue-300 font-medium">
              {edu.status}
            </span>
          )}
          <span className="text-xs text-gray-400 mt-4 animate-pulse">
            Click to see more →
          </span>
        </div>

        {/* Back Face */}
        <div
          className={`absolute w-full h-full rounded-2xl bg-gradient-to-r from-blue-900 to-gray-900 [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col gap-4 p-8`}
        >
          <div className="text-white">
            <h4 className="flex items-center gap-2 font-bold text-cyan-300 mb-2 text-lg">
              <FaMedal className="text-cyan-400" /> Achievements
            </h4>
            <ul className="list-disc list-inside text-md text-gray-200 space-y-2">
              {edu.achievements.map((ach: string, i: number) => (
                <li key={i}>{ach}</li>
              ))}
            </ul>
          </div>
          <div className="text-white">
            <h4 className="flex items-center gap-2 font-bold text-green-300 mb-2 text-lg">
              <FaBookOpen className="text-green-400" /> Subjects
            </h4>
            <div className="flex flex-wrap gap-2 mt-2">
              {edu.subjects.map((subj: string, i: number) => (
                <span
                  key={i}
                  className="inline-block px-3 py-1 rounded-full bg-yellow-800 text-sm text-gray-200 hover:bg-cyan-600 transition-colors duration-300"
                >
                  {subj}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Education = () => {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  return (
    <section
      id="education"
      className="py-24 px-4 bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center"
    >
      <div className="text-center mb-16">
        <h2 className="text-5xl font-extrabold text-cyan-400 drop-shadow-lg tracking-wide">
          <motion.div
              className="text-6xl mb-4 cursor-pointer"
              whileHover={{ scale: 1.2, rotate: [0, -10, 10, -10, 10, 0] }}
          >
            🎓
          </motion.div>
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-blue-500 mb-4">
            My Academic Journey
          </h2>

        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Here's a look at my educational background, key achievements, and the subjects I've mastered along the way.
        </p>
      </div>
      {educationData.length === 0 ? (
        <div className="text-center text-gray-400 text-lg">
          No education data available.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 w-full max-w-6xl">
          {educationData.map((edu: EducationType, idx: number) => {
            const imgSrc = collegeImages[edu.college] || college1;
            return (
              <EducationCard
                key={idx}
                edu={edu}
                imgSrc={imgSrc}
                flipped={flippedIndex === idx}
                onFlip={() =>
                  setFlippedIndex(flippedIndex === idx ? null : idx)
                }
              />
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Education;