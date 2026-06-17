import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Suspense } from "react";
import { SiteHeader } from "@/components/site-header";
import { KnowledgeExplorer } from "@/components/content/knowledge-explorer";
import { getKnowledgeKinds, knowledgeEntries } from "@/data/knowledge";

export const metadata: Metadata = {
  title: "Knowledge - Ray Studio",
  description:
    "A public knowledge layer for durable interface ideas, decisions, snippets, and references from Ray Studio.",
};

export default function KnowledgePage() {
  const kinds = getKnowledgeKinds(knowledgeEntries);

  return (
    <main className="studio-shell content-shell knowledge-shell">
      <div className="ambient-grid" aria-hidden="true" />
      <SiteHeader />
      <header className="content-header">
        <Link href="/" className="text-link">
          <ArrowLeft size={16} />
          Ray Studio
        </Link>
        <p className="section-kicker">Knowledge</p>
        <h1>A small indexed memory layer for ideas that should stay useful.</h1>
        <p>
          Patterns, snippets, decisions, and references from the studio. Each
          entry is intentionally short, linkable, and connected to real writing
          or project work.
        </p>
      </header>
      <Suspense fallback={<div className="knowledge-explorer" aria-label="Knowledge explorer" />}>
        <KnowledgeExplorer entries={knowledgeEntries} kinds={kinds} />
      </Suspense>
    </main>
  );
}
