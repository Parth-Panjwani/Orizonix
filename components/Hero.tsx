"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef, useCallback } from "react";

/* ── Animated Counter ── */
function AnimatedCounter({ end, suffix = "" }: { end: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTime: number;
          const animate = (t: number) => {
            if (!startTime) startTime = t;
            const progress = Math.min((t - startTime) / 2000, 1);
            const easeOut = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(end * easeOut));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [end]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ── Staggered word animation ── */
const headlineWords = ["Turn", "Attention", "Into"];
const gradientWords = ["Predictable", "Revenue"];

const trustStats = [
  { value: 150, suffix: "+", label: "Campaigns" },
  { value: 40, suffix: "+", label: "Brands" },
  { value: 4.2, suffix: "x", label: "Avg ROI" },
];

/* ── Floating data nodes ── */
const dataNodes = [
  { x: "10%", y: "22%", delay: 0, size: 6 },
  { x: "88%", y: "18%", delay: 1.5, size: 5 },
  { x: "78%", y: "72%", delay: 3, size: 7 },
  { x: "15%", y: "78%", delay: 2, size: 5 },
  { x: "52%", y: "12%", delay: 4, size: 6 },
  { x: "35%", y: "85%", delay: 2.5, size: 4 },
  { x: "65%", y: "30%", delay: 3.5, size: 4 },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
  }, []);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center justify-center pt-24 pb-12 px-4 md:px-8 overflow-hidden section-dark"
    >
      {/* Gradient Mesh Background */}
      <div className="hero-mesh" />

      {/* Cursor-reactive Radial Glow */}
      <div
        className="hero-cursor-glow hidden md:block"
        style={{
          left: mousePos.x - 300,
          top: mousePos.y - 300,
          opacity: isHovering ? 1 : 0,
          transform: `translate3d(0, 0, 0)`,
        }}
      />

      {/* Headline Radial Glow */}
      <div className="headline-glow" />

      {/* Animated SVG Graph Line */}
      <svg
        className="absolute bottom-0 left-0 w-full h-48 opacity-[0.05] pointer-events-none"
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0 180 Q100 160 200 140 T400 100 T600 80 T800 50 T1000 30 T1200 10"
          fill="none"
          stroke="#3B82F6"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3, ease: "easeOut", delay: 0.5 }}
        />
      </svg>

      {/* Floating Data Nodes */}
      {dataNodes.map((node, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: node.x,
            top: node.y,
            width: node.size,
            height: node.size,
            background: "radial-gradient(circle, rgba(59,130,246,0.5) 0%, rgba(59,130,246,0.15) 100%)",
            boxShadow: "0 0 8px rgba(59,130,246,0.2)",
          }}
          animate={{
            y: [0, -16, 6, -10, 0],
            opacity: [0.25, 0.6, 0.35, 0.7, 0.25],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            delay: node.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 container mx-auto max-w-4xl text-center">
        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-sm md:text-base font-medium text-blue-400 tracking-widest uppercase mb-6"
        >
          Revenue Growth Systems Partner
        </motion.p>

        {/* Headline — staggered words */}
        <h1 className="text-hero font-heading text-white mb-6 leading-none">
          {headlineWords.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="inline-block mr-[0.3em]"
            >
              {word}
            </motion.span>
          ))}
          <br />
          {gradientWords.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
              className="inline-block mr-[0.3em] gradient-text"
              style={{
                filter: "drop-shadow(0 0 30px rgba(37,99,235,0.25))",
              }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-[17px] md:text-lg text-zinc-400 mb-10 leading-relaxed max-w-2xl mx-auto"
        >
          We design and execute scalable growth systems that help ambitious
          brands acquire customers, increase ROI, and grow sustainably.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.85 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-14"
        >
          <a
            href="#contact"
            className="px-8 py-4 btn-primary rounded-lg text-base font-semibold"
          >
            Book a Strategy Call →
          </a>
          <a
            href="#case-studies"
            className="px-8 py-4 btn-secondary rounded-lg text-base"
          >
            View Case Studies
          </a>
        </motion.div>

        {/* Trust Strip — 3-col grid always */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="grid grid-cols-3 gap-4 max-w-md mx-auto"
        >
          {trustStats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-stat font-heading text-white">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xs md:text-sm text-zinc-500 mt-1 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
