export type KnowledgeKind = "Pattern" | "Snippet" | "Decision" | "Reference";

export type KnowledgeStatus = "Evergreen" | "Working" | "Queued";

export type KnowledgeEntry = {
  slug: string;
  kind: KnowledgeKind;
  title: string;
  summary: string;
  signal: string;
  protects: string;
  citation: string;
  status: KnowledgeStatus;
  tags: string[];
  source: string;
  related: Array<{
    label: string;
    href: string;
  }>;
  relatedPostSlugs: string[];
  relatedProjectSlugs: string[];
  backlinks: Array<{
    label: string;
    href: string;
    context: string;
  }>;
};

export const knowledgeEntries: KnowledgeEntry[] = [
  {
    slug: "public-reachable-before-internal-complete",
    kind: "Decision",
    title: "公开可达优先于内部完成",
    summary:
      "一个页面、组件或知识条目只有在用户能从公开路径进入时，才算真正进入产品系统。",
    signal: "用于审查 Uses、About、Lab、Knowledge 等页面是否只是内部存在，而没有公开入口。",
    protects:
      "它防止团队把页面、组件或文档误认为已经完成，实际上用户没有公开入口、搜索不到、也无法评论。每次新增表面都要问：它是否出现在导航、sitemap、Command Center、相关内容路径或明确二级入口里？",
    citation:
      "当评审一个页面是否真正进入产品系统时引用这条规则。它尤其适合用于导航审计、飞书评论、PR 说明和阶段复盘。",
    status: "Evergreen",
    tags: ["中文", "IA", "Navigation", "Traceability"],
    source: "Phase 13-16 review",
    related: [
      { label: "Navigation OS 复盘", href: "/knowledge/public-reachable-before-internal-complete" },
      { label: "Uses", href: "/uses" },
      { label: "About", href: "/about" },
    ],
    relatedPostSlugs: ["chinese-as-product-memory"],
    relatedProjectSlugs: ["studio-knowledge-base"],
    backlinks: [
      {
        label: "把中文作为产品记忆",
        href: "/blog/chinese-as-product-memory#where-chinese-should-live",
        context: "中文内容试点说明哪些内容应该进入公开站点。",
      },
      {
        label: "Lab",
        href: "/lab",
        context: "组件只有可发现、可预览、可追踪时才算进入系统。",
      },
    ],
  },
  {
    slug: "interfaces-are-promises",
    kind: "Pattern",
    title: "Interfaces are promises",
    summary:
      "A durable interface should make system behavior legible before the user commits attention or effort.",
    signal: "Use when judging whether a component explains what will happen next.",
    protects:
      "It protects the gap between visual polish and behavioral trust. If a button, card, command, or filter does not reveal consequence, status, and next step before action, the interface is making a vague promise.",
    citation:
      "Use this entry when reviewing action surfaces, command results, cards, and content trails that need to make system behavior legible.",
    status: "Evergreen",
    tags: ["Interaction", "Writing", "Trust"],
    source: "Essay thread",
    related: [
      { label: "Read essay", href: "/blog/interface-is-a-promise" },
      { label: "Command Center", href: "/projects/studio-knowledge-base" },
    ],
    relatedPostSlugs: ["interface-is-a-promise", "commands-that-respect-attention"],
    relatedProjectSlugs: ["lumen"],
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
    protects:
      "It protects the project from adding search infrastructure before the content model is dense enough to justify it. Visible filters keep the system inspectable while tags, languages, kinds, and stacks are still small and editorial.",
    citation:
      "Use this decision before introducing Fuse, FlexSearch, external search, or AI search. The current proof is URL-backed filters plus content relation validation.",
    status: "Working",
    tags: ["Filtering", "IA", "Phase 4"],
    source: "Phase 4 research",
    related: [
      { label: "Browse writing", href: "/blog" },
      { label: "Browse photos", href: "/photos" },
    ],
    relatedPostSlugs: ["commands-that-respect-attention"],
    relatedProjectSlugs: ["studio-knowledge-base"],
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
    protects:
      "It keeps ideas portable across GitHub issues, Feishu comments, PR reviews, and local docs. A knowledge entry is not reusable if people must describe it from memory every time.",
    citation:
      "Use the detail URL when referencing a rule in planning documents, issue comments, or review notes. Prefer a stable route over screenshots or copied card text.",
    status: "Working",
    tags: ["Workflow", "References", "GitHub"],
    source: "Studio workflow",
    related: [
      { label: "Project map", href: "/projects/studio-knowledge-base" },
      { label: "Contact", href: "/contact" },
    ],
    relatedPostSlugs: ["interface-is-a-promise"],
    relatedProjectSlugs: ["studio-knowledge-base"],
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
    protects:
      "It prevents the knowledge base from becoming a pile of undifferentiated notes. The taxonomy should clarify whether a piece teaches, guides, explains, or documents reference material without forcing that structure into the visible UI too early.",
    citation:
      "Use this when deciding how to label future writing, Knowledge entries, docs, and project records. It is a quiet editorial rule, not a decorative section system.",
    status: "Queued",
    tags: ["Documentation", "Taxonomy", "Learning"],
    source: "Documentation IA",
    related: [
      { label: "Writing archive", href: "/blog" },
      { label: "Selected work", href: "/projects" },
    ],
    relatedPostSlugs: ["calm-systems-for-creative-work"],
    relatedProjectSlugs: ["studio-knowledge-base"],
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
    protects:
      "It protects the studio from making relationship visualization before relationships are useful. A few explicit trails, backlinks, and queryable lists beat a beautiful but underpopulated global graph.",
    citation:
      "Use this whenever a graph, constellation, canvas, or network view is proposed. First prove the local trails have enough density and user value.",
    status: "Evergreen",
    tags: ["Knowledge", "Links", "Restraint"],
    source: "PKM research",
    related: [
      { label: "Knowledge project", href: "/projects/studio-knowledge-base" },
      { label: "Photos", href: "/photos" },
    ],
    relatedPostSlugs: ["calm-systems-for-creative-work", "chinese-as-product-memory"],
    relatedProjectSlugs: ["studio-knowledge-base"],
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

export function getKnowledgeEntry(slug: string) {
  return knowledgeEntries.find((entry) => entry.slug === slug);
}

export function getAllKnowledgeSlugs() {
  return knowledgeEntries.map((entry) => entry.slug);
}
