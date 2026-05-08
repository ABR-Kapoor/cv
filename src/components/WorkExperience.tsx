import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Star, Trophy, ChevronDown } from "lucide-react";
import { unifiedData } from "../data/unifiedData";

const WorkCard = ({ experience, index }: {
  experience: typeof unifiedData.experience[0];
  index: number;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className="relative pl-8 sm:pl-0"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.15 }}
    >
      {/* Timeline dot */}
      <div className="absolute left-0 sm:left-1/2 top-8 sm:-translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 shadow-md shadow-indigo-200 z-10 border-2 border-white">
        <motion.div className="absolute inset-0 rounded-full bg-indigo-400 opacity-40"
          animate={{ scale: [1, 1.8, 1] }} transition={{ duration: 2.5, repeat: Infinity }} />
      </div>

      <div className={`sm:w-[calc(50%-2rem)] ${index % 2 === 0 ? "sm:ml-auto sm:pl-10" : "sm:mr-auto sm:pr-10"}`}>
        <motion.div
          className="glass-card rounded-2xl overflow-hidden glass-card-hover"
          whileHover={{ y: -4 }}
        >
          {/* Colored accent bar */}
          <div className={`h-1.5 w-full bg-gradient-to-r ${index === 0 ? "from-indigo-400 via-violet-400 to-cyan-400" : "from-cyan-400 via-blue-400 to-indigo-400"}`} />

          <div className="p-5 sm:p-7">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-display font-bold text-base sm:text-lg mb-0.5" style={{ color: "var(--text-primary)", letterSpacing: "-0.015em" }}>{experience.role}</h3>
                <p className="font-medium text-sm" style={{ color: "var(--accent-primary)" }}>{experience.company}</p>
              </div>
              <span
                className="font-mono text-xs px-2 py-0.5 rounded"
                style={{ background: "rgba(79,70,229,0.08)", color: "var(--accent-primary)", fontSize: "0.65rem" }}
              >
                {index === 0 ? "Current" : "Past"}
              </span>
            </div>

          <div className="flex items-center gap-1.5 text-xs mb-4" style={{ color: "var(--text-muted)" }}>
              <Calendar className="w-3.5 h-3.5" style={{ color: "var(--accent-primary)" }} />
              <span className="font-mono" style={{ fontSize: "0.7rem" }}>{experience.duration}</span>
            </div>

            <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>{experience.description}</p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-4">
              {experience.techStack.map((tech: string, i: number) => (
                <motion.span
                  key={tech}
                  className="chip text-xs"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>

            {/* Expand highlights */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1.5 text-xs text-indigo-500 hover:text-indigo-700 font-semibold mb-2 transition-colors"
            >
              {isExpanded ? "Hide" : "Show"} highlights
              <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.25 }}>
                <ChevronDown className="w-3.5 h-3.5" />
              </motion.div>
            </button>

            <AnimatePresence>
              {isExpanded && (
                <motion.ul
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2 overflow-hidden"
                >
                  {experience.highlights.map((h: string, i: number) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className="flex items-start gap-2 text-gray-600 text-xs"
                    >
                      <Star className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>

            {/* Fun achievement */}
          <motion.div
              className="mt-4 p-3 rounded-xl flex items-start gap-2"
              style={{ background: "rgba(79,70,229,0.05)", border: "1px solid rgba(79,70,229,0.10)" }}
              whileHover={{ scale: 1.01 }}
            >
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: "var(--accent-warm)" }} />
              <span className="text-xs" style={{ color: "var(--text-secondary)" }}>{experience.funAchievement}</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const WorkExperience = () => {
  return (
    <section className="section-light py-16 sm:py-24 relative overflow-hidden">
      <div className="orb orb-indigo w-72 h-72 top-0 right-0 opacity-25" />
      <div className="orb orb-cyan w-56 h-56 bottom-0 left-0 opacity-20" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-14"
        >
        <p className="text-label mb-3">Experience</p>
        <h2 className="text-display-lg font-display" style={{ color: "var(--text-primary)" }}>
          Where I worked
        </h2>
        <div className="accent-line mt-4" />
        <p className="mt-4 text-sm sm:text-base" style={{ color: "var(--text-muted)", maxWidth: "40ch" }}>
          Real teams, shipped products, actual users.
        </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line (desktop) */}
          <div className="hidden sm:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-300 via-violet-300 to-cyan-300 -translate-x-1/2 opacity-50" />

          <div className="space-y-12">
            {unifiedData.experience.map((exp, idx) => (
              <WorkCard key={exp.role + exp.company} experience={exp} index={idx} />
            ))}
          </div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: "Live products", value: "13+" },
            { label: "AI projects", value: "5+" },
            { label: "Hackathon wins", value: "2" },
            { label: "Client satisfaction", value: "100%" },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              className="glass-card rounded-2xl p-5 text-center card-lift"
            >
              <div className="font-display font-bold grad-text-primary text-2xl mb-1">{stat.value}</div>
              <div className="text-label" style={{ fontSize: "0.6rem" }}>{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WorkExperience;
