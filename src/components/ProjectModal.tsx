'use client';
import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, ExternalLink, Github, FileText, Calendar } from 'lucide-react';
import { TechPill } from '@/components/tech-pill';
import type { Project } from '@/components/projects.data';

type Props = {
  open: boolean;
  onClose: () => void;
  project: Project;
};

export default function ProjectModal({ open, onClose, project }: Props) {
  const [mounted, setMounted] = React.useState(false);
  const closeRef = React.useRef<HTMLButtonElement | null>(null);

  React.useEffect(() => setMounted(true), []);
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  React.useEffect(() => {
    if (open) {
      // Use requestAnimationFrame to ensure focus happens after render
      requestAnimationFrame(() => {
        closeRef.current?.focus();
      });
    }
  }, [open]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
        >
          <div className="absolute inset-0 bg-black/70" onClick={onClose} />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} details`}
            className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0B0B0D] border border-white/10 shadow-2xl"
            initial={{ y: 16, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 16, scale: 0.98, opacity: 0 }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 30,
              mass: 0.8,
            }}
          >
            <button
              ref={closeRef}
              aria-label="Close"
              onClick={onClose}
              className="absolute right-4 top-4 z-10 rounded-lg p-2 text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Project Image */}
            <div className="relative h-64 w-full overflow-hidden rounded-t-2xl">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 80vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

              {/* Featured Badge */}
              {project.featured && (
                <div className="absolute top-4 left-4">
                  <TechPill variant="brand" className="text-sm">
                    Featured Project
                  </TechPill>
                </div>
              )}
            </div>

            <div className="p-6 space-y-6">
              {/* Header */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-neutral-400">
                  <Calendar className="h-4 w-4" />
                  <span>{project.year}</span>
                  <span>•</span>
                  <div className="flex flex-wrap gap-1">
                    {project.categories.map(category => (
                      <span
                        key={category}
                        className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-white">{project.title}</h2>
                <p className="text-lg text-neutral-300">{project.tagline}</p>
              </div>

              {/* Description */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white">About</h3>
                <p className="text-neutral-300 leading-relaxed">{project.description}</p>
              </div>

              {/* Key Achievements */}
              {project.bullets && project.bullets.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-white">Key Achievements</h3>
                  <ul className="space-y-2">
                    {project.bullets.map((bullet, index) => (
                      <li key={index} className="flex items-start gap-3 text-neutral-300">
                        <span className="text-pink-400 mt-1.5 text-sm">•</span>
                        <span className="leading-relaxed">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tech Stack */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map(tech => (
                    <TechPill key={tech} variant="secondary">
                      {tech}
                    </TechPill>
                  ))}
                </div>
              </div>

              {/* Links */}
              {Object.values(project.links).some(link => link && link !== '#TODO') && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-white">Links</h3>
                  <div className="flex flex-wrap gap-3">
                    {project.links.github && project.links.github !== '#TODO' && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-white hover:border-pink-400/30 hover:text-pink-300 transition-colors"
                      >
                        <Github className="h-4 w-4" />
                        View Code
                      </a>
                    )}
                    {project.links.demo && project.links.demo !== '#TODO' && (
                      <a
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-white hover:border-pink-400/30 hover:text-pink-300 transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Live Demo
                      </a>
                    )}
                    {project.links.docs && project.links.docs !== '#TODO' && (
                      <a
                        href={project.links.docs}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-white hover:border-pink-400/30 hover:text-pink-300 transition-colors"
                      >
                        <FileText className="h-4 w-4" />
                        Documentation
                      </a>
                    )}
                    {project.links.report && project.links.report !== '#TODO' && (
                      <a
                        href={project.links.report}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-white hover:border-pink-400/30 hover:text-pink-300 transition-colors"
                      >
                        <FileText className="h-4 w-4" />
                        Report
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
