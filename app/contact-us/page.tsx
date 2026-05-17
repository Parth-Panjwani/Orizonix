"use client";

import Link from "next/link";
import Image from "next/image";

export default function ContactUsPage() {
  const contactDetails = [
    {
      label: "Merchant Legal Entity",
      value: "PARTH OMPRAKASH PANJWANI",
      description: "Auravis agency operates under this registered business name.",
      icon: (
        <svg className="w-5 h-5 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      label: "Registered Address",
      value: "Rajkot, Rajkot, Gujarat, PIN: 360001",
      description: "Official corporate address registered in India.",
      icon: (
        <svg className="w-5 h-5 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      label: "Operational Address",
      value: "Rajkot, Rajkot, Gujarat, PIN: 360001",
      description: "HQ where our growth strategies and web builds are engineered.",
      icon: (
        <svg className="w-5 h-5 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      label: "Telephone Number",
      value: "+91 7817884143",
      href: "tel:+917817884143",
      description: "Available for corporate calls and client relations.",
      icon: (
        <svg className="w-5 h-5 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
    },
    {
      label: "E-Mail ID",
      value: "parthpanjwani9@gmail.com",
      href: "mailto:parthpanjwani9@gmail.com",
      description: "Write to us for any official or business inquiries.",
      icon: (
        <svg className="w-5 h-5 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#070708] font-body relative overflow-hidden flex flex-col justify-between">
      {/* Dynamic Background Gradients */}
      <div 
        className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[150px] opacity-15 pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--gold-primary) 0%, transparent 70%)" }}
      />
      <div 
        className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[150px] opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--gold-secondary) 0%, transparent 70%)" }}
      />

      {/* Navigation Header */}
      <header className="w-full z-50 py-5 px-4 md:px-8 glass-strong border-b border-white/5 shrink-0">
        <div className="container mx-auto max-w-5xl flex items-center justify-between">
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
            <span className="text-2xl font-brand tracking-tight leading-none text-white relative -top-[-2px]">
              Auravis
            </span>
          </Link>

          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs md:text-sm font-semibold text-white/70 hover:text-gold-400 transition-colors border border-white/10 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center py-16 px-4 md:px-8 z-10">
        <div className="w-full max-w-2xl">
          {/* Section title */}
          <div className="text-center mb-10">
            <span className="section-label mb-3 inline-block">Official Contact</span>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-2">
              Contact Us
            </h1>
            <p className="text-sm md:text-base text-white/60 max-w-md mx-auto">
              Official registration and operations information for Auravis under Praxion Technologies.
            </p>
          </div>

          {/* Cards Stack */}
          <div className="glass-card rounded-2xl border border-white/10 overflow-hidden shadow-2xl p-6 md:p-8 space-y-6">
            <div className="divide-y divide-white/5">
              {contactDetails.map((detail, index) => (
                <div 
                  key={index} 
                  className={`py-5 flex flex-col sm:flex-row sm:items-start gap-4 transition-all group ${
                    index === 0 ? "pt-0" : ""
                  } ${index === contactDetails.length - 1 ? "pb-0" : ""}`}
                >
                  <div className="w-10 h-10 rounded-xl bg-gold-400/10 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform">
                    {detail.icon}
                  </div>
                  <div className="flex-grow space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-gold-400/80 block">
                      {detail.label}
                    </span>
                    {detail.href ? (
                      <a 
                        href={detail.href} 
                        className="text-base md:text-lg font-heading font-medium text-white hover:text-gold-400 hover:underline transition-colors break-all"
                      >
                        {detail.value}
                      </a>
                    ) : (
                      <p className="text-base md:text-lg font-heading font-medium text-white break-words">
                        {detail.value}
                      </p>
                    )}
                    <p className="text-xs text-white/50">
                      {detail.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 border-t border-white/5 text-center shrink-0 bg-[#040405] z-10">
        <div className="container mx-auto px-4">
          <p className="text-[12px] text-white/40">
            © {new Date().getFullYear()} Auravis. All rights reserved.
          </p>
          <p className="text-[11px] text-white/30 mt-1">
            Auravis is a premium creative-tech growth agency by <span className="text-gold-400 font-medium">Praxion Technologies</span>, under which it operates.
          </p>
        </div>
      </footer>
    </div>
  );
}
