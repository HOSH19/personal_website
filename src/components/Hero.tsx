import { Code, Camera, Music, ArrowRight, Sparkles, Zap, Palette, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

export function Hero() {
  const [hoveredColumn, setHoveredColumn] = useState<number | null>(null);
  const [showIntro, setShowIntro] = useState(true);

  // Dismiss intro on scroll
  useEffect(() => {
    if (!showIntro) return;

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowIntro(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showIntro]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const columns = [
    {
      id: "ai",
      title: "Code",
      subtitle: "AI & Machine Learning",
      description: "Building intelligent systems that learn and adapt",
      icon: Code,
      gradient: "from-blue-600 via-cyan-500 to-blue-400",
      bgGradient: "from-blue-900/90 via-cyan-900/90 to-blue-800/90",
      accentIcon: Sparkles,
      features: ["Neural Networks", "Deep Learning", "Computer Vision", "NLP"],
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80"
    },
    {
      id: "photography",
      title: "Capture",
      subtitle: "Visual Storytelling",
      description: "Freezing moments in time through the lens",
      icon: Camera,
      gradient: "from-purple-600 via-pink-500 to-purple-400",
      bgGradient: "from-purple-900/90 via-pink-900/90 to-purple-800/90",
      accentIcon: Palette,
      features: ["Portrait", "Landscape", "Street", "Editorial"],
      image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&q=80"
    },
    {
      id: "music",
      title: "Create",
      subtitle: "Music Production",
      description: "Crafting immersive sonic experiences",
      icon: Music,
      gradient: "from-pink-600 via-red-500 to-orange-400",
      bgGradient: "from-pink-900/90 via-red-900/90 to-orange-800/90",
      accentIcon: Zap,
      features: ["Electronic", "Hip-Hop", "Ambient", "Synthwave"],
      image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80"
    },
  ];

  return (
    <section className="h-screen w-full flex relative overflow-hidden">
      {/* Columns - fixed width, no expansion */}
      {columns.map((column, index) => {
        const IconComponent = column.icon;
        const AccentIcon = column.accentIcon;
        const isHovered = hoveredColumn === index;

        return (
          <div
            key={column.id}
            onMouseEnter={() => setHoveredColumn(index)}
            onMouseLeave={() => setHoveredColumn(null)}
            onClick={() => scrollToSection(column.id)}
            className="relative cursor-pointer group"
            style={{ width: '33.333333%', flexShrink: 0, flexGrow: 0 }}
          >
            {/* Background Image */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.img
                src={column.image}
                alt={column.title}
                className="w-full h-full object-cover"
                animate={{
                  scale: isHovered ? 1.1 : 1,
                }}
                transition={{ duration: 0.6 }}
              />
              {/* Overlay */}
              <motion.div 
                className={`absolute inset-0 bg-gradient-to-br ${column.bgGradient}`}
                animate={{
                  opacity: isHovered ? 0.85 : 0.75,
                }}
                transition={{ duration: 0.4 }}
              />
            </div>

            {/* Animated particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(isHovered ? 20 : 10)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  initial={{ 
                    x: Math.random() * 100 + '%',
                    y: Math.random() * 100 + '%',
                    opacity: 0.1
                  }}
                  animate={{
                    y: [null, '-100%'],
                    opacity: [0.1, 0.5, 0.1],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                    ease: "linear"
                  }}
                />
              ))}
            </div>

            {/* Content */}
            <div className="relative h-full flex flex-col justify-between p-8 md:p-12 text-white z-10">
              {/* Center content (default state) */}
              <motion.div
                className="flex-1 flex flex-col items-center justify-center"
                animate={{
                  opacity: isHovered ? 0 : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center">
                  {/* Icon */}
                  <div className="mb-6 inline-block">
                    <div className={`p-5 md:p-6 rounded-2xl bg-gradient-to-br ${column.gradient} shadow-2xl`}>
                      <IconComponent className="w-12 h-12 md:w-16 md:h-16" />
                    </div>
                  </div>

                  {/* Title - Large and centered */}
                  <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold">
                    {column.title}
                  </h2>
                </div>
              </motion.div>

              {/* Hover state - Content appears */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 p-8 md:p-12 flex flex-col"
                  >
                    {/* Top Section */}
                    <div className="mb-auto">
                      {/* Icon */}
                      <motion.div
                        initial={{ scale: 0.8, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        className="mb-6"
                      >
                        <div className={`inline-block p-4 md:p-5 rounded-2xl bg-gradient-to-br ${column.gradient} shadow-2xl`}>
                          <IconComponent className="w-8 h-8 md:w-12 md:h-12" />
                        </div>
                      </motion.div>

                      {/* Title */}
                      <motion.h2 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-bold mb-3"
                      >
                        {column.title}
                      </motion.h2>

                      {/* Subtitle */}
                      <motion.p 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.15 }}
                        className="text-xl md:text-2xl text-white/90 mb-6"
                      >
                        {column.subtitle}
                      </motion.p>
                    </div>

                    {/* Middle Section - Description & Features */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="flex-1 flex flex-col justify-center space-y-6 mb-auto"
                    >
                      <p className="text-lg md:text-xl text-white/90 max-w-md">
                        {column.description}
                      </p>

                      {/* Features */}
                      <div className="space-y-3">
                        {column.features.map((feature, i) => (
                          <motion.div
                            key={feature}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.25 + i * 0.05 }}
                            className="flex items-center gap-3"
                          >
                            <AccentIcon className="w-5 h-5 text-white/80" />
                            <span className="text-white/90 font-medium">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    {/* Bottom Section - CTA */}
                    <div className="mt-auto">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex items-center gap-3 text-white"
                      >
                        <span className="text-lg md:text-xl font-semibold">
                          Explore Work
                        </span>
                        <ArrowRight className="w-6 h-6" />
                      </motion.div>

                      {/* Decorative line */}
                      <motion.div
                        className={`h-1 mt-4 rounded-full bg-gradient-to-r ${column.gradient}`}
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.4, delay: 0.35 }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Hover border */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{
                boxShadow: isHovered 
                  ? 'inset 0 0 0 3px rgba(255,255,255,0.3)' 
                  : 'inset 0 0 0 3px rgba(255,255,255,0)',
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
        );
      })}

      {/* Bottom instruction bar */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-md py-4 px-8 z-20"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between text-white/80 text-sm md:text-base">
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 bg-white rounded-full"
            />
            <span>Hover to explore • Click to dive in</span>
          </div>
          
          <div className="font-semibold">
            Shu Han — Portfolio 2025
          </div>
        </div>
      </motion.div>

      {/* Intro Overlay */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-30 bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center"
          >
            {/* Animated background particles */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(50)].map((_, i) => (
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
            <div className="relative z-10 text-center px-4 max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight">
                  Hi! I'm{" "}
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
                    Shu Han
                  </span>
                </h1>
              </motion.div>

              <motion.p
                className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                A creative technologist passionate about building innovative solutions,
                capturing beautiful moments, and crafting unique experiences.
              </motion.p>

              <motion.button
                onClick={() => setShowIntro(false)}
                className="group relative inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white font-medium hover:bg-white/20 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Explore My Work</span>
                <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
              </motion.button>

              {/* Skip hint */}
              <motion.p
                className="text-sm text-gray-500 mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                or scroll down to continue
              </motion.p>
            </div>

            {/* Scroll indicator */}
            <motion.div
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: [0, 1, 0], y: [0, 10, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 1.5,
              }}
            >
              <ChevronDown className="w-8 h-8 text-white/50" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
