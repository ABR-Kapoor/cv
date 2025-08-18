import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Users, Sparkles } from "lucide-react";
import { unifiedData } from "../data/unifiedData"; // Import unifiedData directly

const FunEvents = () => {
    const [activeEvent, setActiveEvent] = useState<typeof unifiedData.funEvents[0] | null>(null);

    return (
        <section className="py-20 bg-gray-900">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Playful Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <motion.div
                        className="text-6xl mb-4 cursor-pointer"
                        whileHover={{ scale: 1.2, rotate: [0, -10, 10, -10, 10, 0] }}
                        transition={{ duration: 0.5 }}
                    >
                        🎉
                    </motion.div>
                    <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
                        Fun & Games @ Campus
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Where serious tech meets serious fun! 🚀
                    </p>
                </motion.div>

                {/* Event Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {unifiedData.funEvents.map((event, index) => (
                        <motion.div
                            key={event.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            whileHover={{ scale: 1.03 }}
                            className="relative group cursor-pointer"
                            onClick={() => setActiveEvent(event)}
                        >
                            <div className="relative bg-gray-800 rounded-xl overflow-hidden">
                                {/* Fun Corner Emoji */}
                                <motion.div
                                    className="absolute top-4 right-4 text-3xl z-10"
                                    whileHover={{ scale: 1.3, rotate: 360 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    {event.emoji}
                                </motion.div>

                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                                        {event.title}
                                    </h3>

                                    <p className="text-gray-400 text-sm mb-4">{event.description}</p>

                                    <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                                        <div className="flex items-center text-gray-400">
                                            <Calendar className="w-4 h-4 mr-2 text-purple-400" />
                                            <span>{event.date}</span>
                                        </div>
                                        <div className="flex items-center text-gray-400">
                                            <MapPin className="w-4 h-4 mr-2 text-blue-400" />
                                            <span>{event.location}</span>
                                        </div>
                                    </div>

                                    {/* Sparkle Effect on Hover */}
                                    <motion.div
                                        className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                                        animate={{
                                            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                                        }}
                                        transition={{ duration: 3, repeat: Infinity }}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Event Details Modal */}
                <AnimatePresence>
                    {activeEvent && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setActiveEvent(null)}
                            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        >
                            <motion.div
                                initial={{ scale: 0.9, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.9, y: 20 }}
                                onClick={(e) => e.stopPropagation()}
                                className="bg-gray-800 rounded-xl p-6 max-w-lg w-full relative overflow-hidden"
                            >
                                {/* Fun Corner Decorations */}
                                <motion.div
                                    className="absolute top-4 right-4 text-4xl"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                >
                                    {activeEvent.emoji}
                                </motion.div>

                                <h3 className="text-2xl font-bold text-white mb-4">
                                    {activeEvent.title}
                                </h3>

                                <p className="text-gray-400 mb-6">{activeEvent.description}</p>

                                <div className="space-y-4">
                                    <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                                        <Sparkles className="w-5 h-5 text-yellow-400" />
                                        Fun Highlights
                                    </h4>
                                    <ul className="grid gap-3">
                                        {activeEvent.highlights.map((highlight, i) => (
                                            <motion.li
                                                key={i}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.1 }}
                                                className="flex items-start gap-2 text-gray-400"
                                            >
                                                <span className="text-purple-400">•</span>
                                                {highlight}
                                            </motion.li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Close Button */}
                                <motion.button
                                    whileHover={{ scale: 1.1, rotate: 90 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setActiveEvent(null)}
                                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white"
                                >
                                    ✕
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Fun Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center mt-16"
                >
                    <p className="text-gray-400 mb-4">
                        Want to join the fun? Let's make some tech magic! ✨
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                    >
                        Count Me In! 🎉
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
};

export default FunEvents;