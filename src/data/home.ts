export type HighlightKind = "writing" | "work" | "media";

export type Highlight = {
  kind: HighlightKind;
  eyebrow: string;
  title: string;
  description: string;
  meta: string;
  href: string;
  image?: string;
  tags?: string[];
};

export type WorkbenchItem = {
  label: string;
  title: string;
  detail: string;
  meta: string;
  status: "healthy" | "progress" | "queued";
};

export const navItems = [
  { label: "Writing", href: "#writing" },
  { label: "Work", href: "#work" },
  { label: "Knowledge", href: "#knowledge" },
  { label: "Media", href: "#media" },
  { label: "Lab", href: "#lab" },
] as const;

export const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/njueeRay/elegant-developer-studio",
  },
  {
    label: "Issues",
    href: "https://github.com/njueeRay/elegant-developer-studio/issues",
  },
  { label: "Contact", href: "/contact" },
] as const;

export const workbenchItems: WorkbenchItem[] = [
  {
    label: "Latest commit",
    title: "ray-studio/design-system",
    detail: "feat: add color scales and elevation tokens",
    meta: "main / a7f3c2e / 2h ago",
    status: "healthy",
  },
  {
    label: "Draft essay",
    title: "On Precision and Restraint",
    detail: "Notes on building interfaces that respect attention.",
    meta: "1,247 words / v0.4",
    status: "progress",
  },
  {
    label: "Music cue",
    title: "Atelier - late night",
    detail: "A quiet loop for deep work.",
    meta: "02:17 / focus mode",
    status: "queued",
  },
];

export const highlights: Highlight[] = [
  {
    kind: "writing",
    eyebrow: "Featured essay",
    title: "The Interface is a Promise",
    description:
      "Good interfaces are agreements between human intent and system behavior.",
    meta: "May 12, 2026 / 8 min read",
    href: "/blog/interface-is-a-promise",
  },
  {
    kind: "work",
    eyebrow: "Selected work",
    title: "Lumen Design System",
    description:
      "A lightweight UI kit for products that value clarity, speed, and restraint.",
    meta: "React / TypeScript / Design Tokens",
    href: "/projects/lumen",
    image: "/assets/lumen-design-system.png",
    tags: ["React", "TypeScript", "Tokens"],
  },
  {
    kind: "media",
    eyebrow: "Media note",
    title: "Morning light, notes, coffee",
    description: "A quiet mix and a small frame from the studio desk.",
    meta: "Tycho - A Walk / 02:31",
    href: "/music",
    image: "/assets/morning-studio-desk.png",
  },
];

export const knowledgeItems = [
  "Interface notes that age well",
  "Keyboard-driven workflows",
  "AI-native product patterns",
] as const;
