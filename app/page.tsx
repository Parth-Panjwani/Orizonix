"use client";

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

export default function Home() {
  return (
    <main className="relative min-h-screen">
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
