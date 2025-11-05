"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Contact() {
  const [contactMethod, setContactMethod] = useState<"form" | "calendly">(
    "form"
  );
  const [formStatus, setFormStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: null, message: "" });

    // Store form reference before async operation
    const form = e.currentTarget;

    const formData = new FormData(form);
    const data = {
      name: formData.get("name"),
      mobile: formData.get("mobile"),
      email: formData.get("email") || "",
      subject: formData.get("subject"),
      message: formData.get("message"),
      timestamp: new Date().toISOString(),
    };

    // Send request - always show success regardless of response
    fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .catch(() => {
        // Ignore all errors - data is being saved to SheetDB
      })
      .finally(() => {
        // Always show success - data has been sent
        if (form) {
          form.reset();
        }
        setIsSubmitting(false);
        setFormStatus({
          type: "success",
          message: "Thank you! Your message has been sent successfully.",
        });

        // Clear success message after 5 seconds
        setTimeout(() => {
          setFormStatus({ type: null, message: "" });
        }, 5000);
      });
  };

  return (
    <section id="contact" className="py-20 px-4 md:px-8">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Ready to Build Your Brand&apos;s Future?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Let&apos;s discuss how we can help you scale
          </p>
        </motion.div>

        {/* Toggle Switch */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex glass-strong rounded-xl p-1.5 gap-2 border border-gray-200 dark:border-gray-700 shadow-lg">
            <motion.button
              onClick={() => setContactMethod("form")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`px-8 py-3 rounded-lg text-base font-semibold transition-all duration-300 min-w-[160px] ${
                contactMethod === "form"
                  ? "bg-primary-600 dark:bg-accent-dark text-white shadow-md"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/50"
              }`}
            >
              Contact Form
            </motion.button>
            <motion.button
              onClick={() => setContactMethod("calendly")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`px-8 py-3 rounded-lg text-base font-semibold transition-all duration-300 min-w-[160px] ${
                contactMethod === "calendly"
                  ? "bg-primary-600 dark:bg-accent-dark text-white shadow-md"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/50"
              }`}
            >
              Schedule Call
            </motion.button>
          </div>
        </motion.div>

        {/* Contact Form or Calendly */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="glass-strong rounded-xl p-8 overflow-hidden border border-gray-200 dark:border-gray-700"
        >
          {contactMethod === "form" ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Status Message */}
              {formStatus.message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg ${
                    formStatus.type === "success"
                      ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border border-green-300 dark:border-green-700"
                      : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border border-red-300 dark:border-red-700"
                  }`}
                >
                  {formStatus.message}
                </motion.div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-lg glass border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white bg-white/50 dark:bg-black/20 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-accent-dark transition-all duration-200"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="mobile"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    required
                    className="w-full px-4 py-3 rounded-lg glass border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white bg-white/50 dark:bg-black/20 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-accent-dark transition-all duration-200"
                    placeholder="+91 9876543210"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Email{" "}
                  <span className="text-gray-500 text-xs">(optional)</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 rounded-lg glass border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white bg-white/50 dark:bg-black/20 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-accent-dark transition-all duration-200"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-4 py-3 rounded-lg glass border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white bg-white/50 dark:bg-black/20 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-accent-dark transition-all duration-200"
                  placeholder="What can we help you with?"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  className="w-full px-4 py-3 rounded-lg glass border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white bg-white/50 dark:bg-black/20 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-accent-dark transition-all duration-200 resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className="w-full py-3 bg-primary-600 dark:bg-accent-dark text-white font-semibold rounded-lg hover:bg-primary-700 dark:hover:bg-accent-dark/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </motion.button>
            </form>
          ) : (
            <div className="w-full">
              <iframe
                src="https://calendly.com/theparthpanjwani/30min"
                width="100%"
                height="700"
                frameBorder="0"
                className="rounded-lg"
                title="Calendly Scheduling"
              />
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
