"use client";

import { useReveal } from "@/hooks/useReveal";

const services = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
    title: "Performance Marketing",
    description: "Paid media across Meta, Google & LinkedIn. Conversion funnels, retargeting, and ROAS-focused budget allocation.",
    highlights: ["Meta & Google Ads", "Conversion Funnels", "Retargeting", "ROAS Optimisation"],
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: "Website Development",
    description: "High-converting, mobile-first websites built for speed, SEO, and seamless lead capture.",
    highlights: ["Custom Design", "Mobile-First", "SEO Optimised", "Lead Capture"],
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    title: "Social Media Management",
    description: "Strategic content, community engagement, and growth-driven posting that builds brand authority.",
    highlights: ["Content Strategy", "Reels & Stories", "Community Building", "Analytics"],
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: "Brand Strategy",
    description: "Positioning, messaging architecture, and visual identity that differentiates you in a crowded market.",
    highlights: ["Brand Positioning", "Messaging", "Visual Identity", "Competitor Analysis"],
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
      </svg>
    ),
    title: "Marketing Automation",
    description: "CRM integrations, email sequences, WhatsApp flows, and dashboards that eliminate manual effort.",
    highlights: ["CRM Integration", "Email Sequences", "WhatsApp Flows", "Dashboards"],
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1.27A7 7 0 0 1 14 22h-4a7 7 0 0 1-6.73-5H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73A2 2 0 0 1 12 2z" />
        <circle cx="10" cy="16" r="1" />
        <circle cx="14" cy="16" r="1" />
      </svg>
    ),
    title: "AI-Powered Automations",
    description: "Intelligent chatbots, predictive lead scoring, AI ad creative testing, and agentic workflow builders.",
    highlights: ["AI Chatbots", "Lead Scoring", "Ad Creative AI", "Agentic Workflows"],
    badge: "Trending",
    accent: true,
  },
];

export default function Services() {
  const { ref, revealed } = useReveal();

  return (
    <section id="services" className="py-20 md:py-28 px-4 md:px-8 section-dark">
      <div className="container mx-auto max-w-6xl" ref={ref}>
        <div className={`text-center mb-14 reveal ${revealed ? "revealed" : ""}`}>
          <span className="section-label mb-3 block">What We Deliver</span>
          <h2 className="text-section font-heading mb-4" style={{ color: "var(--text-primary)" }}>
            End-to-End Growth Services
          </h2>
          <p className="text-[16px] md:text-[17px] max-w-xl mx-auto" style={{ color: "var(--text-secondary)" }}>
            Every service connects directly to revenue growth. No vanity deliverables.
          </p>
        </div>

        {/* Uniform 3×2 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {services.map((service, index) => (
            <div
              key={index}
              className={`glass-card rounded-xl p-5 md:p-6 flex flex-col relative overflow-hidden reveal reveal-delay-${Math.min(index + 1, 5)} ${revealed ? "revealed" : ""}`}
              style={
                service.accent
                  ? { border: "1px solid rgba(139, 92, 246, 0.18)" }
                  : undefined
              }
            >
              {/* Trending Badge */}
              {service.badge && (
                <span
                  className="absolute top-4 right-4 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded-full text-white"
                  style={{
                    background: "linear-gradient(135deg, #8B5CF6, #6366F1)",
                    boxShadow: "0 2px 10px rgba(139, 92, 246, 0.3)",
                  }}
                >
                  {service.badge}
                </span>
              )}

              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center icon-glow mb-4"
                style={{
                  background: service.accent ? "rgba(139, 92, 246, 0.1)" : "rgba(37, 99, 235, 0.1)",
                  color: service.accent ? "#8B5CF6" : "#3B82F6",
                }}
              >
                {service.icon}
              </div>

              <h3 className="text-[16px] md:text-[17px] font-heading font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
                {service.title}
              </h3>

              <p className="text-[13px] md:text-[14px] leading-relaxed mb-4 flex-grow" style={{ color: "var(--text-secondary)" }}>
                {service.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {service.highlights.map((highlight, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 text-[11px] font-medium rounded-full"
                    style={{
                      background: service.accent ? "rgba(139, 92, 246, 0.08)" : "rgba(37, 99, 235, 0.08)",
                      color: service.accent ? "#8B5CF6" : "#3B82F6",
                      border: `1px solid ${service.accent ? "rgba(139, 92, 246, 0.15)" : "rgba(37, 99, 235, 0.12)"}`,
                    }}
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
