import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import OptimizedImage from "./OptimizedImage";
import { useInsForge } from "../hooks/useInsForge";
import { fetchProjects, type Project } from "../lib/api";
import LoadingState from "./ui/LoadingState";
import ErrorState from "./ui/ErrorState";

import project1Img from "../assets/illustrations/project1.jpg";
import project2Img from "../assets/illustrations/project2.jpg";
import project3Img from "../assets/illustrations/project3.png";
import project4Img from "../assets/illustrations/in-progress-icon.png";

// Map project images to your real projects
const projectImages = [project1Img, project2Img, project3Img, project4Img];

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState<number | null>(null);
    const { data: projects, loading, error } = useInsForge<Project[]>(fetchProjects, []);
    const projectList = Array.isArray(projects) ? projects : [];

    if (loading) return <LoadingState message="Loading projects..." />;
    if (error) return <ErrorState message={error} />;

    return (
        <section className="section-light py-16 sm:py-28 relative overflow-hidden">
            {/* Background Effects */}
            <div className="orb orb-cyan w-96 h-96 top-0 -right-20 opacity-15" />
            <div className="orb orb-indigo w-72 h-72 bottom-0 -left-16 opacity-15" />

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
                        🚀
                    </motion.div>
                <h2 className="text-3xl sm:text-5xl font-extrabold mb-3" style={{
                        background: "linear-gradient(135deg, #4f46e5, #7c3aed, #06b6d4)",
                        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"
                    }}>
                        Featured Projects
                    </h2>
                    <p className="text-gray-400 max-w-md sm:max-w-2xl mx-auto text-base sm:text-lg">
                        Showcasing real-world applications built with cutting-edge technologies ✨
                    </p>
                </motion.div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10 mb-8 sm:mb-16">
                    {projectList.length === 0 ? (
                        <div className="col-span-full text-center text-gray-400 text-sm sm:text-base">
                            No projects found.
                        </div>
                    ) : (
                        projectList.map((project, index) => (
                    <motion.div
                            key={index}
                            className="rounded-2xl overflow-hidden cursor-pointer glass-card glass-card-hover"
                            whileHover={{ scale: 1.02, y: -4 }}
                            onClick={() => setSelectedProject(index)}
                        >
                            <OptimizedImage src={projectImages[index % projectImages.length]} alt={project.title} className="w-full h-32 sm:h-56 object-cover" />
                            <div className="p-4 sm:p-6">
                                <h3 className="text-base sm:text-xl font-bold mb-1 sm:mb-2 text-indigo-800">{project.title}</h3>
                                <p className="mb-2 sm:mb-4 text-gray-600 text-sm sm:text-base line-clamp-2">{project.details}</p>
                                <div className="flex items-center space-x-2 sm:space-x-4 mt-2 sm:mt-4">
                                    {project.github_link && (
                                        <a href={project.github_link} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                                            <FiGithub size={18} className="text-purple-400 w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10" />
                                        </a>
                                    )}
                                    {project.demo_link && (
                                        <a href={project.demo_link} target="_blank" rel="noopener noreferrer" aria-label="Live Demo">
                                            <FiExternalLink size={18} className="text-cyan-400 w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                        ))
                        )}

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
                                    className="relative bg-gradient-to-br from-gray-950 via-slate-900 to-gray-800 rounded-2xl sm:rounded-3xl shadow-2xl border-2 border-cyan-700 p-4 sm:p-10 max-w-lg sm:max-w-4xl w-full mx-2 sm:mx-4"
                                    onClick={e => e.stopPropagation()}
                                >
                                    {/* Close Button */}
                                    <button className="absolute top-4 sm:top-6 right-4 sm:right-8 text-gray-400 hover:text-cyan-400 text-xl sm:text-2xl font-bold" onClick={() => setSelectedProject(null)}>&times;</button>
                                    {/* Modal Content */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-10">
                                        {/* Left: Large Image & Title */}
                                        <div className="flex flex-col items-center">
                                            <div className="w-full h-40 sm:h-80 rounded-xl sm:rounded-2xl overflow-hidden mb-4 sm:mb-6 shadow-xl bg-gradient-to-br from-cyan-900 via-blue-900 to-purple-900">
                                                <OptimizedImage
                                                    src={projectImages[selectedProject % projectImages.length]}
                                                    alt={projectList[selectedProject].title}
                                                    className="object-cover w-full h-full scale-110"
                                                />
                                            </div>
                                            <h2 className="text-xl sm:text-3xl font-extrabold text-cyan-300 mb-1 sm:mb-2 text-center drop-shadow-lg tracking-tight">
                                                {projectList[selectedProject].title}
                                            </h2>
                                            <p className="text-gray-300 text-sm sm:text-lg mb-2 sm:mb-4 text-center font-medium">
                                                {projectList[selectedProject].details}
                                            </p>
                                            {/* Project Links */}
                                            <div className="flex justify-center gap-3 sm:gap-6 mt-1 sm:mt-2">
                                                {projectList[selectedProject].github_link && (
                                                    <a href={projectList[selectedProject].github_link} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-200 transition-colors">
                                                        <FiGithub size={18} className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10" />
                                                    </a>
                                                )}
                                                {projectList[selectedProject].demo_link && (
                                                    <a href={projectList[selectedProject].demo_link} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-200 transition-colors">
                                                        <FiExternalLink size={18} className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10" />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                        {/* Right: Features, Tech Stack, Awards, etc. */}
                                        <div>
                                            {/* Highlights */}
                                            {projectList[selectedProject].highlights && (
                                                <div className="mb-4 sm:mb-6">
                                                    <h4 className="text-base sm:text-xl font-semibold text-cyan-200 mb-2 sm:mb-3">Key Highlights</h4>
                                                    <ul className="space-y-1 sm:space-y-2">
                                                        {projectList[selectedProject].highlights.map((highlight, idx) => (
                                                            <li key={idx} className="flex items-start gap-1 sm:gap-2 text-gray-300 text-xs sm:text-base">
                                                                <div className="w-2 h-2 rounded-full bg-cyan-400 mt-1 sm:mt-2 flex-shrink-0" />
                                                                <span>{highlight}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                            {/* Tech Stack */}
                                            {projectList[selectedProject].tech_stack && (
                                                <div className="mb-4 sm:mb-6">
                                                    <h4 className="text-base sm:text-xl font-semibold text-cyan-200 mb-2 sm:mb-3">Technology Stack</h4>
                                                    <div className="flex flex-wrap gap-2 sm:gap-3">
                                                        {projectList[selectedProject].tech_stack.map((tech) => (
                                                            <span key={tech} className="px-2 sm:px-4 py-1 sm:py-2 bg-slate-800 text-cyan-300 rounded-lg border border-slate-700 text-center font-medium shadow text-xs sm:text-base">
                                                                {tech}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                            {/* Awards/Tags */}
                                            {projectList[selectedProject].category && (
                                                <div className="mb-4 sm:mb-6">
                                                    <h4 className="text-base sm:text-xl font-semibold text-yellow-300 mb-2 sm:mb-3">Category</h4>
                                                    <div className="flex flex-wrap gap-1 sm:gap-2">
                                                        <span className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-yellow-400/20 text-yellow-200 text-xs font-semibold shadow">
                                                            {projectList[selectedProject].category}
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

