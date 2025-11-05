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

  // Hide video controls aggressively - compatible with older Safari versions
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const hideControls = () => {
      // Comprehensive webkit control hiding (works across Safari versions)
      const properties = [
        '-webkit-media-controls',
        '-webkit-media-controls-overlay-play-button',
        '-webkit-media-controls-panel',
        '-webkit-media-controls-play-button',
        '-webkit-media-controls-start-playback-button'
      ];
      
      properties.forEach(prop => {
        video.style.setProperty(prop, 'none', 'important');
      });

      // Force remove any controls attribute (older Safari fallback)
      video.removeAttribute('controls');
      video.setAttribute('controls', 'false');
    };

    // Hide controls immediately and repeatedly
    hideControls();
    
    // Use requestAnimationFrame to continuously hide (catches late-appearing controls)
    let rafId: number;
    const continuousHide = () => {
      hideControls();
      rafId = requestAnimationFrame(continuousHide);
    };
    rafId = requestAnimationFrame(continuousHide);

    // Hide controls on all video lifecycle events
    const videoEvents = ['loadstart', 'loadedmetadata', 'loadeddata', 'canplay', 'canplaythrough', 'play', 'playing', 'pause'];
    videoEvents.forEach((event) => {
      video.addEventListener(event, hideControls, { passive: true });
    });

    // Hide on any user interaction (before controls can appear)
    const interactionEvents = ['touchstart', 'touchmove', 'touchend', 'click', 'scroll'];
    interactionEvents.forEach((event) => {
      document.addEventListener(event, hideControls, { passive: true });
    });

    // Try to play, and hide controls if autoplay fails
    video.play().catch(() => {
      hideControls();
      const playOnInteraction = () => {
        video.play();
        hideControls();
      };
      document.addEventListener('touchstart', playOnInteraction, { once: true });
      document.addEventListener('click', playOnInteraction, { once: true });
    });

    // Cleanup
    return () => {
      cancelAnimationFrame(rafId);
      videoEvents.forEach((event) => {
        video.removeEventListener(event, hideControls);
      });
      interactionEvents.forEach((event) => {
        document.removeEventListener(event, hideControls);
      });
    };
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-gray-900 relative">
      {/* Fixed Video Background for entire website */}
      <div className="fixed inset-0 z-0">
        <video
          ref={videoRef}
          src="/images/photography/vid.mp4"
          className="background-video w-full h-full object-cover pointer-events-none [&::-webkit-media-controls]:hidden [&::-webkit-media-controls-overlay-play-button]:hidden"
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
          disableRemotePlayback
          controls={false}
          style={{
            objectFit: 'cover',
            // Additional inline styles for older Safari compatibility
            WebkitMediaControls: 'none',
            WebkitMediaControlsOverlayPlayButton: 'none',
            WebkitMediaControlsPanel: 'none',
            WebkitMediaControlsPlayButton: 'none',
          } as React.CSSProperties}
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
