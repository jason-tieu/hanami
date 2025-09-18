"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, ExternalLink } from "lucide-react";
import SectionWrapper from "@/components/SectionWrapper";
import UIButton from "@/components/UIButton";
import AccentButton from "@/components/AccentButton";
import { TechPill } from "@/components/tech-pill";
import { projects } from "@/components/projects.data";

export default function AboutPage() {
  // Get featured projects for highlights
  const featuredProjects = projects.filter(p => p.featured).slice(0, 3);
  
  const heroVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring" as const, 
        stiffness: 100, 
        damping: 20,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 20 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 20 }
    },
    hover: {
      y: -4,
      scale: 1.02,
      transition: { type: "spring" as const, stiffness: 300, damping: 20 }
    }
  };

  const pillVariants = {
    hover: {
      scale: 1.03,
      boxShadow: "0 4px 12px rgba(255, 75, 138, 0.3)",
      transition: { type: "spring" as const, stiffness: 400, damping: 20 }
    }
  };

  return (
    <main className="relative">
      {/* HERO SECTION */}
      <SectionWrapper className="overflow-hidden">
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <motion.div
            className="text-center space-y-8"
            variants={heroVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="space-y-4" variants={itemVariants}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                Hey, I&apos;m{" "}
                <span className="bg-gradient-to-r from-white to-brand bg-clip-text text-transparent">
                  Jason
                </span>
                {" "}— Full-Stack & AI Engineer
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                I build production-ready web apps and applied AI systems. Brisbane, Australia.
              </p>
            </motion.div>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={itemVariants}
            >
              <UIButton asChild variant="primary" className="text-lg px-8 py-6">
                <Link href="/projects" className="flex items-center gap-2">
                  View Projects
                  <ExternalLink className="h-5 w-5" />
                </Link>
              </UIButton>
              <AccentButton asChild variant="secondary" className="text-lg px-8 py-6">
                <Link href="mailto:jason.tieu04@gmail.com" className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Contact Me
                </Link>
              </AccentButton>
            </motion.div>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* MAIN CONTENT - TWO COLUMN LAYOUT */}
      <SectionWrapper>
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-16">
            {/* LEFT COLUMN */}
            <motion.div 
              className="space-y-12"
              variants={heroVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Short Bio */}
              <motion.div variants={itemVariants}>
                <h2 className="text-2xl font-semibold text-white mb-4">Short Bio</h2>
                <p className="text-muted-foreground leading-relaxed">
                  I&apos;m a final-year Computer & Software Systems Engineering student at QUT (GPA 6.0/7.0) 
                  focused on full-stack development, cloud deployment, and applied computer vision. I ship 
                  end-to-end systems - frontend UX, backend APIs, databases, and AWS infra - and I care about 
                  reliability, speed, and clean architecture. Recently, I&apos;ve been delivering an AI-based 
                  flood detection pipeline (PyTorch + GIS) and a video-processing platform on AWS ECS.
                </p>
              </motion.div>

              {/* What I Do */}
              <motion.div variants={itemVariants}>
                <h2 className="text-2xl font-semibold text-white mb-4">What I Do</h2>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-brand mt-1">•</span>
                    <span><strong>Full-Stack:</strong> Next.js, React, Node.js/Express, REST APIs, Auth, forms, dashboards</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand mt-1">•</span>
                    <span><strong>Backend/Data:</strong> PostgreSQL, MongoDB, schema design, caching (Redis), job queues</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand mt-1">•</span>
                    <span><strong>Cloud/DevOps:</strong> AWS ECS/Lambda/S3, Docker, Nginx, CI/CD, observability</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand mt-1">•</span>
                    <span><strong>AI/ML:</strong> PyTorch, DeepLabv3+, SRGAN, OpenCV, dataset curation & evaluation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand mt-1">•</span>
                    <span><strong>Ways of Working:</strong> Agile sprints, PR reviews, tickets, testing, docs, demos</span>
                  </li>
                </ul>
              </motion.div>

              {/* How I Work */}
              <motion.div variants={itemVariants}>
                <h2 className="text-2xl font-semibold text-white mb-4">How I Work</h2>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-brand mt-1">•</span>
                    <span><strong>Agile:</strong> Plan → build → test → ship. Short sprints, visible progress, demo early.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand mt-1">•</span>
                    <span><strong>Quality:</strong> Type-safe APIs, lint/format, unit tests where it counts, meaningful logs.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand mt-1">•</span>
                    <span><strong>Performance:</strong> Measure first; cache, paginate, stream; keep p95 honest.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand mt-1">•</span>
                    <span><strong>Collab:</strong> Clear tickets, design notes, PRs with context, no surprises.</span>
                  </li>
                </ul>
              </motion.div>
            </motion.div>

            {/* RIGHT COLUMN */}
            <motion.div 
              className="space-y-12"
              variants={heroVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Core Skills */}
              <motion.div variants={itemVariants}>
                <h2 className="text-2xl font-semibold text-white mb-4">Core Skills</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Frontend</h3>
                    <div className="flex flex-wrap gap-2">
                      {["Next.js", "React", "Tailwind", "Framer Motion"].map((skill) => (
                        <motion.div
                          key={skill}
                          variants={pillVariants}
                          whileHover="hover"
                        >
                          <TechPill variant="secondary">{skill}</TechPill>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Backend</h3>
                    <div className="flex flex-wrap gap-2">
                      {["Node.js", "Express", "Flask", "FastAPI", "Socket.IO"].map((skill) => (
                        <motion.div
                          key={skill}
                          variants={pillVariants}
                          whileHover="hover"
                        >
                          <TechPill variant="secondary">{skill}</TechPill>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Databases</h3>
                    <div className="flex flex-wrap gap-2">
                      {["PostgreSQL", "MongoDB", "Prisma/Knex", "Redis (ElastiCache)"].map((skill) => (
                        <motion.div
                          key={skill}
                          variants={pillVariants}
                          whileHover="hover"
                        >
                          <TechPill variant="secondary">{skill}</TechPill>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Cloud</h3>
                    <div className="flex flex-wrap gap-2">
                      {["AWS (ECS, Lambda, S3)", "Docker", "Nginx", "CI/CD"].map((skill) => (
                        <motion.div
                          key={skill}
                          variants={pillVariants}
                          whileHover="hover"
                        >
                          <TechPill variant="secondary">{skill}</TechPill>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">AI/ML</h3>
                    <div className="flex flex-wrap gap-2">
                      {["PyTorch", "segmentation", "super-resolution", "evaluation/metrics"].map((skill) => (
                        <motion.div
                          key={skill}
                          variants={pillVariants}
                          whileHover="hover"
                        >
                          <TechPill variant="secondary">{skill}</TechPill>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Languages</h3>
                    <div className="flex flex-wrap gap-2">
                      {["JavaScript/TypeScript", "Python", "Java", "C", "C#"].map((skill) => (
                        <motion.div
                          key={skill}
                          variants={pillVariants}
                          whileHover="hover"
                        >
                          <TechPill variant="secondary">{skill}</TechPill>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Recognition */}
              <motion.div variants={itemVariants}>
                <h2 className="text-2xl font-semibold text-white mb-4">Recognition</h2>
                <p className="text-muted-foreground">
                  QUT GPA 6.0/7.0 • ADF Future Innovators Award • QUT Summit Attendee (Selected Program)
                </p>
              </motion.div>

              {/* Tools */}
              <motion.div variants={itemVariants}>
                <h2 className="text-2xl font-semibold text-white mb-4">Tools I reach for</h2>
                <p className="text-muted-foreground">
                  VS Code, Cursor, GitHub, Postman/Hoppscotch, Docker, Fly.io/Render (prototyping), Figma.
                </p>
              </motion.div>

              {/* Contact */}
              <motion.div variants={itemVariants}>
                <h2 className="text-2xl font-semibold text-white mb-4">Contact</h2>
                <div className="space-y-3">
                  <a 
                    href="mailto:jason.tieu04@gmail.com"
                    className="flex items-center gap-3 text-muted-foreground hover:text-brand transition-colors group"
                  >
                    <Mail className="h-4 w-4 group-hover:text-brand" />
                    <span>jason.tieu04@gmail.com</span>
                  </a>
                  <a 
                    href="https://github.com/jason-tieu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-muted-foreground hover:text-brand transition-colors group"
                  >
                    <Github className="h-4 w-4 group-hover:text-brand" />
                    <span>github.com/jason-tieu</span>
                  </a>
                  <a 
                    href="https://linkedin.com/in/jason-tieu-engineer"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-muted-foreground hover:text-brand transition-colors group"
                  >
                    <Linkedin className="h-4 w-4 group-hover:text-brand" />
                    <span>linkedin.com/in/jason-tieu-engineer</span>
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </SectionWrapper>

      {/* HIGHLIGHTS SECTION */}
      <SectionWrapper>
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <motion.div 
            className="text-center mb-12"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Project Highlights</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Three featured projects showcasing my work in AI/ML, cloud architecture, and full-stack development.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
              >
                <Link 
                  href={`/projects#${project.id}`}
                  className="block group"
                  aria-label={`View ${project.title} project`}
                >
                  <div className="relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 p-6 h-full transition-all duration-300 group-hover:border-brand/30 group-hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <TechPill variant="brand" className="text-xs">
                          Featured
                        </TechPill>
                        <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-brand transition-colors" />
                      </div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-brand transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {project.tagline}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* FUN SECTION */}
      <SectionWrapper>
        <div className="relative z-10 mx-auto max-w-4xl px-6">
          <motion.div 
            className="text-center"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <p className="text-sm text-muted-foreground/60 italic">
              Coffee, motorsport analytics, clean terminals, tiny UI polish that makes apps feel fast.
            </p>
          </motion.div>
        </div>
      </SectionWrapper>
    </main>
  );
}