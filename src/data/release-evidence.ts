import { repositoryUrl, siteUrl } from "@/lib/site";

export const releaseEvidence = {
  channel: "raynode",
  primaryUrl: siteUrl,
  previewUrl: "https://elegant-developer-studio.vercel.app",
  repositoryUrl,
  runtime: "Next.js standalone runtime behind Caddy and systemd",
  verifiedAt: "2026-07-03",
  qualityGate:
    "Content relation validation, lint, production build, and Playwright public-route coverage.",
} as const;
