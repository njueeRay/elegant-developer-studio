"use client";

import Link from "next/link";
import { BookOpenText, Braces, Check, Copy, GitBranch, Lightbulb, Waypoints } from "lucide-react";
import { useState } from "react";
import { SourceReveal } from "@/components/content/source-reveal";
import type { KnowledgeEntry, KnowledgeKind } from "@/data/knowledge";
import { writeToClipboard } from "@/lib/clipboard";

const iconByKind: Record<KnowledgeKind, typeof Lightbulb> = {
  Pattern: Waypoints,
  Snippet: Braces,
  Decision: GitBranch,
  Reference: BookOpenText,
};

export function KnowledgeCard({ entry }: { entry: KnowledgeEntry }) {
  const [copied, setCopied] = useState(false);
  const Icon = iconByKind[entry.kind];

  const copyRef = async () => {
    const path = `/knowledge/${entry.slug}`;
    const value =
      typeof window === "undefined" ? path : `${window.location.origin}${path}`;

    const didCopy = await writeToClipboard(value);

    if (didCopy) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
      return;
    }

    setCopied(false);
  };

  return (
    <article className="knowledge-card" id={entry.slug}>
      <div className="knowledge-card-icon" aria-hidden="true">
        <Icon size={20} />
      </div>

      <div className="knowledge-card-body">
        <div className="knowledge-meta-row">
          <span>{entry.kind}</span>
          <span>{entry.status}</span>
          <span>{entry.source}</span>
        </div>
        <h2>{entry.title}</h2>
        <p>{entry.summary}</p>
        <div className="knowledge-signal">
          <span>signal</span>
          <strong>{entry.signal}</strong>
        </div>
        <div className="tag-row content-tags">
          {entry.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <div className="knowledge-related" aria-label={`${entry.title} related links`}>
          <Link href={`/knowledge/${entry.slug}`}>Open detail</Link>
          {entry.related.map((link) =>
            link.href.startsWith("mailto:") ? (
              <a href={link.href} key={link.href}>
                {link.label}
              </a>
            ) : (
              <Link href={link.href} key={link.href}>
                {link.label}
              </Link>
            ),
          )}
        </div>
        <div className="knowledge-backlinks" aria-label={`${entry.title} backlinks`}>
          <span>Backlinks</span>
          {entry.backlinks.map((link) => (
            <Link href={link.href} key={link.href}>
              <strong>{link.label}</strong>
              <small>{link.context}</small>
            </Link>
          ))}
        </div>
        <SourceReveal
          label="source"
          path="src/data/knowledge.ts"
          testId={`source-link-knowledge-${entry.slug}`}
        />
      </div>

      <button
        type="button"
        className="knowledge-copy"
        data-testid={`knowledge-copy-${entry.slug}`}
        aria-label={`Copy reference for ${entry.title}`}
        onClick={copyRef}
      >
        {copied ? <Check size={15} /> : <Copy size={15} />}
        {copied ? "Copied" : "Copy ref"}
      </button>
    </article>
  );
}
