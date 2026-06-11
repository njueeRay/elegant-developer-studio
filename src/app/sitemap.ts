import type { MetadataRoute } from "next";
import { getAllPosts, getAllProjects } from "@/lib/content";

const siteUrl = "https://elegant-developer-studio.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/blog", "/projects", "/photos", "/music"].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }));

  const postRoutes = getAllPosts().map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updated),
  }));

  const projectRoutes = getAllProjects().map((project) => ({
    url: `${siteUrl}/projects/${project.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...postRoutes, ...projectRoutes];
}
