import { Github, Linkedin, Mail, Twitter, Instagram, Heart, ArrowUp } from "lucide-react";
import { motion } from "motion/react";

export function Footer() {
  const socialLinks = [
    { icon: Github, href: "https://github.com/HOSH19", label: "GitHub", color: "hover:text-gray-900" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/shu-han-ho-910509200", label: "LinkedIn", color: "hover:text-blue-600" },
    { icon: Instagram, href: "https://www.instagram.com/shu_hannn/", label: "Instagram", color: "hover:text-pink-600" },
    { icon: Mail, href: "mailto:hoshuhan@gmail.com", label: "Email", color: "hover:text-red-600" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative text-white overflow-hidden backdrop-blur-sm">{/* Transparent background */}

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
        {/* Main content */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl font-bold mb-6 text-white"
          >
            Let's Create Together
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white max-w-2xl mx-auto mb-10"
          >
            Whether you're interested in AI development, photography, 
            or music, I'd love to hear from you.
          </motion.p>
        </div>

        {/* Social links */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center gap-6 mb-16"
        >
          {socialLinks.map((link, index) => {
            const IconComponent = link.icon;
            return (
              <motion.a
                key={index}
                href={link.href}
                aria-label={link.label}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.1, type: "spring", stiffness: 300 }}
                className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 flex items-center justify-center transition-all text-white group relative"
              >
                <IconComponent className="w-6 h-6" />
                <span className="absolute -bottom-8 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  {link.label}
                </span>
              </motion.a>
            );
          })}
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mb-10"
        />

        {/* Bottom section */}
        <div className="flex flex-col items-center justify-center gap-6 text-white text-sm text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 justify-center"
          >
            © 2025 Shu Han. Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> and code
          </motion.p>

        </div>
      </div>
    </footer>
  );
}
