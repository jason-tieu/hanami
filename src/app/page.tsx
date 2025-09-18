'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Github, Download, ArrowRight } from 'lucide-react';
import SectionWrapper from '@/components/SectionWrapper';
import UIButton from '@/components/UIButton';
import AccentButton from '@/components/AccentButton';
import dynamic from 'next/dynamic';
import { Suspense, memo } from 'react';
import { GridSkeleton, CardSkeleton } from '@/components/Skeleton';

const SakuraCanvas = dynamic(() => import('@/components/SakuraCanvas'), {
  ssr: false,
  loading: () => null,
});

const LazySkillsSection = dynamic(() => import('@/components/SkillsSection'), {
  loading: () => <div className="h-96 bg-muted/5 rounded-2xl animate-pulse" />,
});

const LazyFeaturedProjects = dynamic(() => import('@/components/FeaturedProjects'), {
  loading: () => <div className="h-64 bg-muted/5 rounded-2xl animate-pulse" />,
});

const Home = memo(function Home() {
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
                  Hi, I&apos;m{' '}
                  <span className="bg-gradient-to-r from-white to-brand bg-clip-text text-transparent">
                    Jason Tieu
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Full-Stack Development • Cloud & DevOps • AI/ML
                </p>
                <p className="text-lg text-muted-foreground">
                  I specialize in building full-stack applications, deploying scalable cloud
                  systems, and delivering applied AI/ML solutions. Passionate about clean
                  architecture, real-time performance, and creating software that solves real
                  problems.
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
                  <Link href="/Jason Tieu Resume - 2025.pdf" className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Download Resume
                  </Link>
                </UIButton>
                <span>•</span>
                <span>Available for opportunities</span>
              </div>
            </div>

            <div className="relative">
              <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-brand/20 to-accent-brand/20 border-4 border-brand">
                <Image
                  src="/images/avatar_optimized.webp"
                  alt="Jason Tieu"
                  fill
                  className="object-cover"
                  priority
                  fetchPriority="high"
                  quality={90}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              {/* Top-left partial rounded corner */}
              <div className="absolute -top-3 -left-3 w-4 h-4 bg-white rounded-tl-lg" />
              {/* Bottom-right partial rounded corner */}
              <div className="absolute -bottom-3 -right-3 w-4 h-4 bg-white rounded-br-lg" />
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
                Expertise across embedded systems, AI/ML, cloud architecture, and software
                engineering
              </p>
            </div>

            <Suspense fallback={<GridSkeleton items={4} />}>
              <LazySkillsSection />
            </Suspense>
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

            <Suspense fallback={<CardSkeleton className="h-64" />}>
              <LazyFeaturedProjects />
            </Suspense>

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
                I&apos;m always interested in new opportunities and exciting projects. Let&apos;s
                discuss how we can collaborate!
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
});

export default Home;
