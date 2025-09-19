'use client';
import React, { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import { TechPill } from '@/components/tech-pill';
import type { Project } from '@/components/projects.data';

const CATEGORIES = [
  'All',
  'Embedded',
  'AI/ML',
  'Cloud',
  'Full-Stack',
  'Research',
  'Other',
] as const;

export type FilterState = {
  category: (typeof CATEGORIES)[number];
  tech: string[];
  search: string;
};

export function useProjectFilters(projects: Project[]) {
  const [filters, setFilters] = useState<FilterState>({
    category: 'All',
    tech: [],
    search: '',
  });

  // Get all unique tech from projects
  const allTech = useMemo(() => {
    const techSet = new Set<string>();
    projects.forEach(project => {
      project.tech.forEach(tech => techSet.add(tech));
    });
    return Array.from(techSet).sort();
  }, [projects]);

  // Filter projects based on current filters
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      // Category filter
      const categoryMatch =
        filters.category === 'All' ||
        project.categories.includes(filters.category as Project['categories'][number]);

      // Tech filter (all selected tech must be present)
      const techMatch =
        filters.tech.length === 0 || filters.tech.every(tech => project.tech.includes(tech));

      // Search filter
      const searchMatch =
        filters.search === '' ||
        project.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        project.tagline.toLowerCase().includes(filters.search.toLowerCase()) ||
        project.description.toLowerCase().includes(filters.search.toLowerCase());

      return categoryMatch && techMatch && searchMatch;
    });
  }, [projects, filters]);

  const updateFilters = (updates: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...updates }));
  };

  const clearFilters = () => {
    setFilters({ category: 'All', tech: [], search: '' });
  };

  return {
    filters,
    updateFilters,
    clearFilters,
    allTech,
    filteredProjects,
    CATEGORIES,
  };
}

interface ProjectFiltersProps {
  filters: FilterState;
  updateFilters: (updates: Partial<FilterState>) => void;
  clearFilters: () => void;
  allTech: string[];
  categories: readonly string[];
}

export default function ProjectFilters({
  filters,
  updateFilters,
  clearFilters,
  allTech,
  categories,
}: ProjectFiltersProps) {
  const [showAllTech, setShowAllTech] = useState(false);
  const displayedTech = showAllTech ? allTech : allTech.slice(0, 12);

  const toggleTech = (tech: string) => {
    if (filters.tech.includes(tech)) {
      updateFilters({ tech: filters.tech.filter(t => t !== tech) });
    } else {
      updateFilters({ tech: [...filters.tech, tech] });
    }
  };

  const hasActiveFilters =
    filters.category !== 'All' || filters.tech.length > 0 || filters.search !== '';

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search projects..."
          value={filters.search}
          onChange={e => updateFilters({ search: e.target.value })}
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-card/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand/30 transition-colors dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder-neutral-400 dark:focus:ring-pink-500/30 dark:focus:border-pink-500/30"
        />
        {filters.search && (
          <button
            onClick={() => updateFilters({ search: '' })}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted transition-colors dark:hover:bg-white/10"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        )}
      </div>

      {/* Category Tabs */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-muted-foreground">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => updateFilters({ category: category as (typeof CATEGORIES)[number] })}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                filters.category === category
                  ? 'bg-brand/20 border border-brand/30 text-foreground'
                  : 'bg-card/50 border border-border text-muted-foreground hover:text-foreground hover:border-accent dark:bg-white/5 dark:border-white/10 dark:text-white/70 dark:hover:text-white dark:hover:border-white/20'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Tech Stack Filter */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-muted-foreground">Tech Stack</h3>
          {allTech.length > 12 && (
            <button
              onClick={() => setShowAllTech(!showAllTech)}
              className="text-xs text-brand hover:text-brand/80 transition-colors"
            >
              {showAllTech ? 'Show Less' : `Show All (${allTech.length})`}
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {displayedTech.map(tech => {
            const isSelected = filters.tech.includes(tech);
            return (
              <button
                key={tech}
                onClick={() => toggleTech(tech)}
                className={`transition-colors ${
                  isSelected
                    ? 'bg-brand/20 border border-brand/30 text-foreground'
                    : 'bg-card/50 border border-border text-muted-foreground hover:text-foreground hover:border-accent dark:bg-white/5 dark:border-white/10 dark:text-white/70 dark:hover:text-white dark:hover:border-white/20'
                }`}
              >
                <TechPill variant="secondary" className="text-xs">
                  {tech}
                </TechPill>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Filters & Clear */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between pt-4 border-t border-border dark:border-white/10">
          <div className="flex flex-wrap gap-2">
            {filters.category !== 'All' && (
              <span className="px-3 py-1 rounded-full bg-brand/20 border border-brand/30 text-foreground text-xs">
                {filters.category}
              </span>
            )}
            {filters.tech.map(tech => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full bg-pink-400/20 border border-pink-400/30 text-white text-xs"
              >
                {tech}
              </span>
            ))}
            {filters.search && (
              <span className="px-3 py-1 rounded-full bg-brand/20 border border-brand/30 text-foreground text-xs">
                &ldquo;{filters.search}&rdquo;
              </span>
            )}
          </div>
          <button
            onClick={clearFilters}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 dark:text-neutral-400 dark:hover:text-white"
          >
            <X className="h-3 w-3" />
            Clear All
          </button>
        </div>
      )}
    </div>
  );
}
