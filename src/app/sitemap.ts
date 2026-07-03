import type { MetadataRoute } from "next";
import { knowledgeEntries } from "@/data/knowledge";
import { getAllPosts, getAllProjects } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/blog",
    "/projects",
    "/knowledge",
    "/uses",
    "/lab",
    "/about",
    "/collaboration",
    "/contact",
    "/photos",
    "/music",
  ].map((route) => ({
    url: absoluteUrl(route || "/"),
    lastModified: new Date(),
  }));

  const postRoutes = getAllPosts().map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.updated),
  }));

  const projectRoutes = getAllProjects().map((project) => ({
    url: absoluteUrl(`/projects/${project.slug}`),
    lastModified: new Date(),
  }));

  const knowledgeRoutes = knowledgeEntries.map((entry) => ({
    url: absoluteUrl(`/knowledge/${entry.slug}`),
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...postRoutes, ...projectRoutes, ...knowledgeRoutes];
}
