import React, { useState, useEffect } from "react";
import { Cpu, Menu, X, Radio, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavigationProps {
  onScrollTo: (sectionId: string) => void;
}

export default function Navigation({ onScrollTo }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light" | null>(null);

  // Initialize theme from localStorage or default to light
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      setTheme("light");
    }
  }, []);

  // Update localStorage and document class when theme changes
  useEffect(() => {
    if (theme === null) return;
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.add("light");
      root.classList.remove("dark");
    } else {
      root.classList.add("dark");
      root.classList.remove("light");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "FEATURES", id: "features" },
    { name: "WHY US", id: "why-us" },
    { name: "FAQ", id: "faq" },
  ];

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0A0C10]/90 backdrop-blur-md border-b border-slate-800/80 py-3 shadow-lg"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Logo & Brand */}
          <div
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => onScrollTo("hero")}
          >
            <div className="bg-gradient-to-tr from-blue-600 to-cyan-500 p-2.5 rounded-xl text-white shadow-lg shadow-blue-500/10 group-hover:scale-105 transition-transform duration-300">
              <Cpu className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="font-sans font-bold text-lg tracking-tight text-white flex items-center gap-1.5">
                Nutech Autonoma
                <span className="hidden sm:inline text-xs font-mono px-2 py-0.5 rounded-full bg-blue-950 text-blue-400 border border-blue-500/20">
                  BOS
                </span>
              </div>
              <div className="text-[9px] font-mono tracking-widest text-slate-400 uppercase">
                Systems Pvt Ltd · Industry 4.0
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onScrollTo(item.id)}
                className="text-xs font-mono tracking-wider text-slate-300 hover:text-blue-400 transition-colors duration-200 cursor-pointer"
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Call to Action Button */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full border border-slate-850 bg-slate-900/40 text-slate-400 hover:text-blue-500 hover:border-slate-300/40 transition-all cursor-pointer shadow-sm flex items-center justify-center"
              aria-label="Toggle visual theme"
              title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
            >
              {theme === "light" ? (
                <Moon className="w-4.5 h-4.5 text-blue-500" />
              ) : (
                <Sun className="w-4.5 h-4.5 text-amber-500" />
              )}
            </button>

            <span className="flex items-center gap-1.5 text-[10px] font-mono px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Radio className="w-3 h-3 text-blue-400 animate-pulse" />
              MADE IN INDIA
            </span>
            <button
              id="nav-demo-btn"
              onClick={() => onScrollTo("demo-form")}
              className="bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold px-5 py-2.5 rounded-full tracking-wider transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-blue-600/10 border border-blue-400/30 cursor-pointer"
            >
              BOOK FREE DEMO
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-400 hover:text-white p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden bg-[#0A0C10]/95 border-b border-slate-800/80 px-4 pt-4 pb-6 space-y-4 shadow-xl backdrop-blur-lg overflow-hidden"
          >
            <div className="flex flex-col space-y-2">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => {
                    onScrollTo(item.id);
                    setIsOpen(false);
                  }}
                  className="text-left font-mono tracking-wider text-sm text-slate-300 hover:text-blue-400 py-2.5 border-b border-slate-900 flex items-center justify-between group cursor-pointer"
                >
                  <span>{item.name}</span>
                  <span className="text-slate-600 group-hover:text-blue-400 transition-colors">→</span>
                </motion.button>
              ))}
            </div>
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="pt-2 flex flex-col gap-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 w-max">
                  <Radio className="w-3 h-3 text-blue-400 animate-pulse" />
                  MADE IN INDIA
                </div>

                {/* Theme Toggle Button (Mobile) */}
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-850 bg-slate-900/40 text-xs font-mono text-slate-400 cursor-pointer"
                >
                  {theme === "light" ? (
                    <>
                      <Moon className="w-3.5 h-3.5 text-blue-500" />
                      <span>DARK THEME</span>
                    </>
                  ) : (
                    <>
                      <Sun className="w-3.5 h-3.5 text-amber-500" />
                      <span>LIGHT THEME</span>
                    </>
                  )}
                </button>
              </div>
              <button
                onClick={() => {
                  onScrollTo("demo-form");
                  setIsOpen(false);
                }}
                className="w-full bg-blue-600 text-white font-mono text-xs font-bold py-3 rounded-full tracking-wider text-center border border-blue-400/30 cursor-pointer shadow-lg shadow-blue-500/10"
              >
                BOOK FREE DEMO
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
