"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  delay?: number;
}

export default function ServiceCard({
  title,
  description,
  icon,
  delay = 0,
}: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className="relative p-6 glass glass-hover rounded-2xl group cursor-pointer overflow-hidden transition-all duration-300 border border-gray-200 dark:border-gray-700"
    >
      {/* Minimal abstract corner element */}
      <div className="absolute top-0 left-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background:
              "linear-gradient(135deg, rgba(102, 126, 234, 0.08), transparent)",
            clipPath: "polygon(0 0, 100% 0, 0 100%)",
          }}
        />
      </div>

      {/* Icon */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: delay + 0.1 }}
        whileHover={{ scale: 1.05 }}
        className="mb-4 text-primary-600 dark:text-accent-dark"
      >
        {icon}
      </motion.div>

      {/* Title */}
      <motion.h3
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: delay + 0.2 }}
        className="text-xl font-bold text-gray-900 dark:text-white mb-2"
      >
        {title}
      </motion.h3>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: delay + 0.3 }}
        className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed"
      >
        {description}
      </motion.p>
    </motion.div>
  );
}
