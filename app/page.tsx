"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import BackgroundGrid from "@/components/BackgroundGrid";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Pricing from "@/components/Pricing";
import Features from "@/components/Features";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

// Lazy load heavy components
const LazyGSAP = dynamic(
  () =>
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([gsap, ScrollTrigger]) => {
        gsap.default.registerPlugin(ScrollTrigger.default);
        return { default: () => null };
      }
    ),
  { ssr: false }
);

export default function Home() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    // Lazy load GSAP only when needed
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([gsap, ScrollTrigger]) => {
        gsap.default.registerPlugin(ScrollTrigger.default);

        // Debounced scroll animations
        const sections = document.querySelectorAll("section");
        let ticking = false;

        const animateSections = () => {
          if (ticking) return;
          ticking = true;

          requestAnimationFrame(() => {
            sections.forEach((section) => {
              const rect = section.getBoundingClientRect();
              const isVisible =
                rect.top < window.innerHeight * 0.8 && rect.bottom > 0;

              if (isVisible && !section.classList.contains("animated")) {
                section.classList.add("animated");
                gsap.default.fromTo(
                  section,
                  { opacity: 0, y: 30 },
                  {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "power2.out",
                  }
                );
              }
            });

            ticking = false;
          });
        };

        // Initial check
        animateSections();

        // Throttled scroll listener
        let scrollTimeout: NodeJS.Timeout;
        const handleScroll = () => {
          if (scrollTimeout) return;
          scrollTimeout = setTimeout(() => {
            animateSections();
            scrollTimeout = null as any;
          }, 100);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
          window.removeEventListener("scroll", handleScroll);
          ScrollTrigger.default
            .getAll()
            .forEach((trigger: any) => trigger.kill());
        };
      }
    );
  }, []);

  return (
    <main className="relative">
      <BackgroundGrid />
      <Header />
      <Hero />
      <section id="services">
        <Services />
      </section>
      <section id="pricing">
        <Pricing />
      </section>
      <section id="features">
        <Features />
      </section>
      <Portfolio />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
