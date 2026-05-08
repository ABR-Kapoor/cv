import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Sparkles, X } from "lucide-react";
import { unifiedData } from "../data/unifiedData";

type FunEvent = typeof unifiedData.funEvents[0];

const cardColors = [
  { bg: "from-rose-400 via-pink-400 to-fuchsia-400", glow: "rgba(244,114,182,0.22)" },
  { bg: "from-violet-400 via-indigo-400 to-blue-400", glow: "rgba(139,92,246,0.20)" },
  { bg: "from-teal-400 via-cyan-400 to-sky-400", glow: "rgba(6,182,212,0.20)" },
];

const FunEvents = () => {
  const [activeEvent, setActiveEvent] = useState<FunEvent | null>(null);

  return (
    <section className="section-light py-16 sm:py-28 relative overflow-hidden">
      <div className="orb orb-pink w-96 h-96 -top-20 -right-20 opacity-18" />
      <div className="orb orb-indigo w-72 h-72 bottom-0 -left-16 opacity-15" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} className="text-center mb-12 sm:mb-16"
        >
          <motion.div className="text-5xl sm:text-6xl mb-4 inline-block"
            animate={{ rotate: [0, -12, 12, -12, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 5, repeat: Infinity }}>🎉</motion.div>
          <h2 className="text-3xl sm:text-5xl font-extrabold mb-3" style={{
            background: "linear-gradient(135deg, #ec4899 0%, #8b5cf6 50%, #3b82f6 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"
          }}>Events & Memories</h2>
          <p className="text-gray-500 max-w-lg mx-auto text-sm sm:text-base font-medium">
            Where serious tech meets serious fun.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {unifiedData.funEvents.map((event, index) => {
            const col = cardColors[index % cardColors.length];
            return (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12, duration: 0.6 }}
                whileHover={{ y: -8, scale: 1.025 }}
                className="cursor-pointer rounded-3xl overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.65)",
                  backdropFilter: "blur(20px)",
                  border: "1.5px solid rgba(255,255,255,0.78)",
                  boxShadow: `0 10px 36px 0 ${col.glow}`
                }}
                onClick={() => setActiveEvent(event)}
              >
                <div className={`h-1.5 w-full bg-gradient-to-r ${col.bg}`} />
                <div className="p-6 sm:p-7">
                  {/* Emoji + Title row */}
                  <div className="flex items-start justify-between mb-4">
                    <motion.div
                      className="text-4xl sm:text-5xl"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.4 }}
                    >{event.emoji}</motion.div>
                    <span className={`px-3 py-1 rounded-xl text-xs font-bold text-white bg-gradient-to-r ${col.bg} shadow-sm`}>
                      {event.date}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-extrabold text-gray-900 mb-2 leading-snug">{event.title}</h3>
                  <p className="text-sm text-gray-500 mb-4 leading-relaxed line-clamp-2">{event.description}</p>

                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
                    <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{event.location}</span>
                    <Calendar className="w-3.5 h-3.5 text-indigo-400 ml-2" />
                    <span>{event.date}</span>
                  </div>

                  {/* Highlight chips */}
                  <div className="flex flex-wrap gap-1.5">
                    {event.highlights.slice(0, 3).map((h, i) => (
                      <span key={i} className="chip text-xs">{h}</span>
                    ))}
                    {event.highlights.length > 3 && (
                      <span className="px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-500 border border-gray-200">
                        +{event.highlights.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA band */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ delay: 0.3 }}
          className="text-center"
        >
          <p className="text-gray-500 mb-4 text-sm font-medium">Want to build something amazing together?</p>
          <motion.a
            href="#contact"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-2xl text-white font-bold text-sm shadow-lg shadow-violet-200 cursor-pointer"
            style={{ background: "linear-gradient(135deg, #8b5cf6, #ec4899)" }}
          >
            <Sparkles className="w-4 h-4" /> Let's Connect 🎉
          </motion.a>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {activeEvent && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(30,27,60,0.4)", backdropFilter: "blur(12px)" }}
            onClick={() => setActiveEvent(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 24 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 24 }}
              transition={{ type: "spring", stiffness: 200, damping: 22 }}
              onClick={e => e.stopPropagation()}
              className="relative w-full max-w-md rounded-3xl overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.90)",
                backdropFilter: "blur(28px)",
                border: "1.5px solid rgba(255,255,255,0.85)",
                boxShadow: "0 24px 72px rgba(139,92,246,0.22)"
              }}
            >
              <div className="h-1.5 w-full bg-gradient-to-r from-pink-400 via-violet-400 to-indigo-400" />
              <div className="p-6 sm:p-8">
                <button onClick={() => setActiveEvent(null)}
                  className="absolute top-4 right-4 p-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors">
                  <X className="w-4 h-4 text-gray-600" />
                </button>
                <motion.div className="text-5xl mb-4"
                  animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
                  {activeEvent.emoji}
                </motion.div>
                <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 mb-2 pr-8">{activeEvent.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">{activeEvent.description}</p>
                <h4 className="text-xs font-bold text-indigo-700 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-violet-400" /> Highlights
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {activeEvent.highlights.map((h, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className="flex items-center gap-2 p-2.5 rounded-xl bg-indigo-50 border border-indigo-100"
                    >
                      <span className="text-violet-400 text-xs">◆</span>
                      <span className="text-xs text-gray-700 font-medium">{h}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default FunEvents;
