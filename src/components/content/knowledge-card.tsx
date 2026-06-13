"use client";

import Link from "next/link";
import { BookOpenText, Braces, Check, Copy, GitBranch, Lightbulb, Waypoints } from "lucide-react";
import { useState } from "react";
import type { KnowledgeEntry, KnowledgeKind } from "@/data/knowledge";

const iconByKind: Record<KnowledgeKind, typeof Lightbulb> = {
  Pattern: Waypoints,
  Snippet: Braces,
  Decision: GitBranch,
  Reference: BookOpenText,
};

export function KnowledgeCard({ entry }: { entry: KnowledgeEntry }) {
  const [copied, setCopied] = useState(false);
  const Icon = iconByKind[entry.kind];

  const copyWithFallback = (value: string) => {
    const textarea = document.createElement("textarea");
    textarea.value = value;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.top = "-9999px";
    document.body.append(textarea);
    textarea.select();
    const didCopy = document.execCommand("copy");
    textarea.remove();

    return didCopy;
  };

  const copyRef = async () => {
    const path = `/knowledge#${entry.slug}`;
    const value =
      typeof window === "undefined" ? path : `${window.location.origin}${path}`;

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
      } else if (!copyWithFallback(value)) {
        throw new Error("Copy fallback failed");
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      if (copyWithFallback(value)) {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1600);
        return;
      }

      setCopied(false);
    }
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
      </div>

      <button
        type="button"
        className="knowledge-copy"
        aria-label={`Copy reference for ${entry.title}`}
        onClick={copyRef}
      >
        {copied ? <Check size={15} /> : <Copy size={15} />}
        {copied ? "Copied" : "Copy ref"}
      </button>
    </article>
  );
}
