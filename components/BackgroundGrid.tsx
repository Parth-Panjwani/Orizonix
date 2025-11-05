"use client";

import { useEffect, useRef } from "react";

export default function BackgroundGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false }); // Better performance
    if (!ctx) return;

    let animationId: number;
    let lastTime = 0;
    const targetFPS = 30; // Reduced from 60 to 30 FPS
    const frameInterval = 1000 / targetFPS;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const handleResize = () => resize();
    window.addEventListener("resize", handleResize, { passive: true });

    const gridSize = 50;
    let time = 0;

    const animate = (currentTime: number) => {
      animationId = requestAnimationFrame(animate);

      const deltaTime = currentTime - lastTime;
      if (deltaTime < frameInterval) return;

      lastTime = currentTime - (deltaTime % frameInterval);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "rgba(0, 212, 255, 0.1)";
      ctx.lineWidth = 1;

      // Draw grid - optimized
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Reduced number of animated points
      const points = 10; // Reduced from 20
      for (let i = 0; i < points; i++) {
        const x = (canvas.width / points) * i + ((time * 0.5) % gridSize);
        const y = Math.sin(time * 0.001 + i) * 100 + canvas.height / 2;
        const alpha = Math.sin(time * 0.005 + i) * 0.5 + 0.5;

        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${alpha * 0.6})`;
        ctx.fill();
      }

      time += 16;
    };

    animate(0);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
      style={{ background: "#0A0A0A", willChange: "auto" }}
    />
  );
}
