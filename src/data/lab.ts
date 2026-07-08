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
  readerValue: string;
  nextUse: string;
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
    readerValue: "Shows visitors that the site can be operated, not merely browsed.",
    nextUse: "Use it when a new route, content type, or quick action should become reachable in one keystroke.",
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
    readerValue: "Makes archives feel controlled by the visitor instead of hidden behind page order.",
    nextUse: "Use it for any list where the filter state should be visible, countable, and reversible.",
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
      "A Personal OS pulse surface for writing, building, knowledge, media, source traces, and guided prompts.",
    readerValue: "Gives the homepage a live studio signal without turning the first screen into a dashboard.",
    nextUse: "Use it when the page needs current context, but the context must stay calm and editorial.",
    signal: "Shows motion and inspectable provenance without turning the homepage into a dashboard.",
    evidence: "Anchors the first screen with current context, source-backed cards, and Ask Me Terminal.",
    reusableFor: ["Home", "About", "Lab quality summary"],
    importPath: "@/components/status-panel",
    shortcut: "S",
  },
  {
    slug: "personal-os-zoo",
    name: "PersonalOsZoo",
    category: "System",
    status: "Iterating",
    component: "Personal OS calibration",
    source: "src/components/personal-os-zoo.tsx",
    route: "/lab",
    description:
      "A component zoo for the source-backed personal homepage grammar: pulse cards, guided prompts, object rows, data-source badges, and density guardrails.",
    readerValue: "Lets experimental personal-OS ideas stay inspectable before they are allowed into the homepage.",
    nextUse: "Use it as the holding area for playful interactions, density tests, and source-backed modules.",
    signal: "Transfers the strongest ursb.me lesson into a reusable system without copying its 27-card density.",
    evidence: "Pairs style genome, object grammar, Ask Me Terminal, and flaw ledger in one inspectable Lab surface.",
    reusableFor: ["Home", "Lab", "About", "Contact", "Portfolio OS"],
    importPath: "@/components/personal-os-zoo",
    shortcut: "O",
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
    readerValue: "Turns a private project rule into a public object that can be cited and reopened.",
    nextUse: "Use it for decisions, patterns, snippets, and lessons that should outlive one blog post.",
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
    readerValue: "Explains how the studio actually works, not just which logos belong in the stack.",
    nextUse: "Use it when tools need to be connected to workflow, cadence, and decision criteria.",
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
    readerValue: "Makes the person behind the system legible without collapsing into a resume template.",
    nextUse: "Use it for profile sections that must balance personality, capability, and collaboration rules.",
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
    readerValue: "Adds atmosphere through real controls instead of pretending that mood is a background image.",
    nextUse: "Use it when a media surface should show state, taste, and interaction in a compact frame.",
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
    readerValue: "Lets personal memory become browsable without making photos feel like stock decoration.",
    nextUse: "Use it for visual archives where tags, featured moments, and focused viewing all matter.",
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
    readerValue: "Lets technical texture appear where it helps comprehension, not as decorative code noise.",
    nextUse: "Use it whenever code examples should be copied, trusted, and read inside long-form writing.",
    signal: "Lets programmer identity show through useful source material, not fake terminal decoration.",
    evidence: "Rendered inside MDX articles and verified through the content build.",
    reusableFor: ["Blog", "Knowledge", "Lab examples"],
    importPath: "@/components/content/code-block",
    shortcut: "C",
  },
  {
    slug: "collaboration-guide",
    name: "CollaborationGuide",
    category: "System",
    status: "Stable",
    component: "Governance surface",
    source: "src/app/collaboration/page.tsx",
    route: "/collaboration",
    description:
      "A public governance surface for contribution flow, review rules, creative direction, and traceable collaboration.",
    readerValue: "Shows how feedback becomes structured work instead of disappearing into chat history.",
    nextUse: "Use it for public collaboration rules, creative intake, and contribution expectations.",
    signal: "Turns loose feedback and creative ideas into a structured intake, review, and backlog system.",
    evidence: "Connected from Contact, Command Center, sitemap, CONTRIBUTING, PR template, and Feishu phase docs.",
    reusableFor: ["Governance", "Creative backlog", "Contribution flow"],
    importPath: "@/data/collaboration",
    shortcut: "G",
  },
  {
    slug: "command-trace-toast",
    name: "CommandTraceToast",
    category: "Command",
    status: "Iterating",
    component: "Command execution trace",
    source: "src/components/command-trace-toast.tsx",
    route: "/lab",
    description:
      "A compact post-command trace that confirms route execution with a code-like command string and contextual metadata.",
    readerValue: "Makes navigation feel executable while still telling the visitor what actually happened.",
    nextUse: "Use it after keyboard actions, copy actions, and route transitions that deserve lightweight confirmation.",
    signal: "Makes keyboard navigation feel executable without turning the page into a fake terminal.",
    evidence: "Session-backed trace survives route transition, clears on mismatched routes, and is covered by e2e.",
    reusableFor: ["Command Center", "Navigation feedback", "Developer signature"],
    importPath: "@/components/command-trace-toast",
    shortcut: "T",
  },
  {
    slug: "source-reveal",
    name: "SourceReveal",
    category: "System",
    status: "Stable",
    component: "Source provenance",
    source: "src/components/content/source-reveal.tsx",
    route: "/knowledge",
    description:
      "A subtle source/ref reveal pattern that links content cards and Lab rows to GitHub source files.",
    readerValue: "Lets a curious visitor inspect provenance without forcing source paths into the main reading layer.",
    nextUse: "Use it wherever a visible object should expose its file, ref, or implementation trail on demand.",
    signal: "Turns provenance from decorative text into an inspectable source link.",
    evidence: "Knowledge, project, and Lab source links resolve to GitHub blob URLs.",
    reusableFor: ["Knowledge", "Projects", "Lab", "Case studies"],
    importPath: "@/components/content/source-reveal",
    shortcut: "V",
  },
  {
    slug: "reading-focus-lens",
    name: "ReadingFocusLens",
    category: "Content",
    status: "Iterating",
    component: "Article focus trace",
    source: "src/components/content/article-interactions.tsx",
    route: "/blog/interface-is-a-promise",
    description:
      "A lightweight reading instrument that tracks the active article section, exposes a code-like focus command, and copies stable section refs.",
    readerValue: "Gives long-form posts a small interactive signature that helps rather than interrupts reading.",
    nextUse: "Use it on dense articles, Knowledge details, and case studies that benefit from stable section references.",
    signal: "Adds a playful developer signature to long-form reading without interrupting the prose.",
    evidence: "Uses real TOC ids, IntersectionObserver, copy feedback, mobile bottom chrome, and reduced-motion CSS.",
    reusableFor: ["Blog", "Knowledge detail", "Project case studies", "Reading focus lens"],
    importPath: "@/components/content/article-interactions",
    shortcut: "L",
  },
  {
    slug: "component-preview",
    name: "ComponentPreview",
    category: "System",
    status: "Iterating",
    component: "Isolated component preview",
    source: "src/components/content/lab-explorer.tsx",
    route: "/lab",
    description:
      "An interactive Lab preview surface with preview, trace, and source modes for selected components.",
    readerValue: "Turns Lab from a list of component names into an inspectable design-system workbench.",
    nextUse: "Use it when a component needs to show route behavior, provenance, reuse intent, and source access together.",
    signal: "Moves Lab from metadata registry toward inspectable component behavior.",
    evidence: "Preview tabs expose route, reuse targets, evidence, import snippet, and GitHub source link.",
    reusableFor: ["Lab", "Design system", "Component QA"],
    importPath: "@/components/content/lab-explorer",
    shortcut: "I",
  },
];

