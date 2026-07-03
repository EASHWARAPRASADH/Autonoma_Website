import React, { useState } from "react";
import { 
  Send, Sparkles, Building2, User, Phone, Mail, Award, 
  Settings, Loader2, ArrowRight, ShieldCheck, CheckCircle2, Calendar, LayoutGrid, Scale, Play, Flame
} from "lucide-react";
import { motion } from "motion/react";
import { ConsultationResponse } from "../types";

export default function LeadCaptureForm() {
  // Form fields state
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    phone: "",
    email: "",
    industry: "AUTOMOTIVE",
    challenge: ""
  });

  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<ConsultationResponse | null>(null);
  const [demoConfirmed, setDemoConfirmed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const industries = [
    "AUTOMOTIVE",
    "PHARMA",
    "MSME",
    "AEROSPACE",
    "ELECTRONICS",
    "FOOD & BEVERAGE",
    "INDUSTRIAL EQUIPMENT"
  ];

  const presetChallenges = [
    "Still using Excel for QMS & compliance logs",
    "Still chasing part numbers manually in storerooms",
    "Still reacting to machine failures (no predictive maintenance)",
    "Still filing ISO 9001 compliance paperwork manually",
    "High product scrap/rejection rates in production"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const selectPresetChallenge = (challenge: string) => {
    setFormData((prev) => ({ ...prev, challenge }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.companyName || !formData.phone || !formData.email || !formData.challenge) {
      setError("Please fill out all required fields to generate your strategic report.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/virtual-manager", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          factoryName: formData.companyName,
          industry: formData.industry,
          challenge: formData.challenge
        })
      });

      if (!response.ok) {
        throw new Error("Failed to generate strategic blueprint.");
      }

      const data: ConsultationResponse = await response.json();
      setReport(data);
    } catch (err: any) {
      console.error(err);
      setError("Unable to contact the AI consultation server. Please check your network and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmDemo = () => {
    setDemoConfirmed(true);
  };

  const handleReset = () => {
    setReport(null);
    setDemoConfirmed(false);
    setFormData({
      name: "",
      companyName: "",
      phone: "",
      email: "",
      industry: "AUTOMOTIVE",
      challenge: ""
    });
  };

  return (
    <section id="demo-form" className="py-24 bg-[#0A0C10] text-slate-200 relative">
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-blue-400 font-mono text-xs tracking-widest uppercase px-3 py-1 bg-blue-500/10 rounded-full border border-blue-500/20">
            GET STARTED TODAY
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-sans tracking-tight text-white mt-4">
            READY TO TRANSFORM YOUR FACTORY?
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto mt-3 text-sm sm:text-base">
            Book a free live demo and watch Autonoma's AI instantly analyze your specific operational challenge below.
          </p>
        </motion.div>

        {/* Loading Screen */}
        {loading && (
          <div className="bg-slate-900/40 backdrop-blur-md rounded-3xl border border-slate-800 p-8 sm:p-16 flex flex-col justify-center items-center min-h-[500px] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-slate-900 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 w-1/3 rounded animate-infinite-loading" />
            </div>
            <Loader2 className="w-12 h-12 text-blue-400 animate-spin mb-6" />
            <h3 className="text-lg font-bold font-sans text-slate-100">AI Director Consult Initializing</h3>
            <p className="text-xs text-slate-500 font-mono mt-2 tracking-widest uppercase animate-pulse">
              Mapping SWOT Matrix & recommending autonomous features...
            </p>
            <div className="mt-8 space-y-2 max-w-xs text-center">
              <div className="text-[10px] font-mono text-slate-500">✔ Sector: {formData.industry}</div>
              <div className="text-[10px] font-mono text-slate-500">✔ Factory: {formData.companyName}</div>
              <div className="text-[10px] font-mono text-slate-500">✔ Compliance target: ISO 9001/IATF 16949</div>
            </div>
          </div>
        )}

        {/* Strategic SWOT & Consult Report */}
        {!loading && report && (
          <div className="bg-slate-900/40 backdrop-blur-md rounded-3xl border border-slate-800 p-6 sm:p-10 shadow-2xl space-y-10 relative">
            
            {/* Header Banner */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-slate-800 pb-8">
              <div>
                <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 uppercase tracking-widest">
                  ★ AI Strategic Consultation Blueprint
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold font-sans text-white mt-3">
                  AUTONOMA OPERATIONAL ASSESSMENT
                </h3>
                <p className="text-xs text-slate-500 font-mono mt-1">
                  PREPARED FOR: <span className="text-blue-400 font-semibold">{report.factoryName.toUpperCase()}</span> · SECTOR: {report.industry}
                </p>
              </div>

              {!demoConfirmed ? (
                <button
                  onClick={handleConfirmDemo}
                  className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono text-xs font-bold px-5 py-3 rounded-xl tracking-wider transition-all shadow-lg shadow-emerald-500/10 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  CONFIRM METING WITH AN ENGINEER
                </button>
              ) : (
                <div className="bg-emerald-500/10 border border-emerald-500/20 px-4 py-3 rounded-xl flex items-center gap-2.5 text-xs font-semibold text-emerald-400 font-mono">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  Meeting Request Received. WhatsApp/Email sent!
                </div>
              )}
            </div>

            {/* Analysis Summary */}
            <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-800/80">
              <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-2">Executive Summary</h4>
              <p className="text-xs sm:text-sm font-sans text-slate-200 leading-relaxed">
                {report.analysisSummary}
              </p>
            </div>

            {/* SWOT Matrix Grid */}
            <div>
              <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-4">Strategic SWOT Matrix</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Strengths */}
                <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 border-l-4 border-l-emerald-500">
                  <span className="text-emerald-400 font-bold text-xs font-mono block mb-2 uppercase tracking-wide">
                    S · Strengths (Legacy Assets)
                  </span>
                  <ul className="space-y-2 font-mono text-[10px] sm:text-xs text-slate-400">
                    {report.swot.strengths.map((st, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-400 mt-0.5">•</span>
                        <span>{st}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Weaknesses */}
                <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 border-l-4 border-l-red-500">
                  <span className="text-red-400 font-bold text-xs font-mono block mb-2 uppercase tracking-wide">
                    W · Weaknesses (Current Bottlenecks)
                  </span>
                  <ul className="space-y-2 font-mono text-[10px] sm:text-xs text-slate-400">
                    {report.swot.weaknesses.map((wk, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-red-400 mt-0.5">•</span>
                        <span>{wk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Opportunities */}
                <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 border-l-4 border-l-blue-500">
                  <span className="text-blue-400 font-bold text-xs font-mono block mb-2 uppercase tracking-wide">
                    O · Opportunities (Industry 4.0 Integrations)
                  </span>
                  <ul className="space-y-2 font-mono text-[10px] sm:text-xs text-slate-400">
                    {report.swot.opportunities.map((op, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-blue-400 mt-0.5">•</span>
                        <span>{op}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Threats */}
                <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 border-l-4 border-l-cyan-500">
                  <span className="text-cyan-400 font-bold text-xs font-mono block mb-2 uppercase tracking-wide">
                    T · Threats (Market Risks)
                  </span>
                  <ul className="space-y-2 font-mono text-[10px] sm:text-xs text-slate-400">
                    {report.swot.threats.map((th, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-0.5">•</span>
                        <span>{th}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>

            {/* Recommendations */}
            <div>
              <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-4">AUTONOMA BOS Recommendations</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {report.recommendations.map((rec, idx) => (
                  <div key={idx} className="bg-slate-900/60 p-5 rounded-xl border border-slate-800">
                    <span className="text-[10px] font-mono text-blue-400 font-bold uppercase tracking-widest">PROPOSED MODULE {idx + 1}</span>
                    <h5 className="text-sm font-bold font-sans text-white mt-1.5">{rec.title}</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mt-2 font-mono font-normal">
                      {rec.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {rec.features.map((ft, fIdx) => (
                        <span key={fIdx} className="text-[8px] font-mono bg-slate-950 px-2 py-1 rounded border border-slate-800 text-slate-300 uppercase">
                          {ft}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Impact table comparison */}
            <div>
              <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-4 font-normal">PROJECTED OPERATIONAL IMPACT</h4>
              <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                <table className="w-full text-left font-mono text-[10px] sm:text-xs">
                  <thead>
                    <tr className="bg-slate-950 border-b border-slate-800/80 text-slate-400">
                      <th className="p-4">METRIC INDICATOR</th>
                      <th className="p-4">LEGACY STATE (BEFORE)</th>
                      <th className="p-4 text-blue-400">AUTONOMA STATE (AFTER)</th>
                      <th className="p-4 text-emerald-400">PROJECTED VALUE IMPACT</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-850">
                    {report.projectedMetrics.map((met, idx) => (
                      <tr key={idx} className="hover:bg-slate-950/20">
                        <td className="p-4 text-slate-300 font-sans font-medium">{met.metric}</td>
                        <td className="p-4 text-slate-500">{met.before}</td>
                        <td className="p-4 text-blue-400 font-semibold">{met.after}</td>
                        <td className="p-4 text-emerald-400 font-bold">{met.impact}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Timeline Roadmap */}
            <div>
              <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-4">Rollout Roadmap Timeline</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-[11px]">
                {report.timeline.map((tml, idx) => (
                  <div key={idx} className="bg-slate-900 p-4 rounded-xl border border-slate-850">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-blue-400 font-bold uppercase text-[9px]">{tml.phase}</span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400">{tml.duration}</span>
                    </div>
                    <ul className="space-y-2 text-[10px] text-slate-400">
                      {tml.steps.map((st, sIdx) => (
                        <li key={sIdx} className="flex items-start gap-1.5 leading-relaxed">
                          <span className="text-slate-600 mt-0.5">↳</span>
                          <span>{st}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Print or Reset */}
            <div className="border-t border-slate-850 pt-8 flex flex-col sm:flex-row gap-3 justify-end">
              <button
                onClick={() => window.print()}
                className="bg-slate-900 border border-slate-800 text-slate-300 font-mono text-xs font-semibold px-6 py-3 rounded-xl hover:text-white transition-all cursor-pointer"
              >
                PRINT BLUEPRINT DOSSIER
              </button>
              <button
                onClick={handleReset}
                className="bg-blue-600 text-white font-mono text-xs font-bold px-6 py-3 rounded-xl hover:bg-blue-500 transition-all cursor-pointer"
              >
                START A NEW ANALYSIS
              </button>
            </div>

          </div>
        )}

        {/* Lead Form Panel */}
        {!loading && !report && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-slate-900/40 backdrop-blur-md rounded-3xl border border-slate-800 p-6 sm:p-10 shadow-2xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Your Name */}
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block">
                    Your Name <span className="text-blue-400">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Rajesh Sharma"
                      required
                      className="w-full bg-slate-950 rounded-xl border border-slate-850 py-3.5 pl-11 pr-4 font-mono text-xs text-white placeholder-slate-650 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/10"
                    />
                  </div>
                </div>

                {/* Company Name */}
                <div className="space-y-1.5">
                  <label htmlFor="companyName" className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block">
                    Company Name <span className="text-blue-400">*</span>
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                    <input
                      id="companyName"
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      placeholder="e.g. Sharma Precision Castings"
                      required
                      className="w-full bg-slate-950 rounded-xl border border-slate-850 py-3.5 pl-11 pr-4 font-mono text-xs text-white placeholder-slate-650 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/10"
                    />
                  </div>
                </div>

                {/* Phone / Whatsapp */}
                <div className="space-y-1.5">
                  <label htmlFor="phone" className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block">
                    Phone / WhatsApp <span className="text-blue-400">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. +91 98765 43210"
                      required
                      className="w-full bg-slate-950 rounded-xl border border-slate-850 py-3.5 pl-11 pr-4 font-mono text-xs text-white placeholder-slate-650 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/10"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block">
                    Email Address <span className="text-blue-400">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. rajesh@sharmacastings.com"
                      required
                      className="w-full bg-slate-950 rounded-xl border border-slate-850 py-3.5 pl-11 pr-4 font-mono text-xs text-white placeholder-slate-650 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/10"
                    />
                  </div>
                </div>

                {/* Industry Category Selector */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label htmlFor="industry" className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block">
                    Manufacturing Industry Sector <span className="text-blue-400">*</span>
                  </label>
                  <select
                    id="industry"
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    className="w-full bg-slate-950 rounded-xl border border-slate-850 py-3.5 px-4 font-mono text-xs text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/10 cursor-pointer"
                  >
                    {industries.map((ind) => (
                      <option key={ind} value={ind}>
                        {ind}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Challenge field */}
                <div className="space-y-1.5 sm:col-span-2">
                  <div className="flex justify-between items-center mb-1">
                    <label htmlFor="challenge" className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block">
                      What's your biggest operational challenge right now? <span className="text-blue-400">*</span>
                    </label>
                    <span className="text-[8px] font-mono text-slate-600">CHOOSE PRESET TO AUTO-FILL</span>
                  </div>

                  {/* Preset quick buttons */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {presetChallenges.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => selectPresetChallenge(preset)}
                        className="px-2 py-1 text-[9px] font-mono bg-slate-950 border border-slate-850 hover:border-slate-800 text-slate-400 rounded-lg transition-colors cursor-pointer"
                      >
                        {preset.length > 40 ? preset.slice(0, 38) + "..." : preset}
                      </button>
                    ))}
                  </div>

                  <textarea
                    id="challenge"
                    name="challenge"
                    value={formData.challenge}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="e.g., We are still relying on operators writing manual dimensions down on paper checklists for compliance audits, leading to frequent transcription errors and weeks of manual audit prep."
                    required
                    className="w-full bg-slate-950 rounded-xl border border-slate-850 py-3.5 px-4 font-mono text-xs text-white placeholder-slate-650 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/10 resize-none"
                  />
                </div>

              </div>

              {/* Error log */}
              {error && (
                <p className="text-xs font-mono text-red-500 bg-red-500/10 px-4 py-3 rounded-xl border border-red-500/20">
                  {error}
                </p>
              )}

              {/* Submit CTA */}
              <div className="pt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                <span className="flex items-center gap-1.5 text-[10px] font-mono text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  Your information is protected by industry standard zero-trust security.
                </span>
                <button
                  type="submit"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-mono text-xs font-bold px-10 py-4.5 rounded-full tracking-wider shadow-lg shadow-blue-500/15 transition-all cursor-pointer"
                >
                  <span>BOOK MY FREE DEMO →</span>
                </button>
              </div>

            </form>
          </motion.div>
        )}

      </div>
    </section>
  );
}
