# Sitemap Task

Add an XML sitemap to the portfolio so search engines can discover all pages.

## Install

```bash
npm install @astrojs/sitemap
```

## Configure

Edit `astro.config.mjs` to add the integration:

```js
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  integrations: [mdx(), sitemap()],
});
```

That's it. `@astrojs/sitemap` auto-generates `sitemap-index.xml` and `sitemap-0.xml` at build time based on all generated pages. The `robots.txt` already references `/sitemap-index.xml`, so once this integration is in place and the site is rebuilt/deployed, the sitemap URL resolves.

## Verify

After `npm run build`, check `dist/sitemap-index.xml` exists. Visit `https://jubaportfolio.vercel.app/sitemap-index.xml` after deploy.
