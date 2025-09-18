"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Github, FileText } from "lucide-react";
import { TechPill } from "@/components/tech-pill";
import ProjectModal from "@/components/ProjectModal";
import type { Project } from "@/components/projects.data";

const ACCENT = "rgb(255, 75, 138)";
const BASE = "rgb(229, 231, 235)"; // ~text-neutral-200

export default function ProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);
  const [hoverEnabled, setHoverEnabled] = React.useState(true);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  // Hotspot writer
  const setHoverVars = (el: HTMLElement, x: number, y: number, show = true) => {
    el.style.setProperty("--ui-x", `${x}px`);
    el.style.setProperty("--ui-y", `${y}px`);
    el.style.setProperty("--ui-o", show ? "1" : "0");
  };

  // Reset hover state and CSS variables
  const resetHoverState = () => {
    setHovered(false);
    if (buttonRef.current) {
      buttonRef.current.style.setProperty("--ui-o", "0");
    }
  };

  // Handle modal state changes
  React.useEffect(() => {
    if (open) {
      // Modal is opening - reset hover state immediately
      resetHoverState();
      setHoverEnabled(false);
    } else {
      // Modal is closing - re-enable hover immediately
      setHoverEnabled(true);
    }
  }, [open]);

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      resetHoverState();
    };
  }, []);

  // Ripple
  const createRipple = (hostEl: HTMLElement, e: React.MouseEvent<HTMLElement>) => {
    const overlay = hostEl.querySelector(".project-ripple-host") as HTMLElement | null;
    const rect = hostEl.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    if (overlay) {
      const ripple = document.createElement("span");
      ripple.className = "project-ripple";
      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      overlay.appendChild(ripple);
      ripple.addEventListener("animationend", () => ripple.remove(), { once: true });
    }
  };

  // Mouse handlers for hotspot
  const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!hoverEnabled) return;
    const el = e.currentTarget as HTMLElement;
    const r = el.getBoundingClientRect();
    setHoverVars(el, e.clientX - r.left, e.clientY - r.top, true);
  };
  const onEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!hoverEnabled) return;
    setHovered(true);
    onMove(e);
  };
  const onLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!hoverEnabled) return;
    setHovered(false);
    (e.currentTarget as HTMLElement).style.setProperty("--ui-o", "0");
  };

  return (
    <>
      <motion.button
        ref={buttonRef}
        type="button"
        onClick={(e) => { 
          // Always allow clicks regardless of hover state
          createRipple(e.currentTarget, e); 
          resetHoverState(); // Reset immediately on click
          setOpen(true); 
        }}
        onMouseMove={onMove}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onMouseDown={resetHoverState} // Reset on mouse down for immediate feedback
        whileHover={hoverEnabled ? { y: -4, scale: 1.015 } : {}}
        whileTap={{ scale: 0.985 }}
        transition={{ type: "spring", stiffness: 300, damping: 22, mass: 0.7 }}
        className="project-card group relative w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-6 text-left outline-none focus-visible:ring-2 focus-visible:ring-accent-pink"
      >
        {/* ripple overlay */}
        <span className="project-ripple-host" />

        {/* Project Image */}
        <div className="relative mb-4 h-32 w-full overflow-hidden rounded-xl">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10 group-hover:ring-pink-500/20" />
        </div>

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-3 right-3">
            <TechPill variant="brand" className="text-xs">
              Featured
            </TechPill>
          </div>
        )}

        {/* Text Content */}
        <div className="space-y-3">
          <div>
            <motion.h3
              className="font-semibold text-lg"
              animate={{ color: (hovered && hoverEnabled) ? ACCENT : BASE }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              {project.title}
            </motion.h3>
            <motion.p
              className="text-sm text-neutral-400 mt-1"
              animate={{ color: (hovered && hoverEnabled) ? "rgba(255, 75, 138, 0.9)" : "rgb(156, 163, 175)" }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              {project.tagline}
            </motion.p>
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-1.5">
            {project.tech.slice(0, 4).map((tech) => (
              <TechPill key={tech} variant="secondary" className="text-xs">
                {tech}
              </TechPill>
            ))}
            {project.tech.length > 4 && (
              <TechPill variant="outline" className="text-xs">
                +{project.tech.length - 4}
              </TechPill>
            )}
          </div>

          {/* Quick Links */}
          <div className="flex items-center gap-3 text-sm">
            {project.links.demo && (
              <a 
                className="text-neutral-400 hover:text-pink-400 underline-offset-4 hover:underline flex items-center gap-1"
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="h-3 w-3" />
                Demo
              </a>
            )}
            {project.links.github && (
              <a 
                className="text-neutral-400 hover:text-pink-400 underline-offset-4 hover:underline flex items-center gap-1"
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="h-3 w-3" />
                Code
              </a>
            )}
            {project.links.docs && (
              <a 
                className="text-neutral-400 hover:text-pink-400 underline-offset-4 hover:underline flex items-center gap-1"
                href={project.links.docs}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <FileText className="h-3 w-3" />
                Docs
              </a>
            )}
          </div>
        </div>
      </motion.button>

      <ProjectModal
        open={open}
        onClose={() => setOpen(false)}
        project={project}
      />
    </>
  );
}
