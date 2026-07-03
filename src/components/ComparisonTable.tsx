import React from "react";
import { Check, X, ShieldAlert, Sparkles, Scale } from "lucide-react";
import { motion } from "motion/react";

export default function ComparisonTable() {
  const comparisonRows = [
    {
      capability: "AI Visual Inventory Search",
      autonoma: "✔ Photo-to-part instant lookup & stock count",
      legacy: "✘ Manual part code entry or manual record catalog search",
      highlight: true
    },
    {
      capability: "Predictive Maintenance (IoT)",
      autonoma: "✔ Live sensor-driven thermal & vibration alerts",
      legacy: "✘ Reactive breakdown maintenance tracking only",
      highlight: false
    },
    {
      capability: "IATF 16949 / ISO 9001 Built-in",
      autonoma: "✔ Native electronic PPAP, APQP, PFMEA, and SPC plots",
      legacy: "✘ Requires costly manual third-party software plug-ins",
      highlight: true
    },
    {
      capability: "Zero-Touch Quality Inspection",
      autonoma: "✔ Integrated AI defect conveyor cameras & digital calipers",
      legacy: "✘ Manual checklist logs or delayed paper data entries",
      highlight: false
    },
    {
      capability: "OCR Invoice Processing",
      autonoma: "✔ 99%+ automatic accuracy, processed in seconds",
      legacy: "✘ Manual accountant data entry or costly middleware",
      highlight: false
    },
    {
      capability: "Statutory Compliance Auto-Tracker",
      autonoma: "✔ Automated alerts & triggers before license due dates",
      legacy: "✘ Static manual calendar entries and reminders only",
      highlight: false
    },
    {
      capability: "RFID One-Card Facility",
      autonoma: "✔ Unified Attendance, Canteen counts, and Gate access",
      legacy: "✘ Separate siloed software servers with manual tallying",
      highlight: true
    },
    {
      capability: "Mobile-Ready Headless Architecture",
      autonoma: "✔ React.js PWA, sub-second latency, server decoupled",
      legacy: "✘ Slow, legacy desktop-bound client-server architectures",
      highlight: false
    }
  ];

  return (
    <section id="why-us" className="py-24 bg-[#0A0C10] text-slate-200 relative">
      <div className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full bg-blue-600/5 blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-blue-400 font-mono text-xs tracking-widest uppercase px-3 py-1 bg-blue-500/10 rounded-full border border-blue-500/20">
            AUTONOMA VS THE REST
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-sans tracking-tight text-white mt-4">
            INTELLIGENCE, NOT JUST INVENTORY
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto mt-3 text-sm sm:text-base">
            Most Business Operating Systems just count cash and inventory. AUTONOMA governs the entire Enterprise — from Strategic board dashboards to shop-floor sensors.
          </p>
        </motion.div>

        {/* Comparison Table Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-slate-900/40 backdrop-blur-md rounded-3xl border border-slate-800 shadow-2xl overflow-hidden"
        >
          <div className="p-6 bg-slate-950 border-b border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-blue-500" />
              <span className="font-sans font-bold text-sm tracking-wide text-white">Enterprise Feature Audit Matrix</span>
            </div>
            <span className="text-[10px] font-mono text-slate-500 hidden sm:inline">UPDATED FOR 2025 COMPLIANCE</span>
          </div>

          {/* Desktop view: Traditional comparison table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-slate-950/50 text-[10px] font-mono uppercase tracking-wider text-slate-400 border-b border-slate-800">
                  <th className="py-4.5 px-6 font-semibold">CAPABILITY DESCRIPTION</th>
                  <th className="py-4.5 px-6 font-semibold bg-blue-950/25 text-blue-400 border-x border-slate-800/80">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                      AUTONOMA BOS
                    </span>
                  </th>
                  <th className="py-4.5 px-6 font-semibold">LEGACY ERP (SAP / TALLY)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-[11px] sm:text-xs">
                {comparisonRows.map((row, index) => (
                  <tr 
                    key={index} 
                    className={`hover:bg-slate-950/30 transition-colors ${
                      row.highlight ? "bg-slate-900/40" : ""
                    }`}
                  >
                    {/* Capability Name */}
                    <td className="py-4 px-6 font-medium text-slate-300 font-sans text-xs">
                      {row.capability}
                      {row.highlight && (
                        <span className="ml-2 text-[8px] uppercase tracking-wide bg-blue-500/15 text-blue-400 border border-blue-500/20 px-1.5 py-0.5 rounded">
                          Game-Changer
                        </span>
                      )}
                    </td>

                    {/* Autonoma Feature */}
                    <td className="py-4 px-6 bg-blue-950/10 text-slate-200 border-x border-slate-800/80 font-semibold leading-relaxed">
                      <span className="text-emerald-400 mr-2">✔</span>
                      {row.autonoma.replace("✔ ", "")}
                    </td>

                    {/* Legacy ERP Feature */}
                    <td className="py-4 px-6 text-slate-400 leading-relaxed">
                      <span className="text-red-500/80 mr-2">✘</span>
                      {row.legacy.replace("✘ ", "")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile view: Stacked card-based tactile comparison system */}
          <div className="block md:hidden divide-y divide-slate-850">
            {comparisonRows.map((row, index) => (
              <div 
                key={index} 
                className={`p-5 transition-all duration-300 ${
                  row.highlight ? "bg-slate-950/60" : "bg-transparent"
                }`}
              >
                {/* Capability Title */}
                <div className="flex items-start justify-between gap-2 mb-3.5">
                  <span className="text-xs font-bold font-sans text-slate-100 flex-1 leading-tight">
                    {row.capability}
                  </span>
                  {row.highlight && (
                    <span className="text-[8px] uppercase tracking-wider font-mono bg-blue-500/15 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded shrink-0">
                      Game-Changer
                    </span>
                  )}
                </div>

                {/* Grid Comparison */}
                <div className="grid grid-cols-1 gap-2.5">
                  {/* Autonoma BOS */}
                  <div className="bg-blue-950/10 border border-blue-900/30 p-3 rounded-xl flex items-start gap-2.5">
                    <span className="text-emerald-400 text-xs shrink-0 mt-0.5">✔</span>
                    <div>
                      <span className="text-[9px] font-mono text-blue-400 font-bold tracking-wider block mb-0.5">AUTONOMA BOS</span>
                      <span className="text-xs font-mono text-slate-200 leading-relaxed block">
                        {row.autonoma.replace("✔ ", "")}
                      </span>
                    </div>
                  </div>

                  {/* Legacy ERP */}
                  <div className="bg-slate-950/40 border border-slate-850 p-3 rounded-xl flex items-start gap-2.5">
                    <span className="text-red-500/80 text-xs shrink-0 mt-0.5">✘</span>
                    <div>
                      <span className="text-[9px] font-mono text-slate-500 font-bold tracking-wider block mb-0.5">LEGACY SYSTEM</span>
                      <span className="text-xs font-mono text-slate-400 leading-relaxed block">
                        {row.legacy.replace("✘ ", "")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-5 bg-slate-950/50 border-t border-slate-800/60 flex flex-col sm:flex-row justify-between items-center gap-3 text-[10px] font-mono text-slate-500">
            <span className="flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-blue-400 shrink-0" />
              Results validated from actual customer migrations across Pune, Chennai, and Coimbatore workshops.
            </span>
            <span>AUTONOMA V2.4 PLATFORM</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
