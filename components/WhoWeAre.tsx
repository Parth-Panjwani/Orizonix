"use client";

import { useReveal } from "@/hooks/useReveal";

const differentiators = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="2" />
        <path d="M7 12l3 3 7-7" />
      </svg>
    ),
    title: "Systems, Not Campaigns",
    description:
      "We build integrated growth systems that compound over time — not one-off campaigns that burn out after a week.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
    title: "Revenue-First Thinking",
    description:
      "Every strategy, every creative, every campaign is evaluated against revenue impact. No vanity metrics, no busywork.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: "Full-Stack Execution",
    description:
      "Strategy, creative, paid media, web development, and automation — all under one roof, one roadmap, one team.",
  },
];

export default function WhoWeAre() {
  const { ref, revealed } = useReveal();

  return (
    <section id="about" className="py-20 md:py-28 px-4 md:px-8 section-darker">
      <div className="container mx-auto max-w-5xl" ref={ref}>
        {/* Editorial Statement */}
        <div className={`text-center mb-16 reveal ${revealed ? "revealed" : ""}`}>
          <span className="section-label mb-4 block">Who We Are</span>
          <h2
            className="text-section font-heading mb-5"
            style={{ color: "var(--text-primary)" }}
          >
            We&apos;re not another marketing agency.
          </h2>
          <p
            className="text-section font-heading"
          >
            <span className="gradient-text">We&apos;re your growth engineering partner.</span>
          </p>
          <p
            className="text-[17px] md:text-lg max-w-2xl mx-auto mt-6 leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Orizonix combines performance marketing, brand strategy, web development, and
            intelligent automation to help ambitious brands build predictable, scalable
            revenue engines — not just run ads.
          </p>
        </div>

        {/* Differentiation Pillars */}
        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {differentiators.map((item, index) => (
            <div
              key={index}
              className={`glass-card rounded-xl p-6 md:p-8 text-center reveal reveal-delay-${index + 1} ${revealed ? "revealed" : ""}`}
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 icon-glow mx-auto mb-5">
                {item.icon}
              </div>
              <h3
                className="text-card-title font-heading mb-3"
                style={{ color: "var(--text-primary)" }}
              >
                {item.title}
              </h3>
              <p
                className="text-[15px] leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
