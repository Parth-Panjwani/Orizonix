"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import AnimatedGradient from "./AnimatedGradient";

interface CounterProps {
  end: number;
  suffix?: string;
  duration?: number;
}

function Counter({ end, suffix = "", duration = 2 }: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    const startValue = 0;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(startValue + (end - startValue) * easeOutQuart);
      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    const timer = setTimeout(() => {
      requestAnimationFrame(animate);
    }, 500);

    return () => clearTimeout(timer);
  }, [end, duration]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 md:px-8 pt-20">
      <div className="container mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center relative z-10">
        {/* Left: Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="z-10"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-gray-200 dark:border-gray-700 mb-6"
          >
            <span className="w-2 h-2 bg-primary-600 dark:bg-accent-dark rounded-full animate-pulse" />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Creative-Tech Agency
            </span>
          </motion.div>

          {/* Main Heading - 2 lines */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight text-gray-900 dark:text-white"
          >
            <span className="block mb-2">We Craft Brands. Build Systems.</span>
            <span className="block gradient-text">Automate Growth.</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 leading-relaxed max-w-xl"
          >
            Where{" "}
            <span className="gradient-text font-semibold">
              Creative Strategy
            </span>{" "}
            meets{" "}
            <span className="gradient-text font-semibold">
              Digital Innovation
            </span>
            .
            <br className="hidden sm:block" />
            <span className="block sm:inline">
              We craft brands, build digital experiences, and drive growth
              through marketing excellence.
            </span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8"
          >
            <motion.a
              href="https://wa.me/919898084143"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 sm:px-8 py-3 sm:py-4 btn-premium text-white font-semibold rounded-lg transition-all duration-200 text-center text-sm sm:text-base"
            >
              Let&apos;s Build Together →
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 sm:px-8 py-3 sm:py-4 glass border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200 text-center text-sm sm:text-base"
            >
              Book a Free Strategy Call
            </motion.a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="grid grid-cols-3 gap-4 sm:gap-6 pt-6 sm:pt-8 border-t border-gray-200 dark:border-gray-800"
          >
            {[
              { label: "Projects", value: 50, suffix: "+" },
              { label: "Clients", value: 100, suffix: "+" },
              { label: "Success", value: 98, suffix: "%" },
            ].map((stat, index) => (
              <div key={index} className="text-center md:text-left">
                <div className="text-3xl sm:text-4xl md:text-2xl lg:text-3xl font-bold gradient-text mb-1">
                  <Counter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: Premium Animated Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative h-[300px] sm:h-[400px] md:h-[500px] w-full max-w-md mx-auto md:max-w-none"
        >
          {/* Animated Gradient Background */}
          <AnimatedGradient />

          {/* Premium Geometric Shapes */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Main Orb - Glassmorphism */}
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80"
            >
              <div className="absolute inset-0 rounded-full glass border-2 border-primary-200 dark:border-primary-800/50" />
              <div className="absolute inset-4 rounded-full glass border border-primary-300 dark:border-primary-700/50" />

              {/* Center gradient dot */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 dark:from-accent-dark dark:to-primary-400 blur-xl"
              />
            </motion.div>

            {/* Floating decorative elements */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -20, 0],
                  x: [0, Math.sin(i) * 15, 0],
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut",
                }}
                className="absolute w-3 h-3 rounded-full bg-primary-400 dark:bg-accent-dark"
                style={{
                  left: `${20 + i * 30}%`,
                  top: `${30 + (i % 2) * 40}%`,
                  boxShadow: "0 0 20px rgba(102, 126, 234, 0.5)",
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
