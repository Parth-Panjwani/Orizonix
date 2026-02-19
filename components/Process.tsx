"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Deep Audit",
    description: "Data, funnel gaps, competitor landscape, CAC analysis.",
  },
  {
    number: "02",
    title: "Strategy Blueprint",
    description: "Channel mix, messaging architecture, budget allocation, KPI mapping.",
  },
  {
    number: "03",
    title: "Performance Execution",
    description: "Paid media, CRO, landing systems, creative testing.",
  },
  {
    number: "04",
    title: "Scale & Optimize",
    description: "Automation, CRM integration, advanced analytics, iterative scaling.",
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

export default function Process() {
  return (
    <section className="py-20 md:py-24 px-4 md:px-8 section-darker">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="section-label mb-3 block">Our Process</span>
          <h2 className="text-section font-heading text-white">
            How We Drive Growth
          </h2>
        </motion.div>

        {/* Desktop: Horizontal Timeline */}
        <div className="hidden md:block">
          <div className="relative mb-10">
            <div className="absolute top-6 left-0 right-0 h-[2px] timeline-line rounded-full" />
            <div className="grid grid-cols-4 gap-6 relative">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-surface-alt border-2 border-blue-600 flex items-center justify-center mx-auto mb-6 relative z-10">
                    <span className="text-sm font-heading font-bold text-blue-400">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="text-card-title font-heading text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-[15px] text-zinc-400 leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: 2-column grid */}
        <div className="md:hidden">
          <div className="grid grid-cols-2 gap-3">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="glass-card rounded-xl p-4"
              >
                <div className="w-10 h-10 rounded-full bg-surface-alt border-2 border-blue-600 flex items-center justify-center mb-3">
                  <span className="text-xs font-heading font-bold text-blue-400">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-[15px] font-heading font-semibold text-white mb-1.5">
                  {step.title}
                </h3>
                <p className="text-[13px] text-zinc-400 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
