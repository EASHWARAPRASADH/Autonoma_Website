import React, { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What is a Business Operating System (BOS) and how is it different from ERP?",
      answer: "Traditional ERPs (Enterprise Resource Planning) act primarily as financial ledgers and stock-level counters—they track transaction history and state changes. A Business Operating System (BOS), specifically AUTONOMA, goes beyond records to govern actual daily factory operations. It coordinates shop-floor telemetry, quality checkpoints, RFID shifts, and visual AI tools in a single real-time loop, autonomously predicting errors before they register on your balance ledger."
    },
    {
      question: "Is AUTONOMA suitable for small and mid-size manufacturers (MSMEs)?",
      answer: "Absolutely. In fact, MSMEs stand to gain the most because they often suffer from fragmented spreadsheet management. AUTONOMA's modular, headless subscription architecture allows MSMEs to start small (e.g., implementing just the Digital QMS or Visual Parts Search) and scale up without the crushing upfront installation fees or specialized IT infrastructure required by legacy packages."
    },
    {
      question: "How does AI-powered predictive maintenance work?",
      answer: "AUTONOMA links with cost-effective, wireless IoT telemetry node clamps attached to critical gears, boilers, or motors. The AI builds a regular vibration, amperage, and thermal signature profile. When structural deviations register (even fractions of a mm/s above baseline), the system automatically schedules maintenance on supervisor tablets, re-optimizes the production layout to bypass the machine, and generates deviation compliance logs."
    },
    {
      question: "Does AUTONOMA support IATF 16949 and ISO 9001 compliance?",
      answer: "Yes, IATF 16949 and ISO 9001 are baked directly into the core workflows rather than treated as a separate data entry task. Quality deviations automatically spawn electronic 8D corrective actions, fishbone root-cause diagrams, and CAPA logs. Statistical Process Control (SPC) limits automatically plot from caliper readings, providing audit-ready digital dossiers in 2 days instead of 3 weeks."
    },
    {
      question: "How long does implementation typically take?",
      answer: "Because AUTONOMA runs on a modern, decoupled cloud framework, a basic implementation (General Ledger, Attendance, Catalog, and Digital QMS) can go live within 2 to 3 weeks. Adding physical IoT sensors or edge vision inspection rigs takes an additional 1 to 2 weeks of onsite calibration."
    },
    {
      question: "What makes AUTONOMA different from SAP or other global ERP systems?",
      answer: "Global ERP systems are built as 'one-size-fits-all' modules that require massive, million-dollar consultant teams and years of custom development to understand Indian manufacturing. AUTONOMA is built native for Indian shop floors, comes pre-configured with local regulatory rules (FSSAI, Indian Factories Act, PF/ESI calculations), and is mobile-first, so operators can log actions without needing desktop consoles."
    }
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-[#0A0C10] text-slate-200 relative border-b border-slate-800/85">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-blue-400 font-mono text-xs tracking-widest uppercase px-3 py-1 bg-blue-500/10 rounded-full border border-blue-500/20">
            COMMON QUESTIONS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-sans tracking-tight text-white mt-4">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto mt-3 text-sm">
            Everything you need to know about migrating your manufacturing plant to an autonomous Business OS.
          </p>
        </motion.div>

        {/* FAQ Accordions list */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4, delay: Math.min(index * 0.08, 0.4) }}
                className="bg-slate-900/40 rounded-2xl border border-slate-800 overflow-hidden transition-all duration-300 shadow-sm"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 hover:bg-slate-900/20 transition-colors cursor-pointer"
                >
                  <div className="flex items-start gap-3.5">
                    <HelpCircle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                    <span className="font-sans font-bold text-xs sm:text-sm tracking-wide text-slate-100">
                      {faq.question}
                    </span>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                  )}
                </button>

                {/* Animated Answer Body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden border-t border-slate-800/60"
                    >
                      <p className="p-5 font-mono text-[11px] sm:text-xs text-slate-400 leading-relaxed bg-slate-950/40">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
