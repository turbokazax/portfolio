# TODO

## Flagged / Needs Attention

- [ ] **`src/content/blog/why-vision-needs-embodiment.mdx`** — contains lorem ipsum placeholder content (lines ~14, ~40). Needs real blog post content or mark as `draft: true` in frontmatter until ready.
- [ ] **STEM Portfolio link is a dead `#` placeholder** — `src/pages/index.astro` CV section. Needs the real portfolio/slides URL from the user.
- [ ] **Mobile footer bottom space** — footer sits close to the viewport bottom on some mobile heights; could use more breathing room (currently `padding-bottom: var(--space-10)`).

## Critique & Audit Findings (not yet implemented)

### UX Critique (heuristic)
- [ ] **No "back to top" affordance on mobile** — after scrolling through a long section, the only way back is the sticky navbar name (which scrolls horizontally within the nav strip). Consider a subtle scroll-to-top or rely on navbar name tap.
- [ ] **Education "AP" / "Tests" labels are terse** — `score-group-label` abbreviations ("AP", "Tests") scan fast but may confuse non-US admissions readers. Consider "AP Exams" / "Standardized Tests".
- [ ] **CV section lede is a single short line** — leaves noticeable whitespace above the buttons on desktop. Either tighten spacing or add a second sentence with a detail (e.g. research interests, location).
- [ ] **No visual hover feedback on the STEM Portfolio ghost button distinguishes it clearly from the primary CV button** — works, but the ghost style is low-emphasize; ensure the difference reads as "secondary action" not "disabled".

### Accessibility (audit)
- [ ] **Focus-visible rings** — `:focus-visible` styles exist in CSS but were not verified in a real keyboard-tab pass through all interactive elements (nav links, download chips, social icons, theme toggle).
- [ ] **Skip-to-content link missing** — no bypass block for keyboard users; tab order starts at the navbar.
- [ ] **`download-chip` icons use `aria-hidden="true"` but the chips themselves rely on text** — fine, but verify the SVG-only icon buttons (social row) all have `aria-label` (they do).
- [ ] **Color contrast** — dark theme body tested `rgb(21,21,21)` bg / `rgb(237,237,237)` text (passes WCAG AA). Light theme and all `ink-muted`/`ink-faint` on both backgrounds should be spot-checked with a contrast tool.
- [ ] **Mobile nav scroller has no `tabindex`/`aria-label`** — the horizontally scrollable `.topbar-left` is not announced as a region; consider `role="navigation"` + label or `aria-label="Sections"`.

### Responsive (audit)
- [ ] **No horizontal overflow on mobile** — PASS (tested at 390px).
- [ ] **Navbar sticky + horizontally scrollable** — PASS.
- [ ] **Avatar/identity centered on mobile** — PASS.
- [ ] **Footer present at bottom on mobile** — PASS, but tight (see Flagged).
- [ ] **Not tested:** very small screens (320px), tablet (768–1024px), landscape mobile.

### Performance (audit)
- [ ] **Avatar image optimization** — `public/profile.jpg` is 94KB (959×1280). Resize to ~256×256 and/or serve as WebP for faster load.
- [ ] **Fonts** — 3 Google Fonts families loaded via `@import` in CSS (render-blocking). Consider `<link rel="preload">` or the Fonts API `display=swap`.
- [ ] **No lazy-loading on below-fold images** — album tiles and blog images load eagerly.

## Design / UX

- [ ] **About page** — currently the site has no `/about` route; consider adding a dedicated about/bio page.
- [ ] **Blog pagination / index** — no `/blog` index page exists; `[slug].astro` handles individual posts only.
- [ ] **RSS feed** — common for Astro blogs, not yet configured.
- [ ] **Open Graph / social meta** — `og:image`, twitter cards not set up.
- [ ] **404 page** — no custom 404.
- [ ] **Blog post: real content** — replace lorem ipsum in "Why Vision Needs Embodiment" or publish new posts.
- [ ] **More blog posts** — only 2 exist (`notes-from-my-first-conference`, `why-vision-needs-embodiment`).

## Technical

- [ ] **graphify knowledge graph** — exists in `graphify-out/` but is gitignored; decide whether to commit or regenerate on CI.
- [ ] **Tests** — ad-hoc `test-site.mjs` exists (Playwright) but is not wired to `package.json` or CI.
- [ ] **CI/CD** — no GitHub Actions for lint/build/deploy checks beyond Vercel's built-in.
- [ ] **Analytics** — no tracking configured (Vercel Analytics, Plausible, etc.).
- [ ] **Sitemap / robots.txt** — not generated.
- [ ] **Dead code** — `.scorecard*` CSS (variant A stat tiles) is still in `global.css` but no longer used in markup (variant B chips active). Remove or keep intentionally.
