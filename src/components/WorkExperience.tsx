import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Star, Trophy } from "lucide-react";
import { unifiedData } from "../data/unifiedData"; // Use the unifiedData

const WorkCard = ({ experience, index }: {
    experience: typeof unifiedData.experience[0];
    index: number;
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <motion.div
            className={`relative flex flex-col md:flex-row gap-8 ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
            }`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
        >
            {/* Timeline Dot */}
            <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 border-4 border-gray-900">
                <motion.div
                    className="absolute inset-0 rounded-full bg-cyan-500"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            </div>

            {/* Content Card */}
            <div className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pl-8" : "md:pr-8"}`}>
                <motion.div
                    className="bg-gray-800 rounded-xl overflow-hidden shadow-xl hover:shadow-cyan-500/20 transition-all duration-300"
                    whileHover={{ y: -5 }}
                >
                    {/* Header */}
                    <div className="p-6 border-b border-gray-700">
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="text-xl font-bold text-white mb-1">{experience.role}</h3>
                                <p className="text-cyan-400">{experience.company}</p>
                            </div>
                            <motion.div
                                className="text-3xl"
                                animate={{ rotate: [0, 15, -15, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                👨‍💻
                            </motion.div>
                        </div>

                        <div className="flex flex-wrap gap-4 mt-4 text-sm">
                            <div className="flex items-center text-gray-400">
                                <Calendar className="w-4 h-4 mr-2 text-purple-400" />
                                <span>{experience.duration}</span>
                            </div>
                        </div>
                    </div>

                    {/* Description & Tech Stack */}
                    <div className="p-6">
                        <p className="text-gray-400 mb-4">{experience.description}</p>

                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {experience.techStack.map((tech, i) => (
                                <motion.span
                                    key={tech}
                                    className="px-3 py-1 text-xs font-medium rounded-full bg-cyan-500/20 text-cyan-400"
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    {tech}
                                </motion.span>
                            ))}
                        </div>

                        {/* Highlights */}
                        <motion.button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="text-sm text-cyan-400 hover:text-cyan-300 mb-4 flex items-center gap-2"
                            whileHover={{ x: 5 }}
                        >
                            {isExpanded ? "Hide" : "Show"} Highlights
                            <motion.span
                                animate={{ rotate: isExpanded ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                ▼
                            </motion.span>
                        </motion.button>

                        <AnimatePresence>
                            {isExpanded && (
                                <motion.ul
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="space-y-3"
                                >
                                    {experience.highlights.map((highlight, i) => (
                                        <motion.li
                                            key={i}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="flex items-start gap-2 text-gray-400"
                                        >
                                            <Star className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-1" />
                                            <span>{highlight}</span>
                                        </motion.li>
                                    ))}
                                </motion.ul>
                            )}
                        </AnimatePresence>

                        {/* Fun Achievement */}
                        <motion.div
                            className="mt-4 p-3 bg-gray-700/50 rounded-lg"
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="flex items-center gap-2">
                                <Trophy className="w-4 h-4 text-yellow-400" />
                                <span className="text-sm text-gray-300">{experience.funAchievement}</span>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

const WorkExperience = () => {
    return (
        <section className="py-20 bg-gray-900">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Fun Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <motion.div
                        className="text-6xl mb-4 cursor-pointer"
                        whileHover={{ scale: 1.2, rotate: [0, -10, 10, -10, 10, 0] }}
                    >
                        💼
                    </motion.div>
                    <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 mb-4">
                        Work Adventures
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Turning coffee into code, one project at a time ☕
                    </p>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Timeline Line */}
                    <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-px bg-gradient-to-b from-cyan-500 via-blue-500 to-purple-500" />

                    {/* Experience Cards */}
                    <div className="space-y-16">
                        {unifiedData.experience.map((exp, index) => (
                            <WorkCard key={exp.role} experience={exp} index={index} />
                        ))}
                    </div>
                </div>

                {/* Fun Stats */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center"
                >
                    <h3 className="text-xl font-bold text-white mb-6">Cool Numbers 📊</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { label: "Code Reviews", value: "500+", emoji: "👀" },
                            { label: "Git Commits", value: "2.5K", emoji: "📝" },
                            { label: "Team Meetings", value: "200+", emoji: "🤝" },
                            { label: "Happy Clients", value: "100%", emoji: "😊" },
                        ].map((stat) => (
                            <motion.div
                                key={stat.label}
                                className="bg-gray-800 rounded-xl p-4"
                                whileHover={{ scale: 1.05 }}
                            >
                                <motion.div
                                    className="text-3xl mb-2"
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    {stat.emoji}
                                </motion.div>
                                <div className="text-2xl font-bold text-cyan-400 mb-1">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-gray-400">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default WorkExperience;