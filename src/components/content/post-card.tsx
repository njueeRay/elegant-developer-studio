import { ArrowRight, CalendarDays, FileText } from "lucide-react";
import Link from "next/link";
import { formatDate, type PostMeta } from "@/lib/content";

export function PostCard({ post, compact = false }: { post: PostMeta; compact?: boolean }) {
  return (
    <Link href={`/blog/${post.slug}`} className={`post-card ${compact ? "compact" : ""}`}>
      <div className="post-card-icon">
        <FileText size={20} />
      </div>
      <div className="post-card-body">
        <div className="content-meta-row">
          <span>
            <CalendarDays size={14} />
            {formatDate(post.date)}
          </span>
          <span>{post.readingTime}</span>
          <span>{post.status}</span>
        </div>
        <h2>{post.title}</h2>
        <p>{post.summary}</p>
        <div className="tag-row content-tags">
          {post.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
      <ArrowRight className="card-arrow" size={20} />
    </Link>
  );
}
