"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import WhoWeAre from "@/components/WhoWeAre";
import Services from "@/components/Services";
import Process from "@/components/Process";
import CaseStudies from "@/components/CaseStudies";
import SocialProof from "@/components/SocialProof";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Header />
      <Hero />
      <Intro />
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
  );
}
