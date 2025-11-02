import { AISection } from "./components/AISection";
import { PhotographySection } from "./components/PhotographySection";
import { MusicSection } from "./components/MusicSection";
import { Footer } from "./components/Footer";
import { ScrollProgress } from "./components/ScrollProgress";
import Intro from "./components/Intro";
import { motion } from "motion/react";
import { useRef } from "react";

export default function App() {
  const containerRef = useRef(null);

  return (
    <div ref={containerRef} className="min-h-screen bg-gray-900 relative">
      {/* Fixed Video Background for entire website */}
      <div className="fixed inset-0 z-0">
        <video
          src="/images/photography/vid.mp4"
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        />
        {/* Subtle dark overlay */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* All content above video */}
      <div className="relative z-10">
        <ScrollProgress />
      
      {/* Intro Screen */}
      <Intro />
      
      {/* Smooth scroll wrapper */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <AISection />
        
        <PhotographySection />
        
        <MusicSection />
        
        <Footer />
      </motion.div>
      </div>
    </div>
  );
}
