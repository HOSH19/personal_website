import { motion } from "motion/react";
import { Github, Linkedin, Instagram, Send } from "lucide-react";
import { useState } from "react";

export default function Intro() {
  const [hoveredWord, setHoveredWord] = useState<number | null>(null);

  const words = [
    {
      text: "Code",
      sectionId: "ai",
    },
    {
      text: "Capture",
      sectionId: "photography",
    },
    {
      text: "Create",
      sectionId: "music",
    },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/yourusername",
      color: "hover:text-red-400"
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://linkedin.com/in/yourusername",
      color: "hover:text-blue-400"
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://instagram.com/yourusername",
      color: "hover:text-pink-400"
    },
    {
      name: "Telegram",
      icon: Send,
      url: "https://t.me/yourusername",
      color: "hover:text-cyan-400"
    }
  ];

  return (
    <motion.div
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{
              x: Math.random() * 100 + '%',
              y: Math.random() * 100 + '%',
              opacity: Math.random() * 0.5,
            }}
            animate={{
              y: [null, Math.random() * 100 + '%'],
              opacity: [null, Math.random() * 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-7xl w-full flex flex-col items-center justify-center">
        {/* Main Words */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 mb-8">
          {words.map((word, index) => (
            <div key={word.text} className="flex items-center">
              <motion.div
                onMouseEnter={() => setHoveredWord(index)}
                onMouseLeave={() => setHoveredWord(null)}
                onClick={() => scrollToSection(word.sectionId)}
                className="relative cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
              >
                <motion.h1
                  className="text-5xl md:text-7xl lg:text-8xl font-bold text-white relative inline-block leading-none"
                  whileHover={{ scale: 1.05, transition: { duration: 0.15 } }}
                >
                  {word.text}
                </motion.h1>
                
                {/* Hover underline */}
                <motion.div
                  className="absolute -bottom-4 left-0 right-0 h-1 bg-white rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: hoveredWord === index ? 1 : 0 }}
                  transition={{ duration: 0.15 }}
                />
              </motion.div>
              {index < words.length - 1 && (
                <span className="text-white/30 mx-2 md:mx-4 text-5xl md:text-7xl lg:text-8xl font-bold">.</span>
              )}
            </div>
          ))}
        </div>

        {/* Name underneath */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p className="text-2xl md:text-3xl text-white/80 font-light mb-6">
            Hi! I'm <span className="font-semibold text-white">Shu Han</span>
          </p>
          
          {/* Social Links */}
          <div className="flex items-center justify-center gap-6 mb-6">
            {socialLinks.map((social, index) => {
              const IconComponent = social.icon;
              return (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    transition: { 
                      duration: 0.5, 
                      delay: 0.9 + index * 0.1,
                      type: "spring",
                      stiffness: 200
                    }
                  }}
                  whileHover={{ 
                    scale: 1.5,
                    transition: { duration: 0.15, ease: "circOut" } 
                  }}
                  whileTap={{ scale: 0.95 }}
                  className={`text-white/70 transition-colors duration-150 ${social.color}`}
                  aria-label={social.name}
                >
                  <IconComponent className="w-6 h-6" />
                </motion.a>
              );
            })}
          </div>
          
          <motion.p
            className="text-sm text-white/50 mt-2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Click on a word to explore
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
}

