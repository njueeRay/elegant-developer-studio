import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GlobalCommandMenu, type CommandItem } from "@/components/global-command-menu";
import {
  aboutCapabilities,
  aboutPrinciples,
  aboutProfile,
  aboutTimeline,
} from "@/data/about";
import { creativeIdeas } from "@/data/collaboration";
import { knowledgeEntries } from "@/data/knowledge";
import { labComponents, labExperiments } from "@/data/lab";
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
      id: "action-about",
      kind: "about",
      title: "Meet Ray",
      description: "Open the studio profile, principles, timeline, and contact routes.",
      href: "/about",
      meta: aboutProfile.role,
      keywords: ["about", "profile", "principles", "timeline", "capabilities"],
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
      id: "action-lab",
      kind: "lab",
      title: "Open component lab",
      description: "Browse reusable patterns, interaction proofs, and quality gates.",
      href: "/lab",
      meta: `${labComponents.length} components`,
      keywords: ["lab", "components", "registry", "patterns", "quality"],
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
      title: "Open contact routes",
      description: "Open the public contact routes, brief template, and project discussion path.",
      href: "/contact",
      meta: "Routes",
      keywords: ["contact", "github", "issues", "about", "route", "brief"],
    },
    {
      id: "action-collaboration",
      kind: "collaboration",
      title: "Read collaboration guide",
      description: "Open contribution flow, governance surfaces, creative audit, and idea backlog.",
      href: "/collaboration",
      meta: "Governance",
      keywords: ["collaboration", "contributing", "governance", "ideas", "creative", "review"],
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

  const labItems = labComponents.map<CommandItem>((component) => ({
    id: `lab-${component.slug}`,
    kind: "lab",
    title: component.name,
    description: component.description,
    href: `/lab#${component.slug}`,
    meta: component.status,
    keywords: [
      "lab",
      component.category,
      component.component,
      component.source,
      ...component.reusableFor,
    ],
  }));

  const labExperimentItems = labExperiments.map<CommandItem>((experiment) => ({
    id: `lab-experiment-${experiment.step}`,
    kind: "lab",
    title: experiment.title,
    description: experiment.description,
    href: "/lab#lab-experiment-title",
    meta: experiment.status,
    keywords: ["lab", "experiment", experiment.status],
  }));

  const aboutItems: CommandItem[] = [
    ...aboutPrinciples.map<CommandItem>((principle) => ({
      id: `about-principle-${principle.slug}`,
      kind: "about",
      title: principle.title,
      description: principle.summary,
      href: "/about#principles",
      meta: "Principle",
      keywords: ["about", "principle", principle.accent],
    })),
    ...aboutTimeline.map<CommandItem>((item) => ({
      id: `about-timeline-${item.year}`,
      kind: "about",
      title: item.title,
      description: item.detail,
      href: "/about#timeline",
      meta: item.year,
      keywords: ["about", "timeline", item.role],
    })),
    ...aboutCapabilities.map<CommandItem>((capability) => ({
      id: `about-capability-${capability.name}`,
      kind: "about",
      title: capability.name,
      description: capability.proof,
      href: "/about#capabilities",
      meta: capability.label,
      keywords: ["about", "capability", capability.label],
    })),
  ];

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

  const creativeItems = creativeIdeas.map<CommandItem>((idea) => ({
    id: `creative-${idea.slug}`,
    kind: "collaboration",
    title: idea.title,
    description: idea.description,
    href: `/collaboration#${idea.slug}`,
    meta: idea.priority,
    keywords: ["collaboration", "creative", "idea", idea.category, idea.priority],
  }));

  return [
    ...quickActions,
    ...postItems,
    ...projectItems,
    ...knowledgeItems,
    ...usesItems,
    ...workflowItems,
    ...labItems,
    ...labExperimentItems,
    ...aboutItems,
    ...photoItems,
    ...creativeItems,
  ];
}
