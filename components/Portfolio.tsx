"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Project, ProjectType } from "@/types/portfolio";
import { projectTypes } from "@/types/portfolio";
import { portfolioProjects } from "@/data/portfolio";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";

export default function Portfolio() {
  const [selectedType, setSelectedType] = useState<ProjectType | "all">("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredProjects =
    selectedType === "all"
      ? portfolioProjects
      : portfolioProjects.filter((project) => project.type === selectedType);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <section
      id="portfolio"
      className="py-24 px-4 md:px-8 relative overflow-hidden"
    >
      {/* Creative background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-blue/5 rounded-full blur-3xl creative-blob" />
      <div
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl creative-blob"
        style={{ animationDelay: "5s" }}
      />

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.h2 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="gradient-text">Our Portfolio</span>
          </motion.h2>
          <p className="text-xl text-gray-400">
            Showcasing creative excellence across digital design, development,
            and automation
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <button
            onClick={() => setSelectedType("all")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              selectedType === "all"
                ? "bg-neon-blue text-dark-bg"
                : "bg-dark-surface border border-dark-border text-gray-400 hover:border-neon-blue hover:text-neon-blue"
            }`}
          >
            All Projects
          </button>
          {projectTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => setSelectedType(type.value)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                selectedType === type.value
                  ? "bg-neon-blue text-dark-bg"
                  : "bg-dark-surface border border-dark-border text-gray-400 hover:border-neon-blue hover:text-neon-blue"
              }`}
            >
              {type.label}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          key={selectedType}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              delay={index * 0.1}
              onClick={() => handleProjectClick(project)}
            />
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-gray-400 text-xl">
              No projects found in this category.
            </p>
          </motion.div>
        )}

        {/* Project Count */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          {/* <p className="text-gray-400">
            Showing <span className="text-neon-blue font-semibold">{filteredProjects.length}</span>{" "}
            {selectedType === "all" ? "projects" : projectTypes.find(t => t.value === selectedType)?.label.toLowerCase()}
          </p> */}
        </motion.div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}
