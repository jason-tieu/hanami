import fs from "fs";
import path from "path";
import matter from "gray-matter";
// import { MDXRemote } from "next-mdx-remote/rsc";
import { serialize } from "next-mdx-remote/serialize";
import rehypePrism from "rehype-prism";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

const contentDirectory = path.join(process.cwd(), "content");

export interface ProjectFrontmatter {
  title: string;
  date: string;
  excerpt: string;
  tech: string[];
  links: {
    github?: string;
    demo?: string;
  };
  coverImage: string;
  featured: boolean;
  category: string;
}

export interface PostFrontmatter {
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  coverImage?: string;
  featured: boolean;
}

export async function getProjectSlugs(): Promise<string[]> {
  const projectsPath = path.join(contentDirectory, "projects");
  
  if (!fs.existsSync(projectsPath)) {
    return [];
  }
  
  const files = fs.readdirSync(projectsPath);
  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export async function getPostSlugs(): Promise<string[]> {
  const postsPath = path.join(contentDirectory, "posts");
  
  if (!fs.existsSync(postsPath)) {
    return [];
  }
  
  const files = fs.readdirSync(postsPath);
  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export async function getProject(slug: string): Promise<{
  frontmatter: ProjectFrontmatter;
  content: string;
  mdxSource: unknown;
}> {
  const filePath = path.join(contentDirectory, "projects", `${slug}.mdx`);
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);
  
  const mdxSource = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [rehypeSlug, rehypePrism],
      remarkPlugins: [remarkGfm],
    },
  });

  return {
    frontmatter: data as ProjectFrontmatter,
    content,
    mdxSource,
  };
}

export async function getPost(slug: string): Promise<{
  frontmatter: PostFrontmatter;
  content: string;
  mdxSource: unknown;
}> {
  const filePath = path.join(contentDirectory, "posts", `${slug}.mdx`);
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);
  
  const mdxSource = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [rehypeSlug, rehypePrism],
      remarkPlugins: [remarkGfm],
    },
  });

  return {
    frontmatter: data as PostFrontmatter,
    content,
    mdxSource,
  };
}

export async function getAllProjects(): Promise<Array<{
  slug: string;
  frontmatter: ProjectFrontmatter;
}>> {
  const slugs = await getProjectSlugs();
  const projects = await Promise.all(
    slugs.map(async (slug) => {
      const { frontmatter } = await getProject(slug);
      return { slug, frontmatter };
    })
  );
  
  return projects.sort((a, b) => 
    new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  );
}

export async function getAllPosts(): Promise<Array<{
  slug: string;
  frontmatter: PostFrontmatter;
}>> {
  const slugs = await getPostSlugs();
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const { frontmatter } = await getPost(slug);
      return { slug, frontmatter };
    })
  );
  
  return posts.sort((a, b) => 
    new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  );
}

export async function getFeaturedProjects(): Promise<Array<{
  slug: string;
  frontmatter: ProjectFrontmatter;
}>> {
  const projects = await getAllProjects();
  return projects.filter(project => project.frontmatter.featured);
}

export async function getProjectsByCategory(category: string): Promise<Array<{
  slug: string;
  frontmatter: ProjectFrontmatter;
}>> {
  const projects = await getAllProjects();
  return projects.filter(project => 
    project.frontmatter.category.toLowerCase() === category.toLowerCase()
  );
}
