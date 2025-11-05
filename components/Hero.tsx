"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Suspense } from "react";

// Lazy load FloatingOrb
const FloatingOrb = dynamic(() => import("./FloatingOrb"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-32 h-32 border-2 border-neon-blue/30 rounded-full animate-pulse" />
    </div>
  ),
});

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 md:px-8 pt-20">
      {/* Creative background blobs - use CSS animations instead */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-neon-blue/10 rounded-full blur-3xl creative-blob" />
      <div
        className="absolute bottom-1/4 right-0 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl creative-blob"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-neon-pink/10 rounded-full blur-3xl creative-blob"
        style={{ animationDelay: "2s" }}
      />

      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left: Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="z-10"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-dark-surface/50 border border-dark-border backdrop-blur-sm mb-6"
          >
            <span className="w-2 h-2 bg-neon-blue rounded-full animate-pulse" />
            <span className="text-sm text-gray-300">Creative-Tech Agency</span>
          </motion.div>

          {/* Main Heading - 2 lines only */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="block text-white mb-2">
              We Craft Brands. Build Systems.
            </span>
            <span className="block gradient-text">Automate Growth.</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed max-w-xl"
          >
            Where <span className="gradient-text font-semibold">Creative Strategy</span> meets{" "}
            <span className="gradient-text font-semibold">Digital Innovation</span>.
            <br />
            We craft brands, build digital experiences, and drive growth through marketing excellence.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 mb-8"
          >
            <motion.a
              href="https://wa.me/919898084143"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-neon-blue text-dark-bg font-semibold rounded-lg hover:bg-neon-cyan transition-all duration-300 text-center relative overflow-hidden group"
              style={{ willChange: "transform" }}
            >
              <span className="relative z-10">Let&apos;s Build Together →</span>
              <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan to-neon-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-transparent border-2 border-neon-blue text-neon-blue font-semibold rounded-lg neon-border hover:neon-border-glow transition-all duration-300 text-center"
              style={{ willChange: "transform" }}
            >
              Book a Free Strategy Call
            </motion.a>
          </motion.div>

          {/* Stats - Premium feel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-3 gap-6 pt-8 border-t border-dark-border/50"
          >
            {[
              { label: "Projects", value: "50+" },
              { label: "Clients", value: "100+" },
              { label: "Success", value: "98%" },
            ].map((stat, index) => (
              <div key={index} className="text-left">
                <div className="text-2xl md:text-3xl font-bold gradient-text mb-1">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-gray-400 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: Enhanced 3D Creative Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative h-[500px] md:h-[600px] w-full"
        >
          {/* Main 3D Orb */}
          <div className="absolute inset-0">
            <Suspense fallback={<div className="w-full h-full" />}>
              <FloatingOrb />
            </Suspense>
          </div>

          {/* Multiple rotating rings - use CSS transforms */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              animation: "rotate 25s linear infinite",
              willChange: "transform",
            }}
          >
            <div className="w-full h-full border border-neon-blue/20 rounded-full" />
          </div>
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              animation: "rotate-reverse 35s linear infinite",
              willChange: "transform",
            }}
          >
            <div className="w-[85%] h-[85%] border border-neon-purple/20 rounded-full" />
          </div>
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              animation: "rotate 45s linear infinite",
              willChange: "transform",
            }}
          >
            <div className="w-[70%] h-[70%] border border-neon-cyan/15 rounded-full" />
          </div>

          {/* Reduced floating particles - from 8 to 4 */}
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 bg-neon-blue rounded-full"
              style={{
                left: `${15 + (i % 2) * 35}%`,
                top: `${25 + Math.floor(i / 2) * 35}%`,
                boxShadow: "0 0 20px rgba(0, 212, 255, 0.6)",
                animation: `float-${i} ${4 + i * 0.5}s ease-in-out infinite`,
                animationDelay: `${i * 0.4}s`,
                willChange: "transform, opacity",
              }}
            />
          ))}

          {/* Geometric shapes - use CSS animations */}
          <div
            className="absolute top-1/4 right-1/4 w-16 h-16 border-2 border-neon-blue/30"
            style={{
              transform: "rotate(45deg)",
              animation: "rotate 20s linear infinite",
              willChange: "transform",
            }}
          />
          <div
            className="absolute bottom-1/4 left-1/4 w-12 h-12 border-2 border-neon-purple/30"
            style={{
              transform: "rotate(45deg)",
              animation: "rotate-reverse 30s linear infinite",
              willChange: "transform",
            }}
          />
        </motion.div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes rotate-reverse {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }

        @keyframes float-0 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.4;
          }
          50% {
            transform: translate(0, -40px) scale(1.5);
            opacity: 1;
          }
        }

        @keyframes float-1 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.4;
          }
          50% {
            transform: translate(15px, -40px) scale(1.5);
            opacity: 1;
          }
        }

        @keyframes float-2 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.4;
          }
          50% {
            transform: translate(-15px, -40px) scale(1.5);
            opacity: 1;
          }
        }

        @keyframes float-3 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.4;
          }
          50% {
            transform: translate(20px, -40px) scale(1.5);
            opacity: 1;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}
