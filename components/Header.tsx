"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "How We Work" },
  { href: "#projects", label: "Projects" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
];

const sectionIds = navLinks.map((l) => l.href.replace("#", ""));

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const clickedRef = useRef<string | null>(null);
  const clickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ── Scroll shadow ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Body lock for mobile menu ── */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  /* ── Scroll-based active section tracking ── */
  useEffect(() => {
    const handleScroll = () => {
      if (clickedRef.current) return;

      const scrollY = window.scrollY + window.innerHeight * 0.35;
      let currentId = "";

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollY >= top) {
            currentId = id;
          }
        }
      }

      if (currentId) {
        setActiveLink(`#${currentId}`);
      } else {
        setActiveLink("");
      }
    };

    // Run once initially after sections render
    const timer = setTimeout(handleScroll, 200);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLinkClick = useCallback((href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileOpen(false);
    setActiveLink(href);

    clickedRef.current = href;
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    clickTimerRef.current = setTimeout(() => {
      clickedRef.current = null;
    }, 1200);

    const target = document.querySelector(href);
    target?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${
          scrolled || mobileOpen ? "glass-strong py-3" : "py-5"
        }`}
      >
        <div className="container mx-auto max-w-6xl px-4 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div
              className="relative flex-shrink-0 w-9 h-9 rounded-lg overflow-hidden"
              style={{ filter: "drop-shadow(0 0 12px rgba(212,168,83,0.25))" }}
            >
              <Image
                src="/Auravis.png"
                alt="Auravis Logo"
                width={36}
                height={36}
                className="object-contain w-full h-full"
                priority
              />
            </div>
            <span className="text-2xl font-brand tracking-tight leading-none relative -top-[-2px]" style={{ color: "var(--text-primary)" }}>
              Auravis
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick(link.href)}
                className={`relative text-[15px] transition-colors duration-200 font-medium py-1 group ${
                  activeLink === link.href ? "text-gold-400" : ""
                }`}
                style={{ color: activeLink === link.href ? "#D4A853" : "var(--text-secondary)" }}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-0 h-[2px] bg-gold-400 transition-all duration-300 ${
                    activeLink === link.href ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </a>
            ))}

            <a
              href="#contact"
              onClick={handleLinkClick("#contact")}
              className="px-5 py-2.5 rounded-lg btn-primary text-[14px] font-semibold hover:scale-105 transition-transform"
            >
              Get Started
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden relative w-8 h-8 flex items-center justify-center"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <span className="sr-only">{mobileOpen ? "Close" : "Menu"}</span>
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span
                className={`block w-6 h-[2px] rounded-full transition-all duration-250 origin-center ${
                  mobileOpen ? "rotate-45 translate-y-[9px]" : ""
                }`}
                style={{ background: "var(--text-primary)" }}
              />
              <span
                className={`block w-6 h-[2px] rounded-full transition-all duration-250 ${
                  mobileOpen ? "opacity-0 scale-x-0" : ""
                }`}
                style={{ background: "var(--text-primary)" }}
              />
              <span
                className={`block w-6 h-[2px] rounded-full transition-all duration-250 origin-center ${
                  mobileOpen ? "-rotate-45 -translate-y-[9px]" : ""
                }`}
                style={{ background: "var(--text-primary)" }}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 lg:hidden"
            style={{ background: "var(--surface-overlay)" }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick(link.href)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className={`text-xl font-heading font-semibold transition-colors ${
                  activeLink === link.href ? "text-gold-400" : ""
                }`}
                style={{ color: activeLink === link.href ? "#D4A853" : "var(--text-primary)" }}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              onClick={handleLinkClick("#contact")}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="px-8 py-3 btn-primary text-base rounded-lg mt-4"
            >
              Get Started
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
