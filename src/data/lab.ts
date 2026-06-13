export type LabCategory = "Command" | "Content" | "Media" | "System" | "Profile";

export type LabStatus = "Stable" | "Iterating" | "Planned";

export type LabComponent = {
  slug: string;
  name: string;
  category: LabCategory;
  status: LabStatus;
  component: string;
  source: string;
  route: string;
  description: string;
  signal: string;
  evidence: string;
  reusableFor: string[];
  importPath: string;
  shortcut: string;
};

export type LabExperiment = {
  step: string;
  title: string;
  description: string;
  status: LabStatus;
};

export type LabQualityGate = {
  name: string;
  detail: string;
  signal: string;
};

export const labComponents: LabComponent[] = [
  {
    slug: "global-command-menu",
    name: "GlobalCommandMenu",
    category: "Command",
    status: "Stable",
    component: "Command Center",
    source: "src/components/global-command-menu.tsx",
    route: "/",
    description:
      "A global command surface for routes, content, projects, knowledge, tools, profile signals, and recent actions.",
    signal: "Keyboard-first navigation with context ranking and grouped results.",
    evidence: "Verified across home, writing, projects, photos, music, knowledge, uses, and about.",
    reusableFor: ["Navigation", "Search", "Quick actions"],
    importPath: "@/components/global-command-menu",
    shortcut: "K",
  },
  {
    slug: "filter-bar",
    name: "FilterBar",
    category: "System",
    status: "Stable",
    component: "Segmented filter",
    source: "src/components/content/filter-bar.tsx",
    route: "/knowledge",
    description:
      "A compact reusable filter toolbar with result count, active state, horizontal mobile behavior, and clear action.",
    signal: "One filter model now serves writing, projects, photos, knowledge, uses, and Lab.",
    evidence: "Prevents hidden state by pairing every filter with counts and a reset control.",
    reusableFor: ["Archives", "Media", "Component inventory"],
    importPath: "@/components/content/filter-bar",
    shortcut: "F",
  },
  {
    slug: "status-panel",
    name: "StatusPanel",
    category: "System",
    status: "Stable",
    component: "Current work signal",
    source: "src/components/status-panel.tsx",
    route: "/",
    description:
      "A lightweight studio status surface for what is being written, built, and listened to right now.",
    signal: "Shows motion without turning the homepage into a dashboard.",
    evidence: "Anchors the first screen with current context while preserving editorial calm.",
    reusableFor: ["Home", "About", "Lab quality summary"],
    importPath: "@/components/status-panel",
    shortcut: "S",
  },
  {
    slug: "knowledge-card",
    name: "KnowledgeCard",
    category: "Content",
    status: "Stable",
    component: "Knowledge reference",
    source: "src/components/content/knowledge-card.tsx",
    route: "/knowledge",
    description:
      "A linkable public memory object with type, status, source, signal, related links, tags, and copyable reference.",
    signal: "Turns private project memory into a reusable public trail.",
    evidence: "Feeds Command Center and Feishu trace through stable slugs.",
    reusableFor: ["Knowledge", "Notes", "Decision records"],
    importPath: "@/components/content/knowledge-card",
    shortcut: "R",
  },
  {
    slug: "uses-explorer",
    name: "UsesShelf",
    category: "Content",
    status: "Iterating",
    component: "Tool shelf",
    source: "src/components/content/uses-explorer.tsx",
    route: "/uses",
    description:
      "A workbench surface for tools, workflows, automation, publishing rhythm, and copyable stack references.",
    signal: "Explains how the studio works instead of listing logos.",
    evidence: "Uses data model, category filtering, copy feedback, and workflow panels.",
    reusableFor: ["Uses", "Workflow", "Stack pages"],
    importPath: "@/components/content/uses-explorer",
    shortcut: "U",
  },
  {
    slug: "about-profile",
    name: "AboutProfile",
    category: "Profile",
    status: "Iterating",
    component: "Studio profile",
    source: "src/components/content/about-profile.tsx",
    route: "/about",
    description:
      "A profile system for principles, timeline focus, capabilities, working agreements, and contact routes.",
    signal: "Makes the person inspectable without becoming a resume template.",
    evidence: "Adds principle selection, timeline focus, copy intro, and command routes.",
    reusableFor: ["About", "Contact", "Portfolio OS"],
    importPath: "@/components/content/about-profile",
    shortcut: "A",
  },
  {
    slug: "mini-player",
    name: "MiniPlayer",
    category: "Media",
    status: "Stable",
    component: "Music state",
    source: "src/components/media/mini-player.tsx",
    route: "/music",
    description:
      "A refined music surface with play state, track selection, progress, volume, current context, and now playing card.",
    signal: "Adds atmosphere with real controls instead of decorative audio furniture.",
    evidence: "Supports play, pause, previous, next, seek, volume, and active track display.",
    reusableFor: ["Music", "Home media", "Now playing"],
    importPath: "@/components/media/mini-player",
    shortcut: "M",
  },
  {
    slug: "photo-grid",
    name: "PhotoGrid",
    category: "Media",
    status: "Stable",
    component: "Photo memory",
    source: "src/components/media/photo-grid.tsx",
    route: "/photos",
    description:
      "A responsive photo archive with featured filtering, tag filtering, image grid, and lightbox browsing.",
    signal: "Keeps personal memory visually rich while still searchable.",
    evidence: "FilterBar, featured band, grid, keyboard-safe close, previous, and next states.",
    reusableFor: ["Photos", "Albums", "Project media"],
    importPath: "@/components/media/photo-grid",
    shortcut: "P",
  },
  {
    slug: "code-block",
    name: "CodeBlock",
    category: "Content",
    status: "Stable",
    component: "Code frame",
    source: "src/components/content/code-block.tsx",
    route: "/blog/interface-is-a-promise",
    description:
      "A readable code frame with toolbar metadata, language label, and copy feedback for MDX writing.",
    signal: "Lets programmer identity show through useful source material, not fake terminal decoration.",
    evidence: "Rendered inside MDX articles and verified through the content build.",
    reusableFor: ["Blog", "Knowledge", "Lab examples"],
    importPath: "@/components/content/code-block",
    shortcut: "C",
  },
];

