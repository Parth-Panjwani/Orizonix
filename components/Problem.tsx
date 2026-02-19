"use client";

import { motion } from "framer-motion";

const painPoints = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
    title: "Spending Without ROI",
    description:
      "Budget goes out, but qualified leads don't come back. No clear attribution, no control.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: "Random & Reactive",
    description:
      "Marketing feels scattered. No structured strategy means no compounding growth or predictability.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Agencies That Don't Think",
    description:
      "You get deliverables, not outcomes. Tasks executed, but no strategic thinking behind them.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
    title: "Unpredictable Growth",
    description:
      "Revenue is volatile month-to-month. No system means no forecasting, no confidence.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.1, ease: "easeOut" },
  }),
};

export default function Problem() {
  return (
    <section className="py-20 md:py-24 px-4 md:px-8 section-dark">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="section-label mb-3 block">The Problem</span>
          <h2 className="text-section font-heading text-white">
            Sound Familiar?
          </h2>
        </motion.div>

        {/* 2x2 grid always */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5">
          {painPoints.map((point, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="glass-card rounded-xl p-4 sm:p-6 md:p-8"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 + 0.15 }}
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-400 icon-glow mb-4"
              >
                {point.icon}
              </motion.div>
              <h3 className="text-card-title font-heading text-white mb-2">
                {point.title}
              </h3>
              <p className="text-[14px] sm:text-[16px] text-zinc-400 leading-relaxed">
                {point.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
