"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function CinematicLoader({ onComplete }: { onComplete: () => void }) {
  const [visible, setVisible] = useState(true);
  const hasRun = useRef(false);

  useEffect(() => {
    // Skip if cached
    if (sessionStorage.getItem("orizonix-loaded")) {
      setVisible(false);
      onComplete();
      return;
    }

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = prefersReducedMotion ? 200 : 1400;

    hasRun.current = true;
    const timer = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("orizonix-loaded", "1");
      setTimeout(onComplete, 300); // wait for exit animation
    }, duration);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!hasRun.current && typeof window !== "undefined" && sessionStorage.getItem("orizonix-loaded")) {
    return null;
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
          style={{ background: "#0B0F1A" }}
        >
          {/* Sweep light */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute top-1/2 -translate-y-1/2 w-64 h-[500px] loader-sweep"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(37,99,235,0.12) 0%, transparent 70%)",
                filter: "blur(40px)",
              }}
            />
          </div>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="relative z-10 flex flex-col items-center"
          >
            <div
              className="w-16 h-16 rounded-xl overflow-hidden mb-4"
              style={{ filter: "drop-shadow(0 0 20px rgba(59,130,246,0.4))" }}
            >
              <Image
                src="/Orizonix.png"
                alt="Orizonix"
                width={64}
                height={64}
                className="object-contain brightness-[1.8]"
                priority
              />
            </div>
            <span className="text-white/90 text-lg font-heading font-semibold tracking-tight">
              Orizonix
            </span>
          </motion.div>

          {/* Progress line */}
          <div className="relative z-10 mt-6 w-32 h-[2px] bg-white/5 rounded-full overflow-hidden">
            <div
              className="absolute inset-0 rounded-full loader-progress"
              style={{
                background:
                  "linear-gradient(90deg, #2563EB 0%, #60A5FA 60%, #2563EB 100%)",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
