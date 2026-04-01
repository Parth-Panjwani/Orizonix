"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useReveal } from "@/hooks/useReveal";

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
    <svg viewBox="0 0 200 60" className="w-full h-16 opacity-60" preserveAspectRatio="none">
      <defs>
        <linearGradient id="graphGradProj" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.25" />
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
        fill="url(#graphGradProj)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      />
    </svg>
  );
}

const projects = [
  {
    tag: "Social Media Marketing",
    title: "D2C Lifestyle Brand",
    challenge:
      "The brand had zero social presence and inconsistent posting. They were invisible to their target audience despite having a strong product.",
    strategy: [
      "Content calendar & brand voice",
      "Reels-first growth strategy",
      "Audience segmentation & targeting",
      "Engagement-driven community building",
    ],
    implementation:
      "We built their entire social media presence from zero — crafted a consistent brand voice, launched a reels-first content strategy with 3 posts per week, and ran targeted engagement campaigns. Within 90 days, their Instagram grew from 400 to 6,200 followers with organic reach surpassing paid benchmarks.",
    results: [
      { metric: "6.2x", label: "Follower Growth (90 days)" },
      { metric: "312%", label: "Organic Reach Increase" },
      { metric: "4.8%", label: "Avg. Engagement Rate" },
    ],
    period: "90 days",
  },
  {
    tag: "Website Redesign",
    title: "Professional Services Firm",
    challenge:
      "An outdated website was costing leads. Visitors bounced within seconds — no clear value prop, no mobile optimisation, and no lead capture system in place.",
    strategy: [
      "UX audit & conversion mapping",
      "High-converting landing page design",
      "WhatsApp & form lead routing",
      "Mobile-first development",
    ],
    implementation:
      "We rebuilt the website from scratch with a clear above-the-fold value proposition, streamlined navigation, and a frictionless contact flow. WhatsApp routing was integrated to convert visitors directly into conversations. Post-launch, bounce rate dropped by 48% and contact form submissions tripled in the first month.",
    results: [
      { metric: "48%", label: "Bounce Rate Reduction" },
      { metric: "3.1x", label: "More Enquiries / Month" },
      { metric: "2.4s", label: "Avg. Page Load Time" },
    ],
    period: "4 weeks",
  },
  {
    tag: "Brand Launch",
    title: "EdTech Startup",
    challenge:
      "A new EdTech startup needed to build credibility and acquire their first 100 paying students with a limited launch budget and no digital presence.",
    strategy: [
      "Brand positioning & messaging",
      "Paid social lead generation",
      "WhatsApp onboarding automation",
      "Referral loop design",
    ],
    implementation:
      "We built the brand identity, launched targeted Meta ad campaigns focused on demo sign-ups, and set up a WhatsApp automation sequence that educated leads and pushed them toward enrollment. A peer-referral programme was built in from day one, turning every student into a growth channel.",
    results: [
      { metric: "127", label: "Students in 60 Days" },
      { metric: "₹310", label: "Cost Per Acquisition" },
      { metric: "34%", label: "Referral-Driven Enrollments" },
    ],
    period: "60 days",
  },
];

