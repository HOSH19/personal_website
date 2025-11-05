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
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Use canvas to render video - bypasses Safari controls completely
  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match video
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Draw video frames to canvas with proper aspect ratio
    const drawFrame = () => {
      if (video.readyState >= 2) { // HAVE_CURRENT_DATA or higher
        // Calculate aspect ratio to cover the canvas (like object-fit: cover)
        const videoAspect = video.videoWidth / video.videoHeight;
        const canvasAspect = canvas.width / canvas.height;
        
        let drawWidth = canvas.width;
        let drawHeight = canvas.height;
        let offsetX = 0;
        let offsetY = 0;
        
        if (videoAspect > canvasAspect) {
          // Video is wider - fit to height
          drawHeight = canvas.height;
          drawWidth = drawHeight * videoAspect;
          offsetX = (canvas.width - drawWidth) / 2;
        } else {
          // Video is taller - fit to width
          drawWidth = canvas.width;
          drawHeight = drawWidth / videoAspect;
          offsetY = (canvas.height - drawHeight) / 2;
        }
        
        ctx.drawImage(video, offsetX, offsetY, drawWidth, drawHeight);
      }
      requestAnimationFrame(drawFrame);
    };

    // Set up video (hidden, no controls needed)
    video.muted = true;
    video.playsInline = true;
    video.loop = true;
    video.setAttribute('webkit-playsinline', 'true');
    video.style.display = 'none'; // Hide the video element completely

    // Start drawing when video can play
    video.addEventListener('canplay', () => {
      drawFrame();
    });

    // Try to play video
    const playVideo = async () => {
      try {
        await video.play();
      } catch (error) {
        // Autoplay blocked - play on first interaction
        const playOnInteraction = () => {
          video.play();
          drawFrame();
        };
        document.addEventListener('touchstart', playOnInteraction, { once: true });
        document.addEventListener('click', playOnInteraction, { once: true });
      }
    };

    playVideo();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-gray-900 relative">
      {/* Fixed Video Background for entire website - using canvas to bypass Safari controls */}
      <div className="fixed inset-0 z-0">
        {/* Hidden video element - used as source for canvas */}
        <video
          ref={videoRef}
          src="/images/photography/vid.mp4"
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
          disableRemotePlayback
          style={{
            display: 'none',
            position: 'absolute',
            width: 0,
            height: 0,
            opacity: 0,
            pointerEvents: 'none',
          }}
        />
        {/* Canvas that displays the video - no controls possible! */}
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover pointer-events-none"
          style={{
            objectFit: 'cover',
            width: '100%',
            height: '100%',
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
