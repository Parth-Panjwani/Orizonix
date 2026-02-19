"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

function AnimatedStat({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
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

  return (
    <div ref={ref}>
      <span>{count}{suffix}</span>
    </div>
  );
}

const stats = [
  { value: 150, suffix: "+", label: "Campaigns Launched" },
  { value: 40, suffix: "+", label: "Industries Served" },
  { value: 280, suffix: "%", label: "Avg Revenue Uplift" },
];

const testimonials = [
  {
    quote: "Orizonix didn't just run ads. They built a structured growth engine for us.",
    name: "Founder",
    company: "SaaS Startup",
  },
  {
    quote: "The clarity in strategy and execution was unlike any agency we've worked with.",
    name: "Marketing Head",
    company: "D2C Brand",
  },
  {
    quote: "We finally have predictable lead flow. The system works even when we're not looking.",
    name: "Director",
    company: "Consulting Firm",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.1, ease: "easeOut" },
  }),
};

export default function SocialProof() {
  return (
    <section className="py-20 md:py-24 px-4 md:px-8 section-dark">
      <div className="container mx-auto max-w-5xl">
        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-3 gap-4 sm:gap-8 py-8 sm:py-10 px-4 sm:px-8 md:px-12 glass-card rounded-xl mb-14"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-stat font-heading text-white mb-1">
                <AnimatedStat end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-[11px] sm:text-[13px] text-zinc-500 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Testimonials Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <span className="section-label mb-3 block">Testimonials</span>
          <h2 className="text-section font-heading text-white">
            What Clients Say
          </h2>
        </motion.div>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-3 gap-3 md:gap-5">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="glass-card rounded-xl p-5 sm:p-6 md:p-8 flex flex-col"
            >
              <svg
                className="w-8 h-8 text-blue-500/30 mb-4"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>

              <p className="text-[15px] sm:text-[16px] text-zinc-300 leading-relaxed mb-5 flex-grow italic">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              <div className="pt-4 border-t border-white/[0.06]">
                <div className="text-[15px] font-medium text-white">
                  — {testimonial.name}
                </div>
                <div className="text-[13px] text-zinc-500 mt-0.5">
                  {testimonial.company}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
