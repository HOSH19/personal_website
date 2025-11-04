import { Brain, Code, Sparkles, GitBranch, ExternalLink, Terminal, Cpu, Zap, X, Github } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { useState, useRef, useEffect } from "react";

export function AISection() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const sectionRef = useRef(null);

  // Set first project as selected on desktop only, after mount
  useEffect(() => {
    if (!isInitialized) {
      // Check on next frame to ensure mobile detection has run
      requestAnimationFrame(() => {
        const isDesktop = window.innerWidth >= 768;
        if (isDesktop) {
          setSelectedProject(0);
        }
        setIsInitialized(true);
      });
    }
  }, [isInitialized]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  const projects = [
    {
      title: "RAG for Computer Use Agents",
      description: "Built dynamic Retrieval-Augmented Generation for Computer Use Agent framework at CSIT.",
      details: [
        "Developed agentic/dynamic RAG for UI-TARS agent framework using LangChain and ChromaDB",
        "Re-engineered prompts to increase agent contextual accuracy",
        "Conducted inference on respective models"
      ],
      tags: ["LangChain", "ChromaDB", "Crawl4AI"],
      icon: Brain,
      metrics: { framework: "UI-TARS", models: "o4-mini, Sonnet-4, UI-TARS-1.5-7b, Qwen2.5-VL-7b-Instruct" },
      githubUrl: "https://github.com/HOSH19/BurpSuite-CUA-Final",
      color: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-500/10 to-cyan-500/10"
    },
    {
      title: "LLM Finetuning for AMR Parsing",
      description: "Research on finetuning Large Language Models for Abstract Meaning Representation at UCL.",
      details: [
        "Finetuned 4 open-source LLMs (LLaMA-3.2, Phi-3.5, DeepSeek-R1-LLaMA-Distilled, Gemma-2)",
        "Achieved SMATCH F1: 0.804 on LDC2020T02 dataset, matching SOTA parsers like APT+ Silver",
        "Conducted inference on 4 models using Silver Maximum Bayes SMATCH Ensemble (MBSE) Silver data."
      ],
      tags: ["PyTorch", "Transformers", "Wandb"],
      icon: Sparkles,
      metrics: { SMATCH_F1: "0.804", publication: "arXiv 2025" },
      publicationUrl: "https://arxiv.org/abs/2508.05028",
      githubUrl: "https://github.com/HOSH19/AMR_LLM_Finetuning",
      color: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-500/10 to-pink-500/10"
    },
    {
      title: "Multimodal Vision Pipeline",
      description: "Image generation and classification pipeline using state-of-the-art vision models at DSTA.",
      details: [
        "Built multi-LLM image generation pipeline to beat SOTA detectors (e.g. Hive)",
        "Finetuned Idefics2-8B for image modification classification tasks"
      ],
      tags: ["Stable Diffusion", "Florence-2", "TorchVision"],
      icon: Code,
      metrics: { SOTA_detection: "Beat Hive", models: "SD3, FLUX, Florence-2, Idefics2-8B" },
      color: "from-orange-500 to-red-500",
      bgGradient: "from-orange-500/10 to-red-500/10"
    },
  ];

  const skills = [
    { name: "PyTorch", icon: Brain },
    { name: "Transformers", icon: Sparkles },
    { name: "LangChain", icon: GitBranch },
    { name: "OpenCV", icon: Zap },
    { name: "Scikit-learn", icon: Cpu },
    { name: "Wandb", icon: Code },
    { name: "Stable Diffusion", icon: Sparkles },
    { name: "ChromaDB", icon: Terminal },
    { name: "Mediapipe", icon: Zap },
    { name: "PyAutoGUI", icon: Brain },
    { name: "NutJS", icon: Code },
    { name: "Nuitka", icon: Sparkles }
  ];

  return (
    <section ref={sectionRef} id="ai" className="min-h-screen py-20 px-4 relative overflow-hidden">
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/50 rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              opacity: 0.1
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          style={{ opacity, scale }}
          className="text-center mb-20"
        >
          <motion.div 
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl shadow-lg">
              <Code className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-5xl font-bold text-white">
              Code
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-xl text-white max-w-3xl mx-auto"
          >
            Experiences in LLM Supervised Finetuning and AI Agents. <br />
            Currently interested in Reinforcement Learning and Model Fairness!
          </motion.p>
        </motion.div>

        {/* Projects showcase - Split screen design */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20 relative">
          {/* Left: Project selector */}
          <div className="space-y-4">
            {projects.map((project, index) => {
              const IconComponent = project.icon;
              const isSelected = selectedProject === index;
              const isHovered = hoveredProject === index;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredProject(index)}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => setSelectedProject(index)}
                  className="cursor-pointer relative"
                >
                  <motion.div
                    animate={{
                      scale: isSelected ? 1.02 : isHovered ? 1.01 : 1,
                    }}
                    className={`p-6 rounded-2xl border-2 transition-all duration-300 backdrop-blur-sm ${
                      isSelected 
                        ? 'border-black/30 bg-gray-800/70 shadow-xl' 
                        : 'border-transparent bg-gray-800/50 hover:bg-gray-800/70 shadow-md hover:shadow-lg'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <motion.div
                        animate={{
                          rotate: isHovered ? 360 : 0,
                          scale: isSelected ? 1.1 : 1
                        }}
                        transition={{ duration: 0.5 }}
                        className="p-3 rounded-xl bg-white/20 backdrop-blur-sm shadow-lg"
                      >
                        <IconComponent className="w-6 h-6 text-white" />
                      </motion.div>
                      
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">
                          {project.title}
                        </h3>
                        <p className="text-white text-sm mb-3">
                          {project.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag, tagIndex) => (
                            <motion.span
                              key={tagIndex}
                              initial={{ scale: 0 }}
                              whileInView={{ scale: 1 }}
                              transition={{ delay: 0.3 + tagIndex * 0.1 }}
                              className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-gray-700 to-gray-600 text-white rounded-full"
                            >
                              {tag}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>

                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Right: Project details */}
          <div className="hidden lg:block lg:sticky lg:top-24 h-fit">
            <AnimatePresence mode="wait">
              {selectedProject !== null && (
                <motion.div
                  key={selectedProject}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gray-800/70 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-gray-700"
                >
                  
                  <div className="p-8">
                    <h4 className="text-2xl font-bold text-white mb-4">
                      Project Details
                    </h4>
                    <ul className="text-white leading-relaxed mb-6 space-y-3">
                      {projects[selectedProject].details.map((detail, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * index }}
                          className="flex items-start gap-3"
                        >
                          <span className="text-white mt-1 font-bold">•</span>
                          <span>{detail}</span>
                        </motion.li>
                      ))}
                    </ul>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {Object.entries(projects[selectedProject].metrics).map(([key, value], index) => {
                        const isPublication = key === "publication";
                        const MetricContainer = isPublication ? motion.a : motion.div;
                        const extraProps = isPublication 
                          ? { 
                              href: projects[selectedProject].publicationUrl,
                              target: "_blank",
                              rel: "noopener noreferrer"
                            } 
                          : {};
                        
                        return (
                        <MetricContainer
                          key={key}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.1 + index * 0.1, type: "spring" }}
                          className={`p-4 rounded-xl backdrop-blur-sm border ${
                            isPublication 
                              ? 'bg-red-500/20 border-red-400/50 cursor-pointer hover:bg-red-500/30 hover:border-red-400/70 transition-colors group' 
                              : 'bg-gray-800/70 border-gray-700'
                          }`}
                          {...extraProps}
                        >
                          <div className="text-2xl font-bold text-white flex items-center gap-2">
                            {value}
                            {isPublication && (
                              <ExternalLink className="w-4 h-4 text-white" />
                            )}
                          </div>
                          <div className="text-sm text-white/70 capitalize mt-1">{key.replace(/_/g, ' ')}</div>
                        </MetricContainer>
                        );
                      })}
                    </div>

                    {projects[selectedProject].githubUrl && (
                      <motion.a
                        href={projects[selectedProject].githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3 px-6 rounded-xl bg-white text-gray-900 font-medium shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-2"
                      >
                        GitHub <Github className="w-6 h-6" />
                      </motion.a>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile: Fixed bottom sheet for project details */}
          <AnimatePresence>
            {selectedProject !== null && (
              <motion.div
                key={`mobile-${selectedProject}`}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-gray-800/95 backdrop-blur-md rounded-t-3xl shadow-2xl border-t border-gray-700 max-h-[70vh] overflow-y-auto"
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-2xl font-bold text-white">
                      Project Details
                    </h4>
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                      <X className="w-6 h-6 text-white" />
                    </button>
                  </div>
                  
                  <ul className="text-white leading-relaxed mb-6 space-y-3">
                    {projects[selectedProject].details.map((detail, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="flex items-start gap-3"
                      >
                        <span className="text-white mt-1 font-bold">•</span>
                        <span>{detail}</span>
                      </motion.li>
                    ))}
                  </ul>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {Object.entries(projects[selectedProject].metrics).map(([key, value], index) => {
                      const isPublication = key === "publication";
                      const MetricContainer = isPublication ? motion.a : motion.div;
                      const extraProps = isPublication 
                        ? { 
                            href: projects[selectedProject].publicationUrl,
                            target: "_blank",
                            rel: "noopener noreferrer"
                          } 
                        : {};
                      
                      return (
                        <MetricContainer
                          key={key}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.1 + index * 0.1, type: "spring" }}
                          className={`p-4 rounded-xl backdrop-blur-sm border ${
                            isPublication 
                              ? 'bg-red-500/20 border-red-400/50 cursor-pointer hover:bg-red-500/30 hover:border-red-400/70 transition-colors group' 
                              : 'bg-gray-800/70 border-gray-700'
                          }`}
                          {...extraProps}
                        >
                          <div className="text-2xl font-bold text-white flex items-center gap-2">
                            {value}
                            {isPublication && (
                              <ExternalLink className="w-4 h-4 text-white" />
                            )}
                          </div>
                          <div className="text-sm text-white/70 capitalize mt-1">{key.replace(/_/g, ' ')}</div>
                        </MetricContainer>
                      );
                    })}
                  </div>

                  {projects[selectedProject].githubUrl && (
                    <motion.a
                      href={projects[selectedProject].githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 px-6 rounded-xl bg-white text-gray-900 font-medium shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-2"
                    >
                      GitHub <Github className="w-6 h-6" />
                    </motion.a>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Skills grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <h3 className="text-3xl font-bold text-center text-white mb-10">
            Libraries & Frameworks
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {skills.map((skill, index) => {
              const IconComponent = skill.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, type: "spring", stiffness: 300 }}
                  className="p-4 bg-gray-800/70 backdrop-blur-sm rounded-xl shadow-md cursor-pointer"
                >
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <IconComponent className="w-6 h-6 text-white mb-2 mx-auto" />
                  </motion.div>
                  <p className="text-sm font-medium text-white text-center">
                    {skill.name}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
