import { ArrowRight, BookOpenText, Boxes, LibraryBig } from "lucide-react";
import Link from "next/link";
import type { KnowledgeEntry } from "@/data/knowledge";
import type { PostMeta, ProjectMeta } from "@/lib/content";

type RelatedReadingProps = {
  current: PostMeta;
  posts: PostMeta[];
  knowledge: KnowledgeEntry[];
  projects: ProjectMeta[];
};

type TrailItem = {
  title: string;
  summary: string;
  href: string;
  meta: string;
};

type TrailLaneProps = {
  label: string;
  icon: typeof BookOpenText;
  items: TrailItem[];
};

export function RelatedReading({ current, posts, knowledge, projects }: RelatedReadingProps) {
  const relatedPosts = current.relatedPostSlugs
    .map((slug) => posts.find((post) => post.slug === slug))
    .filter((post): post is PostMeta => Boolean(post))
    .map((post) => ({
      title: post.title,
      summary: post.summary,
      href: `/blog/${post.slug}`,
      meta: `${post.intent} / ${post.language}`,
    }));

  const relatedKnowledge = current.relatedKnowledgeSlugs
    .map((slug) => knowledge.find((entry) => entry.slug === slug))
    .filter((entry): entry is KnowledgeEntry => Boolean(entry))
    .map((entry) => ({
      title: entry.title,
      summary: entry.summary,
      href: `/knowledge/${entry.slug}`,
      meta: `${entry.kind} / ${entry.status}`,
    }));

  const relatedProjects = current.relatedProjectSlugs
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project): project is ProjectMeta => Boolean(project))
    .map((project) => ({
      title: project.title,
      summary: project.summary,
      href: `/projects/${project.slug}`,
      meta: `${project.role} / ${project.status}`,
    }));

  return (
    <section className="related-reading" aria-label="Related reading">
      <div className="related-reading-head">
        <span>read.next(&quot;{current.slug}&quot;)</span>
        <h2>Keep the thread alive.</h2>
        <p>
          This essay is part of a local trail: read the next argument, inspect the
          reusable knowledge, or open the project evidence behind the system.
        </p>
      </div>
      <div className="related-reading-lanes">
        <TrailLane label="Essays" icon={BookOpenText} items={relatedPosts} />
        <TrailLane label="Knowledge" icon={LibraryBig} items={relatedKnowledge} />
        <TrailLane label="Projects" icon={Boxes} items={relatedProjects} />
      </div>
    </section>
  );
}

function TrailLane({ label, icon: Icon, items }: TrailLaneProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="related-reading-lane">
      <div className="related-reading-lane-title">
        <Icon size={16} />
        <span>{label}</span>
      </div>
      <div className="related-reading-links">
        {items.map((item) => (
          <Link key={item.href} href={item.href} className="related-reading-link">
            <span className="related-reading-link-meta">{item.meta}</span>
            <strong>{item.title}</strong>
            <small>{item.summary}</small>
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        ))}
      </div>
    </div>
  );
}
