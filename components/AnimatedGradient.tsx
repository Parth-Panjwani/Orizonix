"use client";

import { useEffect, useRef } from "react";

export default function AnimatedGradient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    window.addEventListener("resize", resize, { passive: true });

    const isDark = document.documentElement.classList.contains("dark");

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      time += 0.01;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(canvas.width, canvas.height) * 0.4;

      // Create gradient mesh effect
      const gradient = ctx.createRadialGradient(
        centerX + Math.sin(time) * 20,
        centerY + Math.cos(time) * 20,
        0,
        centerX,
        centerY,
        radius
      );

      if (isDark) {
        gradient.addColorStop(0, "rgba(0, 212, 255, 0.15)");
        gradient.addColorStop(0.5, "rgba(123, 97, 255, 0.1)");
        gradient.addColorStop(1, "rgba(0, 212, 255, 0)");
      } else {
        gradient.addColorStop(0, "rgba(102, 126, 234, 0.2)");
        gradient.addColorStop(0.5, "rgba(118, 75, 162, 0.15)");
        gradient.addColorStop(1, "rgba(102, 126, 234, 0)");
      }

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add subtle floating particles
      for (let i = 0; i < 5; i++) {
        const angle = (time * 0.5 + i * 1.2) % (Math.PI * 2);
        const x = centerX + Math.cos(angle) * (radius * 0.6);
        const y = centerY + Math.sin(angle) * (radius * 0.6);

        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? `rgba(0, 212, 255, ${0.3 + Math.sin(time + i) * 0.2})`
          : `rgba(102, 126, 234, ${0.4 + Math.sin(time + i) * 0.2})`;
        ctx.fill();
      }
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ willChange: "auto" }}
    />
  );
}

