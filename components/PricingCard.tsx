"use client";

import { motion } from "framer-motion";

interface PricingCardProps {
  name: string;
  price: string;
  features: string[];
  delay?: number;
  highlight?: boolean;
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className={`relative group cursor-pointer rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col h-full ${
        highlight
          ? "border-primary-500 dark:border-accent-dark"
          : "border-gray-200 dark:border-gray-700"
      }`}
      style={{
        backgroundColor: highlight
          ? "rgba(255, 255, 255, 0.05)"
          : "rgba(255, 255, 255, 0.02)",
        borderColor: highlight ? "rgba(102, 126, 234, 0.6)" : undefined,
        boxShadow: highlight
          ? "0 0 12px rgba(102, 126, 234, 0.25), 0 0 24px rgba(102, 126, 234, 0.1)"
          : undefined,
        transition:
          "box-shadow 0.3s ease-in-out, border-color 0.3s ease-in-out, transform 0.3s ease-in-out",
      }}
      onMouseEnter={(e) => {
        if (highlight) {
          const isDark = document.documentElement.classList.contains("dark");
          e.currentTarget.style.boxShadow = isDark
            ? "0 0 16px rgba(0, 212, 255, 0.35), 0 0 32px rgba(0, 212, 255, 0.25)"
            : "0 0 16px rgba(102, 126, 234, 0.35), 0 0 32px rgba(102, 126, 234, 0.25)";
        }
      }}
      onMouseLeave={(e) => {
        if (highlight) {
          e.currentTarget.style.boxShadow =
            "0 0 12px rgba(102, 126, 234, 0.25), 0 0 24px rgba(102, 126, 234, 0.1)";
        }
      }}
    >
      {/* Minimal abstract corner element */}
      <div className="absolute top-0 left-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: highlight
              ? "linear-gradient(135deg, rgba(102, 126, 234, 0.15), transparent)"
              : "linear-gradient(135deg, rgba(102, 126, 234, 0.08), transparent)",
            clipPath: "polygon(0 0, 100% 0, 0 100%)",
          }}
        />
      </div>

      {/* Popular Badge */}
      {highlight && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.2 }}
          className="absolute top-0 right-0 px-4 py-1.5 bg-primary-600 dark:bg-accent-dark text-white text-xs font-semibold rounded-bl-xl z-10"
        >
          ⭐ POPULAR
        </motion.div>
      )}

      {/* Content Container - Flex Column */}
      <div className="flex flex-col flex-grow p-6 sm:p-8 relative z-10">
        {/* Title */}
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: delay + 0.1 }}
          className="text-2xl font-semibold text-gray-900 dark:text-white mb-3"
        >
          {name}
        </motion.h3>

        {/* Price */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: delay + 0.2 }}
          className="mb-6"
        >
          <span className="text-3xl font-bold gradient-text">{price}</span>
        </motion.div>

        {/* Features - Flex Grow to Push Button Down */}
        <ul className="space-y-3 mb-6 flex-grow">
          {features.map((feature, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.3,
                delay: delay + 0.3 + index * 0.05,
              }}
              className="flex items-start"
            >
              <span className="text-primary-600 dark:text-accent-dark mr-2 font-bold mt-0.5 flex-shrink-0">
                ✓
              </span>
              <span className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {feature}
              </span>
            </motion.li>
          ))}
        </ul>

        {/* CTA Button - Pushed to Bottom */}
        <motion.button
          onClick={() => {
            window.location.href = "#contact";
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.4,
            delay: delay + 0.5,
          }}
          className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 text-sm tracking-wide mt-auto ${
            highlight
              ? "bg-primary-600 dark:bg-accent-dark text-white hover:bg-primary-700 dark:hover:bg-accent-dark/90"
              : "glass border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800/50"
          }`}
        >
          Get Started
        </motion.button>
      </div>
    </motion.div>
  );
}
