import type { ComponentType } from "react";
import InterfacePromiseContent, {
  meta as interfacePromiseMeta,
} from "@/content/posts/interface-is-a-promise.mdx";
import CalmSystemsContent, {
  meta as calmSystemsMeta,
} from "@/content/posts/calm-systems-for-creative-work.mdx";
import CommandsAttentionContent, {
  meta as commandsAttentionMeta,
} from "@/content/posts/commands-that-respect-attention.mdx";
import LumenContent, { meta as lumenMeta } from "@/content/projects/lumen.mdx";
import StudioKnowledgeContent, {
  meta as studioKnowledgeMeta,
} from "@/content/projects/studio-knowledge-base.mdx";

type MDXContent = ComponentType<Record<string, never>>;

export type TocItem = {
  id: string;
  title: string;
};

export type PostMeta = {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  updated: string;
  status: "Draft" | "Published";
  readingTime: string;
  tags: string[];
  featured: boolean;
  summary: string;
  toc: TocItem[];
};

export type ProjectMeta = {
  slug: string;
  title: string;
  subtitle: string;
  year: string;
  status: "Active" | "Shipped" | "Archived";
  role: string;
  stack: string[];
  href: string;
  externalUrl: string;
  repo: string;
  image: string;
  summary: string;
  impact: string[];
  caseStudyDiff: Array<{
    before: string;
    after: string;
    proof: string;
  }>;
  featured: boolean;
};

export type Post = PostMeta & {
  kind: "post";
  Content: MDXContent;
};

export type Project = ProjectMeta & {
  kind: "project";
  Content: MDXContent;
};

const posts: Post[] = [
  {
    ...(interfacePromiseMeta as PostMeta),
    kind: "post" as const,
    Content: InterfacePromiseContent,
  },
  {
    ...(calmSystemsMeta as PostMeta),
    kind: "post" as const,
    Content: CalmSystemsContent,
  },
  {
    ...(commandsAttentionMeta as PostMeta),
    kind: "post" as const,
    Content: CommandsAttentionContent,
  },
].sort((a, b) => b.date.localeCompare(a.date));

const projects: Project[] = [
  { ...(lumenMeta as ProjectMeta), kind: "project" as const, Content: LumenContent },
  {
    ...(studioKnowledgeMeta as ProjectMeta),
    kind: "project" as const,
    Content: StudioKnowledgeContent,
  },
].sort((a, b) => b.year.localeCompare(a.year));

function toPostMeta(post: Post): PostMeta {
  return {
    slug: post.slug,
    title: post.title,
    subtitle: post.subtitle,
    date: post.date,
    updated: post.updated,
    status: post.status,
    readingTime: post.readingTime,
    tags: post.tags,
    featured: post.featured,
    summary: post.summary,
    toc: post.toc,
  };
}

function toProjectMeta(project: Project): ProjectMeta {
  return {
    slug: project.slug,
    title: project.title,
    subtitle: project.subtitle,
    year: project.year,
    status: project.status,
    role: project.role,
    stack: project.stack,
    href: project.href,
    externalUrl: project.externalUrl,
    repo: project.repo,
    image: project.image,
    summary: project.summary,
    impact: project.impact,
    caseStudyDiff: project.caseStudyDiff,
    featured: project.featured,
  };
}

export function getAllPosts() {
  return posts;
}

export function getAllPostMeta(): PostMeta[] {
  return posts.map(toPostMeta);
}

export function getFeaturedPosts(limit = 2) {
  return getAllPostMeta().filter((post) => post.featured).slice(0, limit);
}

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function getAllProjects() {
  return projects;
}

export function getAllProjectMeta(): ProjectMeta[] {
  return projects.map(toProjectMeta);
}

export function getFeaturedProjects(limit = 2) {
  return getAllProjectMeta()
    .filter((project) => project.featured)
    .slice(0, limit);
}

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getAllTags(items: Array<{ tags?: string[]; stack?: string[] }>) {
  const tags = items.flatMap((item) => item.tags ?? item.stack ?? []);
  return Array.from(new Set(tags)).sort((a, b) => a.localeCompare(b));
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}
