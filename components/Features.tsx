'use client'

import { motion } from 'framer-motion'
import FeatureCard from './FeatureCard'

const OneStopIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
)

const AutomationIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M9 9h6v6H9z" />
  </svg>
)

const FounderIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)

const GrowthIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
)

export default function Features() {
  const features = [
    {
      title: "Creative + Strategic",
      description:
        "We blend creative design with data-driven marketing strategies for maximum impact",
      icon: <OneStopIcon />,
    },
    {
      title: "Full-Stack Marketing",
      description:
        "From branding to paid ads, SEO to social media - we handle your entire marketing ecosystem",
      icon: <AutomationIcon />,
    },
    {
      title: "Founder-led Excellence",
      description:
        "Direct access to decision-makers who understand both creative vision and business growth",
      icon: <FounderIcon />,
    },
    {
      title: "Results-Driven Growth",
      description:
        "Every campaign is optimized for ROI, with clear metrics and transparent reporting",
      icon: <GrowthIcon />,
    },
  ];

  return (
    <section className="py-24 px-4 md:px-8 relative overflow-hidden">
      {/* Creative background elements */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-neon-pink/5 rounded-full blur-3xl creative-blob" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-neon-blue/5 rounded-full blur-3xl creative-blob" style={{ animationDelay: '4s' }} />

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
            <span className="gradient-text">Why Orizonix?</span>
          </motion.h2>
          <p className="text-xl text-gray-400">
            What sets us apart in the creative-tech space
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

