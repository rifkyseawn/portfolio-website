"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Subtle, non-blocking cursor-follow glow used across the site.
 * Avoids pointer interference by being pointer-events:none and softly blurred.
 */
export function CursorGlow() {
  const [visible, setVisible] = useState(false);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 50, damping: 18, mass: 0.8 });
  const y = useSpring(rawY, { stiffness: 50, damping: 18, mass: 0.8 });
  const frame = useRef<number>();

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (frame.current) cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        rawX.set(e.clientX);
        rawY.set(e.clientY);
        setVisible(true);
      });
    };
    const handleLeave = () => setVisible(false);

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [rawX, rawY]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-30"
      style={{ x, y, translateX: "-50%", translateY: "-50%" }}
    >
      <motion.div
        className="w-64 h-64 rounded-full blur-3xl opacity-0"
        style={{
          background:
            "radial-gradient(circle at center, rgba(56, 189, 248, 0.14), rgba(56, 189, 248, 0.0) 60%)",
        }}
        animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.9 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      />
    </motion.div>
  );
}
