"use client";

import { useEffect, useState, useRef } from "react";
import { useReveal } from "@/hooks/useReveal";

/* ── Animated Counter ── */
function AnimatedCounter({ end, suffix = "" }: { end: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTime: number;
          const animate = (t: number) => {
            if (!startTime) startTime = t;
            const progress = Math.min((t - startTime) / 2000, 1);
            const easeOut = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(end * easeOut));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [end]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const trustStats = [
  { value: 150, suffix: "+", label: "Campaigns Delivered" },
  { value: 40, suffix: "+", label: "Brands Scaled" },
  { value: 4, suffix: ".2x", label: "Avg. ROI" },
];

export default function Intro() {
  const { ref, revealed } = useReveal();

  return (
    <section id="intro" className="hidden md:block py-14 md:py-28 px-4 md:px-8 section-dark">
      <div className="container mx-auto max-w-3xl text-center" ref={ref}>

        {/* Tagline */}
        <div className={`reveal ${revealed ? "revealed" : ""}`}>
          <p
            className="text-[12px] md:text-[15px] font-heading font-medium uppercase tracking-[0.15em] md:tracking-[0.2em] mb-4 md:mb-5"
            style={{ color: "#b8a88a" }}
          >
            We Build Growth Systems That Scale
          </p>
          <p
            className="text-[14px] md:text-[17px] mb-8 md:mb-10 leading-relaxed max-w-lg mx-auto"
            style={{ color: "#7a6d56" }}
          >
            Performance marketing, brand strategy, and intelligent automation —
            engineered to help ambitious brands acquire customers and grow sustainably.
          </p>
        </div>

        {/* CTAs */}
        <div className={`flex flex-col sm:flex-row gap-3 justify-center mb-12 md:mb-16 reveal reveal-delay-1 ${revealed ? "revealed" : ""}`}>
          <a href="#contact" className="px-6 py-3 md:px-8 md:py-4 btn-primary rounded-lg text-sm md:text-base font-semibold">
            Book a Strategy Call →
          </a>
          <a href="#projects" className="px-6 py-3 md:px-8 md:py-4 btn-secondary rounded-lg text-sm md:text-base">
            See Our Work
          </a>
        </div>

        {/* Trust Stats */}
        <div className={`grid grid-cols-3 gap-2 sm:gap-4 max-w-sm md:max-w-md mx-auto reveal reveal-delay-2 ${revealed ? "revealed" : ""}`}>
          {trustStats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-stat font-heading" style={{ color: "#f5f0e8" }}>
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xs md:text-sm mt-1 uppercase tracking-wider" style={{ color: "#7a6d56" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
