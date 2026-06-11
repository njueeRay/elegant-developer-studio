import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PostExplorer } from "@/components/content/tag-filter";
import { getAllPostMeta, getAllTags } from "@/lib/content";

export const metadata: Metadata = {
  title: "Writing - Ray Studio",
  description:
    "Essays and notes on design engineering, calm systems, command interfaces, and personal software.",
};

export default function BlogPage() {
  const posts = getAllPostMeta();
  const tags = getAllTags(posts);

  return (
    <main className="studio-shell content-shell">
      <div className="ambient-grid" aria-hidden="true" />
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
      <PostExplorer posts={posts} tags={tags} />
    </main>
  );
}
