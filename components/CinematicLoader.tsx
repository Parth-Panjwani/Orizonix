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
      if (sessionStorage.getItem("auravis-loaded")) {
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
        sessionStorage.setItem("auravis-loaded", "1");
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
                  "radial-gradient(ellipse at center, rgba(212,168,83,0.08) 0%, transparent 70%)",
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
              style={{ filter: "drop-shadow(0 0 16px rgba(212,168,83,0.3))" }}
            >
              <Image
                src="/Auravis.png"
                alt="Auravis"
                width={64}
                height={64}
                className="object-contain"
                priority
              />
            </div>
            <span className="text-lg font-brand font-semibold tracking-tight" style={{ color: "var(--text-primary)" }}>
              Auravis
            </span>
          </motion.div>

          {/* Progress line */}
          <div className="relative z-10 mt-6 w-32 h-[2px] rounded-full overflow-hidden" style={{ background: "var(--border-subtle)" }}>
            <div
              className="absolute inset-0 rounded-full loader-progress"
              style={{
                background:
                  "linear-gradient(90deg, #D4A853 0%, #e8c25a 60%, #D4A853 100%)",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
