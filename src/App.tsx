import React from "react";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import FeaturesGrid from "./components/FeaturesGrid";
import ComparisonTable from "./components/ComparisonTable";
import Testimonials from "./components/Testimonials";
import FaqSection from "./components/FaqSection";
import LeadCaptureForm from "./components/LeadCaptureForm";
import Footer from "./components/Footer";
import Background3D from "./components/Background3D";

export default function App() {
  const handleScrollTo = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0C10] text-slate-200 font-sans selection:bg-blue-600 selection:text-white relative">
      {/* Scroll-Responsive 3D Ambient Mesh Background */}
      <Background3D />

      {/* Dynamic Header / Navigation */}
      <Navigation onScrollTo={handleScrollTo} />

      {/* Modern displays, high-contrast display typography Hero */}
      <Hero onScrollTo={handleScrollTo} />

      {/* Five Dimensions & 76 Features badge explorer */}
      <FeaturesGrid />

      {/* Highlighted core contrast matrix Autonoma vs Legacy ERP */}
      <ComparisonTable />

      {/* Trusted quote carousels & sliders */}
      <Testimonials />

      {/* Accordion list FAQ */}
      <FaqSection />

      {/* Book demo & AI virtual strategist report generator */}
      <LeadCaptureForm />

      {/* Footer & WhatsApp floating widgets */}
      <Footer onScrollTo={handleScrollTo} />
    </div>
  );
}
