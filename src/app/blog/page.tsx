import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Suspense } from "react";
import { SiteHeader } from "@/components/site-header";
import { PostExplorer } from "@/components/content/tag-filter";
import { getAllPostMeta, getAllTags } from "@/lib/content";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Writing",
  description:
    "Ray Studio 的文章归档：设计工程、冷静系统、命令界面、AI 协作和个人软件实践。",
  path: "/blog",
});

export default function BlogPage() {
  const posts = getAllPostMeta();
  const tags = getAllTags(posts);

  return (
    <main className="studio-shell content-shell">
      <div className="ambient-grid" aria-hidden="true" />
      <SiteHeader />
      <header className="content-header">
        <Link href="/" className="text-link">
          <ArrowLeft size={16} />
          Ray Studio
        </Link>
        <p className="section-kicker">Writing</p>
        <h1>Essays that make the system easier to see.</h1>
        <p>
          Design engineering notes, product decisions, interaction research, and
          small arguments for calmer software.
        </p>
      </header>
      <Suspense fallback={<div className="content-explorer" aria-label="Writing explorer" />}>
        <PostExplorer posts={posts} tags={tags} />
      </Suspense>
    </main>
  );
}