export const labExperiments: LabExperiment[] = [
  {
    step: "01",
    title: "Component registry",
    description: "Make reusable surfaces searchable, copyable, and traceable from one public page.",
    status: "Stable",
  },
  {
    step: "02",
    title: "Preview states",
    description: "Let a selected component expose source, route, reuse targets, quality proof, and import path.",
    status: "Iterating",
  },
  {
    step: "03",
    title: "ComponentPreview",
    description: "Render isolated component examples once examples become richer than static metadata.",
    status: "Planned",
  },
  {
    step: "04",
    title: "ReactionBar",
    description: "Add reader feedback only after content pages have enough repeat traffic to justify it.",
    status: "Planned",
  },
];

export const labQualityGates: LabQualityGate[] = [
  {
    name: "Real usage",
    detail: "Every component in Lab must have an active route, source file, or explicit planned reason.",
    signal: "No empty showcase objects",
  },
  {
    name: "Responsive proof",
    detail: "Desktop and mobile layouts must be checked after every Lab-facing component change.",
    signal: "No overflow, no cramped labels",
  },
  {
    name: "Traceable decisions",
    detail: "Research, QA, deployment, GitHub, and Feishu records must stay connected to each phase.",
    signal: "Docs and code move together",
  },
  {
    name: "Useful interaction",
    detail: "Motion and micro-interactions must reveal state, reduce effort, or support navigation.",
    signal: "No cute-only behavior",
  },
];

export function getLabCategories(components = labComponents) {
  return Array.from(new Set(components.map((component) => component.category)));
}

export function getLabRegistryReference(components = labComponents) {
  return components
    .map((component) => `lab:${component.slug} | ${component.name} | ${component.source}`)
    .join("\n");
}
