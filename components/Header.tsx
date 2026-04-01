"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projects" },
  { href: "#pricing", label: "Pricing" },
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

  /* ── IntersectionObserver — update active link on scroll ── */
  useEffect(() => {
    // Map: sectionId → ratio currently visible
    const ratioMap: Record<string, number> = {};

    const observer = new IntersectionObserver(
      (entries) => {
        // If user just clicked a link, let the click-set value win for 800ms
        if (clickedRef.current) return;

        entries.forEach((entry) => {
          ratioMap[entry.target.id] = entry.intersectionRatio;
        });

        // Pick the section with the highest visible ratio
        let bestId = "";
        let bestRatio = 0;
        for (const id of sectionIds) {
          const r = ratioMap[id] ?? 0;
          if (r > bestRatio) { bestRatio = r; bestId = id; }
        }
        if (bestId) setActiveLink(`#${bestId}`);
      },
      {
        // Fire at these intersection thresholds
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
        // Shrink the top of the viewport by 80px (header height) so sections
        // become "active" right when they scroll into view below the header
        rootMargin: "-80px 0px -40% 0px",
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleLinkClick = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileOpen(false);
    setActiveLink(href);

    // Suppress observer override for 1s while smooth-scroll plays out
    clickedRef.current = href;
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    clickTimerRef.current = setTimeout(() => {
      clickedRef.current = null;
    }, 1000);

    const target = document.querySelector(href);
    target?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Header bar — z-[60] so it stays above the mobile overlay */}
      <header
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${
          scrolled || mobileOpen ? "glass-strong py-3" : "py-5"
        }`}
      >
        <div className="container mx-auto max-w-6xl px-4 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div
              className="relative flex-shrink-0 w-10 h-10 rounded-lg overflow-hidden"
              style={{ filter: "drop-shadow(0 0 12px rgba(59,130,246,0.25))" }}
            >
              <Image
                src="/Orizonix.png"
                alt="Orizonix Logo"
                width={40}
                height={40}
                className="object-contain"
                priority
              />
            </div>
            <span className="text-xl font-heading font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
              Orizonix
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick(link.href)}
                className="relative text-[15px] transition-colors duration-200 font-medium py-1 group"
                style={{ color: "var(--text-secondary)" }}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-0 h-[2px] bg-blue-500 transition-all duration-300 ${
                    activeLink === link.href ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </a>
            ))}

            <a
              href="#contact"
              onClick={handleLinkClick("#contact")}
              className="px-6 py-2.5 btn-primary text-sm rounded-lg"
            >
              Book a Strategy Call
            </a>
          </div>

          {/* Mobile Hamburger / Close */}
          <button
            className="md:hidden relative w-8 h-8 flex items-center justify-center"
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

      {/* Mobile Menu Overlay — z-50, BELOW the header (z-60) so close button works */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 md:hidden"
            style={{ background: "var(--surface-overlay)" }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick(link.href)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="text-2xl font-heading font-semibold hover:text-blue-500 transition-colors"
                style={{ color: "var(--text-primary)" }}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              onClick={handleLinkClick("#contact")}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="px-8 py-3 btn-primary text-base rounded-lg mt-4"
            >
              Book a Strategy Call
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
