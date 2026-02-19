"use client";

import { motion } from "framer-motion";

const servicePillars = [
  {
    label: "Growth & Performance",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
    items: [
      "Paid Media Strategy & Management",
      "Conversion Funnels",
      "Lead Acquisition Systems",
      "Retargeting & Lifecycle Campaigns",
    ],
    outcome: "Lower CAC. Higher ROI. Predictable lead flow.",
  },
  {
    label: "Brand & Digital Presence",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    items: [
      "High-Conversion Websites",
      "Brand Positioning",
      "Messaging Architecture",
      "Content Strategy Systems",
    ],
    outcome: "Stronger authority. Higher trust. Better conversions.",
  },
  {
    label: "Automation & Optimization",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
      </svg>
    ),
    items: [
      "CRM & Funnel Integration",
      "Email & WhatsApp Automation",
      "Performance Tracking Dashboards",
      "Data Attribution Systems",
    ],
    outcome: "Less manual effort. More scalable revenue.",
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

export default function Services() {
  return (
    <section id="services" className="py-20 md:py-24 px-4 md:px-8 section-dark">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="section-label mb-3 block">What We Deliver</span>
          <h2 className="text-section font-heading text-white mb-4">
            Outcome-Based Services
          </h2>
          <p className="text-[16px] md:text-[17px] text-zinc-400 max-w-xl mx-auto">
            Every service connects directly to revenue growth. No vanity work.
          </p>
        </motion.div>

        {/* 2-col mobile, 3-col desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
          {servicePillars.map((pillar, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={`glass-card rounded-xl p-4 sm:p-6 md:p-8 flex flex-col ${
                index === 2 ? "col-span-2 md:col-span-1" : ""
              }`}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 + 0.15 }}
                className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-400 icon-glow mb-5"
              >
                {pillar.icon}
              </motion.div>

              <h3 className="text-card-title font-heading text-white mb-4">
                {pillar.label}
              </h3>

              <ul className="space-y-2.5 mb-5 flex-grow">
                {pillar.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <svg className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="text-[14px] sm:text-[15px] text-zinc-300">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4 border-t border-white/[0.06]">
                <p className="text-[14px] sm:text-[15px] font-medium text-blue-400">
                  {pillar.outcome}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
