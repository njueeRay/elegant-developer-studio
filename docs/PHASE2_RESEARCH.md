# Phase 2 Review And Research

Date: 2026-06-12
Phase: Content Core

## Phase 1 And Setup Review

Phase 1 did the right thing by keeping the homepage sparse. The strongest choice was not adding every planned component early. The homepage now has enough identity, but the project needed a real content backbone before adding more visual surface.

Details worth preserving:

- `Knowledge` is a better IA label than `Notes` because it can hold durable references, snippets, learning logs, and later public memory.
- The homepage should remain a curated studio entry, not a dense index.
- The workbench panel is useful because it gives programmer texture without turning the site into a fake terminal.
- Visual assets should stay role-based: references in `public/references`, production assets in `public/assets`.
- Feishu is the collaboration layer, not the source of truth. Local Markdown and Git remain authoritative.

## Research References

References checked during Phase 2:

- Next.js MDX guide: `https://nextjs.org/docs/app/guides/mdx`
- Vercel portfolio starter repository: `https://github.com/vercel/nextjs-portfolio-starter`
- Lee Robinson personal site: `https://leerob.com/`
- Josh W. Comeau personal site: `https://www.joshwcomeau.com/`

## Extracted Patterns

High-value patterns:

- Keep content in the repository so publishing is versioned and reviewable.
- Use MDX for long-form writing because it supports prose, code, and custom components in one content format.
- Treat RSS, sitemap, and metadata as part of the content system, not as launch polish.
- Use tags as navigational scope, not as decorative chips.
- Give code snippets real utility: copy feedback, readable mono type, and mobile-safe wrapping.
- Add reading progress only when the article is long enough to benefit from orientation.

Patterns rejected:

- Dense dashboard-style blog indexes.
- Fake terminal surfaces.
- Heavy card grids for every content type.
- Decorative command menus without actual routing or action value.

## Phase 2 Implementation Notes

Built:

- `/blog`
- `/blog/[slug]`
- `/projects`
- `/projects/[slug]`
- MDX content registry.
- Post and project metadata contracts.
- Tag filtering.
- Reading progress.
- Table of contents.
- Code copy interaction.
- SEO metadata, sitemap, robots, RSS.
- Homepage content connected to real content metadata.

Intentional limitation:

- Reading time is stored in metadata for now. This is acceptable while the content set is small. If the project grows beyond roughly 20 essays, computed reading time should replace manual values.

## Next Design Questions

Before Phase 3:

- Decide whether photos are primarily memory, process documentation, or visual portfolio.
- Decide whether music is an ambient studio layer or a full archive.
- Define how media metadata should connect back to essays and projects.

Before Phase 4:

- Research command palette ranking.
- Decide whether search indexes all MDX content or only metadata at first.
- Decide how much keyboard grammar the site should expose without feeling like a developer toy.
