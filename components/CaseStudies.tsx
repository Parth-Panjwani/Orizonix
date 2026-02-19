"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";

/* ── Animated Counter for Modal ── */
function ModalCounter({ end, suffix = "" }: { end: string; suffix?: string }) {
  const numericPart = parseFloat(end.replace(/[^0-9.]/g, ""));
  const prefix = end.replace(/[0-9.]+/g, "").replace(suffix, "");
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!hasAnimated.current) {
      hasAnimated.current = true;
      let startTime: number;
      const animate = (t: number) => {
        if (!startTime) startTime = t;
        const progress = Math.min((t - startTime) / 1500, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(numericPart * easeOut * 10) / 10);
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }
  }, [numericPart]);

  const displayVal = Number.isInteger(numericPart)
    ? Math.floor(count)
    : (Math.floor(count * 10) / 10).toFixed(1);

  return (
    <span ref={ref}>
      {prefix}{displayVal}{suffix}
    </span>
  );
}

/* ── Mini Performance Graph ── */
function MiniGraph() {
  return (
    <svg viewBox="0 0 200 60" className="w-full h-16 opacity-50" preserveAspectRatio="none">
      <defs>
        <linearGradient id="graphGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d="M0 55 Q20 50 40 45 T80 35 T120 25 T160 15 T200 8"
        fill="none"
        stroke="#3B82F6"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
      />
      <motion.path
        d="M0 55 Q20 50 40 45 T80 35 T120 25 T160 15 T200 8 L200 60 L0 60 Z"
        fill="url(#graphGrad)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      />
    </svg>
  );
}

const caseStudies = [
  {
    tag: "B2B SaaS",
    title: "B2B SaaS Brand",
    challenge: "High traffic but low demo conversions. Visitors were landing but not converting into qualified pipeline.",
    strategy: [
      "Funnel restructuring",
      "Landing page CRO",
      "Multi-angle creative testing",
      "Retargeting automation",
    ],
    implementation: "We rebuilt the entire demo-booking funnel with heat-map-driven UX changes, launched 12 creative variations per week, and implemented a 3-stage retargeting sequence to capture lost pipeline.",
    results: [
      { metric: "173%", label: "Increase in Qualified Leads" },
      { metric: "38%", label: "Lower Cost Per Acquisition" },
      { metric: "4.6x", label: "ROAS" },
    ],
    period: "90 days",
  },
  {
    tag: "E-commerce",
    title: "E-commerce Lifestyle Brand",
    challenge: "Rising ad costs and inconsistent revenue. Monthly performance was volatile and unpredictable.",
    strategy: [
      "Offer repositioning",
      "Creative strategy revamp",
      "Advanced audience segmentation",
      "Email automation flows",
    ],
    implementation: "We redesigned their offer stack to increase perceived value, launched a UGC-first creative strategy, built 18 custom audiences, and automated 6 email flows covering the full customer lifecycle.",
    results: [
      { metric: "212%", label: "Revenue Growth" },
      { metric: "31%", label: "Higher AOV" },
      { metric: "5.1x", label: "Average ROAS" },
    ],
    period: "6 months",
  },
  {
    tag: "Professional Services",
    title: "Professional Services Firm",
    challenge: "No structured lead generation system. Relied entirely on referrals with zero digital pipeline.",
    strategy: [
      "Funnel buildout",
      "Paid acquisition campaigns",
      "WhatsApp automation",
      "CRM integration",
    ],
    implementation: "We built their first digital lead-gen system from scratch – landing pages, Google & Meta campaigns, automated WhatsApp follow-ups, and a CRM pipeline to track every lead from click to close.",
    results: [
      { metric: "86", label: "Qualified Leads in 60 Days" },
      { metric: "28%", label: "Close Rate" },
      { metric: "3.8x", label: "ROI" },
    ],
    period: "60 days",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] },
  }),
};

