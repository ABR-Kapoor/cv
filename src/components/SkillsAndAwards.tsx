import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { unifiedData } from "../data/unifiedData";
import { Code, Brain, Trophy, Sparkles } from "lucide-react";
import {
  FaReact,
  FaPython,
  FaJava,
  FaNodeJs,
  FaDatabase,
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaGitAlt,
} from "react-icons/fa";

interface Skill {
  name: string;
  level: number;
  emoji: string;
  category?: string;
  description?: string;
}

const skillIcons: { [key: string]: React.ReactNode } = {
  "React.js": <FaReact className="text-cyan-400 w-6 h-6 sm:w-8 sm:h-8" />,
  Python: <FaPython className="text-yellow-400 w-6 h-6 sm:w-8 sm:h-8" />,
  Java: <FaJava className="text-red-500 w-6 h-6 sm:w-8 sm:h-8" />,
  "Node.js": <FaNodeJs className="text-green-500 w-6 h-6 sm:w-8 sm:h-8" />,
  "SQL (PostgreSQL, MySQL)": <FaDatabase className="text-blue-400 w-6 h-6 sm:w-8 sm:h-8" />,
  HTML: <FaHtml5 className="text-orange-500 w-6 h-6 sm:w-8 sm:h-8" />,
  CSS: <FaCss3Alt className="text-blue-500 w-6 h-6 sm:w-8 sm:h-8" />,
  JavaScript: <FaJsSquare className="text-yellow-300 w-6 h-6 sm:w-8 sm:h-8" />,
  Git: <FaGitAlt className="text-orange-400 w-6 h-6 sm:w-8 sm:h-8" />,
};

