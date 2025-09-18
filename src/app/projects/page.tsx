"use client";
import { projects } from "@/components/projects.data";
import FeaturedCarousel from "@/components/FeaturedCarousel";
import ProjectCard from "@/components/ProjectCard";
import ProjectFilters, { useProjectFilters } from "@/components/ProjectFilters";
import { motion } from "framer-motion";

export default function ProjectsPage() {
  const featuredProjects = projects.filter(p => p.featured);
  const { filters, updateFilters, clearFilters, allTech, filteredProjects, CATEGORIES } = useProjectFilters(projects);

  return (
    <main className="relative min-h-screen">
      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* Header */}
        <motion.div 
          className="text-center space-y-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-white">
            My Projects
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            A collection of my work in embedded systems, AI/ML, cloud architecture, 
            and software engineering. Each project represents a unique challenge 
            and learning opportunity.
          </p>
        </motion.div>

        {/* Featured Carousel */}
        {featuredProjects.length > 0 && (
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            <FeaturedCarousel projects={featuredProjects} />
          </motion.div>
        )}

        {/* Filters */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        >
          <ProjectFilters
            filters={filters}
            updateFilters={updateFilters}
            clearFilters={clearFilters}
            allTech={allTech}
            categories={CATEGORIES}
          />
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          className="space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
        >
          {filteredProjects.length > 0 ? (
            <>
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">
                  All Projects ({filteredProjects.length})
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white/80">No projects found</h3>
                <p className="text-white/60">
                  No projects match your current filters. Try adjusting your search or category selection.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2 rounded-xl border border-white/10 bg-white/5 text-white hover:border-pink-400/30 hover:text-pink-300 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </main>
  );
}