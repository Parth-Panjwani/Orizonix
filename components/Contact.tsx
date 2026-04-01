"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useReveal } from "@/hooks/useReveal";

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
    <section id="contact" className="py-20 md:py-24 px-4 md:px-8 section-dark">
      <div className="container mx-auto max-w-2xl" ref={ref}>
        <div className={`text-center mb-10 reveal ${revealed ? "revealed" : ""}`}>
          <span className="section-label mb-3 block">Let&apos;s Talk</span>
          <h2 className="text-section font-heading mb-4" style={{ color: "var(--text-primary)" }}>
            Ready to Build Predictable Growth?
          </h2>
          <p className="text-[16px] md:text-[17px]" style={{ color: "var(--text-secondary)" }}>
            Tell us about your business. We&apos;ll show you what&apos;s possible.
          </p>
        </div>

        <div className={`glass-card rounded-xl p-5 sm:p-6 md:p-8 reveal reveal-delay-1 ${revealed ? "revealed" : ""}`}>
          <form onSubmit={handleSubmit} className="space-y-5">
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
              <label htmlFor="name" className="block text-[14px] mb-2" style={{ color: "var(--text-secondary)" }}>
                Name <span className="text-blue-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-3.5 rounded-lg input-field"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-[14px] mb-2" style={{ color: "var(--text-secondary)" }}>
                Contact Number <span className="text-blue-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                className="w-full px-4 py-3.5 rounded-lg input-field"
                placeholder="+91 98765 43210"
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-[14px] mb-2" style={{ color: "var(--text-secondary)" }}>
                Company <span className="text-blue-500">*</span>
              </label>
              <input
                type="text"
                id="company"
                name="company"
                required
                className="w-full px-4 py-3.5 rounded-lg input-field"
                placeholder="Your company name"
              />
            </div>

            <div>
              <label htmlFor="website" className="block text-[14px] mb-2" style={{ color: "var(--text-secondary)" }}>
                Website <span className="text-xs" style={{ color: "var(--text-muted)" }}>(optional)</span>
              </label>
              <input
                type="url"
                id="website"
                name="website"
                className="w-full px-4 py-3.5 rounded-lg input-field"
                placeholder="https://yourwebsite.com"
              />
            </div>

            <div>
              <label htmlFor="budget" className="block text-[14px] mb-2" style={{ color: "var(--text-secondary)" }}>
                Monthly Marketing Budget <span className="text-blue-500">*</span>
              </label>
              <select
                id="budget"
                name="budget"
                required
                className="w-full px-4 py-3.5 rounded-lg input-field appearance-none cursor-pointer"
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
              className="w-full py-4 btn-primary rounded-lg text-[15px] font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
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
    </section>
  );
}
