# Product Roadmap

## Phase 1: Visual Foundation

Goal: establish the site's taste, structure, and first-screen credibility.

Deliverables:

- Single-page homepage prototype.
- Hero, status, main entries, workbench, writing/work/media highlights.
- Navigation, theme toggle, command menu, social links.
- Knowledge preview replacing the earlier `notes` concept.
- PRD, roadmap, IA, design system, and version trace.

Status: implemented in v0.1.0.

## Phase 2: Content Core

Goal: turn the homepage into a maintainable personal publishing system.

Deliverables:

- `/blog` and `/blog/[slug]`.
- `/projects`.
- MDX content structure.
- Tags, reading time, syntax highlighting, table of contents.
- SEO metadata and RSS.
- Homepage content wired to the real content source.

Components:

- `PostCard`
- `ProjectCard`
- `TagFilter`
- `ReadingProgress`
- `TableOfContents`
- `CodeBlock`
- `MetadataRail`

## Phase 3: Media Layer

Goal: add life, memory, and taste beyond text and project proof.

Deliverables:

- `/photos`.
- Photo grid, featured photo, lightbox.
- `/music` or expanded homepage music component.
- Mini player with play/pause, previous/next, progress, volume, and current track metadata.

Components:

- `PhotoGrid`
- `PhotoLightbox`
- `AlbumCard`
- `MiniPlayer`
- `TrackList`
- `NowPlaying`

## Phase 4: Interaction Layer

Goal: add programmer-native exploration and command-first movement.

Deliverables:

- Global command menu.
- Global search.
- Filters for writing, projects, knowledge, photos.
- Quick actions for reading, work, music, photos, and contact.
- Status panel for current writing, work, and listening.

Components:

- `CommandMenu`
- `GlobalSearch`
- `FilterBar`
- `StatusPanel`
- `QuickAction`
- `KeyboardHint`

## Phase 5: Portfolio OS

Goal: expand into a complete personal operating system.

Deliverables:

- `/lab` component and experiment surface.
- `/about` resume and experience.
- `/uses` tools and workflow.
- `/knowledge` public knowledge base.
- Optional analytics, reactions, contact form, and content admin.

Components:

- `Timeline`
- `SkillMatrix`
- `UsesShelf`
- `KnowledgeCard`
- `ReactionBar`
- `ContactPanel`
- `ComponentPreview`
