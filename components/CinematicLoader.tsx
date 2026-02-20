"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function CinematicLoader({ onComplete }: { onComplete: () => void }) {
  const [visible, setVisible] = useState(true);
  const [skip, setSkip] = useState(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    // Skip if already loaded this session
    try {
      if (sessionStorage.getItem("orizonix-loaded")) {
        setSkip(true);
        setVisible(false);
        onCompleteRef.current();
        return;
      }
    } catch {
      // sessionStorage unavailable — proceed with loader
    }

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = prefersReducedMotion ? 200 : 1400;

    const timer = setTimeout(() => {
      setVisible(false);
      try {
        sessionStorage.setItem("orizonix-loaded", "1");
      } catch {
        // ignore
      }
    }, duration);

    return () => clearTimeout(timer);
  }, []);

  // Call onComplete after exit animation finishes
  const handleExitComplete = useCallback(() => {
    onCompleteRef.current();
  }, []);

  // Already loaded — render nothing
  if (skip) return null;

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
          style={{ background: "var(--bg-primary)" }}
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
            <span className="text-lg font-heading font-semibold tracking-tight" style={{ color: "var(--text-primary)" }}>
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
