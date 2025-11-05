"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface CircleProps {
  size: number;
  speed: number;
  initialX: number;
  initialY: number;
  delay: number;
}

function FloatingCircle({ size, speed, initialX, initialY, delay }: CircleProps) {
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const circle = circleRef.current;
    if (!circle) return;

    let x = initialX;
    let y = initialY;
    let dx = (Math.random() - 0.5) * speed;
    let dy = (Math.random() - 0.5) * speed;

    const moveCircle = () => {
      x += dx;
      y += dy;

      // Bounce off edges
      if (x <= 0 || x >= window.innerWidth) {
        dx *= -1;
        x = Math.max(0, Math.min(window.innerWidth, x));
      }
      if (y <= 0 || y >= window.innerHeight) {
        dy *= -1;
        y = Math.max(0, Math.min(window.innerHeight, y));
      }

      if (circle) {
        circle.style.left = `${x}px`;
        circle.style.top = `${y}px`;
      }

      requestAnimationFrame(moveCircle);
    };

    // Start animation after delay
    const timeout = setTimeout(() => {
      moveCircle();
      const interval = setInterval(moveCircle, 16);
      return () => clearInterval(interval);
    }, delay * 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [speed, initialX, initialY, delay]);

  return (
    <motion.div
      ref={circleRef}
      className="fixed rounded-full bg-white/5 backdrop-blur-sm border border-white/10 pointer-events-none z-0"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        left: `${initialX}px`,
        top: `${initialY}px`,
        boxShadow: "0 0 80px rgba(255, 255, 255, 0.08), inset 0 0 80px rgba(255, 255, 255, 0.03)",
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 2, delay }}
    />
  );
}

export default function FloatingCircles() {
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Create multiple circles with different sizes and speeds
  const circles = [
    { size: 120, speed: 0.8, initialX: 100, initialY: 200, delay: 0 },
    { size: 200, speed: 0.5, initialX: dimensions.width - 300, initialY: 300, delay: 0.5 },
    { size: 150, speed: 0.6, initialX: 500, initialY: dimensions.height - 200, delay: 1 },
    { size: 180, speed: 0.7, initialX: dimensions.width / 2, initialY: 100, delay: 1.5 },
    { size: 100, speed: 1, initialX: 200, initialY: dimensions.height / 2, delay: 2 },
    { size: 160, speed: 0.6, initialX: dimensions.width - 200, initialY: dimensions.height - 300, delay: 2.5 },
  ];

  return (
    <>
      {circles.map((circle, index) => (
        <FloatingCircle key={index} {...circle} />
      ))}
    </>
  );
}
