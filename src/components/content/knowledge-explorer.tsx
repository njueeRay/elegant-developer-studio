"use client";

import { useMemo, useState } from "react";
import { FilterBar } from "@/components/content/filter-bar";
import { KnowledgeCard } from "@/components/content/knowledge-card";
import type { KnowledgeEntry } from "@/data/knowledge";

export function KnowledgeExplorer({
  entries,
  kinds,
}: {
  entries: KnowledgeEntry[];
  kinds: string[];
}) {
  const [activeKind, setActiveKind] = useState("All");
  const filtered = useMemo(
    () =>
      activeKind === "All"
        ? entries
        : entries.filter((entry) => entry.kind === activeKind),
    [activeKind, entries],
  );
  const tagCount = new Set(entries.flatMap((entry) => entry.tags)).size;
  const activeEntry = filtered[0] ?? entries[0];

  return (
    <section className="knowledge-explorer" aria-label="Knowledge explorer">
      <FilterBar
        label="Filter knowledge"
        active={activeKind}
        items={["All", ...kinds]}
        onChange={setActiveKind}
        resultCount={filtered.length}
        totalCount={entries.length}
        noun="entries"
      />

      <div className="knowledge-layout">
        <aside className="knowledge-index-panel" aria-label="Knowledge index map">
          <p className="section-kicker blue">Index map</p>
          <h2>Small pieces, strong trails.</h2>
          <p>
            This is a public memory layer for reusable ideas, decisions, and
            snippets. It favors clear scent and stable references over a large
            decorative graph.
          </p>
          <dl>
            <div>
              <dt>Entries</dt>
              <dd>{entries.length}</dd>
            </div>
            <div>
              <dt>Types</dt>
              <dd>{kinds.length}</dd>
            </div>
            <div>
              <dt>Tags</dt>
              <dd>{tagCount}</dd>
            </div>
          </dl>
          <div className="knowledge-current">
            <span>Current trail</span>
            <strong>{activeEntry?.title}</strong>
          </div>
        </aside>

        <div className="knowledge-list">
          {filtered.length > 0 ? (
            filtered.map((entry) => (
              <KnowledgeCard entry={entry} key={entry.slug} />
            ))
          ) : (
            <div className="filter-empty" role="status">
              <span>No knowledge entries match this filter yet.</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
