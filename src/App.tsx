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
      // Comprehensive webkit control hiding for newer Safari
      const properties = [
        '-webkit-media-controls',
        '-webkit-media-controls-overlay-play-button',
        '-webkit-media-controls-panel',
        '-webkit-media-controls-play-button',
        '-webkit-media-controls-start-playback-button',
        '-webkit-media-controls-enclosure'
      ];
      
      properties.forEach(prop => {
        video.style.setProperty(prop, 'none', 'important');
      });

      // Force controls to false (newer Safari respects this more)
      if (video.controls !== false) {
        video.controls = false;
      }
      video.removeAttribute('controls');
    };

    // Hide controls BEFORE video loads (critical for newer Safari)
    hideControls();
    
    // MutationObserver to catch shadow DOM elements and ANY control-like elements
    const observer = new MutationObserver(() => {
      hideControls();
      // Aggressively hide any elements that might be controls
      const videoContainer = video.parentElement;
      if (videoContainer) {
        // Look for any button-like or control-like elements
        const possibleControls = videoContainer.querySelectorAll('*');
        possibleControls.forEach((el: any) => {
          if (el && el !== video) {
            const tagName = el.tagName?.toLowerCase();
            const role = el.getAttribute('role');
            const className = el.className || '';
            const ariaLabel = el.getAttribute('aria-label') || '';
            
            // Check if it looks like a control element
            const looksLikeControl = 
              tagName === 'button' ||
              role === 'button' ||
              className.includes('control') ||
              className.includes('play') ||
              ariaLabel.toLowerCase().includes('play') ||
              ariaLabel.toLowerCase().includes('video') ||
              el.style?.cursor === 'pointer';
            
            if (looksLikeControl) {
              el.style.display = 'none';
              el.style.visibility = 'hidden';
              el.style.opacity = '0';
              el.style.pointerEvents = 'none';
              el.style.width = '0';
              el.style.height = '0';
            }
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

    // Detect when video is paused (autoplay failed) and hide controls aggressively
    const checkPausedState = () => {
      if (video.paused) {
        // Autoplay likely failed - hide controls very aggressively
        hideControls();
        // Try multiple times in quick succession
        setTimeout(hideControls, 0);
        setTimeout(hideControls, 10);
        setTimeout(hideControls, 50);
        setTimeout(hideControls, 100);
      }
    };

    // Monitor paused state
    video.addEventListener('pause', () => {
      checkPausedState();
      hideControls();
    });
    video.addEventListener('loadeddata', checkPausedState);
    video.addEventListener('canplay', checkPausedState);

    // Try to play immediately and keep trying
    const attemptPlay = () => {
      video.play()
        .then(() => {
          hideControls();
          // Keep hiding even after play starts (newer Safari can show controls during playback)
          const keepHiding = setInterval(() => {
            hideControls();
          }, 100);
          setTimeout(() => clearInterval(keepHiding), 5000);
        })
        .catch(() => {
          // Autoplay blocked - hide controls VERY aggressively
          hideControls();
          checkPausedState();
          
          // Hide controls continuously while paused
          const hideWhilePaused = setInterval(() => {
            if (video.paused) {
              hideControls();
              checkPausedState();
            } else {
              clearInterval(hideWhilePaused);
            }
          }, 50);
          
          // Play on first user interaction
          const playOnInteraction = () => {
            video.play().then(() => {
              hideControls();
              clearInterval(hideWhilePaused);
            });
            hideControls();
          };
          document.addEventListener('touchstart', playOnInteraction, { once: true, capture: true });
          document.addEventListener('click', playOnInteraction, { once: true, capture: true });
        });
    };

    // Try immediately
    attemptPlay();
    
    // Also try after delays (for different network/device conditions)
    setTimeout(attemptPlay, 100);
    setTimeout(attemptPlay, 500);
    setTimeout(() => {
      checkPausedState();
      attemptPlay();
    }, 1000);

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
