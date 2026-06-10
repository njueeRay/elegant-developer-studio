# Design QA

Final result: passed

## Reference

- Accepted concept: `public/references/developer-atelier-reference.png`
- Implemented desktop capture: `output/playwright/home-desktop-final.png`
- Implemented command capture: `output/playwright/home-command-final.png`
- Implemented mobile capture: `output/playwright/home-mobile-final.png`

## Method

- Local URL: `http://localhost:3000`
- Browser verification fallback: Playwright Chromium via node API because the in-app Browser navigation/screenshot tool was not exposed in the active toolset.
- Viewports checked:
  - Desktop: 1440 x 1024
  - Mobile: 390 x 844

## Checks

1. First viewport structure: passed.
   - Hero, status, command entry, social links, and workbench are visible without crowding.

2. Information architecture: passed.
   - `Notes` was intentionally replaced by `Knowledge` in navigation, command search copy, homepage section, docs, and route naming.

3. Visual fidelity: passed with intentional deviation.
   - Reference direction is preserved: serif studio identity, warm background, developer workbench, restrained rust/blue accents, low-to-medium density.
   - Intentional deviation: the implementation uses `Knowledge` instead of the reference image's `Notes`.

4. Layout QA: passed.
   - Desktop horizontal overflow: `scrollWidth 1440`, `clientWidth 1440`.
   - Mobile horizontal overflow: `scrollWidth 390`, `clientWidth 390`.
   - Fixed issue: desktop H1 originally wrapped into two lines because stale `.next` CSS was served; clearing `.next` and restarting confirmed `white-space: nowrap`.
   - Fixed issue: floating player overlapped featured content; removed it and kept media-card playback state.

5. Interaction QA: passed.
   - Theme toggle changes document theme to `dark`.
   - Media card button changes from `Play` to `Pause`.
   - `Meta+K` opens the command palette.

## Residual P3 Notes

- Social URLs are placeholders.
- `/blog`, `/projects`, `/knowledge`, `/media`, and `/lab` are future routes.
- Media playback is a stateful UI stub, not real audio.
- The article card's paper thumbnail is intentionally abstract in Phase 1 and can be replaced by generated editorial art in Phase 2.
