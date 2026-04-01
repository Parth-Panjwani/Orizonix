"use client";

import { useReveal } from "@/hooks/useReveal";

const tiers = [
  {
    name: "Social Media Management",
    tagline: "Build authority & stay consistent.",
    price: "₹15,000",
    period: "/month",
    deliverables: [
      "12 Strategic Posts / month",
      "4–6 Growth-Focused Reels",
      "Conversion-Focused Captions",
      "Profile Optimization Setup",
      "Content Calendar",
      "Monthly Growth Report",
    ],
    addon: {
      label: "Growth Tier",
      price: "₹18,000/month",
      perks: [
        "20 Posts + 8 Reels",
        "Story Sequences",
        "Competitor Benchmarking",
      ],
    },
    highlighted: false,
  },
  {
    name: "Brand Launch Package",
    tagline: "Everything you need to launch & scale.",
    price: "₹35,000 – ₹50,000",
    period: "one-time",
    badge: "Most Popular",
    deliverables: [
      "High-Converting Website",
      "90 Days of Social Media Management",
      "Mobile-First Optimization",
      "Automated Lead Capture",
      "Strategic Content Rollout",
      "Performance & ROI Tracking",
    ],
    addon: {
      label: "Ongoing Growth Retainer",
      price: "₹18,000/month",
      perks: [
        "Continued Social Management",
        "Monthly Strategy Review",
        "Ad Campaign Management",
      ],
    },
    highlighted: true,
  },
  {
    name: "Website Development",
    tagline: "Your 24/7 digital salesperson.",
    price: "₹25,000",
    period: "one-time",
    deliverables: [
      "5–7 Page Custom Design",
      "Mobile-First Responsive",
      "WhatsApp & Lead Form Routing",
      "Local SEO & Google Maps",
      "Fast & Secure Setup",
      "30 Days Post-Launch Support",
    ],
    addon: {
      label: "Premium Website",
      price: "₹35,000",
      perks: [
        "10+ Pages",
        "Blog / Portfolio Section",
        "Advanced Animations",
      ],
    },
    highlighted: false,
  },
];

export default function Pricing() {
  const { ref, revealed } = useReveal();

  return (
    <section id="pricing" className="py-20 md:py-24 px-4 md:px-8 section-darker">
      <div className="container mx-auto max-w-6xl" ref={ref}>

        {/* Header */}
        <div className={`text-center mb-14 reveal ${revealed ? "revealed" : ""}`}>
          <span className="section-label mb-3 block">Pricing</span>
          <h2 className="text-section font-heading mb-4" style={{ color: "var(--text-primary)" }}>
            Simple, Transparent Pricing
          </h2>
          <p className="text-[16px] md:text-[17px] max-w-lg mx-auto" style={{ color: "var(--text-secondary)" }}>
            Every plan is scoped to deliver real outcomes. No hidden fees, no ambiguity.
          </p>
        </div>

        {/* Desktop: 3-col grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 items-start pt-4">
          {tiers.map((tier, index) => (
            <PricingCard key={index} tier={tier} index={index} revealed={revealed} />
          ))}
        </div>

        {/* Mobile: Horizontal scroll */}
        <div className="md:hidden flex gap-4 overflow-x-auto pricing-scroll pb-4 pt-5 -mx-4 px-4">
          {tiers.map((tier, index) => (
            <div key={index} className="min-w-[290px] w-[88vw] max-w-[340px] flex-shrink-0">
              <PricingCard tier={tier} index={index} revealed={revealed} />
            </div>
          ))}
        </div>

        {/* Trust Strip */}
        <div className={`mt-12 flex flex-wrap justify-center gap-6 md:gap-10 text-[14px] font-medium reveal reveal-delay-4 ${revealed ? "revealed" : ""}`} style={{ color: "var(--text-muted)" }}>
          {[
            "30-min free strategy call",
            "Clear deliverables per plan",
            "Transparent pricing",
            "No hidden costs",
          ].map((text, i) => (
            <div key={i} className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
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

function PricingCard({
  tier,
  index,
  revealed,
}: {
  tier: typeof tiers[0];
  index: number;
  revealed: boolean;
}) {
  return (
    <div
      className={`relative rounded-2xl flex flex-col reveal reveal-delay-${index + 1} ${
        tier.highlighted
          ? "pricing-recommended glass-card border border-blue-500/30"
          : "glass-card"
      } ${revealed ? "revealed" : ""}`}
      style={{ overflow: "visible" }}
    >
      {/* Badge */}
      {tier.badge && (
        <div
          className="absolute left-1/2 -translate-x-1/2 -top-[14px] px-4 py-1 text-white text-[12px] font-bold rounded-full uppercase tracking-widest whitespace-nowrap z-20"
          style={{
            background: "linear-gradient(135deg, #2563EB, #3B82F6)",
            boxShadow: "0 4px 14px rgba(37,99,235,0.3)",
          }}
        >
          {tier.badge}
        </div>
      )}

      <div className="p-6 md:p-7 flex flex-col flex-grow" style={{ paddingTop: tier.badge ? "2rem" : undefined }}>

        {/* Plan Name + Price */}
        <div className="mb-5">
          <h3 className="text-[17px] font-heading font-bold mb-1" style={{ color: "var(--text-primary)" }}>
            {tier.name}
          </h3>
          <p className="text-[13px] mb-4" style={{ color: "var(--text-muted)" }}>
            {tier.tagline}
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-[30px] font-heading font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
              {tier.price}
            </span>
            <span className="text-[13px]" style={{ color: "var(--text-muted)" }}>
              {tier.period}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="mb-5" style={{ height: 1, background: "var(--border-subtle)" }} />

        {/* What's Included */}
        <p className="text-[11px] font-semibold uppercase tracking-widest mb-3 text-blue-500">
          What&apos;s Included
        </p>
        <ul className="space-y-2.5 mb-6 flex-grow">
          {tier.deliverables.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <svg className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-[14px]" style={{ color: "var(--text-body)" }}>{item}</span>
            </li>
          ))}
        </ul>

        {/* Add-on Box */}
        <div
          className="rounded-xl p-4 mb-5"
          style={{
            background: "rgba(37,99,235,0.05)",
            border: "1px solid rgba(37,99,235,0.12)",
          }}
        >
          <div className="flex items-center justify-between mb-2.5">
            <p className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
              Add-on
            </p>
            <span className="text-[13px] font-bold text-blue-500">
              {tier.addon.price}
            </span>
          </div>
          <p className="text-[13px] font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
            {tier.addon.label}
          </p>
          <ul className="space-y-1">
            {tier.addon.perks.map((perk, i) => (
              <li key={i} className="flex items-center gap-2 text-[12px]" style={{ color: "var(--text-secondary)" }}>
                <span className="w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                {perk}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <a
          href="#contact"
          className={`block w-full text-center py-3.5 rounded-xl font-semibold text-[15px] transition-all duration-250 ${
            tier.highlighted ? "btn-primary" : "btn-secondary"
          }`}
        >
          Book Strategy Call →
        </a>
      </div>
    </div>
  );
}
