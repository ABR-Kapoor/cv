import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const frames = ['Building', 'Compiling', 'Deploying', 'Almost'];

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [frameIdx, setFrameIdx] = useState(0);

  useEffect(() => {
    const fT = setInterval(() => setFrameIdx(p => (p + 1) % frames.length), 600);
    const pT = setInterval(() => setProgress(p => { if (p >= 100) { clearInterval(pT); return 100; } return p + 2; }), 28);
    return () => { clearInterval(fT); clearInterval(pT); };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center"
      style={{ background: "#f7f6f3", zIndex: 9999 }}
      initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}
    >
      {/* Ambient orbs */}
      <motion.div
        className="absolute w-96 h-96 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)", top: "5%", left: "0%" }}
        animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-72 h-72 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 70%)", bottom: "5%", right: "5%" }}
        animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 8, repeat: Infinity, delay: 1 }}
      />

      <div className="relative text-center w-72">
        {/* Card */}
        <motion.div
          className="rounded-2xl p-8 mb-5"
          style={{
            background: "rgba(255,255,255,0.72)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.80)",
            boxShadow: "0 16px 48px rgba(79,70,229,0.10)",
          }}
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Logo */}
          <div className="mb-5">
            <span
              className="font-display font-bold tracking-tight"
              style={{ fontSize: "1.8rem", color: "var(--text-primary)" }}
            >
              Abeer
            </span>
            <span
              className="font-mono text-sm px-1.5 py-0.5 rounded ml-1"
              style={{ background: "var(--accent-primary)", color: "#fff", fontSize: "0.7rem" }}
            >
              .dev
            </span>
          </div>

          {/* Animated text */}
          <motion.p
            key={frameIdx}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="font-mono text-sm"
            style={{ color: "var(--text-muted)", letterSpacing: "0.04em", fontSize: "0.72rem" }}
          >
            {frames[frameIdx]}...
          </motion.p>
        </motion.div>

        {/* Progress bar */}
        <div
          className="h-1.5 rounded-full overflow-hidden"
          style={{ background: "rgba(79,70,229,0.10)" }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, #4f46e5, #7c3aed)" }}
            initial={{ width: 0 }} animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>
        <p className="font-mono text-xs mt-2" style={{ color: "var(--text-faint)", fontSize: "0.65rem" }}>
          {progress}%
        </p>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
