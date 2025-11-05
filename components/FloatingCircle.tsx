"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function FloatingCircle() {
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const circle = circleRef.current;
    if (!circle) return;

    let x = Math.random() * window.innerWidth;
    let y = Math.random() * window.innerHeight;
    let dx = (Math.random() - 0.5) * 2;
    let dy = (Math.random() - 0.5) * 2;

    const moveCircle = () => {
      x += dx;
      y += dy;

      // Bounce off edges
      if (x <= 0 || x >= window.innerWidth) dx *= -1;
      if (y <= 0 || y >= window.innerHeight) dy *= -1;

      // Keep within bounds
      x = Math.max(0, Math.min(window.innerWidth, x));
      y = Math.max(0, Math.min(window.innerHeight, y));

      if (circle) {
        circle.style.left = `${x}px`;
        circle.style.top = `${y}px`;
      }

      requestAnimationFrame(moveCircle);
    };

    const interval = setInterval(moveCircle, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      ref={circleRef}
      className="fixed w-32 h-32 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 pointer-events-none z-0"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 2 }}
      style={{
        boxShadow: "0 0 60px rgba(255, 255, 255, 0.1), inset 0 0 60px rgba(255, 255, 255, 0.05)",
      }}
    />
  );
}

