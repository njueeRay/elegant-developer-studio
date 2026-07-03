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
    slug: "truth-source-before-polish",
    kind: "Decision",
    title: "事实源先于视觉打磨",
    summary:
      "当主域名、RSS、sitemap、证据和 README 不一致时，继续打磨视觉只会放大不可信。",
    signal: "用于判断下一阶段应该修事实一致性，还是继续增加新组件和新动效。",
    protects:
      "它防止个人主页变成精致但不诚实的展示层。主站 URL、canonical、RSS、robots、sitemap、项目证据和 README 必须先说同一件事。",
    citation:
      "当审计发现事实源漂移、过期证据或假状态时引用这条规则。它是 Phase 25 的核心判断。",
    status: "Evergreen",
    tags: ["中文", "SEO", "Evidence", "Phase 25"],
    source: "2026-07-03 audit",
    related: [
      { label: "Truth source audit", href: "/blog/homepage-truth-source-audit" },
      { label: "Project map", href: "/projects/studio-knowledge-base" },
    ],
    relatedPostSlugs: ["homepage-truth-source-audit", "raynode-standalone-deployment"],
    relatedProjectSlugs: ["lumen", "studio-knowledge-base"],
    backlinks: [
      {
        label: "个人主页先说真话",
        href: "/blog/homepage-truth-source-audit#truth-before-style",
        context: "解释为什么事实源优先级高于继续扩展页面表面。",
      },
      {
        label: "Phase 25 todo",
        href: "/projects/studio-knowledge-base",
        context: "Phase 25 将事实源一致性列为 P0。",
      },
    ],
  },
  {
    slug: "deployment-is-product-surface",
    kind: "Pattern",
    title: "部署也是产品表面",
    summary:
      "自托管、反代、systemd、RSS、sitemap 和回滚路径都会影响用户与搜索引擎对站点的信任。",
    signal: "用于把部署从幕后脚本提升为个人工作室可信度的一部分。",
    protects:
      "它防止团队只验证页面视觉，而忽略服务状态、主域名、证书、RSS、robots、sitemap 和可恢复部署路径。",
    citation:
      "当新增主站、迁移服务器或变更部署策略时引用这条规则。",
    status: "Working",
    tags: ["中文", "Deployment", "Operations", "Trust"],
    source: "RayNode deployment review",
    related: [
      { label: "RayNode deployment", href: "/blog/raynode-standalone-deployment" },
      { label: "Projects", href: "/projects" },
    ],
    relatedPostSlugs: ["raynode-standalone-deployment", "homepage-truth-source-audit"],
    relatedProjectSlugs: ["lumen", "codex-feishu-bridge"],
    backlinks: [
      {
        label: "RayNode 自托管部署复盘",
        href: "/blog/raynode-standalone-deployment#deployment-is-product-trust",
        context: "部署链路被定义为个人站可信度的一部分。",
      },
      {
        label: "Lumen Design System",
        href: "/projects/lumen",
        context: "项目证据包现在指向 RayNode 主站而不是旧 Vercel 主站。",
      },
    ],
  },
  {
    slug: "agent-handoff-contract",
    kind: "Decision",
    title: "Agent handoff is a contract",
    summary:
      "长周期 AI 协作不能依赖聊天记忆，必须依赖当前上下文、恢复点、验证命令和明确阻塞条件。",
    signal: "Use when a task crosses sessions, tools, deployments, or agent handoffs.",
    protects:
      "It prevents the next agent from restarting the project from vibes. A handoff must say what is true, what changed, what is blocked, what command proves it, and what must not be reverted.",
    citation:
      "Use this rule when updating CURRENT_CONTEXT, deployment handoffs, progress logs, or external Feishu sync notes.",
    status: "Evergreen",
    tags: ["AI", "Workflow", "Handoff", "Traceability"],
    source: "Agent collaboration review",
    related: [
      { label: "Agent handoff essay", href: "/blog/agent-handoff-loop" },
      { label: "Codex Feishu Bridge", href: "/projects/codex-feishu-bridge" },
    ],
    relatedPostSlugs: ["agent-handoff-loop", "chinese-as-product-memory"],
    relatedProjectSlugs: ["codex-feishu-bridge", "studio-knowledge-base"],
    backlinks: [
      {
        label: "AI Agent 交接不是聊天记录",
        href: "/blog/agent-handoff-loop#handoff-needs-recovery-points",
        context: "定义交接中必须包含的恢复点。",
      },
      {
        label: "Codex Feishu Bridge",
        href: "/projects/codex-feishu-bridge",
        context: "项目把本地 Markdown 和 Feishu Wiki 作为 handoff 的双层记忆。",
      },
    ],
  },
  {
    slug: "evidence-without-precision-theater",
    kind: "Pattern",
    title: "Evidence without precision theater",
    summary:
      "证据应该说明来源、部署、验证方式和行为覆盖，不应该手写容易腐烂的测试数量和旧部署 ID。",
    signal: "Use before adding metrics, deployment IDs, commits, or test counts to a public portfolio card.",
    protects:
      "It protects evidence cards from becoming precise but stale. Volatile facts belong in CI, release traces, generated data, or version logs.",
    citation:
      "Use this when reviewing Evidence Pack, Case Study Diff, release notes, and project cards.",
    status: "Evergreen",
    tags: ["Evidence", "Portfolio", "Testing", "Trust"],
    source: "Phase 25 audit",
    related: [
      { label: "Evidence essay", href: "/blog/evidence-without-precision-theater" },
      { label: "Lumen project", href: "/projects/lumen" },
    ],
    relatedPostSlugs: ["evidence-without-precision-theater", "homepage-truth-source-audit"],
    relatedProjectSlugs: ["lumen", "studio-knowledge-base"],
    backlinks: [
      {
        label: "Evidence Without Precision Theater",
        href: "/blog/evidence-without-precision-theater#volatile-facts-need-a-home",
        context: "Explains why volatile facts need generated or release-backed sources.",
      },
      {
        label: "Lumen Design System",
        href: "/projects/lumen#project-evidence-title",
        context: "Evidence Pack now avoids hard-coded test counts and old deployment IDs.",
      },
    ],
  },
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
