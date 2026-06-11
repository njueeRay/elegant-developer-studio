# Decisions

Durable product and architecture decisions live here. Record decisions when changing route structure, content model, deployment strategy, interaction patterns, or design-system direction.

## ADR-0005: Use MDX Registry For Content Core

Date: 2026-06-12

Decision:

- Use `@next/mdx` with a static content registry in `src/lib/content.ts`.
- Store posts in `src/content/posts`.
- Store project case studies in `src/content/projects`.
- Export metadata from each MDX file instead of introducing frontmatter parsing.

Reasoning:

- The content set is small and curated.
- Static imports keep build-time routing explicit and type-checkable.
- MDX supports prose, code, and custom article components without adding a CMS.
- Feishu remains the collaboration layer; the repository remains the source of truth.

Consequences:

- Adding a new post requires adding it to the registry.
- This is acceptable until the content volume justifies filesystem discovery or a CMS.

## ADR-0001: Use Next.js App Router

Date: 2026-06-11

Decision:

- Use Next.js App Router with TypeScript.

Reasoning:

- The project needs MDX publishing, SEO, RSS, static rendering, and Vercel deployment.
- Next.js gives the shortest path to that target without custom routing infrastructure.

Consequences:

- Route surfaces should live under `src/app`.
- Content plumbing in Phase 2 should be designed around static generation first.

## ADR-0002: Use `Knowledge` Instead of `Notes`

Date: 2026-06-11

Decision:

- The long-term IA label is `Knowledge`.

Reasoning:

- `Notes` implies temporary private scraps.
- `Knowledge` can contain notes, references, snippets, bookmarks, and evergreen learning.
- The label scales better for a public personal operating system.

Consequences:

- Routes, docs, command actions, and future content schema should use `knowledge`.
- `notes` can still exist as a content type inside `knowledge` if needed, but not as the top-level IA label.

## ADR-0003: Keep Phase 1 Single-Page

Date: 2026-06-11

Decision:

- Phase 1 implements only the homepage.

Reasoning:

- The first priority is visual foundation, component direction, and IA.
- Creating empty route shells would create false progress and maintenance noise.

Consequences:

- Links to `/blog`, `/projects`, `/knowledge`, `/lab`, and media routes are future-facing.
- Phase 2 starts by creating real content structure, not placeholder pages.

## ADR-0004: Track Work in Both Docs and GitHub Issues

Date: 2026-06-11

Decision:

- Use repository docs for product memory and GitHub issues/milestones for execution tracking.

Reasoning:

- Docs explain the system and preserve context.
- Issues provide actionable work units and visible progress.

Consequences:

- Meaningful phase work must update both the relevant issue and local project docs.
- `PROJECT_MAP.md` is the primary map; `PROGRESS_LOG.md` is the chronological ledger.
