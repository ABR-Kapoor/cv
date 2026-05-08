import { useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import educationData from "../data/education.json";
import college1 from "../assets/illustrations/college1.png";
import college2 from "../assets/illustrations/college2.png";

const collegeImages: Record<string, string> = {
  "Govt. V.Y.T. Post Graduate Autonomous College (Durg)": college2,
  "Bhilai Institute of Technology College (Bhilai)": college1,
};

type EduType = {
  degree: string; college: string; year: string;
  cgpa?: string; status?: string; achievements: string[]; subjects: string[];
};

const accentColors = [
  { bar: "linear-gradient(90deg, #4f46e5, #7c3aed)", glow: "rgba(79,70,229,0.18)" },
  { bar: "linear-gradient(90deg, #0ea5e9, #4f46e5)", glow: "rgba(14,165,233,0.15)" },
];

const EduCard = ({ edu, img, accent, index }: {
  edu: EduType; img: string; accent: typeof accentColors[0]; index: number;
}) => {
  const [flipped, setFlipped] = useState(false);
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), { stiffness: 180, damping: 22 });
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
      initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.14, duration: 0.6, type: "spring", stiffness: 80 }}
      className="[perspective:1100px] cursor-pointer"
      style={{ height: "clamp(400px, 50vw, 500px)" }}
      onClick={() => setFlipped(f => !f)}
    >
      <motion.div
        ref={cardRef}
        style={{
          rotateX: hovered && !flipped ? rotateX : 0,
          rotateY: flipped ? 180 : 0,
          transformStyle: "preserve-3d",
        }}
        transition={{ duration: 0.65, type: "spring", stiffness: 110, damping: 18 }}
        onMouseMove={onMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={onLeave}
        className="relative w-full h-full [transform-style:preserve-3d]"
      >

        {/* ── FRONT ── */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden [backface-visibility:hidden]"
          style={{
            background: "var(--bg-card-strong)",
            backdropFilter: "blur(24px)",
            border: "1px solid var(--border-card)",
            boxShadow: hovered
              ? `0 28px 64px ${accent.glow}, var(--shadow-lg)`
              : `0 12px 40px ${accent.glow}, var(--shadow-md)`,
            transition: "box-shadow 0.3s ease",
          }}
        >
          {/* Top bar */}
          <div className="h-[3px] w-full" style={{ background: accent.bar }} />

          {/* Mouse shimmer */}
          {hovered && (
            <motion.div
              className="absolute inset-0 pointer-events-none z-10 rounded-2xl"
              style={{
                background: `radial-gradient(circle at ${shimmerX} ${shimmerY}, rgba(255,255,255,0.30) 0%, transparent 55%)`,
              }}
            />
          )}

          <div className="flex flex-col items-center justify-center gap-5 p-7 h-[calc(100%-3px)]">
            {/* College logo */}
            <div className="relative">
              <motion.div
                className="absolute inset-0 rounded-xl"
                style={{ background: accent.bar, filter: "blur(16px)", opacity: 0 }}
                animate={{ opacity: hovered ? 0.35 : 0 }}
                transition={{ duration: 0.35 }}
              />
              <div
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden relative z-10 bg-white"
                style={{ border: "1px solid var(--border-light)", boxShadow: "var(--shadow-sm)" }}
              >
                <img src={img} alt={edu.college} className="w-full h-full object-cover" loading="lazy" />
              </div>
              {/* CGPA tag */}
              <motion.div
                className="absolute -bottom-3 -right-3 font-mono text-xs font-semibold px-2 py-0.5 rounded-md text-white z-20"
                style={{ background: accent.bar, fontSize: "0.65rem" }}
                animate={{ y: hovered ? -2 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {edu.cgpa ? `${edu.cgpa} GPA` : "Ongoing"}
              </motion.div>
            </div>

            {/* Text */}
            <div className="text-center mt-2">
              <h3 className="font-display font-bold text-base sm:text-lg mb-1" style={{ color: "var(--text-primary)", letterSpacing: "-0.015em" }}>
                {edu.degree}
              </h3>
              <p className="text-sm font-medium mb-3" style={{ color: "var(--text-muted)" }}>{edu.college}</p>
              <span className="chip-neutral chip text-xs">{edu.year}{edu.status ? ` · ${edu.status}` : ""}</span>
            </div>

            {/* Subject preview */}
            <div className="flex flex-wrap gap-1.5 justify-center max-w-xs">
              {edu.subjects.slice(0, 4).map((s, i) => (
                <span key={i} className="chip text-xs">{s}</span>
              ))}
              {edu.subjects.length > 4 && (
                <span className="chip-neutral chip text-xs">+{edu.subjects.length - 4}</span>
              )}
            </div>

            {/* Flip cue */}
            <motion.p
              className="text-label"
              animate={{ opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              style={{ fontSize: "0.6rem" }}
            >
              click to flip
            </motion.p>
          </div>
        </div>

        {/* ── BACK ── */}
        <div
          className="absolute inset-0 rounded-2xl [transform:rotateY(180deg)] [backface-visibility:hidden] overflow-hidden"
          style={{
            background: "var(--bg-card-strong)",
            backdropFilter: "blur(24px)",
            border: "1px solid var(--border-card)",
            boxShadow: `var(--shadow-lg)`,
          }}
        >
          <div className="h-[3px] w-full" style={{ background: accent.bar }} />
          <div className="p-6 sm:p-7 h-[calc(100%-3px)] overflow-y-auto flex flex-col gap-5 scrollbar-hide">

            <div>
              <p className="text-label mb-3">Achievements</p>
              <div className="space-y-2">
                {edu.achievements.map((a, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="flex items-start gap-2"
                  >
                    <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent-primary)" }} />
                    <span className="text-xs sm:text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{a}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-label mb-3">Subjects</p>
              <div className="flex flex-wrap gap-1.5">
                {edu.subjects.map((s, i) => (
                  <motion.span key={i}
                    initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className="chip text-xs"
                  >{s}</motion.span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Education = () => (
  <section className="section-light py-16 sm:py-28 px-4 relative overflow-hidden">
    <div className="orb orb-violet w-[500px] h-[500px] -top-32 -right-32" style={{ opacity: 0.7 }} />
    <div className="orb orb-indigo w-72 h-72 bottom-0 left-0" style={{ opacity: 0.5 }} />

    <div className="max-w-5xl mx-auto relative z-10">
      {/* Section header */}
      <motion.div
        className="mb-14 sm:mb-20"
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.6 }}
      >
        <p className="text-label mb-3">Background</p>
        <h2 className="text-display-lg font-display" style={{ color: "var(--text-primary)" }}>
          Where it<br />started
        </h2>
        <div className="accent-line mt-4" />
        <p className="mt-4 text-sm sm:text-base" style={{ color: "var(--text-muted)", maxWidth: "38ch" }}>
          Two degrees from Chhattisgarh. Built more than I studied — that was always the plan.
          Click any card to see what mattered.
        </p>
      </motion.div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
        {educationData.map((edu: EduType, idx) => (
          <EduCard
            key={idx} edu={edu}
            img={collegeImages[edu.college] || college1}
            accent={accentColors[idx % accentColors.length]}
            index={idx}
          />
        ))}
      </div>

      {/* Stat band */}
      <motion.div
        className="mt-14 grid grid-cols-3 gap-4"
        initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ delay: 0.25 }}
      >
        {[
          { value: "8.2", label: "CGPA" },
          { value: "2021–26", label: "Timeline" },
          { value: "Rank #1", label: "BCA Final" },
        ].map(s => (
          <motion.div
            key={s.label}
            whileHover={{ y: -3 }}
            className="glass-card rounded-xl p-4 sm:p-5 text-center"
          >
            <div className="font-display font-bold grad-text-primary text-xl sm:text-2xl">{s.value}</div>
            <div className="text-label mt-1" style={{ fontSize: "0.62rem" }}>{s.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default Education;
