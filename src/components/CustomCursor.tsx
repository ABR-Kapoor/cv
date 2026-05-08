import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type CursorVariant = "default" | "hover" | "click" | "text";

let setCursorVariantGlobal: ((v: CursorVariant) => void) | null = null;

export const useCursor = () => {
  const enter = (v: CursorVariant = "hover") => setCursorVariantGlobal?.(v);
  const leave = () => setCursorVariantGlobal?.("default");
  const click = () => {
    setCursorVariantGlobal?.("click");
    setTimeout(() => setCursorVariantGlobal?.("default"), 150);
  };
  return { enter, leave, click };
};

const CustomCursor = () => {
  const [variant, setVariant] = useState<CursorVariant>("default");
  const [visible, setVisible] = useState(false);
  const isTouch = useRef(false);

  setCursorVariantGlobal = setVariant;

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);

  // dot — instant
  const dotX = useSpring(mx, { stiffness: 1000, damping: 50, mass: 0.1 });
  const dotY = useSpring(my, { stiffness: 1000, damping: 50, mass: 0.1 });

  // ring — lags behind nicely
  const ringX = useSpring(mx, { stiffness: 160, damping: 20, mass: 0.5 });
  const ringY = useSpring(my, { stiffness: 160, damping: 20, mass: 0.5 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      isTouch.current = true;
      return;
    }

    const move = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      setVisible(true);
    };
    const down = () => setVariant("click");
    const up = () => setVariant("default");
    const leave = () => setVisible(false);
    const enter = () => setVisible(true);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);

    // Auto-detect interactive elements
    const addListeners = () => {
      document.querySelectorAll("a, button, [role=button], input, textarea, select, label").forEach(el => {
        el.addEventListener("mouseenter", () => setCursorVariantGlobal?.("hover"));
        el.addEventListener("mouseleave", () => setCursorVariantGlobal?.("default"));
      });
    };
    addListeners();
    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
      observer.disconnect();
    };
  }, []);

  if (isTouch.current) return null;

  const ringSize = variant === "hover" ? 42 : variant === "click" ? 16 : variant === "text" ? 60 : 28;
  const ringOpacity = variant === "click" ? 0.3 : 0.6;
  const dotSize = variant === "click" ? 6 : 6;

  return (
    <>
      {/* Ring — lags */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border"
        style={{
          x: ringX,
          y: ringY,
          width: ringSize,
          height: ringSize,
          translateX: "-50%",
          translateY: "-50%",
          borderColor: variant === "hover" ? "rgba(79,70,229,0.7)" : "rgba(79,70,229,0.4)",
          opacity: visible ? ringOpacity : 0,
          mixBlendMode: "multiply",
        }}
        animate={{ width: ringSize, height: ringSize }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
      />
      {/* Dot — instant */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          x: dotX,
          y: dotY,
          width: dotSize,
          height: dotSize,
          translateX: "-50%",
          translateY: "-50%",
          background: variant === "hover" ? "#4f46e5" : "#0f0f0f",
          opacity: visible ? 1 : 0,
        }}
        animate={{ width: dotSize, height: dotSize }}
        transition={{ type: "spring", stiffness: 600, damping: 30 }}
      />
    </>
  );
};

export default CustomCursor;
