export type KnowledgeKind = "Pattern" | "Snippet" | "Decision" | "Reference";

export type KnowledgeStatus = "Evergreen" | "Working" | "Queued";

export type KnowledgeEntry = {
  slug: string;
  kind: KnowledgeKind;
  title: string;
  summary: string;
  signal: string;
  status: KnowledgeStatus;
  tags: string[];
  source: string;
  related: Array<{
    label: string;
    href: string;
  }>;
  backlinks: Array<{
    label: string;
    href: string;
    context: string;
  }>;
};

export const knowledgeEntries: KnowledgeEntry[] = [
  {
    slug: "interfaces-are-promises",
    kind: "Pattern",
    title: "Interfaces are promises",
    summary:
      "A durable interface should make system behavior legible before the user commits attention or effort.",
    signal: "Use when judging whether a component explains what will happen next.",
    status: "Evergreen",
    tags: ["Interaction", "Writing", "Trust"],
    source: "Essay thread",
    related: [
      { label: "Read essay", href: "/blog/interface-is-a-promise" },
      { label: "Command Center", href: "/projects/studio-knowledge-base" },
    ],
    backlinks: [
      {
        label: "The Interface is a Promise",
        href: "/blog/interface-is-a-promise#a-promise-has-shape",
        context: "Principle for action consequences and visible system state.",
      },
      {
        label: "Lumen Design System",
        href: "/projects/lumen",
        context: "Used as the design-system rule for cards, buttons, and command surfaces.",
      },
    ],
  },
  {
    slug: "filters-before-search",
    kind: "Decision",
    title: "Filters before full search",
    summary:
      "Visible filters are cheaper and clearer than a separate search index while content volume is still small.",
    signal: "Use before adding Fuse, FlexSearch, or external search infrastructure.",
    status: "Working",
    tags: ["Filtering", "IA", "Phase 4"],
    source: "Phase 4 research",
    related: [
      { label: "Browse writing", href: "/blog" },
      { label: "Browse photos", href: "/photos" },
    ],
    backlinks: [
      {
        label: "FilterBar",
        href: "/lab#filter-bar",
        context: "Component proof that simple visible filters beat premature search.",
      },
      {
        label: "Studio Knowledge Base",
        href: "/projects/studio-knowledge-base",
        context: "Applied to the public knowledge layer before introducing full-text search.",
      },
    ],
  },
  {
    slug: "copyable-knowledge-refs",
    kind: "Snippet",
    title: "Copyable knowledge refs",
    summary:
      "Each public knowledge card should expose a stable permalink so ideas can move between issues, docs, and Feishu comments.",
    signal: "Use when turning a note into a reusable reference inside a project discussion.",
    status: "Working",
    tags: ["Workflow", "References", "GitHub"],
    source: "Studio workflow",
    related: [
      { label: "Project map", href: "/projects/studio-knowledge-base" },
      { label: "Contact", href: "/contact" },
    ],
    backlinks: [
      {
        label: "KnowledgeCard",
        href: "/lab#knowledge-card",
        context: "The card implementation exposes Copy ref as a first-class action.",
      },
      {
        label: "Reading Focus Lens",
        href: "/blog/interface-is-a-promise#the-technical-texture",
        context: "Article sections now also produce copyable references.",
      },
    ],
  },
  {
    slug: "diataxis-for-personal-knowledge",
    kind: "Reference",
    title: "Diataxis as a quiet taxonomy",
    summary:
      "Use tutorial, guide, reference, and explanation as content intent labels, not as rigid visible sections.",
    signal: "Use when deciding whether a note teaches, guides, describes, or explains.",
    status: "Queued",
    tags: ["Documentation", "Taxonomy", "Learning"],
    source: "Documentation IA",
    related: [
      { label: "Writing archive", href: "/blog" },
      { label: "Selected work", href: "/projects" },
    ],
    backlinks: [
      {
        label: "Project map",
        href: "/projects/studio-knowledge-base",
        context: "Used to keep planning docs, references, and decision records separate.",
      },
      {
        label: "Creative backlog",
        href: "/collaboration",
        context: "Helps separate experiments, decisions, and reusable references.",
      },
    ],
  },
  {
    slug: "local-graph-not-global-graph",
    kind: "Pattern",
    title: "Prefer local trails over global graphs",
    summary:
      "A small public knowledge base benefits more from related links and context trails than from a decorative full graph.",
    signal: "Use when tempted to add a large canvas before the note network has enough density.",
    status: "Evergreen",
    tags: ["Knowledge", "Links", "Restraint"],
    source: "PKM research",
    related: [
      { label: "Knowledge project", href: "/projects/studio-knowledge-base" },
      { label: "Photos", href: "/photos" },
    ],
    backlinks: [
      {
        label: "Knowledge explorer",
        href: "/knowledge",
        context: "Current implementation favors related links and backlinks over a full graph.",
      },
      {
        label: "Reading Focus Lens",
        href: "/lab#reading-focus-lens",
        context: "A local reading trail that is more useful than a decorative global graph.",
      },
    ],
  },
];

export function getKnowledgeKinds(entries = knowledgeEntries) {
  return Array.from(new Set(entries.map((entry) => entry.kind))).sort((a, b) =>
    a.localeCompare(b),
  );
}
