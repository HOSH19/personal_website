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

  // Hide video controls aggressively - targeting newer Safari versions
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Set up video attributes BEFORE it loads (critical for newer Safari)
    video.muted = true;
    video.playsInline = true;
    video.setAttribute('webkit-playsinline', 'true');
    video.setAttribute('x-webkit-airplay', 'deny');
    video.removeAttribute('controls');
    video.controls = false;

    const hideControls = () => {
      // Comprehensive webkit control hiding - compatible with both old and new Safari
      const properties = [
        '-webkit-media-controls',
        '-webkit-media-controls-overlay-play-button',
        '-webkit-media-controls-panel',
        '-webkit-media-controls-play-button',
        '-webkit-media-controls-start-playback-button',
        '-webkit-media-controls-enclosure'
      ];
      
      // Try multiple methods for compatibility
      properties.forEach(prop => {
        // Method 1: setProperty with important (newer Safari)
        try {
          video.style.setProperty(prop, 'none', 'important');
        } catch (e) {
          // Method 2: setProperty without important (older Safari fallback)
          try {
            video.style.setProperty(prop, 'none');
          } catch (e2) {
            // Method 3: Direct style setting (oldest Safari fallback)
            try {
              (video.style as any)[prop.replace('-webkit-', 'webkit').replace(/-/g, '')] = 'none';
            } catch (e3) {
              // Ignore if all methods fail
            }
          }
        }
      });

      // Force controls to false (works on both old and new Safari)
      try {
        video.controls = false;
        video.removeAttribute('controls');
        // Also try setting it as a string for older Safari
        video.setAttribute('controls', 'false');
      } catch (e) {
        // Ignore errors
      }

      // For older Safari: also try to hide via CSS classes
      video.classList.add('no-controls');
    };

    // Hide controls BEFORE video loads (critical for newer Safari)
    hideControls();
    
    // MutationObserver to catch shadow DOM elements (newer Safari uses shadow DOM for controls)
    const observer = new MutationObserver(() => {
      hideControls();
      // Also try to hide any elements that might be controls
      const videoContainer = video.parentElement;
      if (videoContainer) {
        const possibleControls = videoContainer.querySelectorAll('*');
        possibleControls.forEach((el: any) => {
          if (el && (el.classList?.contains('controls') || el.getAttribute('role') === 'button')) {
            el.style.display = 'none';
            el.style.visibility = 'hidden';
            el.style.opacity = '0';
            el.style.pointerEvents = 'none';
          }
        });
      }
    });

    // Observe the video element and its parent for changes
    observer.observe(video, {
      attributes: true,
      attributeFilter: ['controls', 'class', 'style'],
      childList: true,
      subtree: true
    });
    if (video.parentElement) {
      observer.observe(video.parentElement, {
        childList: true,
        subtree: true
      });
    }
    
    // Use requestAnimationFrame to continuously hide (catches late-appearing controls in newer Safari)
    let rafId: number;
    const continuousHide = () => {
      hideControls();
      rafId = requestAnimationFrame(continuousHide);
    };
    rafId = requestAnimationFrame(continuousHide);

    // Hide controls on all video lifecycle events (newer Safari triggers these differently)
    const videoEvents = ['loadstart', 'loadedmetadata', 'loadeddata', 'canplay', 'canplaythrough', 'play', 'playing', 'pause', 'waiting', 'seeking', 'seeked'];
    videoEvents.forEach((event) => {
      video.addEventListener(event, hideControls, { passive: true, capture: true });
    });

    // Hide on any user interaction (newer Safari shows controls on interaction)
    const interactionEvents = ['touchstart', 'touchmove', 'touchend', 'click', 'scroll', 'mousemove', 'mousedown'];
    interactionEvents.forEach((event) => {
      document.addEventListener(event, hideControls, { passive: true, capture: true });
      window.addEventListener(event, hideControls, { passive: true, capture: true });
    });

    // Try to play immediately and keep trying
    const attemptPlay = () => {
      video.play()
        .then(() => {
          hideControls();
          // Keep hiding even after play starts (both old and new Safari can show controls)
          const keepHiding = setInterval(() => {
            hideControls();
          }, 50); // More frequent for older Safari
          setTimeout(() => clearInterval(keepHiding), 10000); // Longer for older Safari
        })
        .catch(() => {
          hideControls();
          // Play on first user interaction
          const playOnInteraction = () => {
            video.play().then(() => hideControls());
            hideControls();
          };
          document.addEventListener('touchstart', playOnInteraction, { once: true, capture: true });
          document.addEventListener('click', playOnInteraction, { once: true, capture: true });
        });
    };

    // Try immediately
    attemptPlay();
    
    // Also try after a short delay (newer Safari sometimes needs this)
    setTimeout(attemptPlay, 100);
    setTimeout(attemptPlay, 500);

    // Cleanup
    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      videoEvents.forEach((event) => {
        video.removeEventListener(event, hideControls, { capture: true } as any);
      });
      interactionEvents.forEach((event) => {
        document.removeEventListener(event, hideControls, { capture: true } as any);
        window.removeEventListener(event, hideControls, { capture: true } as any);
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
            // Additional inline styles for newer Safari compatibility
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
