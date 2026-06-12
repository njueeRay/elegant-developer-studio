import Link from "next/link";
import {
  ArrowRight,
  GitBranch,
  Headphones,
  PenLine,
  type LucideIcon,
} from "lucide-react";
import type { Mix } from "@/data/media";
import type { PostMeta, ProjectMeta } from "@/lib/content";

type StatusPanelProps = {
  post?: PostMeta;
  project?: ProjectMeta;
  mix: Mix;
};

type StatusItem = {
  eyebrow: string;
  title: string;
  description: string;
  meta: string;
  href: string;
  icon: LucideIcon;
  tone: "rust" | "blue" | "sage";
};

export function StatusPanel({ post, project, mix }: StatusPanelProps) {
  const leadTrack = mix.tracks[0];
  const items: StatusItem[] = [
    {
      eyebrow: "Writing",
      title: post?.title ?? "Interface notes",
      description:
        post?.summary ??
        "Drafting field notes about interfaces, systems, and calm software.",
      meta: post ? `${post.readingTime} / ${post.status}` : "Drafting / v0.1",
      href: post ? `/blog/${post.slug}` : "/blog",
      icon: PenLine,
      tone: "rust",
    },
    {
      eyebrow: "Building",
      title: project?.title ?? "Studio OS",
      description:
        project?.summary ??
        "Turning the personal site into a small operating surface for work.",
      meta: project ? `${project.role} / ${project.status}` : "Active / main",
      href: project ? `/projects/${project.slug}` : "/projects",
      icon: GitBranch,
      tone: "blue",
    },
    {
      eyebrow: "Listening",
      title: leadTrack ? leadTrack.title : mix.title,
      description: mix.description,
      meta: leadTrack ? `${leadTrack.artist} / ${leadTrack.context}` : mix.context,
      href: "/music",
      icon: Headphones,
      tone: "sage",
    },
  ];

  return (
    <section className="studio-status-panel" aria-label="Current studio status">
      <div className="status-panel-heading">
        <span className="status-dot live" aria-hidden="true" />
        <div>
          <p className="section-kicker rust">Now in studio</p>
          <h2>Current loops</h2>
        </div>
      </div>
      <div className="status-panel-grid">
        {items.map((item) => (
          <StatusCard key={item.eyebrow} item={item} />
        ))}
      </div>
    </section>
  );
}

function StatusCard({ item }: { item: StatusItem }) {
  const Icon = item.icon;

  return (
    <Link href={item.href} className={`status-panel-card ${item.tone}`}>
      <div className="status-panel-icon" aria-hidden="true">
        <Icon size={19} />
      </div>
      <div className="status-panel-copy">
        <p>{item.eyebrow}</p>
        <h3>{item.title}</h3>
        <span>{item.description}</span>
        <small>{item.meta}</small>
      </div>
      <ArrowRight className="status-panel-arrow" size={18} aria-hidden="true" />
    </Link>
  );
}
