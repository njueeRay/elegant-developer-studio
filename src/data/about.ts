import {
  Blocks,
  Braces,
  Compass,
  Layers3,
  MessageSquare,
  PenTool,
  Radar,
  type LucideIcon,
} from "lucide-react";

export type AboutPrinciple = {
  slug: string;
  title: string;
  summary: string;
  detail: string;
  icon: LucideIcon;
  accent: "rust" | "blue" | "sage";
};

export type AboutTimelineItem = {
  year: string;
  title: string;
  role: string;
  detail: string;
};

export type AboutCapability = {
  name: string;
  level: number;
  label: string;
  proof: string;
  icon: LucideIcon;
};

export type WorkingAgreement = {
  title: string;
  detail: string;
  signal: string;
};

export const aboutIntro =
  "I design and build calm, code-backed interfaces for writing, systems, and creative tools.";

export const aboutProfile = {
  name: "Ray",
  role: "Design engineer",
  location: "Nanjing / Remote",
  availability: "Available for focused product, interface, and system work.",
  contactLabel: "Open contact routes",
  contactHref: "/contact",
  oneLine: aboutIntro,
};

export const aboutPrinciples: AboutPrinciple[] = [
  {
    slug: "clarity",
    title: "Clarity before theatre",
    summary: "A page should reveal what matters before it shows how clever it is.",
    detail:
      "I cut interface noise until the object, decision, or next action is obvious. Taste is useful only when it improves comprehension.",
    icon: Compass,
    accent: "rust",
  },
  {
    slug: "systems",
    title: "Systems that stay humane",
    summary: "Reusable components should make the site easier to extend, not harder to feel.",
    detail:
      "I prefer small models, stable contracts, and components with a real job. The system should protect craft without flattening personality.",
    icon: Layers3,
    accent: "sage",
  },
  {
    slug: "code",
    title: "Code as product material",
    summary: "The implementation is part of the design, not a downstream translation.",
    detail:
      "Motion, state, performance, content shape, and deployment trace all affect the experience. I treat them as design inputs.",
    icon: Braces,
    accent: "blue",
  },
];

export const aboutTimeline: AboutTimelineItem[] = [
  {
    year: "2026",
    title: "Elegant Developer Studio",
    role: "Personal operating system",
    detail:
      "Building a public studio around writing, projects, knowledge, media, tools, and experiments.",
  },
  {
    year: "2024 - 2026",
    title: "AI-native product work",
    role: "Design systems / frontend",
    detail:
      "Exploring how AI can sharpen product taste, accelerate implementation, and keep decisions traceable.",
  },
  {
    year: "2021 - 2024",
    title: "Developer-facing interfaces",
    role: "Product design and engineering",
    detail:
      "Shipped calm tools for technical users where speed, reliability, and explainability mattered more than decoration.",
  },
  {
    year: "Earlier",
    title: "Foundations",
    role: "Computer science / visual systems",
    detail:
      "Built the habit of treating software as both an exact system and a visual medium.",
  },
];

export const aboutCapabilities: AboutCapability[] = [
  {
    name: "Product interface design",
    level: 94,
    label: "Advanced",
    proof: "IA, interaction models, page systems",
    icon: PenTool,
  },
  {
    name: "Frontend engineering",
    level: 91,
    label: "Advanced",
    proof: "React, Next.js, TypeScript, MDX",
    icon: Braces,
  },
  {
    name: "Design systems",
    level: 88,
    label: "Advanced",
    proof: "Tokens, components, documentation",
    icon: Blocks,
  },
  {
    name: "Product sense",
    level: 84,
    label: "Strong",
    proof: "Scope, sequence, trade-off framing",
    icon: Radar,
  },
  {
    name: "Writing and synthesis",
    level: 82,
    label: "Strong",
    proof: "PRD, research notes, phase reviews",
    icon: MessageSquare,
  },
];

export const workingAgreements: WorkingAgreement[] = [
  {
    title: "Define the shape first",
    detail: "We name the audience, route, components, constraints, and success criteria before adding surface polish.",
    signal: "Map before motion",
  },
  {
    title: "Ship in traceable slices",
    detail: "Each phase should leave code, docs, QA evidence, deployment records, and a clear next move.",
    signal: "Small release, visible trail",
  },
  {
    title: "Make interactions earn their place",
    detail: "A micro-interaction must clarify state, reduce effort, or expose useful context. Cute is not enough.",
    signal: "Behavior over ornament",
  },
  {
    title: "Keep taste inspectable",
    detail: "Visual decisions should be stored as references, rules, and reusable components instead of private intuition.",
    signal: "Taste becomes system",
  },
];

export const aboutTechPalette = [
  "Next.js",
  "TypeScript",
  "MDX",
  "Design systems",
  "Command UI",
  "Vercel",
  "Feishu",
  "GitHub",
];

export const aboutCommandActions = [
  { label: "Read writing", href: "/blog", shortcut: "W" },
  { label: "View projects", href: "/projects", shortcut: "P" },
  { label: "Browse knowledge", href: "/knowledge", shortcut: "K" },
  { label: "Open uses", href: "/uses", shortcut: "U" },
];

export function getAboutReference() {
  return `about:${aboutProfile.name} | ${aboutProfile.role} | ${aboutProfile.oneLine}`;
}
