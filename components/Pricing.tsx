"use client";

import { motion } from "framer-motion";
import PricingCard from "./PricingCard";

export default function Pricing() {
  const plans = [
    {
      name: 'Starter',
      price: 'Custom',
      features: [
        'Logo & Brand Identity',
        '1-page Website',
        'Basic Marketing Setup',
        'Form Automation',
      ],
      highlight: false,
    },
    {
      name: 'Growth',
      price: 'Custom',
      features: [
        'Complete Brand System',
        '5-page Website',
        'Digital Marketing Strategy',
        'CRM Dashboard & Automations',
        'Monthly Marketing Support',
      ],
      highlight: true,
    },
    {
      name: 'Scale',
      price: 'Custom',
      features: [
        'Full Website & CRM',
        'Complete Marketing Strategy',
        'Social Media & Paid Ads',
        'Content Marketing & SEO',
        'AI Automation Suite',
        'Dedicated Growth Team',
      ],
      highlight: false,
    },
  ]

  return (
    <section className="py-24 px-4 md:px-8 relative overflow-hidden">
      {/* Creative background elements */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl creative-blob" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-neon-blue/5 rounded-full blur-3xl creative-blob" style={{ animationDelay: '3s' }} />
      
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            <span className="gradient-text">Plan Packages</span>
          </motion.h2>
          <p className="text-xl text-gray-400">
            Choose the plan that fits your growth stage
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <PricingCard
              key={plan.name}
              name={plan.name}
              price={plan.price}
              features={plan.features}
              delay={index * 0.1}
              highlight={plan.highlight}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

