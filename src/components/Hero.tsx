import React, { useRef, useState } from "react";
import { ArrowRight, Cpu, Activity, Zap } from "lucide-react";
import { motion } from "motion/react";

interface HeroProps {
  onScrollTo: (sectionId: string) => void;
}

// Award-Winning Interaction: Magnetic Button wrapper that gently pulls the CTA towards the cursor
function MagneticButton({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    if (distance < 90) {
      const power = (90 - distance) / 90; // 0 to 1
      setPosition({
        x: distanceX * 0.22 * power,
        y: distanceY * 0.22 * power,
      });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 180, damping: 14, mass: 0.1 }}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.button>
  );
}

// Award-Winning Interaction: Spotlight card with real-time 3D tilt perspective and laser reflection
function Spotlight3DCard({ children }: { children: React.ReactNode }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // Elegant, subtle 3D rotational tilt
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    setTilt({ x: rotateX, y: rotateY });
    setSpotlight({ x, y, opacity: 1 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setSpotlight((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)",
      }}
      className="bg-slate-900/50 backdrop-blur-md rounded-3xl border border-slate-800/85 p-6 sm:p-8 shadow-2xl relative overflow-hidden transition-all duration-300 hover:border-slate-700/80 hover:shadow-blue-500/5"
    >
      {/* 3D Spotlight Laser Overlay */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 mix-blend-screen"
        style={{
          opacity: spotlight.opacity,
          background: `radial-gradient(400px circle at ${spotlight.x}px ${spotlight.y}px, rgba(59, 130, 246, 0.15), rgba(6, 182, 212, 0.05), transparent 80%)`,
        }}
      />
      <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
      {children}
    </div>
  );
}

export default function Hero({ onScrollTo }: HeroProps) {
  // Staggered letters or words for the title
  const line1Words = ["THE", "FUTURE", "OF"];
  const line2Words = ["BUSINESS", "OS", "IS", "AUTONOMOUS"];

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-32 pb-20 flex flex-col justify-center items-center overflow-hidden bg-[#0A0C10] text-slate-200 px-4 sm:px-6 lg:px-8"
    >
      {/* Background visual graphics */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-600/10 blur-[100px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[150px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0e1322_1px,transparent_1px),linear-gradient(to_bottom,#0e1322_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40" />
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Badge Slogan */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/85 border border-slate-800 shadow-inner mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
          <span className="text-[10px] sm:text-xs font-mono tracking-widest text-slate-300 uppercase">
            NUTECH AUTONOMA SYSTEMS PVT LTD  ·  INDUSTRY 4.0
          </span>
        </motion.div>

        {/* Display Typography Title with Staggered Word Reveal */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-sans font-extrabold tracking-tight leading-tight sm:leading-none text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400 mb-8 select-none">
          {/* Line 1 */}
          <div className="block mb-2 overflow-hidden h-fit">
            {line1Words.map((word, idx) => (
              <span key={idx} className="inline-block overflow-hidden mr-3 sm:mr-4">
                <motion.span
                  className="inline-block hover:text-blue-400 cursor-default"
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.9,
                    delay: idx * 0.1,
                    ease: [0.16, 1, 0.3, 1], // Custom heavy ease-out
                  }}
                  whileHover={{ y: -6, scale: 1.05 }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </div>

          {/* Line 2 */}
          <div className="block overflow-hidden h-fit">
            {line2Words.map((word, idx) => (
              <span key={idx} className="inline-block overflow-hidden mr-3 sm:mr-4">
                <motion.span
                  className="inline-block bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent hover:from-cyan-400 hover:to-blue-300 cursor-default"
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.9,
                    delay: 0.3 + idx * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{ y: -6, scale: 1.05 }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </div>
        </h1>

        {/* Dynamic Concept Descriptions */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-6"
        >
          Standard ERPs tell you what happened.{" "}
          <strong className="text-blue-400 font-semibold">AUTONOMA</strong> ensures
          it is produced flawlessly.
        </motion.p>

        {/* Interactive Highlight Bullet Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-wrap justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-mono text-slate-400 mb-10"
        >
          <span className="flex items-center gap-1.5 bg-slate-900/60 px-4 py-1.5 rounded-full border border-slate-800">
            <Cpu className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
            AI-Driven
          </span>
          <span className="flex items-center gap-1.5 bg-slate-900/60 px-4 py-1.5 rounded-full border border-slate-800">
            <Zap className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            IoT-Connected
          </span>
          <span className="flex items-center gap-1.5 bg-slate-900/60 px-4 py-1.5 rounded-full border border-slate-800">
            <Activity className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
            Factory-Floor Aware
          </span>
        </motion.div>

        {/* Call to action CTAs with Magnetic interactions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 px-4 mb-16"
        >
          <MagneticButton
            onClick={() => onScrollTo("demo-form")}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold px-8 py-4 rounded-full tracking-wider shadow-lg shadow-blue-500/20 transition-all duration-300 border border-blue-400/30 cursor-pointer"
          >
            <span>SEE AUTONOMA LIVE — BOOK DEMO</span>
            <ArrowRight className="w-4 h-4" />
          </MagneticButton>
          <MagneticButton
            onClick={() => onScrollTo("features")}
            className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 font-mono text-xs font-bold px-8 py-4 rounded-full tracking-wider transition-all duration-300 cursor-pointer"
          >
            EXPLORE 76 FEATURES
          </MagneticButton>
        </motion.div>
      </div>

      {/* Hero Floating Dashboard Metrics Preview Container */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.1 }}
        className="w-full max-w-5xl mx-auto px-4 relative z-10"
      >
        <Spotlight3DCard>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-800 relative z-10">
            
            {/* Stat 1 */}
            <div className="flex flex-col items-center justify-center text-center p-2 group/stat">
              <span className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 font-sans group-hover/stat:scale-105 transition-transform duration-300">
                76+
              </span>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mt-1">
                Next-Gen Features
              </span>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col items-center justify-center text-center p-2 pt-6 sm:pt-2 group/stat">
              <span className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-sans group-hover/stat:scale-105 transition-transform duration-300">
                99.8%
              </span>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mt-1">
                OCR & Visual Accuracy
              </span>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col items-center justify-center text-center p-2 pt-6 sm:pt-2 group/stat">
              <span className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400 font-sans group-hover/stat:scale-105 transition-transform duration-300">
                100×
              </span>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mt-1">
                HRMS Span of Control
              </span>
            </div>

            {/* Stat 4 */}
            <div className="flex flex-col items-center justify-center text-center p-2 pt-6 sm:pt-2 group/stat">
              <span className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 font-sans group-hover/stat:scale-105 transition-transform duration-300">
                0
              </span>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mt-1">
                Manual Quality Entries
              </span>
            </div>

          </div>
        </Spotlight3DCard>

        {/* Infinite Running Carousel / Marquee Ticker */}
        <div className="mt-16 max-w-5xl mx-auto px-4 sm:px-6">
          <div className="marquee-container relative bg-gradient-to-br from-slate-900/80 via-[#0D1117] to-slate-950 rounded-2xl sm:rounded-3xl border border-slate-800/90 py-8 px-4 sm:px-6 shadow-2xl overflow-hidden group hover:border-blue-500/35 transition-all duration-300 shadow-blue-500/[0.03]">
            {/* Ambient inner glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-cyan-500/5 pointer-events-none" />
            
            {/* Custom Infinite Scroll Marquee Keyframes */}
            <style dangerouslySetInnerHTML={{__html: `
              @keyframes marquee-left {
                0% { transform: translate3d(0, 0, 0); }
                100% { transform: translate3d(-50%, 0, 0); }
              }
              @keyframes marquee-right {
                0% { transform: translate3d(-50%, 0, 0); }
                100% { transform: translate3d(0, 0, 0); }
              }
              .animate-marquee-left {
                display: flex;
                width: max-content;
                animation: marquee-left 35s linear infinite;
              }
              .animate-marquee-right {
                display: flex;
                width: max-content;
                animation: marquee-right 35s linear infinite;
              }
              .animate-marquee-left:hover, .animate-marquee-right:hover {
                animation-play-state: paused;
              }
            `}} />

            <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-6 relative z-10 font-bold flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
              TRUSTED ACROSS MANUFACTURING INDUSTRIES & GLOBAL COMPLIANCE
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
            </p>

            <div className="space-y-4 relative z-10 overflow-hidden">
              {/* Row 1: Moving Left (Sectors) */}
              <div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]">
                <div className="animate-marquee-left gap-4">
                  {/* First batch */}
                  {[
                    "AUTOMOTIVE", "PHARMA", "MSME", "AEROSPACE", "ELECTRONICS", 
                    "FOOD & BEVERAGE", "INDUSTRIAL EQUIPMENT", "SEMICONDUCTORS", 
                    "BIOTECH", "RENEWABLE ENERGY"
                  ].map((sector, idx) => (
                    <div 
                      key={`sector-1-${idx}`}
                      className="marquee-sector-card px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-950/40 via-slate-900/40 to-indigo-950/40 border border-blue-500/25 text-[11px] font-mono font-bold tracking-wider text-blue-100 hover:text-white hover:border-blue-400/60 hover:from-blue-500/20 hover:to-indigo-500/20 transition-all duration-300 flex items-center gap-2 cursor-default shrink-0 shadow-[0_2px_14px_-4px_rgba(59,130,246,0.15)]"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                      {sector}
                    </div>
                  ))}
                  {/* Duplicate batch for seamless loop */}
                  {[
                    "AUTOMOTIVE", "PHARMA", "MSME", "AEROSPACE", "ELECTRONICS", 
                    "FOOD & BEVERAGE", "INDUSTRIAL EQUIPMENT", "SEMICONDUCTORS", 
                    "BIOTECH", "RENEWABLE ENERGY"
                  ].map((sector, idx) => (
                    <div 
                      key={`sector-2-${idx}`}
                      className="marquee-sector-card px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-950/40 via-slate-900/40 to-indigo-950/40 border border-blue-500/25 text-[11px] font-mono font-bold tracking-wider text-blue-100 hover:text-white hover:border-blue-400/60 hover:from-blue-500/20 hover:to-indigo-500/20 transition-all duration-300 flex items-center gap-2 cursor-default shrink-0 shadow-[0_2px_14px_-4px_rgba(59,130,246,0.15)]"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                      {sector}
                    </div>
                  ))}
                </div>
              </div>

              {/* Row 2: Moving Right (Core Tech Pillars) */}
              <div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]">
                <div className="animate-marquee-right gap-4">
                  {/* First batch */}
                  {[
                    "OMNI-VISUAL AI", "OCR MATERIAL LOOKUP", "MACHINE TELEMETRY", 
                    "8D COMPLIANCE", "RFID HRMS ACCESS", "LIVE FACTORY TELEMETRY",
                    "PREDICTIVE MAINTENANCE", "EDGE INTELLIGENCE", "REAL-TIME ERP LOOP"
                  ].map((tech, idx) => (
                    <div 
                      key={`tech-1-${idx}`}
                      className="marquee-tech-card px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-950/40 via-slate-900/40 to-teal-950/40 border border-cyan-500/25 text-[11px] font-mono font-bold tracking-wider text-cyan-100 hover:text-white hover:border-cyan-400/60 hover:from-cyan-500/20 hover:to-teal-500/20 transition-all duration-300 flex items-center gap-2 cursor-default shrink-0 shadow-[0_2px_14px_-4px_rgba(6,182,212,0.15)]"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      {tech}
                    </div>
                  ))}
                  {/* Duplicate batch for seamless loop */}
                  {[
                    "OMNI-VISUAL AI", "OCR MATERIAL LOOKUP", "MACHINE TELEMETRY", 
                    "8D COMPLIANCE", "RFID HRMS ACCESS", "LIVE FACTORY TELEMETRY",
                    "PREDICTIVE MAINTENANCE", "EDGE INTELLIGENCE", "REAL-TIME ERP LOOP"
                  ].map((tech, idx) => (
                    <div 
                      key={`tech-2-${idx}`}
                      className="marquee-tech-card px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-950/40 via-slate-900/40 to-teal-950/40 border border-cyan-500/25 text-[11px] font-mono font-bold tracking-wider text-cyan-100 hover:text-white hover:border-cyan-400/60 hover:from-cyan-500/20 hover:to-teal-500/20 transition-all duration-300 flex items-center gap-2 cursor-default shrink-0 shadow-[0_2px_14px_-4px_rgba(6,182,212,0.15)]"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      {tech}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