const SkillNode = ({
  skill,
  index,
  isActive,
}: {
  skill: Skill;
  index: number;
  isActive: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative cursor-pointer group flex flex-row items-center gap-4 flex-wrap md:flex-nowrap ${
        isActive ? "z-20" : "z-10"
      }`}
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 0.9, rotate: 0 }}
      transition={{
        delay: index * 0.1,
        type: "spring",
        bounce: 0.7,
        duration: 0.7,
      }}
      whileHover={{
        scale: 1.05,
        y: -8,
        boxShadow:
          "0 0 25px 8px rgba(6,182,212,0.18), 0 0 40px 16px rgba(168,85,247,0.15)",
        filter: "brightness(1.1)",
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        borderRadius: "1.5rem",
        background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
        boxShadow: "0 2px 8px 0 rgba(0,0,0,0.12)",
        border: "1.5px solid #334155",
        padding: "0.5rem 1.2rem",
        display: "flex",
        alignItems: "center",
  minWidth: "120px",
  minHeight: "56px",
      }}
    >
      {/* Circular Tech Tool Icon */}
      <div
        className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-slate-800 via-gray-800 to-gray-900 shadow-lg flex items-center justify-center border border-white/20"
      >
        {/* Animated Ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-transparent"
          style={{
            background: `conic-gradient(from 0deg, transparent, ${
              skill.level >= 90
                ? "#fbbf24"
                : skill.level >= 75
                ? "#a855f7"
                : skill.level >= 60
                ? "#06b6d4"
                : "#6b7280"
            }, transparent)`,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        {/* Icon */}
        <div className="relative w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-slate-900/90 backdrop-blur-sm flex items-center justify-center border border-white/10">
          {skillIcons[skill.name] || (
            <span className="text-2xl sm:text-3xl filter drop-shadow-lg">{skill.emoji}</span>
          )}
        </div>
      </div>
      {/* Skill Name */}
  <span className="text-sm sm:text-lg text-cyan-300 font-semibold drop-shadow-lg ml-2 sm:ml-3">
        {skill.name}
      </span>
      {/* Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.95 }}
            animate={{ opacity: 1, y: -24, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute left-1/2 z-30 px-2 py-2 sm:px-5 sm:py-4 rounded-2xl border border-cyan-400/40 shadow-2xl w-48 sm:w-80 text-gray-100 text-xs sm:text-base text-left pointer-events-auto bg-gradient-to-br from-slate-900 via-gray-800 to-gray-900"
            style={{
              bottom: "calc(100% + 12px)",
              transform: "translateX(-50%)",
              boxShadow:
                "0 8px 32px 0 rgba(6,182,212,0.18), 0 0 0 4px rgba(168,85,247,0.10)",
              fontWeight: 500,
            }}
          >
            <div className="font-bold text-cyan-400 mb-1">{skill.name}</div>
            <div className="mb-2">{skill.description || "No description available."}</div>
            {skill.category && (
              <div className="mt-2 text-purple-400">Category: {skill.category}</div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const SkillTree = ({
  skills,
  title,
  icon,
}: {
  skills: Skill[];
  title: string;
  icon: React.ReactNode;
}) => {
  const [selectedSkill] = useState<string | null>(null);

  return (
  <div className="glass-morphism-card rounded-2xl p-2 sm:p-8 border border-white/10">
      {/* Header */}
      <motion.div
        className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <div className="p-2 sm:p-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg">
          {icon}
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
          {title}
        </h3>
      </motion.div>

      {/* Skills Grid */}
      <div className="relative">
        <motion.div
          className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400/30 via-blue-500/50 to-purple-500/30"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.5, duration: 1.5 }}
        />
  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-8 relative">
          {skills.map((skill, index) => (
            <SkillNode
              key={skill.name}
              skill={skill}
              index={index}
              isActive={selectedSkill === skill.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const SkillsAndAwards = () => {
  const [activeTab, setActiveTab] = useState<"technical" | "soft">("technical");

  return (
    <section className="py-12 sm:py-20 bg-gray-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-40 h-40 sm:w-64 sm:h-64 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 sm:w-64 sm:h-64 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-16"
        >
          <motion.div
            className="text-4xl sm:text-6xl mb-2 sm:mb-4 cursor-pointer animate-float"
            whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
          >
            🌟
          </motion.div>
          <h2 className="text-3xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 mb-2 sm:mb-4 animate-gradient">
            Skill Constellation
          </h2>
          <p className="text-gray-400 max-w-xl sm:max-w-2xl mx-auto text-base sm:text-lg">
            Navigate through my skill universe - each star represents mastery earned through dedication 🚀
          </p>
        </motion.div>

        {/* Tab Switch */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-8 sm:mb-12"
        >
          <div className="glass-morphism-card rounded-full p-1 sm:p-2 border border-white/20">
            <motion.button
              onClick={() =>
                setActiveTab(activeTab === "technical" ? "soft" : "technical")
              }
              className={`flex items-center gap-1 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold transition-all duration-300 ${
                activeTab === "technical"
                  ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg"
                  : "text-gray-400 hover:text-white"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {activeTab === "technical" ? (
                <Brain className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <Code className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
              {activeTab === "technical" ? "Soft Skills" : "Tech Skills"}
            </motion.button>
          </div>
        </motion.div>

        {/* Skills Tree */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
          >
            {activeTab === "technical" ? (
              <SkillTree
                skills={unifiedData.skills.technical}
                title="Technical Arsenal"
                icon={<Code className="w-5 h-5 sm:w-6 sm:h-6 text-white" />}
              />
            ) : (
              <SkillTree
                skills={unifiedData.skills.soft}
                title="Human Superpowers"
                icon={<Brain className="w-5 h-5 sm:w-6 sm:h-6 text-white" />}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Awards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-20"
        >
          <div className="text-center mb-8 sm:mb-12">
            <motion.div className="text-3xl sm:text-5xl mb-2 sm:mb-4 animate-bounce-gentle">🏆</motion.div>
            <h3 className="text-xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-2 sm:mb-4">
              Hall of Fame
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {unifiedData.awards.map((award, index) => (
              <motion.div
                key={award.title}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{
                  scale: 1.04,
                  y: -6,
                  boxShadow: "0 12px 30px rgba(251,191,36,0.25)",
                  borderColor: "rgba(251,191,36,0.6)",
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                whileTap={{ scale: 0.97, transition: { duration: 0.2 } }}
                className="glass-morphism-card rounded-lg sm:rounded-xl p-4 sm:p-6 border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300 group"
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-4">
                  <div className="p-1 sm:p-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500">
                    <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <h4 className="font-bold text-white group-hover:text-yellow-400 transition-colors text-sm sm:text-base">
                    {award.title}
                  </h4>
                </div>
                <p className="text-gray-400 text-xs sm:text-sm mb-2 sm:mb-3">{award.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-yellow-400 font-semibold">
                    {award.year}
                  </span>
                  <div className="flex gap-1">
                    {[...Array(3)].map((_, i) => (
                      <Sparkles
                        key={i}
                        className="w-2 h-2 sm:w-3 sm:h-3 text-yellow-400 animate-pulse"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsAndAwards;