/* ── Project Modal ── */
function ProjectModal({
  project,
  onClose,
}: {
  project: typeof projects[0];
  onClose: () => void;
}) {
  const modalRef = useRef<HTMLDivElement>(null);

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
      if (e.key === "Escape") { onClose(); return; }
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
        className="fixed inset-0 z-[100]"
        style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, scale: 0.93, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 8 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="pointer-events-auto w-full max-w-[680px] max-h-[88vh] overflow-y-auto rounded-2xl"
          style={{
            background: "var(--modal-bg)",
            border: "1px solid var(--border-card)",
            boxShadow: "var(--card-shadow)",
          }}
          role="dialog"
          aria-modal="true"
          aria-label={`Project: ${project.title}`}
        >
          <div className="p-6 md:p-8">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <span className="inline-block px-3 py-1 text-xs font-semibold bg-blue-500/10 text-blue-500 rounded-full mb-3">
                  {project.tag}
                </span>
                <h3 className="text-2xl md:text-[26px] font-heading font-bold" style={{ color: "var(--text-primary)" }}>
                  {project.title}
                </h3>
                <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
                  Results achieved in {project.period}
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors duration-200 flex-shrink-0 ml-4"
                style={{ background: "var(--surface-hover)", color: "var(--text-muted)" }}
                aria-label="Close modal"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Challenge */}
            <div className="mb-5">
              <p className="text-xs uppercase tracking-wider text-blue-500 font-semibold mb-2">Challenge</p>
              <p className="text-[15px] leading-relaxed" style={{ color: "var(--text-body)" }}>
                {project.challenge}
              </p>
            </div>

            {/* Strategy */}
            <div className="mb-5">
              <p className="text-xs uppercase tracking-wider text-blue-500 font-semibold mb-2">Strategy</p>
              <div className="grid grid-cols-2 gap-2">
                {project.strategy.map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.07 }}
                    className="flex items-center gap-2 text-[14px]"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0" />
                    {s}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Implementation */}
            <div className="mb-5">
              <p className="text-xs uppercase tracking-wider text-blue-500 font-semibold mb-2">What We Did</p>
              <p className="text-[14px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {project.implementation}
              </p>
            </div>

            {/* Graph */}
            <div className="mb-5 rounded-xl p-4" style={{ background: "var(--surface-glass)", border: "1px solid var(--border-subtle)" }}>
              <p className="text-xs uppercase tracking-wider mb-2" style={{ color: "var(--text-muted)" }}>
                Performance Trend
              </p>
              <MiniGraph />
            </div>

            {/* Results */}
            <div>
              <p className="text-xs uppercase tracking-wider text-blue-500 font-semibold mb-3">
                Results ({project.period})
              </p>
              <div className="grid grid-cols-3 gap-3">
                {project.results.map((result, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 + i * 0.08 }}
                    className="rounded-xl p-4 text-center"
                    style={{ background: "rgba(37,99,235,0.06)", border: "1px solid rgba(37,99,235,0.1)" }}
                  >
                    <div className="text-2xl md:text-3xl font-heading font-bold mb-1" style={{ color: "var(--text-primary)" }}>
                      <ModalCounter
                        end={result.metric}
                        suffix={
                          result.metric.includes("x") ? "x"
                          : result.metric.includes("%") ? "%"
                          : ""
                        }
                      />
                    </div>
                    <div className="text-[11px] leading-tight uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>
                      {result.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const { ref, revealed } = useReveal();

  return (
    <section id="projects" className="py-20 md:py-24 px-4 md:px-8 section-darker">
      <div className="container mx-auto max-w-6xl" ref={ref}>
        <div className={`text-center mb-12 reveal ${revealed ? "revealed" : ""}`}>
          <span className="section-label mb-3 block">Our Work</span>
          <h2 className="text-section font-heading mb-4" style={{ color: "var(--text-primary)" }}>
            Projects We&apos;ve Delivered
          </h2>
          <p className="text-[16px] md:text-[17px] max-w-xl mx-auto" style={{ color: "var(--text-secondary)" }}>
            Real strategies. Measurable outcomes. Here&apos;s how we help brands grow.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-5">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`glass-card rounded-xl overflow-hidden flex flex-col reveal reveal-delay-${index + 1} ${revealed ? "revealed" : ""}`}
            >
              <div className="p-5 sm:p-6 pb-0">
                <span className="inline-block px-3 py-1 text-xs font-semibold bg-blue-500/10 text-blue-500 rounded-full mb-4">
                  {project.tag}
                </span>
                <h3 className="text-card-title font-heading font-bold mb-3" style={{ color: "var(--text-primary)" }}>
                  {project.title}
                </h3>
              </div>

              <div className="px-5 sm:px-6 pb-4 flex-grow">
                <p className="text-xs uppercase tracking-wider mb-1.5" style={{ color: "var(--text-muted)" }}>
                  Challenge
                </p>
                <p className="text-[14px] sm:text-[15px] leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
                  {project.challenge}
                </p>

                <p className="text-xs uppercase tracking-wider mb-1.5" style={{ color: "var(--text-muted)" }}>
                  Approach
                </p>
                <ul className="space-y-1 mb-4">
                  {project.strategy.map((s, i) => (
                    <li key={i} className="text-[14px] sm:text-[15px] flex items-center gap-2" style={{ color: "var(--text-secondary)" }}>
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 sm:p-6" style={{ borderTop: "1px solid var(--border-subtle)", background: "rgba(37,99,235,0.02)" }}>
                <p className="text-xs uppercase tracking-wider mb-3" style={{ color: "var(--text-muted)" }}>
                  Results ({project.period})
                </p>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {project.results.map((result, i) => (
                    <div key={i} className="text-center">
                      <div className="text-lg sm:text-xl font-heading font-bold text-blue-500">
                        {result.metric}
                      </div>
                      <div className="text-[10px] sm:text-[11px] leading-tight mt-0.5" style={{ color: "var(--text-muted)" }}>
                        {result.label}
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setSelectedProject(project)}
                  className="w-full py-2.5 rounded-lg text-[13px] font-semibold text-blue-500 border border-blue-500/20 hover:bg-blue-500/8 hover:border-blue-500/35 transition-all duration-250 cursor-pointer"
                >
                  View Full Project →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
