import profilePic from "../assets/illustrations/profile-picture.png";
import personalInfo from "../data/personal_info.json";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { FaLinkedin, FaGithub, FaXTwitter } from "react-icons/fa6";
import { ArrowDown, Download } from "lucide-react";
import { useRef, useState } from "react";

const RESUME = "/Abeer_Kapoor_Resume_v26.17.pdf";

const stats = [
  { value: "13+", label: "live products" },
  { value: "₹22K", label: "hackathon wins" },
  { value: "5+", label: "AI systems" },
  { value: "2", label: "degrees" },
];

const handleDownload = (e: React.MouseEvent) => {
  e.preventDefault();
  window.open(RESUME, "_blank");
  const a = document.createElement("a");
  a.href = RESUME; a.download = "Abeer_Kapoor_Resume.pdf";
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
};

// Profile photo — magnetic tilt + color-on-hover, kept from original
const ProfilePhoto = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 200, damping: 22 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), { stiffness: 200, damping: 22 });
  const shimmerX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const shimmerY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - r.left) / r.width - 0.5);
    mouseY.set((e.clientY - r.top) / r.height - 0.5);
  };
  const handleLeave = () => { mouseX.set(0); mouseY.set(0); setHovered(false); };

  return (
    <div className="[perspective:900px]">
      <motion.div
        ref={ref}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleLeave}
        className="relative cursor-pointer"
      >
        {/* Outer glow ring — intensifies on hover */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            background: hovered
              ? "radial-gradient(circle, rgba(99,102,241,0.45) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
            scale: hovered ? 1.15 : 1,
            filter: hovered ? "blur(18px)" : "blur(10px)",
          }}
          transition={{ duration: 0.4 }}
        />
        {/* Photo */}
        <motion.img
          src={profilePic}
          alt="Abeer Kapoor"
          className="relative z-10 rounded-full object-cover border-2 border-white/80"
          style={{
            width: "clamp(120px, 18vw, 220px)",
            height: "clamp(120px, 18vw, 220px)",
            boxShadow: "0 20px 60px rgba(79,70,229,0.20), 0 4px 16px rgba(0,0,0,0.10)",
          }}
          animate={{
            filter: hovered ? "grayscale(0%) brightness(1.04)" : "grayscale(8%)",
            scale: hovered ? 1.04 : 1,
          }}
          transition={{ duration: 0.4 }}
        />
        {/* Mouse-follow shimmer */}
        {hovered && (
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none z-20"
            style={{
              background: `radial-gradient(circle at ${shimmerX} ${shimmerY}, rgba(255,255,255,0.35) 0%, transparent 55%)`,
            }}
          />
        )}
      </motion.div>
    </div>
  );
};

const Intro = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 pt-20 pb-12">
    {/* Ambient background */}
    <div className="orb orb-indigo w-[500px] h-[500px] -top-24 -left-24 opacity-60" />
    <div className="orb orb-violet w-[400px] h-[400px] top-1/2 -right-20 opacity-50" />
    <div className="orb orb-cyan w-[300px] h-[300px] bottom-0 left-1/2 opacity-40" />

    <div className="relative z-10 w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* LEFT — text content */}
        <div className="flex flex-col gap-6 order-2 lg:order-1">
          {/* Mono label */}
          <motion.div
            className="text-label"
            initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            Software Engineer · Bhilai, India
          </motion.div>

          {/* Name — editorial */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h1
            style={{
              fontFamily: "'Cinzel Decorative', serif",
                fontWeight: 900,
              fontSize: "clamp(2.6rem, 7vw, 6rem)",
              letterSpacing: "-0.01em",
              lineHeight: 1.05,
              color: "var(--text-primary)",
            }}
          >
            Abeer<br />
            <span className="grad-text-primary">Kapoor</span>
          </h1>
          </motion.div>

          {/* Accent line */}
          <motion.div
            className="accent-line"
            initial={{ scaleX: 0, originX: 0 }} animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />

          {/* Role line */}
          <motion.p
            className="font-display font-semibold tracking-tight"
            style={{ fontSize: "clamp(1rem, 2.2vw, 1.3rem)", color: "var(--text-secondary)" }}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Full-Stack Engineer · AI Builder · Hackathon Winner
          </motion.p>

          {/* Human copy — Abeer's voice */}
          <motion.p
            className="prose-portfolio"
            style={{ maxWidth: "42ch" }}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Build things people actually use — from Ayurveda SaaS with paying clients
            to AI platforms serving Tier 2/3 India. Chhattisgarh raised, not a limitation.
          </motion.p>

          {/* Stats row */}
          <motion.div
            className="grid grid-cols-4 gap-3 pt-2"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                className="glass-card rounded-xl p-3 text-center"
                whileHover={{ y: -3, scale: 1.03 }}
                transition={{ delay: i * 0.05 }}
              >
                <div
                  className="font-display font-bold grad-text-primary"
                  style={{ fontSize: "clamp(1rem, 2vw, 1.4rem)", lineHeight: 1.1 }}
                >
                  {s.value}
                </div>
                <div className="text-label mt-1" style={{ fontSize: "0.6rem" }}>{s.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA row */}
          <motion.div
            className="flex flex-wrap gap-3 pt-1"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <a href={RESUME} onClick={handleDownload} className="btn-primary">
              <Download size={14} strokeWidth={2.5} />
              Download CV
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              <FaLinkedin size={14} />
              <span>LinkedIn</span>
            </a>
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              <FaGithub size={14} />
              <span>GitHub</span>
            </a>
            <a href="https://x.com/AbeerKapoor1/" target="_blank" rel="noopener noreferrer" className="btn-secondary">
              <FaXTwitter size={14} />
            </a>
          </motion.div>
        </div>

        {/* RIGHT — photo */}
        <motion.div
          className="flex justify-center lg:justify-end order-1 lg:order-2"
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <ProfilePhoto />
        </motion.div>
      </div>

      {/* Scroll cue — minimal, text + icon */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span className="text-label" style={{ fontSize: "0.6rem" }}>scroll</span>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
          <ArrowDown size={14} style={{ color: "var(--text-muted)" }} strokeWidth={1.5} />
        </motion.div>
      </motion.div>
    </div>
  </section>
);

export default Intro;
