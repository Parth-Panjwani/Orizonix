"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Detect active section
      const sections = [
        "services",
        "pricing",
        "features",
        "portfolio",
        "contact",
      ];
      const scrollPosition = window.scrollY + 150;
      let currentSection = "";

      // Check each section to find which one is currently in view
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop } = element;
          if (scrollPosition >= offsetTop) {
            currentSection = section;
            break;
          }
        }
      }

      // If at top, default to first section or empty
      if (scrollPosition < 200) {
        currentSection = "";
      }

      setActiveSection((prev) => {
        if (currentSection !== prev) {
          return currentSection;
        }
        return prev;
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navLinks = [
    { href: "#services", label: "Services" },
    { href: "#pricing", label: "Pricing" },
    { href: "#features", label: "Features" },
    { href: "#portfolio", label: "Portfolio" },
    { href: "#contact", label: "Contact" },
  ];

  const handleLinkClick =
    (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      setIsMobileMenuOpen(false);

      const targetId = href.replace("#", "");
      const element = document.getElementById(targetId);

      if (element) {
        const headerHeight = 80;
        const elementPosition =
          element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        // Update active section after scroll
        setTimeout(() => {
          setActiveSection(targetId);
        }, 100);
      }
    };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-dark-bg/80 backdrop-blur-md border-b border-dark-border shadow-lg"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 md:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              {/* Logo Image - Replace with your actual logo */}
              {/* Option 1: Use an image file */}
              {/* <Image
                src="/logo.png"
                alt="Orizonix Logo"
                width={48}
                height={48}
                className="w-12 h-12 object-contain"
              /> */}

              {/* Option 2: Gradient placeholder (current) */}
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center shadow-lg shadow-neon-blue/30 relative overflow-hidden">
                <span className="text-2xl font-bold text-white relative z-10">
                  O
                </span>
                {/* Animated shimmer */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </div>
              {/* Animated glow effect */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-neon-blue to-neon-purple opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-300" />
            </motion.div>
            <span className="text-2xl font-bold gradient-text hidden sm:block">
              Orizonix
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const sectionId = link.href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick(link.href)}
                  className={`relative transition-colors duration-300 group cursor-pointer ${
                    isActive
                      ? "text-neon-blue"
                      : "text-gray-300 hover:text-neon-blue"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-neon-blue transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </a>
              );
            })}
            <motion.a
              href="https://wa.me/919898084143"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-neon-blue text-dark-bg font-semibold rounded-lg hover:bg-neon-cyan transition-colors duration-300"
            >
              Get Started
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-dark-surface border border-dark-border hover:border-neon-blue transition-colors"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center gap-1.5">
              <motion.span
                animate={
                  isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }
                }
                className="w-full h-0.5 bg-neon-blue rounded"
              />
              <motion.span
                animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-full h-0.5 bg-neon-blue rounded"
              />
              <motion.span
                animate={
                  isMobileMenuOpen
                    ? { rotate: -45, y: -8 }
                    : { rotate: 0, y: 0 }
                }
                className="w-full h-0.5 bg-neon-blue rounded"
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 overflow-hidden"
            >
              <div className="bg-dark-surface border border-dark-border rounded-lg p-4 space-y-3">
                {navLinks.map((link) => {
                  const sectionId = link.href.replace("#", "");
                  const isActive = activeSection === sectionId;
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={handleLinkClick(link.href)}
                      className={`block py-2 transition-colors duration-300 border-b border-dark-border last:border-0 cursor-pointer ${
                        isActive
                          ? "text-neon-blue font-semibold"
                          : "text-gray-300 hover:text-neon-blue"
                      }`}
                    >
                      {link.label}
                    </a>
                  );
                })}
                <motion.a
                  href="https://wa.me/919898084143"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-center py-3 bg-neon-blue text-dark-bg font-semibold rounded-lg hover:bg-neon-cyan transition-colors duration-300"
                >
                  Get Started
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
