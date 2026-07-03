import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Eye, Cpu, Award, ShieldAlert, Users, 
  ChevronRight, Sparkles, Check, ListFilter, HelpCircle
} from "lucide-react";

export default function FeaturesGrid() {
  const [activeDimension, setActiveDimension] = useState<number>(0);
  const [activeFeatureCategory, setActiveFeatureCategory] = useState<string>("QMS");

  const dimensions = [
    {
      id: "01",
      icon: Eye,
      title: "OMNI-VISUAL AI & SMART SEARCH",
      desc: "Eliminate \"I don't know the part number.\" Photograph a broken component — AI retrieves its stock level and warehouse location instantly.",
      subfeatures: [
        "Visual Inventory via mobile camera scanning",
        "AI-Powered invoice and receipt OCR with 99%+ accuracy",
        "M365-Style global parametric catalog search",
        "Context-aware invoice data extraction"
      ],
      tags: ["COMPUTER VISION", "OCR", "AI SEARCH"],
      color: "from-orange-500 to-amber-500"
    },
    {
      id: "02",
      icon: Cpu,
      title: "INTELLIGENT PRODUCTION & IOT",
      desc: "Connect directly to your factory floor. From AI-driven production planning to predictive maintenance powered by live sensor data.",
      subfeatures: [
        "AI-Driven PPC with automatic load-optimization",
        "Predictive maintenance via real-time vibration & thermal IoT sensors",
        "Zero-touch quality inspection cameras integrated into conveyors",
        "Automated deviation workflow routing and logs"
      ],
      tags: ["IOT", "PPC", "PREDICTIVE AI"],
      color: "from-blue-500 to-indigo-500"
    },
    {
      id: "03",
      icon: Award,
      title: "WORLD-CLASS QMS & NPD",
      desc: "ISO 9001 and IATF 16949 compliance built directly into your workflows — replacing disconnected Excel sheets forever.",
      subfeatures: [
        "Interactive 8D Reports, Fishbone, and Why-Why Analysis diagrams",
        "Live PPAP, APQP, DFMEA/PFMEA templates",
        "Integrated SPC control charting and MSA reports",
        "CAPA logs and 7 QC Tools natively supported"
      ],
      tags: ["ISO 9001", "IATF 16949", "FMEA"],
      color: "from-emerald-500 to-teal-500"
    },
    {
      id: "04",
      icon: ShieldAlert,
      title: "GOVERNANCE, SAFETY & COMPLIANCE",
      desc: "Manage your people's safety and legal obligations autonomously — from factory license renewals to environmental waste disposal.",
      subfeatures: [
        "Statutory compliance auto-tracker with renewal alerts",
        "OHSMS & EMS dashboards (HIRA tracking and risk sheets)",
        "Zero-Trust infrastructure: MFA, RBAC, JWT security logs",
        "Fire safety, FSSAI, and Factory Inspector criteria compliance trackers"
      ],
      tags: ["EMS", "OHSMS", "ZERO-TRUST"],
      color: "from-red-500 to-rose-500"
    },
    {
      id: "05",
      icon: Users,
      title: "SMART HRMS & ONE-CARD FACILITY",
      desc: "A single RFID smart card controls attendance, facility access, and canteen — zero waste, zero friction.",
      subfeatures: [
        "AI task delegation: 1 HOD → 100 employees workload distributor",
        "Walk-through RFID gate auto-attendance scanner logs",
        "Automated canteen food-count forecasting based on real-time swipes",
        "Canteen meal billing linked directly with payroll systems"
      ],
      tags: ["RFID", "HRMS", "FACILITY AI"],
      color: "from-purple-500 to-fuchsia-500"
    }
  ];

  const platformFeatureCategories = [
    {
      id: "QMS",
      title: "Quality Management (QMS)",
      features: [
        "ISO 9001 Digital Certification Workspace",
        "IATF 16949 Compliant PPAP Document Creator",
        "FMEA Risk Matrix & Dynamic Scoring Sheet",
        "SPC Control Charts with auto-triggering limits",
        "8D Corrective Action Form & Fishbone Generator",
        "Calibration Logs with wireless instrument support",
        "Non-Conformance Report (NCR) dispatch routing",
        "Incoming material inspection quality gates"
      ]
    },
    {
      id: "IoT",
      title: "Production & IoT Gateways",
      features: [
        "Vibration sensor frequency telemetry hub",
        "Temperature core anomaly flag system",
        "Dynamic Production Planning & Control (PPC)",
        "Overall Equipment Effectiveness (OEE) calculators",
        "Standby machine auto-rescheduling load maps",
        "Factory-floor active mimic panel screens",
        "Production shift scheduler & actuals logger",
        "Material wastage telemetry tracking gauges"
      ]
    },
    {
      id: "Inventory",
      title: "Inventory & Visual AI",
      features: [
        "Mobile component photo stock detector",
        "Receipt and supplier invoice OCR extractor",
        "Bin tracking with RFID layout maps",
        "Automated purchase requisition constructor",
        "Multi-warehouse storage sync pipeline",
        "Gatepass generation (RGP / NRGP) with logs",
        "Batch/Lot traceability search queries",
        "Live stock reconciliation audit forms"
      ]
    },
    {
      id: "HRMS",
      title: "HRMS & Facility Loop",
      features: [
        "Unified RFID employee access log",
        "Payroll dynamic timesheets tracking RFID taps",
        "AI Workload planner (Task delegation matrix)",
        "Canteen inventory food count synchronizer",
        "Shift roster auto-compiler with criteria tags",
        "Employee health checks compliance log",
        "Visitor entry authentication gate keys",
        "Sub-contractor attendance ledger"
      ]
    }
  ];

  const activeCategoryData = platformFeatureCategories.find(c => c.id === activeFeatureCategory) || platformFeatureCategories[0];

  return (
    <section id="features" className="py-24 bg-[#0A0C10] text-slate-200 border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Five Dimensions Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-blue-400 font-mono text-xs tracking-widest uppercase px-3 py-1 bg-blue-500/10 rounded-full border border-blue-500/20">
            CORE INNOVATION PILLARS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-sans tracking-tight text-white mt-4">
            FIVE DIMENSIONS OF AUTONOMOUS CONTROL
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto mt-3 text-sm sm:text-base">
            From shop-floor IoT sensors to boardroom dashboards — AUTONOMA sees and governs every layer of your manufacturing enterprise.
          </p>
        </motion.div>

        {/* Tabbed Interactive Dimension Display */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-24"
        >
          
          {/* Dimension Selector Buttons */}
          <div className="lg:col-span-5 flex flex-row overflow-x-auto gap-3.5 pb-4 snap-x snap-mandatory lg:flex-col lg:overflow-x-visible lg:pb-0 lg:snap-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {dimensions.map((dim, index) => {
              const Icon = dim.icon;
              return (
                <button
                  key={dim.id}
                  id={`features-dim-${dim.id}`}
                  data-active={activeDimension === index}
                  onClick={() => setActiveDimension(index)}
                  style={{ backgroundColor: index === 0 ? "#000000" : undefined }}
                  className={`features-dim-btn features-dim-btn-${dim.id} p-4.5 rounded-2xl border text-left flex items-center gap-4 transition-all duration-300 cursor-pointer w-[280px] sm:w-[320px] shrink-0 snap-center lg:w-full lg:shrink-0 ${
                    index === 0
                      ? activeDimension === index
                        ? "bg-black border-blue-500 shadow-xl ring-2 ring-blue-500/10"
                        : "bg-black border-slate-800/60 hover:border-slate-700 opacity-70"
                      : activeDimension === index
                        ? "bg-slate-900/80 border-blue-500 shadow-xl ring-2 ring-blue-500/10"
                        : "bg-slate-950 border-slate-800/60 hover:border-slate-700 opacity-70"
                  }`}
                >
                  <div className={`p-2 rounded-lg bg-slate-900 border border-slate-800 text-blue-400 ${activeDimension === index ? "ring-2 ring-blue-500/20" : ""}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] font-mono text-slate-500 tracking-wider">DIMENSION {dim.id}</div>
                    <div className="text-xs font-bold font-sans tracking-wide text-white mt-0.5">{dim.title}</div>
                  </div>
                  <ChevronRight className={`w-4 h-4 text-slate-600 transition-transform duration-300 ${activeDimension === index ? "translate-x-1 text-blue-400" : ""}`} />
                </button>
              );
            })}
          </div>

          {/* Selected Dimension Detail Card */}
          <div className="lg:col-span-7 bg-slate-900/40 backdrop-blur-md rounded-3xl border border-slate-800 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-2xl">
            {/* Ambient light gradient glow */}
            <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full bg-gradient-to-br ${dimensions[activeDimension].color} opacity-10 blur-3xl`} />

            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-xs text-blue-400 font-bold px-2.5 py-1 bg-blue-500/10 rounded border border-blue-500/20">
                  DIMENSION {dimensions[activeDimension].id}
                </span>
                <div className="flex gap-2">
                  {dimensions[activeDimension].tags.map((tag, i) => (
                    <span key={i} className="text-[8px] font-mono text-slate-400 bg-slate-950 px-2 py-1 rounded border border-slate-800/80">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold font-sans text-white mb-4">
                {dimensions[activeDimension].title}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                {dimensions[activeDimension].desc}
              </p>

              {/* Subfeatures list */}
              <div className="space-y-3">
                <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-2">SYSTEM PARAMETERS</p>
                {dimensions[activeDimension].subfeatures.map((sf, index) => (
                  <div key={index} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                    <div className="p-0.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400 mt-0.5">
                      <Check className="w-3 h-3" />
                    </div>
                    <span>{sf}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800 flex justify-between items-center text-xs font-mono text-slate-500">
              <span>Status: INTEGRATED IN CORE BOS</span>
              <span className="flex items-center gap-1.5 text-blue-400">
                <Sparkles className="w-3.5 h-3.5" />
                Active AI Automation
              </span>
            </div>
          </div>

        </motion.div>

        {/* 76 Platform Features Explorer */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-slate-900/30 backdrop-blur-md rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-inner mt-16"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20 mb-2">
                <span>76+ PLATFORM CAPABILITIES</span>
              </div>
              <h3 className="text-xl font-bold font-sans text-white">Next-Gen Platform Features</h3>
              <p className="text-xs text-slate-400 mt-1">Explore some of the modular, pre-configured features built into Nutech Autonoma.</p>
            </div>

            {/* Feature selector categories tabs */}
            <div className="flex overflow-x-auto gap-2 pb-1.5 w-full md:w-auto md:flex-wrap md:overflow-visible md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {platformFeatureCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveFeatureCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full border font-mono text-[10px] sm:text-xs transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    activeFeatureCategory === cat.id
                      ? "bg-blue-600 border-blue-500 text-white font-bold"
                      : "bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-400"
                  }`}
                >
                  {cat.id}
                </button>
              ))}
            </div>
          </div>

          {/* Features Badges Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {activeCategoryData.features.map((feat, index) => (
              <div 
                key={index} 
                className="p-3 bg-slate-950 rounded-xl border border-slate-850 hover:border-slate-800 transition-colors duration-200 flex items-start gap-2.5"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-1.5" />
                <span className="text-xs text-slate-300 font-mono tracking-wide leading-tight">{feat}</span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
