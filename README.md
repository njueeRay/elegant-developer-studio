# Elegant Developer Studio

A refined personal homepage for a design-oriented engineer. The first build focuses on Phase 1: visual foundation, information architecture, reusable homepage components, and a clear path toward a full content/media/portfolio operating system.

## Current Version

`v0.1.0` - Phase 1 Visual Foundation

Implemented:

- Developer Atelier homepage direction.
- `Knowledge` IA replacing the earlier `Notes` concept.
- Theme toggle, command menu, workbench panel, highlight cards, media play state.
- Generated project and media assets in `public/assets`.
- Selected visual reference in `public/references`.
- PRD, roadmap, IA, design-system seed, and version trace in `docs`.

## Run Locally

```bash
npm install --cache .npm-cache
npm run dev
```

Open `http://localhost:3000`.

## Project Docs

- `docs/PRD.md`
- `docs/ROADMAP.md`
- `docs/INFORMATION_ARCHITECTURE.md`
- `docs/DESIGN_SYSTEM.md`
- `docs/VERSION_TRACE.md`

## Architecture

```text
src/app             Next.js App Router entry
src/components      Homepage components and interactive UI
src/data            Mock content and IA data
public/assets       Project-bound generated images
public/references   Accepted visual references
docs                Product, roadmap, IA, and trace documents
```

## Next Phases

- Phase 2: blog, projects, MDX, tags, SEO, RSS.
- Phase 3: photos, music, lightbox, mini player.
- Phase 4: global search, command layer, filtering.
- Phase 5: lab, about, uses, knowledge base, reactions, admin options.
