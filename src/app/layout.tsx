import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GlobalCommandMenu, type CommandItem } from "@/components/global-command-menu";
import { knowledgeEntries } from "@/data/knowledge";
import { currentMix, photos } from "@/data/media";
import { useTools, useWorkflows } from "@/data/uses";
import { getAllPostMeta, getAllProjectMeta } from "@/lib/content";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://elegant-developer-studio.vercel.app"),
  title: "Ray Studio - Elegant Developer Studio",
  description:
    "A warm, precise personal homepage for a design engineer: writing, work, knowledge, media, and lab experiments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const commandItems = getCommandItems();

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <GlobalCommandMenu items={commandItems} />
      </body>
    </html>
  );
}

function getCommandItems(): CommandItem[] {
  const quickActions: CommandItem[] = [
    {
      id: "action-home",
      kind: "action",
      title: "Open studio home",
      description: "Return to the first viewport and workbench.",
      href: "/",
      meta: "Home",
      keywords: ["home", "studio", "workbench"],
    },
    {
      id: "action-writing",
      kind: "action",
      title: "Browse writing",
      description: "Open the full essay archive.",
      href: "/blog",
      meta: "Archive",
      keywords: ["blog", "writing", "essays"],
    },
    {
      id: "action-projects",
      kind: "action",
      title: "View selected work",
      description: "Open project case studies and systems work.",
      href: "/projects",
      meta: "Portfolio",
      keywords: ["projects", "work", "case study"],
    },
    {
      id: "action-uses",
      kind: "uses",
      title: "Open uses",
      description: "Browse the studio tools, workflows, and publishing pipeline.",
      href: "/uses",
      meta: `${useTools.length} tools`,
      keywords: ["uses", "tools", "stack", "workflow", "setup"],
    },
    {
      id: "action-knowledge",
      kind: "knowledge",
      title: "Browse knowledge",
      description: "Open the public memory layer for patterns, snippets, and decisions.",
      href: "/knowledge",
      meta: `${knowledgeEntries.length} entries`,
      keywords: ["knowledge", "notes", "snippets", "references", "decisions"],
    },
    {
      id: "action-photos",
      kind: "photo",
      title: "Open photos",
      description: "Browse the studio visual memory layer.",
      href: "/photos",
      meta: `${photos.length} frames`,
      keywords: ["photos", "media", "gallery", "lightbox"],
    },
    {
      id: "action-music",
      kind: "music",
      title: "Play studio mix",
      description: "Open the current writing and refactoring mix.",
      href: "/music",
      meta: `${currentMix.tracks.length} tracks`,
      keywords: ["music", "mix", "player", "now playing"],
    },
    {
      id: "action-contact",
      kind: "contact",
      title: "Send a note",
      description: "Start an email conversation.",
      href: "mailto:hello@ray.studio",
      meta: "Email",
      keywords: ["contact", "email", "hello"],
    },
  ];

  const postItems = getAllPostMeta().map<CommandItem>((post) => ({
    id: `post-${post.slug}`,
    kind: "post",
    title: post.title,
    description: post.summary,
    href: `/blog/${post.slug}`,
    meta: post.readingTime,
    keywords: post.tags,
  }));

  const projectItems = getAllProjectMeta().map<CommandItem>((project) => ({
    id: `project-${project.slug}`,
    kind: "project",
    title: project.title,
    description: project.summary,
    href: `/projects/${project.slug}`,
    meta: project.status,
    keywords: project.stack,
  }));

  const knowledgeItems = knowledgeEntries.map<CommandItem>((entry) => ({
    id: `knowledge-${entry.slug}`,
    kind: "knowledge",
    title: entry.title,
    description: entry.summary,
    href: `/knowledge#${entry.slug}`,
    meta: entry.kind,
    keywords: [entry.kind, entry.status, entry.source, ...entry.tags],
  }));

  const usesItems = useTools.map<CommandItem>((tool) => ({
    id: `uses-${tool.slug}`,
    kind: "uses",
    title: tool.name,
    description: tool.description,
    href: `/uses#${tool.slug}`,
    meta: tool.category,
    keywords: [tool.category, tool.role, tool.signal],
  }));

  const workflowItems = useWorkflows.map<CommandItem>((workflow) => ({
    id: `uses-workflow-${workflow.step}`,
    kind: "uses",
    title: workflow.title,
    description: workflow.description,
    href: "/uses#workspace-rhythm",
    meta: "Workflow",
    keywords: ["uses", "workflow", "rhythm", workflow.time],
  }));

  const photoItems = photos
    .filter((photo) => photo.featured)
    .map<CommandItem>((photo) => ({
      id: `photo-${photo.slug}`,
      kind: "photo",
      title: photo.title,
      description: photo.story,
      href: "/photos",
      meta: photo.mood,
      keywords: photo.tags,
    }));

  return [
    ...quickActions,
    ...postItems,
    ...projectItems,
    ...knowledgeItems,
    ...usesItems,
    ...workflowItems,
    ...photoItems,
  ];
}
