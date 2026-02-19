"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import AuthorityStatement from "@/components/AuthorityStatement";
import Process from "@/components/Process";
import Services from "@/components/Services";
import CaseStudies from "@/components/CaseStudies";
import SocialProof from "@/components/SocialProof";
import Pricing from "@/components/Pricing";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Header />
      <Hero />
      <Problem />
      <AuthorityStatement />
      <Process />
      <Services />
      <CaseStudies />
      <SocialProof />
      <Pricing />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
