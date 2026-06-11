# Project Map

This document is the operating map for Elegant Developer Studio. It defines what exists, what is planned, where work belongs, and how progress is traced.

## 1. North Star

Build a personal site that feels like an elegant developer studio:

- Editorial enough for writing.
- Technical enough for engineering credibility.
- Visual enough for photos, music, and portfolio work.
- Structured enough to become a personal operating system over time.

The site must avoid three failure modes:

- Generic portfolio template.
- Dense SaaS dashboard.
- Decorative terminal gimmick.

## 2. Current State

Version: `v0.1.2`

Live:

- Production: `https://elegant-developer-studio.vercel.app`
- Repository: `https://github.com/njueeRay/elegant-developer-studio`
- Feishu Wiki: `https://scnlb1lk96sb.feishu.cn/wiki/UYrLwuB1AieALIk9VKOcnLzqnwb`

Implemented:

- Phase 1 homepage.
- Developer Atelier visual direction.
- `Knowledge` information architecture.
- Theme toggle.
- Command palette.
- Workbench panel.
- Writing, work, media, knowledge, lab, and contact homepage modules.
- Generated project/media assets.
- PRD, roadmap, IA, design-system seed, version trace, and design QA.

## 3. Product Surface Map

| Surface | Route | Phase | Status | Purpose |
| --- | --- | --- | --- | --- |
| Home | `/` | 1 | Implemented | First impression and curated studio entry |
| Blog Index | `/blog` | 2 | Planned | Long-form essays and writing archive |
| Blog Detail | `/blog/[slug]` | 2 | Planned | MDX essay reading experience |
| Projects | `/projects` | 2 | Planned | Selected work and case studies |
| Knowledge | `/knowledge` | 5 | Planned | Evergreen references, snippets, learning logs |
| Photos | `/photos` | 3 | Planned | Visual archive and lightbox |
| Music | `/music` | 3 | Planned | Studio mixes and listening context |
| Lab | `/lab` | 5 | Planned | Experiments, prototypes, component previews |
| About | `/about` | 5 | Planned | Biography, timeline, principles |
| Uses | `/uses` | 5 | Planned | Tools, stack, workflow |

## 4. Phase Map

### Phase 1: Visual Foundation

Status: complete.

Tracking:

- Commit: `2efc984`
- Deployment record: `docs/VERSION_TRACE.md`
- QA record: `design-qa.md`

Definition of done:

- Homepage works on desktop and mobile.
- First screen establishes taste and identity.
- Core components are reusable enough to survive later phases.
- Visual QA and build checks pass.

### Phase 2: Content Core

Tracking:

- GitHub issue: `#1`
- Milestone: `https://github.com/njueeRay/elegant-developer-studio/milestone/1`

Scope:

- `/blog`
- `/blog/[slug]`
- `/projects`
- MDX content source
- tags, reading time, code highlighting, TOC
- SEO and RSS

Main risk:

- Building a nice blog shell without a maintainable content model. The content schema must come before visual polish.

### Phase 3: Media Layer

Tracking:

- GitHub issue: `#2`
- Milestone: `https://github.com/njueeRay/elegant-developer-studio/milestone/2`

Scope:

- `/photos`
- photo grid and lightbox
- `/music` or expanded music surface
- mini player with real controls

Main risk:

- Media becoming decorative. Photos and music must express memory, process, and taste, not filler.

### Phase 4: Interaction Layer

Tracking:

- GitHub issue: `#3`
- Research issue: `#5`
- Milestone: `https://github.com/njueeRay/elegant-developer-studio/milestone/3`

Scope:

- global command menu
- global search
- filters
- quick actions
- status panel

Main risk:

- Adding clever interactions without workflow value. Each interaction must reduce navigation cost or reveal useful context.

### Phase 5: Portfolio OS

Tracking:

- GitHub issue: `#4`
- Milestone: `https://github.com/njueeRay/elegant-developer-studio/milestone/4`

Scope:

- `/lab`
- `/about`
- `/uses`
- `/knowledge`
- optional analytics, reactions, contact form, admin

Main risk:

- Expanding into many half-finished pages. Phase 5 should be built as a system of stable primitives.

## 5. Repository Map

```text
docs/
  PRD.md                         Product requirements
  ROADMAP.md                     Phase plan and component backlog
  PROJECT_MAP.md                 Operating map for product, repo, phases, tracking
  INFORMATION_ARCHITECTURE.md    Navigation and route structure
  DESIGN_SYSTEM.md               Visual tokens and component inventory
  DECISIONS.md                   Architecture/product decision log
  PROGRESS_LOG.md                Stage-by-stage progress ledger
  FEISHU_SYNC.md                 Feishu Wiki sync map and node tokens
  VERSION_TRACE.md               Release, deployment, and commit trace

public/
  assets/                        Project-bound generated images
  references/                    Accepted visual references

src/
  app/                           Next.js App Router entry points
  components/                    Reusable interactive UI components
  data/                          Mock content and future content contracts
```

## 6. Component Map

Implemented:

- `StudioHome`
- `Header`
- `WorkbenchPanel`
- `WorkbenchRow`
- `HighlightCard`
- `SocialLinks`
- `CommandPalette`
- homepage knowledge, lab, contact, latest sections

Next component targets:

- `PostCard`
- `ProjectCard`
- `TagFilter`
- `ReadingProgress`
- `TableOfContents`
- `CodeBlock`
- `MetadataRail`
- `MiniPlayer`
- `GlobalSearch`
- `StatusPanel`

Component rule:

Every new component must answer two questions before implementation:

- Which route or workflow uses it now?
- Which later phase can reuse it without rewriting?

## 7. Interaction Map

Current interactions:

- Theme toggle.
- Command palette open/close.
- Media play/pause state.
- Anchor navigation.
- Card hover states.

Research track:

- Command palette with scoped actions.
- Project cards with deploy, version, commit, and changelog affordances.
- Reading progress that borrows build-pipeline semantics.
- Knowledge cards with copy, backlinks, and related links.
- Lab cards with status, last run, branch, preview URL.
- Keyboard-first focus states and shortcut grammar.

Non-goals:

- Fake terminals.
- Random typing effects.
- Decorative code rain.
- High-density dashboards on the homepage.

## 8. Progress Tracking Protocol

Every meaningful stage must update four places:

1. GitHub issue or milestone.
2. `docs/PROGRESS_LOG.md`.
3. `docs/VERSION_TRACE.md` when deployed or released.
4. `docs/DECISIONS.md` when a durable product or architecture decision is made.
5. Feishu Wiki after local documentation changes are committed.

Every implementation PR or commit should state:

- Phase.
- Scope.
- Files changed.
- Tests or QA performed.
- Known limitations.

## 9. Quality Gates

Before a phase is considered done:

- `npm run lint` passes.
- `npm run build` passes.
- Desktop and mobile layout are visually checked.
- No horizontal overflow.
- Core interactions are verified.
- Project map and progress log are updated.
- GitHub issue state matches actual repo state.

## 10. Immediate Next Step

The next substantive work should be Phase 2 planning and research:

1. Define the content schema.
2. Decide MDX file layout.
3. Design blog/project route structure.
4. Research programmer-style micro-interactions for Phase 4 while Phase 2 is being built.
