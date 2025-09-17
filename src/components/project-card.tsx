"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import UIButton from "@/components/UIButton";
import { TechPill } from "@/components/tech-pill";
import { cardHoverVariants } from "@/components/motion";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  excerpt: string;
  coverImage: string;
  tech: string[];
  links: {
    github?: string;
    demo?: string;
  };
  featured?: boolean;
  className?: string;
}

export function ProjectCard({
  title,
  excerpt,
  coverImage,
  tech,
  links,
  featured = false,
  className,
}: ProjectCardProps) {
  return (
    <motion.div
      variants={cardHoverVariants}
      whileHover="hover"
      className={cn("group", className)}
    >
      <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg">
        {/* Cover Image */}
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {featured && (
            <div className="absolute top-4 left-4">
              <TechPill variant="brand" className="text-xs">
                Featured
              </TechPill>
            </div>
          )}
        </div>

        <CardHeader className="space-y-3">
          <CardTitle className="text-xl font-semibold group-hover:text-brand transition-colors">
            {title}
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground line-clamp-2">
            {excerpt}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {tech.slice(0, 4).map((techItem) => (
              <TechPill key={techItem} variant="secondary">
                {techItem}
              </TechPill>
            ))}
            {tech.length > 4 && (
              <TechPill variant="outline">
                +{tech.length - 4} more
              </TechPill>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            {links.github && (
              <UIButton variant="secondary" asChild className="flex-1 text-sm px-3 py-2">
                <Link
                  href={links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Github className="h-4 w-4" />
                  Code
                </Link>
              </UIButton>
            )}
            {links.demo && (
              <UIButton variant="primary" asChild className="flex-1 text-sm px-3 py-2">
                <Link
                  href={links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  Demo
                </Link>
              </UIButton>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
