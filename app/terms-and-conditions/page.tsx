"use client";

import Link from "next/link";
import Image from "next/image";

export default function TermsAndConditionsPage() {
  const termsList = [
    "To access and use the Services, you agree to provide true, accurate and complete information to us during and after registration, and you shall be responsible for all acts done through the use of your registered account.",
    "Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials offered on this website or through the Services, for any specific purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.",
    "Your use of our Services and the website is solely at your own risk and discretion. You are required to independently assess and ensure that the Services meet your requirements.",
    "The contents of the Website and the Services are proprietary to Us and you will not have any authority to claim any intellectual property rights, title, or interest in its contents.",
    "You acknowledge that unauthorized use of the Website or the Services may lead to action against you as per these Terms or applicable laws.",
    "You agree to pay us the charges associated with availing the Services.",
    "You agree not to use the website and/ or Services for any purpose that is unlawful, illegal or forbidden by these Terms, or Indian or local laws that might apply to you.",
    "You agree and acknowledge that website and the Services may contain links to other third party websites. On accessing these links, you will be governed by the terms of use, privacy policy and such other policies of such third party websites.",
    "You understand that upon initiating a transaction for availing the Services you are entering into a legally binding and enforceable contract with us for the Services.",
    "You shall be entitled to claim a refund of the payment made by you in case we are not able to provide the Service. The timelines for such return and refund will be according to the specific Service you have availed or within the time period provided in our policies (as applicable). In case you do not raise a refund claim within the stipulated time, then this would make you ineligible for a refund.",
    "Notwithstanding anything contained in these Terms, the parties shall not be liable for any failure to perform an obligation under these Terms if performance is prevented or delayed by a force majeure event.",
    "These Terms and any dispute or claim relating to it, or its enforceability, shall be governed by and construed in accordance with the laws of India.",
    "All disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts in Rajkot, Gujarat.",
    "All concerns or communications relating to these Terms must be communicated to us using the contact information provided on this website."
  ];

  return (
    <div className="min-h-screen bg-[#070708] font-body relative overflow-hidden flex flex-col justify-between">
      {/* Dynamic Background Gradients */}
      <div 
        className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[150px] opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--gold-secondary) 0%, transparent 70%)" }}
      />
      <div 
        className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[150px] opacity-15 pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--gold-primary) 0%, transparent 70%)" }}
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
        <div className="w-full max-w-3xl">
          {/* Header Title */}
          <div className="text-center mb-10">
            <span className="section-label mb-3 inline-block">Legal Agreement</span>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-2">
              Terms & Conditions
            </h1>
            <p className="text-xs md:text-sm text-gold-400/80 font-mono tracking-wider">
              Last updated on 18-05-2026 01:07:27
            </p>
          </div>

          {/* Reading Card */}
          <div className="glass-card rounded-2xl border border-white/10 overflow-hidden shadow-2xl p-6 md:p-10 space-y-8 text-white/80 leading-relaxed text-sm md:text-[15px]">
            {/* Context Paragraphs */}
            <div className="space-y-4">
              <p>
                These Terms and Conditions, along with the privacy policy or other terms (
                <strong className="text-white">“Terms”</strong>) constitute a binding agreement by and between{" "}
                <strong className="text-gold-400">PARTH OMPRAKASH PANJWANI</strong> (
                <strong className="text-white">“Website Owner”</strong> or <strong className="text-white">“we”</strong>{" "}
                or <strong className="text-white">“us”</strong> or <strong className="text-white">“our”</strong>) and
                you (<strong className="text-white">“you”</strong> or <strong className="text-white">“your”</strong>)
                and relate to your use of our website, goods (as applicable) or services (as applicable) (collectively,{" "}
                <strong className="text-white">“Services”</strong>).
              </p>
              <p>
                By using our website and availing the Services, you agree that you have read and accepted these Terms
                (including the Privacy Policy). We reserve the right to modify these Terms at any time and without
                assigning any reason. It is your responsibility to periodically review these Terms to stay informed of
                updates.
              </p>
            </div>

            {/* List Header */}
            <div className="pt-4 border-t border-white/5">
              <h3 className="text-base font-heading font-semibold text-white mb-6 uppercase tracking-wider">
                Terms of Use
              </h3>
              
              {/* Bullet list styled premiumly */}
              <ol className="space-y-5 list-none">
                {termsList.map((term, index) => (
                  <li key={index} className="flex gap-4 items-start">
                    <span className="w-6 h-6 rounded-md bg-gold-400/10 flex items-center justify-center text-[11px] font-bold text-gold-400 shrink-0 border border-gold-400/20 mt-0.5">
                      {index + 1}
                    </span>
                    <p className="text-white/70 group-hover:text-white/95 transition-colors">
                      {term}
                    </p>
                  </li>
                ))}
              </ol>
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
