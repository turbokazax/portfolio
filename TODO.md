# TODO

## ✅ Completed

- About page (`/about/`) and 404 page
- Open Graph + Twitter meta on all pages and blog posts
- XML sitemap + HTML sitemap + robots.txt
- Skip-to-content link + nav aria-label
- Canonical tags, JSON-LD Person + Article schemas
- CI workflows (build-check, test) + package.json test script
- Dead `.scorecard*` CSS removed
- SEO audit fixes (dynamic og:url, blog OG/Twitter)

## Flagged / Needs Attention

- [ ] **`src/content/blog/why-vision-needs-embodiment.mdx`** — contains lorem ipsum placeholder content. Needs real blog post content or mark as `draft: true` in frontmatter until ready.
- [ ] **STEM Portfolio link** — `src/pages/index.astro` CV section has a Google Slides link; confirm it's the intended final URL.

## Content (needs you)

- [ ] Replace lorem ipsum in "Why Vision Needs Embodiment" or publish new posts
- [ ] More blog posts (only 2 exist)

## UX Polish

- [ ] **No "back to top" affordance on mobile** — after scrolling a long section, the only way back is the sticky navbar name (which scrolls horizontally). Consider a subtle scroll-to-top button.
- [ ] **Education labels terse** — `score-group-label` uses "AP" / "Tests"; consider "AP Exams" / "Standardized Tests" for non-US readers.
- [ ] **CV section lede** — single short line leaves whitespace above the buttons on desktop. Tighten spacing or add a detail (research interests, location).
- [ ] **Mobile footer space** — adequate but tight on some viewports.

## Accessibility

- [ ] **Focus-visible keyboard-tab pass** — `:focus-visible` CSS exists but never verified through real keyboard navigation (nav links, download chips, social icons, theme toggle).
- [ ] **Color contrast spot-check** — dark theme passes WCAG AA; light theme `ink-muted`/`ink-faint` on paper should be verified with a contrast tool.

## Performance

- [ ] **Avatar image** — `public/profile.jpg` is 94KB (959×1280). Resize to ~256×256 and/or serve as WebP.
- [ ] **Lazy-load below-fold images** — album tiles and blog images load eagerly (few `<img>` tags currently).

## Responsive

- [ ] **Untested viewports** — 320px, tablet (768–1024px), landscape mobile.

## Infrastructure

- [ ] **RSS feed** — documented in `docs/RSS_TASK.md`; install `@astrojs/rss` and wire the endpoint.
- [ ] **Blog index page** — no `/blog/` listing route; listing lives in the home `#blog` section.
- [ ] **Analytics** — no tracking configured (documented in `docs/ANALYTICS_TASK.md`).
- [ ] **graphify** — `graphify-out/` is gitignored; decide whether to commit or regenerate on CI.
