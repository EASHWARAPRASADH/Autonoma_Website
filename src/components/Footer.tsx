import React, { useState, useEffect } from "react";
import { Mail, Globe, MessageSquare, ArrowUp, Send, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface FooterProps {
  onScrollTo: (sectionId: string) => void;
}

export default function Footer({ onScrollTo }: FooterProps) {
  const [whatsappOpen, setWhatsappOpen] = useState(false);
  const [whatsappMsg, setWhatsappMsg] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 450) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const [sent, setSent] = useState(false);

  const handleSendWhatsapp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!whatsappMsg) return;
    
    // Simulate WhatsApp redirect link or message sending state!
    setSent(true);
    setTimeout(() => {
      window.open(`https://wa.me/919876543210?text=${encodeURIComponent(whatsappMsg)}`, "_blank");
      setWhatsappOpen(false);
      setSent(false);
      setWhatsappMsg("");
    }, 1500);
  };

  return (
    <footer className="bg-[#0A0C10] border-t border-slate-800/80 py-16 text-slate-400 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="font-sans font-bold text-white tracking-tight text-lg">
              Nutech Autonoma Systems
            </div>
            <p className="text-xs font-mono text-slate-500 max-w-sm leading-relaxed">
              Decoupled, high-speed 'Headless' Business Operating System built specifically for modern Indian workshops.
            </p>
            <div className="flex flex-col gap-2 font-mono text-[11px] text-slate-400">
              <span className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                info@autonomasys.com
              </span>
              <span className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-slate-500" />
                www.autonomasys.com
              </span>
            </div>
          </div>

          {/* Links Col */}
          <div className="md:col-span-3 space-y-4 font-mono text-xs">
            <h4 className="text-[10px] text-slate-600 uppercase tracking-widest font-bold">RESOURCES</h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => onScrollTo("platform")} className="hover:text-blue-400 transition-colors cursor-pointer">
                  BOS Platform
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo("features")} className="hover:text-blue-400 transition-colors cursor-pointer">
                  76 Features Map
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo("why-us")} className="hover:text-blue-400 transition-colors cursor-pointer">
                  Enterprise Audit
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo("faq")} className="hover:text-blue-400 transition-colors cursor-pointer">
                  Common FAQs
                </button>
              </li>
            </ul>
          </div>

          {/* Meta Slogan Col */}
          <div className="md:col-span-4 space-y-4 font-mono text-xs">
            <h4 className="text-[10px] text-slate-600 uppercase tracking-widest font-bold">LOCATIONS & SECTORS</h4>
            <p className="text-[10px] text-slate-500 leading-relaxed">
              Serving industrial workshops across Pune, Coimbatore, Chennai, Bangalore, and Gurgaon. Supporting ISO 9001, IATF 16949, and OHSMS 45001 compliance criteria.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="text-[9px] bg-slate-900/60 px-2.5 py-1 rounded-lg border border-slate-800 text-slate-400">MANUFACTURING ERP INDIA</span>
              <span className="text-[9px] bg-slate-900/60 px-2.5 py-1 rounded-lg border border-slate-800 text-slate-400">AI BOS</span>
              <span className="text-[9px] bg-slate-900/60 px-2.5 py-1 rounded-lg border border-slate-800 text-slate-400">INDUSTRY 4.0</span>
            </div>
          </div>

        </div>

        {/* Footer Bottom copyright */}
        <div className="border-t border-slate-800/80 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono text-slate-600">
          <div>
            © 2026 Nutech Autonoma Systems Pvt Ltd. All rights reserved.
          </div>
          
          {/* Scroll to top button */}
          <button
            onClick={() => onScrollTo("hero")}
            className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Floating interactive widgets */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 items-end">
        
        {/* Back to Top Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.6, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.6, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="bg-slate-900/90 hover:bg-slate-850 text-slate-300 hover:text-blue-400 p-3.5 rounded-full border border-slate-800 hover:border-blue-500/30 shadow-2xl transition-all cursor-pointer flex items-center justify-center group"
              title="Scroll to Top"
              aria-label="Back to Top"
            >
              <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* WhatsApp Chat Launcher */}
        <div className="relative">
          {whatsappOpen && (
            <div className="absolute bottom-16 right-0 w-72 bg-[#0F1219]/95 backdrop-blur-md rounded-3xl border border-slate-800 p-5 shadow-2xl space-y-3 font-mono text-xs text-white">
              <div className="flex justify-between items-center border-b border-slate-850 pb-2">
                <span className="font-bold text-[10px] uppercase text-emerald-400">💬 Chat on WhatsApp</span>
                <button onClick={() => setWhatsappOpen(false)} className="text-slate-500 hover:text-white">✕</button>
              </div>
              
              {sent ? (
                <div className="text-center py-4 text-emerald-400 font-semibold flex flex-col items-center gap-2">
                  <CheckCircle className="w-8 h-8 animate-bounce" />
                  Redirecting to WhatsApp...
                </div>
              ) : (
                <form onSubmit={handleSendWhatsapp} className="space-y-2.5">
                  <p className="text-[10px] text-slate-400 leading-relaxed">
                    Have any quick questions? Message Rajesh, our Technical Director:
                  </p>
                  <textarea
                    required
                    value={whatsappMsg}
                    onChange={(e) => setWhatsappMsg(e.target.value)}
                    placeholder="Describe your factory and challenge..."
                    rows={3}
                    className="w-full bg-slate-950 rounded-xl border border-slate-850 p-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/50"
                  />
                  <button
                    type="submit"
                    className="w-full bg-emerald-500 text-slate-950 font-bold py-2 rounded-xl text-center flex items-center justify-center gap-1.5 hover:bg-emerald-400 transition-colors"
                  >
                    <span>Send WhatsApp Msg</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          )}

          <button
            onClick={() => setWhatsappOpen(!whatsappOpen)}
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono text-xs font-bold px-4 py-3 rounded-full flex items-center gap-2 shadow-2xl shadow-emerald-500/20 hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>WhatsApp Us</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
