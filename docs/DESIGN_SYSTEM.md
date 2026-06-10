# Design System Seed

## Visual Tokens

Palette:

- Background: warm ivory, not beige-heavy.
- Text: ink black.
- Muted text: warm graphite.
- Accent 1: restrained rust.
- Accent 2: deep developer navy.
- Accent 3: muted sage.

Typography:

- Display: serif for studio identity and editorial voice.
- UI/body: Geist Sans.
- Metadata and labels: Geist Mono.
- Letter spacing stays at zero except small uppercase metadata labels.

Surfaces:

- Open layout first.
- Bordered panels only when they create a useful workbench or module boundary.
- No nested cards.
- Radius stays controlled: 10-20px depending on component scale.
- Translucency is used for chrome and panels, not as page decoration.

Motion:

- Micro movement only: hover lift, command menu reveal, state toggles.
- Motion must clarify hierarchy or interaction state.

## Component Inventory

Implemented in Phase 1:

- `Header`
- `ThemeToggle`
- `StatusBadge`
- `CommandPalette`
- `WorkbenchPanel`
- `WorkbenchRow`
- `HighlightCard`
- `SocialLinks`
- `FloatingPlayer`
- `KnowledgePanel`
- `LabPanel`
- `ContactPanel`

Reserved for later:

- `PostCard`
- `ProjectCard`
- `TagFilter`
- `ReadingProgress`
- `TableOfContents`
- `CodeBlock`
- `MetadataRail`
- `PhotoGrid`
- `MiniPlayer`
- `GlobalSearch`
- `ComponentPreview`

## Asset Rules

- Production UI assets live in `public/assets`.
- Reference concepts live in `public/references`.
- Do not rely on temporary generated-image paths in application code.
- Do not use low-density screenshots as implementation targets.
