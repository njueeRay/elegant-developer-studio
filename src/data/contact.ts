export type ContactRouteKind = "discussion" | "source" | "collaboration" | "profile" | "writing" | "work";

export const githubIssueTemplateUrl =
  "https://github.com/njueeRay/elegant-developer-studio/issues/new?template=contact.yml";

export type ContactRoute = {
  kind: ContactRouteKind;
  title: string;
  description: string;
  href: string;
  meta: string;
  external?: boolean;
};

export const contactStatus = {
  availability: "Available for focused product, interface, and system work.",
  responseWindow: "Public project threads first; private route is still planned.",
  preferredLanguage: "Chinese first, English when useful for code and references.",
};

export const contactRoutes: ContactRoute[] = [
  {
    kind: "discussion",
    title: "Open a structured issue",
    description: "Best for public project feedback, collaboration ideas, and design discussion with context.",
    href: githubIssueTemplateUrl,
    meta: "Issue form",
    external: true,
  },
  {
    kind: "source",
    title: "Inspect the repository",
    description: "Use the source history, docs, and issues when you need concrete project context.",
    href: "https://github.com/njueeRay/elegant-developer-studio",
    meta: "GitHub",
    external: true,
  },
  {
    kind: "collaboration",
    title: "Read collaboration guide",
    description: "See how feedback, creative ideas, issue forms, Feishu notes, and phase records connect.",
    href: "/collaboration",
    meta: "Governance",
  },
  {
    kind: "profile",
    title: "Read the profile",
    description: "Start here for principles, capabilities, timeline, and working agreements.",
    href: "/about",
    meta: "Studio profile",
  },
  {
    kind: "writing",
    title: "Reference the writing",
    description: "Useful when a conversation starts from an essay, note, or interface principle.",
    href: "/blog",
    meta: "Essays",
  },
  {
    kind: "work",
    title: "Reference selected work",
    description: "Use project pages when the conversation is about systems, components, or portfolio work.",
    href: "/projects",
    meta: "Portfolio",
  },
];

export const contactFit = [
  "Product direction, interface systems, and code-backed UI work.",
  "Writing, knowledge architecture, and long-lived personal site structure.",
  "Component behavior, accessibility contracts, deployment trace, and public repo feedback.",
] as const;

export const contactBoundaries = [
  "No fake private form until a real inbox or backend exists.",
  "No urgent support promise; GitHub Issues is public and asynchronous.",
  "No generic sales funnel. A useful message should include context, goal, and constraints.",
] as const;

export const contactBrief = [
  "Context: what are we discussing?",
  "Goal: what should change or become clearer?",
  "Surface: page, component, route, document, or repository area.",
  "Constraints: timeline, references, blockers, or quality bar.",
].join("\n");
