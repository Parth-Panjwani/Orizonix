"use client";

import { motion } from "framer-motion";
import PricingCard from "./PricingCard";

export default function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "Custom",
      features: [
        "Logo & Brand Identity",
        "1-page Website",
        "Basic Marketing Setup",
        "Form Automation",
      ],
      highlight: false,
    },
    {
      name: "Growth",
      price: "Custom",
      features: [
        "Complete Brand System",
        "5-page Website",
        "Digital Marketing Strategy",
        "CRM Dashboard & Automations",
        "Monthly Marketing Support",
      ],
      highlight: true,
    },
    {
      name: "Scale",
      price: "Custom",
      features: [
        "Full Website & CRM",
        "Complete Marketing Strategy",
        "Social Media & Paid Ads",
        "Content Marketing & SEO",
        "AI Automation Suite",
        "Dedicated Growth Team",
      ],
      highlight: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 px-4 md:px-8">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            <span className="gradient-text">Plan Packages</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Choose the plan that fits your growth stage
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
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
  );
}
