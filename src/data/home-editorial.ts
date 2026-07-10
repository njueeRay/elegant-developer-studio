export type HomeEditorialPostSlot = {
  kind: "post";
  eyebrow: string;
  postSlug: string;
  proofHref: string;
  reasonCode: string;
  reason: string;
  selectionRule: string;
};

export type HomeEditorialProjectSlot = {
  kind: "project";
  eyebrow: string;
  projectSlug: string;
  proofHref: string;
  reasonCode: string;
  reason: string;
  selectionRule: string;
};

export type HomeEditorialMediaSlot = {
  kind: "media";
  eyebrow: string;
  title: string;
  description: string;
  meta: string;
  href: string;
  photoHref: string;
  musicHref: string;
  image: string;
  reasonCode: string;
  reason: string;
  selectionRule: string;
};

export const homeEditorialPolicy = {
  schemaVersion: 1,
  updated: "2026-07-09",
  principle:
    "The homepage is an editorial surface, not an automatic latest-content feed.",
  reviewTrigger:
    "Review this policy whenever posts exceed 15, a project becomes stronger evidence, or a homepage slot drifts from its stated reason.",
  slots: {
    featuredEssay: {
      kind: "post",
      eyebrow: "Featured essay",
      postSlug: "external-proof-over-portfolio-theater",
      proofHref: "/knowledge/external-proof-over-self-reference",
      reasonCode: 'why.here("external-proof")',
      reason:
        "Strongest current argument against portfolio theater; it explains why the studio values public evidence over self-description.",
      selectionRule:
        "Keep until another essay makes a stronger public argument with external proof and durable Knowledge trails.",
    },
    selectedWork: {
      kind: "project",
      eyebrow: "Selected work",
      projectSlug: "openprofile-agent-workflow",
      proofHref: "/projects/openprofile-agent-workflow",
      reasonCode: 'why.here("openprofile")',
      reason:
        "Best current proof that the studio can turn a public developer surface into an agent-maintained product system.",
      selectionRule:
        "Prefer work with public source, clear before/after evidence, and a reusable system insight over prettier but self-contained UI.",
    },
    latestWriting: {
      kind: "post",
      eyebrow: "Editorially recent",
      postSlugs: [
        "ursb-personal-site-object-grammar",
        "external-proof-over-portfolio-theater",
      ],
      proofHref: "/blog",
      reasonCode: 'why.here("latest-writing")',
      reason:
        "Recent enough to show movement, but selected because both essays sharpen the homepage object grammar and evidence strategy.",
      selectionRule:
        "Do not auto-fill with newest posts; choose recent writing only when it advances the current homepage thesis.",
    },
    mediaEntry: {
      kind: "media",
      eyebrow: "Media note",
      title: "Morning light, notes, coffee",
      description: "A quiet mix and a small frame from the studio desk.",
      meta: "Tycho - A Walk / 02:31",
      href: "/music",
      photoHref: "/photos",
      musicHref: "/music",
      image: "/assets/morning-studio-desk.png",
      reasonCode: 'why.here("media-breath")',
      reason:
        "Adds personal texture and rest between proof-heavy modules without turning the homepage into a media archive.",
      selectionRule:
        "Keep media as a single breathable entry until photos or music have stronger narrative evidence.",
    },
    knowledgeSignal: {
      kind: "knowledge",
      eyebrow: "Knowledge signal",
      entrySlugs: [
        "external-proof-over-self-reference",
        "personal-site-object-grammar",
        "project-evidence-minimum-standard",
      ],
      proofHref: "/knowledge",
      reasonCode: 'why.here("knowledge-signal")',
      reason:
        "Shows the rules behind the homepage choices instead of leaving curation as taste.",
      selectionRule:
        "Expose only rules that explain current homepage decisions; do not use this as a generic knowledge list.",
    },
  },
} as const;
