import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { unifiedData } from "../data/unifiedData";
import { Code, Brain, Trophy, Sparkles, X } from "lucide-react";
import { useInsForge } from "../hooks/useInsForge";
import { fetchAchievements, type Achievement } from "../lib/api";
import {
  FaReact, FaPython, FaJava, FaNodeJs,
  FaDatabase, FaHtml5, FaCss3Alt, FaJsSquare, FaGitAlt,
} from "react-icons/fa";
import { SiTypescript, SiNextdotjs, SiFastapi, SiTailwindcss } from "react-icons/si";

interface Skill { name: string; level: number; emoji: string; category?: string; description?: string; }

const skillIcons: { [k: string]: React.ReactNode } = {
  "React.js":  <FaReact className="text-cyan-500 w-5 h-5 sm:w-6 sm:h-6" />,
  "Python":    <FaPython className="text-amber-500 w-5 h-5 sm:w-6 sm:h-6" />,
  "Java":      <FaJava className="text-red-500 w-5 h-5 sm:w-6 sm:h-6" />,
  "Node.js":   <FaNodeJs className="text-green-500 w-5 h-5 sm:w-6 sm:h-6" />,
  "SQL (PostgreSQL, MySQL)": <FaDatabase className="text-blue-500 w-5 h-5 sm:w-6 sm:h-6" />,
  "HTML":      <FaHtml5 className="text-orange-500 w-5 h-5 sm:w-6 sm:h-6" />,
  "CSS":       <FaCss3Alt className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6" />,
  "JavaScript": <FaJsSquare className="text-yellow-500 w-5 h-5 sm:w-6 sm:h-6" />,
  "Git/GitHub": <FaGitAlt className="text-orange-500 w-5 h-5 sm:w-6 sm:h-6" />,
  "TypeScript": <SiTypescript className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6" />,
  "Next.js":   <SiNextdotjs className="text-gray-800 w-5 h-5 sm:w-6 sm:h-6" />,
  "FastAPI":   <SiFastapi className="text-teal-600 w-5 h-5 sm:w-6 sm:h-6" />,
  "Tailwind CSS": <SiTailwindcss className="text-cyan-500 w-5 h-5 sm:w-6 sm:h-6" />,
};

const levelColor = (lvl: number) => {
  if (lvl >= 88) return { bg: "from-amber-400 to-orange-400", text: "text-amber-700", badge: "bg-amber-50 border-amber-200" };
  if (lvl >= 75) return { bg: "from-indigo-400 to-violet-500", text: "text-indigo-700", badge: "bg-indigo-50 border-indigo-200" };
  return { bg: "from-teal-400 to-cyan-400", text: "text-teal-700", badge: "bg-teal-50 border-teal-200" };
};

