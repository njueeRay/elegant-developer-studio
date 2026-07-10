export const baselinePostSlugs = [
  "ursb-personal-site-object-grammar",
  "external-proof-over-portfolio-theater",
  "anyreader-deep-reading-interface-teardown",
  "openprofile-as-agentic-profile-infrastructure",
  "case-study-diff-as-portfolio-format",
  "raynode-standalone-deployment",
  "homepage-truth-source-audit",
  "agent-handoff-loop",
  "evidence-without-precision-theater",
  "designing-command-surfaces",
  "homepage-density-case-study",
  "chinese-as-product-memory",
  "interface-is-a-promise",
  "calm-systems-for-creative-work",
  "commands-that-respect-attention",
] as const;

export const postAdmissionPolicy = {
  gateName: "Post-16 content review",
  baselineCount: 15,
  requirement:
    "Every post added after the baseline must introduce an external object, project evidence, or a durable Knowledge rule.",
  reviewedSurfaces: ["homepage", "blog filters", "command center", "knowledge trails", "release evidence"],
} as const;

export type PostAdmission = {
  basis: "External object" | "Project evidence" | "Knowledge rule";
  evidenceHref: string;
  reason: string;
};

// Empty at the Phase 43 baseline. The next post must be admitted here before it can ship.
export const postAdmissions: Record<string, PostAdmission> = {};
