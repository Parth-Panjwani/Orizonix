"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/types/portfolio";
import { useState } from "react";
import Image from "next/image";
// SVG Icons
const XIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const ExternalLinkIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
);

const ChevronLeftIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({
  project,
  isOpen,
  onClose,
}: ProjectModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!project) return null;

  const gradientClasses = {
    "digital-creative": "from-neon-pink to-neon-purple",
    website: "from-neon-blue to-neon-cyan",
    automation: "from-neon-purple to-neon-blue",
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === project.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 z-50 overflow-y-auto"
          >
            <div className="relative bg-dark-surface border border-dark-border rounded-2xl overflow-hidden max-w-6xl mx-auto">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-50 p-2 rounded-full bg-dark-bg/80 border border-dark-border hover:bg-dark-border transition-colors"
              >
                <XIcon />
              </button>

              {/* Image Gallery */}
              <div className="relative h-96 md:h-[500px] w-full bg-dark-bg">
                {project.images && project.images.length > 0 ? (
                  <>
                    <Image
                      src={project.images[currentImageIndex]}
                      alt={`${project.title} - Image ${currentImageIndex + 1}`}
                      fill
                      className="object-cover"
                      unoptimized
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                      }}
                    />

                    {/* Navigation Arrows */}
                    {project.images.length > 1 && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            prevImage();
                          }}
                          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-dark-bg/80 border border-dark-border hover:bg-dark-border transition-colors"
                        >
                          <ChevronLeftIcon />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            nextImage();
                          }}
                          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-dark-bg/80 border border-dark-border hover:bg-dark-border transition-colors"
                        >
                          <ChevronRightIcon />
                        </button>
                      </>
                    )}

                    {/* Image Indicators */}
                    {project.images.length > 1 && (
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {project.images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`h-2 rounded-full transition-all ${
                              index === currentImageIndex
                                ? "w-8 bg-neon-blue"
                                : "w-2 bg-white/30"
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <div
                    className={`w-full h-full bg-gradient-to-br ${gradientClasses[project.type]} opacity-20 flex items-center justify-center`}
                  >
                    <div className="text-6xl opacity-50">
                      {project.type === "digital-creative" && "🎨"}
                      {project.type === "website" && "💻"}
                      {project.type === "automation" && "⚡"}
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r ${gradientClasses[project.type]} text-white`}
                      >
                        {project.type === "digital-creative" && "Digital Creative"}
                        {project.type === "website" && "Web Development"}
                        {project.type === "automation" && "AI Automation"}
                      </span>
                      {project.year && (
                        <span className="text-gray-400 text-sm">{project.year}</span>
                      )}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                      {project.title}
                    </h2>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      {project.longDescription || project.description}
                    </p>
                  </div>

                  {project.liveUrl && (
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-6 py-3 bg-neon-blue text-dark-bg font-semibold rounded-lg hover:bg-neon-cyan transition-colors whitespace-nowrap"
                    >
                      <ExternalLinkIcon />
                      View Live Site
                    </motion.a>
                  )}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-md bg-dark-border text-gray-300 text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

