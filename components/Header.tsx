"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#case-studies", label: "Case Studies" },
  { href: "#pricing", label: "Pricing" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleLinkClick = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileOpen(false);
    setActiveLink(href);
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
              style={{ filter: "drop-shadow(0 0 12px rgba(59,130,246,0.35))" }}
            >
              <Image
                src="/Orizonix.png"
                alt="Orizonix Logo"
                width={40}
                height={40}
                className="object-contain brightness-[1.8]"
                priority
              />
            </div>
            <span className="text-xl font-heading font-bold text-white tracking-tight">
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
                className="relative text-[15px] text-zinc-400 hover:text-white transition-colors duration-200 font-medium py-1 group"
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
                className={`block w-6 h-[2px] bg-white rounded-full transition-all duration-250 origin-center ${
                  mobileOpen ? "rotate-45 translate-y-[9px]" : ""
                }`}
              />
              <span
                className={`block w-6 h-[2px] bg-white rounded-full transition-all duration-250 ${
                  mobileOpen ? "opacity-0 scale-x-0" : ""
                }`}
              />
              <span
                className={`block w-6 h-[2px] bg-white rounded-full transition-all duration-250 origin-center ${
                  mobileOpen ? "-rotate-45 -translate-y-[9px]" : ""
                }`}
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
            style={{ background: "rgba(11, 15, 26, 1)" }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick(link.href)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="text-2xl font-heading font-semibold text-white hover:text-blue-400 transition-colors"
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
