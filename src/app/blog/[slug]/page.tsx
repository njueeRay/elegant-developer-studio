import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ArticleInteractions } from "@/components/content/article-interactions";
import { ReadingProgress } from "@/components/content/reading-progress";
import { RelatedReading } from "@/components/content/related-reading";
import { SiteHeader } from "@/components/site-header";
import { TableOfContents } from "@/components/content/table-of-contents";
import { knowledgeEntries } from "@/data/knowledge";
import { getCitationGuide, getWritingTrackForIntent } from "@/data/writing";
import { formatDate, getAllPostMeta, getAllPosts, getAllProjectMeta, getPost } from "@/lib/content";
import { createMetadata } from "@/lib/metadata";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    return {};
  }

  return createMetadata({
    title: post.title,
    description: post.summary,
    path: `/blog/${post.slug}`,
    type: "article",
    locale: post.language === "中文" ? "zh_CN" : "en_US",
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  const Content = post.Content;
  const writingTrack = getWritingTrackForIntent(post.intent);
  const citationGuide = getCitationGuide(post.language);

  return (
    <main className="studio-shell content-shell article-shell">
      <ReadingProgress />
      <ArticleInteractions slug={post.slug} title={post.title} toc={post.toc} />
      <div className="ambient-grid" aria-hidden="true" />
      <SiteHeader />
      <article className="article-layout">
        <aside className="metadata-rail">
          <Link href="/blog" className="text-link">
            <ArrowLeft size={16} />
            Writing
          </Link>
          <dl>
            <div>
              <dt>Date</dt>
              <dd>{formatDate(post.date)}</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>{post.status}</dd>
            </div>
            <div>
              <dt>Reading</dt>
              <dd>{post.readingTime}</dd>
            </div>
            <div>
              <dt>Language</dt>
              <dd>{post.language}</dd>
            </div>
            <div>
              <dt>Intent</dt>
              <dd>{post.intent}</dd>
            </div>
            <div>
              <dt>Track</dt>
              <dd>{writingTrack.label}</dd>
            </div>
          </dl>
        </aside>
        <div className="article-main">
          <header className="article-header">
            <div className="tag-row content-tags">
              {post.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <h1>{post.title}</h1>
            <p>{post.subtitle}</p>
          </header>
          <section className="article-quality-panel" aria-label="Reading quality context">
            <div>
              <span>writing.track</span>
              <strong>{writingTrack.label}</strong>
              <p>{writingTrack.description}</p>
              <small>{writingTrack.promise}</small>
            </div>
            <div>
              <span>{`read.use("${post.slug}")`}</span>
              <strong>{citationGuide.label}</strong>
              <p>{citationGuide.command}</p>
              <ul>
                {citationGuide.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </section>
          <div className="article-content">
            <Content />
          </div>
          <RelatedReading
            current={post}
            posts={getAllPostMeta()}
            knowledge={knowledgeEntries}
            projects={getAllProjectMeta()}
          />
        </div>
        <TableOfContents items={post.toc} />
      </article>
    </main>
  );
}
