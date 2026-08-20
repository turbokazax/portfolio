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
