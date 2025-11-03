import { Music } from "lucide-react";
import { motion } from "motion/react";
import { useRef } from "react";

export function MusicSection() {
  const sectionRef = useRef(null);

  return (
    <section ref={sectionRef} id="music" className="min-h-screen py-20 px-4 relative overflow-hidden">
      <div className="max-w-[95%] mx-auto relative z-10">
        {/* Section Header at Top */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center gap-3">
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl shadow-lg">
              <Music className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-5xl font-bold text-white">
              Create
            </h2>
          </div>
        </motion.div>

        {/* Two Column Layout - Video takes majority */}
        <div className="grid lg:grid-cols-[1fr_2.5fr] gap-8 w-full items-center">
          {/* Left: Small Text Box */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gray-800/10 backdrop-blur-md rounded-2xl p-8 shadow-xl"
          >
            {/* Description */}
            <p className="text-lg text-white leading-relaxed">
              Dabbles in acoustic guitar/bass guitar/keyboard sometimes! 
            </p>
          </motion.div>

          {/* Right: Video */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-2xl overflow-hidden shadow-2xl"
          >
            <video
              src="/images/photography/music.mp4"
              className="w-full aspect-video object-cover"
              controls
              playsInline
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
