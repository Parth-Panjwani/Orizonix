"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

const steps = [
  {
    number: "01",
    title: "Deep Audit",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        <line x1="8" y1="11" x2="14" y2="11" />
        <line x1="11" y1="8" x2="11" y2="14" />
      </svg>
    ),
    description: "Data, funnel gaps, competitor landscape, CAC analysis.",
    detail: "We deep-dive into your current marketing stack, identifying leaks in your funnel, benchmarking against competitors, and mapping unit economics to build the foundation for a scalable system.",
  },
  {
    number: "02",
    title: "Strategy Blueprint",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
    description: "Channel mix, messaging architecture, budget allocation, KPI mapping.",
    detail: "We design a complete growth strategy — selecting the highest-ROI channels, crafting message-market fit, setting budget guardrails, and defining measurable success metrics.",
  },
  {
    number: "03",
    title: "Performance Execution",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    description: "Paid media, CRO, landing systems, creative testing.",
    detail: "Our execution team launches campaigns, builds high-converting landing pages, runs systematic creative tests, and optimizes every touchpoint for maximum conversion.",
  },
  {
    number: "04",
    title: "Scale & Optimize",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
    description: "Automation, CRM integration, advanced analytics, iterative scaling.",
    detail: "Once the system proves ROI, we layer in automation, integrate your CRM, and use advanced analytics to systematically scale what works — turning campaigns into growth engines.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.15, ease: [0.4, 0, 0.2, 1] },
  }),
};

/* ── Flowing particles for desktop path ── */
function FlowingParticles() {
  return (
    <g className="flowing-particles">
      {[0, 1, 2].map((i) => (
        <circle key={i} r="2.5" fill="#3B82F6" opacity="0">
          <animateMotion
            dur="4s"
            repeatCount="indefinite"
            begin={`${i * 1.3}s`}
            path="M0,0 L230,0 L460,0 L690,0"
          />
          <animate
            attributeName="opacity"
            values="0;0.6;0.6;0"
            dur="4s"
            repeatCount="indefinite"
            begin={`${i * 1.3}s`}
          />
        </circle>
      ))}
    </g>
  );
}

export default function Process() {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 md:py-24 px-4 md:px-8 section-darker">
      <div className="container mx-auto max-w-5xl" ref={sectionRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="section-label mb-3 block">Our Process</span>
          <h2 className="text-section font-heading text-white">
            How We Drive Growth
          </h2>
        </motion.div>

        {/* Desktop: Interactive Horizontal Diagram */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Connecting SVG Path */}
            <svg
              className="absolute top-[36px] left-[12.5%] right-[12.5%] h-[4px] overflow-visible pointer-events-none"
              style={{ width: "75%" }}
              viewBox="0 0 690 4"
              preserveAspectRatio="none"
            >
              <motion.line
                x1="0" y1="2" x2="690" y2="2"
                stroke="rgba(37,99,235,0.15)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <motion.line
                x1="0" y1="2" x2="690" y2="2"
                stroke="#2563EB"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
              />
              {/* Glow on active segment */}
              {activeStep !== null && activeStep < 3 && (
                <line
                  x1={activeStep * 230}
                  y1="2"
                  x2={(activeStep + 1) * 230}
                  y2="2"
                  stroke="#3B82F6"
                  strokeWidth="4"
                  strokeLinecap="round"
                  style={{ filter: "drop-shadow(0 0 8px rgba(59,130,246,0.6))" }}
                />
              )}
              {isInView && <FlowingParticles />}
            </svg>

            <div className="grid grid-cols-4 gap-6 relative">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  className="text-center cursor-pointer group"
                  onMouseEnter={() => setActiveStep(index)}
                  onMouseLeave={() => setActiveStep(null)}
                >
                  {/* Node circle */}
                  <motion.div
                    className={`w-[72px] h-[72px] rounded-2xl flex items-center justify-center mx-auto mb-6 relative z-10 transition-all duration-300 ${
                      activeStep === index
                        ? "bg-blue-600/20 border-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.2)]"
                        : "bg-surface-alt border-blue-600/30"
                    } border`}
                    animate={
                      activeStep === index
                        ? { scale: 1.1 }
                        : { scale: 1 }
                    }
                    transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <div className={`text-blue-400 transition-all duration-300 ${
                      activeStep === index ? "scale-110" : ""
                    }`}>
                      {step.icon}
                    </div>
                  </motion.div>

                  <h3 className="text-card-title font-heading text-white mb-2">
                    {step.title}
                  </h3>

                  {/* Short description always visible */}
                  <p className="text-[15px] text-zinc-400 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Extended detail on hover */}
                  <AnimatePresence>
                    {activeStep === index && (
                      <motion.p
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: "auto", marginTop: 12 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                        className="text-[13px] text-zinc-500 leading-relaxed overflow-hidden"
                      >
                        {step.detail}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: Vertical Connected Diagram */}
        <div className="md:hidden">
          <div className="relative pl-8">
            {/* Vertical connecting line */}
            <motion.div
              className="absolute left-[15px] top-0 bottom-0 w-[2px] bg-blue-600/10"
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
              style={{ transformOrigin: "top" }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-blue-600 to-blue-600/20"
                initial={{ scaleY: 0 }}
                animate={isInView ? { scaleY: 1 } : {}}
                transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
                style={{ transformOrigin: "top" }}
              />
            </motion.div>

            <div className="space-y-6">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  className="relative"
                  onClick={() => setActiveStep(activeStep === index ? null : index)}
                >
                  {/* Node dot */}
                  <div className="absolute -left-8 top-3 w-[30px] h-[30px] rounded-lg bg-surface-alt border border-blue-600/40 flex items-center justify-center z-10">
                    <span className="text-[10px] font-heading font-bold text-blue-400">
                      {step.number}
                    </span>
                  </div>

                  <div className="glass-card rounded-xl p-4">
                    <h3 className="text-[15px] font-heading font-semibold text-white mb-1.5">
                      {step.title}
                    </h3>
                    <p className="text-[13px] text-zinc-400 leading-relaxed">
                      {step.description}
                    </p>

                    <AnimatePresence>
                      {activeStep === index && (
                        <motion.p
                          initial={{ opacity: 0, height: 0, marginTop: 0 }}
                          animate={{ opacity: 1, height: "auto", marginTop: 8 }}
                          exit={{ opacity: 0, height: 0, marginTop: 0 }}
                          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                          className="text-[12px] text-zinc-500 leading-relaxed border-t border-white/[0.06] pt-2 overflow-hidden"
                        >
                          {step.detail}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
