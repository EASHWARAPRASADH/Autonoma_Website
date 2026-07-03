import React, { useState } from "react";
import { Quote, ArrowLeft, ArrowRight, Building2, MapPin } from "lucide-react";
import { motion } from "motion/react";

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      quote: "AUTONOMA replaced our entire patchwork of Excel sheets and legacy tools in one go. The AI-driven PPC alone saved us 18% in production downtime within the first quarter.",
      author: "GENERAL MANAGER — OPERATIONS",
      company: "Tier-1 Automotive Components Manufacturer",
      location: "Pune, Maharashtra"
    },
    {
      quote: "The IATF 16949 compliance module is a game-changer. Our audit preparation time dropped from 3 weeks to 2 days. I can't imagine going back to the old way.",
      author: "QUALITY HEAD",
      company: "Precision Engineering MSME",
      location: "Coimbatore, Tamil Nadu"
    },
    {
      quote: "The visual inventory search feature is something our team uses every single day. It sounds simple, but eliminating \"I don't know the part number\" has transformed our storeroom operations.",
      author: "PLANT MANAGER",
      company: "Electronics Manufacturing",
      location: "Chennai, Tamil Nadu"
    }
  ];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-24 bg-[#0A0C10] text-slate-200 relative border-y border-slate-800/80 overflow-hidden">
      <div className="absolute top-0 left-1/4 w-72 h-72 rounded-full bg-blue-600/5 blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-blue-400 font-mono text-xs tracking-widest uppercase px-3 py-1 bg-blue-500/10 rounded-full border border-blue-500/20">
            TESTIMONIALS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-sans tracking-tight text-white mt-4">
            TRUSTED BY INDUSTRY LEADERS
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto mt-3 text-sm">
            Hear from plant managers and directors running high-efficiency Indian factories.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-slate-900/40 backdrop-blur-md rounded-3xl border border-slate-800 p-8 sm:p-12 shadow-2xl relative min-h-[300px] flex flex-col justify-between"
        >
          <Quote className="absolute top-6 right-8 w-16 h-16 text-slate-800/20 pointer-events-none" />

          {/* Testimonial Quote */}
          <div className="relative z-10">
            <p className="text-lg sm:text-xl lg:text-2xl font-sans italic font-medium leading-relaxed text-slate-100">
              "{testimonials[activeIndex].quote}"
            </p>
          </div>

          {/* Testimonial Author Meta */}
          <div className="mt-8 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <div className="font-mono text-xs font-bold text-blue-400 tracking-wider">
                {testimonials[activeIndex].author}
              </div>
              <div className="text-sm font-bold text-white font-sans mt-1 flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-slate-500" />
                {testimonials[activeIndex].company}
              </div>
              <div className="text-xs text-slate-500 font-mono mt-0.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-600" />
                {testimonials[activeIndex].location}
              </div>
            </div>

            {/* Carousel Controls Buttons */}
            <div className="flex gap-2.5 self-end sm:self-auto">
              <button
                onClick={handlePrev}
                className="p-3 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-all cursor-pointer"
                aria-label="Previous testimonial"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-3 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-all cursor-pointer"
                aria-label="Next testimonial"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Slide Indicator dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeIndex === i ? "bg-blue-500 w-6" : "bg-slate-850"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
