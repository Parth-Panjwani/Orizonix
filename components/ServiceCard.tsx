"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  delay?: number;
  gradient?: string;
}

export default function ServiceCard({
  title,
  description,
  icon,
  delay = 0,
  gradient = "from-neon-blue to-neon-purple",
}: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="relative p-8 bg-dark-surface border border-dark-border rounded-2xl group cursor-pointer overflow-hidden shimmer"
    >
      {/* Gradient background blob */}
      <div
        className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-20 blur-3xl rounded-full transition-opacity duration-500 creative-blob`}
      />

      {/* Neon glow border on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 neon-border-glow" />

      {/* Icon with gradient */}
      <motion.div
        whileHover={{ scale: 1.15, rotate: 360 }}
        transition={{ duration: 0.6 }}
        className={`mb-6 bg-gradient-to-br ${gradient} bg-clip-text text-transparent`}
        style={{ WebkitTextFillColor: "transparent" }}
      >
        <div className="text-neon-blue">{icon}</div>
      </motion.div>

      {/* Title */}
      <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>

      {/* Description */}
      <p className="text-gray-400 text-sm leading-relaxed mb-4">
        {description}
      </p>

      {/* Shimmer effect */}
      <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-20 bg-gradient-to-r from-transparent via-neon-blue to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />

      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-neon-blue/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
}
