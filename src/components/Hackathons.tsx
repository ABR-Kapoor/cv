import { useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { unifiedData } from "../data/unifiedData";
import { X, ArrowUpRight } from "lucide-react";
import OptimizedImage from "./OptimizedImage";
import hackathonMemories1 from "../assets/illustrations/hackathon-memories1.jpg";
import hackathonMemories2 from "../assets/illustrations/hackathon-memories2.jpg";
import learningChart from "../assets/illustrations/hackathon-learn-chart.jpg";

const hackathonImages = [hackathonMemories1, hackathonMemories2, hackathonMemories1];

const cardAccents = [
  { bar: "linear-gradient(90deg, #f59e0b, #ef4444)", glow: "rgba(245,158,11,0.20)", label: "Winner", labelBg: "#f59e0b" },
  { bar: "linear-gradient(90deg, #4f46e5, #7c3aed)", glow: "rgba(79,70,229,0.18)", label: "Winner", labelBg: "#4f46e5" },
  { bar: "linear-gradient(90deg, #0ea5e9, #4f46e5)", glow: "rgba(14,165,233,0.15)", label: "Finalist", labelBg: "#0ea5e9" },
];

type HackEvent = typeof unifiedData.funEvents[0];

const HackCard = ({ event, accent, img, index, onExpand }: {
  event: HackEvent; accent: typeof cardAccents[0];
  img: string; index: number; onExpand: (e: HackEvent) => void;
}) => {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), { stiffness: 180, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-9, 9]), { stiffness: 180, damping: 20 });
  const shimmerX = useTransform(mouseX, [-0.5, 0.5], ["10%", "90%"]);
  const shimmerY = useTransform(mouseY, [-0.5, 0.5], ["10%", "90%"]);

  const onMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - r.left) / r.width - 0.5);
    mouseY.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { mouseX.set(0); mouseY.set(0); setHovered(false); };

  return (
    <motion.div
      className="[perspective:1100px] cursor-pointer"
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.6, type: "spring", stiffness: 75 }}
      onClick={() => onExpand(event)}
    >
      <motion.div
        ref={cardRef}
        style={{ rotateX: hovered ? rotateX : 0, rotateY: hovered ? rotateY : 0, transformStyle: "preserve-3d" }}
        onMouseMove={onMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={onLeave}
        className="relative w-full rounded-2xl overflow-hidden"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        style={{
          background: "var(--bg-card-strong)",
          backdropFilter: "blur(22px)",
          border: "1px solid var(--border-card)",
          boxShadow: hovered
            ? `0 28px 64px ${accent.glow}, var(--shadow-lg)`
            : `0 8px 32px ${accent.glow}, var(--shadow-md)`,
          transition: "box-shadow 0.3s ease",
        }}
      >
        {/* Shimmer */}
        {hovered && (
          <motion.div
            className="absolute inset-0 pointer-events-none z-10 rounded-2xl"
            style={{
              background: `radial-gradient(circle at ${shimmerX} ${shimmerY}, rgba(255,255,255,0.28) 0%, transparent 55%)`,
            }}
          />
        )}

        {/* Top bar */}
        <div className="h-[3px] w-full" style={{ background: accent.bar }} />

        {/* Image */}
        <div className="relative h-40 sm:h-48 overflow-hidden">
          <OptimizedImage
            src={img} alt={event.title}
            className="w-full h-full object-cover"
            style={{
              transform: hovered ? "scale(1.06)" : "scale(1)",
              transition: "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              filter: hovered ? "brightness(1.05)" : "brightness(0.97) saturate(0.9)",
            }}
          />
          {/* Gradient */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(247,246,243,0.85) 0%, transparent 50%)" }} />

          {/* Label badge */}
          <div
            className="absolute top-3 left-3 font-mono text-xs font-semibold px-2.5 py-0.5 rounded text-white"
            style={{ background: accent.labelBg, fontSize: "0.65rem", letterSpacing: "0.06em" }}
          >
            {accent.label.toUpperCase()}
          </div>

          {/* Date */}
          <div
            className="absolute bottom-3 left-3 font-mono text-xs"
            style={{ color: "var(--text-secondary)", fontSize: "0.65rem" }}
          >
            {event.date}
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3
            className="font-display font-bold text-sm sm:text-base mb-2"
            style={{ color: "var(--text-primary)", letterSpacing: "-0.015em" }}
          >
            {event.title}
          </h3>
          <p
            className="text-xs sm:text-sm leading-relaxed mb-4"
            style={{ color: "var(--text-secondary)" }}
          >
            {event.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {event.highlights.slice(0, 3).map((h, i) => (
              <span key={i} className="chip text-xs">{h}</span>
            ))}
            {event.highlights.length > 3 && (
              <span className="chip-neutral chip text-xs">+{event.highlights.length - 3}</span>
            )}
          </div>

          {/* CTA */}
          <motion.div
            className="flex items-center gap-1 text-xs font-semibold"
            style={{ color: "var(--accent-primary)" }}
            animate={{ opacity: hovered ? 1 : 0.45 }}
          >
            <span>Details</span>
            <ArrowUpRight size={12} />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const HackModal = ({ event, onClose }: { event: HackEvent; onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center p-4"
    style={{ background: "rgba(15,15,15,0.50)", backdropFilter: "blur(12px)" }}
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.92, y: 24 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, y: 24 }}
      transition={{ type: "spring", stiffness: 220, damping: 24 }}
      onClick={e => e.stopPropagation()}
      className="relative w-full max-w-md rounded-2xl overflow-hidden"
      style={{
        background: "var(--bg-card-strong)",
        backdropFilter: "blur(28px)",
        border: "1px solid var(--border-card)",
        boxShadow: "var(--shadow-xl)",
      }}
    >
      <div className="h-[3px] w-full" style={{ background: "linear-gradient(90deg, #4f46e5, #7c3aed)" }} />
      <div className="p-6 sm:p-7">
        <button onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg transition-colors"
          style={{ background: "var(--border-light)", color: "var(--text-muted)" }}
          onMouseEnter={e => (e.currentTarget.style.background = "var(--border-strong)")}
          onMouseLeave={e => (e.currentTarget.style.background = "var(--border-light)")}
        >
          <X size={14} />
        </button>

        <p className="text-label mb-2">{event.date} · {event.location}</p>
        <h3 className="font-display font-bold text-lg sm:text-xl mb-3" style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
          {event.title}
        </h3>
        <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-secondary)" }}>
          {event.description}
        </p>

        <p className="text-label mb-3">Key results</p>
        <div className="grid grid-cols-1 gap-2">
          {event.highlights.map((h, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg"
              style={{ background: "rgba(79,70,229,0.05)", border: "1px solid rgba(79,70,229,0.10)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--accent-primary)" }} />
              <span className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>{h}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  </motion.div>
);

const lessons = [
  { label: "Speed", text: "Shipped working MVPs inside 24 hours — twice." },
  { label: "Leadership", text: "Led teams when the roadmap changed every 3 hours." },
  { label: "Constraints", text: "Real problems don't come with clean requirements." },
  { label: "Pitching", text: "Got good at saying the hard thing in 2 minutes." },
];

const Hackathons = () => {
  const [expanded, setExpanded] = useState<HackEvent | null>(null);

  return (
    <section className="section-light py-16 sm:py-28 relative overflow-hidden">
      <div className="orb orb-warm w-[500px] h-[500px] -top-24 right-0" style={{ opacity: 0.5 }} />
      <div className="orb orb-rose w-72 h-72 bottom-0 -left-16" style={{ opacity: 0.4 }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="mb-14 sm:mb-20"
        >
          <p className="text-label mb-3">Competition</p>
          <h2 className="text-display-lg font-display" style={{ color: "var(--text-primary)" }}>
            Under pressure,<br />on purpose
          </h2>
          <div className="accent-line mt-4" style={{ background: "linear-gradient(90deg, #f59e0b, #ef4444)" }} />
          <p className="mt-4 text-sm sm:text-base" style={{ color: "var(--text-muted)", maxWidth: "40ch" }}>
            Three national hackathons. Two wins. One thing that stayed constant — shipping something that works.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 mb-16">
          {unifiedData.funEvents.map((event, i) => (
            <HackCard
              key={event.title} event={event}
              accent={cardAccents[i % cardAccents.length]}
              img={hackathonImages[i % hackathonImages.length]}
              index={i} onExpand={setExpanded}
            />
          ))}
        </div>

        {/* What I learned */}
        <motion.div
          initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.65 }}
          className="rounded-2xl overflow-hidden"
          style={{
            background: "var(--bg-card)",
            backdropFilter: "blur(20px)",
            border: "1px solid var(--border-card)",
            boxShadow: "var(--shadow-lg)",
          }}
        >
          <div className="h-[3px] w-full" style={{ background: "linear-gradient(90deg, #4f46e5, #f59e0b, #ef4444)" }} />
          <div className="p-7 sm:p-10 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-label mb-4">What stuck</p>
              <div className="space-y-3">
                {lessons.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.09 }}
                    className="flex items-start gap-3 p-3.5 rounded-xl"
                    style={{ background: "rgba(0,0,0,0.025)", border: "1px solid var(--border-light)" }}
                    whileHover={{ x: 4 }}
                  >
                    <span
                      className="font-mono text-xs font-semibold flex-shrink-0 mt-0.5"
                      style={{ color: "var(--accent-primary)", fontSize: "0.65rem", letterSpacing: "0.06em" }}
                    >
                      {item.label.toUpperCase()}
                    </span>
                    <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <div>
              <img src={learningChart} alt="Chart"
                className="w-full h-auto rounded-xl"
                style={{ border: "1px solid var(--border-light)", boxShadow: "var(--shadow-md)" }}
              />
            </div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {expanded && <HackModal event={expanded} onClose={() => setExpanded(null)} />}
      </AnimatePresence>
    </section>
  );
};

export default Hackathons;
