export type CollaborationSurface = {
  title: string;
  intent: string;
  route: string;
  owner: string;
  evidence: string;
};

export type CollaborationStep = {
  step: string;
  title: string;
  detail: string;
  output: string;
};

export type CreativeIdea = {
  slug: string;
  title: string;
  category: "Interaction" | "UI" | "Content" | "Component";
  priority: "Now" | "Next" | "Later";
  description: string;
  why: string;
  risk: string;
};

export const collaborationStatus = {
  phase: "Phase 9",
  title: "Collaboration governance and creative direction",
  summary:
    "A public operating layer for how ideas enter the studio, how changes are reviewed, and which creative experiments deserve implementation.",
  currentBias:
    "Small, memorable interactions with clear utility. No decorative complexity until content depth catches up.",
};

export const collaborationSteps: CollaborationStep[] = [
  {
    step: "01",
    title: "Frame the change",
    detail: "Start from a route, component, document, or visible user problem instead of a vague preference.",
    output: "GitHub issue, Feishu comment, or local doc note with context and goal.",
  },
  {
    step: "02",
    title: "Classify the surface",
    detail: "Decide whether the work belongs to product structure, content, interaction, visual system, or repository governance.",
    output: "A clear owner area and a narrow first slice.",
  },
  {
    step: "03",
    title: "Ship with trace",
    detail: "Every meaningful phase should update source, tests, project map, progress log, version trace, GitHub, and Feishu.",
    output: "Commit, deployment, verification record, and synced knowledge document.",
  },
  {
    step: "04",
    title: "Review creative debt",
    detail: "After each feature, inspect whether the site gained character or merely gained more UI.",
    output: "Creative backlog update and a short expert review.",
  },
];

export const collaborationSurfaces: CollaborationSurface[] = [
  {
    title: "Public idea intake",
    intent: "Structured collaboration, feature ideas, and design discussion.",
    route: "/contact -> GitHub Issue Form",
    owner: "Issue templates",
    evidence: ".github/ISSUE_TEMPLATE/contact.yml",
  },
  {
    title: "Project memory",
    intent: "Route map, stage records, version trace, and long-lived decisions.",
    route: "/knowledge + docs/",
    owner: "Project map",
    evidence: "docs/PROJECT_MAP.md",
  },
  {
    title: "Component proof",
    intent: "Reusable UI patterns, quality gates, and experiment inventory.",
    route: "/lab",
    owner: "Component registry",
    evidence: "src/data/lab.ts",
  },
  {
    title: "Cloud collaboration",
    intent: "Readable review surface, comments, and synced phase docs.",
    route: "Feishu Wiki",
    owner: "Feishu sync map",
    evidence: "docs/FEISHU_SYNC.md",
  },
];

export const creativeAssessment = {
  strengths: [
    "The site already has a coherent warm developer-studio tone instead of a generic portfolio template.",
    "Command Center, Knowledge, Uses, Lab, and Contact form a real operating system skeleton.",
    "The interaction model is useful first: keyboard navigation, filters, copy feedback, lightbox, and player state.",
    "The repo has unusually strong traceability for a personal homepage: docs, issues, deployment, and Feishu are linked.",
  ],
  weaknesses: [
    "The site still needs one unmistakable signature interaction that people remember after leaving.",
    "Some pages are structurally strong but emotionally thin because the content is still mostly seed material.",
    "Projects need deeper case-study evidence: role, constraints, process, tradeoffs, outcome, and screenshots.",
    "Music and photos are elegant, but they need richer personal metadata before they feel like a memory layer.",
  ],
  direction:
    "Do not add a mascot or heavy animation yet. First add interaction that feels like a programmer built a thoughtful studio: command traces, source-aware hover states, timeline scrubbing, and small inspectable details.",
};

export const creativeIdeas: CreativeIdea[] = [
  {
    slug: "command-trace",
    title: "Command Trace",
    category: "Interaction",
    priority: "Now",
    description:
      "After a Command Center navigation, briefly show a subtle trace line such as `cmd.open('/lab')` near the destination header.",
    why: "It makes keyboard navigation feel authored and technical without pretending to be a terminal.",
    risk: "Can become noisy if it appears on every navigation; should be dismissive, brief, and reduced-motion aware.",
  },
  {
    slug: "source-hover",
    title: "Source Hover",
    category: "UI",
    priority: "Now",
    description:
      "On Lab, Knowledge, and project cards, hover can reveal a tiny source path or reference token in a mono caption.",
    why: "It turns programmer identity into real inspectability rather than decorative code rain.",
    risk: "Long paths can overflow; must use stable truncation and mobile-safe disclosure.",
  },
  {
    slug: "reading-focus-lens",
    title: "Reading Focus Lens",
    category: "Interaction",
    priority: "Next",
    description:
      "Refine the existing reader glow into a selectable paragraph focus mode with copy-link and outline sync.",
    why: "It adds craft to blog reading while serving real article navigation.",
    risk: "If over-animated, it will pollute the calm Claude-like reading tone.",
  },
  {
    slug: "memory-map",
    title: "Memory Map",
    category: "Content",
    priority: "Next",
    description:
      "Connect posts, projects, photos, tools, and knowledge entries through a small related-object rail.",
    why: "The strongest future value is not more pages, but visible relationships between artifacts.",
    risk: "A full graph would be overkill; start as curated relations before any graph visualization.",
  },
  {
    slug: "case-study-diff",
    title: "Case Study Diff",
    category: "Component",
    priority: "Next",
    description:
      "Project pages can show before/after decisions as a visual diff: problem, constraint, tradeoff, shipped result.",
    why: "This would make portfolio pages feel like engineering thinking, not gallery summaries.",
    risk: "Needs real project evidence; otherwise it becomes a fake process widget.",
  },
  {
    slug: "studio-companion",
    title: "Studio Companion",
    category: "Interaction",
    priority: "Later",
    description:
      "A tiny contextual helper that appears only in empty states or long pauses, never as a persistent pet.",
    why: "It could add playfulness, but only if it improves recovery, onboarding, or discovery.",
    risk: "High risk of looking juvenile. Defer until the core content and signature interactions are stronger.",
  },
];

export function getCreativeReference() {
  return creativeIdeas
    .map((idea) => `${idea.priority} | ${idea.category} | ${idea.title} | ${idea.slug}`)
    .join("\n");
}