/* ── Case Study Modal ── */
function CaseStudyModal({
  study,
  onClose,
}: {
  study: typeof caseStudies[0];
  onClose: () => void;
}) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Focus trap
  useEffect(() => {
    const el = modalRef.current;
    if (!el) return;

    const focusableElements = el.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    firstFocusable?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable?.focus();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable?.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="modal-backdrop"
        onClick={onClose}
      />

      {/* Modal Content */}
      <motion.div
        ref={modalRef}
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="modal-content"
        role="dialog"
        aria-modal="true"
        aria-label={`Case Study: ${study.title}`}
      >
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <span className="inline-block px-3 py-1 text-xs font-semibold bg-blue-600/10 text-blue-400 rounded-full mb-3">
                {study.tag}
              </span>
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-white">
                {study.title}
              </h3>
              <p className="text-sm text-zinc-500 mt-1">
                Results achieved in {study.period}
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors duration-200 text-zinc-400 hover:text-white flex-shrink-0"
              aria-label="Close modal"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Challenge */}
          <div className="mb-6">
            <p className="text-xs uppercase tracking-wider text-blue-400 font-semibold mb-2">
              Challenge
            </p>
            <p className="text-[15px] text-zinc-300 leading-relaxed">
              {study.challenge}
            </p>
          </div>

          {/* Strategy */}
          <div className="mb-6">
            <p className="text-xs uppercase tracking-wider text-blue-400 font-semibold mb-2">
              Strategy
            </p>
            <div className="grid grid-cols-2 gap-2">
              {study.strategy.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                  className="flex items-center gap-2 text-[14px] text-zinc-400"
                >
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0" />
                  {s}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Implementation */}
          <div className="mb-6">
            <p className="text-xs uppercase tracking-wider text-blue-400 font-semibold mb-2">
              Implementation
            </p>
            <p className="text-[14px] text-zinc-400 leading-relaxed">
              {study.implementation}
            </p>
          </div>

          {/* Performance Graph */}
          <div className="mb-6 rounded-xl bg-white/[0.02] border border-white/[0.04] p-4">
            <p className="text-xs uppercase tracking-wider text-zinc-500 mb-2">
              Performance Trend
            </p>
            <MiniGraph />
          </div>

          {/* Results — Large Metric Cards */}
          <div className="mb-2">
            <p className="text-xs uppercase tracking-wider text-blue-400 font-semibold mb-3">
              Results ({study.period})
            </p>
            <div className="grid grid-cols-3 gap-3">
              {study.results.map((result, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="bg-blue-600/[0.06] border border-blue-500/10 rounded-xl p-4 text-center"
                >
                  <div className="text-2xl md:text-3xl font-heading font-bold text-white mb-1">
                    <ModalCounter
                      end={result.metric}
                      suffix={result.metric.includes("x") ? "x" : result.metric.includes("%") ? "%" : ""}
                    />
                  </div>
                  <div className="text-[11px] text-zinc-500 leading-tight uppercase tracking-wide">
                    {result.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default function CaseStudies() {
  const [selectedStudy, setSelectedStudy] = useState<typeof caseStudies[0] | null>(null);

  return (
    <section id="case-studies" className="py-20 md:py-24 px-4 md:px-8 section-darker">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="section-label mb-3 block">Results</span>
          <h2 className="text-section font-heading text-white mb-4">
            Growth in Action
          </h2>
          <p className="text-[16px] md:text-[17px] text-zinc-400 max-w-xl mx-auto">
            Real strategies. Measurable outcomes. Here&apos;s how we&apos;ve helped brands scale.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-3 md:gap-5">
          {caseStudies.map((study, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="glass-card rounded-xl overflow-hidden flex flex-col"
            >
              <div className="p-5 sm:p-6 pb-0">
                <span className="inline-block px-3 py-1 text-xs font-semibold bg-blue-600/10 text-blue-400 rounded-full mb-4">
                  {study.tag}
                </span>
                <h3 className="text-card-title font-heading text-white mb-3">
                  {study.title}
                </h3>
              </div>

              <div className="px-5 sm:px-6 pb-4 flex-grow">
                <p className="text-xs uppercase tracking-wider text-zinc-500 mb-1.5">
                  Challenge
                </p>
                <p className="text-[14px] sm:text-[15px] text-zinc-400 leading-relaxed mb-4">
                  {study.challenge}
                </p>

                <p className="text-xs uppercase tracking-wider text-zinc-500 mb-1.5">
                  Strategy
                </p>
                <ul className="space-y-1 mb-4">
                  {study.strategy.map((s, i) => (
                    <li key={i} className="text-[14px] sm:text-[15px] text-zinc-400 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-white/[0.06] p-5 sm:p-6 bg-blue-600/[0.03]">
                <p className="text-xs uppercase tracking-wider text-zinc-500 mb-3">
                  Results ({study.period})
                </p>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {study.results.map((result, i) => (
                    <div key={i} className="text-center">
                      <div className="text-lg sm:text-xl font-heading font-bold text-blue-400">
                        {result.metric}
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-zinc-500 leading-tight mt-1">
                        {result.label}
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setSelectedStudy(study)}
                  className="w-full py-2.5 rounded-lg text-[13px] font-semibold text-blue-400 border border-blue-500/20 hover:bg-blue-600/10 hover:border-blue-500/30 transition-all duration-250 cursor-pointer"
                >
                  View Case Study →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedStudy && (
          <CaseStudyModal
            study={selectedStudy}
            onClose={() => setSelectedStudy(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
