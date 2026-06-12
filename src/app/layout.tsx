import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GlobalCommandMenu, type CommandItem } from "@/components/global-command-menu";
import { currentMix, photos } from "@/data/media";
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

  return [...quickActions, ...postItems, ...projectItems, ...photoItems];
}
