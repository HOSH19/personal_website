import { Camera, Aperture, Image as ImageIcon, X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion, AnimatePresence } from "motion/react";
import { useState, useRef } from "react";

export function PhotographySection() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);
  const sectionRef = useRef(null);

  const categories = [
    { id: "all", name: "All Work", icon: ImageIcon },
    { id: "antelope-canyon", name: "Antelope Canyon", icon: Camera },
    { id: "switzerland", name: "Switzerland", icon: Aperture },
    { id: "misc", name: "Misc", icon: Camera },
  ];

  // Upload your images/videos to: /public/images/photography/
  // Supports: .jpg, .png, .webp (images) and .mp4, .mov, .webm (videos)
  const allImages = [
    { url: "/images/photography/1.jpeg", category: "misc", title: "Cinque Terre" },
    { url: "/images/photography/2.jpeg", category: "misc", title: "Cinque Terre" },
    { url: "/images/photography/3.jpeg", category: "misc", title: "Plitvice Lakes" },
    { url: "/images/photography/4.jpeg", category: "misc", title: "Plitvice Lakes" },
    { url: "/images/photography/5.jpeg", category: "misc", title: "Plitvice Lakes" },
    { url: "/images/photography/6.jpeg", category: "misc", title: "Great Pyramid of Giza" },
    { url: "/images/photography/7.jpeg", category: "misc", title: "Colosseum" },
    { url: "/images/photography/8.jpeg", category: "antelope-canyon", title: "Antelope Canyon" },
    { url: "/images/photography/9.jpeg", category: "antelope-canyon", title: "Antelope Canyon" },
    { url: "/images/photography/10.jpeg", category: "antelope-canyon", title: "Antelope Canyon" },
    { url: "/images/photography/11.jpeg", category: "switzerland", title: "Switzerland" },
    { url: "/images/photography/12.jpeg", category: "switzerland", title: "Switzerland" },
    { url: "/images/photography/13.jpeg", category: "switzerland", title: "Switzerland" },
    { url: "/images/photography/14.jpeg", category: "switzerland", title: "Switzerland" },
    { url: "/images/photography/15.jpeg", category: "switzerland", title: "Switzerland" },
    { url: "/images/photography/16.jpeg", category: "antelope-canyon", title: "Antelope Canyon" },
  ];

  // Helper function to detect if a file is a video
  const isVideo = (url: string) => {
    const videoExtensions = ['.mp4', '.mov', '.webm', '.avi'];
    return videoExtensions.some(ext => url.toLowerCase().endsWith(ext));
  };

  const filteredImages = selectedCategory === "all" 
    ? allImages 
    : allImages.filter(img => img.category === selectedCategory);

  const openLightbox = (url: string, index: number) => {
    setLightboxImage(url);
    setLightboxIndex(index);
  };

  const closeLightbox = () => setLightboxImage(null);

  const navigate = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'next' 
      ? (lightboxIndex + 1) % filteredImages.length
      : (lightboxIndex - 1 + filteredImages.length) % filteredImages.length;
    setLightboxIndex(newIndex);
    setLightboxImage(filteredImages[newIndex].url);
  };

  return (
    <section ref={sectionRef} id="photography" className="min-h-screen py-20 px-4 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
        >
          <motion.div 
            initial={{ scale: 0, rotate: 180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl shadow-lg">
              <Camera className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-5xl font-bold text-white">
              Capture
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Got into photography a year ago! Open to learning more!
          </motion.p>
        </motion.div>

        {/* Category filter - Pill buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center gap-3 mb-12 flex-wrap"
        >
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            const isActive = selectedCategory === category.id;
            
            return (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 300 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2 ${
                  isActive
                    ? 'bg-white text-gray-800 shadow-lg'
                    : 'bg-gray-800 text-gray-200 hover:bg-gray-700 shadow-md'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                {category.name}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Gallery - Masonry style */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4"
          >
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.url}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                whileHover={{ scale: 1.02 }}
                className="break-inside-avoid relative group cursor-pointer rounded-2xl overflow-hidden shadow-lg"
                onClick={() => openLightbox(image.url, index)}
              >
                {isVideo(image.url) ? (
                  <video
                    src={image.url}
                    className="w-full h-auto"
                    muted
                    loop
                    playsInline
                    onMouseEnter={(e) => e.currentTarget.play()}
                    onMouseLeave={(e) => {
                      e.currentTarget.pause();
                      e.currentTarget.currentTime = 0;
                    }}
                  />
                ) : (
                  <ImageWithFallback
                    src={image.url}
                    alt={image.title}
                    className="w-full h-auto"
                  />
                )}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6"
                >
                  <h4 className="text-white font-bold text-lg mb-2">{image.title}</h4>
                  <div className="flex items-center gap-2 text-white/80">
                    <ZoomIn className="w-4 h-4" />
                    <span className="text-sm">Click to {isVideo(image.url) ? 'play' : 'view'}</span>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 relative rounded-3xl overflow-hidden shadow-2xl"
        >
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-8 h-8" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); navigate('prev'); }}
              className="absolute left-4 text-white p-3 hover:bg-white/10 rounded-full transition-colors"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); navigate('next'); }}
              className="absolute right-4 text-white p-3 hover:bg-white/10 rounded-full transition-colors"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {isVideo(lightboxImage) ? (
              <motion.video
                key={lightboxImage}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                src={lightboxImage}
                className="max-w-full max-h-full object-contain"
                controls
                autoPlay
                loop
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <motion.img
                key={lightboxImage}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                src={lightboxImage}
                alt="Gallery image"
                className="max-w-full max-h-full object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
