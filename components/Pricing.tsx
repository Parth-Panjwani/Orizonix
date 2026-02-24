"use client";

import { useReveal } from "@/hooks/useReveal";

const tiers = [
  {
    name: "Social Media Management",
    description: "Build Authority & Stay Consistent.",
    price: "₹15,000",
    period: "/ month",
    deliverables: [
      "12 Strategic Posts",
      "4–6 Growth-Focused Reels",
      "Conversion-Focused Captions",
      "Profile Optimization Setup",
      "Actionable Content Calendar",
      "Monthly Growth Analytics"
    ],
    engagement: "Growth Tier: ₹18,000 / month",
    highlighted: false,
  },
  {
    name: "Brand Launch Package",
    description: "Everything You Need to Launch & Grow.",
    price: "₹35,000 – ₹50,000",
    period: "",
    deliverables: [
      "High-Converting Website",
      "90 Days of Social Growth",
      "Mobile-First Optimization",
      "Automated Lead Capture",
      "Strategic Content Rollout",
      "Performance & ROI Tracking"
    ],
    engagement: "Build. Position. Scale.",
    highlighted: true,
    badge: "Complete Package",
  },
  {
    name: "Website Development",
    description: "Your 24/7 Digital Salesperson.",
    price: "₹25,000",
    period: "/ One-Time",
    deliverables: [
      "5–7 Page Custom Design",
      "Flawless Mobile Experience",
      "Automated WhatsApp Routing",
      "High-Converting Contact Forms",
      "Local SEO & Google Maps",
      "Fast & Secure Foundation"
    ],
    engagement: "Premium Website: ₹35,000",
    highlighted: false,
  }
];

export default function Pricing() {
  const { ref, revealed } = useReveal();

  return (
    <section id="pricing" className="py-20 md:py-24 px-4 md:px-8 section-darker">
      <div className="container mx-auto max-w-6xl" ref={ref}>
        <div className={`text-center mb-12 reveal ${revealed ? "revealed" : ""}`}>
          <span className="section-label mb-3 block">Investment</span>
          <h2 className="text-section font-heading text-white mb-4">
            Growth Is an Investment, Not an Expense
          </h2>
          <p className="text-[16px] md:text-[17px] text-zinc-400 max-w-lg mx-auto">
            Choose the engagement level that matches your growth ambitions.
          </p>
        </div>

        {/* Desktop: 3-col grid — pt-4 gives badge room */}
        <div className="hidden md:grid md:grid-cols-3 gap-5 items-stretch pt-4">
          {tiers.map((tier, index) => (
            <PricingCard key={index} tier={tier} index={index} revealed={revealed} />
          ))}
        </div>

        {/* Mobile: Horizontal scroll — pt-5 ensures badge has room */}
        <div className="md:hidden flex gap-3 overflow-x-auto pricing-scroll pb-4 pt-5 -mx-4 px-4">
          {tiers.map((tier, index) => (
            <div key={index} className="min-w-[280px] w-[85vw] max-w-[320px] flex-shrink-0">
              <PricingCard tier={tier} index={index} revealed={revealed} />
            </div>
          ))}
        </div>

        {/* Trust Builders */}
        <div className={`mt-12 md:mt-16 flex flex-wrap justify-center gap-4 md:gap-10 text-zinc-300 text-[14px] md:text-[15px] font-medium reveal reveal-delay-4 ${revealed ? "revealed" : ""}`}>
          {[
            "30-minute free strategy call",
            "Clear deliverables",
            "Transparent pricing",
            "No hidden costs"
          ].map((text, i) => (
            <div key={i} className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingCard({ tier, index, revealed }: { tier: typeof tiers[0]; index: number; revealed: boolean }) {
  return (
    <div
      className={`relative rounded-xl flex flex-col h-full transition-transform duration-300 hover:-translate-y-2 reveal reveal-delay-${index + 1} ${
        tier.highlighted
          ? "pricing-recommended glass-card md:scale-[1.05] z-10 border border-blue-500/30"
          : "glass-card z-0"
      } ${revealed ? "revealed" : ""}`}
      style={{ overflow: "visible" }}
    >
      {/* Badge */}
      {tier.badge && (
        <div
          className="absolute left-1/2 -translate-x-1/2 px-5 py-1.5 text-white text-[13px] font-bold rounded-full uppercase tracking-wider whitespace-nowrap z-20"
          style={{
            top: "-15px",
            background: "linear-gradient(135deg, #2563EB, #3B82F6)",
            boxShadow: "0 4px 16px rgba(37,99,235,0.4)",
            letterSpacing: "0.08em",
          }}
        >
          {tier.badge}
        </div>
      )}

      <div className="p-5 sm:p-7 md:p-8 flex flex-col flex-grow" style={{ paddingTop: tier.badge ? "2rem" : undefined }}>
        <h3 className="text-card-title font-heading font-bold text-white mb-1">
          {tier.name}
        </h3>
        <p className="text-blue-400 text-[15px] font-semibold mb-6">
          {tier.description}
        </p>

        <div className="mb-6">
          <span className="text-[28px] sm:text-[32px] font-heading font-bold text-white tracking-tight">
            {tier.price}
          </span>
          {tier.period && (
            <span className="text-[15px] text-zinc-500 ml-1">{tier.period}</span>
          )}
        </div>

        <ul className="space-y-4 mb-8 flex-grow">
          {tier.deliverables.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-[15px] text-zinc-300 leading-snug">{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto space-y-4">
          <p className="text-[14px] text-zinc-400 font-medium text-center">
            {tier.engagement}
            <span className="block text-zinc-500 text-[13px] mt-1 italic">Add-ons Available</span>
          </p>

          <a
            href="#contact"
            className={`block w-full text-center py-4 rounded-lg font-bold text-[16px] transition-all duration-250 shadow-lg ${
              tier.highlighted ? "btn-primary hover:shadow-blue-500/25" : "btn-secondary hover:shadow-white/5"
            }`}
          >
            Book Strategy Call
          </a>
        </div>
      </div>
    </div>
  );
}
