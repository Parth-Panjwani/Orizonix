"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

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
      const progress = Math.min(
        (currentTime - startTime) / (duration * 1000),
        1
      );

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(
        startValue + (end - startValue) * easeOutQuart
      );
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
          className="z-10 order-2 md:order-1"
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

          {/* Mobile Image - Above Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="relative h-[250px] sm:h-[300px] w-full max-w-sm mx-auto mb-6 md:hidden"
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-4 shadow-lg">
              <Image
                src="/hero.png"
                alt="Digital Marketing & Business Growth"
                fill
                className="object-contain"
                priority
                quality={100}
                unoptimized
              />
            </div>
          </motion.div>

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

        {/* Right: Isometric Illustration - Desktop Only */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="hidden md:flex relative h-[550px] lg:h-[650px] xl:h-[700px] w-full max-w-2xl mx-auto md:max-w-none order-2 items-center justify-center"
        >
          <div className="relative w-full h-full rounded-3xl overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-4 md:p-6 shadow-xl">
            <Image
              src="/hero.png"
              alt="Digital Marketing & Business Growth"
              fill
              className="object-contain"
              priority
              quality={100}
              unoptimized
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
