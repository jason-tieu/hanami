import { ProjectFrontmatter } from './mdx';

export interface Project extends ProjectFrontmatter {
  slug: string;
}

export const projectCategories = [
  'All',
  'Embedded',
  'AI/ML',
  'Cloud',
  'Distributed Systems',
  'Web',
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export function filterProjectsByCategory(
  projects: Project[],
  category: ProjectCategory,
): Project[] {
  if (category === 'All') {
    return projects;
  }

  return projects.filter(project => project.category.toLowerCase() === category.toLowerCase());
}

export function searchProjects(projects: Project[], query: string): Project[] {
  if (!query.trim()) {
    return projects;
  }

  const searchTerm = query.toLowerCase();

  return projects.filter(
    project =>
      project.title.toLowerCase().includes(searchTerm) ||
      project.excerpt.toLowerCase().includes(searchTerm) ||
      project.tech.some(tech => tech.toLowerCase().includes(searchTerm)) ||
      project.category.toLowerCase().includes(searchTerm),
  );
}

export function getUniqueTech(projects: Project[]): string[] {
  const techSet = new Set<string>();

  projects.forEach(project => {
    project.tech.forEach(tech => techSet.add(tech));
  });

  return Array.from(techSet).sort();
}

export function getProjectStats(projects: Project[]): {
  total: number;
  byCategory: Record<string, number>;
  featured: number;
} {
  const byCategory: Record<string, number> = {};
  let featured = 0;

  projects.forEach(project => {
    byCategory[project.category] = (byCategory[project.category] || 0) + 1;
    if (project.featured) {
      featured++;
    }
  });

  return {
    total: projects.length,
    byCategory,
    featured,
  };
}
