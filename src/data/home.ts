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
    label: "Release channel",
    title: "raynode.me self-hosted studio",
    detail: "Next.js standalone runtime behind Caddy, with Vercel kept as preview fallback.",
    meta: "RayNode / systemd / verified 2026-07-03",
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
    title: "外部证据比作品集叙事更重要",
    description:
      "A mature portfolio needs real outside problems, not only a beautiful self-referential system.",
    meta: "Jul 4, 2026 / 6 min read",
    href: "/blog/external-proof-over-portfolio-theater",
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
  "外部证据优先于自指叙事",
  "Selection anchors are product state",
  "Case study diff format",
] as const;
