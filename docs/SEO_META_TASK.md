# SEO / Open Graph Meta Tags — Task

Add the following meta tags to `src/layouts/Layout.astro` inside the `<head>` block,
right after the existing `<title>{title}</title>` line.

## Required asset

- `public/og-image.png` — 1200x630 PNG, the site's social preview card.
  Use the existing minimal aesthetic: off-white paper background (#fafaf7), the
  indigo accent (#3b37c9), the name in Fraunces, a short tagline. No photo.
  (Create this asset separately — not covered by this task.)

## Tags to add

```astro
<!-- Open Graph -->
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://jubaportfolio.vercel.app/" />
<meta property="og:image" content="https://jubaportfolio.vercel.app/og-image.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:site_name" content="Arnur Jumabekov — Researcher" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content="https://jubaportfolio.vercel.app/og-image.png" />

<!-- Misc SEO -->
<meta name="theme-color" content="#3b37c9" />
```

## Why these exact tags

- `og:title` / `og:description` reuse the existing `title` / `description` props,
  so each page keeps its own copy without hardcoding.
- `og:type: website` — this is a portfolio, not an article per page.
- `og:image` absolute URL required by the OG protocol; Astro's `BASE_URL` or a
  hardcoded prod URL both work. Hardcoded here to match the deployment URL.
- `twitter:card: summary_large_image` — the only card type that shows the OG
  image at full width, consistent with the minimal aesthetic.
- `theme-color` matches the accent for the browser tab on mobile.

## Status

IMPLEMENTED in `src/layouts/Layout.astro` on 2026-08-02. All OG, Twitter, and
misc-SEO tags added right after `<meta name="description">`, using the existing
`{title}` / `{description}` props (no hardcoded copy).

REMAINING: create `public/og-image.png` (1200 x 630) — the asset referenced by
`og:image` / `twitter:image`. Until it exists, the tags resolve to a 404 on that
URL; social previews will fall back to text-only.
