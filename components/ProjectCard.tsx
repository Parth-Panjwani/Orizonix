"use client";

import { motion } from "framer-motion";
import { Project } from "@/types/portfolio";
import { useState } from "react";
import Image from "next/image";

interface ProjectCardProps {
  project: Project;
  delay?: number;
  onClick: () => void;
}

export default function ProjectCard({
  project,
  delay = 0,
  onClick,
}: ProjectCardProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="relative group cursor-pointer overflow-hidden rounded-2xl glass transition-all duration-300 border border-gray-200 dark:border-gray-700"
      style={{ willChange: "transform" }}
    >
      {/* Minimal abstract corner element */}
      <div className="absolute top-0 left-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background:
              "linear-gradient(135deg, rgba(102, 126, 234, 0.08), transparent)",
            clipPath: "polygon(0 0, 100% 0, 0 100%)",
          }}
        />
      </div>

      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden">
        {!imageError && project.images?.[0] ? (
          <>
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900 dark:to-primary-800 animate-pulse" />
            )}
            <Image
              src={project.images[0]}
              alt={project.title}
              fill
              className={`object-cover transition-opacity duration-300 group-hover:scale-105 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              unoptimized
              style={{ willChange: "transform" }}
            />
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900 dark:to-primary-800 flex items-center justify-center">
            <div className="text-4xl opacity-50">
              {project.type === "digital-creative" && "🎨"}
              {project.type === "website" && "💻"}
              {project.type === "automation" && "⚡"}
            </div>
          </div>
        )}

        {/* Project Type Badge */}
        <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold glass text-gray-900 dark:text-white z-20">
          {project.type === "digital-creative" && "Creative"}
          {project.type === "website" && "Website"}
          {project.type === "automation" && "Automation"}
        </div>

        {/* Live Preview Indicator */}
        {project.liveUrl && (
          <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold bg-green-500 text-white z-20">
            Live
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-accent-dark transition-colors duration-200">
          {project.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs rounded-md glass text-gray-700 dark:text-gray-300"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="px-2 py-1 text-xs rounded-md glass text-gray-700 dark:text-gray-300">
              +{project.tags.length - 3}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
