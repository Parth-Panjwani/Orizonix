"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useReveal } from "@/hooks/useReveal";

/* ── 3D Animated Growth Dashboard Graphic ── */
function GrowthGraphic() {
  return (
    <div className="relative w-full h-full min-h-[400px] md:min-h-[520px] flex items-center justify-center">
      {/* Ambient glow */}
      <div
        className="absolute w-72 h-72 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* 3D Tilted Dashboard Card */}
      <motion.div
        className="relative"
        style={{
          perspective: "1200px",
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <motion.div
          className="relative rounded-2xl p-6 w-[280px] sm:w-[300px]"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(241,245,249,0.8) 100%)",
            border: "1px solid rgba(59,130,246,0.12)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.08), 0 0 30px rgba(37,99,235,0.06)",
            transformStyle: "preserve-3d",
          }}
          animate={{
            rotateY: [2, -2, 2],
            rotateX: [-3, 3, -3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Dashboard Header */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                Growth Dashboard
              </span>
            </div>
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500">Live</span>
          </div>

          {/* Revenue Stat */}
          <div className="mb-4">
            <p className="text-[11px] uppercase tracking-wider mb-1" style={{ color: "var(--text-muted)" }}>Monthly Revenue</p>
            <div className="flex items-baseline gap-2">
              <span className="text-[28px] font-heading font-bold" style={{ color: "var(--text-primary)" }}>₹4.2L</span>
              <span className="text-[12px] font-semibold text-green-500 flex items-center gap-0.5">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                </svg>
                +32%
              </span>
            </div>
          </div>

          {/* Animated Chart */}
          <div className="mb-4 rounded-lg p-3" style={{ background: "rgba(37,99,235,0.03)", border: "1px solid rgba(37,99,235,0.06)" }}>
            <svg viewBox="0 0 240 60" className="w-full h-14">
              <defs>
                <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Grid lines */}
              {[15, 30, 45].map((y) => (
                <line key={y} x1="0" y1={y} x2="240" y2={y} stroke="rgba(37,99,235,0.06)" strokeWidth="1" />
              ))}
              {/* Area fill */}
              <motion.path
                d="M0 50 Q30 45 60 40 T120 30 T180 18 T240 8 L240 60 L0 60 Z"
                fill="url(#chartFill)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
              />
              {/* Line */}
              <motion.path
                d="M0 50 Q30 45 60 40 T120 30 T180 18 T240 8"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
              />
              {/* Dot at end */}
              <motion.circle
                cx="240" cy="8" r="3"
                fill="#3B82F6"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.5, duration: 0.3 }}
              />
              <motion.circle
                cx="240" cy="8" r="6"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="1"
                opacity="0.3"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 0.3, 0], scale: [0.5, 1.5, 2] }}
                transition={{ delay: 2.5, duration: 2, repeat: Infinity }}
              />
            </svg>
          </div>

          {/* KPI Row */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "Leads", value: "342", trend: "+18%" },
              { label: "CAC", value: "₹310", trend: "-24%" },
              { label: "ROAS", value: "4.2x", trend: "+41%" },
            ].map((kpi, i) => (
              <motion.div
                key={i}
                className="text-center rounded-lg p-2"
                style={{ background: "rgba(37,99,235,0.04)" }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + i * 0.15 }}
              >
                <p className="text-[14px] font-heading font-bold" style={{ color: "var(--text-primary)" }}>{kpi.value}</p>
                <p className="text-[9px] uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>{kpi.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Floating Orbit Elements */}
      <motion.div
        className="absolute w-10 h-10 rounded-xl flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(241,245,249,0.9))",
          border: "1px solid rgba(59,130,246,0.12)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
          top: "12%",
          right: "8%",
        }}
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, 0],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute w-10 h-10 rounded-xl flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(241,245,249,0.9))",
          border: "1px solid rgba(139,92,246,0.12)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
          bottom: "18%",
          left: "5%",
        }}
        animate={{
          y: [0, 8, 0],
          rotate: [0, -5, 0],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2">
          <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute w-8 h-8 rounded-lg flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(241,245,249,0.9))",
          border: "1px solid rgba(16,185,129,0.12)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
          top: "65%",
          right: "3%",
        }}
        animate={{
          y: [0, -6, 0],
          x: [0, 4, 0],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      </motion.div>

      {/* Floating data dots */}
      {[
        { x: "15%", y: "25%", delay: 0 },
        { x: "85%", y: "40%", delay: 1.5 },
        { x: "20%", y: "70%", delay: 3 },
      ].map((dot, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-blue-400/30"
          style={{ left: dot.x, top: dot.y }}
          animate={{
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{ duration: 3, repeat: Infinity, delay: dot.delay }}
        />
      ))}
    </div>
  );
}

export default function Contact() {
  const { ref, revealed } = useReveal();
  const [formStatus, setFormStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: null, message: "" });

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      company: formData.get("company"),
      website: formData.get("website") || "",
      budget: formData.get("budget"),
    };

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        form.reset();
        setFormStatus({
          type: "success",
          message: "Thank you! We'll be in touch within 24 hours.",
        });
      } else {
        setFormStatus({
          type: "error",
          message: result.error || "Something went wrong. Please try again.",
        });
      }
    } catch {
      setFormStatus({
        type: "error",
        message: "Network error. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setFormStatus({ type: null, message: "" }), 5000);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 px-4 md:px-8 section-dark">
      <div className="container mx-auto max-w-6xl" ref={ref}>
        <div className={`text-center mb-12 reveal ${revealed ? "revealed" : ""}`}>
          <span className="section-label mb-3 block">Let&apos;s Talk</span>
          <h2 className="text-section font-heading mb-4" style={{ color: "var(--text-primary)" }}>
            Ready to Build Predictable Growth?
          </h2>
          <p className="text-[16px] md:text-[17px]" style={{ color: "var(--text-secondary)" }}>
            Tell us about your business. We&apos;ll show you what&apos;s possible.
          </p>
        </div>

        <div className={`flex flex-col md:flex-row gap-8 md:gap-12 items-stretch reveal reveal-delay-1 ${revealed ? "revealed" : ""}`}>
          {/* Left — 3D Animated Graphic */}
          <div className="hidden md:flex flex-1 items-center justify-center rounded-2xl overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(241,245,249,0.6) 0%, rgba(248,250,252,0.4) 100%)",
              border: "1px solid var(--border-subtle)",
            }}
          >
            <GrowthGraphic />
          </div>

          {/* Right — Contact Form */}
          <div className="flex-1 max-w-lg md:max-w-none">
            <div className="glass-card rounded-xl p-5 sm:p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                {formStatus.message && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-lg text-[14px] ${
                      formStatus.type === "success"
                        ? "bg-blue-500/10 text-blue-600 border border-blue-500/20"
                        : "bg-red-500/10 text-red-500 border border-red-500/20"
                    }`}
                  >
                    {formStatus.message}
                  </motion.div>
                )}

                <div>
                  <label htmlFor="name" className="block text-[13px] mb-1.5 font-medium" style={{ color: "var(--text-secondary)" }}>
                    Name <span className="text-blue-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-lg input-field"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-[13px] mb-1.5 font-medium" style={{ color: "var(--text-secondary)" }}>
                    Contact Number <span className="text-blue-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    className="w-full px-4 py-3 rounded-lg input-field"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-[13px] mb-1.5 font-medium" style={{ color: "var(--text-secondary)" }}>
                    Company <span className="text-blue-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    required
                    className="w-full px-4 py-3 rounded-lg input-field"
                    placeholder="Your company name"
                  />
                </div>

                <div>
                  <label htmlFor="website" className="block text-[13px] mb-1.5 font-medium" style={{ color: "var(--text-secondary)" }}>
                    Website <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>(optional)</span>
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    className="w-full px-4 py-3 rounded-lg input-field"
                    placeholder="https://yourwebsite.com"
                  />
                </div>

                <div>
                  <label htmlFor="budget" className="block text-[13px] mb-1.5 font-medium" style={{ color: "var(--text-secondary)" }}>
                    Monthly Marketing Budget <span className="text-blue-500">*</span>
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    required
                    className="w-full px-4 py-3 rounded-lg input-field appearance-none cursor-pointer"
                    defaultValue=""
                  >
                    <option value="" disabled style={{ background: "var(--bg-secondary)", color: "var(--text-muted)" }}>
                      Select budget range
                    </option>
                    <option value="under-25k" style={{ background: "var(--bg-secondary)", color: "var(--text-body)" }}>
                      Under ₹25,000
                    </option>
                    <option value="25k-50k" style={{ background: "var(--bg-secondary)", color: "var(--text-body)" }}>
                      ₹25,000 – ₹50,000
                    </option>
                    <option value="50k-1l" style={{ background: "var(--bg-secondary)", color: "var(--text-body)" }}>
                      ₹50,000 – ₹1,00,000
                    </option>
                    <option value="1l-plus" style={{ background: "var(--bg-secondary)", color: "var(--text-body)" }}>
                      ₹1,00,000+
                    </option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 btn-primary rounded-lg text-[15px] font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    "Get Your Growth Blueprint →"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
