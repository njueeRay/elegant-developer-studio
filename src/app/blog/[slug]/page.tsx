import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ReadingProgress } from "@/components/content/reading-progress";
import { TableOfContents } from "@/components/content/table-of-contents";
import { formatDate, getAllPosts, getPost } from "@/lib/content";

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

  return {
    title: `${post.title} - Ray Studio`,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  const Content = post.Content;

  return (
    <main className="studio-shell content-shell article-shell">
      <ReadingProgress />
      <div className="ambient-grid" aria-hidden="true" />
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
          <div className="article-content">
            <Content />
          </div>
        </div>
        <TableOfContents items={post.toc} />
      </article>
    </main>
  );
}
