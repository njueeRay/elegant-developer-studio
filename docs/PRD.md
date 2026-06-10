# Elegant Developer Studio PRD

## 1. Product Positioning

Elegant Developer Studio is a personal site for a design-oriented engineer. It is not a resume template, GitHub clone, dense dashboard, or generic portfolio landing page. The site should feel like a calm studio: writing, selected work, knowledge, photos/music, and small experiments all have clear places to grow.

Primary audience:

- People evaluating the owner as a design engineer.
- Readers who come for technical essays and product thinking.
- Collaborators who want to inspect projects, taste, working style, and credibility.

Core thesis:

- First impression should communicate taste, engineering identity, and restraint.
- The site must stay extensible across content, media, interaction, and portfolio operating-system phases.
- Components should be reusable and scenario-appropriate, not one-off ornament.

## 2. Design Direction

Selected visual direction: Developer Atelier.

Style blend:

- Claude Warm AI: warm reading mood, human tone, restrained surfaces.
- Primer Developer Platform: developer semantics, workbench language, status and code cues.
- Linear: small command-first affordances and efficient structure without dashboard density.
- Apple: polished motion, careful media framing, limited translucent chrome.

Mandatory IA correction:

- Use `knowledge`, not `notes`, as the long-term information architecture label.

## 3. Phase 1 Scope

Phase 1 builds one high-fidelity interactive homepage.

Included:

- Hero with name, identity, short intro, current status, and command entry.
- Navigation and theme toggle.
- Workbench panel with three realistic current-state items.
- Featured modules: writing, work, media.
- Knowledge, lab, and contact preview panels.
- Generated visual assets for project and media cards.
- Local PRD, roadmap, IA, design-system, and version trace documents.

Not included:

- Real blog routes.
- MDX content pipeline.
- Search index.
- Photo gallery.
- Real audio playback.
- CMS or admin.

## 4. Functional Requirements

- Theme toggle changes light/dark presentation and persists preference locally.
- Command menu opens through button click and `Cmd/Ctrl + K`; closes through backdrop, command selection, or `Esc`.
- Media play button toggles visible play/pause state.
- Navigation anchors scroll to homepage sections.
- Cards use realistic links that match future route architecture.
- Homepage remains responsive across desktop and mobile.

## 5. Non-Functional Requirements

- The homepage must not rely on external image URLs.
- Generated assets used by the UI must live in `public/assets`.
- The accepted visual reference must be preserved in `public/references`.
- Build must pass before deployment.
- Documentation must explain what Phase 1 is and is not.

## 6. Acceptance Criteria

- The first viewport feels elegant, developer-specific, and low-to-medium density.
- `Knowledge` appears consistently where the older plan said `Notes`.
- Components are named around reusable intent: status badge, workbench, highlight card, command palette, media/player, knowledge panel.
- Desktop and mobile layouts do not overflow or clip primary content.
- The app can be deployed to Vercel with the repository state intact.

## 7. Open Decisions

- Real owner profile data: name, biography, email, social URLs, and location.
- Whether Phase 2 should use filesystem MDX, remote CMS, or hybrid content.
- Whether music should become a real audio feature or remain a curated now-playing surface.
- Whether `knowledge` should be public evergreen notes, private/public bookmarks, or structured learning logs.
