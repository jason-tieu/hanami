import { projects } from "@/components/projects.data";
import FeaturedCarousel from "@/components/FeaturedCarousel";

export default function FeaturedProjects() {
  const featuredProjects = projects.filter(p => p.featured).slice(0, 3);
  
  return <FeaturedCarousel projects={featuredProjects} />;
}
