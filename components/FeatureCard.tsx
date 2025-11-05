'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface FeatureCardProps {
  title: string
  description: string
  icon: ReactNode
  delay?: number
}

export default function FeatureCard({
  title,
  description,
  icon,
  delay = 0,
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="relative p-6 bg-dark-surface border border-dark-border rounded-xl group"
    >
      <motion.div
        whileHover={{ scale: 1.2, rotate: 360 }}
        transition={{ duration: 0.6 }}
        className="mb-4 text-neon-blue inline-block"
      >
        {icon}
      </motion.div>

      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>

      {/* Floating badge effect */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-neon-blue rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  )
}