const SkillPill = ({ skill, index }: { skill: Skill; index: number }) => {
  const [tooltip, setTooltip] = useState(false);
  const { bg, badge, text } = levelColor(skill.level);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: index * 0.04, type: "spring", stiffness: 200 }}
      whileHover={{ y: -4, scale: 1.05 }}
      className="relative cursor-default"
      onMouseEnter={() => setTooltip(true)}
      onMouseLeave={() => setTooltip(false)}
    >
      <div
        className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl border shadow-sm hover:shadow-md transition-all duration-200 ${badge}`}
        style={{
          background: "rgba(255,255,255,0.75)",
          backdropFilter: "blur(12px)",
        }}
      >
        {/* Icon circle */}
        <div className="w-8 h-8 rounded-xl bg-white shadow-sm border border-white/80 flex items-center justify-center flex-shrink-0">
          {skillIcons[skill.name] || (
            <span className="text-base">{skill.emoji}</span>
          )}
        </div>
        {/* Name + bar */}
        <div className="min-w-0">
          <p className={`text-xs sm:text-sm font-bold ${text} truncate`}>{skill.name}</p>
          <div className="w-16 sm:w-20 h-1.5 rounded-full bg-gray-200/80 mt-1 overflow-hidden">
            <motion.div
              className={`h-full rounded-full bg-gradient-to-r ${bg}`}
              initial={{ width: 0 }}
              animate={{ width: `${skill.level}%` }}
              transition={{ delay: index * 0.04 + 0.2, duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </div>
        {/* Level badge */}
        <span className={`text-[10px] font-bold ${text} ml-auto flex-shrink-0`}>{skill.level}%</span>
      </div>

      {/* Tooltip */}
      <AnimatePresence>
        {tooltip && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-40 w-52 p-3 rounded-2xl text-xs text-left pointer-events-none"
            style={{
              background: "rgba(255,255,255,0.95)",
              backdropFilter: "blur(16px)",
              border: "1.5px solid rgba(255,255,255,0.9)",
              boxShadow: "0 8px 32px rgba(99,102,241,0.18)"
            }}
          >
            <p className="font-bold text-indigo-800 mb-1">{skill.name}</p>
            <p className="text-gray-600 leading-relaxed">{skill.description || "Core skill used across shipped products."}</p>
            {skill.category && <p className="mt-1.5 text-indigo-500 font-semibold">{skill.category}</p>}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const SkillsAndAwards = () => {
  const [activeTab, setActiveTab] = useState<"technical" | "soft">("technical");
  const [expandedAward, setExpandedAward] = useState<Achievement | null>(null);
  const { data: awards } = useInsForge<Achievement[]>(fetchAchievements, []);
  const awardList = Array.isArray(awards) ? awards : [];
  const skills = activeTab === "technical" ? unifiedData.skills.technical : unifiedData.skills.soft;

  return (
    <section className="section-light py-16 sm:py-28 relative overflow-hidden">
      <div className="orb orb-indigo w-96 h-96 -top-20 -left-20 opacity-18" />
      <div className="orb orb-violet w-72 h-72 bottom-0 right-0 opacity-15" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} className="text-center mb-12"
        >
          <motion.div className="text-5xl sm:text-7xl mb-4 inline-block"
            animate={{ rotate: [0, -8, 8, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity }}>🌟</motion.div>
          <h2 className="text-3xl sm:text-5xl font-extrabold mb-3" style={{
            background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 60%, #06b6d4 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"
          }}>Skills & Power-ups</h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base font-medium">
            Every skill earned by actually building things.
          </p>
        </motion.div>

        {/* Tab toggle */}
        <div className="flex justify-center mb-10">
          <div
            className="flex p-1 rounded-2xl gap-1"
            style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.8)", boxShadow: "0 4px 16px rgba(99,102,241,0.10)" }}
          >
            {(["technical", "soft"] as const).map(tab => (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 px-5 sm:px-7 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${activeTab === tab ? "text-white shadow-md" : "text-gray-500 hover:text-indigo-600"}`}
                style={activeTab === tab ? {
                  background: "linear-gradient(135deg, #6366f1, #7c3aed)"
                } : {}}
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              >
                {tab === "technical" ? <Code className="w-4 h-4" /> : <Brain className="w-4 h-4" />}
                {tab === "technical" ? "Tech Skills" : "Soft Skills"}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Skills grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.35 }}
            className="rounded-3xl p-6 sm:p-8 mb-14"
            style={{
              background: "rgba(255,255,255,0.55)",
              backdropFilter: "blur(20px)",
              border: "1.5px solid rgba(255,255,255,0.72)",
              boxShadow: "0 12px 40px rgba(99,102,241,0.10)"
            }}
          >
            <div className="flex items-center gap-2.5 mb-7">
              <div className="p-2.5 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 shadow-md">
                {activeTab === "technical" ? <Code className="w-5 h-5 text-white" /> : <Brain className="w-5 h-5 text-white" />}
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-indigo-900">
                {activeTab === "technical" ? "Technical Arsenal" : "Human Superpowers"}
              </h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {skills.map((skill, i) => (
                <SkillPill key={skill.name} skill={skill} index={i} />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Awards / Hall of Fame */}
        <motion.div
          initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <motion.div className="text-4xl sm:text-5xl mb-3 inline-block"
              animate={{ y: [0, -6, 0] }} transition={{ duration: 2.5, repeat: Infinity }}>🏆</motion.div>
            <h3 className="text-2xl sm:text-3xl font-extrabold" style={{
              background: "linear-gradient(135deg, #f59e0b, #f97316)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"
            }}>Hall of Fame</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {awardList.map((award, index) => (
              <motion.div
                key={award.id || award.title}
                initial={{ opacity: 0, y: 20, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                whileHover={{ y: -6, scale: 1.025 }}
                onClick={() => setExpandedAward(award)}
                className="group cursor-pointer rounded-2xl overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.68)",
                  backdropFilter: "blur(18px)",
                  border: "1.5px solid rgba(255,255,255,0.78)",
                  boxShadow: "0 8px 28px 0 rgba(251,146,60,0.10)"
                }}
              >
                <div className="h-1 w-full bg-gradient-to-r from-amber-400 to-orange-400" />
                <div className="p-4 sm:p-5">
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="p-1.5 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-sm flex-shrink-0">
                      <Trophy className="w-3.5 h-3.5 text-white" />
                    </div>
                    <h4 className="font-bold text-gray-900 text-sm group-hover:text-amber-700 transition-colors line-clamp-1">{award.title}</h4>
                  </div>
                  <p className="text-gray-500 text-xs leading-relaxed mb-3 line-clamp-2">{award.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-amber-600 font-bold">{award.year}</span>
                    <div className="flex gap-0.5">
                      {[0, 1, 2].map(i => (
                        <Sparkles key={i} className="w-3 h-3 text-amber-400"
                          style={{ animationDelay: `${i * 0.2}s`, animation: "pulse 1.5s infinite" }} />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Award modal */}
      <AnimatePresence>
        {expandedAward && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(30,27,60,0.4)", backdropFilter: "blur(10px)" }}
            onClick={() => setExpandedAward(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 24 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 24 }}
              onClick={e => e.stopPropagation()}
              className="relative w-full max-w-sm rounded-3xl overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.90)",
                backdropFilter: "blur(24px)",
                border: "1.5px solid rgba(255,255,255,0.85)",
                boxShadow: "0 24px 64px rgba(251,146,60,0.22)"
              }}
            >
              <div className="h-1.5 w-full bg-gradient-to-r from-amber-400 to-orange-500" />
              <div className="p-6">
                <button onClick={() => setExpandedAward(null)}
                  className="absolute top-4 right-4 p-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors">
                  <X className="w-4 h-4 text-gray-600" />
                </button>
                <div className="text-4xl mb-3">🏆</div>
                <h3 className="text-lg font-extrabold text-gray-900 mb-2">{expandedAward.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">{expandedAward.description}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="chip">{expandedAward.year}</span>
                  {expandedAward.organization && <span className="chip">{expandedAward.organization}</span>}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default SkillsAndAwards;
