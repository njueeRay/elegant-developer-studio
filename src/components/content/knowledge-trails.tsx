import { ArrowRight, BookOpenText, Boxes, ExternalLink, GitBranch, Link2 } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
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
  reason: string;
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
      reason: `Uses this rule as a writing argument in the ${post.intent} track.`,
    }));

  const projectEvidence = entry.relatedProjectSlugs
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project): project is ProjectMeta => Boolean(project))
    .map((project) => ({
      title: project.title,
      summary: project.summary,
      href: `/projects/${project.slug}`,
      meta: `${project.role} / ${project.status}`,
      reason: "Turns this knowledge entry into inspectable project evidence.",
    }));

  const backlinks = entry.backlinks.map((link) => ({
    title: link.label,
    summary: link.context,
    href: link.href,
    meta: "Backlink",
    reason: `This page cites the entry because ${link.context.toLowerCase()}`,
  }));

  const referenceLinks = entry.related.map((link) => ({
    title: link.label,
    summary: link.href.startsWith("http")
      ? "External reference used by this knowledge entry."
      : "Internal route connected to this knowledge entry.",
    href: link.href,
    meta: link.href.startsWith("http") ? "External reference" : "Internal reference",
    reason: link.href.startsWith("http")
      ? "Provides outside evidence or vocabulary for this entry."
      : "Connects this rule to another public route in the studio.",
  }));
  const relationMap = [
    ...projectEvidence,
    ...relatedWriting,
    ...referenceLinks,
    ...backlinks,
  ].slice(0, 5);

  return (
    <section className="knowledge-trails" aria-label="Knowledge trails">
      <div className="knowledge-trails-head">
        <GitBranch size={18} />
        <div>
          <span>knowledge.trace(&quot;{entry.slug}&quot;)</span>
          <h2>Where this idea is used.</h2>
        </div>
      </div>
      {relationMap.length > 0 ? (
        <div className="knowledge-relation-map" aria-label="Knowledge relation map">
          <div>
            <span>knowledge.graph(&quot;thin&quot;)</span>
            <strong>Most related paths</strong>
          </div>
          <div className="knowledge-relation-grid">
            {relationMap.map((item) => (
              <LinkOrAnchor
                href={item.href}
                className="knowledge-relation-card"
                key={`${item.href}-${item.title}-relation`}
              >
                <span>{item.meta}</span>
                <strong>{item.title}</strong>
                <small>{item.reason}</small>
              </LinkOrAnchor>
            ))}
          </div>
        </div>
      ) : null}
      <div className="knowledge-trail-lanes">
        <TrailLane label="Related writing" icon={BookOpenText} items={relatedWriting} />
        <TrailLane label="Project evidence" icon={Boxes} items={projectEvidence} />
        <TrailLane label="Reference links" icon={ExternalLink} items={referenceLinks} />
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
          <TrailLink item={item} key={`${item.href}-${item.title}`} />
        ))}
      </div>
    </div>
  );
}

function TrailLink({ item }: { item: TrailItem }) {
  const content = (
    <>
      <span>{item.meta}</span>
      <strong>{item.title}</strong>
      <small>{item.summary}</small>
      <small className="knowledge-trail-reason">{item.reason}</small>
      <ArrowRight size={17} aria-hidden="true" />
    </>
  );

  if (item.href.startsWith("http")) {
    return (
      <a href={item.href} className="knowledge-trail-link">
        {content}
      </a>
    );
  }

  return (
    <Link href={item.href} className="knowledge-trail-link">
      {content}
    </Link>
  );
}

function LinkOrAnchor({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: ReactNode;
}) {
  if (href.startsWith("http")) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
