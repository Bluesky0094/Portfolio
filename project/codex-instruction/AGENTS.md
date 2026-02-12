# AGENTS.md - Portfolio Static Website (Codex)

## Goal
Build a static portfolio site (HTML/CSS/JS) that is fast, clear, and professional for studio applications. Let the work speak. Keep copy short and scannable.

## Current repo structure (do not change without updating links)
- index.html
- src/assets/css/styles.css
- src/assets/js/main.js
- src/pages/about.html
- src/pages/contact.html
- src/pages/index.html
- src/pages/projects/bar-giannone-index.html
- src/media/... (images, video, pdf)

## Linking rules (critical to avoid broken media)
- Always use relative paths, never leading `/`.
- Compute paths from the current file location:
  - From `index.html`: use `src/...`.
  - From `src/pages/*.html`: use `../assets/...`, `../media/...`, `../../index.html`.
  - From `src/pages/projects/*.html`: use `../../assets/...`, `../../media/...`, `../../../index.html`.
- Navigation links must be relative to the page:
  - In `src/pages/*.html`: `index.html`, `about.html`, `contact.html` (projects list lives at `src/pages/index.html`).
  - In `src/pages/projects/*.html`: `../index.html`, `../about.html`, `../contact.html`, and `../../../index.html` for Home/brand.
- If a page is moved, update every related href/src in that page.

## Principles
- Static only: no backend, no heavy build tools.
- Speed and simplicity: small assets, fast load.
- Scannable layout: short sections, clear CTA.
- Credible tone: no hype.
- Mobile-first and accessible (contrast, alt text, keyboard nav).

## Content and layout
- Home: hero, CTA, 3-4 highlights, featured projects, footer.
- Projects grid: clear thumbnails + 1 line description.
- Project detail: title, context, what I did, outputs, notes.
- About: short profile + skills + software.
- Contact: email, phone, external link, CTA buttons.

## UI behavior (must be consistent across all project pages)
- Use the shared CSS/JS: `src/assets/css/styles.css` and `src/assets/js/main.js`.
- Cards that link directly to media (`.png/.jpg/.webp/.gif/.svg/.mp4/.webm/.ogg/.pdf`) open in the built-in modal with blur + scale animation.
- Keep media cards as `<a class="project-card" href="...">` with a `.project-thumb` containing `<img>` or `<video>`.
- Do not remove the modal logic from `main.js`. All project pages must include the same JS/CSS.
- Portrait detection is automatic (JS adds `is-portrait-9-16` or `is-portrait-3-4`), so keep markup consistent to enable it.
- Internal project pages (e.g. `src/pages/projects/*.html`) use a standard grid layout, not masonry.
- `.media-grid` on internal project pages is responsive: 3 columns desktop, 2 columns tablet (<=900px), 1 column mobile (<=600px), with `auto-fit` behavior at smaller widths.
- A "scroll to top" bubble button appears after scrolling down, fixed bottom-center, and smoothly scrolls to the top on click.

## Quality checklist
- All links work when opening pages as files and on static hosting.
- All images/videos load (no 404).
- All link load (no 404)
- One H1 per page, alt text on images.
- CSS/JS load on every page.
