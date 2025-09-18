"use client";

// import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Github, Download, ArrowRight, Code, Cpu, Cloud, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TechPill } from "@/components/tech-pill";

const skills = [
  { name: "C/C++", category: "Languages", icon: Code },
  { name: "Python", category: "Languages", icon: Code },
  { name: "FreeRTOS", category: "Embedded", icon: Cpu },
  { name: "TensorFlow", category: "AI/ML", icon: Cpu },
  { name: "Docker", category: "DevOps", icon: Cloud },
  { name: "AWS", category: "Cloud", icon: Cloud },
  { name: "PostgreSQL", category: "Database", icon: Database },
  { name: "MATLAB", category: "Tools", icon: Code },
];

const featuredProjects = [
  {
    title: "AI-Based Flood Detection System",
    description: "DeepLabv3+ model for real-time flood detection using satellite imagery and GIS integration.",
    tech: ["PyTorch", "OpenCV", "GIS", "Python"],
    image: "/images/flood-detection.svg",
    link: "/projects/ai-flood-detection",
  },
  {
    title: "Embedded GUI for Electric Vehicle",
    description: "Touchscreen interface for EV dashboard using TM4C1294XL microcontroller and FreeRTOS.",
    tech: ["FreeRTOS", "C", "Touchscreen", "CAN Bus"],
    image: "/images/ev-gui.svg",
    link: "/projects/ev-gui",
  },
  {
    title: "Cloud Video Processing Service",
    description: "Scalable microservices architecture for real-time video processing with Redis caching.",
    tech: ["Docker", "Redis", "Node.js", "AWS ECS"],
    image: "/images/video-processing.svg",
    link: "/projects/cloud-video",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                Hi, I&apos;m{" "}
                <span className="bg-gradient-to-r from-brand to-accent-brand bg-clip-text text-transparent">
                  Jason Tieu
                </span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
              Full-Stack Development • Cloud & DevOps • AI/ML
              </p>
              <p className="text-lg text-muted-foreground">
              I specialize in building full-stack applications, deploying scalable cloud systems, 
              and delivering applied AI/ML solutions. Passionate about clean architecture, 
              real-time performance, and creating software that solves real problems.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link href="/projects" className="flex items-center gap-2">
                  View Projects
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
                <Link href="https://github.com/jasontieu" className="flex items-center gap-2">
                  <Github className="h-5 w-5" />
                  GitHub
                </Link>
              </Button>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <Button asChild variant="ghost" size="sm">
                <Link href="/resume.pdf" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Download Resume
                </Link>
              </Button>
              <span>•</span>
              <span>Available for opportunities</span>
            </div>
          </div>

          <div className="relative">
            <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-brand/20 to-accent-brand/20">
              <Image
                src="/images/avatar.jpg"
                alt="Jason Tieu"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-brand rounded-full opacity-20 animate-pulse" />
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-accent-brand rounded-full opacity-30 animate-pulse delay-1000" />
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="bg-muted/30 py-16">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center space-y-12">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold">Technical Skills</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Expertise across embedded systems, AI/ML, cloud architecture, and software engineering
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {skills.map((skill) => {
                const Icon = skill.icon;
                return (
                  <Card key={skill.name} className="p-4 text-center group hover:shadow-md transition-all duration-300">
                    <CardContent className="p-0">
                      <Icon className="h-8 w-8 mx-auto mb-2 text-brand group-hover:text-accent-brand transition-colors" />
                      <h3 className="font-semibold text-sm">{skill.name}</h3>
                      <p className="text-xs text-muted-foreground">{skill.category}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-16">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold">Featured Projects</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Highlighting some of my most impactful work in embedded systems and AI/ML
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project) => (
                <Card key={project.title} className="h-full overflow-hidden group hover:shadow-md transition-all duration-300">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="group-hover:text-brand transition-colors">
                      {project.title}
                    </CardTitle>
                    <CardDescription>
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech) => (
                        <TechPill key={tech} variant="secondary">
                          {tech}
                        </TechPill>
                      ))}
                    </div>
                    <Button asChild variant="outline" className="w-full">
                      <Link href={project.link}>
                        View Project
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button asChild size="lg">
                <Link href="/projects">
                  View All Projects
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted/30 py-16">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold">Let&apos;s Work Together</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                I&apos;m always interested in new opportunities and exciting projects. 
                Let&apos;s discuss how we can collaborate!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link href="/contact">
                  Get In Touch
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
                <Link href="/experience">
                  View Experience
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
