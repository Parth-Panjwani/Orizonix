'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface PricingCardProps {
  name: string
  price: string
  features: string[]
  delay?: number
  highlight?: boolean
}

export default function PricingCard({
  name,
  price,
  features,
  delay = 0,
  highlight = false,
}: PricingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.05, rotateY: 5, rotateX: 5 }}
      style={{ perspective: '1000px' }}
      className={`relative p-8 bg-dark-surface border rounded-2xl cursor-pointer overflow-hidden ${
        highlight ? 'border-neon-blue neon-border' : 'border-dark-border'
      }`}
    >
      {highlight && (
        <div className="absolute top-0 right-0 px-4 py-1 bg-neon-blue text-dark-bg text-sm font-bold">
          POPULAR
        </div>
      )}

      <h3 className="text-3xl font-bold mb-2">{name}</h3>
      <div className="mb-6">
        <span className="text-4xl font-bold text-neon-blue">{price}</span>
      </div>

      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <span className="text-neon-blue mr-2">✓</span>
            <span className="text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`w-full py-4 rounded-lg font-semibold transition-all duration-300 ${
          highlight
            ? 'bg-neon-blue text-dark-bg hover:bg-neon-cyan neon-border-glow'
            : 'bg-transparent border-2 border-neon-blue text-neon-blue hover:neon-border-glow'
        }`}
      >
        Get Started
      </motion.button>

      {/* 3D tilt effect background */}
      <div className="absolute inset-0 opacity-0 hover:opacity-10 bg-gradient-to-br from-neon-blue to-neon-purple transition-opacity duration-300 -z-10" />
    </motion.div>
  )
}

