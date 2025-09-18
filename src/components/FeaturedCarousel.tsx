'use client';
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ExternalLink, Github, FileText } from 'lucide-react';
import { TechPill } from '@/components/tech-pill';
import type { Project } from '@/components/projects.data';

interface FeaturedCarouselProps {
  projects: Project[];
  className?: string;
}

export default function FeaturedCarousel({ projects, className = '' }: FeaturedCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-advance carousel
  useEffect(() => {
    if (projects.length <= 1) return;

    intervalRef.current = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % projects.length);
    }, 5000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [projects.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % projects.length);
      }, 5000);
    }
  };

  const goToPrevious = () => {
    goToSlide(currentIndex === 0 ? projects.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    goToSlide((currentIndex + 1) % projects.length);
  };

  if (projects.length === 0) return null;

  const currentProject = projects[currentIndex];

  return (
    <div className={`relative ${className}`}>
      {/* Main Carousel */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur h-96 md:h-[28rem]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProject.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="grid md:grid-cols-2 gap-0 h-full"
          >
            {/* Image Section */}
            <div className="relative h-full">
              <Image
                src={currentProject.image}
                alt={currentProject.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

              {/* Featured Badge */}
              <div className="absolute top-4 left-4">
                <TechPill variant="brand" className="text-sm text-white">
                  Featured Project
                </TechPill>
              </div>
            </div>

            {/* Content Section */}
            <div className="pl-6 pr-16 pt-6 pb-6 md:pl-8 md:pr-20 md:pt-8 md:pb-8 space-y-4 h-full flex flex-col justify-center">
              {/* Categories */}
              <div className="flex flex-wrap gap-2">
                {currentProject.categories.map(category => (
                  <span
                    key={category}
                    className="text-xs px-2 py-1 rounded-full bg-white/10 border border-white/20 text-white/80"
                  >
                    {category}
                  </span>
                ))}
              </div>

              {/* Title and Tagline */}
              <div className="space-y-2">
                <h3 className="text-2xl md:text-3xl font-bold text-white">
                  {currentProject.title}
                </h3>
                <p className="text-white/70 text-sm md:text-base">{currentProject.tagline}</p>
              </div>

              {/* Description */}
              <p className="text-white/60 text-sm leading-relaxed">{currentProject.description}</p>

              {/* Tech Stack */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-white/80">Tech Stack</h4>
                <div className="flex flex-wrap gap-1.5">
                  {currentProject.tech.slice(0, 6).map(tech => (
                    <TechPill key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </TechPill>
                  ))}
                  {currentProject.tech.length > 6 && (
                    <TechPill variant="outline" className="text-xs">
                      +{currentProject.tech.length - 6} more
                    </TechPill>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                {currentProject.links.demo && currentProject.links.demo !== '#TODO' && (
                  <a
                    href={currentProject.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-white hover:border-pink-400/30 hover:text-pink-300 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Live Demo
                  </a>
                )}
                {currentProject.links.github && currentProject.links.github !== '#TODO' && (
                  <a
                    href={currentProject.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-white hover:border-pink-400/30 hover:text-pink-300 transition-colors"
                  >
                    <Github className="h-4 w-4" />
                    View Code
                  </a>
                )}
                {currentProject.links.docs && currentProject.links.docs !== '#TODO' && (
                  <a
                    href={currentProject.links.docs}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-white hover:border-pink-400/30 hover:text-pink-300 transition-colors"
                  >
                    <FileText className="h-4 w-4" />
                    Docs
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        {projects.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
              aria-label="Previous project"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-6 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
              aria-label="Next project"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {/* Dots Indicator */}
      {projects.length > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex ? 'w-8 bg-brand' : 'w-2 bg-white/30 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
