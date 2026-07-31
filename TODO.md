# TODO

## Flagged / Needs Attention

- [ ] **`src/content/blog/why-vision-needs-embodiment.mdx`** — contains lorem ipsum placeholder content (lines ~14, ~40). Needs real blog post content or mark as `draft: true` in frontmatter until ready.

## Content To Add

- [ ] **About page** — currently the site has no `/about` route; consider adding a dedicated about/bio page
- [ ] **Blog post: real content** — replace lorem ipsum in "Why Vision Needs Embodiment" or publish new posts
- [ ] **More blog posts** — only 2 exist (`notes-from-my-first-conference`, `why-vision-needs-embodiment`)
- [ ] **CV/Resume section** — resume PDF was removed from public tracking; decide whether to re-add as a downloadable asset under a stable name (e.g. `public/resume.pdf`)
- [ ] **Projects/Portfolio section** — showcase key work

## Design / UX

- [ ] **Avatar image optimization** — `public/profile.jpg` is 94KB (959×1280). Consider resizing to ~256×256 and/or serving as WebP for faster load
- [ ] **Mobile responsiveness** — test topbar with avatar on narrow viewports
- [ ] **Blog pagination / index** — no `/blog` index page exists; `[slug].astro` handles individual posts only
- [ ] **RSS feed** — common for Astro blogs, not yet configured
- [ ] **Open Graph / social meta** — `og:image`, twitter cards not set up
- [ ] **404 page** — no custom 404

## Technical

- [ ] **graphify knowledge graph** — exists in `graphify-out/` but is gitignored; decide whether to commit or regenerate on CI
- [ ] **Tests** — no test suite exists (unit, e2e, visual regression)
- [ ] **CI/CD** — no GitHub Actions for lint/build/deploy checks beyond Vercel's built-in
- [ ] **Analytics** — no tracking configured (Vercel Analytics, Plausible, etc.)
- [ ] **Sitemap / robots.txt** — not generated
