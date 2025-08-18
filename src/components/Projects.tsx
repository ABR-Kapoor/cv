import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { unifiedData } from "../data/unifiedData";
import OptimizedImage from "./OptimizedImage";

import project1Img from "../assets/illustrations/project1.jpg";
import project2Img from "../assets/illustrations/project2.jpg";
import project3Img from "../assets/illustrations/project3.png";
import project4Img from "../assets/illustrations/in-progress-icon.png";

// Map project images to your real projects
const projectImages = [project1Img, project2Img, project3Img, project4Img];

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState<number | null>(null);

    return (
        <section className="py-20 bg-gray-900 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <motion.div
                        className="text-6xl mb-4 cursor-pointer animate-float"
                        whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                    >
                        🚀
                    </motion.div>
                    <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 mb-4 animate-gradient">
                        Featured Projects
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Showcasing real-world applications built with cutting-edge technologies ✨
                    </p>
                </motion.div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
                    {unifiedData.projects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            className="rounded-xl shadow-lg overflow-hidden bg-gray-800 text-gray-300 border border-gray-700 cursor-pointer"
                            whileHover={{ scale: 1.02 }}
                            onClick={() => setSelectedProject(index)} // Fix: Add this onClick handler
                        >
                            <OptimizedImage src={projectImages[index % projectImages.length]} alt={project.title} className="w-full h-56 object-cover" />
                            <div className="p-6">
                                <h3 className="text-2xl font-bold mb-2 text-cyan-300">{project.title}</h3>
                                <p className="mb-4 text-gray-300">{project.description}</p>
                                <div className="flex items-center space-x-4 mt-4">
                                    {project.githubLink && (
                                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                                            <FiGithub size={22} className="text-purple-400" />
                                        </a>
                                    )}
                                    {project.demoLink && (
                                        <a href={project.demoLink} target="_blank" rel="noopener noreferrer" aria-label="Live Demo">
                                            <FiExternalLink size={22} className="text-cyan-400" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {/* Expanded Project Details Modal */}
                    <AnimatePresence>
                        {selectedProject !== null && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 40 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 40 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-lg"
                                onClick={() => setSelectedProject(null)}
                            >
                                <motion.div
                                    initial={{ y: 80, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: 80, opacity: 0 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    className="relative bg-gradient-to-br from-gray-950 via-slate-900 to-gray-800 rounded-3xl shadow-2xl border-2 border-cyan-700 p-10 max-w-4xl w-full mx-4"
                                    onClick={e => e.stopPropagation()}
                                >
                                    {/* Close Button */}
                                    <button className="absolute top-6 right-8 text-gray-400 hover:text-cyan-400 text-2xl font-bold" onClick={() => setSelectedProject(null)}>&times;</button>
                                    {/* Modal Content */}
                                    <div className="grid md:grid-cols-2 gap-10">
                                        {/* Left: Large Image & Title */}
                                        <div className="flex flex-col items-center">
                                            <div className="w-full h-80 rounded-2xl overflow-hidden mb-6 shadow-xl bg-gradient-to-br from-cyan-900 via-blue-900 to-purple-900">
                                                <OptimizedImage
                                                    src={projectImages[selectedProject % projectImages.length]}
                                                    alt={unifiedData.projects[selectedProject].title}
                                                    className="object-cover w-full h-full scale-110"
                                                />
                                            </div>
                                            <h2 className="text-3xl font-extrabold text-cyan-300 mb-2 text-center drop-shadow-lg tracking-tight">
                                                {unifiedData.projects[selectedProject].title}
                                            </h2>
                                            <p className="text-gray-300 text-lg mb-4 text-center font-medium">
                                                {unifiedData.projects[selectedProject].description}
                                            </p>
                                            {/* Project Links */}
                                            <div className="flex justify-center gap-6 mt-2">
                                                {unifiedData.projects[selectedProject].githubLink && (
                                                    <a href={unifiedData.projects[selectedProject].githubLink} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-200 transition-colors text-2xl">
                                                        <FiGithub />
                                                    </a>
                                                )}
                                                {unifiedData.projects[selectedProject].demoLink && (
                                                    <a href={unifiedData.projects[selectedProject].demoLink} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-200 transition-colors text-2xl">
                                                        <FiExternalLink />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                        {/* Right: Features, Tech Stack, Awards, etc. */}
                                        <div>
                                            {/* Highlights */}
                                            {unifiedData.projects[selectedProject].highlights && (
                                                <div className="mb-6">
                                                    <h4 className="text-xl font-semibold text-cyan-200 mb-3">Key Highlights</h4>
                                                    <ul className="space-y-2">
                                                        {unifiedData.projects[selectedProject].highlights.map((highlight, idx) => (
                                                            <li key={idx} className="flex items-start gap-2 text-gray-300">
                                                                <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                                                                <span>{highlight}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                            {/* Tech Stack */}
                                            {unifiedData.projects[selectedProject].techStack && (
                                                <div className="mb-6">
                                                    <h4 className="text-xl font-semibold text-cyan-200 mb-3">Technology Stack</h4>
                                                    <div className="flex flex-wrap gap-3">
                                                        {unifiedData.projects[selectedProject].techStack.map((tech, idx) => (
                                                            <span key={tech} className="px-4 py-2 bg-slate-800 text-cyan-300 rounded-lg border border-slate-700 text-center font-medium shadow">
                                                                {tech}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                            {/* Awards/Tags */}
                                            {unifiedData.projects[selectedProject].category && (
                                                <div className="mb-6">
                                                    <h4 className="text-xl font-semibold text-yellow-300 mb-3">Category</h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        <span className="px-3 py-1 rounded-full bg-yellow-400/20 text-yellow-200 text-xs font-semibold shadow">
                                                            {unifiedData.projects[selectedProject].category}
                                                        </span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default Projects;