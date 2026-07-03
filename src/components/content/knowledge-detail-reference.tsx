"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { DataSourceBadge } from "@/components/data-source-badge";
import type { KnowledgeEntry } from "@/data/knowledge";
import { writeToClipboard } from "@/lib/clipboard";
import { emitCommandTrace } from "@/lib/command-trace";

export function KnowledgeDetailReference({ entry }: { entry: KnowledgeEntry }) {
  const [copied, setCopied] = useState(false);

  const copyReference = async () => {
    const href = `${window.location.origin}/knowledge/${entry.slug}`;
    await writeToClipboard(`[${entry.title}](${href}) - ${entry.citation}`);
    emitCommandTrace({
      command: `ref.copy("knowledge/${entry.slug}")`,
      label: entry.title,
      href: `/knowledge/${entry.slug}`,
      meta: `${entry.kind} / Markdown ref`,
    });
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div className="knowledge-detail-reference" aria-label="Knowledge reference object">
      <DataSourceBadge
        source={entry.source}
        command={`knowledge.trace("${entry.slug}")`}
        route={`/knowledge/${entry.slug}`}
        verifiedAt={entry.status}
        tone="sage"
      />
      <button type="button" data-testid="knowledge-detail-copy-ref" onClick={copyReference}>
        {copied ? <Check size={14} /> : <Copy size={14} />}
        {copied ? "Copied ref" : "Copy Markdown ref"}
      </button>
    </div>
  );
}
