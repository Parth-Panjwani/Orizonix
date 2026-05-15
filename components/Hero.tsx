"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useCallback } from "react";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const brandY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const brandScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const brandOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    setMousePos({ x: e.clientX, y: e.clientY });
    setIsHovering(true);
  }, []);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setIsHovering(false)}
      className="relative bg-black"
    >
      {/* ═══════════════════════════════════════════════ */}
      {/* ────────────── DESKTOP HERO ───────────────── */}
      {/* ═══════════════════════════════════════════════ */}
      <div className="hidden lg:flex h-screen items-center justify-center relative overflow-hidden">
        {/* Subtle corner accents */}
        <div className="absolute top-0 left-0 w-[400px] h-[400px] pointer-events-none"
          style={{ background: "radial-gradient(circle at 0% 0%, rgba(212,168,83,0.03) 0%, transparent 60%)" }}
        />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] pointer-events-none"
          style={{ background: "radial-gradient(circle at 100% 100%, rgba(212,168,83,0.03) 0%, transparent 60%)" }}
        />

        {/* Mouse-follow glow */}
        <div
          className="fixed pointer-events-none z-[5]"
          style={{
            left: mousePos.x - 200,
            top: mousePos.y - 200,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(212,168,83,0.06) 0%, transparent 60%)",
            filter: "blur(20px)",
            opacity: isHovering ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
        />

        {/* AURAVIS — parallax */}
        <motion.div
          style={{ y: brandY, scale: brandScale, opacity: brandOpacity }}
          className="relative z-10 flex flex-col items-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-brand select-none whitespace-nowrap"
            style={{
              fontSize: "clamp(5rem, 11vw, 10rem)",
              lineHeight: "1",
              letterSpacing: "0.02em",
              color: "#D4A853",
              textShadow: "0 0 80px rgba(212,168,83,0.25), 0 0 200px rgba(212,168,83,0.08)",
              padding: "0.15em 0.5em",
            }}
          >
            AURAVIS
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="mt-3"
            style={{
              width: "80px",
              height: "1px",
              background: "linear-gradient(90deg, transparent, rgba(212,168,83,0.4), transparent)",
            }}
          />
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <span className="text-[10px] uppercase tracking-[0.3em]" style={{ color: "#5a5040" }}>
            Scroll
          </span>
          <motion.div
            className="w-[1px] h-5"
            style={{ background: "rgba(212,168,83,0.2)" }}
            animate={{ scaleY: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>

      {/* ═══════════════════════════════════════════════ */}
      {/* ────────────── MOBILE HERO ─────────────────── */}
      {/* ═══════════════════════════════════════════════ */}
      <div className="flex lg:hidden flex-col items-center text-center px-4 relative pt-32 pb-12 overflow-hidden">
        
        {/* Central Core Glow */}
        <div 
          className="absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            width: "140vw",
            height: "60vh",
            background: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(212,168,83,0.1) 0%, transparent 100%)",
            filter: "blur(40px)"
          }}
        />

        <div className="relative z-10 w-full max-w-sm mx-auto flex flex-col items-center justify-center">
          {/* Tagline above */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-4 mb-5"
          >
            <div className="h-[1px] w-8" style={{ background: "linear-gradient(90deg, transparent, rgba(212,168,83,0.6))" }} />
            <span className="text-[10px] font-heading font-semibold uppercase tracking-[0.3em]" style={{ color: "#D4A853" }}>
              Growth Partner
            </span>
            <div className="h-[1px] w-8" style={{ background: "linear-gradient(270deg, transparent, rgba(212,168,83,0.6))" }} />
          </motion.div>

          {/* Brand */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-brand w-full"
            style={{
              fontSize: "clamp(3.5rem, 16vw, 5rem)",
              lineHeight: "1",
              letterSpacing: "0.02em",
              color: "#D4A853",
              textShadow: "0 0 60px rgba(212,168,83,0.3)",
            }}
          >
            AURAVIS
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-[14px] md:text-[16px] mt-5 leading-relaxed px-2"
            style={{ color: "#b8a88a" }}
          >
            Performance marketing &amp; intelligent automation tailored for ambitious brands.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row w-full gap-3 mt-8 px-2"
          >
            <a href="#contact" className="w-full sm:flex-1 py-3.5 btn-primary rounded-lg text-[14px] font-semibold flex justify-center items-center gap-2">
              Book a Strategy Call
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
            <a href="#projects" className="w-full sm:flex-1 py-3.5 rounded-lg text-[14px] font-medium transition-colors duration-300" 
               style={{ border: "1px solid rgba(212,168,83,0.3)", color: "#D4A853", background: "rgba(212,168,83,0.05)" }}>
              Explore Our Work
            </a>
          </motion.div>
        </div>

        {/* Stats at bottom */}
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="w-full mt-10 relative z-10"
        >
          <div className="grid grid-cols-3 gap-2 py-6 px-2 w-full max-w-sm mx-auto" style={{ borderTop: "1px solid rgba(212,168,83,0.15)", borderBottom: "1px solid rgba(212,168,83,0.15)" }}>
            {[
              { val: "150+", label: "Campaigns" },
              { val: "40+", label: "Brands Scaled" },
              { val: "4.2x", label: "Avg. ROI" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-[20px] font-heading font-bold" style={{ color: "#f5f0e8" }}>
                  {s.val}
                </div>
                <div className="text-[9px] uppercase tracking-[0.15em] mt-1" style={{ color: "#8a7d66" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
