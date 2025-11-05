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
  const gradientClasses = {
    "digital-creative": "from-neon-pink to-neon-purple",
    website: "from-neon-blue to-neon-cyan",
    automation: "from-neon-purple to-neon-blue",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -10, scale: 1.02 }}
      onClick={onClick}
      className="relative group cursor-pointer overflow-hidden rounded-2xl bg-dark-surface border border-dark-border"
    >
      {/* Image Container */}
      <div className="relative h-64 w-full overflow-hidden">
        {!imageError && project.images?.[0] ? (
          <Image
            src={project.images[0]}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            onError={() => setImageError(true)}
            unoptimized
          />
        ) : (
          <div
            className={`w-full h-full bg-gradient-to-br ${gradientClasses[project.type]} opacity-20 flex items-center justify-center`}
          >
            <div className="text-4xl opacity-50">
              {project.type === "digital-creative" && "🎨"}
              {project.type === "website" && "💻"}
              {project.type === "automation" && "⚡"}
            </div>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/90 via-dark-bg/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Project Type Badge */}
        <div
          className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${gradientClasses[project.type]} text-white`}
        >
          {project.type === "digital-creative" && "Creative"}
          {project.type === "website" && "Website"}
          {project.type === "automation" && "Automation"}
        </div>

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold bg-neon-blue text-dark-bg">
            Featured
          </div>
        )}

        {/* Live Preview Indicator */}
        {project.liveUrl && (
          <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full text-xs font-semibold bg-green-500 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
            <span>🔗</span> Live
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-neon-blue transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs rounded-md bg-dark-border text-gray-400"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="px-2 py-1 text-xs rounded-md bg-dark-border text-gray-400">
              +{project.tags.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div
        className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br ${gradientClasses[project.type]} blur-xl -z-10`}
      />
    </motion.div>
  );
}

