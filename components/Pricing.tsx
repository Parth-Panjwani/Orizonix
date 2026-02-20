"use client";

import { motion } from "framer-motion";

const tiers = [
  {
    name: "Social Starter",
    description: "For small brands building their digital foundation.",
    price: "₹15,000 – ₹20,000",
    period: "/month",
    deliverables: [
      "12 Social Media Posts",
      "2 Reels per month",
      "Basic Ads Setup",
      "Monthly Performance Report",
    ],
    engagement: "Minimum 3-month engagement",
    highlighted: false,
  },
  {
    name: "Growth Marketing",
    description: "For scaling brands ready for structured, multi-channel growth.",
    price: "₹35,000 – ₹60,000",
    period: "/month",
    deliverables: [
      "Social Media Management",
      "Paid Ads Management",
      "Funnel Setup & Optimization",
      "WhatsApp Automation",
      "4 Reels per month",
      "Bi-weekly Reporting & Strategy",
    ],
    engagement: "Minimum 4-month engagement",
    highlighted: true,
    badge: "Recommended",
  },
  {
    name: "Revenue Systems",
    description: "For aggressive expansion with a dedicated strategist and full-funnel system.",
    price: "₹85,000+",
    period: "/month",
    deliverables: [
      "Multi-Channel Ad Campaigns",
      "Funnel Architecture & CRO",
      "CRM Integration",
      "Automation Setup (Email / WhatsApp)",
      "Conversion Optimization",
      "Dedicated Growth Strategist",
    ],
    engagement: "Custom engagement",
    highlighted: false,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.12, ease: [0.4, 0, 0.2, 1] },
  }),
};

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 md:py-24 px-4 md:px-8 section-darker">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="section-label mb-3 block">Investment</span>
          <h2 className="text-section font-heading mb-4" style={{ color: "var(--text-primary)" }}>
            Growth Is an Investment, Not an Expense
          </h2>
          <p className="text-[16px] md:text-[17px] max-w-lg mx-auto" style={{ color: "var(--text-secondary)" }}>
            Choose the engagement level that matches your growth ambitions.
          </p>
        </motion.div>

        {/* Desktop: 3-col grid — add top padding so badge isn't clipped */}
        <div className="hidden md:grid md:grid-cols-3 gap-5 items-stretch pt-4">
          {tiers.map((tier, index) => (
            <PricingCard key={index} tier={tier} index={index} />
          ))}
        </div>

        {/* Mobile: Horizontal scroll — pt-5 ensures badge has room above */}
        <div className="md:hidden flex gap-3 overflow-x-auto pricing-scroll pb-4 pt-5 -mx-4 px-4">
          {tiers.map((tier, index) => (
            <div key={index} className="min-w-[280px] w-[85vw] max-w-[320px] flex-shrink-0">
              <PricingCard tier={tier} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingCard({ tier, index }: { tier: typeof tiers[0]; index: number }) {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={tier.highlighted ? { y: -8, transition: { duration: 0.25 } } : { y: -4, transition: { duration: 0.25 } }}
      className={`relative rounded-xl flex flex-col h-full ${
        tier.highlighted
          ? "pricing-recommended glass-card"
          : "glass-card"
      }`}
      style={{ overflow: "visible" }}
    >
      {/* Badge — inside the card, positioned absolutely above the border */}
      {tier.badge && (
        <div
          className="absolute left-1/2 -translate-x-1/2 px-5 py-1.5 text-white text-xs font-bold rounded-full uppercase tracking-wider whitespace-nowrap z-10"
          style={{
            top: "-14px",
            background: "linear-gradient(135deg, #2563EB, #3B82F6)",
            boxShadow: "0 4px 16px rgba(37,99,235,0.4)",
            letterSpacing: "0.08em",
          }}
        >
          {tier.badge}
        </div>
      )}

      <div className="p-5 sm:p-6 md:p-8 flex flex-col flex-grow" style={{ paddingTop: tier.badge ? "2rem" : undefined }}>
        <h3 className="text-card-title font-heading font-bold mb-2" style={{ color: "var(--text-primary)" }}>
          {tier.name}
        </h3>
        <p className="text-[14px] sm:text-[15px] mb-5" style={{ color: "var(--text-secondary)" }}>
          {tier.description}
        </p>

        <div className="mb-5">
          <span className="text-[26px] sm:text-[30px] font-heading font-bold" style={{ color: "var(--text-primary)" }}>
            {tier.price}
          </span>
          {tier.period && (
            <span className="text-[14px]" style={{ color: "var(--text-muted)" }}>{tier.period}</span>
          )}
        </div>

        <ul className="space-y-3 mb-6 flex-grow">
          {tier.deliverables.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <svg className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-[14px] sm:text-[15px]" style={{ color: "var(--text-body)" }}>{item}</span>
            </li>
          ))}
        </ul>

        <p className="text-[13px] mb-5" style={{ color: "var(--text-muted)" }}>
          {tier.engagement}
        </p>

        <a
          href="#contact"
          className={`block w-full text-center py-3.5 rounded-lg font-semibold text-[15px] transition-all duration-250 ${
            tier.highlighted ? "btn-primary" : "btn-secondary"
          }`}
        >
          Book Strategy Call
        </a>
      </div>
    </motion.div>
  );
}
