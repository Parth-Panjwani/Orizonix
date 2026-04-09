"use client";

import { useState, useCallback } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhoWeAre from "@/components/WhoWeAre";
import Services from "@/components/Services";
import Process from "@/components/Process";
import CaseStudies from "@/components/CaseStudies";
import SocialProof from "@/components/SocialProof";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import CinematicLoader from "@/components/CinematicLoader";

export default function Home() {
  const [siteReady, setSiteReady] = useState(false);

  const handleLoaderComplete = useCallback(() => {
    setSiteReady(true);
  }, []);

  return (
    <>
      <CinematicLoader onComplete={handleLoaderComplete} />
      <main
        className="relative min-h-screen"
        style={{
          opacity: siteReady ? 1 : 0,
          transition: "opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <Header />
        <Hero />
        <div className="section-divider" />
        <WhoWeAre />
        <div className="section-divider" />
        <Services />
        <div className="section-divider" />
        <Process />
        <div className="section-divider" />
        <CaseStudies />
        <div className="section-divider" />
        <SocialProof />
        <div className="section-divider" />
        <Contact />
        <Footer />
        <FloatingWhatsApp />
      </main>
    </>
  );
}
