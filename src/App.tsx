import { AISection } from "./components/AISection";
import { PhotographySection } from "./components/PhotographySection";
import { MusicSection } from "./components/MusicSection";
import { Footer } from "./components/Footer";
import { ScrollProgress } from "./components/ScrollProgress";
import Intro from "./components/Intro";
import { motion } from "motion/react";
import { useRef, useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";

export default function App() {
  const containerRef = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Hide video controls, especially if autoplay is prevented
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const hideControls = () => {
      video.style.setProperty('-webkit-media-controls', 'none', 'important');
      video.style.setProperty('-webkit-media-controls-overlay-play-button', 'none', 'important');
    };

    // Hide controls immediately
    hideControls();

    // Try to play, and hide controls if autoplay fails
    video.play().catch(() => {
      // Autoplay prevented - hide controls anyway
      hideControls();
      // Play on first user interaction
      const playOnInteraction = () => {
        video.play();
        hideControls();
      };
      document.addEventListener('touchstart', playOnInteraction, { once: true });
      document.addEventListener('click', playOnInteraction, { once: true });
    });
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-gray-900 relative">
      {/* Fixed Video Background for entire website */}
      <div className="fixed inset-0 z-0">
        <video
          ref={videoRef}
          src="/images/photography/vid.mp4"
          className="w-full h-full object-cover pointer-events-none [&::-webkit-media-controls]:hidden [&::-webkit-media-controls-overlay-play-button]:hidden"
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
          disableRemotePlayback
          controls={false}
          style={{
            objectFit: 'cover',
          }}
        />
        {/* Subtle dark overlay */}
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />
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
      
      <Analytics />
    </div>
  );
}
