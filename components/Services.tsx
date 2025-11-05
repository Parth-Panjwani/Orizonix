"use client";

import { motion } from "framer-motion";
import ServiceCard from "./ServiceCard";

const BrandIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </svg>
);

const WebIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

const AIIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);

const MarketingIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    <path d="M14.05 2a9 9 0 0 1 8 7.94" />
    <path d="M14.05 6A5 5 0 0 1 18 10" />
  </svg>
);

export default function Services() {
  return (
    <section className="py-24 px-4 md:px-8 relative overflow-hidden">
      {/* Creative background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-blue/5 rounded-full blur-3xl creative-blob" />
      <div
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl creative-blob"
        style={{ animationDelay: "2s" }}
      />

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.h2 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="gradient-text">What We Do</span>
          </motion.h2>
          <p className="text-xl text-gray-400">
            Creative solutions that drive real business growth
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ServiceCard
            title="Branding & Identity"
            description="Memorable brand identities that tell your story and connect with your audience. Logo design, brand guidelines, and visual identity systems."
            icon={<BrandIcon />}
            delay={0}
            gradient="from-neon-blue to-neon-cyan"
          />
          <ServiceCard
            title="Web & UI/UX Design"
            description="Beautiful, conversion-focused websites and digital experiences. User-centered design that drives engagement and sales."
            icon={<WebIcon />}
            delay={0.1}
            gradient="from-neon-purple to-neon-blue"
          />
          <ServiceCard
            title="Digital Marketing"
            description="Strategic campaigns that scale your business. Social media, content marketing, SEO, PPC, and growth strategies that deliver ROI."
            icon={<MarketingIcon />}
            delay={0.2}
            gradient="from-pink-500 to-neon-purple"
          />
          <ServiceCard
            title="AI Automation"
            description="Smart workflows that save time and boost efficiency. n8n, Airtable, Telegram bots, and custom automation solutions."
            icon={<AIIcon />}
            delay={0.3}
            gradient="from-neon-cyan to-neon-blue"
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          {/* <p className="text-gray-400 text-sm">
            <span className="gradient-text font-semibold">Tech Stack:</span>{" "}
            n8n, Airtable, Telegram/Voice integrations, React, Next.js, Framer
            Motion
          </p> */}
        </motion.div>
      </div>
    </section>
  );
}
