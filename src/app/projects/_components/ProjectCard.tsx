'use client';
import Image from 'next/image';
import CardBase from '@/components/ui/CardBase';
import { Badge } from '@/components/ui/badge';
import type { Project } from '../_data/projects';

export function ProjectCard({ p }: { p: Project }) {
  return (
    <CardBase className="hover:translate-y-[-2px]">
      {p.image && (
        <div className="relative mb-3 h-40 w-full overflow-hidden rounded-xl">
          <Image
            src={p.image}
            alt={p.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10 group-hover:ring-pink-500/20" />
        </div>
      )}
      <h3 className="text-base font-semibold text-white">{p.title}</h3>
      <p className="mt-1 text-sm text-white/70">{p.tagline}</p>

      <div className="mt-3 flex flex-wrap gap-2">
        {p.tech.slice(0, 4).map(t => (
          <Badge key={t} className="group-hover:border-pink-400/30 group-hover:text-pink-300">
            {t}
          </Badge>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-3 text-sm">
        {p.links?.demo && (
          <a
            className="text-white/70 hover:text-pink-400 underline-offset-4 hover:underline"
            href={p.links.demo}
            target="_blank"
          >
            Demo
          </a>
        )}
        {p.links?.github && (
          <a
            className="text-white/70 hover:text-pink-400 underline-offset-4 hover:underline"
            href={p.links.github}
            target="_blank"
          >
            GitHub
          </a>
        )}
        {p.links?.doc && (
          <a
            className="text-white/70 hover:text-pink-400 underline-offset-4 hover:underline"
            href={p.links.doc}
            target="_blank"
          >
            Docs
          </a>
        )}
      </div>
    </CardBase>
  );
}
