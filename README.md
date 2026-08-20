# jubaportfolio

Personal site for Arnur Jumabekov — publications, projects, CV, and a blog.
Live at [jubaportfolio.vercel.app](https://jubaportfolio.vercel.app).

## Stack

Astro 7 (static output) · MDX content collections · `@astrojs/rss` + `@astrojs/sitemap` ·
Vercel Analytics · deployed on Vercel.

## Commands

| Command           | Action                               |
| :---------------- | :----------------------------------- |
| `npm install`     | Install dependencies                 |
| `npm run dev`     | Dev server at `localhost:4321`       |
| `npm run build`   | Production build to `./dist/`        |
| `npm run preview` | Preview the production build locally |

## Where content lives

- **CV facts** (education, experience, projects, honors, publication) — `src/data/cv.ts`.
  The homepage renders from this file; do not hardcode facts in the markup.
  Keep it in sync with `public/arnur-jumabekov-cv.pdf`.
- **Blog posts** — `src/content/blog/*.mdx`. Frontmatter schema in `src/content.config.ts`.
  Set `draft: true` to keep a post out of the build, the sitemap, and the RSS feed.
- **Nav links** — `src/nav.ts` (one definition, used by both layouts).
- **Design system** — `src/styles/global.css`; the rationale is documented in `DESIGN.md`.
- **Shared `<head>`** — `src/components/BaseHead.astro` (meta, OG, fonts, theme init).

## Deploying

Pushing to `main` triggers a Vercel build. `astro.config.mjs` sets `site`, which the
sitemap and Open Graph URLs depend on — update it if the domain changes.

## Regenerating the OG image

`public/og-image.png` is the social-share card referenced by `og:image` on every page. Its
source is `scripts/og-image.html` — a standalone page (not part of the Astro build) that reuses
the site's own design tokens: warm paper background (`#fafaf7`), Fraunces for the display type,
and the `#3b37c9` accent. To re-crop or re-word the card:

1. Serve the `scripts/` directory over HTTP (headless Chrome blocks `file://` navigation for
   webfonts/CSS), e.g. `npx serve scripts` or `python3 -m http.server --directory scripts`.
2. Load `og-image.html` in a headless browser at a **1200x630** viewport.
3. Screenshot the page and save it as `public/og-image.png`.
4. Confirm the output image is exactly 1200x630px. `src/components/BaseHead.astro` hardcodes
   `og:image:width` to `1200` and `og:image:height` to `630`, so a differently sized card will
   be stretched or letterboxed in Twitter/LinkedIn/Slack link previews.
