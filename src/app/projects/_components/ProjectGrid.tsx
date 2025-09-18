'use client';
import type { Project } from '../_data/projects';
import { useFilters, FiltersBar } from './Filters';
import { ProjectCard } from './ProjectCard';

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const filters = useFilters(projects);
  return (
    <>
      <FiltersBar {...filters} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filters.filtered.map(p => (
          <ProjectCard key={p.id} p={p} />
        ))}
      </div>
      {filters.filtered.length === 0 && (
        <p className="mt-8 text-center text-white/60">No projects match your filters.</p>
      )}
    </>
  );
}
