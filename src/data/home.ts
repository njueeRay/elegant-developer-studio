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
