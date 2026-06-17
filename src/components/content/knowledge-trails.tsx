import { ArrowRight, BookOpenText, Boxes, GitBranch, Link2 } from "lucide-react";
import Link from "next/link";
import type { KnowledgeEntry } from "@/data/knowledge";
import type { PostMeta, ProjectMeta } from "@/lib/content";

type KnowledgeTrailsProps = {
  entry: KnowledgeEntry;
  posts: PostMeta[];
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
  items: TrailItem[];
  icon: typeof BookOpenText;
};

export function KnowledgeTrails({ entry, posts, projects }: KnowledgeTrailsProps) {
  const relatedWriting = entry.relatedPostSlugs
    .map((slug) => posts.find((post) => post.slug === slug))
    .filter((post): post is PostMeta => Boolean(post))
    .map((post) => ({
      title: post.title,
      summary: post.summary,
      href: `/blog/${post.slug}`,
      meta: `${post.intent} / ${post.language}`,
    }));

  const projectEvidence = entry.relatedProjectSlugs
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project): project is ProjectMeta => Boolean(project))
    .map((project) => ({
      title: project.title,
      summary: project.summary,
      href: `/projects/${project.slug}`,
      meta: `${project.role} / ${project.status}`,
    }));

  const backlinks = entry.backlinks.map((link) => ({
    title: link.label,
    summary: link.context,
    href: link.href,
    meta: "Backlink",
  }));

  return (
    <section className="knowledge-trails" aria-label="Knowledge trails">
      <div className="knowledge-trails-head">
        <GitBranch size={18} />
        <div>
          <span>knowledge.trace(&quot;{entry.slug}&quot;)</span>
          <h2>Where this idea is used.</h2>
        </div>
      </div>
      <div className="knowledge-trail-lanes">
        <TrailLane label="Related writing" icon={BookOpenText} items={relatedWriting} />
        <TrailLane label="Project evidence" icon={Boxes} items={projectEvidence} />
        <TrailLane label="Backlinks" icon={Link2} items={backlinks} />
      </div>
    </section>
  );
}

function TrailLane({ label, items, icon: Icon }: TrailLaneProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="knowledge-trail-lane" aria-label={label}>
      <div className="knowledge-trail-lane-title">
        <Icon size={16} />
        <span>{label}</span>
      </div>
      <div className="knowledge-trail-links">
        {items.map((item) => (
          <Link href={item.href} className="knowledge-trail-link" key={item.href}>
            <span>{item.meta}</span>
            <strong>{item.title}</strong>
            <small>{item.summary}</small>
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        ))}
      </div>
    </div>
  );
}
