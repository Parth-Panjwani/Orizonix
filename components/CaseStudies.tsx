"use client";

import { motion } from "framer-motion";

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
    transition: { duration: 0.45, delay: i * 0.1, ease: "easeOut" },
  }),
};

export default function CaseStudies() {
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
                <div className="grid grid-cols-3 gap-3">
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
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