export const labExperiments: LabExperiment[] = [
  {
    step: "01",
    title: "Component registry",
    description: "Make reusable surfaces searchable, copyable, traceable, and understandable to a first-time visitor.",
    status: "Stable",
  },
  {
    step: "02",
    title: "Preview states",
    description: "Let a selected component expose visitor value, source, route, reuse targets, quality proof, and import path.",
    status: "Iterating",
  },
  {
    step: "03",
    title: "ComponentPreview",
    description: "Render richer component examples when static metadata can no longer explain the interaction contract.",
    status: "Iterating",
  },
  {
    step: "04",
    title: "ReactionBar",
    description: "Add reader feedback only after content pages have enough repeat traffic to justify it.",
    status: "Planned",
  },
  {
    step: "05",
    title: "Signature interactions",
    description: "Prototype Command Trace and Source Hover before any mascot or high-intensity visual effect.",
    status: "Iterating",
  },
  {
    step: "06",
    title: "Reading focus",
    description: "Give long-form writing a subtle active-section lens, stable ref copy, and code-like reading trace.",
    status: "Iterating",
  },
  {
    step: "07",
    title: "Personal OS Zoo",
    description: "Calibrate Studio Pulse, guided prompts, source-backed modules, and density guardrails before expanding the homepage.",
    status: "Iterating",
  },
];

export const labQualityGates: LabQualityGate[] = [
  {
    name: "Real usage",
    detail: "Every component in Lab must have an active route, source file, visitor value, and explicit next-use context.",
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
    detail: "Motion, copy, and micro-interactions must reveal state, reduce effort, or support navigation.",
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
