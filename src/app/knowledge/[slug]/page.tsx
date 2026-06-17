import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpenText, Braces, GitBranch, Lightbulb, Waypoints } from "lucide-react";
import { KnowledgeTrails } from "@/components/content/knowledge-trails";
import { SiteHeader } from "@/components/site-header";
import {
  getAllKnowledgeSlugs,
  getKnowledgeEntry,
  type KnowledgeKind,
} from "@/data/knowledge";
import { getAllPostMeta, getAllProjectMeta } from "@/lib/content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const iconByKind: Record<KnowledgeKind, typeof Lightbulb> = {
  Pattern: Waypoints,
  Snippet: Braces,
  Decision: GitBranch,
  Reference: BookOpenText,
};

export function generateStaticParams() {
  return getAllKnowledgeSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getKnowledgeEntry(slug);

  if (!entry) {
    return {};
  }

  return {
    title: `${entry.title} - Ray Studio Knowledge`,
    description: entry.summary,
    openGraph: {
      title: entry.title,
      description: entry.summary,
      type: "article",
    },
  };
}

export default async function KnowledgeDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const entry = getKnowledgeEntry(slug);

  if (!entry) {
    notFound();
  }

  const Icon = iconByKind[entry.kind];

  return (
    <main className="studio-shell content-shell knowledge-detail-shell">
      <div className="ambient-grid" aria-hidden="true" />
      <SiteHeader />
      <article className="knowledge-detail-layout">
        <aside className="metadata-rail knowledge-detail-rail">
          <Link href="/knowledge" className="text-link">
            <ArrowLeft size={16} />
            Back to Knowledge
          </Link>
          <dl>
            <div>
              <dt>Kind</dt>
              <dd>{entry.kind}</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>{entry.status}</dd>
            </div>
            <div>
              <dt>Source</dt>
              <dd>{entry.source}</dd>
            </div>
            <div>
              <dt>Slug</dt>
              <dd>{entry.slug}</dd>
            </div>
          </dl>
        </aside>

        <div className="knowledge-detail-main">
          <header className="knowledge-detail-header">
            <div className="knowledge-detail-kind" aria-hidden="true">
              <Icon size={22} />
              <span>{entry.kind}</span>
            </div>
            <div className="tag-row content-tags">
              {entry.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <h1>{entry.title}</h1>
            <p>{entry.summary}</p>
          </header>

          <div className="knowledge-detail-body">
            <section aria-labelledby="knowledge-signal-title">
              <p className="section-kicker">Signal</p>
              <h2 id="knowledge-signal-title">When to use it</h2>
              <p>{entry.signal}</p>
            </section>

            <section aria-labelledby="knowledge-principle-title">
              <p className="section-kicker blue">Principle</p>
              <h2 id="knowledge-principle-title">What it protects</h2>
              <p>
                This knowledge entry should reduce ambiguity in future design and engineering
                decisions. It is useful only when it changes what gets built, linked, reviewed, or
                removed.
              </p>
            </section>

            <section aria-labelledby="knowledge-tags-title">
              <p className="section-kicker">Reference</p>
              <h2 id="knowledge-tags-title">How to cite it</h2>
              <p>
                Use this route as the stable public reference for the idea. The list view remains a
                browsing surface; this page is the durable citation node.
              </p>
            </section>
          </div>

          <KnowledgeTrails entry={entry} posts={getAllPostMeta()} projects={getAllProjectMeta()} />
        </div>
      </article>
    </main>
  );
}
