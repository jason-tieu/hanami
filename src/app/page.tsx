"use client";

import Image from "next/image";
import Link from "next/link";
import { Github, Download, ArrowRight } from "lucide-react";
import SectionWrapper from "@/components/SectionWrapper";
import UIButton from "@/components/UIButton";
import AccentButton from "@/components/AccentButton";
import SakuraCanvas from "@/components/SakuraCanvas";
import { skills } from "@/components/skills";
import SkillCard from "@/components/SkillCard";
import FeaturedCarousel from "@/components/FeaturedCarousel";
import { projects } from "@/components/projects.data";

export default function Home() {
  const featuredProjects = projects.filter(p => p.featured).slice(0, 3);

  return (
    <main className="relative">
      {/* HERO */}
      <SectionWrapper className="overflow-hidden">
        <SakuraCanvas enabled density={0.85} hue={345} opacity={0.18} />
        <div className="relative z-20 mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                Hi, I&apos;m{" "}
                <span className="bg-gradient-to-r from-white to-brand bg-clip-text text-transparent">
                  Jason Tieu
                </span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Embedded Systems • AI/ML • Software Engineering
              </p>
              <p className="text-lg text-muted-foreground">
                I specialize in building robust embedded systems, implementing AI/ML solutions, 
                and designing scalable cloud architectures. Passionate about real-time control, 
                computer vision, and distributed systems.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <UIButton asChild variant="primary" className="text-lg px-8 py-6">
                <Link href="/projects" className="flex items-center gap-2">
                  View Projects
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </UIButton>
              <AccentButton asChild variant="secondary" className="text-lg px-8 py-6">
                <Link href="https://github.com/jason-tieu" className="flex items-center gap-2">
                  <Github className="h-5 w-5" />
                  GitHub
                </Link>
              </AccentButton>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <UIButton asChild variant="secondary" className="text-sm px-3 py-1">
                <Link href="/resume.pdf" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Download Resume
                </Link>
              </UIButton>
              <span>•</span>
              <span>Available for opportunities</span>
            </div>
          </div>

          <div className="relative">
            <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-brand/20 to-accent-brand/20">
              <Image
                src="/images/avatar.svg"
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
        </div>
      </SectionWrapper>

      {/* TECHNICAL SKILLS */}
      <SectionWrapper id="skills">
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <div className="text-center space-y-12">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold">Technical Skills</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Expertise across embedded systems, AI/ML, cloud architecture, and software engineering
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {skills.map((skill) => (
                <SkillCard key={skill.id} skill={skill} />
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Featured Projects Section */}
      <SectionWrapper>
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold">Featured Projects</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Highlighting some of my most impactful work in embedded systems and AI/ML
              </p>
            </div>

            <FeaturedCarousel projects={featuredProjects} />

            <div className="text-center">
              <UIButton asChild variant="primary" className="text-lg px-8 py-6">
                <Link href="/projects" className="flex items-center gap-2">
                  View All Projects
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </UIButton>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* CTA Section */}
      <SectionWrapper>
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold">Let&apos;s Work Together</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                I&apos;m always interested in new opportunities and exciting projects. 
                Let&apos;s discuss how we can collaborate!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <UIButton asChild variant="primary" className="text-lg px-8 py-6">
                <Link href="/contact" className="flex items-center gap-2">
                  Get In Touch
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </UIButton>
              <AccentButton asChild variant="secondary" className="text-lg px-8 py-6">
                <Link href="/experience" className="flex items-center gap-2">
                  View Experience
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </AccentButton>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </main>
  );
}