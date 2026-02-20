"use client";

import { useReveal } from "@/hooks/useReveal";

const pillars = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 7h-9" />
        <path d="M14 17H5" />
        <circle cx="17" cy="17" r="3" />
        <circle cx="7" cy="7" r="3" />
      </svg>
    ),
    label: "Data-first strategy",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    label: "Performance-led execution",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
        <line x1="6" y1="6" x2="6.01" y2="6" />
        <line x1="6" y1="18" x2="6.01" y2="18" />
      </svg>
    ),
    label: "Scalable automation frameworks",
  },
];

export default function AuthorityStatement() {
  const { ref, revealed } = useReveal();

  return (
    <section className="py-20 md:py-24 px-4 md:px-8 section-darker">
      <div className="container mx-auto max-w-3xl text-center" ref={ref}>
        <div className={`reveal ${revealed ? "revealed" : ""}`}>
          <p className="text-section font-heading text-white leading-snug mb-3">
            Most agencies sell services.
          </p>
          <p className="text-section font-heading leading-snug">
            <span className="gradient-text">We build growth systems.</span>
          </p>
        </div>

        <div className={`grid grid-cols-3 gap-4 sm:gap-8 mt-12 max-w-3xl mx-auto reveal reveal-delay-2 ${revealed ? "revealed" : ""}`}>
          {pillars.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col items-center gap-3 reveal-scale reveal-delay-${index + 3} ${revealed ? "revealed" : ""}`}
            >
              <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-400 icon-glow">
                {item.icon}
              </div>
              <span className="text-[13px] sm:text-[15px] text-zinc-300 font-medium text-center leading-tight">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
