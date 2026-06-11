# Version Trace

## v0.1.0 - Phase 1 Visual Foundation

Date: 2026-06-11
Commit: `2efc984`
Vercel deployment: `dpl_2ZjdT9MsLJRd8CJH7CvyqJsbcGNF`
Production alias: `https://elegant-developer-studio.vercel.app`
Deployment URL: `https://elegant-developer-studio-1txtubuvl.vercel.app`
Inspect URL: `https://vercel.com/soniadjtgwatsondktg-5541s-projects/elegant-developer-studio/2ZjdT9MsLJRd8CJH7CvyqJsbcGNF`
GitHub repository: `https://github.com/njueeRay/elegant-developer-studio`

Scope:

- Created the Next.js project and local Git repository.
- Implemented the Developer Atelier homepage direction.
- Replaced `notes` with `knowledge` across IA, navigation, docs, and UI.
- Added generated project/media assets.
- Preserved the selected reference concept.
- Added PRD, roadmap, IA, design system seed, and version trace.

Reference:

- `public/references/developer-atelier-reference.png`

Key decisions:

- Use Next.js App Router as the long-term base for MDX, SEO, RSS, and Vercel.
- Keep Phase 1 single-page only.
- Treat `knowledge` as a durable public memory system.
- Keep media present but non-functional until Phase 3.

Known limitations:

- Social URLs are placeholders.
- Blog/project/knowledge route links are future routes.
- Media player is an interaction stub, not real audio playback.

## v0.1.1 - Project Tracking Map

Date: 2026-06-11
Primary commit: `0c3b4da`
Tag: `v0.1.1`

Scope:

- Added a comprehensive project map.
- Added chronological progress log.
- Added decision log.
- Added GitHub milestones for Phase 2-5 and interaction research.
- Assigned existing GitHub issues to milestones.
- Updated README documentation index.

Purpose:

- Make future work traceable by phase, route, component, issue, milestone, and deployment.

## v0.1.2 - Feishu Knowledge Base

Date: 2026-06-12
Primary commit: `65f74de`
Tag: `v0.1.2`

Scope:

- Created Feishu Wiki space: `Elegant Developer Studio｜个人主页项目知识库`.
- Published project navigation, project map, PRD, roadmap, IA, design system, progress log, ADR, version trace, design QA, assets, and execution review.
- Inserted key visual assets into the Feishu assets page.
- Added repeatable sync map in `docs/FEISHU_SYNC.md`.

Feishu root:

- `https://scnlb1lk96sb.feishu.cn/wiki/UYrLwuB1AieALIk9VKOcnLzqnwb`

## v0.2.0 - Content Core

Date: 2026-06-12
Commit: pending
Tag: pending

Scope:

- Added MDX-powered writing and project content.
- Added `/blog`, `/blog/[slug]`, `/projects`, and `/projects/[slug]`.
- Added reusable content components: `PostCard`, `ProjectCard`, `TagFilter`, `ReadingProgress`, `TableOfContents`, `CodeBlock`, and metadata rail styling.
- Added RSS, sitemap, robots, and metadata base.
- Connected homepage content to real content metadata.
- Added `docs/PHASE2_RESEARCH.md`.

Verification:

- `npm run lint`: passed.
- `npm run build`: passed.
- Production Playwright QA: desktop and mobile pages had no horizontal overflow.
- Tag filtering, code copy, and RSS checks passed.
